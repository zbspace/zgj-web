import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
import { resolve } from 'path'
// import ViteRequireContext from '@originjs/vite-plugin-require-context'
const projectRootDir = resolve(__dirname);
// https://vitejs.dev/config/
export default defineConfig({
  envDir: './config', // 环境变量路径
  server: {
    host: '0.0.0.0',
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // 将所有带短横线的标签名都视为自定义元素
          isCustomElement: (tag) => tag.includes('_')
        }
      }
    }),
    eslintPlugin({
    // 配置项
      cache: false // 只校验改动的文件，所以不建议使用eslint缓存
    }),
    vueJsx({

    }),
    // ViteRequireContext({})
  ],
  resolve: {
    // alias: {
    //   '@': path.join(__dirname, 'src'),
    //   '~': path.join(__dirname, 'node_modules'),
    // },
    alias: [
      {
        find: '@',
        replacement: resolve(projectRootDir, 'src')
      },
      {
        // this is required for the SCSS modules
        find: /^~(.*)$/,
        replacement: '$1',
      }
    ],
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue','.scss', '.css']
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/style/index.scss";' // 注入全局样式变量
      }
    }
  }
})
