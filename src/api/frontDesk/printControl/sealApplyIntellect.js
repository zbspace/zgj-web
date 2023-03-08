// api 全局配置
import request from '@/utils/request'
// 智能用印

const api = {}
// 智能用印列表（待智能用印）
api.pageNoUse = data => {
  return request({
    method: 'GET',
    url: '/sealApply/intellect/pageNoUse',
    params: data
  })
}
// 智能用印列表（智能用印中）
api.pageUsing = data => {
  return request({
    method: 'GET',
    url: '/sealApply/intellect/pageUsing',
    params: data
  })
}
// 智能用印列表（已完成用印）
api.pageUseDone = data => {
  return request({
    method: 'GET',
    url: '/sealApply/intellect/pageUseDone',
    params: data
  })
}
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
export default api
