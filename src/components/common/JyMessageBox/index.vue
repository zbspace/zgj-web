<template>
  <div class="jy-message-box">
    <el-dialog
      v-model="isVisible"
      :closed="cancel"
      destroy-on-close
      :show-close="mode === 2 || showClose"
      align-center
      :close-on-click-modal="false"
      :class="`message-box-${mode}`"
    >
      <template #header>
        <!-- mode1 -->
        <div v-if="mode === 1">
          <slot name="header">
            <div class="header-div">
              <img src="@/assets/svg/common/warning.svg" alt="" />
              <span>提示？</span>
            </div>
          </slot>
        </div>

        <!-- mode2 -->
        <div v-if="mode === 2">
          <slot name="header">
            <span>标题</span>
          </slot>
        </div>
      </template>

      <div>
        <slot> （这里填写内容） </slot>
      </div>

      <template #footer>
        <slot name="footer">
          <el-button type="primary" @click="confirm"
            >{{ $t(props.comfirmBtnText) }}}</el-button
          >
          <el-button @click="cancel" v-if="!props.oneBtn"
            >{{ $t('t-zgj-operation.cancel') }}}</el-button
          >
        </slot>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  const props = defineProps({
    // 展示隐藏
    modelValue: {
      type: Boolean,
      default: false
    },

    // 是否显示关闭按钮
    showClose: {
      type: Boolean,
      default: false
    },

    // 2种模式（1、2）
    mode: {
      type: Number,
      default: 2
    },
    oneBtn: {
      type: Boolean,
      default: false
    },
    comfirmBtnText: {
      type: String,
      default: 't-zgj-select.confirm'
    }
  })
  const emit = defineEmits(['update:modelValue', 'on-confirm', 'on-cancel'])

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
    isVisible.value = false
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
      padding: 0;
      .el-dialog__header {
        padding: 0;
        display: flex;
        align-items: center;
        margin-right: 0;
        height: 55px;
        padding-left: 24px;
        .header-div {
          display: flex;
          align-items: center;
        }
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
        padding: 0 24px 0 64px;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        color: rgba(0, 0, 0, 0.65);
      }
      .el-dialog__footer {
        padding: 24px;
      }
    }
    :deep(.message-box-2) {
      .el-dialog__header {
        border-bottom: solid 1px rgba(0, 0, 0, 0.06);
      }
      .el-dialog__body {
        padding: 24px 24px 22px 24px;
        border-bottom: solid 1px rgba(0, 0, 0, 0.06);
      }
      .el-dialog__footer {
        padding: 10px 24px;
      }
    }
  }
</style>
