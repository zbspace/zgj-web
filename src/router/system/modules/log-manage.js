const routes = {
  path: "log_mamage",
  name: "log-mamage",
  meta: {
    title: "log-mamage",
    authRequired: true,
  },
  children: [
    {
      path: "firmware_upgrade",
      name: "firmware-upgrade",
      component: () =>
        import("@/views/system/log-mamage/firmware-upgrade/index.vue"),
    },
    {
      path: "login",
      name: "login",
      component: () => import("@/views/system/log-mamage/login/index.vue"),
    },
    {
      path: "system_operation",
      name: "system-operation",
      component: () =>
        import("@/views/system/log-mamage/system-operation/index.vue"),
    },
    {
      path: "system_running",
      name: "system-running",
      component: () =>
        import("@/views/system/log-mamage/system-running/index.vue"),
    },
    {
      path: "terminal_operation",
      name: "terminal-operation",
      component: () =>
        import("@/views/system/log-mamage/terminal-operation/index.vue"),
    },
  ],
};

export default routes;
