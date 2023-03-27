// pid 顶级 -1
const page1 = () => {
  return new Promise(resolve => {
    resolve({
      code: 200,
      msg: null,
      data: [
        {
          id: '1',
          orderNumber: 3,
          tenantId: 10001,
          fileTypeNo: '213',
          fileTypeSn: '9898',
          fileDirectory: '1',
          ruleBusinessId: '787878787',
          name: '文件夹',
          pid: '-1',
          type: 'user'
        },
        {
          id: '2',
          orderNumber: 3,
          tenantId: 10001,
          fileTypeNo: '213',
          fileTypeSn: '9898',
          fileDirectory: '0',
          ruleBusinessId: '787878787',
          name: '其他类',
          pid: '-1',
          type: 'user'
        },
        {
          id: '3',
          orderNumber: 3,
          tenantId: 10001,
          fileTypeNo: '213',
          fileTypeSn: '9898',
          fileDirectory: '0',
          ruleBusinessId: '787878787',
          name: '证明类',
          pid: '-1',
          type: 'user'
        },
        {
          id: '4',
          orderNumber: 3,
          tenantId: 10001,
          fileTypeNo: '213',
          fileTypeSn: '9898',
          fileDirectory: '0',
          ruleBusinessId: '787878787',
          name: '财务相关类',
          pid: '-1',
          type: 'user'
        },
        {
          id: '5',
          orderNumber: 3,
          tenantId: 10001,
          fileTypeNo: '213',
          fileTypeSn: '9898',
          fileDirectory: '0',
          ruleBusinessId: '787878787',
          name: '投标相关类',
          pid: '-1', // 一级pid -1
          type: 'user'
        }
      ]
    })
  })
}
const page2 = () => {
  return new Promise(resolve => {
    resolve({
      code: 200,
      msg: null,
      data: [
        {
          id: '6',
          orderNumber: 3,
          tenantId: 10001,
          fileTypeNo: '213',
          fileTypeSn: '9898',
          fileDirectory: '0',
          ruleBusinessId: '787878787',
          name: '合同协议类',
          pid: '1',
          type: 'user'
        }
      ]
    })
  })
}
export default {
  'post|/api/fileType/treeList': page1,
  'post|/api/fileType/treeList/1': page2
}
