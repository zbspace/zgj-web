const routes = {
  path: "business_manage",
  name: "business-manage",
  meta: {
    title: "business-manage",
    authRequired: true,
  },
  children: [
    {
      path: "business_rule",
      name: "business-rule",
      component: () =>
        import("@/views/system/business-manage/business-rule/index.vue"),
    },
    {
      path: "flow_manage",
      name: "flow-manage",
      component: () =>
        import("@/views/system/business-manage/flow-manage/index.vue"),
    },
    {
      path: "form_manage",
      name: "form-manage",
      component: () =>
        import("@/views/system/business-manage/form-manage/index.vue"),
    },
  ],
};

export default routes;
