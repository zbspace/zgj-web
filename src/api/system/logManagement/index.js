// api 全局配置
import request from '@/utils/request'
// 日志管理
const api = {}

// ================
// 系统操作日志
api.systemOperation = params => {
  return request({
    method: 'GET',
    url: '/log/operation/page',
    params
  })
}

export default api
