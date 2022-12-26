// import store from "@/state/store";
import systemRoutes from "./system/index.js";
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
    // component: () => import("../views/login/accountDemo")
  },
  {
    path: "/frontDesk",
    name: "frontDesk",
    meta: { title: "frontDesk", authRequired: true },
    component: () => import("@/views/frontDesk/index.vue"),
    children: [
      {
        path: "innerPage",
        name: "innerPage",
        meta: { title: "二级页面", authRequired: true },
        component: () =>
          import("../views/frontDesk/PrintControlManagement/InnerPage.vue"),
      },
      {
        path: "InnerPageApplication",
        name: "InnerPageApplication",
        meta: { title: "用印申请", authRequired: true },
        component: () =>
          import(
            "../views/frontDesk/PrintControlManagement/InnerPageApplication.vue"
          ),
      },
      {
        path: "home",
        name: "frontDesk-home",
        meta: { title: "frontDesk-home", authRequired: true },
        component: () => import("../views/frontDesk/home/index.vue"),
      },
      {
        path: "PrintControlManagement/IntelligentPrinting",
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
        path: "transferApplication",
        name: "transferApplication",
        meta: { title: "转办申请", authRequired: true },
        component: () =>
          import(
            "../views/frontDesk/PrintControlManagement/transferApplication.vue"
          ),
      },
      {
        path: "PrintControlManagement/Archive",
        name: "PrintControlManagement-Archive",
        meta: {
          title: "Archive",
          authRequired: true,
        },
        component: () =>
          import("../views/frontDesk/PrintControlManagement/Archive.vue"),
      },
      {
        path: "PrintControlManagement/SecurityWatermark",
        name: "PrintControlManagement-SecurityWatermark",
        meta: {
          title: "SecurityWatermark",
          authRequired: true,
        },
        component: () =>
          import(
            "../views/frontDesk/PrintControlManagement/SecurityWatermark.vue"
          ),
      },
      {
        path: "PrintControlManagement/UsePrepressVerification",
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
        path: "PrintControlManagement/UsePostPressVerification",
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
        path: "PrintControlManagement/SealloanInformation",
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
        path: "SealloanInnerPage",
        name: "SealloanInnerPage",
        meta: { title: "查看历史记录", authRequired: true },
        component: () =>
          import(
            "../views/frontDesk/PrintControlManagement/SealloanInnerPage.vue"
          ),
      },
      {
        path: "PrintControlManagement",
        name: "PrintControlManagement-SealApplication",
        component: () =>
          import("../views/frontDesk/PrintControlManagement/index.vue"),
        children: [
          {
            path: "SealApplication",
            name: "SealApplication",
            meta: { title: "SealApplication", authRequired: true },
            component: () =>
              import(
                "../views/frontDesk/PrintControlManagement/SealApplication.vue"
              ),
          },
          {
            path: "Seal-application/Selection-form",
            name: "Seal-application-Selection-form",
            meta: { title: "Selection-form", authRequired: true },
            component: () =>
              import(
                "../views/frontDesk/PrintControlManagement/Seal-application/Selection-form.vue"
              ),
          },
          {
            path: "Seal-application/fill-form",
            name: "Seal-application-fill-form",
            meta: { title: "fill-form", authRequired: true },
            component: () =>
              import(
                "../views/frontDesk/PrintControlManagement/Seal-application/fill-form.vue"
              ),
          },
          {
            path: "Seal-application/Confirm-approval-process",
            name: "Seal-application-Confirm-approval-process",
            meta: { title: "Confirm-approval-process", authRequired: true },
            component: () =>
              import(
                "../views/frontDesk/PrintControlManagement/Seal-application/Confirm-approval-process.vue"
              ),
          },
          {
            path: "Seal-application/accomplish",
            name: "Seal-application-accomplish",
            meta: { title: "accomplish", authRequired: true },
            component: () =>
              import(
                "../views/frontDesk/PrintControlManagement/Seal-application/accomplish.vue"
              ),
          },
          {
            path: "electronic-seal-apply/Selection-form",
            name: "electronic-seal-apply-Selection-form",
            meta: { title: "Selection-form", authRequired: true },
            component: () =>
              import(
                "../views/frontDesk/PrintControlManagement/electronic-seal-apply/Selection-form.vue"
              ),
          },
          {
            path: "electronic-seal-apply/fill-form",
            name: "electronic-seal-apply-fill-form",
            meta: { title: "fill-form", authRequired: true },
            component: () =>
              import(
                "../views/frontDesk/PrintControlManagement/electronic-seal-apply/fill-form.vue"
              ),
          },
          {
            path: "electronic-seal-apply/Confirm-approval-process",
            name: "electronic-seal-apply-Confirm-approval-process",
            meta: { title: "Confirm-approval-process", authRequired: true },
            component: () =>
              import(
                "../views/frontDesk/PrintControlManagement/electronic-seal-apply/Confirm-approval-process.vue"
              ),
          },
          {
            path: "electronic-seal-apply/accomplish",
            name: "electronic-seal-apply-accomplish",
            meta: { title: "accomplish", authRequired: true },
            component: () =>
              import(
                "../views/frontDesk/PrintControlManagement/electronic-seal-apply/accomplish.vue"
              ),
          },
          {
            path: "innerPage",
            name: "innerPage",
            meta: { title: "二级页面", authRequired: true },
            component: () =>
              import("../views/frontDesk/PrintControlManagement/innerPage.vue"),
          },
          {
            path: "innerTablePage",
            name: "innerTablePage",
            meta: { title: "二级页面", authRequired: true },
            component: () =>
              import(
                "../views/frontDesk/PrintControlManagement/InnerTablePage.vue"
              ),
          },
        ],
      },
      {
        path: "PrintControlManagement/recordWithSeal",
        name: "PrintControlManagement-recordWithSeal",
        meta: {
          title: "recordWithSeal",
          authRequired: true,
        },
        component: () =>
          import(
            "../views/frontDesk/PrintControlManagement/recordWithSeal.vue"
          ),
      },
      {
        path: "PrintControlManagement/electronicSignatureRecord",
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
        path: "PrintControlManagement/LibraryOfSeals",
        name: "PrintControlManagement-LibraryOfSeals",
        meta: {
          title: "LibraryOfSeals",
          authRequired: true,
        },
        component: () =>
          import(
            "../views/frontDesk/PrintControlManagement/LibraryOfSeals.vue"
          ),
      },
      {
        path: "PrintControlManagement/ApplicationForSeal",
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
        path: "PrintControlManagement/TypeOfSeal",
        name: "PrintControlManagement-TypeOfSeal",
        meta: {
          title: "TypeOfSeal",
          authRequired: true,
        },
        component: () =>
          import("../views/frontDesk/PrintControlManagement/TypeOfSeal.vue"),
      },
      {
        path: "PrintControlManagement/WorkbenchManagement",
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
        path: "PrintControlManagement/IntelligentSealBoxManagement",
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
        path: "PrintControlManagement/IntelligentSealCabinetManagement",
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
        path: "PrintControlManagement/ElectronicSignatureRequired",
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
        path: "PrintControlManagement/ElectronicSealLibrary",
        name: "PrintControlManagement-ElectronicSealLibrary",
        meta: {
          title: "ElectronicSealLibrary",
          authRequired: true,
        },
        component: () =>
          import(
            "../views/frontDesk/PrintControlManagement/ElectronicSealLibrary.vue"
          ),
      },
      {
        path: "PrintControlManagement/Printed-track",
        name: "PrintControlManagement-Printed-track",
        meta: {
          title: "Printed-track",
          authRequired: true,
        },
        component: () =>
          import("../views/frontDesk/PrintControlManagement/Printed-track.vue"),
      },
      {
        path: "approvalFlow/RealTimeConfirmation",
        name: "approvalFlow-RealTimeConfirmation",
        meta: {
          title: "RealTimeConfirmation",
          authRequired: true,
        },
        component: () =>
          import("../views/frontDesk/approvalFlow/RealTimeConfirmation.vue"),
      },
      {
        path: "approvalFlow/handleTask",
        name: "approvalFlow-handleTask",
        meta: {
          title: "handleTask",
          authRequired: true,
        },
        component: () =>
          import("../views/frontDesk/approvalFlow/handleTask.vue"),
      },
      {
        path: "approvalFlow/approvalFlow",
        name: "approvalFlow-approvalFlow",
        meta: {
          title: "approvalFlow",
          authRequired: true,
        },
        component: () =>
          import("../views/frontDesk/approvalFlow/approvalFlow.vue"),
      },
      {
        path: "approvalFlow/carbonCopyToMe",
        name: "approvalFlow-carbonCopyToMe",
        meta: {
          title: "carbonCopyToMe",
          authRequired: true,
        },
        component: () =>
          import("../views/frontDesk/approvalFlow/carbonCopyToMe.vue"),
      },
      {
        path: "riskControlWarning/RiskAlertSetting",
        name: "riskControlWarning-RiskAlertSetting",
        meta: {
          title: "RiskAlertSetting",
          authRequired: true,
        },
        component: () =>
          import("../views/frontDesk/riskControlWarning/RiskAlertSetting.vue"),
      },
      {
        path: "riskControlWarning/UseAPrintedAlarmReminder",
        name: "riskControlWarning-UseAPrintedAlarmReminder",
        meta: {
          title: "UseAPrintedAlarmReminder",
          authRequired: true,
        },
        component: () =>
          import(
            "../views/frontDesk/riskControlWarning/UseAPrintedAlarmReminder.vue"
          ),
      },
      {
        path: "riskControlWarning/ProcessSpecificationAlarmNotification",
        name: "riskControlWarning-ProcessSpecificationAlarmNotification",
        meta: {
          title: "ProcessSpecificationAlarmNotification",
          authRequired: true,
        },
        component: () =>
          import(
            "../views/frontDesk/riskControlWarning/ProcessSpecificationAlarmNotification.vue"
          ),
      },
      {
        path: "riskControlWarning/ReceiveSealAlarmReminder",
        name: "riskControlWarning-ReceiveSealAlarmReminder",
        meta: {
          title: "ReceiveSealAlarmReminder",
          authRequired: true,
        },
        component: () =>
          import(
            "../views/frontDesk/riskControlWarning/ReceiveSealAlarmReminder.vue"
          ),
      },
      {
        path: "fileManagement/documentLibrary",
        name: "fileManagement-documentLibrary",
        meta: {
          title: "documentLibrary",
          authRequired: true,
        },
        component: () =>
          import("../views/frontDesk/fileManagement/documentLibrary.vue"),
      },
      {
        path: "fileManagement/documentType",
        name: "fileManagement-documentType",
        meta: {
          title: "documentType",
          authRequired: true,
        },
        component: () =>
          import("../views/frontDesk/fileManagement/documentType.vue"),
      },
    ],
  },
  {
    path: "/components/template",
    name: "components-template",
    meta: { title: "components-template", authRequired: true },
    component: () => import("../views/components/template"),
  },
  systemRoutes,
];
