const formPage = {
  code: 200,
  msg: null,
  data: [
    {
      formMessageId: '1',
      formName: 'XXX文件类',
      applyTypeName: '用印申请',
      sealUseTypeName: '物理用印',
      relationFlow: '是',
      createUserName: '管理员',
      modifyDatetime: '2023-02-14 12:00:05'
    }
  ]
}
const listApplyTypeTree = {
  code: 200,
  msg: null,
  data: [
    {
      applyTypeId: '1',
      applyTypeName: '用印申请',
      parent_id: ''
    },
    {
      applyTypeId: '1-1',
      applyTypeName: '用印申请',
      parent_id: '1'
    },
    {
      applyTypeId: '1-2',
      applyTypeName: '转办申请',
      parent_id: '1'
    },
    {
      applyTypeId: '1-3',
      applyTypeName: '重置用印申请',
      parent_id: '1'
    },
    {
      applyTypeId: '2',
      applyTypeName: '印章申请',
      parent_id: ''
    },
    {
      applyTypeId: '2-1',
      applyTypeName: '刻章申请',
      parent_id: '2'
    },
    {
      applyTypeId: '2-2',
      applyTypeName: '停用申请',
      parent_id: '2'
    }
  ]
}
export default {
  'get|/form/page': formPage,
  'get|/form/listApplyTypeTree': listApplyTypeTree
}
