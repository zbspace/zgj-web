// api 全局配置
import request from '@/utils/request'
// 员工管理
const api = {}

// 列表请求
api.page = params => {
  return request({
    method: 'GET',
    url: '/user/page',
    params
  })
}

export default api
