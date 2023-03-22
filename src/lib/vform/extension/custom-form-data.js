// 自定义formData结构 可用于表单重置
export const customFormData = {
  sealName: [
    {
      seal: '',
      sealId: '',
      applySealNum: '',
      sealRequiredTextShow: false,
      routineSealRequiredTextShow: false
    }
  ],
  contactUnit: {
    unitIds: '',
    unitNames: ''
  },
  usesealBesides: {
    extSeal: true,
    besidesTime: [],
    provinceId: [],
    detailAddress: ''
  },
  normalSealNum: '',
  remoteSeal: false,
  videoSeal: false,
  sealFile: {
    fileList: [],
    fileList1: []
  },
  applicantInfo: {
    applyUserId: '',
    applyOrganId: '',
    applyOrganName: ''
  },
  limitTimeSeal: {
    timeLimit: false,
    sealTime: []
  },
  fileType: ''
}

export class FormData {
  sealUseTypeId = '1' // 用印类型
  useSealFileName = '2' // 文件名称
  fileTypeId = '122' // 文件类型
  totalMoney = '122' // 涉及金额
  moneyTypeId = '1' // 币种
  useSealFileNum = '10' // 文件分数
  useSealInfo = '' // 申请事由
  relatedCompanyId = '1' // 往来单位
  extSeal = '1' // 是否外带
  extBenginDt = '1' // 外带开始时间
  extEndDt = '1' // 外带结束时间
  provinceId = '1,2,3' // 省市区id
  applyOrganId = '' // 申请部门id
  applyUserId = '' // 申请人id
  applyDatetime = '' // 申请时间
  // 远程盖章
  // 用印文件
  // "sealFile": {
  //   "fileList": [
  //     {
  //       "name": "2022考核目标填报规则.pdf",
  //       "url": "https://www.zhangin.com/uploadfiles/2021/12/20211228175648062.jpg",
  //       "uid": 1679393749986,
  //       "status": "success"
  //     }
  //   ],
  //   "fileList1": []
  // }
  useSealApplySeal = [
    // 申请印章列表
    {
      sealId: '', // 印章id
      markSeal: false, // 骑缝盖章
      applySealNum: '20' // 申请盖章数
    }
  ]
}
