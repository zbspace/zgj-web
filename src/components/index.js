// 全局组件异步注册
import { defineAsyncComponent } from 'vue'

export function requireComp(app) {
  // -------------------------- common -------------------------------
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
  app.component(
    'JyBreadcrumb',
    defineAsyncComponent(() => import('./common/JyBreadcrumb/index.vue'))
  )
  app.component(
    'JyBackTop',
    defineAsyncComponent(() => import('./common/JyBackTop/index.vue'))
  )
  app.component(
    'JyElMessageBox',
    defineAsyncComponent(() =>
      import('@/views/components/modules/ElMessageBox.vue')
    )
  )
  app.component(
    'JyDialog',
    defineAsyncComponent(() => import('./common/JyDialog/index.vue'))
  )
  app.component(
    'JyVertifyBox',
    defineAsyncComponent(() => import('./common/JyVertifyBox/index.vue'))
  )
  app.component(
    'JyPagination',
    defineAsyncComponent(() => import('./common/JyPagination/index.vue'))
  )
  app.component(
    'JyTable',
    defineAsyncComponent(() => import('./common/JyTable/index.vue'))
  )

  // -------------------------- business -------------------------------
  app.component(
    'JySelectSeal',
    defineAsyncComponent(() => import('./business/JySelectSeal/index.vue'))
  )
  app.component(
    'JyRelatedCompany',
    defineAsyncComponent(() => import('./business/JyRelatedCompany/index.vue'))
  )
}
