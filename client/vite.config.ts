import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',  // Aceita conexões externas
    port: 5173,       // Porta opcional, se necessário
  },

  plugins: [react()],
})
