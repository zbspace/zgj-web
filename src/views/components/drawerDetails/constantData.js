import PAGENAME from './modules/pageName'

// ============================= 系统后台
// 流程管理
import SYSTEM_FLOW_MANAGEMENT from './modules/system/flowManage'

// 表单管理
import SYSTEM_FORM_MANAGEMENT from './modules/system/formManage'

// 业务规则配置
import RULEBUSINESSMANAGEMENT from './modules/system/ruleBusinessManage'

const CONSTANTDATA = []

CONSTANTDATA.push({
  [PAGENAME.SYSTEM_FLOW_MANAGEMENT]: SYSTEM_FLOW_MANAGEMENT,
  [PAGENAME.SYSTEM_FORM_MANAGEMENT]: SYSTEM_FORM_MANAGEMENT,
  [PAGENAME.RULEBUSINESSMANAGEMENT]: RULEBUSINESSMANAGEMENT
})

export default CONSTANTDATA
