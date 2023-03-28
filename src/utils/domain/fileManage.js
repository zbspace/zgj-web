// 新增文件类型
export class AddFileTypeInfo {
  fileTypeNo = ''
  fileTypeName = ''
  fileTypeSn = ''
  fileTypePid = '-1' // 顶级为-1
}

// 查询文件类型
export class GetFileTypeList {
  // keyword = '' // keyword
  // beginTime = ''
  // endTime = ''
  fileTypeIds = []
  // current = 1
  // size = 10
}

// 设置可见范围
export class ViewRangSetInfo {
  fileTypeId = ''
  organs = []
  roles = []
  users = []
  // {
  //   "id": "test_e90a32796a32",
  //   "includeChild": false
  // }
}

// 特殊类型隐私配置
export class PrivacySetInfo {
  fileTypeId = ''
  applicantPreview = '' // 用印单据上传附件仅申请人能预览
  applicantDownload = '' // 用印单据上传附件仅申请人能下载
}
