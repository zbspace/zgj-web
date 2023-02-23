const page = {
  code: 200,
  msg: null,
  data: [
    {
      processId: '1',
      processName: 'XX分公司审批流程',
      applyTypeName: '用印申请',
      fileTypeName: '合同类',
      sealUseTypeName: '物理用印',
      status: '启用',
      createUserName: '管理员',
      modifyDatetime: '2023-02-14 12:00:05'
    }
  ]
}

export default {
  'get|/api/flow/page': page
}
