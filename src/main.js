import '@/style/base.scss'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import i18n from '@/utils/i18n'
import store from './store'

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'

import VForm3 from 'vform-jy'
import '@/utils/svgIconPack'

// 全局自定义组件
import { requireComp } from '@/components/index'
// import { requireAntIcons } from '@/utils/antIcons'
import './style/flow/index.less' // 流程样式
import * as antIcons from '@ant-design/icons-vue'
/* 引入自定义全局变量 */
import './style/index.scss'
// 运行mock
// import './mock/index'
;(async () => {
  const app = createApp(App)
  app.config.globalProperties.$jyVform = {}
  app
    .use(store)
    .use(router)
    .use(i18n)
    .use(ElementPlus, { locale: zhCn })
    .use(VForm3)
    .mount('#app')
  requireComp(app)
  // requireAntIcons(app)
  // 注册图标组件到全局
  Object.keys(antIcons).forEach(key => {
    app.component(key, antIcons[key])
  })
})()
