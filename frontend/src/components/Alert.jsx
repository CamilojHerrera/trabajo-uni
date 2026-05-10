// Componente de alerta para mostrar mensajes de éxito o error al usuario.
// Se auto-oculta después de `duration` milisegundos.

import { useEffect, useState } from 'react';

const ICONS = {
  success: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
  ),
};

const STYLES = {
  success: 'bg-green-50 text-green-800 border border-green-200',
  error:   'bg-red-50 text-red-800 border border-red-200',
};

export default function Alert({ type = 'success', message, duration = 4000, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!duration) return;
    const timer = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible || !message) return null;

  return (
    <div
      role="alert"
      className={`flex items-start gap-3 px-4 py-3 rounded-lg text-sm ${STYLES[type]}`}
    >
      <span className="shrink-0 mt-0.5">{ICONS[type]}</span>
      <span className="flex-1">{message}</span>
      <button
        onClick={() => { setVisible(false); onClose?.(); }}
        className="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
        aria-label="Cerrar alerta"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
}
