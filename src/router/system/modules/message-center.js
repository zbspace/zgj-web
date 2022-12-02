const routes = {
  path: "message_center",
  name: "message-center",
  meta: {
    title: "message-center",
    authRequired: true,
  },
  children: [
    {
      path: "channel",
      name: "message-channel",
      component: () =>
        import("@/views/system/message-center/channel/index.vue"),
    },
    {
      path: "event",
      name: "message-event",
      component: () => import("@/views/system/message-center/event/index.vue"),
    },
    {
      path: "log",
      name: "message-log",
      component: () => import("@/views/system/message-center/log/index.vue"),
    },
    {
      path: "template",
      name: "message-template",
      component: () =>
        import("@/views/system/message-center/template/index.vue"),
    },
  ],
};

export default routes;
