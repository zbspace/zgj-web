const routes = {
  path: 'company',
  name: 'company-manage',
  meta: {
    title: 'company-manage',
    authRequired: true
  },
  children: [
    {
      path: 'info',
      name: 'company-info',
      meta: {
        title: '企业信息',
        authRequired: true
      },
      component: () =>
        import('@/views/system/company-manage/company-info/index.vue')
    },
    {
      path: 'license',
      name: 'update-license',
      meta: {
        title: '更新license',
        authRequired: true
      },
      component: () =>
        import('@/views/system/company-manage/update-license/index.vue')
    },
    {
      path: 'company_dealing',
      name: 'company-dealing',
      meta: {
        title: '往来企业',
        authRequired: true
      },
      component: () =>
        import('@/views/system/company-manage/company-dealing/index.vue')
    },
    {
      path: 'department_staff',
      name: 'department-staff',
      children: [
        {
          path: 'department',
          name: 'company-department',
          meta: {
            title: '单位与部门管理',
            authRequired: true
          },
          component: () =>
            import(
              '@/views/system/company-manage/department-staff/department/index.vue'
            )
        },
        {
          path: 'audit',
          name: 'audit',
          meta: {
            title: '邀请审核',
            authRequired: true
          },
          component: () =>
            import(
              '@/views/system/company-manage/department-staff/audit/index.vue'
            )
        },
        {
          path: 'staff',
          name: 'staff',
          meta: {
            title: '员工管理',
            authRequired: true
          },
          component: () =>
            import(
              '@/views/system/company-manage/department-staff/staff/index.vue'
            )
        }
      ]
    },
    {
      path: 'permission',
      name: 'permission',
      children: [
        {
          path: 'role',
          name: 'role',
          meta: {
            title: '角色权限配置',
            authRequired: true
          },
          component: () =>
            import('@/views/system/company-manage/permission/role/index.vue')
        },
        {
          path: 'rule',
          name: 'rule',
          meta: {
            title: '基础权限配置',
            authRequired: true
          },
          component: () =>
            import('@/views/system/company-manage/permission/rule/index.vue')
        }
      ]
    }
  ]
}

export default routes
