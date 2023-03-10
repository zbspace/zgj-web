// 印章分页-searchInfo
export class FeatchSealInfo {
  current = 1
  size = 10
  sorts = ''
  searchKey = ''
  createDate = ''
  sealTypeIds = ''
  keepUserIds = ''
  keepOrganIds = ''
  sealStatus = ''
  sealCategory = ''
  onlyMyself = '' // 本人保管印章
  takeOut = '' // 外带印章
}

// 印章类型-searchInfo
export class FeatchSealTypeInfo {
  current = 1
  size = 100
  sorts = ''
  searchKey = ''
  createDate = ''
}
