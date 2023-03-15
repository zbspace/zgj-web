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

api.add = data => {
  return request({
    method: 'POST',
    url: '/organ/add',
    data
  })
}

export default api
