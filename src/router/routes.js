import systemRoutes from './system/index.js'
import frontDeskRoutes from './frontDesk/index.js'
export default [
  {
    path: '/',
    name: 'HomePage',
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
    path: '/encrypt',
    name: 'Encrypt',
    meta: { title: 'encrypt', authRequired: false },
    component: () => import('../views/encrypt/encrypt')
  },
  {
    path: '/decryption',
    name: 'Decryption',
    meta: { title: 'decryption', authRequired: false },
    component: () => import('../views/encrypt/decryption')
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  }
]
