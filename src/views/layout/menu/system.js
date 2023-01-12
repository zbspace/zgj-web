// import icon19 from '@/assets/svg/qiye-xinxi.svg'
// import icon20 from '@/assets/svg/wanglai-qiye.svg'
// import icon21 from '@/assets/svg/bumen-yu-yuangong.svg'
// import icon22 from '@/assets/svg/qxgl-icon.svg'
// import icon23 from '@/assets/svg/quanju-canshu-peizhi.svg'
// import icon25 from '@/assets/svg/zongduan-banben-guanli.svg'
// import icon26 from '@/assets/svg/biaodan-guanli.svg'
// import icon27 from '@/assets/svg/liucheng-guanli.svg'
// import icon28 from '@/assets/svg/yewu-guizhe-peizhi.svg'
// import icon29 from '@/assets/svg/xiaoxi-shijian.svg'
// import icon34 from '@/assets/svg/xiaoxi-muban.svg'
// import icon35 from '@/assets/svg/xiaoxi-qdpz.svg'
// import icon36 from '@/assets/svg/xiaoxi-xxrz.svg'
// import icon30 from '@/assets/svg/denglu-rizi.svg'
// import icon31 from '@/assets/svg/xitong-caozuo-rizhi.svg'
// import icon32 from '@/assets/svg/zongduan-caozuo-rizhi.svg'
// import icon33 from '@/assets/svg/gujian-shengji-rizhi.svg'
// import icon37 from '@/assets/svg/xitong-yunxing-rizhi.svg'
export const system = [
  {
    name: '概览',
    label: 't-zgj-cg-menu-shouye',
    to: '/system/home',
    icon: '#shouye-73o018d8'
  },
  {
    name: '企业管理',
    type: 'part',
    label: 't-zgj-cg-menu-qiye-guanli'
  },
  {
    name: '企业信息',
    label: 't-zgj-cg-menu-qiye-xinxi',
    to: '/system/companyManage/companyInfo',
    // icon: icon19
    icon: '#qiyexinxi'
  },
  {
    name: '更新license',
    label: 't-zgj-cg-menu-gengxin-license',
    to: '/system/companyManage/updateLicense',
    icon: '#Property1gengxinlicense'
  },
  {
    name: '往来企业',
    label: 't-zgj-cg-menu-wanglai-qiye',
    to: '/system/companyManage/companyDealing',
    // icon: icon20
    icon: '#wanglaiqiye'
  },
  {
    name: '部门与员工',
    label: 't-zgj-cg-menu-bumen-yu-yuangong',
    to: '/system/companyManage/departmentStaff',
    // icon: icon21,
    icon: '#bumenyuyuangong',
    children: [
      {
        name: '单位与部门管理',
        to: '/system/companyManage/departmentStaff/department',
        label: 't-zgj-cg-menu-danwei-yu-bumen-guanli'
      },
      {
        name: '员工管理',
        to: '/system/companyManage/departmentStaff/staff',
        label: 't-zgj-cg-menu-yuangong-guanli'
      },
      {
        name: '邀请审核',
        to: '/system/companyManage/departmentStaff/audit',
        label: 't-zgj-cg-menu-yaoqing-shenhe'
      },
      {
        name: '权限管理',
        label: 't-zgj-cg-menu-quanxian-guanli',
        to: '/system/companyManage/departmentStaff/permission',
        // icon: icon22,
        icon: '#cebiandaohanglan'
        // children: [
        //   {
        //     name: '角色权限配置',
        //     to: '/system/company/permission/role',
        //     label: 't-zgj-cg-menu-jueshe-quanxian-peizhi'
        //   },
        //   {
        //     name: '基础权限配置',
        //     to: '/system/company/permission/rule',
        //     label: 't-zgj-cg-menu-jichu-quanxian-peizhi'
        //   }
        // ]
      }
    ]
  },

  {
    name: '基础设置',
    type: 'part',
    label: 't-zgj-cg-menu-jichu-shezhi'
  },
  {
    name: '全局参数设置',
    label: 't-zgj-cg-menu-quanju-canshu-shezhi',
    to: '/system/baseSetting/globalParameter',
    // icon: icon23
    icon: '#quanjucanshushezhi'
  },
  {
    name: '固件版本管理',
    label: 't-zgj-cg-menu-gujian-banben-guanli',
    to: '/system/baseSetting/firmwareVersion',
    // icon: icon33
    icon: '#cebiandaohanglan1'
  },
  {
    name: '终端版本管理',
    label: 't-zgj-cg-menu-zongduan-banben-guanli',
    to: '/system/baseSetting/terminalVersion',
    // icon: icon25
    icon: '#zhongduanbanbenguanli'
  },
  {
    name: '业务管理',
    type: 'part',
    label: 't-zgj-cg-menu-yewu-guanli'
  },
  {
    name: '表单管理',
    label: 't-zgj-cg-menu-biaodan-guanli',
    to: '/system/businessManage/formManage',
    // icon: icon26
    icon: '#biaodan-guanli'
  },
  {
    name: '流程管理',
    label: 't-zgj-cg-menu-liucheng-guanli',
    to: '/system/businessManage/flowManage',
    // icon: icon27
    icon: '#liuchengguanli'
  },
  {
    name: '业务规则配置',
    label: 't-zgj-cg-menu-yewu-guizhe-peizhi',
    to: '/system/businessManage/businessRule',
    // icon: icon28
    icon: '#yewuguizepeizhi'
  },
  {
    name: '消息中心',
    type: 'part',
    label: 't-zgj-cg-menu-xiaoxi-zhongxin'
  },
  {
    name: '消息事件',
    label: 't-zgj-cg-menu-xiaoxi-shijan',
    to: '/system/messageCenter/event',
    // icon: icon29
    icon: '#tongzhishijian'
  },
  {
    name: '消息模板',
    label: 't-zgj-cg-menu-xiaoxi-muban',
    to: '/system/messageCenter/template',
    // icon: icon34
    icon: '#tongzhimoban'
  },
  {
    name: '渠道配置',
    label: 't-zgj-cg-menu-qudao-peizhi',
    to: '/system/messageCenter/channel',
    // icon: icon35
    icon: '#qudaoguanli'
  },
  {
    name: '消息日志',
    label: 't-zgj-cg-menu-xiaoxi-rizhi',
    to: '/system/messageCenter/log',
    // icon: icon36
    icon: '#xiaoxirizhi'
  },
  {
    name: '日志管理',
    type: 'part',
    label: 't-zgj-cg-menu-rizhi-guanli'
  },
  {
    name: '登录日志',
    label: 't-zgj-cg-menu-denglu-rizhi',
    to: '/system/logMamage/login',
    // icon: icon30
    icon: '#denglurizhi'
  },
  {
    name: '系统操作日志',
    label: 't-zgj-cg-menu-xitong-caozuo-rizhi',
    to: '/system/logMamage/systemOperation',
    // icon: icon31
    icon: '#xitongcaozuorizhi'
  },
  {
    name: '系统运行日志',
    label: 't-zgj-cg-menu-xitong-yunxing-rizhi',
    to: '/system/logMamage/systemRunning',
    // icon: icon37
    icon: '#cebiandaohanglan2'
  },
  {
    name: '终端操作日志',
    label: 't-zgj-cg-menu-zongduan-caozuorizhi',
    to: '/system/logMamage/terminalOperation',
    // icon: icon32
    icon: '#zhongduancaozuorizhi'
  },
  {
    name: '固件升级日志',
    label: 't-zgj-cg-menu-gujian-shengji-rizhi',
    to: '/system/logMamage/firmwareUpgrade',
    // icon: icon33
    icon: '#gujianshengjirizhi'
  }
]
