import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue'
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  base:process.env.VITE_BASE_URL,
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
