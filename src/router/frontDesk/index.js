import sealControlManage from './modules/sealControlManage'
import riskControlWarning from './modules/riskControlWarning'
import processApprove from './modules/processApprove'
import fileManage from './modules/fileManage'
const routes = {
  path: '/frontDesk',
  name: 'frontDesk',
  meta: { title: '用户前台', authRequired: true },
  component: () => import('@/views/frontDesk/index.vue'),
  children: [
    {
      path: 'home',
      name: 'frontDesk-home',
      meta: { title: '首页', authRequired: true },
      component: async () => await import('@/views/frontDesk/home/index.vue')
    },
    sealControlManage,
    riskControlWarning,
    processApprove,
    fileManage
  ]
}

export default routes
