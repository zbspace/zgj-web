// api 系统设置
import request from '@/utils/request'

const api = {}
// navbar
// 获取个人信息
api.getUserInfo = data => {
  return request({
    method: 'GET',
    url: '/user/getUserInfo',
    data
  })
}

export default api
