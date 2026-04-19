# Group Project — Backend (Flask + MySQL + bcrypt)

满足课程要求：**Flask 服务、MySQL、bcrypt 哈希、JSON API、CORS、分层代码（`database/` + `services/`）**。

## 两种数据库模式（二选一）

| 模式 | 何时使用 | `users` 表 |
|------|-----------|------------|
| **作业最小表** | 只交作业要求的注册/登录演示 | `id`, `username` UNIQUE, `password`（bcrypt）；首次请求时 **自动 `CREATE TABLE IF NOT EXISTS`** |
| **EduTech 小组库** | 已导入 `EduTech_Final_DB.sql` | `user_id`, `username`, `email`, `password_hash`, `role`… |

**如何选择**

- **小组全库（默认）**：`MYSQL_DATABASE=education_cli` 且已导入 `EduTech_Final_DB.sql`。未设置 `USE_EDUTECH_USERS` 时，程序会把库名 `education_cli` **自动当作 EduTech 模式**。
- **严格按作业 DDL**：新建空库 `group_project`，设置 `MYSQL_DATABASE=group_project`（库名不是 `education_cli` 即走作业表；也可显式 `USE_EDUTECH_USERS=false`）。

## 环境要求

- Python 3.9+（推荐 3.10+）
- MySQL 8.x（或兼容版本）

## 1. 数据库准备

### A) 作业最小模式（`group_project`）

```sql
CREATE DATABASE IF NOT EXISTS group_project CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

无需导入 SQL；启动后第一次访问 API 会自动建 `users` 表。

### B) EduTech 模式（`education_cli`）

```sql
CREATE DATABASE IF NOT EXISTS education_cli CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

在项目目录执行（`mysql` 需在 PATH 中）：

```text
mysql -u root -p education_cli < EduTech_Final_DB.sql
```

说明：SQL 里示例行的 `password_hash` 为明文，**无法用 bcrypt 登录**；请用 `POST /register` 注册新用户。

## 2. 安装依赖

```bash
cd backend
python -m venv .venv
```

**Windows (cmd)：**

```cmd
.venv\Scripts\activate.bat
pip install -r requirements.txt
```

**Windows (PowerShell)：**

```powershell
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

## 3. 环境变量

在启动 `python app.py` 的**同一终端**中设置（示例为 cmd）：

```cmd
set MYSQL_HOST=localhost
set MYSQL_USER=root
set MYSQL_PASSWORD=你的密码
set MYSQL_DATABASE=education_cli
set FLASK_SECRET_KEY=至少32位随机字符串
set CORS_ORIGINS=http://127.0.0.1:5173,http://localhost:5173
```

作业最小库时把 `MYSQL_DATABASE` 改为 `group_project`。

可选：`set USE_EDUTECH_USERS=true` 或 `false` 可**强制**覆盖自动判断。

## 4. 启动服务

```bash
python app.py
```

默认监听 `http://127.0.0.1:5000`。

## API（全部为 JSON）

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/register` | Body: `{"username","password"}` → `{"status":"success"}` 或 `{"status":"error","message":"..."}` |
| POST | `/login` | 同上；成功 `{"status":"success"}`，失败 `{"status":"error","message":"Invalid credentials"}` |
| GET | `/user` | 基于 Session；未登录 `401`；成功含 `user`（`id`, `username`；EduTech 登录还带 `role`） |
| POST | `/upload` | `multipart/form-data`，字段名 `file` |

前端跨域带 Cookie：`credentials: 'include'` / Axios `withCredentials: true`，并把前端 Origin 写入 `CORS_ORIGINS`。

### 公开部署（让别人能打开 Vercel 网站用你的 API）

**按编号一步一步做：请打开仓库里的 [`DEPLOY_STEPS.md`](DEPLOY_STEPS.md)**（共 12 步：GitHub → Railway → MySQL → 环境变量 → 导入 SQL → 域名 → 发给前端）。

概要：**把 Flask 部署到公网 HTTPS**，数据库用**云上的 MySQL**；本地 `python app.py` 仍可用于开发，线上由 **`Procfile` 里的 gunicorn** 启动。

### 与 Vercel 前端联调（如 [EduTech Platform](https://edutech-pltform.vercel.app/)）

- 默认 `CORS_ORIGINS` 已包含 `https://edutech-pltform.vercel.app`；若你们换了域名，用环境变量 `CORS_ORIGINS` 覆盖并写上完整 Origin（无末尾 `/`）。
- **HTTPS 页面不能随意请求 `http://127.0.0.1:5000`**：浏览器常会拦截混合内容。线上用户访问 Vercel 时，API 需为 **公网可访问的 HTTPS 地址**（把 Flask 部署到 Render / Railway / 云主机 + HTTPS，或先用 ngrok 等隧道得到 `https://...`）。
- 当前端与 API **不同域**且均为 HTTPS、需要 Session Cookie 时，在 API 侧设置环境变量 **`SESSION_COOKIE_CROSS_SITE=true`**（已在代码中启用 `SameSite=None` + `Secure`）；**仅当 API 本身为 HTTPS 时** Cookie 才会生效。

## 项目结构

- `app.py` — Flask、CORS、路由、作业模式下首次建表
- `config.py` — 配置与 `use_edutech_users()` 判断
- `database/connection.py` — MySQL 连接
- `database/users.py` — 按模式分支的 SQL 函数
- `services/user_service.py` — 注册/登录业务
- `EduTech_Final_DB.sql` — 小组完整库（仅 EduTech 模式需要导入）
