// 自定义formData结构 可用于表单重置
export const customFormData = {
  sealName: [
    {
      seal: "",
      sealId: "",
      routineSeal: "",
      sealRequiredTextShow: false,
      routineSealRequiredTextShow: false,
    },
  ],
  contactUnit: {
    unitIds: "",
    unitNames: "",
  },
  usesealBesides: {
    isTrue: true,
    besidesTime: [],
    Add: [],
    detailAdd: "",
  },
  normalSealNum: "",
  remoteSeal: false,
  videoSeal: false,
  seamingSeal: false,
  sealFile: {
    fileList: [],
    fileList1: [],
  },
  applicantInfo: {
    applicant: "",
    department: '',
  },
  limitTimeSeal: {
    timeLimit: false,
    sealTime: [],
  },
  fileType:''
};
