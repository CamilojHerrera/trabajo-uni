// Fila de la tabla de usuarios.
// Muestra nombre, email, fecha de registro y botones de editar/eliminar.
// El botón eliminar muestra confirmación inline antes de proceder.

import { useState } from "react";

export default function UserItem({ user, onEdit, onDelete, deleting }) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const formattedDate = new Date(user.created_at).toLocaleDateString("es-ES", {
    day: "2-digit", month: "short", year: "numeric",
  });

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      {/* ID */}
      <td className="px-4 py-3 text-sm text-gray-400 font-mono">#{user.id}</td>

      {/* Avatar + Nombre */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
            <span className="text-sm font-bold text-blue-600">
              {(user.name || "?")[0].toUpperCase()}
            </span>
          </div>
          <span className="text-sm font-medium text-gray-800">{user.name}</span>
        </div>
      </td>

      {/* Email */}
      <td className="px-4 py-3">
        <a href={`mailto:${user.email}`}
           className="text-sm text-blue-600 hover:underline">
          {user.email}
        </a>
      </td>

      {/* Fecha */}
      <td className="px-4 py-3 text-sm text-gray-400 hidden sm:table-cell">
        {formattedDate}
      </td>

      {/* Acciones */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-1 justify-end">
          {/* Editar */}
          <button
            onClick={() => onEdit(user)}
            title="Editar usuario"
            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50
                       rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>

          {/* Eliminar con confirmación */}
          {!confirmDelete ? (
            <button
              onClick={() => setConfirmDelete(true)}
              title="Eliminar usuario"
              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50
                         rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          ) : (
            <div className="flex items-center gap-1 bg-red-50 border border-red-200 rounded-lg px-2 py-1">
              <span className="text-xs text-red-700 font-medium mr-1">¿Eliminar?</span>
              <button
                onClick={() => { onDelete(user.id); setConfirmDelete(false); }}
                disabled={deleting}
                className="text-xs text-white bg-red-500 hover:bg-red-600 px-2 py-0.5
                           rounded font-medium transition-colors disabled:opacity-50"
              >
                {deleting ? "..." : "Sí"}
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="text-xs text-gray-600 hover:text-gray-800 px-1 py-0.5"
              >
                No
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}
