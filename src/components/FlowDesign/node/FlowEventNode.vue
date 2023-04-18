<template>
  <div class="flow-row">
    <div class="flow-box">
      <div class="flow-item" :class="{ 'flow-item-active': isActive }" @click="!props.readable && open('flowEventSetting', props.node)">
        <div class="node-name" :class="nameClass(node, 'node-temmi')">
          事件
          <div v-if="props.node.canDelete && !props.readable" class="close-icon">
            <close-circle-outlined @click.stop="delNode(props.node)" />
          </div>
        </div>
      </div>
      <FlowAddNode :node="node" :nodeType="5" :readable="readable" />
    </div>
  </div>
</template>
<script setup>
// import { ref } from 'vue';
import useCommon from '../hooks/useCommon';
// import useIcon from '../hooks/useIcon';
import FlowAddNode from '../node/FlowAddNode.vue';
// 公共方法
const { isActive, nameClass, delNode } = useCommon();
// 图标
// const { approverIcon } = useIcon();

// const flowApproverSetting = ref();

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
</script>
