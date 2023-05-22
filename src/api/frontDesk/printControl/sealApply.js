// api 全局配置
import request from '@/utils/request'
// 用印申请

const api = {}
// 申请列表
api.list = params => {
  return request({
    method: 'GET',
    url: '/form/applyUseForm',
    params
  })
}
// 获取申请表单的动态表单
api.formQuery = params => {
  return request({
    method: 'GET',
    url: '/form/query',
    params
  })
}
// 获取表单的审批流程详情
api.flowDetail = params => {
  return request({
    method: 'GET',
    url: '/model/design',
    params
  })
}
// 用印申请新增
api.add = data => {
  return request({
    method: 'POST',
    url: '/sealApply/add',
    data
  })
}
// 提交流程申请
api.submit = data => {
  return request({
    method: 'POST',
    url: '/approver/start',
    data
  })
}
// 查询是否有强制归档且未归档的单据
api.queryIsMustUpload = data => {
  return request({
    method: 'GET',
    url: '/sealApply/queryIsMustUpload',
    params: data
  })
}
// 保存模板
api.templateAdd = data => {
  return request({
    method: 'POST',
    url: '/sealApply/template/add',
    data
  })
}
// 模板列表
api.templateList = data => {
  return request({
    method: 'POST',
    url: '/sealApply/template/list',
    data
  })
}
// 清除无效模板
api.templateClearInvalid = data => {
  return request({
    method: 'POST',
    url: '/sealApply/template/clearInvalid',
    data
  })
}
// 模板详情
api.templateView = data => {
  return request({
    method: 'GET',
    url: `/sealApply/template/view/${data}`
  })
}
// 附件上传
api.uploadFile = data => {
  return request({
    method: 'POST',
    url: '/sealApply/uploadFile',
    data
  })
}
// 补充附件上传
api.uploadAddFile = data => {
  return request({
    method: 'POST',
    url: '/sealApply/uploadAddFile',
    data
  })
}
// 用印流程
api.flowList = params => {
  return request({
    method: 'GET',
    url: '/flow/getEnableProcessByForm',
    params
  })
}
// 币种列表
api.getMoneyType = () => {
  return request({
    method: 'GET',
    url: 'sealApply/moneyType/list'
  })
}
// 删除模版
api.deleteTem = data => {
  return request({
    method: 'POST',
    url: `/sealApply/template/delete/${data}`
  })
}

// 清除失效模版
api.clearValid = data => {
  return request({
    method: 'POST',
    url: `/sealApply/template/clearValid`,
    data
  })
}

// 用印申请编辑
api.editForm = data => {
  return request({
    method: 'POST',
    url: `/sealApply/edit`,
    data
  })
}

// 第三方流程实例ID查询用印申请ID
api.queryIdByGunsId = params => {
  return request({
    method: 'GET',
    url: '/sealApply/queryIdByGunsId',
    params
  })
}

// 查询用印申请文件（带url）
api.applyPdfFile = params => {
  return request({
    method: 'GET',
    url: '/sealApply/file/apply',
    params
  })
}

export default api
