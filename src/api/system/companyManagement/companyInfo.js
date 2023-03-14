// api 全局配置
import request from '@/utils/request'
// 部门管理
const api = {}

// ================
// 修改页面设置
api.updatePageSetting = (tenantId, data) => {
  return request({
    method: 'POST',
    url: `/tenant/tenantLogo/update/${tenantId}`,
    isForm: true,
    data
  })
}

// 修改基础信息
api.updateTenantBaseInfo = data => {
  return request({
    method: 'POST',
    url: '/tenant/tenantBaseInfo/update',
    data
  })
}

// 修改密码设置
api.updateTenantPasswordPolicy = data => {
  return request({
    method: 'POST',
    url: '/tenant/tenantPasswordPolicy/update',
    data
  })
}

// 获取修改超级管理员的验证码
api.getVerificationCode = data => {
  return request({
    method: 'POST',
    url: '/tenant/tenantAdminInfo/getVerificationCode',
    data
  })
}

// 修改管理员
api.updateAdmin = data => {
  return request({
    method: 'POST',
    url: '/tenant/tenantAdminInfo/update',
    data
  })
}
export default api
