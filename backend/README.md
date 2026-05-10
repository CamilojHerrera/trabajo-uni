# Node.js + PostgreSQL REST API

Réplica exacta del tutorial **"Nodejs & PostgreSQL REST API"** de [Fazt Code](https://www.youtube.com/watch?v=OtxEG8TIEcE).

API REST construida con **Node.js 20**, **Express** y **PostgreSQL** usando el módulo `pg` directamente (sin ORM). Utiliza las nuevas características nativas de Node.js: `--env-file` para cargar variables de entorno y `--watch` para recargar automáticamente en desarrollo.

---

## Tecnologías

| Herramienta | Uso |
|---|---|
| Node.js 20+ | Runtime — usa `--env-file` y `--watch` nativos |
| Express 4 | Framework HTTP y routing |
| pg (node-postgres) | Driver PostgreSQL sin ORM |
| morgan | Logger de peticiones HTTP |
| cors | Habilita CORS para el frontend |
| Docker Compose | Levanta PostgreSQL localmente |

---

## Estructura de archivos

```
backend/
├── database/
│   └── db.sql              ← Schema SQL + datos de ejemplo
├── src/
│   ├── config.js           ← Lee variables de entorno
│   ├── db.js               ← Pool de conexión pg
│   ├── index.js            ← Servidor Express
│   ├── controllers/
│   │   └── index.controller.js  ← Lógica CRUD
│   └── routes/
│       └── users.routes.js ← Definición de rutas
├── .env.template           ← Plantilla de variables de entorno
├── .nvmrc                  ← Node 20
├── docker-compose.yml      ← PostgreSQL en Docker
├── eslint.config.js
└── package.json
```

---

## Instalación local

### Opción A — Con Docker (recomendado, sin instalar PostgreSQL)

```bash
# 1. Levantar PostgreSQL con Docker
docker compose up -d

# 2. Instalar dependencias
npm install

# 3. Copiar variables de entorno (ya vienen configuradas para Docker)
cp .env.template .env

# 4. Crear la tabla e insertar datos de ejemplo
# Conéctate a psql y ejecuta database/db.sql
# psql -U fazt -d nodepg -f database/db.sql

# 5. Iniciar el servidor en modo desarrollo
npm run dev
```

### Opción B — PostgreSQL local o servicio cloud

```bash
npm install
cp .env.template .env
# Edita .env con tus credenciales reales
npm run dev
```

> **Nota:** `npm run dev` usa `node --env-file .env --watch` — requiere **Node.js 20.6+** y recarga automáticamente al guardar un archivo. No necesita `nodemon` ni `dotenv`.

El servidor arranca en `http://localhost:3000`.

---

## Variables de entorno

Copia `.env.template` a `.env` y ajusta los valores:

```env
DB_USER=fazt
DB_PASSWORD=faztpassword
DB_HOST=localhost
DB_DATABASE=nodepg
DB_PORT=5432

PORT=3000
```

---

## Schema de la base de datos

```sql
CREATE TABLE users (
    id         SERIAL PRIMARY KEY,
    name       VARCHAR(40),
    email      TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

Ejecuta `database/db.sql` para crear la tabla e insertar datos de prueba.

---

## Endpoints

Base URL: `http://localhost:3000`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/health` | Health check |
| GET | `/users` | Obtener todos los usuarios |
| GET | `/users/:id` | Obtener usuario por ID |
| POST | `/users` | Crear usuario |
| PUT | `/users/:id` | Actualizar usuario |
| DELETE | `/users/:id` | Eliminar usuario |

### Ejemplos con curl

```bash
# Listar usuarios
curl http://localhost:3000/users

# Crear usuario
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Maria", "email": "maria@example.com"}'

# Actualizar usuario
curl -X PUT http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Maria Lopez", "email": "maria@example.com"}'

# Eliminar usuario
curl -X DELETE http://localhost:3000/users/1
```

---

## Despliegue en producción

### Render.com (plan gratuito)

1. Sube el proyecto a GitHub
2. Ve a [render.com](https://render.com) → **New Web Service**
3. Conecta tu repo, selecciona la carpeta `backend`
4. Build: `npm install` | Start: `npm start`
5. Agrega las variables de entorno de `.env.template` en el dashboard
6. Para la BD: crea un PostgreSQL en Render o en [Neon.tech](https://neon.tech)

### Railway.app

```bash
railway login
cd backend
railway init
railway add --database postgresql
railway up
```
