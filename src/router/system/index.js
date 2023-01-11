import companyRoutes from './modules/companyManage'
import messageCenterRoutes from './modules/messageCenter'
import baseSettingRoutes from './modules/baseSetting'
import businessManageRoutes from './modules/businessManage'
import logManageRoutes from './modules/logManage'
const routes = {
  path: '/system',
  name: 'system',
  meta: { title: '系统后台', authRequired: true },
  component: () => import('@/views/system/index.vue'),
  children: [
    {
      path: 'home',
      name: 'SystemHome',
      meta: { title: '首页', authRequired: true },
      component: async () => await import('@/views/system/home/index.vue')
    },
    companyRoutes,
    baseSettingRoutes,
    businessManageRoutes,
    messageCenterRoutes,
    logManageRoutes
  ]
}

export default routes
