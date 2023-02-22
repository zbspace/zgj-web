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

export default {
  'get|/form/page': formPage,
  '/form/list': formPage
}
