import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import styleImport from 'vite-plugin-style-import' // vant按需引入

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),

    /* 配置按需引入vant组件 */
    styleImport({
      libs: [
        {
          libraryName: 'vant',
          esModule: true,
          resolveStyle: name => `vant/es/${name}/style`,
        },
      ],
    })
  ],

  resolve: {
    /* 配置扩展名 */
    extensions: ['.js', '.vue', '.json', '.ts'],
    /* 配置@别名 */
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  
  /* 配置开发环境服务器端口号 */
  server: {
    /* 端口号 */
    port: 7777,

    /* 服务启动成功后自动打开页面 */
    // open: true,

    /* 跨域处理 */
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
        ws: false
      }
    }
  }
})
