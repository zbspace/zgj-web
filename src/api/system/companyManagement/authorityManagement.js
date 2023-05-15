// api 全局配置
import request from '@/utils/request'
// 权限管理
const api = {}

// 列表请求
api.userPage = params => {
  return request({
    method: 'GET',
    url: '/user/page',
    params
  })
}
// 角色编辑
api.roleEdit = data => {
  return request({
    method: 'POST',
    url: '/role/edit',
    data
  })
}

// 角色删除
api.roleDelete = data => {
  return request({
    method: 'POST',
    url: `/role/delete/${data}`
  })
}

// 获取角色编码
api.generateBizNo = data => {
  return request({
    method: 'POST',
    url: `/role/generateBizNo/${data}`
  })
}

// 角色新增
api.roleData = data => {
  return request({
    method: 'POST',
    url: `/role/add`,
    data
  })
}

// 批量删除
api.batchDelete = data => {
  return request({
    method: 'POST',
    url: `/role/batchDelete`,
    data
  })
}

// 新增基础配置
api.addSetting = data => {
  return request({
    method: 'POST',
    url: `/role/config/add`,
    data
  })
}

// 修改基础配置
api.editSetting = data => {
  return request({
    method: 'POST',
    url: `/role/config/edit`,
    data
  })
}

// 获取基础数据配置
api.getSetting = params => {
  return request({
    method: 'GET',
    url: `/role/config/get`
  })
}

// 移除角色对应人员
api.deleteRoleUser = params => {
  return request({
    method: 'GET',
    url: `/role/user/delete/${params}`
  })
}

// 添加角色人员
api.addRoleUser = data => {
  return request({
    method: 'POST',
    url: `/role/user/add`,
    data
  })
}

// 批量移除角色对应人员
api.batchDeleteRoleUser = data => {
  return request({
    method: 'POST',
    url: `/role/user/batchDelete`,
    data
  })
}

export default api
