// api 全局配置
import request from '@/utils/request'
// 印章类型管理

const api = {}
// 印章类型分页列表
api.page = params => {
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
api.delete = params => {
  return request({
    method: 'GET',
    url: '/sealInfo/delete',
    params
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
export default api
