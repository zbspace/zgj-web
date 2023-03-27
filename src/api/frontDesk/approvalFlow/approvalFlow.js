// api 全局配置
import request from '@/utils/request'

// 审批流程
export const approvalFlow = {
  // 待审批流程
  getPageNoApproval: params => {
    return request({
      method: 'GET',
      url: '/flow/task/pageNoApproval',
      params
    })
  },

  // 已审批
  getPageHisApproval: params => {
    return request({
      method: 'GET',
      url: '/flow/task/pageHisApproval',
      params
    })
  }
}
