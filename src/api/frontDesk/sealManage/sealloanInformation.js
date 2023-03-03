// api 全局配置
import request from '@/utils/request'
// 印章外借管理

const api = {}
// 印章外借分页列表
api.page = params => {
  return request({
    method: 'GET',
    url: '/out/page',
    params
  })
}
// 印章外借历史记录
api.history = params => {
  return request({
    method: 'POST',
    url: '/out/history',
    params
  })
}
// 印章外借归还
api.return = data => {
  return request({
    method: 'POST',
    url: '/out/history',
    data
  })
}
export default api
