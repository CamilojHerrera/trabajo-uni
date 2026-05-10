// Configuración de Vite para el proyecto React.
// El plugin @vitejs/plugin-react habilita JSX y el Fast Refresh en desarrollo.

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,   // Puerto del servidor de desarrollo
    open: true,   // Abre el navegador automáticamente al ejecutar `npm run dev`
  },
});
