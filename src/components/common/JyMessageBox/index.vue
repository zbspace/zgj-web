<template>
  <div class="jy-message-box">
    <el-dialog
      v-model="isVisible"
      :before-close="handleClose"
      destroy-on-close
      :show-close="props.showClose"
      align-center
      :close-on-click-modal="false"
    >
      <template #header>
        <slot name="header">
          <img src="@/assets/svg/common/warning.svg" alt="" />
          <span>提示？</span>
        </slot>
      </template>

      <div>
        <slot />
      </div>

      <template #footer>
        <slot name="footer">
          <el-button type="primary" @click="confirm">确定</el-button>
          <el-button @click="cancel">取消</el-button>
        </slot>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    showClose: {
      type: Boolean,
      default: false
    }
  })
  const emit = defineEmits(['update:modelValue', 'onConfirm', 'onCancel'])

  const isVisible = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      emit('update:modelValue', value)
    }
  })

  const handleClose = () => {
    isVisible.value = false
  }

  const confirm = value => {
    emit('on-confirm', value)
  }
  const cancel = value => {
    emit('on-cancel', value)
    isVisible.value = false
  }
</script>

<style lang="scss" scoped>
  .jy-message-box {
    :deep(.el-dialog) {
      width: 480px;
      min-height: auto;
      padding: 32px 32px 24px 32px;
      .el-dialog__header {
        padding: 0;
        display: flex;
        align-items: center;
        margin-bottom: 12px;
        img {
          width: 21px;
          margin-right: 18px;
        }
        span {
          font-family: 'PingFang SC';
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 24px;
          color: rgba(0, 0, 0, 0.85);
        }
      }
      .el-dialog__body {
        height: auto;
        min-height: auto;
        padding: 0 0 0 40px;
        margin-bottom: 24px;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        color: rgba(0, 0, 0, 0.65);
      }
      .el-dialog__footer {
        border-top: none;
        padding: 0;
      }
    }
  }
</style>
