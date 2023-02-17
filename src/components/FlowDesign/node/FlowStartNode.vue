<template>
  <div class="flow-row">
    <div class="flow-box" :class="{ 'flow-complete': props.node.nodeStatus == 2 }">
      <div class="flow-item">
        <div class="node-name node-start">开始</div>
      </div>
      <FlowAddNode :node="props.node" :nodeType="0" :readable="props.readable" />
    </div>
  </div>
</template>

<script setup>
import FlowAddNode from './FlowAddNode.vue';
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
    default: true
  }
});
</script>


