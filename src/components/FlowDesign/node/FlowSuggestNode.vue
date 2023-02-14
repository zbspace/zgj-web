<template>
  <div class="flow-row">
    <div class="flow-branch">
      <div class="meet-node"></div>
      <div class="flow-col" v-for="(conditionNode, index) in props.node.conditionNodes" :key="index">
        <div class="clear-left-border" v-if="index == 0"></div>
        <div class="clear-right-border" v-if="props.node.conditionNodes.length - 1 == index"></div>
        <div class="flow-row">
          <div class="flow-box">
            <div class="flow-item flow-node-branch">
              <div class="flow-branch-suggest">
                <div class="node-name">
                  <span>{{ conditionNode.nodeName }}</span>
                  <span style="margin-left: 10px">
                    <check-circle-outlined v-if="index == 0" style="color: green" />
                    <close-circle-outlined v-if="props.node.conditionNodes.length - 1 == index" style="color: red" />
                  </span>
                </div>
                <div v-if="!props.readable && !conditionNode.deletable" class="close-icon">
                  <close-circle-outlined @click.stop="conditionNode.deletable = true" />
                </div>
                <!-- 删除提示 -->
                <DeleteConfirm :node="conditionNode" @callback="delCallback" />
              </div>
            </div>
            <FlowAddNode :node="node" :nodeType="3" :id="conditionNode.nodeId" :readable="props.readable" />
          </div>
        </div>
        <FlowNode
          v-if="conditionNode.childNode && conditionNode.childNode.hasOwnProperty(nodeName)"
          :node="conditionNode.childNode"
          :readable="props.readable"
        />
      </div>
    </div>
    <div class="after-branch-btn">
      <FlowAddNode :node="props.node" :nodeType="4" :readable="props.readable" />
    </div>
    <!-- <FlowBranchSetting ref="flowBranchSetting" @close="isActive = false" /> -->
  </div>
</template>

<script setup>
// import { ref } from 'vue';
import useCommon from '../hooks/useCommon';
// import useIcon from '../hooks/useIcon';
import { useFlowStore } from '../store/flow';
import FlowAddNode from '../node/FlowAddNode.vue';
import DeleteConfirm from '../common/DeleteConfirm.vue';
// 公共方法
const { nodeName } = useCommon();
// 图标
// const { branchPlusIcon, branchIcon } = useIcon();

// Store
const flowStore = useFlowStore();

// const flowBranchSetting = ref();

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

// 删除回调
const delCallback = () => {
  let currNode = {
    nodeId: props.node.nodePid
  };
  // 将对应的审批节点的添加按钮开启
  flowStore.updateNode({ currNode, field: 'addable', value: true });
};
</script>
