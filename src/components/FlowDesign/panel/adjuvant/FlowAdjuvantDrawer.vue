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
      <div class="flow-helper-drawer-header-title">流程助手</div>
      <div class="flow-helper-drawer-header-content">一键启用精选流程模板，提升效率</div>
    </div>
    <a-popover placement="right" trigger="click" v-for="item in simpleItems" :key="item.id">
      <template #content>
        <img class="flow-helper-drawer-item-popover-img" :src="item.img" />
      </template>
      <div class="flow-helper-drawer-item" @click="popoverVisible = true">
        <div class="flow-helper-drawer-item-icon">
          <svg class="sw__icon" viewBox="0 0 1024 1024" width="1em" height="1em" fill="#0089ff" aria-hidden="true">
            <defs></defs>
            <path
              d="M320 554.667A85.333 85.333 0 01405.333 640v170.667A85.333 85.333 0 01320 896H149.333A85.333 85.333 0 0164 810.667V640a85.333 85.333 0 0185.333-85.333H320zM768 768a42.667 42.667 0 110 85.333H512A42.667 42.667 0 11512 768h256zM277.333 640H192a42.667 42.667 0 00-42.56 39.467l-.107 3.2V768a42.667 42.667 0 0039.467 42.56l3.2.107h85.333a42.667 42.667 0 0042.56-39.467L320 768v-85.333A42.667 42.667 0 00277.333 640zm576-42.667a42.667 42.667 0 110 85.334H512a42.667 42.667 0 110-85.334h341.333zM320 128a85.333 85.333 0 0185.333 85.333V384A85.333 85.333 0 01320 469.333H149.333A85.333 85.333 0 0164 384V213.333A85.333 85.333 0 01149.333 128H320zm448 213.333a42.667 42.667 0 110 85.334H512a42.667 42.667 0 110-85.334h256zm-490.667-128H192a42.667 42.667 0 00-42.56 39.467l-.107 3.2v85.333a42.667 42.667 0 0039.467 42.56l3.2.107h85.333a42.667 42.667 0 0042.56-39.467l.107-3.2V256a42.667 42.667 0 00-42.667-42.667zm576-42.666a42.667 42.667 0 110 85.333H512a42.667 42.667 0 110-85.333h341.333z"
            ></path>
          </svg>
        </div>
        <div>
          <div class="flow-helper-drawer-item-title">{{ item.name }}</div>
          <div class="flow-helper-drawer-item-content">{{ item.des }}</div>
        </div>
      </div>
    </a-popover>
    <a-divider />
    <a-popover placement="right" trigger="click" v-for="item in integratedItems" :key="item.id">
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

<script setup name="FlowAdjuvantDrawer">
import { ref } from 'vue';
import useCommon from '../../hooks/useCommon';

// 公共
const { drawerWidth, visible, size, radioStyle } = useCommon();

const placement = ref('right');
const zIndex = ref(9);
const wrapStyle = ref({
  'z-index': 900
});

const simpleItems = ref([
  {
    name: '自定义简单流程',
    des: '默认流程，所有人的审批人都一样',
    icon: '',
    img: 'https://img.alicdn.com/tfs/TB1uIc2iqNj0u4jSZFyXXXgMVXa-1230-1258.png'
  },
  {
    name: '通用分条件流程',
    des: '不同部门的审批人不同',
    icon: '',
    img: 'https://img.alicdn.com/tfs/TB1uIc2iqNj0u4jSZFyXXXgMVXa-1230-1258.png'
  }
]);

const integratedItems = ref([
  {
    name: '假勤流程',
    des: '适用于请假、外出、加班等审批场景',
    icon: '',
    img: 'https://img.alicdn.com/tfs/TB1Yr3KRKL2gK0jSZFmXXc7iXXa-1456-1288.png'
  },
  {
    name: '财务流程',
    des: '适用于付款、报销等审批场景',
    icon: '',
    img: 'https://img.alicdn.com/tfs/TB1tMgnfPMZ7e4jSZFOXXX7epXa-1522-1340.png'
  },
  {
    name: '行政流程',
    des: '适用于物品领用/用印申请等审批场景',
    icon: '',
    img: 'https://img.alicdn.com/tfs/TB1U0MzRHr1gK0jSZFDXXb9yVXa-1242-1272.png'
  },
  {
    name: '人事流程',
    des: '适用于转部门/调岗/离职等审批',
    icon: '',
    img: 'https://img.alicdn.com/tfs/TB1fnkgeQcx_u4jSZFlXXXnUFXa-1270-1266.png'
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
