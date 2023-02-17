<template>
  <div class="flow-drawer-content">
    <FlowDrawerItem :prefix="props.prefix" :name="props.name" :text="props.text" :desc="props.desc" :footer="props.footer" :top="top" :bottom="bottom">
      <slot></slot>
    </FlowDrawerItem>
    <slot name="item"></slot>
  </div>
</template>

<script setup>
import FlowDrawerItem from './FlowDrawerItem.vue';
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
    default: 15
  },
  bottom: {
    type: Number,
    required: false,
    default: 15
  }
});
</script>
