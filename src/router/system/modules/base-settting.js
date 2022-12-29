const routes = {
  path: 'base_setting',
  name: 'base-setting',
  meta: {
    authRequired: true
  },
  children: [
    {
      path: 'firmware_version',
      name: 'firmware-version',
      meta: {
        title: '固件版本管理',
        authRequired: true
      },
      component: () =>
        import('@/views/system/base-settting/firmware-version/index.vue')
    },
    {
      path: 'global_parameter',
      name: 'global-parameter',
      meta: {
        title: '全局参数设置',
        authRequired: true
      },
      component: () =>
        import('@/views/system/base-settting/global-parameter/index.vue')
    },
    {
      path: 'terminal_version',
      name: 'terminal-version',
      meta: {
        title: '终端版本管理',
        authRequired: true
      },
      component: () =>
        import('@/views/system/base-settting/terminal-version/index.vue')
    }
  ]
}

export default routes
