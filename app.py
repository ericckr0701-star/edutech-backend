import os
import threading

from flask import Flask, jsonify, request, session
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from werkzeug.utils import secure_filename

from config import Config
from database.connection import get_db_connection
from database.users import init_simple_users_table
from services.edutech_service import (
    add_forum_post,
    add_forum_reply_by_title,
    list_saved_resources,
    checkout,
    clear_cart,
    get_bootstrap_data,
    add_course_comment,
    resolve_assignment_id_by_title,
    set_saved_resource,
    submit_assignment,
    update_profile,
    upsert_cart_by_title,
)
from services.user_service import try_register_user, verify_login

UPLOAD_FOLDER = "uploads"
_db_init_lock = threading.Lock()
_db_simple_schema_ready = False


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    # 前端与 API 不同域且用 HTTPS 时，跨站 Session 需 SameSite=None + Secure（仅当你的 API 也是 HTTPS 时开启）
    if os.environ.get("SESSION_COOKIE_CROSS_SITE", "").lower() in (
        "1",
        "true",
        "yes",
        "on",
    ):
        app.config["SESSION_COOKIE_SAMESITE"] = "None"
        app.config["SESSION_COOKIE_SECURE"] = True
    CORS(
        app,
        supports_credentials=True,
        origins=Config.CORS_ORIGINS,
        allow_headers=["Content-Type"],
        methods=["GET", "POST", "OPTIONS"],
    )
    bcrypt = Bcrypt(app)

    os.makedirs(UPLOAD_FOLDER, exist_ok=True)

    def current_user_id():
        uid = session.get("user_id")
        return int(uid) if uid is not None else None

    def auth_error():
        return jsonify({"status": "error", "message": "Not authenticated"}), 401

    @app.before_request
    def _ensure_simple_users_schema_once():
        """作业模式：首次请求时创建 users(id, username, password)。EduTech 模式跳过。"""
        global _db_simple_schema_ready  # noqa: PLW0603

        if Config.use_edutech_users():
            return
        if _db_simple_schema_ready:
            return
        with _db_init_lock:
            if _db_simple_schema_ready:
                return
            try:
                conn = get_db_connection()
                try:
                    init_simple_users_table(conn)
                finally:
                    conn.close()
            except Exception:
                app.logger.exception("init_simple_users_table failed")
                return
            _db_simple_schema_ready = True

    @app.route("/register", methods=["POST"])
    def register():
        data = request.get_json(silent=True) or {}
        username = (data.get("username") or "").strip()
        password = data.get("password") or ""

        if not username or not password:
            return (
                jsonify(
                    {
                        "status": "error",
                        "message": "Username and password are required",
                    }
                ),
                400,
            )

        conn = None
        try:
            conn = get_db_connection()
            ok, err = try_register_user(conn, bcrypt, username, password)
            if not ok:
                return jsonify({"status": "error", "message": err}), 400
            return jsonify({"status": "success"})
        except Exception:
            app.logger.exception("register failed")
            return (
                jsonify(
                    {
                        "status": "error",
                        "message": "Username already exists or database error",
                    }
                ),
                400,
            )
        finally:
            if conn is not None:
                conn.close()

    @app.route("/login", methods=["POST"])
    def login():
        data = request.get_json(silent=True) or {}
        username = (data.get("username") or "").strip()
        password = data.get("password") or ""

        if not username or not password:
            return (
                jsonify(
                    {
                        "status": "error",
                        "message": "Invalid credentials",
                    }
                ),
                401,
            )

        conn = None
        try:
            conn = get_db_connection()
            user = verify_login(conn, bcrypt, username, password)
            if not user:
                return (
                    jsonify({"status": "error", "message": "Invalid credentials"}),
                    401,
                )
            session.clear()
            session["user_id"] = user["id"]
            session["username"] = user["username"]
            session["role"] = user.get("role", "student")
            return jsonify({"status": "success"})
        except Exception:
            app.logger.exception("login failed")
            return (
                jsonify({"status": "error", "message": "Invalid credentials"}),
                401,
            )
        finally:
            if conn is not None:
                conn.close()

    @app.route("/user", methods=["GET"])
    def get_user():
        uid = session.get("user_id")
        name = session.get("username")
        role = session.get("role")
        if uid is None or not name:
            return (
                jsonify(
                    {
                        "status": "error",
                        "message": "Not authenticated",
                    }
                ),
                401,
            )
        return jsonify(
            {
                "status": "success",
                "user": {
                    "id": uid,
                    "username": name,
                    "role": role or "student",
                },
            }
        )

    @app.route("/upload", methods=["POST"])
    def upload_file():
        if "file" not in request.files:
            return jsonify({"status": "error", "message": "No file part"}), 400
        file = request.files["file"]
        if file.filename == "":
            return jsonify({"status": "error", "message": "No selected file"}), 400

        safe_name = secure_filename(file.filename)
        if not safe_name:
            return jsonify({"status": "error", "message": "Invalid filename"}), 400

        file.save(os.path.join(UPLOAD_FOLDER, safe_name))
        return jsonify(
            {
                "status": "success",
                "message": f"File {safe_name} uploaded successfully",
            }
        )

    @app.route("/bootstrap", methods=["GET"])
    def bootstrap():
        uid = current_user_id()
        if uid is None:
            return auth_error()
        conn = None
        try:
            conn = get_db_connection()
            data = get_bootstrap_data(conn, uid)
            if not data:
                return auth_error()
            return jsonify({"status": "success", "data": data})
        except Exception:
            app.logger.exception("bootstrap failed")
            return jsonify({"status": "error", "message": "Bootstrap failed"}), 500
        finally:
            if conn is not None:
                conn.close()

    @app.route("/forum/posts", methods=["POST"])
    def forum_posts_create():
        uid = current_user_id()
        if uid is None:
            return auth_error()
        payload = request.get_json(silent=True) or {}
        title = (payload.get("title") or "").strip()
        content = (payload.get("content") or "").strip()
        if not title or not content:
            return jsonify({"status": "error", "message": "Title and content are required"}), 400
        conn = None
        try:
            conn = get_db_connection()
            post_id = add_forum_post(conn, uid, title, content)
            return jsonify({"status": "success", "post_id": post_id})
        finally:
            if conn is not None:
                conn.close()

    @app.route("/forum/replies", methods=["POST"])
    def forum_replies_create():
        uid = current_user_id()
        if uid is None:
            return auth_error()
        payload = request.get_json(silent=True) or {}
        post_title = (payload.get("post_title") or "").strip()
        content = (payload.get("content") or "").strip()
        if not post_title or not content:
            return jsonify({"status": "error", "message": "post_title and content are required"}), 400
        conn = None
        try:
            conn = get_db_connection()
            ok = add_forum_reply_by_title(conn, uid, post_title, content)
            if not ok:
                return jsonify({"status": "error", "message": "Post not found"}), 404
            return jsonify({"status": "success"})
        finally:
            if conn is not None:
                conn.close()

    @app.route("/cart/items", methods=["POST"])
    def cart_items_upsert():
        uid = current_user_id()
        if uid is None:
            return auth_error()
        payload = request.get_json(silent=True) or {}
        title = (payload.get("title") or "").strip()
        quantity = payload.get("quantity")
        if not title or quantity is None:
            return jsonify({"status": "error", "message": "title and quantity are required"}), 400
        try:
            quantity = int(quantity)
        except Exception:
            return jsonify({"status": "error", "message": "quantity must be integer"}), 400
        conn = None
        try:
            conn = get_db_connection()
            ok = upsert_cart_by_title(conn, uid, title, quantity)
            if not ok:
                return jsonify({"status": "error", "message": "Book not found"}), 404
            return jsonify({"status": "success"})
        finally:
            if conn is not None:
                conn.close()

    @app.route("/cart/clear", methods=["POST"])
    def cart_clear():
        uid = current_user_id()
        if uid is None:
            return auth_error()
        conn = None
        try:
            conn = get_db_connection()
            clear_cart(conn, uid)
            return jsonify({"status": "success"})
        finally:
            if conn is not None:
                conn.close()

    @app.route("/checkout", methods=["POST"])
    def checkout_api():
        uid = current_user_id()
        if uid is None:
            return auth_error()
        conn = None
        try:
            conn = get_db_connection()
            receipt = checkout(conn, uid)
            if not receipt:
                return jsonify({"status": "error", "message": "Cart is empty"}), 400
            if receipt.get("error") == "insufficient_stock":
                return jsonify({"status": "error", "message": receipt.get("message")}), 400
            return jsonify(
                {
                    "status": "success",
                    "orderId": f"ORD-{receipt['order_id']}",
                    "total": receipt["total"],
                }
            )
        finally:
            if conn is not None:
                conn.close()

    @app.route("/assignments/submit", methods=["POST"])
    def assignments_submit():
        uid = current_user_id()
        if uid is None:
            return auth_error()
        payload = request.get_json(silent=True) or {}
        assignment_id = payload.get("assignment_id")
        title = (payload.get("title") or "").strip()
        source_label = (payload.get("source_label") or "Submitted").strip()
        text_answer = payload.get("text_answer")
        try:
            assignment_id = int(assignment_id) if assignment_id is not None else None
        except Exception:
            return jsonify({"status": "error", "message": "assignment_id must be integer"}), 400
        conn = None
        try:
            conn = get_db_connection()
            if assignment_id is None and title:
                assignment_id = resolve_assignment_id_by_title(conn, title)
            submission_id = submit_assignment(
                conn,
                uid,
                assignment_id,
                source_label,
                text_answer,
            )
            return jsonify({"status": "success", "submission_id": submission_id})
        except Exception:
            app.logger.exception("assignments submit failed")
            return jsonify({"status": "error", "message": "Assignment submit failed"}), 500
        finally:
            if conn is not None:
                conn.close()

    @app.route("/profile", methods=["POST"])
    def profile_update():
        uid = current_user_id()
        if uid is None:
            return auth_error()
        payload = request.get_json(silent=True) or {}
        name = (payload.get("name") or "").strip()
        email = (payload.get("email") or "").strip()
        if not name or not email:
            return jsonify({"status": "error", "message": "name and email are required"}), 400
        conn = None
        try:
            conn = get_db_connection()
            update_profile(conn, uid, name, email)
            session["username"] = name
            return jsonify({"status": "success"})
        except Exception:
            return jsonify({"status": "error", "message": "Profile update failed"}), 400
        finally:
            if conn is not None:
                conn.close()

    @app.route("/comments", methods=["POST"])
    def comments_create():
        uid = current_user_id()
        if uid is None:
            return auth_error()
        payload = request.get_json(silent=True) or {}
        section_key = (payload.get("section_key") or "").strip()
        content = (payload.get("content") or "").strip()
        course_id = payload.get("course_id")
        if not section_key or not content:
            return jsonify({"status": "error", "message": "section_key and content are required"}), 400
        try:
            course_id = int(course_id) if course_id is not None else None
        except Exception:
            return jsonify({"status": "error", "message": "course_id must be integer"}), 400
        conn = None
        try:
            conn = get_db_connection()
            comment_id = add_course_comment(conn, uid, course_id, section_key, content)
            return jsonify({"status": "success", "comment_id": comment_id})
        finally:
            if conn is not None:
                conn.close()

    @app.route("/resources/save", methods=["POST"])
    def resources_save():
        uid = current_user_id()
        if uid is None:
            return auth_error()
        payload = request.get_json(silent=True) or {}
        resource_type = (payload.get("resource_type") or "").strip()
        resource_id = (payload.get("resource_id") or "").strip()
        title = (payload.get("title") or "").strip()
        saved = bool(payload.get("saved"))
        if not resource_type or not resource_id:
            return jsonify({"status": "error", "message": "resource_type and resource_id are required"}), 400
        conn = None
        try:
            conn = get_db_connection()
            set_saved_resource(conn, uid, resource_type, resource_id, title, saved)
            return jsonify({"status": "success"})
        finally:
            if conn is not None:
                conn.close()

    @app.route("/resources/saved", methods=["GET"])
    def resources_saved():
        uid = current_user_id()
        if uid is None:
            return auth_error()
        conn = None
        try:
            conn = get_db_connection()
            rows = list_saved_resources(conn, uid)
            return jsonify({"status": "success", "items": rows})
        finally:
            if conn is not None:
                conn.close()

    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
