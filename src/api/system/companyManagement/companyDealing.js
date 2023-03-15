// api 全局配置
import request from '@/utils/request'
// 往来企业
const api = {}

// ================
// 获取往来企业列表
// api.getRelatedCompanyList = data => {
//   return request({
//     method: 'GET',
//     url: `/tenant/relatedCompany/list?${
//       data.relatedCompanyName
//         ? 'relatedCompanyName=' + data.relatedCompanyName + '&'
//         : ''
//     }&organId=${data.organId || 0}&current=${data.current || 1}&size=${
//       data.size || 10
//     }`
//   })
// }
api.getRelatedCompanyList = data => {
  return request({
    method: 'GET',
    url: `/tenant/relatedCompany/list?${data}`
  })
}

// 新增往来企业
api.addRelatedCompany = data => {
  return request({
    method: 'POST',
    url: '/tenant/relatedCompany/add',
    data
  })
}

// 修改往来企业
api.updateRelatedCompany = data => {
  return request({
    method: 'POST',
    url: '/tenant/relatedCompany/update',
    data
  })
}

// 删除往来企业
api.deleteRelatedCompany = data => {
  return request({
    method: 'GET',
    url: '/tenant/relatedCompany/delete',
    data
  })
}

// 批量导入往来企业
api.batchImportRelatedCompany = data => {
  return request({
    method: 'GET',
    url: '/tenant/relatedCompany/batchImport',
    data
  })
}

// 查询往来单位详细
api.detailRelatedCompany = relatedCompanyId => {
  return request({
    method: 'GET',
    url: `/tenant/relatedCompany/detail/${relatedCompanyId}`
  })
}
export default api
