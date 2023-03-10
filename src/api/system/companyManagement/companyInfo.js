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

export default api
