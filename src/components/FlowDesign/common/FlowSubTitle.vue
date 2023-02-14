<template>
  <span class="flow-drawer-sub-title">{{ prefix }}{{ name }}</span>
</template>

<script setup>
// 接收属性
defineProps({
  prefix: {
    type: String,
    required: false,
    default: ''
  },
  name: {
    type: String,
    required: false,
    default: ''
  }
});
</script>
