/**
 * 后台 流程管理 unit_and_department UNITANDDEPARTMENT
 */
/**
 * 各个模块常量定义
 * TABS： tabs
 * URLS： tab对应的接口
 * INFO: 基础信息label
 * TABLEHEADERS: tab 下表格的表头信息
 */
const UNITANDDEPARTMENT = {
  TABS: [],
  URLS: [],
  INFO: [],
  TABLEHEADERS: []
}

UNITANDDEPARTMENT.URLS = [
  {
    value: 'detail',
    urlName: 'baseInfo'
  },
  {
    value: 'organizer',
    urlName: 'uninUser'
  },
  {
    value: 'record',
    urlName: 'viewOperation'
  }
]

UNITANDDEPARTMENT.TABS = [
  {
    name: 't-zgj-detail-unit.UnitAndDepart',
    value: 'detail',
    children: ['BaseInfo']
  },
  {
    name: 't-zgj-detail-unit.UnitUser',
    value: 'organizer',
    children: ['VersionTable']
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
UNITANDDEPARTMENT.INFO = [
  {
    label: '部门名称',
    key: 'organName'
  },
  {
    label: '组织类型',
    key: 'organTypeName'
  },
  {
    label: '部门主管',
    key: 'organLeaderName'
  },
  {
    label: '部门编码',
    key: 'organNo'
  },
  {
    label: '部门人数',
    key: 'organUserNum'
  },
  {
    label: '上级部门',
    key: 'organPName'
  },

  {
    label: '备注',
    key: 'readme'
  }
]

UNITANDDEPARTMENT.TABLEHEADERS = {
  organizer: [
    {
      label: '人员列表',
      prop: 'userName'
    },
    {
      label: '账号',
      prop: 'accountNo'
    }
  ],
  record: [
    {
      label: '操作人',
      prop: 'operator'
    },
    {
      label: '操作时间',
      prop: 'operateDatetime'
    },
    {
      label: '操作记录',
      prop: 'operateAction'
    },
    {
      label: '操作说明',
      prop: 'operateDesc'
    }
  ]
}

export default UNITANDDEPARTMENT
