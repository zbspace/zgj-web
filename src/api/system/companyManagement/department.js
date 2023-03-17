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

export default api
