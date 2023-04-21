export const cardSchema = {
  type: 'card',
  category: 'container',
  icon: 'card',
  widgetList: [],
  options: {
    name: '',
    label: 'card',
    hidden: false,
    folded: false,
    showFold: true,
    cardWidth: '100%',
    shadow: 'never',
    customClass: ''
  }
}

export const alertSchema = {
  type: 'alert',
  icon: 'alert',
  formItemFlag: false,
  options: {
    name: '',
    title: 'Good things are coming...',
    type: 'info',
    description: '',
    closable: true,
    closeText: '',
    center: true,
    showIcon: false,
    effect: 'light',
    hidden: false,
    onClose: '',
    customClass: ''
  }
}

// 印章名称
export const sealNameSchema = {
  type: 'sealName',
  icon: 'yinzhangmingcheng',
  formItemFlag: true,
  options: {
    name: '',
    label: '印章名称',
    labelAlign: 'right',
    nameDisabled: true,
    columnWidth: '200px',
    labelWidth: 100,
    size: '',
    disabled: false,
    required: true,
    // -------------------
    filedList: [
      {
        seal: '',
        sealId: '',
        applySealNum: '',
        sealRequiredTextShow: false,
        routineSealRequiredTextShow: false
      }
    ]
  }
}

// 往来单位
export const contactUnitSchema = {
  type: 'contactUnit',
  icon: 'wanglaidanwei',
  formItemFlag: true,
  options: {
    name: '',
    label: '往来单位',
    nameDisabled: true,
    labelAlign: 'right',
    type: 'text',
    size: '',
    labelWidth: 100,
    disabled: false,
    labelHidden: true,
    required: false
    // -------------------
  }
}

// 外带用印
export const usesealBesidesSchema = {
  type: 'usesealBesides',
  icon: 'yinzhangwaidai',
  formItemFlag: true,
  options: {
    name: '',
    label: '印章外带',
    type: 'info',
    nameDisabled: true,
    labelAlign: 'right',
    size: '',
    labelWidth: 100,
    disabled: false
  }
}

// 远程盖章
export const remoteSealSchema = {
  type: 'remoteSeal',
  icon: 'yuancheng',
  formItemFlag: true,
  options: {
    name: 'remoteSeal',
    label: '远程盖章',
    nameDisabled: true,
    labelAlign: 'right',
    columnWidth: '200px',
    labelWidth: 100,
    disabled: false,
    defaultValue: false,
    // -------------------
    labelIconClass: null,
    labelIconPosition: 'rear',
    labelTooltip: null,
    switchWidth: 40
  }
}

// 视频盖章
export const videoSealSchema = {
  type: 'videoSeal',
  icon: 'shipingaizhang',
  formItemFlag: true,
  options: {
    name: 'videoSeal',
    label: '视频盖章',
    nameDisabled: true,
    labelAlign: 'right',
    columnWidth: '200px',
    labelWidth: 100,
    disabled: false,
    defaultValue: false,
    // -------------------
    labelIconClass: null,
    labelIconPosition: 'rear',
    labelTooltip: null,
    switchWidth: 40
  }
}

// 申请人信息
export const applicantInfoSchema = {
  type: 'applicantInfo',
  icon: 'shenqingrenxinxi',
  formItemFlag: true,
  options: {
    name: 'applicantInfo',
    label: '申请人信息',
    labelAlign: 'right',
    type: 'text',
    nameDisabled: true,
    columnWidth: '200px',
    size: 'default',
    labelWidth: 100,
    disabled: false,
    requiredTextShow: false,
    clearable: true
  }
}

// 限时用印
export const limitTimeSealSchema = {
  type: 'limitTimeSeal',
  icon: 'xianshiyongyin',
  formItemFlag: true,
  options: {
    name: 'limitTimeSeal',
    label: '限时用印',
    nameDisabled: true,
    labelAlign: 'right',
    columnWidth: '200px',
    labelWidth: 100,
    disabled: false,
    clearable: false,
    defaultValue: {
      timeLimit: 2,
      sealTime: []
    },
    requiredTextShow: false
  }
}

