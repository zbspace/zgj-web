<template>
  <div class="flow-drawer-item">
    <p class="flow-drawer-item-title" :style="titleStyle">
      <slot name="title">
        <FlowSubTitle v-if="name" :prefix="prefix" :name="name" />
        <span v-if="props.text" class="flow-drawer-item-text">{{ props.text }}</span>
        <div v-if="props.desc" class="flow-drawer-item-desc">{{ props.desc }}</div>
      </slot>
    </p>
    <slot></slot>
    <div v-if="props.footer" class="flow-drawer-item-footer">{{ props.footer }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
// 接收属性
const props = defineProps({
  name: {
    type: String,
    required: false,
    default: ''
  },
  prefix: {
    type: String,
    required: false,
    default: ''
  },
  text: {
    type: String,
    required: false,
    default: ''
  },
  desc: {
    type: String,
    required: false,
    default: ''
  },
  footer: {
    type: String,
    required: false,
    default: ''
  },
  top: {
    type: [Number, String],
    required: false,
    default: 0
  },
  bottom: {
    type: Number,
    required: false,
    default: 10
  }
});

const titleStyle = computed(() => {
  return {
    'margin-top': props.top + 'px',
    'margin-bottom': props.bottom + 'px'
  };
});
</script>
