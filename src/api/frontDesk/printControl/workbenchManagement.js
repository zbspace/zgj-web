// api 全局配置
import request from '@/utils/request'
// 工作台管理
const api = {}

// ================
// 工作台详情
api.detail = organId => {
  return request({
    method: 'GET',
    url: `/bench/info/${organId}`
  })
}

// 新增工作台
api.add = data => {
  return request({
    method: 'POST',
    url: '/bench/add',
    data
  })
}

// 编辑工作台
api.edit = data => {
  return request({
    method: 'POST',
    url: '/bench/edit',
    data
  })
}

// 批量删除工作台
api.delete = benchId => {
  return request({
    method: 'POST',
    url: `/bench/delete/${benchId}`
  })
}

export default api
