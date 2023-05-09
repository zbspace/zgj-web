// api 系统设置
import request from '@/utils/request'

const api = {}
// navbar
// 获取个人信息
api.getUserInfo = params => {
  return request({
    method: 'GET',
    url: '/user/getUserInfo',
    params
  })
}

// 个人中心 - 获取短信验证码
api.sendChangeMobileVerificationCode = data => {
  return request({
    method: 'POST',
    url: '/user/sendChangeMobileVerificationCode',
    data
  })
}

// 更换手机号
api.changeMobile = data => {
  return request({
    method: 'POST',
    url: '/user/changeMobile',
    data
  })
}

export default api
