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
          <div class="flow-box" :class="{ 'flow-complete': conditionNode.nodeStatus == 2, 'flow-drag': conditionNode.dragClass }">
            <!-- 其他情况不支持配置 -->
            <div
              class="flow-item flow-node-branch"
              @click="!props.readable && props.node.conditionNodes.length - 1 != index && open(drawer, conditionNode, props.node)"
              @dragstart="ondragstart($event, conditionNode)"
              @dragover="ondragover($event, conditionNode)"
              @dragenter="ondragenter($event, conditionNode)"
              @dragleave="ondragleave($event, conditionNode)"
              @dragend="ondragend($event, conditionNode)"
            >
              <div class="flow-node-box condition" :class="{ 'has-error': conditionNode.error }">
                <div class="node-name" :class="nameClass(props.node, 'node-br')">
                  <EditName
                    v-model="conditionNode.nodeName"
                    @edit="showPriorityLevel => (conditionNode.attr.showPriorityLevel = showPriorityLevel)"
                  />
                  <div class="node-name-level" v-if="conditionNode.attr.showPriorityLevel">优先{{ conditionNode.attr.priorityLevel }}</div>
                  <img :src="branchIcon" style="margin-left: 10px" />
                </div>
                <!-- 节点内容 -->
                <FlowNodeContent :content="conditionNode.content" defaultValue="配置筛选条件" />
                <!-- 错误提示 -->
                <exclamation-circle-outlined v-if="conditionNode.error" class="node-error" />
                <!-- 删除按钮,其他情况不支持删除 -->
                <div v-if="conditionNode.canDelete && !props.readable && !conditionNode.deletable && node.conditionNodes.length - 1 != index" class="close-icon">
                  <close-circle-outlined @click.stop="conditionNode.deletable = true" />
                </div>
                <!-- 删除提示 -->
                <DeleteConfirm :node="conditionNode" />
              </div>
            </div>
            <!-- 节点添加 -->
            <FlowAddNode :node="props.node" :nodeType="3" :id="conditionNode.nodeId" :readable="props.readable" />
            <!-- 拖拽操作 -->
            <FlowDragTool v-model="conditionNode.dragTool" @close="v => (conditionNode.dragClass = v)" />
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
    <FlowBranchDrawer ref="drawer" :node="props.node" @close="isActive = false" @nodeUpdate="nodeUpdate" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import useCommon from '../hooks/useCommon';
import useIcon from '../hooks/useIcon';
import useNodeDrag from '../hooks/useNodeDrag';
import FlowAddNode from '../node/FlowAddNode.vue';
import FlowDragTool from '../common/FlowDragTool.vue';
import DeleteConfirm from '../common/DeleteConfirm.vue';
import FlowNodeContent from '../common/FlowNodeContent.vue';
import FlowBranchDrawer from '../drawer/FlowBranchDrawer.vue';
// 公共方法
const { nodeName, addBranch, nameClass, isActive, open } = useCommon();
// 图标
const { branchPlusIcon, branchIcon } = useIcon();
// 节点拖拽
const { ondragstart, ondragover, ondragenter, ondragleave, ondragend } = useNodeDrag();
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

// 事件
const emit = defineEmits(['nodeUpdate']);
// 侧边保存
const nodeUpdate = node => {
  emit('nodeUpdate', node);
};
</script>
