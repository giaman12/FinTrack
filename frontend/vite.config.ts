import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      // Chuyển tiếp tất cả các yêu cầu bắt đầu bằng '/api' đến máy chủ backend đang chạy ở cổng 8080.
      '/api': 'http://localhost:8080'
    }
  }
});