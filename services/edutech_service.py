from datetime import datetime
from typing import Optional


def _progress_message(value: int) -> str:
    if value >= 100:
        return "Incredible!"
    if value >= 90:
        return "Almost there!"
    if value >= 40:
        return "Keep it up!"
    return "Start by today!"


def get_bootstrap_data(conn, user_id: int):
    result = {}
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute(
            "SELECT user_id, username, email, role FROM users WHERE user_id = %s",
            (user_id,),
        )
        user = cursor.fetchone()
        if not user:
            return None
        result["user"] = {
            "id": user["user_id"],
            "name": user["username"],
            "email": user["email"],
            "role": user.get("role") or "student",
        }

        cursor.execute(
            """
            SELECT c.course_id, c.title,
                   COALESCE(sp.completion_percent, 0) AS progress
            FROM courses c
            LEFT JOIN student_progress sp
              ON sp.course_id = c.course_id AND sp.user_id = %s
            ORDER BY c.course_id ASC
            """,
            (user_id,),
        )
        courses_rows = cursor.fetchall()
        icons = ["image1.png", "image2.png", "image3.png", "image4.png"]
        courses = []
        for idx, row in enumerate(courses_rows):
            p = int(row.get("progress") or 0)
            courses.append(
                {
                    "id": row["course_id"],
                    "name": row["title"],
                    "progress": p,
                    "message": _progress_message(p),
                    "icon": icons[idx % len(icons)],
                }
            )
        result["courses"] = courses

        cursor.execute(
            """
            SELECT notification_id, title, message, created_at, is_read
            FROM notifications
            WHERE user_id = %s
            ORDER BY created_at DESC
            LIMIT 20
            """,
            (user_id,),
        )
        notes = []
        for row in cursor.fetchall():
            notes.append(
                {
                    "id": f"n{row['notification_id']}",
                    "title": row.get("title") or "Notice",
                    "text": row.get("message") or "",
                    "time": (row.get("created_at") or datetime.utcnow()).strftime("%I:%M%p"),
                    "read": bool(row.get("is_read")),
                }
            )
        result["notifications"] = notes

        cursor.execute(
            """
            SELECT a.announcement_id, a.course_id, a.title, a.content, a.posted_at,
                   u.username AS lecturer_name
            FROM course_announcements a
            LEFT JOIN users u ON u.user_id = a.lecturer_id
            ORDER BY a.posted_at DESC
            LIMIT 50
            """
        )
        result["announcements"] = [
            {
                "id": f"a{row['announcement_id']}",
                "course_id": row["course_id"],
                "title": row.get("title") or "",
                "meta": f"posted at {(row.get('posted_at') or datetime.utcnow()).strftime('%d %b, %I:%M%p')}",
                "text": row.get("content") or "",
                "lecturer": row.get("lecturer_name") or "Lecturer",
            }
            for row in cursor.fetchall()
        ]

        cursor.execute(
            """
            SELECT material_id, course_id, chapter_title, file_type, file_url
            FROM course_materials
            ORDER BY material_id DESC
            LIMIT 100
            """
        )
        result["materials"] = [
            {
                "id": f"m{row['material_id']}",
                "course_id": row["course_id"],
                "name": row.get("chapter_title") or "Untitled",
                "type": (row.get("file_type") or "PDF").upper()[:4],
                "filePath": row.get("file_url") or "#",
            }
            for row in cursor.fetchall()
        ]

        cursor.execute(
            """
            SELECT assignment_id, course_id, title, description, due_date
            FROM assignments
            ORDER BY assignment_id DESC
            LIMIT 100
            """
        )
        assignments = []
        for row in cursor.fetchall():
            title = row.get("title") or ""
            atype = "short"
            low = title.lower()
            if "upload" in low or "group" in low:
                atype = "upload"
            elif "quiz" in low or "mcq" in low:
                atype = "mcq"
            assignments.append(
                {
                    "id": f"asg{row['assignment_id']}",
                    "assignment_id": row["assignment_id"],
                    "course_id": row["course_id"],
                    "title": title,
                    "description": row.get("description") or "",
                    "due": row["due_date"].strftime("%d %b, %I:%M%p")
                    if row.get("due_date")
                    else "No due date",
                    "dueAt": row["due_date"].isoformat() if row.get("due_date") else None,
                    "type": atype,
                }
            )
        result["assignments"] = assignments

        cursor.execute(
            """
            SELECT p.post_id, p.title, p.content, p.created_at, u.username,
                   COUNT(r.reply_id) AS replies
            FROM forum_posts p
            LEFT JOIN users u ON u.user_id = p.user_id
            LEFT JOIN forum_replies r ON r.post_id = p.post_id
            GROUP BY p.post_id, p.title, p.content, p.created_at, u.username
            ORDER BY p.created_at DESC
            LIMIT 100
            """
        )
        result["forum"] = [
            {
                "post_id": row["post_id"],
                "title": row.get("title") or "",
                "author": row.get("username") or "Student",
                "avatar": (row.get("username") or "S")[0:1].upper(),
                "replies": int(row.get("replies") or 0),
                "tag": "General",
                "pinned": False,
                "likes": 0,
                "last": "Just now",
                "content": row.get("content") or "",
                "image": "",
            }
            for row in cursor.fetchall()
        ]

        cursor.execute("SHOW COLUMNS FROM books LIKE 'image_url'")
        has_image_url = cursor.fetchone() is not None
        if has_image_url:
            cursor.execute(
                """
                SELECT book_id, title, price, stock_quantity, image_url
                FROM books
                ORDER BY book_id ASC
                """
            )
        else:
            cursor.execute(
                """
                SELECT book_id, title, price, stock_quantity
                FROM books
                ORDER BY book_id ASC
                """
            )
        result["books"] = [
            {
                "book_id": row["book_id"],
                "title": row.get("title") or "",
                "price": float(row.get("price") or 0),
                "country": "Malaysia",
                "area": "Klang Valley",
                "type": "Book",
                "category": "Featured",
                "image": row.get("image_url") or "",
                "stock_quantity": int(row.get("stock_quantity") or 0),
            }
            for row in cursor.fetchall()
        ]

        cursor.execute(
            """
            SELECT b.title, sc.quantity
            FROM shopping_cart sc
            JOIN books b ON b.book_id = sc.book_id
            WHERE sc.user_id = %s
            """,
            (user_id,),
        )
        cart = {}
        for row in cursor.fetchall():
            cart[row["title"]] = int(row.get("quantity") or 0)
        result["cart"] = cart

        cursor.execute(
            """
            SELECT order_id, total_amount, order_date, status
            FROM orders
            WHERE user_id = %s
            ORDER BY order_date DESC
            LIMIT 20
            """,
            (user_id,),
        )
        result["orders"] = [
            {
                "order_id": row["order_id"],
                "total_amount": float(row.get("total_amount") or 0),
                "order_date": row["order_date"].isoformat() if row.get("order_date") else None,
                "status": row.get("status") or "pending",
            }
            for row in cursor.fetchall()
        ]

        return result
    finally:
        cursor.close()


