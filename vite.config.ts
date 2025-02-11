import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue'
import { createHtmlPlugin } from 'vite-plugin-html';
// https://vitejs.dev/config/
export default defineConfig({
  
  build: {
    outDir: "docs"
  },
  plugins: [vue(),
    createHtmlPlugin({
      minify: true,
      pages: [
        {
          entry: 'src/main.ts',
          filename: 'index.html',
          template: 'index.html',
        },
        {
          entry: 'src/main.ts',
          filename: '404.html',
          template: '404.html',
        },
      ],
    }),
  ],
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
