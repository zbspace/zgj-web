const routes = {
  path: "base_setting",
  name: "base-setting",
  meta: {
    title: "base-setting",
    authRequired: true,
  },
  children: [
    {
      path: "firmware_version",
      name: "firmware-version",
      component: () =>
        import("@/views/system/base-settting/firmware-version/index.vue"),
    },
    {
      path: "global_parameter",
      name: "global-parameter",
      component: () =>
        import("@/views/system/base-settting/global-parameter/index.vue"),
    },
    {
      path: "terminal_version",
      name: "terminal-version",
      component: () =>
        import("@/views/system/base-settting/terminal-version/index.vue"),
    },
  ],
};

export default routes;
