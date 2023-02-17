<template>
  <a-drawer
    :placement="placement"
    getContainer=".flow-helper"
    :zIndex="zIndex"
    width="300px"
    :wrapStyle="wrapStyle"
    :visible="visible"
    @close="close"
  >
    <div class="flow-helper-drawer-header">
      <div class="flow-helper-drawer-header-title">流程设计指南</div>
      <div class="flow-helper-drawer-header-content">一键启用精选流程模板，提升效率</div>
    </div>
    <a-popover placement="right" trigger="click" v-for="item in guideItems" :key="item.id">
      <template #content>
        <img class="flow-helper-drawer-item-popover-img" :src="item.img" />
      </template>
      <div class="flow-helper-drawer-item" @click="popoverVisible = true">
        <div class="flow-helper-drawer-item-icon">
          <img :src="item.icon" />
        </div>
        <div>
          <div class="flow-helper-drawer-item-title">{{ item.name }}</div>
          <div class="flow-helper-drawer-item-content">{{ item.des }}</div>
        </div>
      </div>
    </a-popover>
  </a-drawer>
</template>

<script setup name="FlowGuideDrawer">
import { ref } from 'vue';
import useCommon from '../../hooks/useCommon';

// 公共
const { drawerWidth, visible, size, radioStyle } = useCommon();

const placement = ref('right');
const zIndex = ref(9);
const wrapStyle = ref({
  'z-index': 900
});

const guideItems = ref([
  {
    name: '创建审批流程',
    des: '快速创建一个简单的审批流程',
    icon: 'https://lf-cdn-tos.bytescm.com/obj/static/ea/approval-static/create-process/tutorial/tutorial-1/icon_approval_outlined.svg',
    img: 'https://lf-cdn-tos.bytescm.com/obj/static/ea/approval-static/create-process/tutorial/tutorial-1/icon_approval_outlined.svg'
  },
  {
    name: '设置分支条件',
    des: '不同条件适用不同审批流程',
    icon: 'https://lf-cdn-tos.bytescm.com/obj/static/ea/approval-static/create-process/faqs/faq-1/icon_organization_outlined.svg',
    img: 'https://lf-cdn-tos.bytescm.com/obj/static/ea/approval-static/create-process/faqs/faq-1/icon_organization_outlined.svg'
  },
  {
    name: '设置多人审批',
    des: '有多个审批人时，可设置会签、或签',
    icon: 'https://lf-cdn-tos.bytescm.com/obj/static/ea/approval-static/create-process/faqs/faq-2/icon_team-add_outlined.svg',
    img: 'https://lf-cdn-tos.bytescm.com/obj/static/ea/approval-static/create-process/faqs/faq-2/icon_team-add_outlined.svg'
  },
  {
    name: '审批人去重',
    des: '同一审批人多次出现时，可设置自动跳过',
    icon: 'https://lf-cdn-tos.bytescm.com/obj/static/ea/approval-static/create-process/faqs/faq-3/icon_nearby-group_outlined.svg',
    img: 'https://lf-cdn-tos.bytescm.com/obj/static/ea/approval-static/create-process/faqs/faq-3/icon_nearby-group_outlined.svg'
  }
]);

const show = () => {
  visible.value = true;
};

// 事件
const emit = defineEmits(['close']);
// 关闭侧边
const close = () => {
  visible.value = false;
  emit('close');
};

defineExpose({
  show,
  close
});
</script>
