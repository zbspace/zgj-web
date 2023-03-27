export const system = [
  {
    name: '概览',
    label: 't-zgj-cg-menu-gailan',
    to: '/system/home',
    icon: '#shouye-73o018d8'
  },

  {
    name: '业务管理',
    type: 'part',
    label: 't-zgj-cg-menu-yewu-guanli'
  },
  {
    name: '流程管理',
    label: 't-zgj-cg-menu-liucheng-guanli',
    to: '/system/businessManage/flowManage',
    icon: '#liuchengguanli'
  },
  {
    name: '表单管理',
    label: 't-zgj-cg-menu-biaodan-guanli',
    to: '/system/businessManage/formManage',
    icon: '#biaodan-guanli'
  },
  {
    name: '业务规则配置',
    label: 't-zgj-cg-menu-yewu-guizhe-peizhi',
    to: '/system/businessManage/businessRule',
    icon: '#yewuguizepeizhi'
  },

  {
    name: '日志管理',
    type: 'part',
    label: 't-zgj-cg-menu-rizhi-guanli'
  },

  {
    name: '系统操作日志',
    label: 't-zgj-cg-menu-xitong-caozuo-rizhi',
    to: '/system/logMamage/systemOperation',
    icon: '#xitongcaozuorizhi'
  },
  {
    name: '系统运行日志',
    label: 't-zgj-cg-menu-xitong-yunxing-rizhi',
    to: '/system/logMamage/systemRunning',
    icon: '#cebiandaohanglan2'
  },
  {
    name: '终端操作日志',
    label: 't-zgj-cg-menu-zongduan-caozuorizhi',
    to: '/system/logMamage/terminalOperation',
    icon: '#zhongduancaozuorizhi'
  },
  {
    name: '固件升级日志',
    label: 't-zgj-cg-menu-gujian-shengji-rizhi',
    to: '/system/logMamage/firmwareUpgrade',
    icon: '#gujianshengjirizhi'
  },
  {
    name: '登录日志',
    label: 't-zgj-cg-menu-denglu-rizhi',
    to: '/system/logMamage/login',
    icon: '#denglurizhi'
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
    icon: '#tongzhishijian'
  },
  {
    name: '消息模板',
    label: 't-zgj-cg-menu-xiaoxi-muban',
    to: '/system/messageCenter/template',
    icon: '#tongzhimoban'
  },
  {
    name: '渠道管理',
    label: 't-zgj-cg-menu-qudao-peizhi',
    to: '/system/messageCenter/channel',
    icon: '#qudaoguanli'
  },
  {
    name: '消息日志',
    label: 't-zgj-cg-menu-xiaoxi-rizhi',
    to: '/system/messageCenter/log',
    icon: '#xiaoxirizhi'
  },

  {
    name: '基础设置',
    type: 'part',
    label: 't-zgj-cg-menu-jichu-shezhi'
  },
  {
    name: '终端版本管理',
    label: 't-zgj-cg-menu-zongduan-banben-guanli',
    to: '/system/baseSetting/terminalVersion',
    icon: '#zhongduanbanbenguanli'
  },
  {
    name: '固件版本管理',
    label: 't-zgj-cg-menu-gujian-banben-guanli',
    to: '/system/baseSetting/firmwareVersion',
    icon: '#cebiandaohanglan1'
  },
  {
    name: '全局参数设置',
    label: 't-zgj-cg-menu-quanju-canshu-shezhi',
    to: '/system/baseSetting/globalParameter',
    icon: '#quanjucanshushezhi'
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
    icon: '#wanglaiqiye'
  },
  {
    name: '部门与员工',
    label: 't-zgj-cg-menu-bumen-yu-yuangong',
    to: '/system/companyManage/departmentStaff',
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
        name: '角色权限管理',
        label: 't-zgj-cg-menu-quanxian-guanli',
        to: '/system/companyManage/departmentStaff/permission',
        icon: '#cebiandaohanglan'
      },
      {
        name: '邀请审核',
        to: '/system/companyManage/departmentStaff/audit',
        label: 't-zgj-cg-menu-yaoqing-shenhe'
      }
    ]
  }
]

export const systemAside = [
  {
    name: '首页',
    icon: '#liuchengguanli',
    route: '/system/home',
    to: '/system/home'
  },
  {
    name: '业务管理',
    icon: '#liuchengguanli',
    route: '/system/businessManage',
    to: '/system/businessManage/flowManage'
  },
  {
    name: '日志管理',
    icon: '#liuchengguanli',
    route: '/system/logMamage',
    to: '/system/logMamage/systemOperation'
  },
  {
    name: '消息中心',
    icon: '#liuchengguanli',
    route: '/system/messageCenter',
    to: '/system/messageCenter/event'
  },
  {
    name: '基础设置',
    icon: '#liuchengguanli',
    route: '/system/baseSetting',
    to: '/system/baseSetting/terminalVersion'
  },
  {
    name: '企业管理',
    icon: '#liuchengguanli',
    route: '/system/companyManage',
    to: '/system/companyManage/companyInfo'
  }
]
