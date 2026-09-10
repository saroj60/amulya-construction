import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': import.meta.dirname + '/src',
    },
  },
  server: {
    port: parseInt(process.env.VITE_PORT || '5177'),
    proxy: {
      '/api': {
        target: `http://127.0.0.1:${process.env.PORT || '5004'}`,
        changeOrigin: true,
        secure: false,
      },
      '/uploads': {
        target: `http://127.0.0.1:${process.env.PORT || '5004'}`,
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
