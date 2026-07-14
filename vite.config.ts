import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/medi-flow-presentation/',
  server: {
    port: 3000,
    open: true
  }
})
