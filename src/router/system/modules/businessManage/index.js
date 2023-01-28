const routes = {
  path: 'businessManage',
  meta: {
    title: '业务管理',
    authRequired: true
  },
  children: [
    {
      path: 'businessRule',
      name: 'BusinessRule',
      meta: {
        title: '业务规则配置',
        authRequired: true
      },
      component: () =>
        import('@/views/system/businessManage/businessRule/index.vue')
    },
    {
      path: 'flowManage',
      name: 'FlowManage',
      meta: {
        title: '流程管理',
        authRequired: true
      },
      component: () =>
        import('@/views/system/businessManage/flowManage/index.vue')
    },
    {
      path: 'formManage',
      component: () =>
        import('@/views/system/businessManage/formManage/index.vue'),
      children: [
        {
          path: '',
          name: 'FormManage',
          meta: {
            title: '表单管理',
            authRequired: true
          },
          component: () =>
            import('@/views/system/businessManage/formManage/default/index.vue')
        },
        {
          path: 'addForm',
          name: 'AddForm',
          meta: {
            title: '新增表单',
            authRequired: true
          },
          component: () =>
            import('@/views/system/businessManage/formManage/addForm/index.vue')
        }
      ]
    }
  ]
}

export default routes
