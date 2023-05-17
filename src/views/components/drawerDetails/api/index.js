import request from '@/utils/request'
import PAGENAME from '../modules/pageName'
import CONSTANTDATA from '../constantData'

const handleApiName = (moduleName, index) => {
  const str =
    CONSTANTDATA[CONSTANTDATA.findIndex(item => item[moduleName])][moduleName]
      .URLS[index].urlName

  return str
}

const handleIndx = (moduleName, value) => {
  const i = CONSTANTDATA[CONSTANTDATA.findIndex(item => item[moduleName])][
    moduleName
  ].URLS.findIndex(item => item.value === value)
  return i
}

// 详情 抽屉
let api = {}

api = {
  // 流程管理
  [PAGENAME.SYSTEM_FLOW_MANAGEMENT]: {
    // 基础信息
    [handleApiName(
      PAGENAME.SYSTEM_FLOW_MANAGEMENT,
      handleIndx(PAGENAME.SYSTEM_FLOW_MANAGEMENT, 'detail')
    )]: params => {
      return request({
        method: 'GET',
        url: '/flow/query',
        params
      })
    },
    // 历史版本
    [handleApiName(
      PAGENAME.SYSTEM_FLOW_MANAGEMENT,
      handleIndx(PAGENAME.SYSTEM_FLOW_MANAGEMENT, 'version')
    )]: params => {
      return request({
        method: 'GET',
        url: '/flow/queryHisVersion',
        params
      })
    },

    // 操作记录
    [handleApiName(
      PAGENAME.SYSTEM_FLOW_MANAGEMENT,
      handleIndx(PAGENAME.SYSTEM_FLOW_MANAGEMENT, 'record')
    )]: params => {
      return request({
        method: 'GET',
        url: '/flow/viewOperation',
        params
      })
    }
  },
  // 表单管理
  [PAGENAME.SYSTEM_FORM_MANAGEMENT]: {
    // 基础信息
    [handleApiName(
      PAGENAME.SYSTEM_FORM_MANAGEMENT,
      handleIndx(PAGENAME.SYSTEM_FORM_MANAGEMENT, 'detail')
    )]: params => {
      return request({
        method: 'GET',
        url: '/form/query',
        params
      })
    },
    // 历史版本
    [handleApiName(
      PAGENAME.SYSTEM_FORM_MANAGEMENT,
      handleIndx(PAGENAME.SYSTEM_FORM_MANAGEMENT, 'version')
    )]: params => {
      return request({
        method: 'GET',
        url: '/form/queryHisVersion',
        params
      })
    },

    // 操作记录
    [handleApiName(
      PAGENAME.SYSTEM_FORM_MANAGEMENT,
      handleIndx(PAGENAME.SYSTEM_FORM_MANAGEMENT, 'record')
    )]: params => {
      return request({
        method: 'GET',
        url: '/form/queryOperation',
        params
      })
    }
  },
  // 业务规则配置
  [PAGENAME.RULEBUSINESSMANAGEMENT]: {
    // 基础信息
    [handleApiName(
      PAGENAME.RULEBUSINESSMANAGEMENT,
      handleIndx(PAGENAME.RULEBUSINESSMANAGEMENT, 'detail')
    )]: ruleBusinessId => {
      return request({
        method: 'GET',
        url: `/biz/rule/view/${ruleBusinessId}`
      })
    }

    // 操作记录
    // [handleApiName(
    //   PAGENAME.RULEBUSINESSMANAGEMENT,
    //   handleIndx(PAGENAME.RULEBUSINESSMANAGEMENT, 'record')
    // )]: params => {
    //   return request({
    //     method: 'GET',
    //     url: '',
    //     params
    //   })
    // }
  }
}

export default api
