const routes = {
  path: 'logMamage',
  meta: {
    title: '日志管理',
    authRequired: true
  },
  children: [
    {
      path: 'firmwareUpgrade',
      name: 'FirmwareUpgrade',
      component: () =>
        import('@/views/system/logMamage/firmwareUpgrade/index.vue')
    },
    {
      path: 'login',
      name: 'login',
      component: () => import('@/views/system/logMamage/login/index.vue')
    },
    {
      path: 'systemOperation',
      name: 'SystemOperation',
      component: () =>
        import('@/views/system/logMamage/systemOperation/index.vue')
    },
    {
      path: 'systemRunning',
      name: 'SystemRunning',
      component: () =>
        import('@/views/system/logMamage/systemRunning/index.vue')
    },
    {
      path: 'terminalOperation',
      name: 'TerminalOperation',
      component: () =>
        import('@/views/system/logMamage/terminalOperation/index.vue')
    }
  ]
}

export default routes
