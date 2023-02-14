<template>
  <div class="flow-row">
    <div class="flow-branch">
      <div class="branch-node" @click="!props.readable && addBranch(props.node)">
        <img :src="branchPlusIcon" />
      </div>
      <div class="meet-node"></div>
      <div class="flow-col" v-for="(conditionNode, index) in props.node.conditionNodes" :key="conditionNode.nodeId">
        <div class="clear-left-border" v-if="index == 0"></div>
        <div class="clear-right-border" v-if="props.node.conditionNodes.length - 1 == index"></div>
        <div class="flow-row">
          <div class="flow-box">
            <div class="flow-item flow-node-branch" @click="!readable && open(drawer, conditionNode, props.node)">
              <div class="flow-node-box" :class="{ 'has-error': conditionNode.error }">
                <div class="node-name" :class="nameClass(props.node, 'node-pl')">
                  <EditName v-model="conditionNode.nodeName" />
                  <img :src="parallelIcon" style="margin-left: 10px" />
                </div>
                <!-- 节点内容 -->
                <FlowNodeContent :content="conditionNode.content" defaultValue="配置筛选条件" />
                <!-- 错误提示 -->
                <exclamation-circle-outlined v-if="conditionNode.error" class="node-error" />
                <div v-if="!readable && !conditionNode.deletable" class="close-icon">
                  <close-circle-outlined @click.stop="conditionNode.deletable = true" />
                </div>
                <!-- 删除提示 -->
                <DeleteConfirm :node="conditionNode" />
              </div>
            </div>
            <FlowAddNode :node="props.node" :nodeType="9" :id="conditionNode.nodeId" :readable="props.readable" />
          </div>
        </div>
        <FlowNode
          v-if="conditionNode.childNode && conditionNode.childNode.hasOwnProperty(nodeName)"
          :node="conditionNode.childNode"
          :readable="props.readable"
        />
      </div>
    </div>
    <div class="after-branch-btn"></div>
    <FlowBranchDrawer ref="drawer" :node="props.node" @close="isActive = false" />
  </div>
</template>
<script setup>
import { ref } from 'vue';
import useIcon from '../hooks/useIcon';
import useCommon from '../hooks/useCommon';
import FlowAddNode from './FlowAddNode.vue';
import FlowNodeContent from '../common/FlowNodeContent.vue';
import DeleteConfirm from '../common/DeleteConfirm.vue';
// 公共方法
const { nodeName, addBranch, nameClass, isActive, open } = useCommon();
// 图标
const { branchPlusIcon, parallelIcon } = useIcon();
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
</script>
