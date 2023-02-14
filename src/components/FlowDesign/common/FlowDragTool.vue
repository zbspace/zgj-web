<template>
  <div v-if="drag" class="flow-drag-tool">
    <div class="drag-tool-content">
      <div class="drag-tool-arrow"></div>
      <div class="drag-tool-inner">
        <a-space>
          <a-button type="primary" danger shape="circle" title="移动节点" @click="onMove">
            <template #icon><border-inner-outlined /></template>
          </a-button>
          <a-button type="primary" shape="circle" title="复制节点" @click="onCopy">
            <template #icon><copy-outlined /></template>
          </a-button>
          <a-button shape="circle" title="取消操作" @click="onClose">
            <template #icon><close-outlined /></template>
          </a-button>
        </a-space>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, toRaw } from 'vue';
import { cloneDeep } from 'lodash-es';
import { useFlowStore } from '../store/flow';
import useCommon from '../hooks/useCommon';

// Store
const flowStore = useFlowStore();

// 公共方法
const { delNode, getId } = useCommon();

// 接收属性
const props = defineProps({
  modelValue: {
    type: [Boolean],
    default: false,
    required: true
  }
});

const drag = ref(false);

/**
 * 监听值变化
 */
watch(
  () => props.modelValue,
  newVal => {
    initData(newVal);
  }
);

/**
 * 初始数据
 * @param {*} value
 */
const initData = value => {
  if (value) {
    drag.value = value;
  } else {
    drag.value = false;
  }
};

const emit = defineEmits(['update:modelValue', 'close']);

/**
 * 移动节点
 */
const onMove = () => {
  const addNode = toRaw(flowStore.dragSourceNode);
  // 删除
  delNode(addNode);
  // 目标节点添加
  flowStore.addNode({
    addNode: addNode,
    currNode: toRaw(flowStore.dragTargetNode),
    nodeType: flowStore.dragTargetNode.nodeType,
    nodeId: ''
  });
  onClose();
};

/**
 * 复制节点
 */
const onCopy = () => {
  const addNode = cloneDeep(toRaw(flowStore.dragSourceNode));
  addNode.nodeId = getId();
  // 目标节点添加
  flowStore.addNode({
    addNode: addNode,
    currNode: toRaw(flowStore.dragTargetNode),
    nodeType: flowStore.dragTargetNode.nodeType,
    nodeId: ''
  });
  onClose();
};

const onClose = () => {
  drag.value = false;
  emit('update:modelValue', false);
  emit('close', false);
};

defineExpose({
  onClose
});
</script>
