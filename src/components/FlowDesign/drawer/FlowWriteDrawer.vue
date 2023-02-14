<template>
  <a-drawer
    :width="drawerWidth()"
    :headerStyle="headerStyle"
    :bodyStyle="drawerBodyStyle"
    placement="right"
    :closable="true"
    :visible="visible"
    @close="onClose"
  >
    <template #title>
      <div class="flow-drawer-title-context">
        <img :src="writeIcon" class="anticon" />
        <span class="flow-drawer-title">
          <EditName v-model="node.nodeName" />
        </span>
      </div>
    </template>
    <div class="flow-drawer-module">
      <a-tabs v-model:activeKey="tabsActiveKey">
        <a-tab-pane forceRender key="1" tab="表单权限">
          <FlowDrawerContent name="表单权限">
            <FlowAuthForm ref="flowAuthForm" :node="node" readable />
          </FlowDrawerContent>
        </a-tab-pane>
        <a-tab-pane forceRender key="2" tab="高级设置">
          <FlowApproverSenior :node="node" />
        </a-tab-pane>
      </a-tabs>

      <!-- <div class="flow-drawer-content">
        <div class="flow-drawer-item">
          <p class="flow-drawer-item-title">表单权限</p>
          <FlowAuthForm ref="flowAuthForm" :node="node" readable />
        </div>
        
      </div> -->
    </div>
    <FlowDrawerFooter @close="onClose" @save="onSave" />
  </a-drawer>
</template>

<script setup>
import { ref, reactive } from 'vue';
import useCommon from '../hooks/useCommon';
import useIcon from '../hooks/useIcon';
// import { useFlowStore } from '../store/flow';
import EditName from '../common/EditName.vue';
import FlowAuthForm from './FlowAuthForm.vue';
import FlowDrawerFooter from './FlowDrawerFooter.vue';
// 图标
const { writeIcon } = useIcon();
// 公共
const { drawerWidth, drawerBodyStyle, visible } = useCommon();
// Store
// const flowStore = useFlowStore();
// 节点
let node = ref({});

// 表单
let flowAuthForm = ref();

// tabs
let tabsActiveKey = ref('1');

// 侧边头样式
const headerStyle = reactive({
  // 'background-color': '#6da4f2',
  // #21B564 -16.37%, #23BE69
  // background: 'linear-gradient(90.04deg,#29cc80 -16.37%,#5ccc98 137.34%)',
  background: 'linear-gradient(90.04deg,#21B564 -16.37%,#23BE69 137.34%)',
  'border-radius': '0px 0px 0 0'
});

// 显示侧边
const show = currNode => {
  node.value = currNode;
  visible.value = true;
};

// 事件
const emit = defineEmits(['close', 'nodeUpdate']);
// 关闭侧边
const onClose = () => {
  visible.value = false;
  emit('close');
};

// 侧边保存
const onSave = () => {
  const privileges = flowAuthForm.value.privileges;
  node.value.privileges = privileges;
  // 更新节点显示信息
  if (privileges.length > 0) {
    node.value['error'] = false;
    node.value['content'] = '已设置';
    // 修改事件
    if (node.value.update) {
      emit('nodeUpdate', node.value);
    }
    onClose();
  } else {
    node.value['error'] = false;
    node.value['content'] = null;
  }
  return node.value;
};

defineExpose({
  show,
  onSave
});
</script>
