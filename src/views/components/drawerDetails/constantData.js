import PAGENAME from './modules/pageName'

// ============================= 系统后台
// 流程管理
import SYSTEM_FLOW_MANAGEMENT from './modules/system/flowManage'

// 表单管理
import SYSTEM_FORM_MANAGEMENT from './modules/system/formManage'

// 业务规则配置
import RULEBUSINESSMANAGEMENT from './modules/system/ruleBusinessManage'

// 往来单位
import DEALINGUNIT from './modules/system/dealingUnit'

// 单位和部门
import UNITANDDEPARTMENT from './modules/system/unitAndDepartment'

const CONSTANTDATA = []

CONSTANTDATA.push({
  [PAGENAME.SYSTEM_FLOW_MANAGEMENT]: SYSTEM_FLOW_MANAGEMENT,
  [PAGENAME.SYSTEM_FORM_MANAGEMENT]: SYSTEM_FORM_MANAGEMENT,
  [PAGENAME.RULEBUSINESSMANAGEMENT]: RULEBUSINESSMANAGEMENT,
  [PAGENAME.DEALINGUNIT]: DEALINGUNIT,
  [PAGENAME.UNITANDDEPARTMENT]: UNITANDDEPARTMENT
})

export default CONSTANTDATA
