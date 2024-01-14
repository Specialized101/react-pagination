import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/users': 'http://127.0.0.1:3000/',
      '/deliverers': 'http://127.0.0.1:3000/',
      '/vehicles': 'http://127.0.0.1:3000/',
      '/travels': 'http://127.0.0.1:3000/',
      '/payments': 'http://127.0.0.1:3000/'
    }
  },
  plugins: [react()],
})
