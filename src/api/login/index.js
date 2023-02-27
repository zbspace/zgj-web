import request from '@/utils/request'
// 登录模块

const api = {}
// 账号密码登录
api.loginByAccount = data => {
  return request({
    method: 'POST',
    url: '/login/byAccount',
    data
  })
}
export default api
