# Node.js + PostgreSQL REST API — Monorepo

Réplica completa del tutorial **["Nodejs & PostgreSQL REST API"](https://www.youtube.com/watch?v=OtxEG8TIEcE)** de **Fazt Code**.

---

## Stack

| Capa | Tecnología | Detalle |
|---|---|---|
| **Backend** | Node.js 20 | `--env-file` y `--watch` nativos (sin dotenv/nodemon) |
| | Express 4.19 | HTTP + routing |
| | pg 8.11 | Driver PostgreSQL directo, sin ORM |
| | morgan | Logger de peticiones |
| | cors | CORS para el frontend |
| **Base de datos** | PostgreSQL | Tabla `users` (id, name, email, created_at) |
| | Docker Compose | Levanta PostgreSQL en un contenedor |
| **Frontend** | React 18 + Vite 5 | SPA que consume la API |
| | Tailwind CSS 3 | Estilos utilitarios |
| | Axios | Cliente HTTP |
| **Despliegue** | Render / Railway | Backend gratuito |
| | Netlify / Vercel | Frontend gratuito |

---

## Estructura del proyecto

```
/
├── backend/
│   ├── database/
│   │   └── db.sql              ← Schema SQL + datos de ejemplo
│   ├── src/
│   │   ├── config.js           ← Variables de entorno
│   │   ├── db.js               ← Pool de conexión pg
│   │   ├── index.js            ← Servidor Express
│   │   ├── controllers/
│   │   │   └── index.controller.js
│   │   └── routes/
│   │       └── users.routes.js
│   ├── .env.template
│   ├── docker-compose.yml
│   ├── eslint.config.js
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Alert.jsx
│   │   │   ├── UserForm.jsx
│   │   │   ├── UserItem.jsx
│   │   │   └── UserTable.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── .env.example
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── netlify.toml
│   └── vercel.json
│
└── README.md
```

---

## Endpoints del backend

Base URL: `http://localhost:3000`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/health` | Health check → `{ status: "ok" }` |
| GET | `/users` | Todos los usuarios (ORDER BY id ASC) |
| GET | `/users/:id` | Un usuario por ID |
| POST | `/users` | Crear usuario `{ name, email }` |
| PUT | `/users/:id` | Actualizar usuario `{ name, email }` |
| DELETE | `/users/:id` | Eliminar usuario (responde 204) |

---

## Correr localmente

### Paso 1 — Base de datos con Docker

```bash
cd backend
docker compose up -d
```

Esto levanta PostgreSQL en `localhost:5432` con usuario `fazt`, contraseña `faztpassword` y base de datos `nodepg`.

### Paso 2 — Crear la tabla

```bash
# Conectarse al contenedor de PostgreSQL
docker exec -it backend-db-1 psql -U fazt -d nodepg

# Dentro de psql, ejecutar el schema:
\i /ruta/al/proyecto/backend/database/db.sql
# O copiar y pegar el contenido de database/db.sql
```

### Paso 3 — Backend

```bash
cd backend
npm install
cp .env.template .env    # Las credenciales ya coinciden con Docker
npm run dev              # node --env-file .env --watch src/index.js
# → Server on port 3000
```

> Requiere **Node.js 20.6+** para `--env-file`.

### Paso 4 — Frontend

```bash
cd frontend
npm install
cp .env.example .env     # Ya apunta a http://localhost:3000
npm run dev
# → http://localhost:5173
```

---

