import os
import threading

from flask import Flask, jsonify, request, session
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from werkzeug.utils import secure_filename

from config import Config
from database.connection import get_db_connection
from database.users import init_simple_users_table
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

    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
