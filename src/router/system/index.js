import companyRoutes from './modules/companyManage'
import messageCenterRoutes from './modules/messageCenter'
import baseSettingRoutes from './modules/baseSetting'
import businessManageRoutes from './modules/businessManage'
import logManageRoutes from './modules/logManage'
const routes = {
  path: '/system',
  meta: { title: '系统后台', authRequired: true },
  component: () => import('@/views/system/index.vue'),
  children: [
    {
      path: '',
      redirect: '/system/home'
    },
    {
      path: 'home',
      name: 'SystemHome',
      meta: { title: '首页', authRequired: true },
      component: () => import('@/views/system/home/index.vue')
    },
    // 个人中心
    {
      path: '/personally',
      name: 'personally',
      meta: { title: 'personally', authRequired: true },
      component: () => import('@/views/personally/index.vue')
    },
    companyRoutes,
    baseSettingRoutes,
    businessManageRoutes,
    messageCenterRoutes,
    logManageRoutes
  ]
}

export default routes
