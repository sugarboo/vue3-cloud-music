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

  /* 配置扩展名及@别名 */
  resolve: {
    extensions: ['.js', '.vue', '.json', '.ts'],
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  
  /* 配置开发环境端口号及跨域处理 */
  server: {
    // 端口号
    port: 7777,
  
    //跨域处理
    proxy: { '/api': 'http://localhost:3000/' }

    // 服务启动成功后自动打开页面
    // open: true,
  }
})
