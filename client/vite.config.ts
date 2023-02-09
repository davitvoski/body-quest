import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false
      }
    }
  },
  build: {
    emptyOutDir: true,
    outDir: resolve(__dirname, './build'),
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    }
  }
})