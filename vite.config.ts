import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue'
export default defineConfig({
  base:'/JiaxingHuang/',
  build: {
    outDir: "docs"
  },
  plugins: [vue(),],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:7921', // 目标服务器地址
        changeOrigin: true, // 是否改变域名
        rewrite: (path) => path.replace(/^\/api/, '') // 路径重写
      }
    }
  }
})
