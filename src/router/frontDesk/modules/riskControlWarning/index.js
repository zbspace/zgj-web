const routes = {
  path: 'riskControlWarning',
  meta: {
    title: '风控预警',
    authRequired: true
  },
  children: [
    {
      path: 'riskAlertSetting',
      name: 'RiskAlertSetting',
      meta: {
        title: '风控提醒设置',
        authRequired: true
      },
      component: () =>
        import('@/views/frontDesk/riskControlWarning/RiskAlertSetting.vue')
    },
    {
      path: 'riskAlertRecord',
      meta: {
        title: '风控提醒记录',
        authRequired: true
      },
      children: [
        {
          path: 'useAPrintedAlarmReminder',
          name: 'UseAPrintedAlarmReminder',
          meta: {
            title: '用印告警提醒',
            authRequired: true
          },
          component: () =>
            import(
              '@/views/frontDesk/riskControlWarning/UseAPrintedAlarmReminder.vue'
            )
        },
        {
          path: 'receiveSealAlarmReminder',
          name: 'ReceiveSealAlarmReminder',
          meta: {
            title: '领用印章告警提醒',
            authRequired: true
          },
          component: () =>
            import(
              '@/views/frontDesk/riskControlWarning/ReceiveSealAlarmReminder.vue'
            )
        },
        {
          path: 'processSpecificationAlarmNotification',
          meta: {
            title: '流程规范告警提醒',
            authRequired: true
          },
          component: () =>
            import(
              '@/views/frontDesk/riskControlWarning/ProcessSpecificationAlarmNotification.vue'
            )
        }
      ]
    }
  ]
}

export default routes
