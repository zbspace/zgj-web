<template>
  <div class="flow-row-container">
    <FlowWriteNode v-if="node && node.nodeType == 0" :node="node" :readable="readable" @nodeUpdate="nodeUpdate" />
    <FlowApproverNode
      v-if="node && (node.nodeType == 1 || node.nodeType == 6)"
      :node="node"
      :readable="readable"
      @nodeUpdate="nodeUpdate"
    />
    <FlowFreeNode v-if="node && node.nodeType == 30" :node="node" :readable="readable" @nodeUpdate="nodeUpdate" />
    <FlowCopyerNode v-if="node && node.nodeType == 2" :node="node" :readable="readable" @nodeUpdate="nodeUpdate" />
    <FlowBranchNode v-if="node && node.nodeType == 4" :node="node" :readable="readable" @nodeUpdate="nodeUpdate" />
    <FlowSuggestNode v-if="node && node.nodeType == 7" :node="node" :readable="readable" @nodeUpdate="nodeUpdate" />
    <FlowParallelNode v-if="node && node.nodeType == 9" :node="node" :readable="readable" @nodeUpdate="nodeUpdate" />
    <FlowPolymerizeNode v-if="node && node.nodeType == 11" :node="node" :readable="readable" @nodeUpdate="nodeUpdate" />
    <FlowNoticeNode v-if="node && node.nodeType == 20" :node="node" :readable="readable" @nodeUpdate="nodeUpdate" />
    <FlowEventNode v-if="node && node.nodeType == 5" :node="node" :readable="readable" @nodeUpdate="nodeUpdate" />
    <FlowNode
      v-bind="$attrs"
      v-if="node && node.childNode && node.childNode.hasOwnProperty(nodeName)"
      :node="node.childNode"
      :readable="readable"
      @nodeUpdate="nodeUpdate"
    />
  </div>
</template>
<script setup>
import bus from 'vue3-eventbus';
import useCommon from '../hooks/useCommon';
import FlowWriteNode from './FlowWriteNode.vue';
import FlowApproverNode from './FlowApproverNode.vue';
import FlowFreeNode from './FlowFreeNode.vue';
import FlowCopyerNode from './FlowCopyerNode.vue';
import FlowBranchNode from './FlowBranchNode.vue';
import FlowSuggestNode from './FlowSuggestNode.vue';
import FlowParallelNode from './FlowParallelNode.vue';
import FlowPolymerizeNode from './FlowPolymerizeNode.vue';
import FlowNoticeNode from './FlowNoticeNode.vue';
import FlowEventNode from './FlowEventNode.vue';
import FlowNode from './FlowNode.vue';

// 公共
const { nodeName } = useCommon();

// 事件
// const emit = defineEmits(['nodeUpdate']);

// 接收属性
defineProps({
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

// 侧边修改
const nodeUpdate = node => {
  // emit('nodeUpdate', node);
  bus.emit('nodeUpdate', node);
};
</script>
