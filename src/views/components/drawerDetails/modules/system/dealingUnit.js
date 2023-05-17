/**
 * 后台 往来单位 dealing_unit DEALINGUNIT
 */
/**
 * 各个模块常量定义
 * TABS： tabs
 * URLS： tab对应的接口
 * INFO: 基础信息label
 * TABLEHEADERS: tab 下表格的表头信息
 */
const DEALINGUNIT = {
  TABS: [],
  URLS: [],
  INFO: [],
  TABLEHEADERS: []
}

DEALINGUNIT.URLS = [
  {
    value: 'detail',
    urlName: 'baseInfo'
  }
]

DEALINGUNIT.TABS = [
  {
    name: 't-zgj-detail-flow.Detail',
    value: 'detail',
    children: ['BaseInfo']
  }
]

/**
 * key: [] + handleKey => 组合 name 以 逗号； key 支持多个元素 - 不同key集合
 * type + customStyle => 展示不同状态
 */
DEALINGUNIT.INFO = [
  {
    label: '企业名称',
    key: 'relatedCompanyName'
  },
  {
    label: '企业编码',
    key: 'relatedCompanyNo'
  },
  {
    label: '企业所属部门',
    key: 'organName'
  },
  {
    label: '联系人',
    key: 'contactName'
  },
  {
    label: '备注',
    key: 'readme'
  }
]

DEALINGUNIT.TABLEHEADERS = {}

export default DEALINGUNIT
