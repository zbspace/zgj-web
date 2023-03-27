<template>
  <a-button type="link" shape="circle" :block="block" @click="click">
    <template #icon><plus-circle-outlined /></template>
    <span>{{ prefix }}{{ title }}</span>
  </a-button>
</template>

<script setup>
// 接收属性
const props = defineProps({
  prefix: {
    type: String,
    required: false,
    default: ''
  },
  title: {
    type: String,
    required: false,
    default: ''
  },
  block: {
    type: Boolean,
    required: false,
    default: false
  }
});

const emit = defineEmits(['click']);
// 确定
const click = value => {
  emit('click', value);
};
</script>
