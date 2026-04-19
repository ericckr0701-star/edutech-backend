import os


def _parse_origins(raw: str):
    parts = [p.strip() for p in raw.split(",")]
    return [p for p in parts if p]


class Config:
    SECRET_KEY = os.environ.get("FLASK_SECRET_KEY", "dev-change-me")
    MYSQL_HOST = os.environ.get("MYSQL_HOST", "localhost")
    MYSQL_USER = os.environ.get("MYSQL_USER", "root")
    MYSQL_PASSWORD = os.environ.get("MYSQL_PASSWORD", "")
    # 作业演示可用空库 group_project；小组全库用 education_cli
    MYSQL_DATABASE = os.environ.get("MYSQL_DATABASE", "education_cli")
    CORS_ORIGINS = _parse_origins(
        os.environ.get(
            "CORS_ORIGINS",
            "http://127.0.0.1:3000,http://localhost:3000,"
            "http://127.0.0.1:5173,http://localhost:5173,"
            "http://127.0.0.1:5500,http://localhost:5500,"
            "https://edutech-pltform.vercel.app",
        )
    )

    @staticmethod
    def use_edutech_users():
        """
        True：使用 EduTech_Final_DB.sql 中的 users（user_id, password_hash, email…）。
        False：使用作业要求的最小表 users（id, username, password bcrypt）。
        未设置 USE_EDUTECH_USERS 时，库名为 education_cli 则视为 EduTech。
        """
        v = os.environ.get("USE_EDUTECH_USERS", "").strip().lower()
        if v in ("1", "true", "yes", "on"):
            return True
        if v in ("0", "false", "no", "off"):
            return False
        # 与 Config.MYSQL_DATABASE 默认一致：未设环境变量时仍为 education_cli
        return Config.MYSQL_DATABASE == "education_cli"
