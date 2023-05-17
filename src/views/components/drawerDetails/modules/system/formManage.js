/**
 * 后台 表单管理 system_form_management SYSTEMFORMMANAGENMENT
 */
/**
 * 各个模块常量定义
 * TABS： tabs
 * URLS： tab对应的接口
 * INFO: 基础信息label
 * TABLEHEADERS: tab 下表格的表头信息
 */
const SYSTEMFORMMANAGENMENT = {
  TABS: [],
  URLS: [],
  INFO: [],
  TABLEHEADERS: []
}

SYSTEMFORMMANAGENMENT.URLS = [
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

SYSTEMFORMMANAGENMENT.TABS = [
  {
    name: 't-zgj-detail-flow.Detail',
    value: 'detail',
    children: ['BaseInfo']
  },
  {
    name: 't-zgj-detail-operation.Record',
    value: 'record',
    children: ['RecordTable']
  },
  {
    name: 't-zgj-detail-flow.Version',
    value: 'version',
    children: ['VersionTable']
  }
]

/**
 * key: [] + handleKey => 组合 name 以 逗号； key 支持多个元素 - 不同key集合
 * type + customStyle => 展示不同状态
 */
SYSTEMFORMMANAGENMENT.INFO = [
  {
    label: '表单名称',
    key: 'formName'
  },
  {
    label: '表单编码',
    key: 'formNo'
  },
  {
    label: '业务类型',
    key: 'applyTypeName'
  },
  {
    label: '用印类型',
    key: 'sealUseTypeName'
  },
  {
    label: '表单状态',
    key: 'flag',
    type: 'status',
    customStyle: true
  },
  {
    label: '创建时间',
    key: 'createDatetimeStr'
  },
  {
    label: '创建人',
    key: 'createUserName'
  },
  {
    label: '更新时间',
    key: 'modifyDatetimeStr'
  },
  {
    label: '表单说明',
    key: 'readme'
  }
]

SYSTEMFORMMANAGENMENT.TABLEHEADERS = {
  version: [
    {
      label: '版本号',
      prop: 'formVerison'
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

export default SYSTEMFORMMANAGENMENT
