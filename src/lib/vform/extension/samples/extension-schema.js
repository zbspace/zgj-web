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
    customClass: '',
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
    customClass: '',
  }
}

// 印章名称
export const sealNameSchema = {
  type: 'sealName',
  icon: 'sealName',
  formItemFlag: true,
  options: {
    name: '',
    // label: '',
    labelAlign: 'right',
    defaultValue: [{
      "seal": "",
      "sealId": "",
      "routineSeal": "",
      "sealRequiredTextShow": false,
      "sealTypeId": [],
      "routineSealRequiredTextShow": false
    }],
    showSealType: true,
    placeholder: '',
    columnWidth: '200px',
    labelWidth: 100,
    labelHidden: false,
		size: '',
    readonly: false,
    disabled: false,
    hidden: false,
    required: true,
    clearable: true,
    requiredHint: '',
    //-------------------
    customClass: '',  //自定义css类名
    //-------------------
    onChange: '',
		filedList:[
			{
				"seal": "",
				"sealId": "",
				"routineSeal": "",
				"sealRequiredTextShow":false,
				"routineSealRequiredTextShow":false,
			}
		]
  }
}

// 往来单位
export const contactUnitSchema = {
  type: 'contactUnit',
  icon: 'contactUnit',
  formItemFlag: true,
  options: {
    name: '',
    // label: '',
    labelAlign: 'right',
    type: 'text',
    size: '',
    labelWidth: 100,
    readonly: false,
    disabled: false,
    hidden: false,
    clearable: true,
    labelHidden: true,
		required: false,
		requiredHint: '',
    defaultValue: {unitIds: '', unitNames: ''},
    //-------------------
    customClass: '',  //自定义css类名

    //-------------------
    onChange: '',
  }
}

// 外带用印
export const usesealBesidesSchema = {
  type: 'usesealBesides',
  icon: 'usesealBesides',
	formItemFlag: true,
  options: {
    name: '',
    title: 'Good things are coming...',
    type: 'info',
		labelAlign: 'right',
    size: '',
    labelWidth: 100,
    readonly: false,
    disabled: false,
    hidden: false,
		required: true,
		requiredHint: '',
		addTitle:"详细",
    onClose: '',
    customClass: '',
    defaultValue: {
      isTrue: false,
      besidesTime: [],
      Add: [],
      detailAdd: ""
    }
  }
}

// 常规盖章次数
// export const normalSealNumSchema = {
//   type: 'normalSealNum',
//   icon: 'normalSealNum',
//   formItemFlag: true,
//   options: {
//     name: 'normalSealNum',
//     label: '常规盖章次数',
//     labelAlign: 'right',
//     type: 'text',
//     defaultValue: '',
//     placeholder: '',
//     columnWidth: '200px',
//     size: '',
//     labelWidth: 100,
//     labelHidden: false,
//     readonly: false,
//     disabled: false,
//     hidden: false,
//     clearable: true,
//     showPassword: false,
//     required: false,
//     requiredHint: '',
//     validation: 'number',
//     validationHint: '只能输入数字',
//     //-------------------
//     customClass: '',  //自定义css类名
//     labelIconClass: null,
//     labelIconPosition: 'rear',
//     labelTooltip: null,
//     minLength: null,
//     maxLength: null,
//     showWordLimit: false,
//     prefixIcon: '',
//     suffixIcon: '',
//     appendButton: false,
//     appendButtonDisabled: false,
//     buttonIcon: 'custom-search',
//     //-------------------
//     onCreated: '',
//     onMounted: '',
//     onInput: '',
//     onChange: '',
//     onFocus: '',
//     onBlur: '',
//     onValidate: '',
//     onAppendButtonClick: '',
//   }
// }

// 远程盖章
export const remoteSealSchema = {
  type: 'remoteSeal',
  icon: 'remoteSeal',
  formItemFlag: true,
  options: {
    name: 'remoteSeal',
    label: '远程盖章',
    labelAlign: 'right',
    columnWidth: '200px',
    labelWidth: 100,
    labelHidden: false,
    disabled: false,
    hidden: false,
    defaultValue: false,
    //-------------------
    customClass: '',  //自定义css类名
    labelIconClass: null,
    labelIconPosition: 'rear',
    labelTooltip: null,
    switchWidth: 40,
    activeText: '',
    inactiveText: '',
    activeColor: null,
    inactiveColor: null,
    fieldLinkage: [
      { value: "1", linkages: [] },
      { value: "2", linkages: [] },
    ],
    //-------------------
    onCreated: '',
    onMounted: '',
    onChange: '',
    onValidate: '',
  },
}

