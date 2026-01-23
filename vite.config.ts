import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
   server: {
    proxy: {
      '/api': {
        target: 'https://citgisnext.sitbus.com.br:9998', // domínio do backend
        changeOrigin: true,  // muda o "Origin" para o domínio do backend
        secure: false,       // ignora problemas de certificado SSL (útil se for autoassinado)
        rewrite: (path) => path.replace(/^\/api/, '') // remove o /api do início
      }
    }
  }
})
