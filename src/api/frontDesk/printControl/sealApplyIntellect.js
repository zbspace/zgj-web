// api 全局配置
import request from '@/utils/request'
// 智能用印

const api = {}
// 转常规智能用印
api.turnNomalUse = data => {
  return request({
    method: 'POST',
    url: '/sealApply/intellect/turnNomalUse',
    data
  })
}
// 申请转办
api.turnDeal = data => {
  return request({
    method: 'POST',
    url: '/sealApply/intellect/turnDeal',
    data
  })
}
// 申请重置
api.templateClearInvalid = data => {
  return request({
    method: 'POST',
    url: '/sealApply/intellect/template/clearInvalid',
    data
  })
}
// 模板详情
api.templateView = data => {
  return request({
    method: 'GET',
    url: '/sealApply/intellect/template/view',
    params: data
  })
}
// 附件上传
api.uploadFile = data => {
  return request({
    method: 'POST',
    url: '/sealApply/intellect/uploadFile',
    data
  })
}
// 用印流程
api.flowList = data => {
  return request({
    method: 'GET',
    url: '/sealApply/intellect/flowList',
    params: data
  })
}
// 用印详情基本信息
api.sealBaseInfo = params => {
  return request({
    method: 'GET',
    url: '/sealApply/query/basic',
    params
  })
}
// 用印申请撤销
api.cancel = data => {
  return request({
    method: 'POST',
    url: '/sealApply/cancel',
    data
  })
}
// 用印申请作废
api.invalid = data => {
  return request({
    method: 'POST',
    url: '/sealApply/invalid',
    data
  })
}
// 解除用印限制
api.relieveUseLimit = data => {
  return request({
    method: 'POST',
    url: '/sealApply/relieveUseLimit',
    data
  })
}
export default api
