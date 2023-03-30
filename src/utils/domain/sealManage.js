// 印章分页-searchInfo1
export class FeatchSealInfo {
  current = 1
  size = 10
  sorts = ''
  searchKey = ''
  createDate = ''
  sealTypeIds = ''
  keepUserIds = ''
  keepOrganIds = ''
  sealStatus = 0
  sealCategory = ''
  onlyMyself = '' // 本人保管印章
  takeOut = '' // 外带印章
}

// 印章类型-searchInfo1
export class FeatchSealTypeInfo {
  current = 1
  size = 100
  sorts = ''
  searchKey = ''
  createDate = ''
}

// 文件上传返回值
export class ResUploadFile {
  fileId = ''
  fileSizeByte = ''
  fileObjectNameThumb = null
  fileOriginName = '说明.docx'
  fileUrl = ''
}
