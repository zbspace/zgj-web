import request from '@/utils/request'

// 文件类型选择
const api = {}
api.treeList = params => {
  return request({
    method: 'POST',
    url: '/fileType/queryList',
    params
  })
}
export default api
