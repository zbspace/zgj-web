import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import ViteCompression from 'vite-plugin-compression'
import ViteComponents from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import {
  createStyleImportPlugin,
  VxeTableResolve
} from 'vite-plugin-style-import'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'

const projectRootDir = resolve(__dirname)
// https://vitejs.dev/config/
export default defineConfig((mode, command) => {
  const isBuild = command === 'build'
  // eslint-disable-next-line no-unused-vars
  const env = loadEnv(mode, process.cwd())
  return {
    envDir: './config', // 环境变量路径
    server: {
      host: '0.0.0.0'
    },
    plugins: [
      vue({
        template: {
          compilerOptions: {
            // 将所有带短横线的标签名都视为自定义元素
            isCustomElement: tag => tag.includes('_')
          }
        }
      }),
      // 组件按需引入
      ViteComponents({
        dts: false,
        resolvers: [
          AntDesignVueResolver({
            importStyle: 'less'
          })
        ]
      }),
      // gzip 压缩
      ViteCompression({
        disable: !isBuild,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz'
      }),
      // 兼容低版本浏览器
      legacy({
        targets: ['Chrome 63'],
        modernPolyfills: true
      }),
      createStyleImportPlugin({
        resolves: [VxeTableResolve()]
      }),
      vueJsx({})
    ],
    build: {
      target: 'es2015',
      sourcemap: false,
      brotliSize: true,
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html')
        }
      },
      chunkSizeWarningLimit: 2000
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
          replacement: '$1'
        },
        // 针对esm-build构建vue-i18n需添加配置
        {
          find: 'vue-i18n',
          replacement: 'vue-i18n/dist/vue-i18n.cjs.js'
        }
      ],
      extensions: [
        '.mjs',
        '.js',
        '.ts',
        '.jsx',
        '.tsx',
        '.json',
        '.vue',
        '.scss',
        '.css'
      ]
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/style/index.scss";' // 注入全局样式变量（有性能问题，可优化）
        },
        less: {
          javascriptEnabled: true
        }
      }
    },
    optimizeDeps: {
      include: [
        '@/../lib/vform/designer.umd.js',
        'ant-design-vue',
        'ant-design-vue/es',
        'vuedraggable'
      ]
    }
  }
})
