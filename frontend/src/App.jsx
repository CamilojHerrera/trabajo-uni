// Componente raíz de la aplicación.
// Gestiona el estado global: lista de usuarios, modo edición y notificaciones.
// Consume la REST API de Node.js + PostgreSQL del video de Fazt Code.

import { useState, useEffect, useCallback } from "react";
import UserTable from "./components/UserTable";
import UserForm  from "./components/UserForm";
import Alert     from "./components/Alert";
import { fetchUsers, createUser, updateUser, deleteUser } from "./services/api";

export default function App() {
  // ── Estado ────────────────────────────────────────────────────────────────
  const [users,       setUsers]       = useState([]);
  const [editingUser, setEditingUser] = useState(null);   // null = modo creación
  const [loadingList, setLoadingList] = useState(true);
  const [loadingForm, setLoadingForm] = useState(false);
  const [deletingId,  setDeletingId]  = useState(null);
  const [alert,       setAlert]       = useState(null);   // { type, message }

  const showAlert  = (type, message) => setAlert({ type, message });
  const clearAlert = useCallback(() => setAlert(null), []);

  // ── Carga inicial ─────────────────────────────────────────────────────────
  const loadUsers = useCallback(async () => {
    setLoadingList(true);
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      showAlert("error", `No se pudo conectar al backend: ${err.message}`);
    } finally {
      setLoadingList(false);
    }
  }, []);

  useEffect(() => { loadUsers(); }, [loadUsers]);

  // ── Crear ─────────────────────────────────────────────────────────────────
  const handleCreate = async (payload) => {
    setLoadingForm(true);
    try {
      const newUser = await createUser(payload);
      setUsers((prev) => [...prev, newUser]);
      showAlert("success", `Usuario "${newUser.name}" creado correctamente`);
    } catch (err) {
      showAlert("error", `Error al crear: ${err.message}`);
    } finally {
      setLoadingForm(false);
    }
  };

  // ── Actualizar ────────────────────────────────────────────────────────────
  const handleUpdate = async (payload) => {
    if (!editingUser) return;
    setLoadingForm(true);
    try {
      const updated = await updateUser(editingUser.id, payload);
      setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
      setEditingUser(null);
      showAlert("success", `Usuario "${updated.name}" actualizado correctamente`);
    } catch (err) {
      showAlert("error", `Error al actualizar: ${err.message}`);
    } finally {
      setLoadingForm(false);
    }
  };

  // ── Eliminar ──────────────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      if (editingUser?.id === id) setEditingUser(null);
      showAlert("success", "Usuario eliminado correctamente");
    } catch (err) {
      showAlert("error", `Error al eliminar: ${err.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h1 className="font-bold text-gray-900 leading-tight">Gestión de Usuarios</h1>
              <p className="text-xs text-gray-400">Node.js + PostgreSQL REST API · Fazt Code</p>
            </div>
          </div>

          <button
            onClick={loadUsers}
            disabled={loadingList}
            title="Recargar"
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
          >
            <svg className={`w-5 h-5 ${loadingList ? "animate-spin" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Alerta */}
        {alert && (
          <Alert type={alert.type} message={alert.message} onClose={clearAlert} />
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Formulario (1/3 del ancho en desktop) */}
          <div className="card md:col-span-1 h-fit">
            <h2 className="text-base font-semibold text-gray-800 mb-4">
              {editingUser ? "✏️ Editar usuario" : "➕ Nuevo usuario"}
            </h2>
            <UserForm
              initialData={editingUser}
              onSubmit={editingUser ? handleUpdate : handleCreate}
              onCancel={() => setEditingUser(null)}
              loading={loadingForm}
            />
          </div>

          {/* Tabla (2/3 del ancho en desktop) */}
          <div className="card md:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-800">
                Usuarios
                {!loadingList && (
                  <span className="ml-2 text-xs font-normal text-gray-400">
                    ({users.length} registros)
                  </span>
                )}
              </h2>
            </div>
            <UserTable
              users={users}
              loading={loadingList}
              onEdit={(user) => {
                setEditingUser(user);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onDelete={handleDelete}
              deletingId={deletingId}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-gray-400">
        Construido con Node.js 20, Express, PostgreSQL y React ·{" "}
        <a href="https://www.youtube.com/watch?v=OtxEG8TIEcE" target="_blank" rel="noreferrer"
           className="hover:text-blue-500 underline">
          Tutorial por Fazt Code
        </a>
      </footer>
    </div>
  );
}
