# 公开部署完整步骤（一个一个做）

目标：得到一个 **`https://...` 的 API 地址**，让 [Vercel 前端](https://edutech-pltform.vercel.app/) 能访问你的 Flask 后端。

平台以 **[Railway](https://railway.app/)** 为例（也可用 Render / Fly.io，思路相同）。

---

## 第一步：注册 GitHub

1. 打开 <https://github.com/>  
2. 注册或登录账号。

---

## 第二步：在 GitHub 上新建空仓库

1. 右上角 **+** → **New repository**。  
2. **Repository name** 填例如 `edutech-backend`。  
3. 选 **Public**（或 Private 也可）。  
4. **不要**勾选 “Add a README”（你本地已有代码）。  
5. 点 **Create repository**。  
6. 页面会显示 `git remote add origin ...`，**先不要关**，后面要用。

---

## 第三步：在电脑上把后端推上去

1. 打开 **cmd** 或 **PowerShell**。  
2. 进入项目目录：

```cmd
cd /d c:\Users\User\backend
```

3. 若从未初始化过 Git，执行：

```cmd
git init
git add .
git commit -m "Initial backend"
```

4. 把第二步里 GitHub 给你的地址（HTTPS）贴进下面（替换成你的）：

```cmd
git remote add origin https://github.com/你的用户名/edutech-backend.git
git branch -M main
git push -u origin main
```

5. 若 `git push` 要求登录，按 GitHub 提示用浏览器或 **Personal Access Token** 登录。

6. 打开 GitHub 仓库网页，确认能看到 **`app.py`**、**`requirements.txt`**、**`Procfile`** 等文件。

---

## 第四步：注册 Railway

1. 打开 <https://railway.app/>  
2. 用 **GitHub 账号** 登录并授权。

---

## 第五步：在 Railway 新建项目并部署后端

1. 点 **New Project**。  
2. 选 **Deploy from GitHub repo**。  
3. 若提示连接 GitHub，按指引 **Configure GitHub** → 允许 Railway 访问你的仓库。  
4. 在列表里选中 **`edutech-backend`**（或你起的仓库名）。  
5. Railway 会开始 **Build + Deploy**，等待第一次部署完成（可能失败，因为还没数据库，**先继续第六步**）。

---

## 第六步：在 Railway 添加 MySQL

1. 在同一 **Project** 里点 **Create** 或 **New** → **Database** → **MySQL**（或 **Add MySQL**）。  
2. 等待 MySQL 创建完成。  
3. 点进 **MySQL** 服务 → 打开 **Variables**（或 **Connect**）标签。  
4. 找到 **`DATABASE_URL`** 或 **`MYSQL_URL`** 或类似 **`mysql://...`** 的整串连接（不同界面名字可能略有差异）。  
5. **复制**这一整串（不要发到公开群，含密码）。

---

## 第七步：把数据库连到你的 Web 服务

1. 点进你的 **Web 服务**（部署 Flask 的那个服务，名字可能是 `edutech-backend` 或 `web`）。  
2. 打开 **Variables**。  
3. **New Variable**：  
   - Name：`DATABASE_URL`  
   - Value：粘贴第六步复制的 **`mysql://...`** 整串。  
4. 保存。Railway 会 **自动重新部署**。

（若平台给的是分项变量而不是 URL，则分别添加：`MYSQL_HOST`、`MYSQL_PORT`、`MYSQL_USER`、`MYSQL_PASSWORD`、`MYSQL_DATABASE`，值从 MySQL 服务页面复制。）

---

## 第八步：配置 Web 服务其余环境变量

仍在 **Web 服务 → Variables**，逐个添加：

| 变量名 | 填什么 |
|--------|--------|
| `FLASK_SECRET_KEY` | 随便一长串随机字符（30 位以上） |
| `SESSION_COOKIE_CROSS_SITE` | `true` |
| `CORS_ORIGINS` | `https://edutech-pltform.vercel.app` |
| `MYSQL_DATABASE` | **仅当你没用 `DATABASE_URL` 时**才需要；若 URL 里已带库名可不必单独设 |

说明：

- **`PORT`**：Railway 会自动注入，**不要**自己随便填。  
- 若云 MySQL 里的**库名**不是 `education_cli`，还要设 **`MYSQL_DATABASE=实际库名`**，并视情况设 **`USE_EDUTECH_USERS=true`**（使用 EduTech 表结构时）。

保存后等待 **Redeploy** 成功。

---

## 第九步：把表导入「云上的 MySQL」

云数据库是**新库**，需要执行一次 **`EduTech_Final_DB.sql`**。

1. 在 Railway 的 MySQL 页面找到：**Host、Port、User、Password、Database 名**。  
2. 在你本机 **cmd**（已配置 `mysql` 命令）执行（把下面占位全部换成你的真实值）：

```cmd
cd /d c:\Users\User\backend
mysql -h 云主机地址 -P 端口 -u 用户名 -p 库名 < EduTech_Final_DB.sql
```

3. 回车后输入 **密码**。无报错即成功。  
4. 若 `mysql` 命令不可用，用 **MySQL Workbench** 新建连接指向云主机，再 **Run SQL Script** 选择 `EduTech_Final_DB.sql`。

导入后，库里应有 **`education_cli`** 脚本里的各张表（若连接串里的默认库名不同，以你实际连接的库为准）。

---

## 第十步：拿到公网 HTTPS 地址

1. 打开 **Web 服务** → **Settings** 或主界面里的 **Networking / Generate Domain**。  
2. 点 **Generate Domain**（或类似「生成域名」）。  
3. 会得到类似：**`https://xxxx.up.railway.app`**。  
4. **复制并保存**这个地址，这就是 **API 根地址**。

---

## 第十一步：自测线上 API

在浏览器或用 curl（把地址换成你的）：

```text
https://你的域名.up.railway.app/register
```

用 **POST** + JSON：`{"username":"online1","password":"test12345"}`（可用 Postman）。

再测 **login**、**user**（带 Cookie）。能通则部署成功。

---

## 第十二步：发给前端同学

发下面一段话（把 `https://...` 换成第十步的地址）：

> API 根地址：**`https://xxxx.up.railway.app`**  
> 所有请求加：**`credentials: 'include'`**（或 Axios `withCredentials: true`）。  
> 环境变量里把 API Base URL 改成上面这个 **https 地址**，不要用 localhost。

---

## 若部署失败，先看这两样

1. **Build 日志**：是否 `pip install -r requirements.txt` 成功。  
2. **Deploy 日志**：是否 **`gunicorn app:app`** 启动成功；是否报 **连不上 MySQL**（多半是 `DATABASE_URL` 错或云库还没导入表）。

---

做完 **第一～十二步**，公开访问链路就通了。本地开发仍用 **`python app.py`**，不必删。
