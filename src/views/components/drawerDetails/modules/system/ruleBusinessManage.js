/**
 * 后台 业务规则配置 rule_business_management RULEBUSINESSMANAGEMENT
 */
/**
 * 各个模块常量定义
 * TABS： tabs
 * URLS： tab对应的接口
 * INFO: 基础信息label
 * TABLEHEADERS: tab 下表格的表头信息
 */
const RULEBUSINESSMANAGEMENT = {
  TABS: [],
  URLS: [],
  INFO: [],
  TABLEHEADERS: []
}

RULEBUSINESSMANAGEMENT.URLS = [
  {
    value: 'detail',
    urlName: 'baseInfo'
  },
  {
    value: 'record',
    urlName: 'viewOperation'
  }
]

RULEBUSINESSMANAGEMENT.TABS = [
  {
    name: 't-zgj-detail-flow.Detail',
    value: 'detail',
    children: ['BaseInfo']
  }
  // {
  //   name: 't-zgj-detail-operation.Record',
  //   value: 'record',
  //   children: ['RecordTable']
  // }
]

/**
 * key: [] + handleKey => 组合 name 以 逗号； key 支持多个元素 - 不同key集合
 * type + customStyle => 展示不同状态
 */
RULEBUSINESSMANAGEMENT.INFO = [
  {
    label: '业务规则名称',
    key: 'ruleBusinessName'
  },
  {
    label: '业务规则编码',
    key: 'ruleBusinessNo'
  },
  {
    label: '用印类型',
    key: 'sealUseTypeName'
  },
  {
    label: '关联文件类型',
    key: ['fileTypeList'],
    handleKey: 'filteType'
  },
  {
    label: '业务规则状态',
    key: 'flag',
    type: 'status',
    customStyle: true
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
  }
]

RULEBUSINESSMANAGEMENT.TABLEHEADERS = {
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

export default RULEBUSINESSMANAGEMENT
