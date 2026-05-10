// Tabla de usuarios con skeleton de carga y estado vacío.

import UserItem from "./UserItem";

function SkeletonRow() {
  return (
    <tr className="animate-pulse">
      <td className="px-4 py-3"><div className="h-3 bg-gray-200 rounded w-6" /></td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full" />
          <div className="h-3 bg-gray-200 rounded w-24" />
        </div>
      </td>
      <td className="px-4 py-3"><div className="h-3 bg-gray-200 rounded w-36" /></td>
      <td className="px-4 py-3 hidden sm:table-cell"><div className="h-3 bg-gray-200 rounded w-20" /></td>
      <td className="px-4 py-3"><div className="h-6 bg-gray-100 rounded w-16 ml-auto" /></td>
    </tr>
  );
}

export default function UserTable({ users, loading, onEdit, onDelete, deletingId }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">ID</th>
            <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Nombre</th>
            <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</th>
            <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Registrado</th>
            <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => <SkeletonRow key={i} />)
          ) : users.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-4 py-12 text-center">
                <svg className="w-10 h-10 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-gray-500 font-medium">No hay usuarios todavía</p>
                <p className="text-gray-400 text-sm mt-1">Agrega el primero usando el formulario</p>
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <UserItem
                key={user.id}
                user={user}
                onEdit={onEdit}
                onDelete={onDelete}
                deleting={deletingId === user.id}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
