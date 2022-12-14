import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
const projectRootDir = resolve(__dirname);
// https://vitejs.dev/config/
export default defineConfig({
  envDir: './config', // 环境变量路径
  server: {
    host: '0.0.0.0'
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
  ],
  build:{
    target:['edge90','chrome90','firefox90','safari15'],
    sourcemap: false,
    brotliSize: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
    },
    chunkSizeWarningLimit: 2000,
    commonjsOptions: {
      include: /node_modules|lib/
    }
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(projectRootDir, 'src')
      },
      //  这里主要针对的是assets文件夹中的url
      {
        find: '~@',
        replacement: resolve(projectRootDir, 'src')
      },
      {
        // 针对scss模块
        find: /^~(.*)$/,
        replacement: '$1',
      },
      // 针对esm-build构建vue-i18n需添加配置
      {
        find: 'vue-i18n', 
        replacement: 'vue-i18n/dist/vue-i18n.cjs.js'
      }
    ],
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue','.scss', '.css']
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/style/index.scss";' // 注入全局样式变量（有性能问题，可优化）
      }
    }
  },
  optimizeDeps: {
    include: ['@/../lib/vform/designer.umd.js']
  },
})
