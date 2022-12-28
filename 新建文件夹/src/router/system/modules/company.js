const routes = {
  path: "company",
  name: "company-manage",
  meta: {
    title: "company-manage",
    authRequired: true,
  },
  children: [
    {
      path: "info",
      name: "company-info",
      component: () =>
        import("@/views/system/company-manage/company-info/index.vue"),
    },
    {
      path: "company_dealing",
      name: "company-dealing",
      component: () =>
        import("@/views/system/company-manage/company-dealing/index.vue"),
    },
    {
      path: "department_staff",
      name: "department-staff",
      children: [
        {
          path: "department",
          name: "company-department",
          component: () =>
            import(
              "@/views/system/company-manage/department-staff/department/index.vue"
            ),
        },
        {
          path: "audit",
          name: "audit",
          component: () =>
            import(
              "@/views/system/company-manage/department-staff/audit/index.vue"
            ),
        },
        {
          path: "staff",
          name: "staff",
          component: () =>
            import(
              "@/views/system/company-manage/department-staff/staff/index.vue"
            ),
        },
      ],
    },
    {
      path: "permission",
      name: "permission",
      children: [
        {
          path: "role",
          name: "role",
          component: () =>
            import("@/views/system/company-manage/permission/role/index.vue"),
        },
        {
          path: "rule",
          name: "rule",
          component: () =>
            import("@/views/system/company-manage/permission/rule/index.vue"),
        },
      ],
    },
  ],
};

export default routes;
