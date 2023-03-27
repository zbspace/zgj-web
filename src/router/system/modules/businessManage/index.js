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
      path: 'editBusinessRule',
      name: 'EditBusinessRule',
      meta: {
        title: '编辑业务规则',
        authRequired: true
      },
      component: () =>
        import('@/views/system/businessManage/businessRule/edit.vue')
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
      name: 'FormManage',
      meta: {
        title: '表单管理',
        authRequired: true
      },
      component: () =>
        import('@/views/system/businessManage/formManage/index.vue')
    }
  ]
}

export default routes
