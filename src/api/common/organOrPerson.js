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
    // 获取 角色关联的数据权限信息
    selected: id => {
      return request({
        method: 'GET',
        url: `/role/getRoleRelationInfo/${id}`
      })
    },
    getRoleDataScopeEcho: id => {
      return request({
        method: 'GET',
        url: `/role/getRoleDataScopeEcho/${id}`
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
