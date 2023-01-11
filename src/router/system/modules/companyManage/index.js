const routes = {
  path: 'companyManage',
  meta: {
    title: '企业管理',
    authRequired: true
  },
  children: [
    {
      path: 'companyInfo',
      name: 'CompanyInfo',
      meta: {
        title: '企业信息',
        authRequired: true
      },
      component: () =>
        import('@/views/system/companyManage/companyInfo/index.vue')
    },
    {
      path: 'updateLicense',
      name: 'UpdateLicense',
      meta: {
        title: '更新license',
        authRequired: true
      },
      component: () =>
        import('@/views/system/companyManage/updatelicense/index.vue')
    },
    {
      path: 'companyDealing',
      name: 'CompanyDealing',
      meta: {
        title: '往来企业',
        authRequired: true
      },
      component: () =>
        import('@/views/system/companyManage/companyDealing/index.vue')
    },
    {
      path: 'departmentStaff',
      children: [
        {
          path: 'department',
          name: 'companyDepartment',
          meta: {
            title: '单位与部门管理',
            authRequired: true
          },
          component: () =>
            import(
              '@/views/system/companyManage/departmentStaff/department/index.vue'
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
              '@/views/system/companyManage/departmentStaff/audit/index.vue'
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
              '@/views/system/companyManage/departmentStaff/staff/index.vue'
            )
        }
      ]
    },
    {
      path: 'permission',
      name: 'permission',
      meta: {
        title: '权限管理',
        authRequired: true
      },
      component: () =>
        import('@/views/system/companyManage/permission/index.vue')
      // children: [
      //   {
      //     path: 'role',
      //     name: 'role',
      //     meta: {
      //       title: '角色权限配置',
      //       authRequired: true
      //     },
      //     component: () =>
      //       import('@/views/system/companyManage/permission/role/index.vue')
      //   },
      //   {
      //     path: 'rule',
      //     name: 'rule',
      //     meta: {
      //       title: '基础权限配置',
      //       authRequired: true
      //     },
      //     component: () =>
      //       import('@/views/system/companyManage/permission/rule/index.vue')
      //   }
      // ]
    }
  ]
}

export default routes
