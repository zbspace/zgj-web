// api 全局配置
import request from '@/utils/request'
// 表单管理
const api = {}
// 查询表单树解构
api.listApplyTypeTree = params => {
  return request({
    method: 'GET',
    url: '/form/listApplyTypeTree',
    params
  })
}

// 表单列表
api.formPage = params => {
  return request({
    method: 'GET',
    url: '/form/page',
    params
  })
}

// 新增表单
api.formAdd = data => {
  return request({
    method: 'POST',
    url: '/form/add',
    data
  })
}

// 编辑表单
api.formEdit = data => {
  return request({
    method: 'POST',
    url: '/form/edit',
    data
  })
}

// 删除表单
api.formDelete = data => {
  return request({
    method: 'POST',
    url: '/form/delete',
    data
  })
}

// 表单详情
api.view = params => {
  return request({
    method: 'GET',
    url: '/form/view',
    params
  })
}

// 表单详情_操作记录
api.viewOperation = params => {
  return request({
    method: 'GET',
    url: '/form/viewOperation',
    params
  })
}

// 表单详情_历史版本
api.viewHisVersion = params => {
  return request({
    method: 'GET',
    url: '/form/viewHisVersion',
    params
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

// 复制表单
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
api.batchEnable = data => {
  return request({
    method: 'POST',
    url: '/form/batchEnable',
    data
  })
}

// 批量停用
api.batchDisable = data => {
  return request({
    method: 'POST',
    url: '/form/batchDisable',
    data
  })
}

// 关联文件类型
api.relationContractType = data => {
  return request({
    method: 'POST',
    url: '/form/relationContractType',
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

// 单据申请时查询可用表单
api.applyUseForm = params => {
  return request({
    method: 'GET',
    url: '/form/applyUseForm',
    params
  })
}

// 查询动态表单基础字段&业务字段
api.formColumnBasic = params => {
  return request({
    method: 'GET',
    url: '/form/column/basic',
    params
  })
}

// 查询动态表单模板
api.getFormTemplate = params => {
  return request({
    method: 'GET',
    url: '/form/template',
    params
  })
}

// 查询动态表单必有字段
api.getFormColumnMust = params => {
  return request({
    method: 'GET',
    url: '/form/column/must',
    params
  })
}
export default api
