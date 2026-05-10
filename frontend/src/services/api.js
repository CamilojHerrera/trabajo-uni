// Capa de acceso a la API.
// Centraliza todas las llamadas HTTP al backend de Node.js + PostgreSQL.

import axios from "axios";

// En desarrollo apunta a http://localhost:3000
// En producción se reemplaza por VITE_API_URL en el .env de Netlify/Vercel
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

// Convierte errores de axios en mensajes legibles
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.message ||
      "Error desconocido";
    return Promise.reject(new Error(message));
  }
);

/** Obtiene todos los usuarios */
export const fetchUsers = () =>
  api.get("/users").then((res) => res.data);

/** Obtiene un usuario por ID */
export const fetchUserById = (id) =>
  api.get(`/users/${id}`).then((res) => res.data[0]);

/** Crea un nuevo usuario. Payload: { name, email } */
export const createUser = (payload) =>
  api.post("/users", payload).then((res) => res.data);

/** Actualiza un usuario. Payload: { name, email } */
export const updateUser = (id, payload) =>
  api.put(`/users/${id}`, payload).then((res) => res.data);

/** Elimina un usuario por ID */
export const deleteUser = (id) =>
  api.delete(`/users/${id}`);
