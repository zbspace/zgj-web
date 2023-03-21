// 新增文件类型
export class AddFileTypeInfo {
  fileTypeNo = ''
  fileTypeName = ''
  fileTypeSn = ''
  fileTypePid = ''
}

export class GetFileTypeList {
  keyword = '' // keyword
  beginTime = ''
  endTime = ''
  fileTypeIds = []
  current = 1
  size = 10
}
