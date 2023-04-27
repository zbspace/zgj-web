// 自定义formData结构 可用于表单重置
export const customFormData = {
  sealName: [
    {
      seal: '',
      sealId: '',
      applySealNum: '',
      limitNum: 0,
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
  fileTypeId: '',
  fileTypeName: ''
}
