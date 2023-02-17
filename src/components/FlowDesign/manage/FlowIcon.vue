<template>
  <div class="flow-icon" @click="click">
    <img :src="url" :width="width" />
  </div>
</template>
<script setup>
// 接收属性
const props = defineProps({
  url: {
    type: String,
    required: false,
    default: ''
  },
  width: {
    type: Number,
    required: false,
    default: 60
  }
});

const emit = defineEmits(['click']);
const click = () => {
  emit('click');
};

defineExpose({});
</script>

<style lang="less" scoped></style>
