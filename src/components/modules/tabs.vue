<template>
  <div class="custom-tabs">
    <div v-for="(item, index) in props.label" :key="index">
      <div :class="props.active === item.value ? 'actived' : ''" class="item" @click="handleTab(item.value)">{{ $t(item.name) }}</div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
const emit = defineEmits(['update:active'])
const props = defineProps({
  active: {
    type: String,
    default: 'first'
  },
  label: {
    type:Array,
    default() {
      return [] 
    }
  }
})

const handleTab = (val) => {
  emit('update:active', val)
}
</script>

<style lang="scss" scoped>
.custom-tabs {
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  .item {
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.45);
    height: 30px;
    line-height: 24px;
    margin: 0 22px;
    cursor: pointer;
  }

  .actived {
    color: #D0963E;
    border-bottom: 2px solid #D0963E;
  }
}
</style>