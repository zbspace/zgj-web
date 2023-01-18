<template>
  <div class="jy-popconfirm">
    <el-popconfirm
      :width="props.width"
      :confirm-button-text="props.cancelBtn"
      :cancel-button-text="props.confirmBtn"
      confirm-button-type="text"
      cancel-button-type="primary"
      :icon="WarningFilled"
      :title="props.title"
      @confirm="cancelEvent"
      @cancel="confirmEvent"
      :teleported="false"
    >
      <template #reference>
        <slot> </slot>
      </template>
    </el-popconfirm>
  </div>
</template>

<script setup>
  import { WarningFilled } from '@element-plus/icons-vue'
  const props = defineProps({
    width: {
      type: Number,
      default: 172
    },
    cancelBtn: {
      type: String,
      default: '取消'
    },
    confirmBtn: {
      type: String,
      default: '确认'
    },
    title: {
      type: String,
      default: '您确定要关闭么？'
    }
  })
  const emit = defineEmits(['on-confirm', 'on-cancel'])
  const confirmEvent = value => {
    console.log('confirmEvent')
    emit('on-confirm', value)
  }
  const cancelEvent = value => {
    console.log('cancelEvent')
    emit('on-cancel', value)
  }
</script>

<style lang="scss" scoped>
  .jy-popconfirm {
    :deep(.el-popper) {
      .el-popconfirm__main {
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        color: rgba(0, 0, 0, 0.65);
        i {
          margin-right: 10px;
        }
      }
      .el-popconfirm__action {
        margin-top: 13px;
        .el-button {
          padding: 4px 15px;
          margin-left: 12px;
          font-weight: 400;
          font-size: 12px;
          text-align: center;
        }
        .el-button.is-text {
          border: 1px solid rgba(0, 0, 0, 0.15);
          border-radius: 2px;
          color: rgba(0, 0, 0, 0.65);
          &:hover {
          }
        }
      }
    }
  }
</style>
