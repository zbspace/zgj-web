<template>
  <div class="flow-row">
    <div class="flow-box">
      <div class="flow-item flow-node-branch">
        <div class="flow-branch-suggest">
          <div class="node-name">
            <EditName v-model="props.node.nodeName" style="width: 90%" />
            <img :src="parallelIcon" style="margin-left: 10px" />
          </div>
          <!--  <div class="close-icon"><a-icon type="close-circle" @click.stop="!read && delNode(node)" /></div> -->
        </div>
      </div>
      <!-- 如果子节点是意见分支,则只能添加一个意见分支 -->
      <FlowAddNode :node="props.node" :nodeType="props.node.nodeType" :readable="props.readable" />
    </div>
    <!--  <FlowApproverSetting ref="flowApproverSetting" @close="isActive = false" /> -->
  </div>
</template>
<script setup>
// import { ref } from 'vue';
// import useCommon from '../hooks/useCommon';
import useIcon from '../hooks/useIcon';
import FlowAddNode from '../node/FlowAddNode.vue';
// import DeleteConfirm from '../common/DeleteConfirm.vue';
// 公共方法
// const { isActive, nameClass } = useCommon();
// 图标
const { parallelIcon } = useIcon();

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
