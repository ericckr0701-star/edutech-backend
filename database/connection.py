import os
from urllib.parse import unquote, urlparse

import mysql.connector

from config import Config


def _mysql_connect_params():
    """优先读 DATABASE_URL / MYSQL_URL（云平台常见），否则读分项环境变量。"""
    raw = (os.environ.get("DATABASE_URL") or os.environ.get("MYSQL_URL") or "").strip()
    if raw.startswith("mysql://"):
        # urlparse 对 mysql:// 支持差，临时换成 http://
        u = urlparse(raw.replace("mysql://", "http://", 1))
        db = (u.path or "/")[1:].split("?")[0]
        return {
            "host": u.hostname or "localhost",
            "port": u.port or 3306,
            "user": unquote(u.username or ""),
            "password": unquote(u.password or ""),
            "database": db,
        }
    # 分项变量：兼容 Railway 常用名 MYSQLHOST / MYSQLUSER（无下划线）
    host = (
        os.environ.get("MYSQL_HOST")
        or os.environ.get("MYSQLHOST")
        or Config.MYSQL_HOST
    )
    port = int(
        os.environ.get("MYSQL_PORT") or os.environ.get("MYSQLPORT") or "3306"
    )
    user = (
        os.environ.get("MYSQL_USER")
        or os.environ.get("MYSQLUSER")
        or Config.MYSQL_USER
    )
    password = (
        os.environ.get("MYSQL_PASSWORD")
        or os.environ.get("MYSQLPASSWORD")
        or Config.MYSQL_PASSWORD
    )
    database = (
        os.environ.get("MYSQL_DATABASE")
        or os.environ.get("MYSQLDATABASE")
        or Config.MYSQL_DATABASE
    )
    if os.environ.get("RAILWAY_ENVIRONMENT") == "production" and host in (
        "localhost",
        "127.0.0.1",
    ):
        raise RuntimeError(
            "Railway Web 正在连 localhost MySQL，说明未连上云数据库。"
            "请在 Web 服务的 Variables 里：1) 添加 DATABASE_URL，值为 ${{MySQL.MYSQL_URL}}；"
            "2) 删除 MYSQL_HOST=localhost、MYSQL_PASSWORD=your_mysql_password 等占位变量。"
        )
    return {
        "host": host,
        "port": port,
        "user": user,
        "password": password,
        "database": database,
    }


def get_db_connection():
    p = _mysql_connect_params()
    # 仅用 C 扩展支持的参数；勿传 allow_public_key_retrieval（会 AttributeError）。
    # SSL：若需关闭，在 DATABASE_URL 上由平台配置，或查阅当前 mysql-connector 版本支持的 connect 参数。
    return mysql.connector.connect(**p)
