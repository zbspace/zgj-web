<template>
  <ApplicationBillReset :resetData="state"></ApplicationBillReset>
</template>

<script setup>
  import {
    reactive,
    defineProps,
    defineEmits,
    onBeforeMount,
    onMounted
  } from 'vue'
  import ApplicationBillReset from '@/views/components/ApplicationBill-reset/index.vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const state = reactive({
    title: '文件归档'
  })
</script>

<style lang="scss" scoped>
  .inner-page-content {
    margin: 0%;
    width: 100%;
    height: calc(100vh - 100px);

    display: flex;
    // flex-flow: wrap;
    align-content: flex-start;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    @include mixin-padding-top(10);
    @include mixin-padding-bottom(10);
    @include mixin-padding-left(20);
    @include mixin-padding-right(0);
    box-sizing: border-box;
    border-radius: var(--jy-border-radius-4);
    background-color: var(--jy-in-common-use-1);
    margin-top: 20px;
    padding: 16px 20px;

    .inner-page-title {
      display: flex;
      justify-content: space-between;
      width: 100%;
      align-items: center;
      cursor: pointer;

      .inner-title {
        display: flex;
        align-items: center;
        font-size: 22px;
        height: 60px;
        color: rgba(0, 0, 0, 0.85);
      }
    }

    .inner-page-content {
      .l-title {
        position: relative;
        // height: 24px;
        width: 100%;
        font-size: 16px;
        color: rgba(0, 0, 0, 0.85);
        padding-bottom: 6px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.06);

        &::before {
          content: '';
          position: absolute;
          top: 4px;
          left: -12px;
          width: 2px;
          height: 20px;
          background: #d0963e;
        }
      }
    }

    .btn {
      min-width: 60px;
      height: 32px;
      margin: 0 8px;
      text-align: center;
      line-height: 16px;
      font-size: 14px;
      border-radius: 4px;
    }

    .confirm {
      color: #ffffff;
      background: #d0963e;
    }

    .confirm:hover {
      background: #d9ab5b;
    }

    .confirm:active {
      background: #af7427;
    }
  }
</style>
