<template>
  <div class="flow-row">
    <div class="flow-box">
      <div class="flow-item" :class="{ 'flow-item-active': isActive }" @click="!props.readable && open(drawer, props.node)">
        <div class="flow-node-box copyer" :class="{ 'has-error': node.error }">
          <div class="node-name" :class="nameClass(node, 'node-cc')">
            <EditName v-model="props.node.nodeName" />
            <div class="search-input el-input" style="display: none">
              <input type="text" autocomplete="off" />
            </div>
            <img :src="ccIcon" alt="" style="margin-left: 10px" />
          </div>
          <!-- 节点内容 -->
          <FlowNodeContent :content="props.node.content" />
          <!-- 错误提示 -->
          <exclamation-circle-outlined v-if="props.node.error" class="node-error" />
          <div v-if="!readable && !node.deletable" class="close-icon">
            <close-circle-outlined @click.stop="props.node.deletable = true" />
          </div>
          <!-- 删除提示 -->
          <DeleteConfirm :node="props.node" />
        </div>
      </div>
      <FlowAddNode :node="props.node" :nodeType="2" :readable="props.readable" />
    </div>
    <FlowCopyerDrawer ref="drawer" :node="props.node" @close="isActive = false" @nodeUpdate="nodeUpdate" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import useCommon from '../hooks/useCommon';
import useIcon from '../hooks/useIcon';
import FlowAddNode from '../node/FlowAddNode.vue';
import DeleteConfirm from '../common/DeleteConfirm.vue';
import FlowNodeContent from '../common/FlowNodeContent.vue';
import FlowCopyerDrawer from '../drawer/FlowCopyerDrawer.vue';
// 公共方法
const { isActive, nameClass, open } = useCommon();
// 图标
const { ccIcon } = useIcon();
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
