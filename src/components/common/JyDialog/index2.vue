<!--
* @Descripttion index.vue
* @FileName index.vue
* @Author zb
* @LastEditTime 2023-03-09 13:47:26
!-->
<template>
  <div>
    <el-dialog
      v-model="isVisible"
      :width="width"
      destroy-on-close
      @closed="closed"
      @opened="opened"
      class="jy-dialog"
      :class="[`mode-${props.mode}`, props.class]"
      center
      :append-to-body="appendToBody"
    >
      <template #header>
        <slot name="title">
          {{ props.title }}
        </slot>
      </template>

      <div>
        <slot> 内容 </slot>
      </div>

      <template #footer>
        <slot name="footer">
          <el-button type="primary" @click="confirm"> 确认 </el-button>
          <el-button @click="isVisible = false">取消</el-button>
        </slot>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  const props = defineProps({
    title: {
      type: String,
      default: 'title'
    },
    width: {
      type: Number,
      default: 600
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    mode: {
      type: Number,
      default: 0
    },
    appendToBody: {
      type: Boolean,
      default: false
    },
    class: {
      type: String,
      default: ''
    }
  })

  const emit = defineEmits([
    'update:modelValue',
    'on-confirm',
    'on-closed',
    'on-opened'
  ])

  const isVisible = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      emit('update:modelValue', value)
    }
  })

  const confirm = () => {
    emit('on-closed')
    isVisible.value = false
  }

  const closed = () => {
    emit('on-closed')
  }

  const opened = () => {
    emit('on-opened')
  }
</script>

<style lang="scss">
  .jy-dialog {
    &.mode-0 {
      .el-dialog__header {
        padding-top: 40px;
        font-weight: 400;
        font-size: 22px;
        line-height: 30px;
        text-align: center;
        color: rgba(0, 0, 0, 0.85);
        padding-bottom: 32px;
        display: block !important;
      }
      .el-dialog__body {
        padding: 0 64px;
        min-height: 200px;
      }
    }
    &.mode-1 {
      .el-dialog__header {
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        color: #333333;
        padding: 16px 24px;
        margin: 0;
        text-align: left;
        display: block !important;
      }
      .el-dialog__body {
        padding: 24px;
        min-height: 200px;
        border: 1px solid #f0f0f0;
      }
    }
  }
</style>
