// api 全局配置
import request from '@/utils/request'
// 部门管理
const api = {}

// ================
// 部门分页列表
api.page = params => {
  return request({
    method: 'GET',
    url: '/organ/page',
    params
  })
}

export default api
