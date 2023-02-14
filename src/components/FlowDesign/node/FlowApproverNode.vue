<template>
  <div class="flow-row">
    <div class="flow-box" :class="{ 'flow-complete': props.node.nodeStatus == 2, 'flow-drag': props.node.dragClass }">
      <div
        class="flow-item"
        :class="{ 'flow-item-active': isActive }"
        @click="!props.readable && open(drawer, props.node)"
        draggable="true"
        @dragstart="ondragstart($event, props.node)"
        @dragover="ondragover($event, props.node)"
        @dragenter="ondragenter($event, props.node)"
        @dragleave="ondragleave($event, props.node)"
        @dragend="ondragend($event, props.node)"
      >
        <div class="flow-node-box approver" :class="{ 'has-error': props.node.error }">
          <div class="node-name" :class="nameClass(props.node, props.node.nodeType == 1 ? 'node-sp' : 'node-transact')">
            <EditName v-model="props.node.nodeName" :node="props.node" />
            <img :src="props.node.nodeType == 1 ? approverIcon : writeIcon" style="margin-left: 10px" />
          </div>
          <!-- 节点内容 -->
          <FlowNodeContent :content="props.node.content"/>
          <!-- 错误提示 -->
          <exclamation-circle-outlined v-if="props.node.error" class="node-error" />
          <div v-if="!props.readable && !props.node.deletable" class="close-icon">
            <close-circle-outlined @click.stop="props.node.deletable = true" />
          </div>
          <!-- <div class="flow-node-toolbar">
            <a-icon type="copy" @click.stop="props.node.deletable = true" />
          </div> -->
          <!-- 删除提示 -->
          <DeleteConfirm :node="props.node" />
        </div>
      </div>
      <!-- 如果子节点是意见分支,则只能添加一个意见分支 -->
      <FlowAddNode :node="props.node" :nodeType="props.node.nodeType" :readable="props.readable || props.node.dragClass" />
      <!-- 拖拽操作 -->
      <FlowDragTool v-model="props.node.dragTool" @close="v => (props.node.dragClass = v)" />
    </div>
    <FlowApprovalDrawer ref="drawer" :node="props.node" @close="isActive = false" @nodeUpdate="nodeUpdate" />
  </div>
</template>
<script setup>
import { ref } from 'vue';
import useCommon from '../hooks/useCommon';
import useIcon from '../hooks/useIcon';
import { useFlowStore } from '../store/flow';
import FlowAddNode from '../node/FlowAddNode.vue';
import DeleteConfirm from '../common/DeleteConfirm.vue';
import FlowDragTool from '../common/FlowDragTool.vue';
import FlowNodeContent from '../common/FlowNodeContent.vue';
import FlowApprovalDrawer from '../drawer/FlowApproverDrawer.vue';
// 公共方法
const { isActive, nameClass, open } = useCommon();
// 图标
const { approverIcon, writeIcon } = useIcon();

// Store
const flowStore = useFlowStore();

// 当前侧边
const drawer = ref(null);

// 接收属性
const props = defineProps({
  node: {
    type: Object,
    default: function () {
      return {};
    }
  },
  readable: {
    type: Boolean,
    default: false
  }
});

/**
 * ondragstart 事件：
 * 当拖拽元素开始被拖拽的时候触发的事件，此事件作用在被拖曳元素上
 * @param {*} e
 */
const ondragstart = (e, node) => {
  flowStore.dragSourceNode = node;
};

/**
 * ondragover 事件：
 * 拖拽元素在目标元素上移动的时候触发的事件，此事件作用在目标元素上
 * @param {*} e
 */
const ondragover = (e, node) => {
  e.preventDefault();
  node.dragClass = true;
};

/**
 * ondragenter 事件：
 * 当拖曳元素进入目标元素的时候触发的事件，此事件作用在目标元素
 * @param {*} e
 */
const ondragenter = (e, node) => {
  //if (flowStore.dragSourceNode.nodeId != node.nodeId) {
  flowStore.dragTargetNode = node;
  //}
};

/**
 * ondragenter 事件：
 * 当拖曳元素离开目标元素的时候触发的事件，此事件作用在目标元素
 * @param {*} e
 */
const ondragleave = (e, node) => {
  node.dragClass = false;
  node.dragTool = false;
};

/**
 * ondragend 事件：
 * 当拖拽完成后触发的事件，此事件作用在被拖曳元素上
 * @param {*} e
 */
const ondragend = (e, node) => {
  node.dragClass = false;
  flowStore.dragTargetNode.dragTool = true;
};

// 事件
const emit = defineEmits(['nodeUpdate']);
// 侧边保存
const nodeUpdate = node => {
  emit('nodeUpdate', node);
};
</script>
