// api 全局配置
import request from '@/utils/request'
// 印章类型管理

const api = {}
// 印章类型列表
api.page = params => {
  return request({
    method: 'GET',
    url: '/sealType/page',
    params
  })
}
// 印章类型新增
api.add = data => {
  return request({
    method: 'POST',
    url: '/sealType/add',
    data
  })
}
// 印章类型编辑
api.edit = data => {
  return request({
    method: 'POST',
    url: '/sealType/edit',
    data
  })
}
// 印章类型删除
api.delete = params => {
  return request({
    method: 'GET',
    url: '/sealType/delete',
    params
  })
}
export default api
