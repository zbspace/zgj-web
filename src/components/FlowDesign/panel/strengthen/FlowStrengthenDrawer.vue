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
      <div class="flow-helper-drawer-header-title">流程增强</div>
      <div class="flow-helper-drawer-header-content">提升审批流程灵活性，满足复杂业务场景</div>
    </div>
    <a-divider />
    <div class="flow-helper-drawer-row">
      <span class="flow-helper-drawer-row-title">流程增强</span>
      <a-switch v-model:checked="flowStore.dynamicFlowEnable"/>
    </div>
    <a-popover placement="right" trigger="click" v-for="item in dynamicItems" :key="item.id">
      <template #content>
        <img class="flow-helper-drawer-item-popover-img" :src="item.img" />
      </template>
      <div class="flow-helper-drawer-item" @click="popoverVisible = true">
        <div class="flow-helper-drawer-item-icon">
          <a-icon :type="item.icon" :style="item.style" />
        </div>
        <div>
          <div class="flow-helper-drawer-item-title">{{ item.name }}</div>
          <div class="flow-helper-drawer-item-content">{{ item.des }}</div>
        </div>
      </div>
    </a-popover>

    <div class="flow-helper-drawer-row">
      <span class="flow-helper-drawer-row-title">意见分支</span>
      <a-switch v-model:checked="flowStore.suggestBranchEnable" />
    </div>
    <a-popover placement="right" trigger="click" v-for="item in branchItems" :key="item.id">
      <template #content>
        <img class="flow-helper-drawer-item-popover-img" :src="item.img" />
      </template>
      <div class="flow-helper-drawer-item" @click="popoverVisible = true">
        <div class="flow-helper-drawer-item-icon">
          <a-icon :type="item.icon" :style="item.style" />
        </div>
        <div>
          <div class="flow-helper-drawer-item-title">{{ item.name }}</div>
          <div class="flow-helper-drawer-item-content">{{ item.des }}</div>
        </div>
      </div>
    </a-popover>

    <!-- <div class="flow-helper-drawer-row">
      <span class="flow-helper-drawer-row-title">并行节点</span>
      <a-switch v-model:checked="flowStore.parallelBranchEnable" />
    </div>
    <a-popover placement="right" trigger="click" v-for="item in parallelItems" :key="item.id">
      <template #content>
        <img class="flow-helper-drawer-item-popover-img" :src="item.img" />
      </template>
      <div class="flow-helper-drawer-item" @click="popoverVisible = true">
        <div class="flow-helper-drawer-item-icon">
          <a-icon :type="item.icon" :style="item.style" />
        </div>
        <div>
          <div class="flow-helper-drawer-item-title">{{ item.name }}</div>
          <div class="flow-helper-drawer-item-content">{{ item.des }}</div>
        </div>
      </div>
    </a-popover> -->

    <div class="flow-helper-drawer-row">
      <span class="flow-helper-drawer-row-title">限时审批</span>
      <a-switch v-model:checked="flowStore.timeLimitEnable" />
    </div>
    <a-popover placement="right" trigger="click" v-for="item in timeLimitItems" :key="item.id">
      <template #content>
        <img class="flow-helper-drawer-item-popover-img" :src="item.img" />
      </template>
      <div class="flow-helper-drawer-item" @click="popoverVisible = true">
        <div class="flow-helper-drawer-item-icon">
          <a-icon :type="item.icon" :style="item.style" />
        </div>
        <div>
          <div class="flow-helper-drawer-item-title">{{ item.name }}</div>
          <div class="flow-helper-drawer-item-content">{{ item.des }}</div>
        </div>
      </div>
    </a-popover>
  </a-drawer>
</template>

<script setup name="FlowStrengthenDrawer">
import { ref } from 'vue';
import useCommon from '../../hooks/useCommon';
import { useFlowStore } from '@/components/FlowDesign/store/flow';

// 公共
const { drawerWidth, visible, size, radioStyle } = useCommon();

// Store
const flowStore = useFlowStore();

const placement = ref('right');
const zIndex = ref(9);
const wrapStyle = ref({
  'z-index': 900
});


const dynamicItems = ref([
  {
    name: '动态流程',
    des: '审批人可修改审批单内容改变流程走向',
    icon: 'check',
    style: 'color:green',
    img: 'https://img.alicdn.com/imgextra/i2/O1CN01VRwp9P1S347GBhjEr_!!6000000002190-2-tps-562-438.png'
  },
  {
    name: '并行分支',
    des: '多条审批分支可同时进行, 并行节点可在添加节点时使用',
    icon: 'close',
    style: 'color:red',
    img: 'https://img.alicdn.com/imgextra/i1/O1CN01FaJaK226cPJIubkuC_!!6000000007682-2-tps-540-438.png'
  }
]);

const branchItems = ref([
  {
    name: '意见分支',
    des: '分支固定为“同意”和“不同意”。如果你同时需要对“不同意”审批的数据进行处理时选择此分支',
    icon: 'select',
    style: 'color:green',
    img: ''
  },
  {
    name: '默认分支',
    des: '只对“通过”审批的数据进行分支处理',
    icon: 'carry-out',
    style: 'color:red',
    img: 'https://img.alicdn.com/imgextra/i2/O1CN01VRwp9P1S347GBhjEr_!!6000000002190-2-tps-562-438.png'
  }
]);

const parallelItems = ref([
  {
    name: '并行分支',
    des: '多条审批分支可同时进行, 并行节点可在添加节点时使用',
    icon: 'select',
    style: 'color:green',
    img: ''
  }
]);

const timeLimitItems = ref([
  {
    name: '限时审批',
    des: '支持自动提醒、转交等，为每条审批流设一个智能闹钟',
    icon: 'select',
    style: 'color:green',
    img: ''
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
