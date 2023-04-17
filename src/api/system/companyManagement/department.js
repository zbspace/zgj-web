// api 全局配置
import request from '@/utils/request'
// 部门管理
const api = {}

// ================
// 部门分页列表
api.page = params => {
  return request({
    method: 'GET',
    url: '/organ/page',
    params
  })
}

// 获取部门列表
api.subOrganList = organId => {
  return request({
    method: 'GET',
    url: `/organ/subOrganList/${organId}`
  })
}

// 获取 组织人员
api.userInfoList = organId => {
  return request({
    method: 'GET',
    url: `/organ/userInfoList/${organId}`
  })
}

// 部门详情
api.detail = organId => {
  return request({
    method: 'GET',
    url: `/organ/${organId}`
  })
}

// 新增部门
api.add = data => {
  return request({
    method: 'POST',
    url: '/organ/add',
    data
  })
}

// 编辑部门
api.edit = data => {
  return request({
    method: 'POST',
    url: '/organ/edit',
    data
  })
}

// 批量删除部门
api.batchDelete = data => {
  return request({
    method: 'POST',
    url: '/organ/batchDelete',
    data
  })
}

// 批量停用部门
api.batchDisable = data => {
  return request({
    method: 'POST',
    url: '/organ/batchDisable',
    data
  })
}

// 批量启用部门
api.batchEnable = data => {
  return request({
    method: 'POST',
    url: '/organ/batchEnable',
    data
  })
}

export default api