// 视频盖章
export const videoSealSchema = {
  type: 'videoSeal',
  icon: 'videoSeal',
  formItemFlag: true,
  options: {
    name: 'videoSeal',
    // label: '视频盖章',
    labelAlign: 'right',
    columnWidth: '200px',
    labelWidth: 100,
    labelHidden: false,
    disabled: false,
    hidden: false,
    defaultValue: false,
    //-------------------
    customClass: '',  //自定义css类名
    labelIconClass: null,
    labelIconPosition: 'rear',
    labelTooltip: null,
    switchWidth: 40,
    activeText: '',
    inactiveText: '',
    activeColor: null,
    inactiveColor: null,
    fieldLinkage: [
      { value: "1", linkages: [] },
      { value: "2", linkages: [] },
    ],
    //-------------------
    onCreated: '',
    onMounted: '',
    onChange: '',
    onValidate: '',
  },
}

// 申请人信息
export const applicantInfoSchema = {
  type: 'applicantInfo',
  icon: 'applicantInfo',
  formItemFlag: true,
  options: {
    name: 'applicantInfo',
    // label: '',
    labelAlign: 'right',
    type: 'text',
    defaultValue: {
      applicant: "",
      department: ''
    },
    placeholder: '',
    columnWidth: '200px',
    size: 'default',
    labelWidth: 100,
    labelHidden: false,
    readonly: true,
    disabled: false,
    hidden: false,
    clearable: true,
    showPassword: false,
    filterable: false,
    required: true,
    requiredHint: '',
    validation: '',
    validationHint: '',
    dsEnabled: false, // 是否使用数据源数据
    dsName: '', // 数据源名称
    dataSetName: '',  //数据集名称
    labelKey: 'label',
    valueKey: 'value',
    optionItems: [
      {label: 'select 1', value: 1},
      {label: 'select 2', value: 2},
      {label: 'select 3', value: 3},
    ],
    //-------------------
    customClass: '',  //自定义css类名
    labelIconClass: null,
    labelIconPosition: 'rear',
    labelTooltip: null,
    minLength: null,
    maxLength: null,
    showWordLimit: false,
    prefixIcon: '',
    suffixIcon: '',
    appendButton: false,
    appendButtonDisabled: false,
    buttonIcon: 'custom-search',
    //-------------------
    onCreated: '',
    onMounted: '',
    onInput: '',
    onChange: '',
    onFocus: '',
    onBlur: '',
    onValidate: '',
    onAppendButtonClick: '',

    // filedList: [
    //   {
    //     seal: "",
    //     routineSeal: "",
    //   }
    // ]
  }
}

// 骑缝盖章
// export const seamingSealSchema = {
//   type: 'seamingSeal',
//   icon: 'seamingSeal',
//   formItemFlag: true,
//   options: {
//     name: 'seamingSeal',
//     label: '骑缝盖章',
//     labelAlign: 'right',
//     columnWidth: '200px',
//     labelWidth: 100,
//     labelHidden: false,
//     disabled: false,
//     hidden: false,
//     defaultValue: false,
//     //-------------------
//     customClass: '',  //自定义css类名
//     labelIconClass: null,
//     labelIconPosition: 'rear',
//     labelTooltip: null,
//     switchWidth: 40,
//     activeText: '',
//     inactiveText: '',
//     activeColor: null,
//     inactiveColor: null,
//     fieldLinkage: [
//       { value: "1", linkages: [] },
//       { value: "2", linkages: [] },
//     ],
//     //-------------------
//     onCreated: '',
//     onMounted: '',
//     onChange: '',
//     onValidate: '',
//   },
// }

// 限时用印
export const limitTimeSealSchema = {
  type: 'limitTimeSeal',
  icon: 'limitTimeSeal',
  formItemFlag: true,
  options: {
    name: 'limitTimeSeal',
    // label: '限时用印',
    labelAlign: 'right',
    columnWidth: '200px',
    labelWidth: 100,
    labelHidden: false,
    disabled: false,
    hidden: false,
    defaultValue: {
      timeLimit: 2,
      sealTime: []
    },
    type: 'datetimerange',
    endPlaceholder: '',
    editable: false,
    clearable: true,
    required: true,
    requiredHint: '',
    validation: '',
    validationHint: '',
    format: 'YYYY-MM-DD',  //日期显示格式
    valueFormat: 'YYYY-MM-DD',  //日期对象格式
    labelKey: 'label',
    valueKey: 'value',
    optionItems: [
      {label: '是', value: 1},
      {label: '否', value: 2},
    ],
    //-------------------
    customClass: '',  //自定义css类名
    labelIconClass: null,
    labelIconPosition: 'rear',
    labelTooltip: null,
    switchWidth: 40,
    activeText: '',
    inactiveText: '',
    activeColor: null,
    inactiveColor: null,
    fieldLinkage: [
      { value: "1", linkages: [] },
      { value: "2", linkages: [] },
    ],
    //-------------------
    onCreated: '',
    onMounted: '',
    onChange: '',
    onValidate: '',
  },
}

