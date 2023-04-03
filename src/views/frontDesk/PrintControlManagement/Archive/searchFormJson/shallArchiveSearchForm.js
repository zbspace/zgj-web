const searchForm = [
  {
    id: 'name',
    label: '关键词',
    type: 'input',
    inCommonUse: true,
    // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
    defaultAttribute: {
      placeholder: '文件名称/申请人员/用印编码'
    }
  },
  {
    id: 'picker',
    label: '申请时间',
    type: 'picker',
    pickerType: 'date',
    inCommonUse: true,
    // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
    defaultAttribute: {
      type: 'daterange',
      'start-placeholder': '开始时间',
      'end-placeholder': '结束时间'
    },
    style: {}
  },
  {
    id: 'derivable',
    label: '文件类型',
    type: 'derivable',
    // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
    defaultAttribute: {
      placeholder: '+文件类型'
    }
  },
  {
    id: 'derivable',
    label: '申请人',
    type: 'derivable',
    // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
    defaultAttribute: {
      placeholder: '+申请人'
    }
  },
  {
    id: 'derivable',
    label: '申请部门',
    type: 'derivable',
    // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
    defaultAttribute: {
      placeholder: '+申请部门'
    }
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
    pickerType: 'date',
    inCommonUse: true,
    // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
    defaultAttribute: {
      type: 'daterange',
      'start-placeholder': '开始时间',
      'end-placeholder': '结束时间'
    },
    style: {}
  },
  {
    id: 'wdyy',
    label: '用印状态',
    type: 'checkButton',
    data: [
      {
        name: '正常'
      },
      {
        name: '异常'
      }
    ]
  },
  {
    id: 'wdyy',
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
