// Formulario para crear o editar un usuario.
// En modo edición recibe `initialData` con { name, email }.
// Llama a `onSubmit({ name, email })` al confirmar.

import { useState, useEffect } from "react";

export default function UserForm({ initialData = null, onSubmit, onCancel, loading }) {
  const isEditing = Boolean(initialData);

  const [name,  setName]  = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setEmail(initialData.email || "");
    } else {
      setName("");
      setEmail("");
    }
    setErrors({});
  }, [initialData]);

  const validate = () => {
    const e = {};
    if (!name.trim())  e.name  = "El nombre es requerido";
    if (!email.trim()) e.email = "El email es requerido";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "El email no tiene un formato válido";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length > 0) { setErrors(e2); return; }
    setErrors({});
    onSubmit({ name: name.trim(), email: email.trim() });
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="space-y-4">
        {/* Nombre */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: "" })); }}
            placeholder="Joe"
            className="input-field"
            disabled={loading}
            autoFocus
          />
          {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: "" })); }}
            placeholder="joe@example.com"
            className="input-field"
            disabled={loading}
          />
          {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
        </div>

        {/* Botones */}
        <div className="flex gap-3 pt-1">
          <button type="submit" className="btn-primary flex-1" disabled={loading}>
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                {isEditing ? "Guardando..." : "Creando..."}
              </span>
            ) : (
              isEditing ? "Guardar cambios" : "Agregar usuario"
            )}
          </button>

          {isEditing && (
            <button type="button" onClick={onCancel} className="btn-secondary" disabled={loading}>
              Cancelar
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
