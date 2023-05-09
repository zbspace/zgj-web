const searchForm = [
  {
    id: 'searchKey',
    label: '关键词',
    type: 'input',
    inCommonUse: true,
    // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
    defaultAttribute: {
      placeholder: '文件名称/申请人员/用印编码'
    }
  },
  {
    id: 'applyDate',
    label: '申请时间',
    type: 'picker',
    inCommonUse: true,
    // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
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
    requestParams: 'fileTypeIds',
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
    id: 'applyUser',
    requestParams: 'applyUserId',
    label: '申请人',
    type: 'derivable',
    defaultAttribute: {
      type: 'user',
      multiple: true,
      placeholder: '+申请人',
      joinStr: ','
    },
    options: [],
    values: null
  },
  {
    id: 'applyOrgan',
    requestParams: 'applyOrganIds',
    label: '申请部门',
    type: 'derivable',
    defaultAttribute: {
      type: 'organ',
      multiple: true,
      placeholder: '+申请部门',
      joinStr: ','
    },
    options: [],
    values: null
  },
  {
    id: 'derivable',
    label: '往来单位',
    type: 'derivable',
    // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
    defaultAttribute: {
      placeholder: '+往来单位'
    }
  },
  {
    id: 'archiveDate',
    label: '归档时间',
    type: 'picker',
    inCommonUse: true,
    // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
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
    id: 'useSealStatus',
    label: '用印状态',
    type: 'checkButton',
    data: [
      {
        id: '1',
        name: '正常'
      },
      {
        id: '2',
        name: '异常'
      }
    ]
  },
  {
    id: 'onlyMyself',
    label: '',
    type: 'checkbox',
    checkbox: [
      {
        // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
        defaultAttribute: {
          label: '我的申请单据'
        },
        style: {}
      }
    ]
  }
]

export default searchForm
