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
api.userGet = params => {
  return request({
    method: 'GET',
    url: `/user/${params}`
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
api.userDelete = params => {
  return request({
    method: 'GET',
    url: `/user/delete/${params}`
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
api.userEnable = params => {
  return request({
    method: 'GET',
    url: `/user/enable/${params}`
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
api.userDisable = params => {
  return request({
    method: 'GET',
    url: `/user/disable/${params}`
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

// 根据员工查询部门
api.organListByUser = data => {
  return request({
    method: 'GET',
    url: `/user/organList/${data}`
  })
}

// 获取 主部门用户关联信息
api.userListByOrgan = data => {
  return request({
    method: 'GET',
    url: `/user/userInfo/${data}`
  })
}

// 获取 功能权限信息
api.getAllPublic = data => {
  return request({
    method: 'GET',
    url: `function/all/public`
  })
}

// 获取 角色已选择的功能权限
api.getSelectedFunctionIds = data => {
  return request({
    method: 'GET',
    url: `/role/getSelectedFunctionIds/${data}`
  })
}

// 修改 角色已选择的功能权限
api.roleFunctionEdit = data => {
  return request({
    method: 'POST',
    url: `/role/function/edit`,
    data
  })
}

// 上传 人脸图片
api.uploadUserFace = data => {
  return request({
    method: 'POST',
    url: `/user/uploadUserFace`,
    data
  })
}

// 编辑 人脸图片 - 设置人脸
api.editOrganUserFace = data => {
  return request({
    method: 'POST',
    url: `/user/editOrganUserFace`,
    data
  })
}

export default api
