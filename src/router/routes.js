import store from "@/state/store";

export default [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/account/login.vue"),
    meta: {
      title: "Login",
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters["auth/loggedIn"]) {
          // Redirect to the home page instead
          next({ name: "default" });
        } else {
          // Continue to the login page
          next();
        }
      },
    },
  },
  {
    path: "/",
    name: "default",
    redirect: "/frontDesk/home",
  },
  // 章管家
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
