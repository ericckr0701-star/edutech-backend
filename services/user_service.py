import secrets
import string
from typing import Optional

from config import Config
from database.users import get_user_by_username, insert_user, username_exists


def _placeholder_email(username: str) -> str:
    safe = "".join(c if c in string.ascii_letters + string.digits else "_" for c in username)[
        :30
    ]
    if not safe:
        safe = "user"
    return f"{safe}_{secrets.token_hex(5)}@student.edu.local"


def try_register_user(conn, bcrypt, username: str, password: str):
    if Config.use_edutech_users():
        if len(username) > 50:
            return False, "Username must be at most 50 characters"
    else:
        if len(username) > 255:
            return False, "Username must be at most 255 characters"
    if username_exists(conn, username):
        return False, "Username already exists"
    hashed = bcrypt.generate_password_hash(password).decode("utf-8")
    if Config.use_edutech_users():
        insert_user(conn, username, hashed, email=_placeholder_email(username))
    else:
        insert_user(conn, username, hashed)
    return True, None


def verify_login(conn, bcrypt, username: str, password: str) -> Optional[dict]:
    user = get_user_by_username(conn, username)
    if not user:
        return None
    stored = user.get("password_hash") or ""
    if Config.use_edutech_users():
        if not stored.startswith("$2"):
            return None
    if not bcrypt.check_password_hash(stored, password):
        return None
    return {
        "id": user["user_id"],
        "username": user["username"],
        "role": (user.get("role") or "student") if Config.use_edutech_users() else "student",
    }
