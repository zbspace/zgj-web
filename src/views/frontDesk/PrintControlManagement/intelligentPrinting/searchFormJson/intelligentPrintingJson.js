const searchFormJson = [
  {
    id: 'keyword',
    label: '关键词',
    type: 'input',
    inCommonUse: true,
    // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
    defaultAttribute: {
      placeholder: '盖章码/单据名称'
    }
  },
  {
    id: 'applyTime',
    label: '申请时间',
    type: 'picker',
    requestType: 'array',
    startRequest: 'applyStartTime',
    endRequest: 'applyEndTime',
    inCommonUse: true,
    defaultAttribute: {
      type: 'daterange',
      'start-placeholder': '开始时间',
      'end-placeholder': '结束时间',
      'value-format': 'YYYY-MM-DD',
      'disabled-date': time => {
        return time.getTime() > Date.now()
      },
      'default-value': [
        new Date(new Date().setMonth(new Date().getMonth() - 1)),
        new Date()
      ]
    },
    style: {}
  },
  {
    id: 'fileTypeId',
    requestParams: 'fileTypeId',
    label: '文件类型',
    type: 'derivable',
    inCommonUse: false,
    // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
    defaultAttribute: {
      placeholder: '请选择',
      type: 'fileType',
      multiple: true,
      joinStr: ','
    },
    options: []
  },
  {
    id: 'sealId',
    requestParams: 'sealId',
    label: '印章名称',
    type: 'dialog',
    defaultAttribute: {
      type: 'JySelectSeal',
      multiple: false,
      placeholder: '+印章名称'
    },
    options: [],
    values: null
  },
  {
    id: 'applyUser',
    requestParams: 'applyUserId',
    label: '申请人',
    type: 'derivable',
    defaultAttribute: {
      type: 'user',
      multiple: false,
      placeholder: '+申请人'
    },
    options: [],
    values: null
  },
  {
    id: 'applyOrgan',
    requestParams: 'applyOrganId',
    label: '申请部门',
    type: 'derivable',
    defaultAttribute: {
      type: 'organ',
      multiple: false,
      placeholder: '+申请部门'
    },
    options: [],
    values: null
  },
  {
    id: 'useModel',
    label: '用印模式',
    type: 'checkButton',
    data: [
      {
        id: '1',
        name: '智能用印'
      },
      {
        id: '2',
        name: '远程盖章'
      },
      {
        id: '3',
        name: '实时视频盖章'
      }
    ]
  }
]

export default searchFormJson
