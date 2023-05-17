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
  }
}

export default api
