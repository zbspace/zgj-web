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
  // 系统后台 - 部门与员工（权限管理）
  systemOrganOrPerson: {
    organ: data => {
      return request({
        method: 'POST',
        url: '/role/getRoleSubOrganInfoList',
        data
      })
    },
    user: data => {
      return request({
        method: 'POST',
        url: '/role/getRoleSubOrganAndUserInfoList',
        data
      })
    },
    selected: id => {
      return request({
        method: 'GET',
        url: `/role/getRoleRelationInfo/${id}`
      })
    },
    key: 'roleId'
  }
}
export default api
