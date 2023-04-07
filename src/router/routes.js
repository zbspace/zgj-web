import systemRoutes from './system/index.js'
import frontDeskRoutes from './frontDesk/index.js'
export default [
  {
    path: '/',
    component: () => import('@/views/layout/index.vue'),
    meta: {
      authRequired: true
    },
    children: [
      {
        path: '',
        redirect: '/frontDesk/home'
      },
      frontDeskRoutes,
      systemRoutes
    ]
  },
  // 章管家
  {
    path: '/login/account',
    name: 'LoginAccount',
    meta: { title: 'login-account', authRequired: false },
    component: () => import('../views/login/account')
    // component: () => import("../views/login/accountDemo")
  },

  {
    path: '/test',
    name: 'Test',
    meta: { title: 'Test', authRequired: false },
    component: () => import('../views/test')
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  }
]
