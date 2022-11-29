// import store from "@/state/store";

export default [
  {
    path: "/",
    name: "default",
    redirect: "/login/account",
  },
  // 章管家
  {
    path: "/login/account",
    name: "login-account",
    meta: { title: "login-account", authRequired: true },
    component: () => import("../views/login/account"),
  },
  {
    path: "/frontDesk/home",
    name: "frontDesk-home",
    meta: { title: "frontDesk-home", authRequired: true },
    component: () => import("../views/frontDesk/home"),
  },
  {
    path: "/system/home",
    name: "system-home",
    meta: { title: "system-home", authRequired: true },
    component: () => import("../views/system/home"),
  },
  {
    path: "/components/template",
    name: "components-template",
    meta: { title: "components-template", authRequired: true },
    component: () => import("../views/components/template"),
  },
];