// 外带用印
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
    //-------------------
    customClass: '',  //自定义css类名
    labelIconClass: null,
    labelIconPosition: 'rear',
    labelTooltip: null,
    switchWidth: 40,
    activeText: '',
    inactiveText: '',
    activeColor: null,
    inactiveColor: null,
    fieldLinkage: [
      { value: "1", linkages: [] },
      { value: "2", linkages: [] },
    ],
    //-------------------
    onCreated: '',
    onMounted: '',
    onChange: '',
    onValidate: '',
  },
}

// 用印文件old
export const uploadFileSchema = {
  type: 'uploadFile',
  icon: 'uploadFile',
  formItemFlag: true,
  options: {
    name: 'uploadFile',
    // label: '用印文件',
    labelAlign: 'right',
    columnWidth: '200px',
    labelWidth: 100,
    labelHidden: false,
    disabled: false,
    hidden: false,
    // defaultValue: false,
    //-------------------
    customClass: '',  //自定义css类名
    labelIconClass: null,
    labelIconPosition: 'rear',
    labelTooltip: null,
    switchWidth: 40,
    activeText: '',
    inactiveText: '',
    activeColor: null,
    inactiveColor: null,
    fieldLinkage: [
      { value: "1", linkages: [] },
      { value: "2", linkages: [] },
    ],
    //-------------------
    onCreated: '',
    onMounted: '',
    onChange: '',
    onValidate: '',
  },
}

// 用印文件
export const sealFileSchema = {
  type: 'sealFile',
  icon: 'sealFile',
  formItemFlag: true,
  options: {
    name: 'sealFile',
    // label: '用印文件',
    labelAlign: 'right',
    columnWidth: '200px',
    labelWidth: 100,
    labelHidden: false,
    disabled: false,
    hidden: false,
    required: true,
    requiredHint: '',
    validation: '',
    validationHint: '',
    defaultValue: {fileList: [],fileList1: []},
    //-------------------
    customClass: '',  //自定义css类名
    labelIconClass: null,
    labelIconPosition: 'rear',
    labelTooltip: null,
    switchWidth: 40,
    activeText: '',
    inactiveText: '',
    activeColor: null,
    inactiveColor: null,
    fieldLinkage: [
      { value: "1", linkages: [] },
      { value: "2", linkages: [] },
    ],
    //-------------------
    onCreated: '',
    onMounted: '',
    onChange: '',
    onValidate: '',
  },
}

// 文件类型
export const fileTypeSchema = {
  type: 'fileType',
  icon: 'fileType-field',
  formItemFlag: true,
  options: {
    name: '',
    // label: '文件类型',
    labelAlign: 'right',
    defaultValue: '',
    placeholder: '',
    columnWidth: '200px',
    size: '',
    labelWidth: 100,
    labelHidden: false,
    disabled: false,
    hidden: false,
    clearable: true,
    filterable: false,
    allowCreate: false,
    remote: false,
    automaticDropdown: false,  //自动下拉
    multiple: false,
    multipleLimit: 0,
    dsEnabled: false, // 是否使用数据源数据
    dsName: '', // 数据源名称
    dataSetName: '',  //数据集名称
    labelKey: 'label',
    valueKey: 'value',
    optionItems: [
      {label: 'select 1', value: 1},
      {label: 'select 2', value: 2},
      {label: 'select 3', value: 3},
    ],
    required: true,
    requiredHint: '请选择',
    validation: '',
    validationHint: '',
    fieldLinkage:[
      {value:"1",linkages:[]},
      {value:"2",linkages:[]},
    ],
    //-------------------
    customClass: '',  //自定义css类名
    labelIconClass: null,
    labelIconPosition: 'rear',
    labelTooltip: null,
    //-------------------
    onCreated: '',
    onMounted: '',
    onRemoteQuery: '',
    onChange: '',
    onFocus: '',
    onBlur: '',
    onValidate: '',
  },
}

// 代办人
export const agentManSchema = {
  type: 'agentMan',
  icon: 'agentMan',
  formItemFlag: true,
  options: {
    name: '',
    labelAlign: 'right',
    type: 'text',
    size: '',
    labelWidth: 100,
    readonly: false,
    disabled: false,
    hidden: false,
    clearable: true,
    labelHidden: true,
		required: true,
		requiredHint: '',
    defaultValue: {unitIds: '', unitNames: ''},
    //-------------------
    customClass: '',  //自定义css类名
    //-------------------
    onChange: '',
  }
}


// 所有自定义组件list
export const customComponents = ['sealName','contactUnit','usesealBesides', 'remoteSeal','videoSeal','limitTimeSeal','uploadFile','applicantInfo', 'sealFile','fileType','agentMan' ]