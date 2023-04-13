<template>
  <div>
    <div class="header">
      <span class="title">{{ props.label }}</span>
      <slot name="tip"></slot>
      <div class="button">
        <el-button
          type="primary"
          style="height: 28px"
          v-if="props.btn"
          @click="emit('on-click', props.btn)"
        >
          {{ props.btn }}
        </el-button>
        <el-button
          v-if="props.btn1"
          @click="emit('on-click-cancel')"
          style="height: 28px; --el-button-text-color: var(--jy-color-text-2)"
        >
          {{ props.btn1 }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    label: {
      type: String,
      default: 'xxx'
    },
    btn: {
      type: String,
      default: ''
    },
    btn1: {
      type: String,
      default: ''
    }
  })
  const emit = defineEmits(['on-click', 'on-click-cancel'])
</script>

<style lang="scss" scoped>
  .header {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    display: flex;
    align-items: center;
    position: relative;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    padding: 0 0 8px 0;
    margin-bottom: 16px;
    margin-left: 10px;
    &::before {
      content: '';
      position: absolute;
      top: 2px;
      left: -10px;
      width: 3px;
      height: 20px;
      background-color: var(--jy-primary-6);
      display: inline-block;
    }
    .button {
      position: absolute;
      right: 0;
    }

    .title {
      color: rgba(0, 0, 0, 0.85);
    }
  }
</style>
