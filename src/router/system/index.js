import companyRoutes from "./modules/company";
import messageCenterRoutes from "./modules/message-center";
import baseSetttingRoutes from "./modules/base-settting";
import businessManageRoutes from "./modules/business-manage";
import logManageRoutes from "./modules/log-manage";
const routes = {
  path: "/system",
  name: "system",
  meta: { title: "system", authRequired: true },
  component: () => import("@/views/system/index.vue"),
  children: [
    {
      path: "home",
      name: "system-home",
      meta: { title: "system-home", authRequired: true },
      component: () => import("@/views/system/home.vue"),
    },
    companyRoutes,
    baseSetttingRoutes,
    businessManageRoutes,
    messageCenterRoutes,
    logManageRoutes,
  ],
};

export default routes;
