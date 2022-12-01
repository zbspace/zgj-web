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
    path: "/PrintControlManagement/SealApplication",
    name: "PrintControlManagement-SealApplication",
    meta: {
      title: "SealApplication",
      authRequired: true,
    },
    component: () =>
      import("../views/frontDesk/PrintControlManagement/SealApplication.vue"),
  },
  {
    path: "/PrintControlManagement/recordWithSeal",
    name: "PrintControlManagement-recordWithSeal",
    meta: {
      title: "recordWithSeal",
      authRequired: true,
    },
    component: () =>
      import("../views/frontDesk/PrintControlManagement/recordWithSeal.vue"),
  },
  {
    path: "/PrintControlManagement/electronicSignatureRecord",
    name: "PrintControlManagement-electronicSignatureRecord",
    meta: {
      title: "electronicSignatureRecord",
      authRequired: true,
    },
    component: () =>
      import(
        "../views/frontDesk/PrintControlManagement/electronicSignatureRecord.vue"
      ),
  },
  {
    path: "/PrintControlManagement/LibraryOfSeals",
    name: "PrintControlManagement-LibraryOfSeals",
    meta: {
      title: "LibraryOfSeals",
      authRequired: true,
    },
    component: () =>
      import("../views/frontDesk/PrintControlManagement/LibraryOfSeals.vue"),
  },
  {
    path: "/PrintControlManagement/ApplicationForSeal",
    name: "PrintControlManagement-ApplicationForSeal",
    meta: {
      title: "ApplicationForSeal",
      authRequired: true,
    },
    component: () =>
      import(
        "../views/frontDesk/PrintControlManagement/ApplicationForSeal.vue"
      ),
  },
  {
    path: "/PrintControlManagement/TypeOfSeal",
    name: "PrintControlManagement-TypeOfSeal",
    meta: {
      title: "TypeOfSeal",
      authRequired: true,
    },
    component: () =>
      import("../views/frontDesk/PrintControlManagement/TypeOfSeal.vue"),
  },
  {
    path: "/PrintControlManagement/WorkbenchManagement",
    name: "PrintControlManagement-WorkbenchManagement",
    meta: {
      title: "WorkbenchManagement",
      authRequired: true,
    },
    component: () =>
      import(
        "../views/frontDesk/PrintControlManagement/WorkbenchManagement.vue"
      ),
  },
  {
    path: "/PrintControlManagement/IntelligentSealBoxManagement",
    name: "PrintControlManagement-IntelligentSealBoxManagement",
    meta: {
      title: "IntelligentSealBoxManagement",
      authRequired: true,
    },
    component: () =>
      import(
        "../views/frontDesk/PrintControlManagement/IntelligentSealBoxManagement.vue"
      ),
  },
  {
    path: "/PrintControlManagement/IntelligentSealCabinetManagement",
    name: "PrintControlManagement-IntelligentSealCabinetManagement",
    meta: {
      title: "IntelligentSealCabinetManagement",
      authRequired: true,
    },
    component: () =>
      import(
        "../views/frontDesk/PrintControlManagement/IntelligentSealCabinetManagement.vue"
      ),
  },
  {
    path: "/PrintControlManagement/ElectronicSignatureRequired",
    name: "PrintControlManagement-ElectronicSignatureRequired",
    meta: {
      title: "ElectronicSignatureRequired",
      authRequired: true,
    },
    component: () =>
      import(
        "../views/frontDesk/PrintControlManagement/ElectronicSignatureRequired.vue"
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
    path: "/approvalFlow/approvalFlow",
    name: "approvalFlow-approvalFlow",
    meta: {
      title: "approvalFlow",
      authRequired: true,
    },
    component: () => import("../views/frontDesk/approvalFlow/approvalFlow.vue"),
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
    path: "/riskControlWarning/UseAPrintedAlarmReminder",
    name: "riskControlWarning-UseAPrintedAlarmReminder",
    meta: {
      title: "UseAPrintedAlarmReminder",
      authRequired: true,
    },
    component: () =>
      import("../views/frontDesk/riskControlWarning/UseAPrintedAlarmReminder.vue"),
  },
  {
    path: "/riskControlWarning/ProcessSpecificationAlarmNotification",
    name: "riskControlWarning-ProcessSpecificationAlarmNotification",
    meta: {
      title: "ProcessSpecificationAlarmNotification",
      authRequired: true,
    },
    component: () =>
      import("../views/frontDesk/riskControlWarning/ProcessSpecificationAlarmNotification.vue"),
  },
  {
    path: "/riskControlWarning/ReceiveSealAlarmReminder",
    name: "riskControlWarning-ReceiveSealAlarmReminder",
    meta: {
      title: "ReceiveSealAlarmReminder",
      authRequired: true,
    },
    component: () =>
      import("../views/frontDesk/riskControlWarning/ReceiveSealAlarmReminder.vue"),
  },
  {
    path: "/fileManagement/documentLibrary",
    name: "fileManagement-documentLibrary",
    meta: {
      title: "documentLibrary",
      authRequired: true,
    },
    component: () =>
      import("../views/frontDesk/fileManagement/documentLibrary.vue"),
  },
  {
    path: "/fileManagement/documentType",
    name: "fileManagement-documentType",
    meta: {
      title: "documentType",
      authRequired: true,
    },
    component: () =>
      import("../views/frontDesk/fileManagement/documentType.vue"),
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
