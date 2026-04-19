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
    return {
        "host": Config.MYSQL_HOST,
        "port": int(os.environ.get("MYSQL_PORT", "3306")),
        "user": Config.MYSQL_USER,
        "password": Config.MYSQL_PASSWORD,
        "database": Config.MYSQL_DATABASE,
    }


def get_db_connection():
    p = _mysql_connect_params()
    return mysql.connector.connect(**p)
