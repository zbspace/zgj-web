<template>
  <div class="verification-btn login-input">
    <el-button
      @click="start"
      type="primary"
      size="large"
      class="btn"
      :style="props.customStyle"
      :disabled="state.sendMsg"
    >
      <span v-if="!state.sendMsg">{{ $t('t-zgj-getCode') }}</span>
      <span v-else>{{ state.timer }}{{ $t('t-send-again') }}</span>
    </el-button>
  </div>
</template>

<script setup>
  /**
   * timer: 剩余时间
   */
  import { reactive, watch, defineProps } from 'vue'
  import { ElMessage } from 'element-plus'
  import i18n from '../../../i18n'
  const props = defineProps({
    customStyle: {
      type: Object,
      default: () => {
        return {}
      }
    }
  })
  const state = reactive({
    timer: 60,
    sendMsg: false
  })

  watch(
    () => i18n.global.locale,
    () => {
      // console.log(newVal, oldVal, '====')
    },
    { immediate: true, deep: true }
  )

  // 发送短信
  const start = () => {
    if (state.sendMsg) return
    state.sendMsg = true
    ElMessage.success('短信发送成功')
    const t = setInterval(() => {
      if (state.timer <= 0) {
        clearInterval(t)
        state.sendMsg = false
        state.timer = 60
      }
      state.timer--
    }, 1000)
  }
</script>

<style scoped lang="scss">
  .verification-btn {
    .btn {
      font-size: 16px;
      color: #fafafa;
      width: 150px;
      height: 48px;
      border-radius: 4px;
      text-align: center;
      line-height: 44px;
      background: #d0963e;
      margin-left: 10px;
    }
  }
</style>
