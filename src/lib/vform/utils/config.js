export const VARIANT_FORM_VERSION = '3.1.7'

//export const MOCK_CASE_URL = 'https://www.fastmock.site/mock/2de212e0dc4b8e0885fea44ab9f2e1d0/vform/'
export const MOCK_CASE_URL = 'https://ks3-cn-beijing.ksyuncs.com/vform-static/vcase/'

//export const ACE_BASE_PATH = 'public/lib/ace/src-min-noconflict'
export const ACE_BASE_PATH = 'https://ks3-cn-beijing.ksyun.com/vform2021/ace-mini'

export const BEAUTIFIER_PATH= 'https://ks3-cn-beijing.ksyun.com/vform2021/js-beautify/1.14.0/beautifier.min.js'

export const TEST_API_URL = "http://zgjtest.gz2vip.91tunnel.com/";

// 印章外借历史记录
export const OUT_PAGE = {
	"code": 200,
	"msg": null,
	"data": {
		"current": 20,
		"size": 1,
		"pages": 2,
		"total": 2,
		"records": [{
			"sealId": null,
			"sealName": "总公司合同章",
			"sealTypeName": "合同章",
			"custodianDeptName": "行政部",
			"custodianName": "张三",
			"outUserName": "李四",
			"outDatetime": "2023-01-01 12:00:00",
			"outLocation": "上海市静安区协信广场"
		}, {
			"sealId": null,
			"sealName": "总公司合同章",
			"sealTypeName": "合同章",
			"custodianDeptName": "行政部",
			"custodianName": "张三",
			"outUserName": "王五",
			"outDatetime": "2023-05-01 16:00:00",
			"outLocation": "北京市王府井"
		}]
	},
	"success": true
}
// 查询往来单位列表
export const RELATED_COMPANY_LIST = {
	"code": 200,
	"msg": null,
	"data": {
		"current": 20,
		"size": 1,
		"pages": 6,
		"total": 6,
		"records": [{
			"tenantId": 1,
			"relatedCompanyId": "1",
			"relatedCompanyIds": null,
			"relatedCompanyNo": "001",
			"relatedCompanyName": "XX公司1",
			"organId": null,
			"organName": "研发部",
			"contactName": null,
			"readme": null,
			"contactInformation": null,
			"orderNumber": null
		}, {
			"tenantId": 2,
			"relatedCompanyId": "2",
			"relatedCompanyIds": null,
			"relatedCompanyNo": "002",
			"relatedCompanyName": "销售部",
			"organId": null,
			"organName": null,
			"contactName": null,
			"readme": null,
			"contactInformation": null,
			"orderNumber": null
		}, {
			"tenantId": 3,
			"relatedCompanyId": "3",
			"relatedCompanyIds": null,
			"relatedCompanyNo": "003",
			"relatedCompanyName": "XX公司3",
			"organId": null,
			"organName": "行政部",
			"contactName": null,
			"readme": null,
			"contactInformation": null,
			"orderNumber": null
		}, {
			"tenantId": 4,
			"relatedCompanyId": "4",
			"relatedCompanyIds": null,
			"relatedCompanyNo": "004",
			"relatedCompanyName": "XX公司4",
			"organId": null,
			"organName": "人事部",
			"contactName": null,
			"readme": null,
			"contactInformation": null,
			"orderNumber": null
		}]
	},
	"success": true
}
// 文件类型列表
export const FILE_TYPE_LIST = {
	"code": 200,
	"msg": null,
	"data": [{
		"fileTypeId": "1",
		"fileTypeName": "合同协议类"
	}, {
		"fileTypeId": "2",
		"fileTypeName": "其他类"
	}, {
		"fileTypeId": "3",
		"fileTypeName": "证明类"
	}, {
		"fileTypeId": "4",
		"fileTypeName": "财务相关类"
	}, {
		"fileTypeId": "5",
		"fileTypeName": "投标相关类"
	}],
	"success": true
}
// 印章类型列表
export const SEAL_TYPE_LIST = {
	"code": 200,
	"msg": null,
	"data": [{
		"sealTypeId": "1",
		"sealTypeName": "公章"
	}, {
		"sealTypeId": "2",
		"sealTypeName": "合同章"
	}, {
		"sealTypeId": "3",
		"sealTypeName": "法人章"
	}, {
		"sealTypeId": "4",
		"sealTypeName": "财务章"
	}, {
		"sealTypeId": "5",
		"sealTypeName": "其他章"
	}],
	"success": true
}
// 印章分页
export const SEAL_LIST = {
	"code": 200,
	"msg": null,
	"data": {
		"current": 20,
		"size": 1,
		"pages": 6,
		"total": 6,
		"records": [{
			"sealId": "1",
			"sealName": "XX公司合同章",
			"custodianName": "张山"
		}, {
			"sealId": "2",
			"sealName": "XX公司合同章",
			"custodianName": "李四"
		}, {
			"sealId": "3",
			"sealName": "XX公司项目章",
			"custodianName": "王武"
		}, {
			"sealId": "4",
			"sealName": "XX公司分公司行政章",
			"custodianName": "赵亮"
		}, {
			"sealId": "5",
			"sealName": "XX公司法人章",
			"custodianName": "姜强"
		}, {
			"sealId": "6",
			"sealName": "XX公司行政章",
			"custodianName": "刘旺"
		}]
	},
	"success": true
}


