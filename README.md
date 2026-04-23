# ⚖️ SIGJEP
### Sistema Inteligente de Gestión Jurídica para Entidades Públicas

**SENA — Programación de Software | Código: 223104**

---

## 📋 ¿Qué es SIGJEP?

SIGJEP es una aplicación web para automatizar la gestión jurídica de alcaldías y entidades públicas colombianas. Permite gestionar expedientes electrónicos de tutelas, demandas y PQRS, clasificar documentos con Inteligencia Artificial, generar resúmenes jurídicos automáticos y alertar sobre vencimientos de tiempos legales.

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | HTML5, CSS3, JavaScript ES6+, Bootstrap 5 |
| Backend | Python 3.13, FastAPI |
| Base de datos | MySQL local (MySQL Workbench) |
| Almacenamiento | Carpeta uploads/ local |
| Autenticación | FastAPI Users + JWT |
| Inteligencia Artificial | Google Gemini API (google-genai) |
| Backups | Google Drive API |
| Control de versiones | Git / GitHub |

---

## 📁 Estructura del Proyecto

```
PROYECTO-SIGJEP/
├── backend/
│   ├── routers/
│   │   ├── __init__.py
│   │   ├── auth.py           # Login y roles
│   │   ├── expedientes.py    # CRUD expedientes
│   │   ├── casos.py          # CRUD casos
│   │   ├── documentos.py     # Subir y descargar archivos
│   │   ├── usuarios.py       # CRUD usuarios
│   │   ├── ia.py             # Clasificacion con Gemini
│   │   ├── backups.py        # Backups a Google Drive
│   │   └── reportes.py       # Estadisticas
│   ├── uploads/              # Archivos subidos por usuarios
│   ├── main.py               # Archivo principal FastAPI
│   ├── database.py           # Conexion a MySQL
│   ├── requirements.txt      # Librerias Python
│   ├── .env.example          # Plantilla de variables de entorno
│   └── .gitignore
├── frontend/
│   ├── index.html            # Login
│   ├── pages/                # Paginas de la aplicacion
│   ├── components/           # Header, sidebar, footer
│   ├── css/                  # Estilos
│   └── js/                   # Logica frontend
├── .github/
│   └── PULL_REQUEST_TEMPLATE.md
└── README.md
```

---

## ⚙️ Instalación y Configuración

### Requisitos previos

- Python 3.13 instalado
- MySQL Workbench instalado
- Git instalado
- VS Code (recomendado)

### 1. Configurar el backend

```bash
cd backend
py -3.13 -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

> ⚠️ Si aparece ERROR al instalar, ejecuta estos comandos alternativos:
> ```bash
> python.exe -m pip install --upgrade pip
> pip install fastapi "uvicorn[standard]" pymysql fastapi-users bcrypt google-genai python-multipart python-dotenv jinja2 sqlalchemy aiomysql google-api-python-client google-auth-httplib2
> pip freeze | Out-File -FilePath requirements.txt -Encoding utf8
> ```

### 2. Configurar MySQL

#### 3.1 Crear la base de datos

Abre MySQL Workbench y ejecuta:

```sql
CREATE DATABASE IF NOT EXISTS sigjep_db;
USE sigjep_db;
```

#### 3.2 Crear las tablas

Ejecuta el archivo `schema.sql` que está en la carpeta `backend/`:

```
MySQL Workbench → File → Open SQL Script → selecciona backend/schema.sql → Execute
```

O desde la terminal:

```bash
& "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p sigjep_db < schema.sql
```

#### 3.3 Tablas del sistema

| Tabla | Descripción |
|-------|-------------|
| `usuarios` | Usuarios del sistema con roles |
| `casos` | Casos jurídicos (tutelas, demandas, PQRS) |
| `expedientes` | Expedientes electrónicos por caso |
| `documentos` | Archivos subidos por los usuarios |
| `borradores_respuesta` | Borradores generados por IA |
| `ia_resumenes` | Resumenes generados por Gemini |
| `backups_log` | Historial de backups a Google Drive |

#### 3.4 Roles del sistema

| Rol | Permisos |
|-----|----------|
| `administrador` | Acceso total al sistema |
| `abogado` | Gestionar expedientes y casos |
| `auxiliar` | Apoyo documental |
| `ciudadano` | Solo PQRS |

### 3. Configurar las variables de entorno

Crea un archivo `.env` dentro de `backend/` basándote en `.env.example`:

```
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=tu_password_mysql
MYSQL_DB=sigjep_db

GEMINI_API_KEY=tu_clave_gemini

SECRET_KEY=clave_larga_y_segura
```

> ⚠️ Pide las claves al líder del proyecto. El archivo `.env` nunca se sube a GitHub.

### 4. Arrancar el servidor

```bash
uvicorn main:app --reload
```

El servidor queda disponible en: `http://localhost:8000`
Documentación de la API: `http://localhost:8000/docs`

---

### Tipos de commit

| Tipo | Uso |
|------|-----|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de bug |
| `docs` | Cambios en documentación |
| `style` | Cambios de formato |
| `refactor` | Refactorización de código |

---

## 📦 Librerías Principales

| Librería | Uso |
|----------|-----|
| `fastapi` | Framework principal del backend |
| `uvicorn` | Servidor ASGI |
| `pymysql` | Conexión con MySQL |
| `fastapi-users` | Login, roles y JWT |
| `bcrypt` | Encriptar contraseñas |
| `sqlalchemy` | ORM para base de datos |
| `aiomysql` | MySQL asíncrono |
| `google-genai` | Inteligencia Artificial con Gemini |
| `google-api-python-client` | Google Drive para backups |
| `google-auth-httplib2` | Autenticación Google Drive |
| `python-dotenv` | Variables de entorno |
| `python-multipart` | Subida de archivos |
| `jinja2` | Plantillas HTML |

---

## 👥 Equipo de Desarrollo

| Nombre |
|--------|
| Valentina|
| Brayan Trujillo |
| Daniel Dionisio |
| Miguel Corredor |

**Instructora:** Jenny Guio


*SIGJEP — SENA Programación de Software 223104 — 2026*
