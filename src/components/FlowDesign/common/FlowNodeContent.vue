<template>
  <div class="node-main">
    <a-tooltip placement="top" v-if="props.content && props.content.length > 25">
      <span v-if="props.prefix">{{ props.prefix }}</span>
      <template #title>
        <pre>{{ props.content }}</pre>
      </template>
      <pre>{{ props.content }}</pre>
    </a-tooltip>
    <pre v-else-if="props.content && props.content.length <= 25">{{ props.content }}</pre>
    <pre v-else class="hint-title">{{ props.defaultValue }}</pre>
  </div>
</template>

<script setup>
// 接收属性
const props = defineProps({
  // 内容
  content: {
    type: String,
    default: ''
  },
  // 前缀
  prefix: {
    type: String,
    default: ''
  },
  // 默认
  defaultValue: {
    type: String,
    default: '设置此节点'
  }
});
</script>
