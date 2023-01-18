// 全局组件异步注册
import { defineAsyncComponent } from 'vue'

export function requireComp(app) {
  app.component(
    'JyEcharts',
    defineAsyncComponent(() => import('./common/JyEcharts/index.vue'))
  )
  app.component(
    'JyVform',
    defineAsyncComponent(() => import('./common/JyVform/index.vue'))
  )
  app.component(
    'JyLabel',
    defineAsyncComponent(() => import('./common/JyLabel/index.vue'))
  )
  app.component(
    'JyMessageBox',
    defineAsyncComponent(() => import('./common/JyMessageBox/index.vue'))
  )
  app.component(
    'JyPopconfirm',
    defineAsyncComponent(() => import('./common/JyPopconfirm/index.vue'))
  )
}
