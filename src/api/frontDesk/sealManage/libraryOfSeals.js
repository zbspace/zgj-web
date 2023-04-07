// api 全局配置
import request from '@/utils/request'
// 印章类型管理

const api = {}
// 印章分页列表 - 管理维护
api.page = params => {
  return request({
    method: 'GET',
    url: '/sealInfo/page/view',
    params
  })
}
// 印章分页列表 - 用印选择
api.pageList = params => {
  return request({
    method: 'GET',
    url: '/sealInfo/page',
    params
  })
}
// 印章新增
api.add = data => {
  return request({
    method: 'POST',
    url: '/sealInfo/add',
    data
  })
}
// 印章编辑
api.edit = data => {
  return request({
    method: 'POST',
    url: '/sealInfo/edit',
    data
  })
}
// 印章删除
api.sealInfoDelete = params => {
  return request({
    method: 'GET',
    url: '/sealInfo/delete',
    params
  })
}
// 印章停用
api.sealInfoDisable = params => {
  return request({
    method: 'GET',
    url: `/sealInfo/disable/${params}`
  })
}
// 印章启用
api.sealInfoEnable = params => {
  return request({
    method: 'GET',
    url: `/sealInfo/enable/${params}`
  })
}
// 印章解绑
api.sealInfoUnbind = params => {
  return request({
    method: 'GET',
    url: '/sealInfo/unbind',
    params
  })
}
// 印章销毁
api.sealInfoDestroy = params => {
  return request({
    method: 'GET',
    url: `/sealInfo/destroy/${params}`
  })
}
// 印章变更
api.sealInfoChange = data => {
  return request({
    method: 'POST',
    url: '/sealInfo/change',
    data
  })
}
// 印章详情
api.sealDetailInfo = params => {
  return request({
    method: 'GET',
    url: '/sealInfo/info',
    params
  })
}
// 印章还原
api.sealRollback = params => {
  return request({
    method: 'GET',
    url: `/sealInfo/deleted/rollback/${params}`
  })
}
// 印章基本信息
api.sealInfo = sealId => {
  console.log(sealId)
  return request({
    method: 'GET',
    url: `/sealInfo/${sealId}`
  })
}
// 印章类型列表
api.list = params => {
  return request({
    method: 'GET',
    url: '/sealType/list',
    params
  })
}
// 印章保管记录
api.sealInfoKeepList = params => {
  return request({
    method: 'GET',
    url: '/sealInfo/keep/list',
    params
  })
}
// 印章编码
api.sealInfoBizNo = () => {
  return request({
    method: 'GET',
    url: '/sealInfo/bizNo'
  })
}
// 查询印章可见范围
api.sealInfoVisible = params => {
  return request({
    method: 'GET',
    url: `/sealInfo/visible/${params}`
  })
}
// 保存印章可见范围
api.saveSealInfoVisible = data => {
  return request({
    method: 'POST',
    url: `/sealInfo/visible/`,
    data
  })
}
// 批量保存印章可见范围
api.batchSaveSealInfoVisible = data => {
  return request({
    method: 'POST',
    url: `/sealInfo/visible/batch`,
    data
  })
}
// 查询印章可用范围
api.sealInfoUsable = params => {
  return request({
    method: 'GET',
    url: `/sealInfo/usable/${params}`
  })
}
// 保存印章可用范围
api.saveSealInfoUsable = data => {
  return request({
    method: 'POST',
    url: `/sealInfo/usable/`,
    data
  })
}
// 批量保存印章可用范围
api.batchSaveSealInfoUsable = data => {
  return request({
    method: 'POST',
    url: `/sealInfo/usable/batch`,
    data
  })
}
export default api
