const routes = {
  path: 'baseSetting',
  meta: {
    title: '基础设置',
    authRequired: true
  },
  children: [
    {
      path: 'firmwareVersion',
      name: 'VirmwareVersion',
      meta: {
        title: '固件版本管理',
        authRequired: true
      },
      component: () =>
        import('@/views/system/baseSetting/firmwareVersion/index.vue')
    },
    {
      path: 'globalParameter',
      name: 'GlobalParameter',
      meta: {
        title: '全局参数设置',
        authRequired: true
      },
      component: () =>
        import('@/views/system/baseSetting/globalParameter/index.vue')
    },
    {
      path: 'terminalVersion',
      name: 'TerminalVersion',
      meta: {
        title: '终端版本管理',
        authRequired: true
      },
      component: () =>
        import('@/views/system/baseSetting/terminalVersion/index.vue')
    }
  ]
}

export default routes