def add_forum_post(conn, user_id: int, title: str, content: str):
    cursor = conn.cursor()
    try:
        cursor.execute(
            "INSERT INTO forum_posts (user_id, title, content) VALUES (%s, %s, %s)",
            (user_id, title, content),
        )
        conn.commit()
        return cursor.lastrowid
    finally:
        cursor.close()


def add_forum_reply_by_title(conn, user_id: int, post_title: str, content: str):
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute(
            "SELECT post_id FROM forum_posts WHERE title = %s ORDER BY post_id DESC LIMIT 1",
            (post_title,),
        )
        post = cursor.fetchone()
        if not post:
            return False
        cursor.execute(
            "INSERT INTO forum_replies (post_id, user_id, content) VALUES (%s, %s, %s)",
            (post["post_id"], user_id, content),
        )
        conn.commit()
        return True
    finally:
        cursor.close()


def upsert_cart_by_title(conn, user_id: int, title: str, quantity: int):
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("SELECT book_id FROM books WHERE title = %s LIMIT 1", (title,))
        book = cursor.fetchone()
        if not book:
            return False
        book_id = book["book_id"]
        cursor.execute(
            "SELECT cart_id, quantity FROM shopping_cart WHERE user_id = %s AND book_id = %s LIMIT 1",
            (user_id, book_id),
        )
        row = cursor.fetchone()
        if quantity <= 0:
            if row:
                cursor.execute("DELETE FROM shopping_cart WHERE cart_id = %s", (row["cart_id"],))
            conn.commit()
            return True
        if row:
            cursor.execute(
                "UPDATE shopping_cart SET quantity = %s WHERE cart_id = %s",
                (quantity, row["cart_id"]),
            )
        else:
            cursor.execute(
                "INSERT INTO shopping_cart (user_id, book_id, quantity) VALUES (%s, %s, %s)",
                (user_id, book_id, quantity),
            )
        conn.commit()
        return True
    finally:
        cursor.close()


