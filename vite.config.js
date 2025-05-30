// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// ✅ Gebruik Vite's eigen import.meta.env.MODE
export default defineConfig(({ mode }) => ({
  server: {
    host: true,
    port: 5173,
  },
  base: mode === 'production'
  ? '/project-3d-reconstructie-van-een-mesolithische-vrouw-mohamadmatar7/' 
  : '/',
  plugins: [react()],
}))
