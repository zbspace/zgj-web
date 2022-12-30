<template>
  <div class="menus">
    <el-menu
      router
      :default-active="activeMenu"
      @select="handleSelect"
      :collapse="isCollapse"
      class="el-menu-vertical-demo"
    >
      <template v-for="item in state1.menu">
        <el-sub-menu
          :index="item.to"
          :key="item.to"
          v-if="item.children && item.children.length"
        >
          <template #title>
            <img
              class="menu-iconpark"
              :src="item.icon"
              alt=""
              srcset=""
            >
            <span>{{ item.name }} </span>
          </template>

          <div
            v-for="child in item.children"
            :key="child.label"
          >
            <el-sub-menu
              :index="child.to"
              :key="child.to"
              v-if="child.children && child.children.length"
            >
              <template #title>
                &ensp;&ensp;一&emsp;<span>{{ child.name }} </span>
              </template>

              <div
                v-for="child1 in child.children"
                :key="child1.label"
              >
                <el-menu-item
                  :index="child1.to"
                  :route="child1.to"
                  v-if="child1.to"
                >
                  <span class="normal-color">&ensp;&ensp;&ensp;一&emsp;{{ child1.name }}</span>
                </el-menu-item>
                <p v-else>
                  {{ child1.name }}
                </p>
              </div>
            </el-sub-menu>

            <el-menu-item
              :index="child.to"
              :route="child.to"
              v-else-if="child.to"
            >
              <span class="normal-color"> &ensp;&ensp;一&emsp;{{ child.name }}</span>
            </el-menu-item>
            <p v-else>
              {{ child.name }}
            </p>
          </div>
        </el-sub-menu>

        <el-menu-item
          :key="item.label+'a'"
          :index="item.to"
          :route="item.to"
          v-else-if="item.to"
        >
          <img
            class="menu-iconpark"
            :src="item.icon"
            alt=""
            srcset=""
          >
          <template #title>
            <span>{{ item.name }}</span>
          </template>
        </el-menu-item>

        <p
          class="disable-p"
          v-else-if="!item.to"
          :key="item.label+'aa'"
        >
          {{ item.name }}
        </p>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import icon1 from '@/assets/svg/shouye-1.svg'
