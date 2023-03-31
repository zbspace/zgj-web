export const business = [
  {
    name: '首页',
    label: 't-zgj-cg-menu-shouye',
    to: '/frontDesk/home',
    icon: '#shouye-73o018d8',
    must: true
  },
  {
    name: '印控管理',
    type: 'part',
    label: 't-zgj-cg-menu-yinkong-guanli'
  },

  {
    name: '用印管理',
    label: 't-zgj-cg-menu-yongyin-guanli',
    to: '/frontDesk/printControlManage/useSealManage',
    icon: '#yongyinguanli-73o018b7',
    children: [
      {
        name: '用印申请',
        to: '/frontDesk/printControlManage/useSealManage/selectionForm',
        label: 't-zgj-cg-menu-yongyin-shenqing'
      },
      {
        name: '智能用印',
        to: '/frontDesk/printControlManage/useSealManage/intelligentPrinting',
        label: 't-zgj-cg-menu-zhineng-yongyin'
      },
      {
        name: '文件归档',
        to: '/frontDesk/printControlManage/useSealManage/archive',
        label: 't-zgj-cg-menu-wenjian-guidang'
      },
      {
        name: '用印记录',
        to: '/frontDesk/printControlManage/useSealManage/recordWithSeal',
        label: 't-zgj-cg-menu-yongyin-jilu'
      },
      {
        name: '用印轨迹',
        to: '/frontDesk/printControlManage/useSealManage/printedTrack',
        label: 't-zgj-cg-menu-yongyin-guiji'
      }
    ]
  },
  {
    name: '文件防篡改',
    label: 't-zgj-cg-menu-wenjian-fangchuangai',
    to: '/frontDesk/printControlManage/fileTamperProof',
    icon: '#wenjianheyan-73o018dm',
    children: [
      {
        name: '防伪水印核验',
        to: '/frontDesk/printControlManage/fileTamperProof/securityWatermark',
        label: 't-zgj-cg-menu-fangwei-shuiyin-yanzheng'
      },
      {
        name: '文件内容核验',
        label: 't-zgj-cg-menu-wenjian-neirong-heyan',
        to: '/frontDesk/printControlManage/fileTamperProof/fileContentVerification',
        children: [
          {
            name: '用印前核验',
            to: '/frontDesk/printControlManage/fileTamperProof/fileContentVerification/usePrepressVerification',
            label: 't-zgj-cg-menu-yongyin-qian-heyan'
          },
          {
            name: '用印后核验',
            to: '/frontDesk/printControlManage/fileTamperProof/fileContentVerification/usePostPressVerification',
            label: 't-zgj-cg-menu-yongyin-hou-heyan'
          }
        ]
      }
    ]
  },

  {
    name: '印章管理',
    label: 't-zgj-cg-menu-yinzhang-guanli',
    to: '/frontDesk/printControlManage/sealManage',
    icon: '#yinzhangguanli-73o018do',
    children: [
      {
        name: '印章库',
        to: '/frontDesk/printControlManage/sealManage/libraryOfSeals',
        label: 't-zgj-cg-menu-yinzhang-ku'
      },
      {
        name: '印章申请',
        to: '/frontDesk/printControlManage/sealManage/applicationForSeal',
        label: 't-zgj-cg-menu-yinzhang-shenqing'
      },
      {
        name: '印章外借信息',
        to: '/frontDesk/printControlManage/sealManage/sealloanInformation',
        label: 't-zgj-cg-menu-yinzhang-waijie-xinxi'
      },
      {
        name: '印章类型',
        to: '/frontDesk/printControlManage/sealManage/typeOfSeal',
        label: 't-zgj-cg-menu-yinzhang-leixing'
      }
    ]
  },

  {
    name: '电子签章',
    label: 't-zgj-cg-menu-dianzi-qianzhang',
    to: '/frontDesk/printControlManage/electronicSeal',
    icon: '#dianziqianzhang',
    children: [
      {
        name: '电子签章申请',
        to: '/frontDesk/printControlManage/electronicSeal/eSelectionForm',
        label: 't-zgj-cg-menu-dianzi-qianzhang-shenqing'
      },
      {
        name: '电子签章',
        to: '/frontDesk/printControlManage/electronicSeal/electronicSignatureRequired',
        label: 't-zgj-cg-menu-dai-dianzi-qianzhang'
      },
      {
        name: '电子印章库',
        to: '/frontDesk/printControlManage/electronicSeal/electronicSealLibrary',
        label: 't-zgj-cg-menu-dianzi-yinzhang-ku'
      },
      {
        name: '电子签章记录',
        to: '/frontDesk/printControlManage/electronicSeal/electronicSignatureRecord',
        label: 't-zgj-cg-menu-dianzi-qianzhang-jilu'
      },
      {
        name: '用户认证',
        to: '/frontDesk/printControlManage/electronicSeal/userAuthentication',
        label: 't-zgj-cg-menu-yonghu-renzheng'
      }
    ]
  },

  {
    name: '设备管理',
    label: 't-zgj-cg-menu-shebei-guanli',
    to: '/frontDesk/printControlManage/equipmentManage',
    icon: '#shebeiguanli',
    children: [
      {
        name: '工作台管理',
        label: 't-zgj-cg-menu-gongzuotai-guanli',
        to: '/frontDesk/printControlManage/equipmentManage/workbenchManagement'
      },
      {
        name: '智能印章盒管理',
        label: 't-zgj-cg-menu-zhineng-yinzhang-he-guanli',
        to: '/frontDesk/printControlManage/intelligentSealBoxManagement',
        children: [
          {
            name: '印章盒管理',
            to: '/frontDesk/printControlManage/equipmentManage/intelligentSealBoxManagement',
            label: 't-zgj-cg-menu-zhineng-yinzhang-he-guanli'
          },
          {
            name: '格口管理',
            to: '/frontDesk/printControlManage/equipmentManage/intelligentSealBoxManagement/sealBoxGrid',
            label: 't-zgj-cg-menu-zhineng-yinzhang-he-gekou-guanli'
          }
        ]
      },

      {
        name: '智能印章柜管理',
        to: '/frontDesk/printControlManage/equipmentManage/intelligentSealCabinetManagement',
        label: 't-zgj-cg-menu-zhineng-yinzhang-gui-guanli',
        children: [
          {
            name: '印章柜管理',
            to: '/frontDesk/printControlManage/equipmentManage/intelligentSealCabinetManagement',
            label: 't-zgj-cg-menu-zhineng-yinzhang-gui-guanli'
          },
          {
            name: '格口管理',
            to: '/frontDesk/printControlManage/equipmentManage/intelligentSealCabinetManagement/cabinetGrid',
            label: 't-zgj-cg-menu-zhineng-yinzhang-gui-gekou-guanli'
          }
        ]
      }
    ]
  },

  {
    name: '文件管理',
    type: 'part',
    label: 't-zgj-cg-menu-wenjian-guanli'
  },
  {
    name: '文件库',
    label: 't-zgj-cg-menu-wenjian-ku',
    to: '/frontDesk/fileManagement/documentLibrary',
    icon: '#wenjianku-73o018d4'
  },
  {
    name: '文件类型',
    label: 't-zgj-cg-menu-wenjian-leixing',
    to: '/frontDesk/fileManagement/documentType',
    icon: '#wenjianleixing-73o018dp'
  },

  {
    name: '风控预警',
    label: 't-zgj-cg-menu-fengkong-yujing',
    type: 'part'
  },
  {
    name: '风控提醒设置',
    label: 't-zgj-cg-menu-fengkong-tixing-shezhi',
    to: '/frontDesk/riskControlWarning/riskAlertSetting',
    icon: '#fengxiantixingshezhi-73o018ap'
  },
  {
    name: '风险提醒记录',
    label: 't-zgj-cg-menu-fengxian-tixing-jilu',
    to: '/frontDesk/riskControlWarning/riskAlertRecord',
    icon: '#fengxiantixingjilu-73o018do',
    children: [
      {
        name: '用印告警提醒',
        to: '/frontDesk/riskControlWarning/riskAlertRecord/useAPrintedAlarmReminder',
        label: 't-zgj-cg-menu-yongyin-gaojing-tixing'
      },
      {
        name: '流程规范告警提醒',
        to: '/frontDesk/riskControlWarning/riskAlertRecord/processSpecificationAlarmNotification',
        label: 't-zgj-cg-menu-liucheng-guifan-gaojing-tixing'
      },
      {
        name: '领用印章告警提醒',
        to: '/frontDesk/riskControlWarning/riskAlertRecord/receiveSealAlarmReminder',
        label: 't-zgj-cg-menu-lingyong-yinzhang-gaojing-tixing'
      }
    ]
  },

  {
    name: '流程审批',
    label: 't-zgj-cg-menu-liucheng-shenpi',
    type: 'part'
  },
  {
    name: '实时确认',
    label: 't-zgj-cg-menu-shishi-queren',
    to: '/frontDesk/processApprove/realTimeConfirmation',
    icon: '#zidingyiduijiepeizhi'
  },
  {
    name: '审批流程',
    label: 't-zgj-cg-menu-shenpi-liucheng',
    to: '/frontDesk/processApprove/approvalFlow',
    icon: '#daishenpiliucheng'
  },
  {
    name: '处理任务',
    label: 't-zgj-cg-menu-chuli-renwu',
    to: '/frontDesk/processApprove/handleTask',
    icon: '#daichulirenwu'
  },
  {
    name: '抄送给我',
    label: 't-zgj-cg-menu-caoshong-geiwo',
    to: '/frontDesk/processApprove/carbonCopyToMe',
    icon: '#chaosonggeiwodeliucheng'
  }
]

export const businessAside = [
  {
    name: '首页',
    icon: '#liuchengguanli',
    route: '/frontDesk/home',
    to: '/frontDesk/home',
    label: 't-zgj-cg-menu-shouye',
    must: true
  },
  {
    name: '印控管理',
    icon: '#liuchengguanli',
    route: '/frontDesk/printControlManage',
    to: '/frontDesk/printControlManage/useSealManage/selectionForm',
    label: 't-zgj-cg-menu-yinkong-guanli'
  },
  {
    name: '文件管理',
    icon: '#liuchengguanli',
    route: '/frontDesk/fileManagement',
    to: '/frontDesk/fileManagement/documentLibrary',
    label: 't-zgj-cg-menu-wenjian-guanli'
  },
  {
    name: '风控预警',
    icon: '#liuchengguanli',
    route: '/frontDesk/riskControlWarning',
    to: '/frontDesk/riskControlWarning/riskAlertSetting',
    label: 't-zgj-cg-menu-fengkong-yujing'
  },
  {
    name: '流程审批',
    icon: '#liuchengguanli',
    route: '/frontDesk/processApprove',
    to: '/frontDesk/processApprove/realTimeConfirmation',
    label: 't-zgj-cg-menu-liucheng-shenpi'
  }
]
