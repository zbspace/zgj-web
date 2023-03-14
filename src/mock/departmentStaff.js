const page = {
  code: 200,
  msg: '成功',
  data: {
    pageNo: 1,
    pageSize: 10,
    totalPage: 0,
    totalRows: 2,
    rows: [
      {
        userId: 'u01',
        userName: '章管家',
        accountNo: 'a001',
        hostOrganId: 'd01',
        hostOrganName: '建业科技',
        userTitle: '职位',
        faceState: 1,
        status: 1
      },
      {
        userId: 'u02',
        userName: '管理员',
        accountNo: 'a001',
        hostOrganId: 'd01',
        hostOrganName: '建业科技',
        userTitle: '职位',
        faceState: 1,
        status: 1
      }
    ]
  },
  success: true
}

export default {
  'get|/api/user/page': page
}
