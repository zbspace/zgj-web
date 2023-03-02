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

// 获取登录用户企业列表
api.tenantInfoList = params => {
  return request({
    method: 'GET',
    url: '/user/tenantInfoList',
    params
  })
}

// 退出登录
api.logOut = data => {
  return request({
    method: 'POST',
    url: '/user/logout',
    data
  })
}

export default api
