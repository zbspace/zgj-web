import request from '@/utils/request'
// 组织人员选择

let api = {}
// 系统后台 - 部门与员工（权限管理）
// api.getRoleSubOrganInfoList = data => {
//   return request({
//     method: 'POST',
//     url: '/role/getRoleSubOrganInfoList',
//     data
//   })
// }

api = {
  publicTypeApi: {
    organ: data => {
      return request({
        method: 'POST',
        url: '/common/getRoleOrganUserSelectInfoList',
        data: data ? Object.assign(data, { type: 'organ' }) : { type: 'organ' }
      })
    },
    user: data => {
      return request({
        method: 'POST',
        url: '/common/getRoleOrganUserSelectInfoList',
        data: data ? Object.assign(data, { type: 'user' }) : { type: 'user' }
      })
    },
    role: data => {
      return request({
        method: 'POST',
        url: '/common/getRoleOrganUserSelectInfoList',
        data: data ? Object.assign(data, { type: 'role' }) : { type: 'role' }
      })
    },
    search: data => {
      return request({
        method: 'POST',
        url: '/common/queryRoleOrganUserSelectInfoList',
        data
      })
    }
  },
  // 系统后台 - 部门与员工（权限管理）
  systemOrganOrPerson: {
    selected: id => {
      return request({
        method: 'GET',
        url: `/role/getRoleRelationInfo/${id}`
      })
    },
    save: data => {
      return request({
        method: 'POST',
        url: '/role/updateRoleRelationInfo',
        data
      })
    },
    key: 'id'
  }
}
export default api
