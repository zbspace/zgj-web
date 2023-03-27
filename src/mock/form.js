const formPage = {
  code: 200,
  msg: null,
  data: [
    {
      formMessageId: '1',
      formName: 'XXX文件类1',
      applyTypeName: '用印申请',
      sealUseTypeName: '电子签章',
      relationFlow: '是',
      createUserName: '管理员',
      modifyDatetime: '2023-02-14 12:00:05'
    },
    {
      formMessageId: '2',
      formName: 'XXX文件类2',
      applyTypeName: '转办申请',
      sealUseTypeName: '物理用印',
      relationFlow: '是',
      createUserName: '管理员',
      modifyDatetime: '2023-02-14 12:00:05'
    },
    {
      formMessageId: '3',
      formName: 'XXX文件类3',
      applyTypeName: '重置用印申请',
      sealUseTypeName: '物理用印',
      relationFlow: '是',
      createUserName: '管理员',
      modifyDatetime: '2023-02-14 12:00:05'
    },
    {
      formMessageId: '4',
      formName: 'XXX文件类4',
      applyTypeName: '用印申请',
      sealUseTypeName: '物理用印',
      relationFlow: '是',
      createUserName: '管理员',
      modifyDatetime: '2023-02-14 12:00:05'
    },
    {
      formMessageId: '5',
      formName: 'XXX文件类5',
      applyTypeName: '刻章申请',
      sealUseTypeName: '物理用印',
      relationFlow: '是',
      createUserName: '管理员',
      modifyDatetime: '2023-02-14 12:00:05'
    },
    {
      formMessageId: '6',
      formName: 'XXX文件类6',
      applyTypeName: '停用申请',
      sealUseTypeName: '电子签章',
      relationFlow: '是',
      createUserName: '管理员',
      modifyDatetime: '2023-02-14 12:00:05'
    },
    {
      formMessageId: '7',
      formName: 'XXX文件类7',
      applyTypeName: '用印申请',
      sealUseTypeName: '物理用印',
      relationFlow: '是',
      createUserName: '管理员',
      modifyDatetime: '2023-02-14 12:00:05'
    },
    {
      formMessageId: '8',
      formName: 'XXX文件类8',
      applyTypeName: '用印申请',
      sealUseTypeName: '物理用印',
      relationFlow: '是',
      createUserName: '管理员',
      modifyDatetime: '2023-02-14 12:00:05'
    },

    {
      formMessageId: '9',
      formName: 'XXX文件类9',
      applyTypeName: '用印申请',
      sealUseTypeName: '物理用印',
      relationFlow: '是',
      createUserName: '管理员',
      modifyDatetime: '2023-02-14 12:00:05'
    },
    {
      formMessageId: '10',
      formName: 'XXX文件类10',
      applyTypeName: '用印申请',
      sealUseTypeName: '物理用印',
      relationFlow: '是',
      createUserName: '管理员',
      modifyDatetime: '2023-02-14 12:00:05'
    },
    {
      formMessageId: '11',
      formName: 'XXX文件类11',
      applyTypeName: '用印申请',
      sealUseTypeName: '物理用印',
      relationFlow: '是',
      createUserName: '管理员',
      modifyDatetime: '2023-02-14 12:00:05'
    },
    {
      formMessageId: '12',
      formName: 'XXX文件类12',
      applyTypeName: '用印申请',
      sealUseTypeName: '物理用印',
      relationFlow: '是',
      createUserName: '管理员',
      modifyDatetime: '2023-02-14 12:00:05'
    },
    {
      formMessageId: '13',
      formName: 'XXX文件类13',
      applyTypeName: '用印申请',
      sealUseTypeName: '物理用印',
      relationFlow: '是',
      createUserName: '管理员',
      modifyDatetime: '2023-02-14 12:00:05'
    },

    {
      formMessageId: '14',
      formName: 'XXX文件类14',
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
  // 'get|/api/form/page': formPage,
  // 'get|/api/form/listApplyTypeTree': listApplyTypeTree
}
