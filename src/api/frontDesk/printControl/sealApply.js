// api 全局配置
import request from '@/utils/request'
// 用印申请

const api = {}
// 用印申请新增
api.add = data => {
  return request({
    method: 'POST',
    url: '/sealApply/add',
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
// 智能用印列表
api.intellectPage = data => {
  return request({
    method: 'GET',
    url: '/sealApply/intellect/page',
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
    method: 'GET',
    url: '/sealApply/template/list',
    params: data
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
    url: '/sealApply/template/view',
    params: data
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
// 用印流程
api.flowList = data => {
  return request({
    method: 'GET',
    url: '/sealApply/flowList',
    params: data
  })
}
export default api