import icon2 from '@/assets/svg/yongyin-guanli-1.svg'
import icon3 from '@/assets/svg/yinzhang-guanli-1.svg'
import icon4 from '@/assets/svg/yinzhang-guanli-2.svg'
import icon5 from '@/assets/svg/dianzi-qianzhang.svg'
import icon6 from '@/assets/svg/shebei-guanli.svg'
import icon7 from '@/assets/svg/wenjianku-1.svg'
import icon8 from '@/assets/svg/wenjian-leixing-1.svg'
import icon9 from '@/assets/svg/liuchengshenpi-ssqr.svg'
import icon10 from '@/assets/svg/dai-shenpi-liucheng.svg'
import icon11 from '@/assets/svg/dai-chuli-renwu.svg'
import icon12 from '@/assets/svg/chaosong-geiwode-liucheng.svg'
import icon13 from '@/assets/svg/fengxian-tixing-jilu-1.svg'
import icon14 from '@/assets/svg/fengxian-tixing-jilu-2.svg'
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
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
const { state } = useStore()
const route = useRoute()
const activeMenu = ref('')
const isCollapse = computed(() => state.layout.isCollapse)
const state1 = ref({
  menu: [],
  business: [
    {
      name: '首页',
      label: 't-zgj-cg-menu-shouye',
      to: '/frontDesk/home',
      icon: icon1
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
      icon: icon2,
      children: [{
        name: '用印申请',
        to: '/frontDesk/PrintControlManagement/SealApplication',
        label: 't-zgj-cg-menu-yongyin-shenqing'
      }, {
        name: '用印申请',
        to: '/frontDesk/PrintControlManagement/Seal-application/Selection-form',
        label: 't-zgj-cg-menu-yongyin-shenqing'
      }, {
        name: '智能用印',
        to: '/frontDesk/PrintControlManagement/IntelligentPrinting',
        label: 't-zgj-cg-menu-zhineng-yongyin'
      }, {
        name: '文件归档',
        to: '/frontDesk/PrintControlManagement/Archive',
        label: 't-zgj-cg-menu-wenjian-guidang'
      }, {
        name: '用印记录',
        to: '/frontDesk/PrintControlManagement/recordWithSeal',
        label: 't-zgj-cg-menu-yongyin-jilu'
      }, {
        name: '用印轨迹',
        to: '/frontDesk/PrintControlManagement/Printed-track',
        label: 't-zgj-cg-menu-yongyin-guiji'
      }]
    },
    {
      name: '印章管理',
      label: 't-zgj-cg-menu-yinzhang-guanli',
      to: '/frontDesk/PrintControlManagement',
      icon: icon3,
      children: [{
        name: '印章库',
        to: '/frontDesk/PrintControlManagement/LibraryOfSeals',
        label: 't-zgj-cg-menu-yinzhang-ku'
      }, {
        name: '印章申请',
        to: '/frontDesk/PrintControlManagement/ApplicationForSeal',
        label: 't-zgj-cg-menu-yinzhang-shenqing'
      }, {
        name: '印章类型',
        to: '/frontDesk/PrintControlManagement/TypeOfSeal',
        label: 't-zgj-cg-menu-yinzhang-leixing'
      }, {
        name: '印章外借信息',
        to: '/frontDesk/PrintControlManagement/SealloanInformation',
        label: 't-zgj-cg-menu-yinzhang-waijie-xinxi'
      }]
    },
    {
      name: '文件防篡改',
      label: 't-zgj-cg-menu-wenjian-fangchuangai',
      to: '/frontDesk/PrintControlManagement',
      icon: icon4,
      children: [
        {
          name: '防伪水印验证',
          to: '/frontDesk/PrintControlManagement/SecurityWatermark',
          label: 't-zgj-cg-menu-fangwei-shuiyin-yanzheng'
        }, {
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
      icon: icon5,
      children: [{
        name: '电子签章申请',
        to: '/frontDesk/PrintControlManagement/electronic-seal-apply/Selection-form',
        label: 't-zgj-cg-menu-dianzi-qianzhang-shenqing'
      }, {
        name: '待电子签章',
        to: '/frontDesk/PrintControlManagement/ElectronicSignatureRequired',
        label: 't-zgj-cg-menu-dai-dianzi-qianzhang'
      }, {
        name: '电子签章记录',
        to: '/frontDesk/PrintControlManagement/electronicSignatureRecord',
        label: 't-zgj-cg-menu-dianzi-qianzhang-jilu'
      }, {
        name: '电子印章库',
        to: '/frontDesk/PrintControlManagement/ElectronicSealLibrary',
        label: 't-zgj-cg-menu-dianzi-yinzhang-ku'
      }, {
        name: '用户认证',
        to: '/frontDesk/home',
        label: 't-zgj-cg-menu-yonghu-renzheng'
      }]
    },
    {
      name: '设备管理',
      label: 't-zgj-cg-menu-shebei-guanli',
      to: '/frontDesk/PrintControlManagement',
      icon: icon6,
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
          children: [{
            name: '智能印章盒管理',
            to: '/frontDesk/PrintControlManagement/IntelligentSealBoxManagement',
            label: 't-zgj-cg-menu-zhineng-yinzhang-he-guanli'
          }, {
            name: '智能印章盒格口管理',
            to: '/frontDesk/home',
            label: 't-zgj-cg-menu-zhineng-yinzhang-he-gekou-guanli'
          }]
        },
        {
          name: '智能印章柜管理',
          to: '/frontDesk/home',
          label: 't-zgj-cg-menu-zhineng-yinzhang-gui-guanli',
          children: [{
            name: '智能印章柜管理',
            to: '/frontDesk/PrintControlManagement/IntelligentSealCabinetManagement',
            label: 't-zgj-cg-menu-zhineng-yinzhang-gui-guanli'
          }, {
            name: '智能印章柜格口管理',
            to: '/frontDesk/home',
            label: 't-zgj-cg-menu-zhineng-yinzhang-gui-gekou-guanli'
          }]
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
      icon: icon7
    },
    {
      name: '文件类型',
      label: 't-zgj-cg-menu-wenjian-leixing',
      to: '/frontDesk/fileManagement/documentType',
      icon: icon8
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
      icon: icon9
    },
    {
      name: '审批流程',
      label: 't-zgj-cg-menu-shenpi-liucheng',
      to: '/frontDesk/approvalFlow/approvalFlow',
      icon: icon10
    },
    {
      name: '处理任务',
      label: 't-zgj-cg-menu-chuli-renwu',
      to: '/frontDesk/approvalFlow/handleTask',
      icon: icon11
    },
    {
      name: '抄送给我',
      label: 't-zgj-cg-menu-caoshong-geiwo',
      to: '/frontDesk/approvalFlow/carbonCopyToMe',
      icon: icon12
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
      icon: icon14
    },
    {
      name: '风险提醒记录',
      label: 't-zgj-cg-menu-fengxian-tixing-jilu',
      to: '/frontDesk/home',
      icon: icon13,
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
  ],
  system: [
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
  ],
  CurrentSystemType: 'business' // business / system
})

const handleSelect = (index, indexPath) => {
  console.log(index, indexPath)
  activeMenu.value = index
}

const CurrentSystemType = sessionStorage.getItem('CurrentSystemType')
if (CurrentSystemType) {
  state1.value.CurrentSystemType = CurrentSystemType
}
if (CurrentSystemType === 'business') {
  state1.value.menu = state1.value.business
} else if (CurrentSystemType === 'system') {
  state1.value.menu = state1.value.system
}
onMounted(() => {
  activeMenu.value = route.path
})
</script>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Menus'
})
</script>

<script></script>
<style lang="scss" scoped>
.menus {
  padding-top: 24px;
  .menu-iconpark {
    @include mixin-width(26);
    margin-right: 10px;
  }
  .disable-p {
    padding-left: 30px;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: rgba(0, 0, 0, 0.45);
    margin-bottom: 10px;
    margin-top: 26px;
  }
  :deep(.el-menu ){
    // 侧边栏折叠动画速度
    // transition: width 0.25s;
    // -webkit-transition: width 0.25s;
    // -moz-transition: width 0.25s;
    // -webkit-transition: width 0.25s;
    // -o-transition: width 0.25s;

    .el-menu-item {
      height: 44px;
      font-size: 14px;
      line-height: 22px;
      .el-menu-tooltip__trigger {
        padding: 0;
        left: auto;
      }
    }
    .el-menu-item:not(.is-active) {
      color: rgba(0, 0, 0, 0.85);
      .normal-color {
        color: rgba(0, 0, 0, 0.65);
      }
    }
    .el-sub-menu {
      margin-bottom: 10px;
      .el-sub-menu__title {
        height: 42px;
      }
      .el-tooltip__trigger {
        padding: 0;
        margin-left: 20px;
      }
    }
  }
  :deep(.el-menu--collapse) {
    .disable-p {
      display: none;
    }
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 240px;
    min-height: 400px;
  }
}
</style>