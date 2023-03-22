// 新增文件类型
export class AddFileTypeInfo {
  fileTypeNo = ''
  fileTypeName = ''
  fileTypeSn = ''
  fileTypePid = ''
}

// 查询文件类型
export class GetFileTypeList {
  keyword = '' // keyword
  beginTime = ''
  endTime = ''
  fileTypeIds = []
  current = 1
  size = 10
}

// 设置可见范围
export class ViewRangSetInfo {
  fileTypeId = ''
  tenantId = 10001 // 租户id
  visibleOrganR = []
  visibleRoleR = []
  visibleUserR = []
}
