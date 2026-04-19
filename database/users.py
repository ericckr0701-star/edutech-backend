"""users 表的数据库操作。支持作业最小表与 EduTech 全库两种结构（由 Config.use_edutech_users() 决定）。"""

from typing import Optional

from config import Config


def init_simple_users_table(conn):
    """作业要求：id 主键、username 唯一、password 存 bcrypt 哈希。"""
    if Config.use_edutech_users():
        return
    cursor = conn.cursor()
    try:
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) NOT NULL UNIQUE,
                `password` VARCHAR(255) NOT NULL
            )
            """
        )
        conn.commit()
    finally:
        cursor.close()


def username_exists(conn, username: str) -> bool:
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT 1 FROM users WHERE username = %s", (username,))
        return cursor.fetchone() is not None
    finally:
        cursor.close()


def insert_user(conn, username: str, password_hash: str, email: Optional[str] = None):
    """EduTech 模式需传入 email；简单模式忽略 email。"""
    cursor = conn.cursor()
    try:
        if Config.use_edutech_users():
            if not email:
                raise ValueError("email required in EduTech mode")
            cursor.execute(
                """
                INSERT INTO users (username, email, password_hash, role)
                VALUES (%s, %s, %s, %s)
                """,
                (username, email, password_hash, "student"),
            )
        else:
            cursor.execute(
                "INSERT INTO users (username, `password`) VALUES (%s, %s)",
                (username, password_hash),
            )
        conn.commit()
        return cursor.lastrowid
    finally:
        cursor.close()


def get_user_by_username(conn, username: str):
    """返回含 password_hash 键的 dict（简单模式由列 password 别名而来），无则 None。"""
    cursor = conn.cursor(dictionary=True)
    try:
        if Config.use_edutech_users():
            cursor.execute(
                """
                SELECT user_id, username, password_hash, email, role
                FROM users
                WHERE username = %s
                ORDER BY user_id DESC
                LIMIT 1
                """,
                (username,),
            )
            return cursor.fetchone()
        cursor.execute(
            """
            SELECT id AS user_id, username,
                   `password` AS password_hash
            FROM users
            WHERE username = %s
            LIMIT 1
            """,
            (username,),
        )
        return cursor.fetchone()
    finally:
        cursor.close()