// 外带用印old
export const limitAddressSealSchema = {
  type: 'limitAddressSeal',
  icon: 'limitAddressSeal',
  formItemFlag: true,
  options: {
    name: 'limitAddressSeal',
    // label: '外带用印',
    labelAlign: 'right',
    columnWidth: '200px',
    labelWidth: 100,
    labelHidden: false,

    disabled: false,
    hidden: false,
    defaultValue: false,
    dsEnabled: false, // 是否使用数据源数据
    // -------------------
    customClass: '', // 自定义css类名
    labelIconClass: null,
    labelIconPosition: 'rear',
    labelTooltip: null,
    switchWidth: 40,
    activeText: '',
    inactiveText: '',
    activeColor: null,
    inactiveColor: null,
    fieldLinkage: [
      { value: '1', linkages: [] },
      { value: '2', linkages: [] }
    ],
    // -------------------
    onCreated: '',
    onMounted: '',
    onChange: '',
    onValidate: ''
  }
}

// 用印文件
export const sealFileSchema = {
  type: 'sealFile',
  icon: 'wenjian',
  formItemFlag: true,
  options: {
    name: 'sealFile',
    label: '用印文件',
    nameDisabled: true,
    labelAlign: 'right',
    columnWidth: '200px',
    labelWidth: 100,
    disabled: false,
    required: true,
    requiredTextShow: false,
    // -------------------
    labelIconPosition: 'rear',
    switchWidth: 40
  }
}

// 文件类型
export const fileTypeSchema = {
  type: 'fileTypeId',
  icon: 'wenjianleixing1',
  formItemFlag: true,
  options: {
    name: 'fileTypeId',
    label: '文件类型',
    nameDisabled: true,
    labelAlign: 'right',
    columnWidth: '200px',
    size: '',
    labelWidth: 100,
    disabled: false,
    required: true
  }
}

// 代办人
export const agentManSchema = {
  type: 'agentMan',
  icon: 'daibanren',
  formItemFlag: true,
  options: {
    name: 'agentMan',
    label: '代办人',
    labelAlign: 'right',
    type: 'text',
    size: '',
    nameDisabled: true,
    labelWidth: 100,
    readonly: false,

    disabled: false,
    hidden: false,
    labelHidden: true,
    required: true,
    defaultValue: { unitIds: '', unitNames: '' }
  }
}

// 模块/容器
// export const moduleContainerSchema = {
//   type: 'moduleContainer',
//   icon: 'zhage',
//   category: 'container',
//   widgetList: [],
//   options: {
//     name: '',
//     label: '模块',
//     hidden: false,
//     folded: false,
//     showFold: true,
//     cardWidth: '100%',
//     shadow: 'never',
//     model: ''
//   }
// }

// 合同金额
export const contractAmountSchema = {
  type: 'contractAmount',
  icon: 'zhage',
  formItemFlag: true,
  options: {
    name: 'contractAmount',
    label: '合同金额',
    nameDisabled: true,
    labelAlign: 'right',
    columnWidth: '200px',
    labelWidth: 100,
    disabled: false,
    type: 'datetimerange',
    required: false,
    requiredTextShow: false,
    clearable: false
  }
}

// 所有自定义组件list
export const customComponents = [
  'applyNo',
  'applyName',
  'sealName',
  'contactUnit',
  'usesealBesides',
  'remoteSeal',
  'videoSeal',
  'limitTimeSeal',
  'uploadFile',
  'applicantInfo',
  'sealFile',
  'fileTypeId',
  'agentMan',
  'contractAmount',
  'fileCount'
]
// 需要校验的自定义组件
export const customValidateComponents = [
  'usesealBesides',
  'agentMan',
  'applicantInfo',
  'sealFile',
  'limitTimeSeal',
  'sealName',
  'contactUnit',
  'fileTypeId',
  'contractAmount'
]
