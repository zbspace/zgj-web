/**
 * 查询表单列表
 */
export class FetchFormListInfo {
  current = 1
  size = 10
  keyword = ''
  updateStartTime = ''
  updateEndTime = ''
  // "applyTypeId": "1",
  sealUseTypeId = ''
  relationFlow = ''
}

/**
 * 新增表单
 */
export class AddFormInfo {
  formName = ''
  applyTypeId = '2' // 业务类型id
  sealUseTypeId = '1' // 用印类型：物理用印、电子签章
  readme = '' // 表单json
  formInfo = ''
  formColumnInfos = [] // 表单键值对
}
