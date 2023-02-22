// api 全局配置
import request from '@/utils/request'
// 用印申请

const api = {}
// 流程列表
api.add = data => {
  return request({
    method: 'POST',
    url: '/form/add',
    data
  })
}
export default api
