<!--
* @Descripttion 关于章管家
* @FileName about.vue
* @Author jayce.zhang
* @LastEditTime 2023-03-09 14:09:56
!-->
<template>
  <JyDialog
    @update:show="showDialog = $event"
    :show="showDialog"
    closeOnPressEscape
    title="关于章管家"
    :footer="false"
    :height="440"
    :width="644"
  >
    <div class="aboutContainer">
      <img src="@/assets/images/login/logo.svg" />
      <div class="title">印章数智管理专家</div>
      <div class="detail">
        <div class="detailTitle">类型：</div>
        <div>基础版</div>
      </div>
      <div class="detail">
        <div class="detailTitle">版本号：</div>
        <div>V3.9.6</div>
      </div>
      <div class="detail">
        <div class="detailTitle">服务到期时间：</div>
        <div>2030-12-24</div>
      </div>
    </div>
  </JyDialog>
</template>

<script setup>
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
  .aboutContainer {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      width: 150px;
      margin-bottom: 15px;
    }

    .title {
      font-size: 16px;
      color: rgba(0, 0, 0, 0.65);
      margin-bottom: 45px;
    }

    .detail {
      font-size: 14px;
      display: flex;
      justify-content: center;
      margin-bottom: 24px;
      color: rgba(0, 0, 0, 0.85);

      div {
        width: 200px;
        text-align: left;
      }

      .detailTitle {
        text-align: right;
        color: rgba(0, 0, 0, 0.65);
      }
    }
  }
</style>
