import icon19 from '@/assets/svg/qiye-xinxi.svg'
import icon20 from '@/assets/svg/wanglai-qiye.svg'
import icon21 from '@/assets/svg/bumen-yu-yuangong.svg'
import icon22 from '@/assets/svg/qxgl-icon.svg'
import icon23 from '@/assets/svg/quanju-canshu-peizhi.svg'
import icon25 from '@/assets/svg/zongduan-banben-guanli.svg'
import icon26 from '@/assets/svg/biaodan-guanli.svg'
import icon27 from '@/assets/svg/liucheng-guanli.svg'
import icon28 from '@/assets/svg/yewu-guizhe-peizhi.svg'
import icon29 from '@/assets/svg/xiaoxi-shijian.svg'
import icon34 from '@/assets/svg/xiaoxi-muban.svg'
import icon35 from '@/assets/svg/xiaoxi-qdpz.svg'
import icon36 from '@/assets/svg/xiaoxi-xxrz.svg'
import icon30 from '@/assets/svg/denglu-rizi.svg'
import icon31 from '@/assets/svg/xitong-caozuo-rizhi.svg'
import icon32 from '@/assets/svg/zongduan-caozuo-rizhi.svg'
import icon33 from '@/assets/svg/gujian-shengji-rizhi.svg'
import icon37 from '@/assets/svg/xitong-yunxing-rizhi.svg'
export const system = [
  {
    name: '企业管理',
    type: 'part',
    label: 't-zgj-cg-menu-qiye-guanli'
  },
  {
    name: '企业信息',
    label: 't-zgj-cg-menu-qiye-xinxi',
    to: '/system/company/info',
    icon: icon19
  },
  {
    name: '往来企业',
    label: 't-zgj-cg-menu-wanglai-qiye',
    to: '/system/company/company_dealing',
    icon: icon20
  },
  {
    name: '部门与员工',
    label: 't-zgj-cg-menu-bumen-yu-yuangong',
    to: '/system/company/department_staff/',
    icon: icon21,
    children: [
      {
        name: '单位与部门管理',
        to: '/system/company/department_staff/department',
        label: 't-zgj-cg-menu-danwei-yu-bumen-guanli'
      },
      {
        name: '员工管理',
        to: '/system/company/department_staff/staff',
        label: 't-zgj-cg-menu-yuangong-guanli'
      },
      {
        name: '邀请审核',
        to: '/system/company/department_staff/audit',
        label: 't-zgj-cg-menu-yaoqing-shenhe'
      }
    ]
  },
  {
    name: '权限管理',
    label: 't-zgj-cg-menu-quanxian-guanli',
    to: '/system/company',
    icon: icon22,
    children: [
      {
        name: '角色权限配置',
        to: '/system/company/permission/role',
        label: 't-zgj-cg-menu-jueshe-quanxian-peizhi'
      },
      {
        name: '基础权限配置',
        to: '/system/company/permission/rule',
        label: 't-zgj-cg-menu-jichu-quanxian-peizhi'
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
    to: '/system/base_setting/global_parameter',
    icon: icon23
  },
  {
    name: '固件版本管理',
    label: 't-zgj-cg-menu-gujian-banben-guanli',
    to: '/system/base_setting/firmware_version',
    icon: icon33
  },
  {
    name: '终端版本管理',
    label: 't-zgj-cg-menu-zongduan-banben-guanli',
    to: '/system/base_setting/terminal_version',
    icon: icon25
  },
  {
    name: '业务管理',
    type: 'part',
    label: 't-zgj-cg-menu-yewu-guanli'
  },
  {
    name: '表单管理',
    label: 't-zgj-cg-menu-biaodan-guanli',
    to: '/system/business_manage/form_manage',
    icon: icon26
  },
  {
    name: '流程管理',
    label: 't-zgj-cg-menu-liucheng-guanli',
    to: '/system/business_manage/flow_manage',
    icon: icon27
  },
  {
    name: '业务规则配置',
    label: 't-zgj-cg-menu-yewu-guizhe-peizhi',
    to: '/system/business_manage/business_rule',
    icon: icon28
  },
  {
    name: '消息中心',
    type: 'part',
    label: 't-zgj-cg-menu-xiaoxi-zhongxin'
  },
  {
    name: '消息事件',
    label: 't-zgj-cg-menu-xiaoxi-shijan',
    to: '/system/message_center/event',
    icon: icon29
  },
  {
    name: '消息模板',
    label: 't-zgj-cg-menu-xiaoxi-muban',
    to: '/system/message_center/template',
    icon: icon34
  },
  {
    name: '渠道配置',
    label: 't-zgj-cg-menu-qudao-peizhi',
    to: '/system/message_center/channel',
    icon: icon35
  },
  {
    name: '消息日志',
    label: 't-zgj-cg-menu-xiaoxi-rizhi',
    to: '/system/message_center/log',
    icon: icon36
  },
  {
    name: '日志管理',
    type: 'part',
    label: 't-zgj-cg-menu-rizhi-guanli'
  },
  {
    name: '登录日志',
    label: 't-zgj-cg-menu-denglu-rizhi',
    to: '/system/log_mamage/login',
    icon: icon30
  },
  {
    name: '系统操作日志',
    label: 't-zgj-cg-menu-xitong-caozuo-rizhi',
    to: '/system/log_mamage/system_operation',
    icon: icon31
  },
  {
    name: '系统运行日志',
    label: 't-zgj-cg-menu-xitong-yunxing-rizhi',
    to: '/system/log_mamage/system_running',
    icon: icon37
  },
  {
    name: '终端操作日志',
    label: 't-zgj-cg-menu-zongduan-caozuorizhi',
    to: '/system/log_mamage/terminal_operation',
    icon: icon32
  },
  {
    name: '固件升级日志',
    label: 't-zgj-cg-menu-gujian-shengji-rizhi',
    to: '/system/log_mamage/firmware_upgrade',
    icon: icon33
  }
]
