// import { vfApp } from '@/lib/vform/utils/create-app'

import {
  addContainerWidgetSchema,
  addCustomWidgetSchema
} from '@/lib/vform/components/form-designer/widget-panel/widgetsConfig'
import * as PERegister from '@/lib/vform/components/form-designer/setting-panel/propertyRegister'
import * as PEFactory from '@/lib/vform/components/form-designer/setting-panel/property-editor-factory.jsx'

import {
  cardSchema,
  sealNameSchema,
  contactUnitSchema,
  usesealBesidesSchema,
  remoteSealSchema,
  videoSealSchema,
  sealFileSchema,
  applicantInfoSchema,
  limitTimeSealSchema,
  fileTypeSchema,
  agentManSchema,
  // moduleContainerSchema,
  contractAmountSchema
} from '@/lib/vform/extension/samples/extension-schema'
import CardWidget from '@/lib/vform/extension/samples/card/card-widget'
import CardItem from '@/lib/vform/extension/samples/card/card-item'
import { registerCWGenerator } from '@/lib/vform/utils/sfc-generator'
import {
  cardTemplateGenerator,
  moduleContainerTemplateGenerator
} from '@/lib/vform/extension/samples/extension-sfc-generator'

// import {alertSchema} from "@/lib/vform/extension/samples/extension-schema"
// import AlertWidget from '@/lib/vform/extension/samples/alert/alert-widget'
// import { registerFWGenerator } from '@/lib/vform/utils/sfc-generator'

// 印章名称
import sealNameWidget from '@/lib/vform/extension/samples/sealName/sealName-widget'
// 往来单位
import contactUnitWidget from '@/lib/vform/extension/samples/contactUnit/contactUnit-widget'
// 印章外带
import usesealBesidesWidget from '@/lib/vform/extension/samples/usesealBesides/usesealBesides-widget'
// 远程盖章
import RemoteSealWidget from '@/lib/vform/extension/samples/remoteSeal/remoteSeal-widget'
// 视频盖章
import VideoSealWidget from '@/lib/vform/extension/samples/videoSeal/videoSeal-widget'
// 用印文件
import SealFileWidget from '@/lib/vform/extension/samples/sealFile/sealFile-widget'
// 申请人信息
import ApplicantInfoWidget from '@/lib/vform/extension/samples/applicantInfo/applicantInfo-widget'
// 限时用印
import LimitTimeSealWidget from '@/lib/vform/extension/samples/limitTimeSeal/limitTimeSeal-widget'
// 文件类型
import FileTypeWidget from '@/lib/vform/extension/samples/fileType/fileType-widget'
// 代办人
import AgentManWidget from '@/lib/vform/extension/samples/agentMan/agentMan-widget'
// 模块/容器
import ModuleContainerWidget from '@/lib/vform/extension/samples/moduleContainer/moduleContainer-widget'
import ModuleContainerItem from '@/lib/vform/extension/samples/moduleContainer/moduleContainer-item'
// 合同金额
import ContractAmountWidget from '@/lib/vform/extension/samples/contractAmount/contractAmount-widget'

// import { limitAddressSealSchema } from "@/lib/vform/extension/samples/extension-schema"
// import limitAddressSealWidget from "@/lib/vform/extension/samples/limitAddressSeal/limitAddressSeal-widget"

