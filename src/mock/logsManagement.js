const systemOperation = {
  code: 200,
  msg: '成功',
  data: {
    pageNo: 1,
    pageSize: 10,
    total: 1,
    records: [
      {
        logOperationId: '001',
        accountId: 'hello',
        accountNo: '账号',
        organName: '组织机构名称',
        appVersion: '3.9.5',
        deviceType: '设备类型',
        requestId: '请求ID',
        userId: '用户ID',
        nickName: '用户昵称',
        userName: '用户名',
        name: '日志名称',
        ip: 'IP',
        area: '区域',
        operator: '运营商',
        path: '全路径',
        module: '模块名称',
        className: '类名',
        methodName: '方法名称',
        requestMethod: '请求方式，GET/POST',
        contentType: '内容类型',
        requestBody: true,
        param: '{"param":"请求参数"}',
        token: 'tokenMd5值',
        type: 1,
        success: true,
        code: 200,
        message: '响应结果消息',
        exceptionName: '异常类名称',
        exceptionMessage: '异常信息',
        browserName: '浏览器名称',
        browserVersion: '浏览器版本',
        engineName: '浏览器引擎名称',
        engineVersion: '浏览器引擎版本',
        osName: '系统名称',
        platformName: '平台名称',
        mobile: true,
        deviceName: '移动端设备名称',
        deviceModel: '移动端设备型号',
        remark: '备注',
        createTime: '2022-12-28 21:55:50',
        updateTime: '2022-12-28 21:55:50',
        organId: '组织机构ID',
        tenantId: 1
      }
    ]
  },
  error: false,
  success: true
}

export default {
  'get|/api/log/operation/page': systemOperation
}
