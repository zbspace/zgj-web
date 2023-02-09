<template>
  <div class="jy-dialog">
    <el-dialog
      v-model="isVisible"
      :width="width"
      center
      align-center
      destroy-on-close
      @closed="closed"
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
    }
  })

  const emit = defineEmits(['update:modelValue', 'on-confirm', 'on-closed'])

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
</script>

<style lang="scss" scoped>
  .jy-dialog {
    :deep(.el-dialog) {
      .el-dialog__header {
        padding-top: 40px;
        font-weight: 400;
        font-size: 22px;
        line-height: 30px;
        text-align: center;
        color: rgba(0, 0, 0, 0.85);
        padding-bottom: 32px;
      }
      .el-dialog__body {
        padding: 0 64px;
        min-height: 304px;
      }
    }
  }
</style>
