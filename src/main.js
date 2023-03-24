import '@/style/base.scss'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import i18n from '@/utils/i18n'
import store from './store'

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'

// 全局自定义组件
import { requireComp } from '@/components/index'
// import { requireAntIcons } from '@/utils/antIcons'
import './style/flow/index.less' // 流程样式
import * as antIcons from '@ant-design/icons-vue'

import { loadExtension } from '@/lib/vform/extension/extension-loader'
import Draggable from 'vuedraggable'
import { addDirective } from '@/lib/vform/utils/directive'
import ContainerWidgets from '@/lib/vform/components/form-designer/form-widget/container-widget/index'
import ContainerItems from '@/lib/vform/components/form-render/container-item/index'
import VFormRender from '@/lib/vform/components/form-render/index'
import { registerIcon } from '@/lib/vform/utils/el-icons'
import '@/lib/vform/iconfont/iconfont.css'
import 'virtual:svg-icons-register'

/* 引入自定义全局变量 */
import './style/index.scss'
// 运行mock
// import './mock/index'
;(async () => {
  const app = createApp(App)
  loadExtension(app)
  registerIcon(app)
  addDirective(app)
  app.config.globalProperties.$jyVform = {}
  app.component('Draggable', Draggable)
  app.component('VFormRender', VFormRender)
  app
    .use(store)
    .use(router)
    .use(i18n)
    .use(ElementPlus, { locale: zhCn })
    .use(ContainerWidgets)
    .use(ContainerItems)
    .mount('#app')
  requireComp(app)
  // requireAntIcons(app)
  // 注册图标组件到全局
  Object.keys(antIcons).forEach(key => {
    app.component(key, antIcons[key])
  })
})()
