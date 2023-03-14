// 往来单位-searchInfo
export class FeatchRelatedCompanyListInfo {
  tenantId = '123456789' // 企业ID
  relatedCompanyName = '' // 企业编码/企业名称/联系人/联系方式
  organId = '' // 组织机构ID
  current = 1
  size = 10
}

// 往来单位-add
export class CompanyAddInfo {
  tenantId = '123456789'
  relatedCompanyName = ''
  organId = '123456'
  contactName = ''
  contactInformation = ''
  remark = ''
}
