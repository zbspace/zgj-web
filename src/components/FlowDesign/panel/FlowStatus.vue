<template>
  <div class="flow-status" :style="wrapStyle">
    <div class="flow-status-item">
      <span class="flow-status-item-icon flow-status-complete">●</span>
      <span>已完成</span>
    </div>
    <div class="flow-status-item">
      <span class="flow-status-item-icon flow-status-current">●</span>
      <span>进行中</span>
    </div>
    <div class="flow-status-item">
      <span class="flow-status-item-icon flow-status-not">●</span>
      <span>未进行</span>
    </div>
    <div class="flow-status-item">
      <span class="flow-status-item-icon flow-status-reject">●</span>
      <span>已拒绝</span>
    </div>
    <div class="flow-status-item">
      <span class="flow-status-item-icon flow-status-skip">●</span>
      <span>已跳过</span>
    </div>
    <div class="flow-status-item">
      <span class="flow-status-item-icon flow-status-back">●</span>
      <span>已退回</span>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
// 接收属性
const props = defineProps({
  navable: {
    type: Boolean,
    default: false
  },
  top: {
    type: [Number, String],
    default: 72
  }
});

const wrapStyle = ref({
  // 存在自定义nav时候需要减去nav高度
  top: props.navable ? 20 + Number(props.top) + 'px' : '20px'
});
</script>
