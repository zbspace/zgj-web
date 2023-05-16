/**
 * 后台 流程管理 system_flow_management SYSTEMFLOWMANAGEMENT
 */
/**
 * 各个模块常量定义
 * TABS： tabs
 * URLS： tab对应的接口
 */
const SYSTEMFLOWMANAGEMENT = {
  TABS: [],
  URLS: []
}

SYSTEMFLOWMANAGEMENT.URLS = [
  {
    value: 'detail',
    urlName: 'baseInfo'
  },
  {
    value: 'version',
    urlName: 'queryHisVersion'
  },
  {
    value: 'record',
    urlName: 'viewOperation'
  }
]

SYSTEMFLOWMANAGEMENT.TABS = [
  {
    name: 't-zgj-detail-flow.Detail',
    value: 'detail',
    // children: ['BaseInfo', 'FlowDetail']
    children: ['BaseInfo']
  },
  {
    name: 't-zgj-detail-flow.Version',
    value: 'version',
    children: ['VersionTable']
  },
  {
    name: 't-zgj-detail-flow.Record',
    value: 'record',
    children: ['VersionTable']
  }
]

SYSTEMFLOWMANAGEMENT.INFO = [
  {
    label: '流程名称',
    key: 'flowName'
  },
  {
    label: '流程编码',
    key: 'flowNo'
  },
  {
    label: '业务类型',
    key: 'applyTypeName'
  },
  {
    label: '文件类型',
    key: 'fileTypeName'
  },
  {
    label: '流程状态',
    key: 'flag',
    type: 'status',
    // iconPath: handleIcon(data),
    customStyle: true
  },
  {
    label: '流程适用范围',
    key: 'fileTypeScope',
    handleArrToStr: true
  },
  {
    label: '创建人',
    key: 'createUserName'
  },
  {
    label: '创建时间',
    key: 'createDatetime'
  },
  {
    label: '更新时间',
    key: 'modifyDatetime'
  },
  // {
  //   label: '流程类型',
  //   key: '无字段'
  // },
  {
    label: '流程说明',
    key: 'readme'
  },
  {
    label: '关联表单',
    key: 'formMessageName'
  }
  // {
  //   label: '超时提醒',
  //   key: '无字段'
  // },
  // {
  //   label: '审批人自动去重',
  //   key: '无字段'
  // }
]

SYSTEMFLOWMANAGEMENT.TABLEHEADERS = {
  version: [
    {
      label: '版本号',
      prop: 'flowVerison'
    },
    {
      label: '版本时间',
      prop: 'modifyDatetime'
    }
  ],
  record: [
    {
      label: '操作人',
      prop: 'operationUser'
    },
    {
      label: '操作时间',
      prop: 'operationDate'
    },
    {
      label: '操作记录',
      prop: 'operationType'
    },
    {
      label: '操作说明',
      prop: 'operationTxt'
    }
  ]
}

export default SYSTEMFLOWMANAGEMENT
