import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Yêu cầu nào bắt đầu bằng '/api' sẽ được chuyển tiếp
      '/api': 'http://localhost:8080'
    }
  }
})