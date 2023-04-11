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
api.flowDetail = params => {
  return request({
    method: 'GET',
    url: '/flow/query',
    params
  })
}

// 流程详情_操作记录
api.queryHisVersion = params => {
  return request({
    method: 'GET',
    url: '/flow/queryHisVersion',
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
api.flowEdit = data => {
  return request({
    method: 'POST',
    url: '/flow/edit',
    data
  })
}

// 删除流程
api.flowDelete = data => {
  return request({
    method: 'POST',
    url: '/flow/delete',
    data
  })
}

// 启用/停用
api.flowEnable = data => {
  return request({
    method: 'POST',
    url: '/flow/enable',
    data
  })
}

// 复制流程
api.flowCopy = data => {
  return request({
    method: 'POST',
    url: '/flow/copy',
    data
  })
}

// 批量删除
api.batchDelete = data => {
  return request({
    method: 'POST',
    url: '/flow/batchDelete',
    data
  })
}

// 批量启用
api.batachEnable = data => {
  return request({
    method: 'POST',
    url: '/flow/batchEnable',
    data
  })
}

// 批量停用
api.batachDisable = data => {
  return request({
    method: 'POST',
    url: '/flow/batachDisable',
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

// 流程配置时查询可用表单
api.flowSettingForm = params => {
  return request({
    method: 'GET',
    url: '/form/flowSettingForm',
    params
  })
}

// 通过 id查询动态表单json
api.getFormJsonById = params => {
  return request({
    method: 'GET',
    url: '/form/query',
    params
  })
}
export default api
