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
    path: "/PrintControlManagement/IntelligentPrinting",
    name: "PrintControlManagement-IntelligentPrinting",
    meta: {
      title: "IntelligentPrinting",
      authRequired: true,
    },
    component: () =>
      import(
        "../views/frontDesk/PrintControlManagement/IntelligentPrinting.vue"
      ),
  },
  {
    path: "/PrintControlManagement/Archive",
    name: "PrintControlManagement-Archive",
    meta: {
      title: "Archive",
      authRequired: true,
    },
    component: () =>
      import("../views/frontDesk/PrintControlManagement/Archive.vue"),
  },
  {
    path: "/PrintControlManagement/SecurityWatermark",
    name: "PrintControlManagement-SecurityWatermark",
    meta: {
      title: "SecurityWatermark",
      authRequired: true,
    },
    component: () =>
      import("../views/frontDesk/PrintControlManagement/SecurityWatermark.vue"),
  },
  {
    path: "/PrintControlManagement/UsePrepressVerification",
    name: "PrintControlManagement-UsePrepressVerification",
    meta: {
      title: "UsePrepressVerification",
      authRequired: true,
    },
    component: () =>
      import(
        "../views/frontDesk/PrintControlManagement/UsePrepressVerification.vue"
      ),
  },
  {
    path: "/PrintControlManagement/UsePostPressVerification",
    name: "PrintControlManagement-UsePostPressVerification",
    meta: {
      title: "UsePostPressVerification",
      authRequired: true,
    },
    component: () =>
      import(
        "../views/frontDesk/PrintControlManagement/UsePostPressVerification.vue"
      ),
  },
  {
    path: "/PrintControlManagement/SealloanInformation",
    name: "PrintControlManagement-SealloanInformation",
    meta: {
      title: "SealloanInformation",
      authRequired: true,
    },
    component: () =>
      import(
        "../views/frontDesk/PrintControlManagement/SealloanInformation.vue"
      ),
  },
  {
    path: "/approvalFlow/RealTimeConfirmation",
    name: "approvalFlow-RealTimeConfirmation",
    meta: {
      title: "RealTimeConfirmation",
      authRequired: true,
    },
    component: () =>
      import("../views/frontDesk/approvalFlow/RealTimeConfirmation.vue"),
  },
  {
    path: "/approvalFlow/handleTask",
    name: "approvalFlow-handleTask",
    meta: {
      title: "handleTask",
      authRequired: true,
    },
    component: () => import("../views/frontDesk/approvalFlow/handleTask.vue"),
  },
  {
    path: "/riskControlWarning/RiskAlertSetting",
    name: "riskControlWarning-RiskAlertSetting",
    meta: {
      title: "RiskAlertSetting",
      authRequired: true,
    },
    component: () =>
      import("../views/frontDesk/riskControlWarning/RiskAlertSetting.vue"),
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
