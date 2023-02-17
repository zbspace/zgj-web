<template>
  <div v-if="props.node.deletable" class="node-delete-layer">
    <a-button :size="size" class="ant-btn-ghost node-delete-cancel" @click.stop="delNode(props.node, callback)">删除</a-button>
    <a-button :size="size" @click.stop="props.node.deletable = false">取消</a-button>
  </div>
</template>

<script setup>
import useCommon from '../hooks/useCommon';
// 接收属性
const props = defineProps({
  node: {
    type: Object,
    default: function () {
      return {};
    }
  }
});

// 公共方法
const { size, delNode } = useCommon();

const emit = defineEmits(['callback']);
// 删除确定回调
const callback = value => {
  emit('callback', value);
};
</script>
