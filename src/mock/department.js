const page = {
  code: 200,
  msg: '成功',
  data: {
    pageNo: 1,
    pageSize: 10,
    totalPage: 0,
    totalRows: 1,
    rows: [
      {
        organId: '部门ID',
        organNo: '部门编码',
        organName: '部门名称',
        organTypeNo: '组织类型编码',
        organType: '组织类型名称',
        number: 100,
        leaderUserId: 'u1',
        leaderUserName: '部门主管用户名',
        organPid: 'o1',
        organPName: '上级部门名称',
        level: 2,
        status: 0,
        readme: '备注'
      }
    ]
  },
  success: true
}

export default {
  'get|/api/organ/page': page
}
