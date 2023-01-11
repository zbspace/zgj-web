const routes = {
  path: 'messageCenter',
  meta: {
    title: '消息中心',
    authRequired: true
  },
  children: [
    {
      path: 'channel',
      name: 'MessageChannel',
      meta: {
        title: '渠道配置',
        authRequired: true
      },
      component: () => import('@/views/system/messageCenter/channel/index.vue')
    },
    {
      path: 'event',
      name: 'MessageEvent',
      meta: {
        title: '消息事件',
        authRequired: true
      },
      component: () => import('@/views/system/messageCenter/event/index.vue')
    },
    {
      path: 'log',
      name: 'MessageLog',
      meta: {
        title: '消息日志',
        authRequired: true
      },
      component: () => import('@/views/system/messageCenter/log/index.vue')
    },
    {
      path: 'template',
      name: 'MessageTemplate',
      meta: {
        title: '消息模板',
        authRequired: true
      },
      component: () => import('@/views/system/messageCenter/template/index.vue')
    }
  ]
}

export default routes