def clear_cart(conn, user_id: int):
    cursor = conn.cursor()
    try:
        cursor.execute("DELETE FROM shopping_cart WHERE user_id = %s", (user_id,))
        conn.commit()
    finally:
        cursor.close()


def checkout(conn, user_id: int):
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute(
            """
            SELECT sc.book_id, sc.quantity, b.price, b.stock_quantity, b.title
            FROM shopping_cart sc
            JOIN books b ON b.book_id = sc.book_id
            WHERE sc.user_id = %s
            """,
            (user_id,),
        )
        items = cursor.fetchall()
        if not items:
            return None
        for item in items:
            stock = int(item.get("stock_quantity") or 0)
            qty = int(item.get("quantity") or 0)
            if qty > stock:
                return {
                    "error": "insufficient_stock",
                    "message": f"Insufficient stock for {item.get('title') or 'book'}",
                }
        total = sum(float(i["price"]) * int(i["quantity"]) for i in items)
        cursor.execute(
            "INSERT INTO orders (user_id, total_amount, status) VALUES (%s, %s, %s)",
            (user_id, total, "paid"),
        )
        order_id = cursor.lastrowid
        for item in items:
            cursor.execute(
                """
                INSERT INTO order_items (order_id, book_id, quantity, price_at_purchase)
                VALUES (%s, %s, %s, %s)
                """,
                (order_id, item["book_id"], item["quantity"], item["price"]),
            )
            cursor.execute(
                "UPDATE books SET stock_quantity = stock_quantity - %s WHERE book_id = %s",
                (item["quantity"], item["book_id"]),
            )
        cursor.execute("DELETE FROM shopping_cart WHERE user_id = %s", (user_id,))
        conn.commit()
        return {"order_id": order_id, "total": round(total, 2)}
    finally:
        cursor.close()


def update_profile(conn, user_id: int, name: str, email: str):
    cursor = conn.cursor()
    try:
        cursor.execute(
            "UPDATE users SET username = %s, email = %s WHERE user_id = %s",
            (name, email, user_id),
        )
        conn.commit()
    finally:
        cursor.close()


def submit_assignment(
    conn,
    user_id: int,
    assignment_id: Optional[int],
    source_label: str,
    text_answer: str | None = None,
):
    cursor = conn.cursor()
    try:
        cursor.execute(
            """
            INSERT INTO assignment_submissions (assignment_id, user_id, text_answer, grade)
            VALUES (%s, %s, %s, %s)
            """,
            (assignment_id, user_id, text_answer, source_label or "Pending"),
        )
        conn.commit()
        return cursor.lastrowid
    finally:
        cursor.close()


def resolve_assignment_id_by_title(conn, title: str):
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute(
            "SELECT assignment_id FROM assignments WHERE title = %s ORDER BY assignment_id DESC LIMIT 1",
            (title,),
        )
        row = cursor.fetchone()
        return int(row["assignment_id"]) if row else None
    finally:
        cursor.close()

