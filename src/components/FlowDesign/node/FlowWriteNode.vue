<template>
  <div class="flow-row">
    <div class="flow-box" :class="{ 'flow-complete': node.nodeStatus == 2 }">
      <div class="flow-item" :class="{ 'flow-item-active': isActive }" @click="!props.readable && open(drawer, props.node)">
        <div class="flow-node-box" :class="{ write: !readable, 'has-error': props.node.error }">
          <div class="node-name" :class="nameClass(props.node, 'node-fill')">
            <EditName v-model="props.node.nodeName" />
            <img :src="writeIcon" style="margin-left: 10px" />
          </div>
          <!-- 节点内容 -->
          <FlowNodeContent :content="props.node.content" prefix="表单权限：" defaultValue="默认表单全可编辑" />
          <!-- 错误提示 -->
          <exclamation-circle-outlined v-if="props.node.error" class="node-error" />
          <!-- 只有是填写节点才能删除，发起节点不能删除 -->
          <div v-if="props.node.canDelete && !props.readable && !props.node.deletable && props.node.nodeType == 6" class="close-icon">
            <close-circle-outlined @click.stop="props.node.deletable = true" />
          </div>
          <!-- 删除提示 -->
          <DeleteConfirm :node="props.node" />
        </div>
      </div>
      <FlowAddNode :node="props.node" :nodeType="6" :readable="props.readable" />
    </div>
    <FlowWriteDrawer ref="drawer" @close="isActive = false" @nodeUpdate="nodeUpdate" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import useCommon from '../hooks/useCommon';
import useIcon from '../hooks/useIcon';
import FlowAddNode from '../node/FlowAddNode.vue';
import EditName from '../common/EditName.vue';
import DeleteConfirm from '../common/DeleteConfirm.vue';
import FlowNodeContent from '../common/FlowNodeContent.vue';
import FlowWriteDrawer from '../drawer/FlowWriteDrawer.vue';
// 图标
const { writeIcon } = useIcon();
// 公共方法
const { isActive, nameClass, open } = useCommon();
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
