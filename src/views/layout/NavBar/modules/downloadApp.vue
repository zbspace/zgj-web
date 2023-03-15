<!--
* @Descripttion 下载app
* @FileName downloadApp.vue
* @Author WalterXsk
* @LastEditTime 2023-03-09 14:09:56
!-->
<template>
  <JyDialog
    @update:show="showDialog = $event"
    :show="showDialog"
    title="下载章管家APP"
    :footer="false"
    :height="440"
    :width="600"
  >
    <div class="tooltip-down">
      <div class="qrcode">
        <div class="ios box">
          <div class="code"></div>
          <div class="title" v-if="false">
            <img src="@/assets/images/login/ios_down.svg" />
            <div>{{ $t('t-zgj-DownloadApp.IOS') }}</div>
          </div>
        </div>

        <div class="android box" v-if="false">
          <div class="code"></div>
          <div class="title">
            <img src="@/assets/images/login/android_down.svg" />
            <div>{{ $t('t-zgj-DownloadApp.Android') }}</div>
          </div>
        </div>
      </div>
      <div class="tip">{{ $t('t-zgj-tips.downAppTips1') }}</div>
      <div class="tip">{{ $t('t-zgj-tips.downAppTips2') }}</div>
    </div>
  </JyDialog>
</template>

<script setup>
  import JyDialog from '@/views/components/modules/JyDialog.vue'
  import { computed } from 'vue'

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    }
  })
  const emit = defineEmits(['update:modelValue'])
  const showDialog = computed({
    get() {
      return props.modelValue
    },
    set(val) {
      emit('update:modelValue', val)
    }
  })
</script>

<style scoped lang="scss">
  .tooltip-down {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 420px;
    background: #ffffff;
    border-radius: 4px;
    padding: 8px 0;

    .qrcode {
      // display: flex;
      // justify-content: space-between;
      padding: 20px 46px 40px 46px;

      .box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .code {
          width: 180px;
          height: 180px;
          background: url(../../assets/images/login/test.png) no-repeat center
            center;
          background-size: 100%;
          margin-bottom: 10px;
        }
        .title {
          display: flex;

          img {
            width: 20px;
            height: 20px;
            margin-right: 6px;
          }
        }
      }
    }

    .tip {
      font-family: PingFangSC-Regular;
      font-weight: 400;
      font-size: 10px;
      color: #909399;
      letter-spacing: 0;
      text-align: center;
      line-height: 18px;
    }
  }
</style>
