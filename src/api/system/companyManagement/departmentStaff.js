// api 全局配置
import request from '@/utils/request'
// 员工管理
const api = {}

// 列表请求
api.userPage = params => {
  return request({
    method: 'GET',
    url: '/user/page',
    params
  })
}
// 新增员工
api.userAdd = data => {
  return request({
    method: 'POST',
    url: '/user/add',
    data
  })
}
// 获取员工信息
api.userGet = data => {
  return request({
    method: 'GET',
    url: '/user/get/',
    data
  })
}
// 修改员工
api.userEdit = data => {
  return request({
    method: 'POST',
    url: '/user/edit',
    data
  })
}
// 删除员工
api.userDelete = data => {
  return request({
    method: 'GET',
    url: '/user/delete/',
    data
  })
}
// 批量删除
api.userBatchDelete = data => {
  return request({
    method: 'POST',
    url: '/user/batchDelete',
    data
  })
}
// 启用员工
api.userEnable = data => {
  return request({
    method: 'GET',
    url: '/user/enable/',
    data
  })
}
// 批量启用员工
api.userBatchEnable = data => {
  return request({
    method: 'POST',
    url: '/user/batchEnable',
    data
  })
}
// 停用员工
api.userDisable = data => {
  return request({
    method: 'GET',
    url: '/user/disable/',
    data
  })
}
// 批量停用
api.userBatchDisable = data => {
  return request({
    method: 'POST',
    url: '/user/batchDisable/',
    data
  })
}
// 修改密码
api.userResetPassword = data => {
  return request({
    method: 'POST',
    url: '/user/resetPassword',
    data
  })
}
// 批量修改密码
api.userBatchResetPassword = data => {
  return request({
    method: 'POST',
    url: '/user/batchResetPassword',
    data
  })
}
// 员工导入
api.userImport = data => {
  return request({
    method: 'POST',
    url: '/user/user/import',
    data
  })
}
// 员工人脸导入
api.userFaceImport = data => {
  return request({
    method: 'POST',
    url: '/user/face/import',
    data
  })
}
// 部门员工树状态
api.userTreeMenu = data => {
  return request({
    method: 'GET',
    url: '/organ/user/treeMenu',
    data
  })
}

export default api
