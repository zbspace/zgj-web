// import icon1 from '@/assets/svg/shouye-1.svg'
// import icon2 from '@/assets/svg/yongyin-guanli-1.svg'
// import icon3 from '@/assets/svg/yinzhang-guanli-1.svg'
// import icon4 from '@/assets/svg/yinzhang-guanli-2.svg'
// import icon5 from '@/assets/svg/dianzi-qianzhang.svg'
// import icon6 from '@/assets/svg/shebei-guanli.svg'
// import icon7 from '@/assets/svg/wenjianku-1.svg'
// import icon8 from '@/assets/svg/wenjian-leixing-1.svg'
// import icon9 from '@/assets/svg/liuchengshenpi-ssqr.svg'
// import icon10 from '@/assets/svg/dai-shenpi-liucheng.svg'
// import icon11 from '@/assets/svg/dai-chuli-renwu.svg'
// import icon12 from '@/assets/svg/chaosong-geiwode-liucheng.svg'
// import icon13 from '@/assets/svg/fengxian-tixing-jilu-1.svg'
// import icon14 from '@/assets/svg/fengxian-tixing-jilu-2.svg'
export const business = [
  {
    name: '首页',
    label: 't-zgj-cg-menu-shouye',
    to: '/frontDesk/home',
    // icon: icon1
    icon: '#shouye-73o018d8'
  },
  {
    name: '印控管理',
    type: 'part',
    label: 't-zgj-cg-menu-yinkong-guanli'
  },
  {
    name: '用印管理',
    label: 't-zgj-cg-menu-yongyin-guanli',
    to: '/frontDesk/PrintControlManagement',
    // icon: icon2,
    icon: '#yongyinguanli-73o018b7',
    children: [
      {
        name: '用印申请',
        to: '/frontDesk/PrintControlManagement/SealApplication',
        label: 't-zgj-cg-menu-yongyin-shenqing'
      },
      {
        name: '用印申请',
        to: '/frontDesk/PrintControlManagement/Seal-application/Selection-form',
        label: 't-zgj-cg-menu-yongyin-shenqing'
      },
      {
        name: '智能用印',
        to: '/frontDesk/PrintControlManagement/IntelligentPrinting',
        label: 't-zgj-cg-menu-zhineng-yongyin'
      },
      {
        name: '文件归档',
        to: '/frontDesk/PrintControlManagement/Archive',
        label: 't-zgj-cg-menu-wenjian-guidang'
      },
      {
        name: '用印记录',
        to: '/frontDesk/PrintControlManagement/recordWithSeal',
        label: 't-zgj-cg-menu-yongyin-jilu'
      },
      {
        name: '用印轨迹',
        to: '/frontDesk/PrintControlManagement/Printed-track',
        label: 't-zgj-cg-menu-yongyin-guiji'
      }
    ]
  },
  {
    name: '印章管理',
    label: 't-zgj-cg-menu-yinzhang-guanli',
    to: '/frontDesk/PrintControlManagement',
    // icon: icon3,
    icon: '#yinzhangguanli-73o018do',
    children: [
      {
        name: '印章库',
        to: '/frontDesk/PrintControlManagement/LibraryOfSeals',
        label: 't-zgj-cg-menu-yinzhang-ku'
      },
      {
        name: '印章申请',
        to: '/frontDesk/PrintControlManagement/ApplicationForSeal',
        label: 't-zgj-cg-menu-yinzhang-shenqing'
      },
      {
        name: '印章类型',
        to: '/frontDesk/PrintControlManagement/TypeOfSeal',
        label: 't-zgj-cg-menu-yinzhang-leixing'
      },
      {
        name: '印章外借信息',
        to: '/frontDesk/PrintControlManagement/SealloanInformation',
        label: 't-zgj-cg-menu-yinzhang-waijie-xinxi'
      }
    ]
  },
  {
    name: '文件防篡改',
    label: 't-zgj-cg-menu-wenjian-fangchuangai',
    to: '/frontDesk/PrintControlManagement',
    // icon: icon4,
    icon: '#wenjianheyan-73o018dm',
    children: [
      {
        name: '防伪水印验证',
        to: '/frontDesk/PrintControlManagement/SecurityWatermark',
        label: 't-zgj-cg-menu-fangwei-shuiyin-yanzheng'
      },
      {
        name: '文件内容核验',
        label: 't-zgj-cg-menu-wenjian-neirong-heyan',
        to: '/frontDesk/home',
        children: [
          {
            name: '用印前核验',
            to: '/frontDesk/PrintControlManagement/UsePrepressVerification',
            label: 't-zgj-cg-menu-yongyin-qian-heyan'
          },
          {
            name: '用印后核验',
            to: '/frontDesk/PrintControlManagement/UsePostPressVerification',
            label: 't-zgj-cg-menu-yongyin-hou-heyan'
          }
        ]
      }
    ]
  },
  {
    name: '电子签章',
    label: 't-zgj-cg-menu-dianzi-qianzhang',
    to: '/frontDesk/PrintControlManagement',
    // icon: icon5,
    icon: '#dianziqianzhang',
    children: [
      {
        name: '电子签章申请',
        to: '/frontDesk/PrintControlManagement/electronic-seal-apply/Selection-form',
        label: 't-zgj-cg-menu-dianzi-qianzhang-shenqing'
      },
      {
        name: '待电子签章',
        to: '/frontDesk/PrintControlManagement/ElectronicSignatureRequired',
        label: 't-zgj-cg-menu-dai-dianzi-qianzhang'
      },
      {
        name: '电子签章记录',
        to: '/frontDesk/PrintControlManagement/electronicSignatureRecord',
        label: 't-zgj-cg-menu-dianzi-qianzhang-jilu'
      },
      {
        name: '电子印章库',
        to: '/frontDesk/PrintControlManagement/ElectronicSealLibrary',
        label: 't-zgj-cg-menu-dianzi-yinzhang-ku'
      },
      {
        name: '用户认证',
        to: '/frontDesk/home',
        label: 't-zgj-cg-menu-yonghu-renzheng'
      }
    ]
  },
  {
    name: '设备管理',
    label: 't-zgj-cg-menu-shebei-guanli',
    to: '/frontDesk/PrintControlManagement',
    // icon: icon6,
    icon: '#shebeiguanli',
    children: [
      {
        name: '工作台管理',
        label: 't-zgj-cg-menu-gongzuotai-guanli',
        to: '/frontDesk/PrintControlManagement/WorkbenchManagement'
      },
      {
        name: '智能印章盒管理',
        label: 't-zgj-cg-menu-zhineng-yinzhang-he-guanli',
        to: '/frontDesk/PrintControlManagement',
        children: [
          {
            name: '智能印章盒管理',
            to: '/frontDesk/PrintControlManagement/IntelligentSealBoxManagement',
            label: 't-zgj-cg-menu-zhineng-yinzhang-he-guanli'
          },
          {
            name: '智能印章盒格口管理',
            to: '/frontDesk/home',
            label: 't-zgj-cg-menu-zhineng-yinzhang-he-gekou-guanli'
          }
        ]
      },
      {
        name: '智能印章柜管理',
        to: '/frontDesk/home',
        label: 't-zgj-cg-menu-zhineng-yinzhang-gui-guanli',
        children: [
          {
            name: '智能印章柜管理',
            to: '/frontDesk/PrintControlManagement/IntelligentSealCabinetManagement',
            label: 't-zgj-cg-menu-zhineng-yinzhang-gui-guanli'
          },
          {
            name: '智能印章柜格口管理',
            to: '/frontDesk/home',
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
    // icon: icon7
    icon: '#wenjianku-73o018d4'
  },
  {
    name: '文件类型',
    label: 't-zgj-cg-menu-wenjian-leixing',
    to: '/frontDesk/fileManagement/documentType',
    // icon: icon8
    icon: '#wenjianleixing-73o018dp'
  },

  {
    name: '流程审批',
    label: 't-zgj-cg-menu-liucheng-shenpi',
    type: 'part'
  },

  {
    name: '实时确认',
    label: 't-zgj-cg-menu-shishi-queren',
    to: '/frontDesk/approvalFlow/RealTimeConfirmation',
    // icon: icon9
    icon: '#zidingyiduijiepeizhi'
  },
  {
    name: '审批流程',
    label: 't-zgj-cg-menu-shenpi-liucheng',
    to: '/frontDesk/approvalFlow/approvalFlow',
    // icon: icon10
    icon: '#daishenpiliucheng'
  },
  {
    name: '处理任务',
    label: 't-zgj-cg-menu-chuli-renwu',
    to: '/frontDesk/approvalFlow/handleTask',
    // icon: icon11
    icon: '#daichulirenwu'
  },
  {
    name: '抄送给我',
    label: 't-zgj-cg-menu-caoshong-geiwo',
    to: '/frontDesk/approvalFlow/carbonCopyToMe',
    // icon: icon12
    icon: '#chaosonggeiwodeliucheng'
  },
  {
    name: '风控预警',
    label: 't-zgj-cg-menu-fengkong-yujing',
    type: 'part'
  },
  {
    name: '风控提醒设置',
    label: 't-zgj-cg-menu-fengkong-tixing-shezhi',
    to: '/frontDesk/riskControlWarning/RiskAlertSetting',
    // icon: icon14
    icon: '#fengxiantixingshezhi-73o018ap'
  },
  {
    name: '风险提醒记录',
    label: 't-zgj-cg-menu-fengxian-tixing-jilu',
    to: '/frontDesk/home',
    // icon: icon13,
    icon: '#fengxiantixingjilu-73o018do',
    children: [
      {
        name: '用印告警提醒',
        to: '/frontDesk/riskControlWarning/UseAPrintedAlarmReminder',
        label: 't-zgj-cg-menu-yongyin-gaojing-tixing'
      },
      {
        name: '领用印章告警提醒',
        to: '/frontDesk/riskControlWarning/ReceiveSealAlarmReminder',
        label: 't-zgj-cg-menu-lingyong-yinzhang-gaojing-tixing'
      },
      {
        name: '流程规范告警提醒',
        to: '/frontDesk/riskControlWarning/ProcessSpecificationAlarmNotification',
        label: 't-zgj-cg-menu-liucheng-guifan-gaojing-tixing'
      }
    ]
  }
]
