import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/saude-wellness-demo/',
  plugins: [react()],
  server: { port: 5173 },
})
