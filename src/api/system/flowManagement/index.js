// api 全局配置
import request from '@/utils/request'
// 流程管理
const api = {}

api.test = params => {
  return request({
    method: 'GET',
    url: '/category/list',
    params
  })
}

// ================
// 流程列表
api.page = params => {
  return request({
    method: 'GET',
    url: '/flow/page',
    params
  })
}

// 流程详情
api.view = params => {
  return request({
    method: 'GET',
    url: '/form/view',
    params
  })
}

// 流程详情_操作记录
api.viewOperation = params => {
  return request({
    method: 'GET',
    url: '/form/viewOperation',
    params
  })
}

// 流程详情_历史版本
api.viewHisVersion = params => {
  return request({
    method: 'GET',
    url: '/form/viewHisVersion',
    params
  })
}

// 新增流程
api.add = data => {
  return request({
    method: 'POST',
    url: '/flow/add',
    data
  })
}

// 编辑流程
api.edit = data => {
  return request({
    method: 'POST',
    url: '/form/edit',
    data
  })
}

// 删除流程
api.delete = data => {
  return request({
    method: 'POST',
    url: '/form/delete',
    data
  })
}

// 启用/停用
api.enable = data => {
  return request({
    method: 'POST',
    url: '/form/enable',
    data
  })
}

// 复制流程
api.copy = data => {
  return request({
    method: 'POST',
    url: '/form/copy',
    data
  })
}

// 批量删除
api.batchDelete = data => {
  return request({
    method: 'POST',
    url: '/form/batchDelete',
    data
  })
}

// 批量启用
api.batachEnable = data => {
  return request({
    method: 'POST',
    url: '/form/batachEnable',
    data
  })
}

// 批量停用
api.batachDisable = data => {
  return request({
    method: 'POST',
    url: '/form/batachDisable',
    data
  })
}

// 根据表单id查询关联且启用的流程
api.getEnableProcessByForm = data => {
  return request({
    method: 'POST',
    url: '/form/getEnableProcessByForm',
    data
  })
}

// 根据表单id查询流程中引用的相关字段
api.getProcessFormColum = data => {
  return request({
    method: 'POST',
    url: '/form/getProcessFormColum',
    data
  })
}
export default api