export const loadExtension = function (app) {
  /**
   * 加载容器组件步骤：
   * 1. 加载组件Json Schema;
   * 2. 全局注册容器组件，容器组件有两种状态——设计期和运行期，故需要注册两个组件；
   * 3. 全局注册属性编辑器组件（基本属性、高级属性、事件属性）；
   * 4. 注册容器组件的代码生成器；
   * 5. 加载完毕。
   */
  // addContainerWidgetSchema(cardSchema) // 加载组件Json Schema
  /* -------------------------------------------------- */
  app.component(CardWidget.name, CardWidget) // 注册设计期的容器组件
  app.component(CardItem.name, CardItem) // 注册运行期的容器组件
  /* -------------------------------------------------- */
  PERegister.registerCPEditor(
    app,
    'card-folded',
    'card-folded-editor',
    PEFactory.createBooleanEditor('folded', 'extension.setting.cardFolded')
  )

  PERegister.registerCPEditor(
    app,
    'card-showFold',
    'card-showFold-editor',
    PEFactory.createBooleanEditor('showFold', 'extension.setting.cardShowFold')
  )

  PERegister.registerCPEditor(
    app,
    'card-cardWidth',
    'card-cardWidth-editor',
    PEFactory.createInputTextEditor('cardWidth', 'extension.setting.cardWidth')
  )

  PERegister.registerCPEditor(
    app,
    'sealName-limitNum',
    'sealName-limitNum-editor',
    PEFactory.createInputTextEditor('limitNum', 'extension.setting.limitNum')
  )

  const shadowOptions = [
    { label: 'never', value: 'never' },
    { label: 'hover', value: 'hover' },
    { label: 'always', value: 'always' }
  ]
  PERegister.registerCPEditor(
    app,
    'card-shadow',
    'card-shadow-editor',
    PEFactory.createSelectEditor('shadow', 'extension.setting.cardShadow', {
      optionItems: shadowOptions
    })
  )
  /* -------------------------------------------------- */
  registerCWGenerator('card', cardTemplateGenerator) // 注册容器组件的代码生成器
  registerCWGenerator('moduleContainer', moduleContainerTemplateGenerator) // 注册容器组件的代码生成器
  /* -------------------------------------------------- */
  /* 容器组件加载完毕 end */

  /**
   * 加载字段组件步骤：
   * 1. 加载组件Json Schema;
   * 2. 全局注册字段组件，字段组件设计期和运行期共用，故仅需注册一个组件；
   * 3. 全局注册属性编辑器组件（基本属性、高级属性、事件属性）；
   * 4. 注册字段组件的代码生成器；
   * 5. 加载完毕。
   */
  //   addCustomWidgetSchema(alertSchema)  //加载组件Json Schema
  /* -------------------------------------------------- */
  //   app.component(AlertWidget.name, AlertWidget)  //注册组件

  PERegister.registerCPEditor(
    app,
    'remoteSeal-defaultValue',
    'remoteSeal-defaultValue-editor',
    PEFactory.createBooleanEditor(
      'remoteSealDefaultValue',
      'extension.setting.defaultValue'
    )
  )

  PERegister.registerCPEditor(
    app,
    'videoSeal-defaultValue',
    'videoSeal-defaultValue-editor',
    PEFactory.createBooleanEditor(
      'videoSealDefaultValue',
      'extension.setting.defaultValue'
    )
  )

  PERegister.registerCPEditor(
    app,
    'UploadFile-defaultValue',
    'UploadFile-defaultValue-editor',
    PEFactory.createBooleanEditor(
      'UploadFileDefaultValue',
      'extension.setting.defaultValue'
    )
  )

  // PERegister.registerCPEditor(app, 'limitTimeSeal-defaultValue', 'limitTimeSeal-defaultValue-editor',
  // PEFactory.createBooleanEditor('limitTimeSealDefaultValue', 'extension.setting.defaultValue'))

  // PERegister.registerCPEditor(
  //   app,
  //   'limitAddressSeal-defaultValue',
  //   'limitAddressSeal-defaultValue-editor',
  //   PEFactory.createBooleanEditor(
  //     'limitAddressSealDefaultValue',
  //     'extension.setting.defaultValue'
  //   )
  // )
  /* -------------------------------------------------- */
  PERegister.registerCPEditor(
    app,
    'alert-title',
    'alert-title-editor',
    PEFactory.createInputTextEditor('title', 'extension.setting.alertTitle')
  )

  // const typeOptions = [
  //   { label: 'success', value: 'success' },
  //   { label: 'warning', value: 'warning' },
  //   { label: 'info', value: 'info' },
  //   { label: 'error', value: 'error' }
  // ]
  // PERegister.registerCPEditor(app, 'alert-type', 'alert-type-editor',
  //     PEFactory.createSelectEditor('type', 'extension.setting.alertType',
  //         {optionItems: typeOptions}))
  /* type属性映射已存在，无须再注册，故只需注册属性编辑器即可！！ */
  //   app.component('alert-type-editor',
  //       PEFactory.createSelectEditor('type', 'extension.setting.alertType',
  //           {optionItems: typeOptions}))

  //   PERegister.registerCPEditor(app, 'alert-description', 'alert-description-editor',
  //       PEFactory.createInputTextEditor('description', 'extension.setting.description'))

  //   PERegister.registerCPEditor(app, 'alert-closable', 'alert-closable-editor',
  //       PEFactory.createBooleanEditor('closable', 'extension.setting.closable'))

  //   PERegister.registerCPEditor(app, 'alert-closeText', 'alert-closeText-editor',
  //       PEFactory.createInputTextEditor('closeText', 'extension.setting.closeText'))

  //   PERegister.registerCPEditor(app, 'alert-center', 'alert-center-editor',
  //       PEFactory.createBooleanEditor('center', 'extension.setting.center'))

  //   PERegister.registerCPEditor(app, 'alert-showIcon', 'alert-showIcon-editor',
  //       PEFactory.createBooleanEditor('showIcon', 'extension.setting.showIcon'))

  //   let effectOptions = [
  //     {label: 'light', value: 'light'},
  //     {label: 'dark', value: 'dark'},
  //   ]
  //   PERegister.registerCPEditor(app, 'alert-effect', 'alert-effect-editor',
  //       PEFactory.createRadioButtonGroupEditor('effect', 'extension.setting.effect',
  //           {optionItems: effectOptions}))

  //   PERegister.registerEPEditor(app, 'alert-onClose', 'alert-onClose-editor',
  //       PEFactory.createEventHandlerEditor('onClose', []))
  /* -------------------------------------------------- */
  //   registerFWGenerator('alert', alertTemplateGenerator)  //注册字段组件的代码生成器
  /* -------------------------------------------------- */

  // 印章名称
  addCustomWidgetSchema(sealNameSchema) // 加载组件Json Schema
  app.component(sealNameWidget.name, sealNameWidget) // 注册组件

  // 往来单位
  addCustomWidgetSchema(contactUnitSchema) // 加载组件Json Schema
  app.component(contactUnitWidget.name, contactUnitWidget) // 注册组件

  // 印章外带
  addCustomWidgetSchema(usesealBesidesSchema) // 加载组件Json Schema
  app.component(usesealBesidesWidget.name, usesealBesidesWidget) // 注册组件

  // 常规盖章次数
  // addCustomWidgetSchema(normalSealNumSchema)  //加载组件Json Schema
  // app.component(NormalSealNumWidget.name, NormalSealNumWidget)  //注册组件

  // 远程盖章
  addCustomWidgetSchema(remoteSealSchema) // 加载组件Json Schema
  app.component(RemoteSealWidget.name, RemoteSealWidget) // 注册组件

  // 视频盖章
  addCustomWidgetSchema(videoSealSchema) // 加载组件Json Schema
  app.component(VideoSealWidget.name, VideoSealWidget) // 注册组件

  // 用印文件
  // addCustomWidgetSchema(uploadFileSchema)  //加载组件Json Schema
  // app.component(UploadFileWidget.name, UploadFileWidget)  //注册组件
  addCustomWidgetSchema(sealFileSchema) // 加载组件Json Schema
  app.component(SealFileWidget.name, SealFileWidget) // 注册组件

  // 申请人信息
  addCustomWidgetSchema(applicantInfoSchema) // 加载组件Json Schema
  app.component(ApplicantInfoWidget.name, ApplicantInfoWidget) // 注册组件

  // 骑缝盖章
  // addCustomWidgetSchema(seamingSealSchema)  //加载组件Json Schema
  // app.component(SeamingSealSchema.name, SeamingSealSchema)  //注册组件

  // 限时用印
  addCustomWidgetSchema(limitTimeSealSchema) // 加载组件Json Schema
  app.component(LimitTimeSealWidget.name, LimitTimeSealWidget) // 注册组件

  // 文件类型
  addCustomWidgetSchema(fileTypeSchema) // 加载组件Json Schema
  app.component(FileTypeWidget.name, FileTypeWidget) // 注册组件

  // 代办人
  addCustomWidgetSchema(agentManSchema) // 加载组件Json Schema
  app.component(AgentManWidget.name, AgentManWidget) // 注册组件

  // 模块/容器
  // addCustomWidgetSchema(moduleContainerSchema) // 加载组件Json Schema
  app.component(ModuleContainerWidget.name, ModuleContainerWidget) // 注册组件
  app.component(ModuleContainerItem.name, ModuleContainerItem) // 注册组件

  // 合同金额
  addCustomWidgetSchema(contractAmountSchema) // 加载组件Json Schema
  app.component(ContractAmountWidget.name, ContractAmountWidget) // 注册组件

  // 外带用印
  // addCustomWidgetSchema(limitAddressSealSchema)  //加载组件Json Schema
  // app.component(limitAddressSealWidget.name, limitAddressSealWidget)  //注册组件

  /* 字段组件加载完毕 end */
}
