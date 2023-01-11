const routes = {
  path: 'processApprove',
  meta: {
    title: '流程审批',
    authRequired: true
  },
  children: [
    {
      path: 'realTimeConfirmation',
      name: 'RealTimeConfirmation',
      meta: {
        title: '实时确认',
        authRequired: true
      },
      component: () =>
        import('@/views/frontDesk/approvalFlow/RealTimeConfirmation.vue')
    },
    {
      path: 'approvalFlow',
      name: 'ApprovalFlow',
      meta: {
        title: '审批流程',
        authRequired: true
      },
      component: () => import('@/views/frontDesk/approvalFlow/approvalFlow.vue')
    },
    {
      path: 'handleTask',
      name: 'HandleTask',
      meta: {
        title: '处理任务',
        authRequired: true
      },
      component: () => import('@/views/frontDesk/approvalFlow/handleTask.vue')
    },
    {
      path: 'carbonCopyToMe',
      name: 'CarbonCopyToMe',
      meta: {
        title: '抄送给我',
        authRequired: true
      },
      component: () =>
        import('@/views/frontDesk/approvalFlow/carbonCopyToMe.vue')
    }
  ]
}

export default routes
