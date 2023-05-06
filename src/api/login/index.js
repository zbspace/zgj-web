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

// 验证码登录
api.sendVerificationCode = data => {
  return request({
    method: 'POST',
    url: '/login/sendVerificationCode',
    data
  })
}

api.byVerifiableCode = data => {
  return request({
    method: 'POST',
    url: '/login/byVerifiableCode',
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
    method: 'GET',
    url: '/logout',
    data
  })
}

// 选择企业登录
api.chooseOrgan = params => {
  return request({
    method: 'GET',
    url: `/user/setLoginTenant/${params}`
  })
}
// 获取验证图片  以及token
api.reqGet = params => {
  return request({
    url: '/login/getCaptchaInfo/blockPuzzle',
    method: 'GET',
    params
  })
}

api.reqChecked = data => {
  return request({
    url: '/login/checkCaptcha',
    method: 'POST',
    data
  })
}

// 获取 登录二维码
api.qrCode = params => {
  return request({
    url: '/login/qrCode',
    method: 'GET',
    params
  })
}

// 获取 登录二维码状态
api.qrCodeStatus = params => {
  return request({
    url: '/login/qrCodeStatus',
    method: 'GET',
    params
  })
}

// 扫描 登录二维码
api.scanQrCode = params => {
  return request({
    url: '/scan/loginQrCode',
    method: 'GET',
    params
  })
}

// 扫码登录
api.loginQrCode = params => {
  return request({
    url: '/confirm/loginQrCode',
    method: 'GET',
    params
  })
}
export default api
