<template>
  <componentsLayout
    :style="{
      padding: '16px'
    }"
    :free="true"
  >
    <div class="inner-page-content">
      <!-- 面包屑 -->
      <div class="inner-crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>{{ resetData.title }}</el-breadcrumb-item>
          <el-breadcrumb-item>{{
            resetData.isTransfer ? '申请转办' : '申请重置'
          }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <!-- title -->
      <div class="inner-page-title">
        <div class="inner-title" @click="router.go(-1)">
          <svg
            width="18"
            height="16"
            viewBox="0 0 18 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.313093 8.72017C-0.104364 8.32243 -0.104364 7.67757 0.313093 7.27983L7.11595 0.798304C7.5334 0.400565 8.21024 0.400565 8.62769 0.798304C9.04515 1.19604 9.04515 1.8409 8.62769 2.23864L3.64968 6.98153H18V9.01847H3.64968L8.62769 13.7614C9.04515 14.1591 9.04515 14.804 8.62769 15.2017C8.21024 15.5994 7.5334 15.5994 7.11595 15.2017L0.313093 8.72017Z"
              fill="black"
              fill-opacity="0.85"
            />
          </svg>
          <div style="margin-left: 6px">智能用印</div>
        </div>
        <el-button class="confirm btn" @click="submitForm">提交</el-button>
      </div>

      <!-- content -->
      <div class="inner-page-content">
        <div class="l-title">基本信息</div>
        <div class="base-info">
          <JyVform
            ref="vFormRef"
            mode="render"
            :formJson="formJson"
            :formData="formData"
            :optionData="optionData"
            @buttonClick="clickSelect"
            @on-loaded="onLoaded"
          />
        </div>
        <div class="l-title">审批流程</div>
      </div>
      <div v-if="state.selectPerson">1111</div>
    </div>
  </componentsLayout>
</template>

<script setup>
  import {
    ref,
    reactive,
    onBeforeMount,
    onMounted,
    watch
  } from 'vue'
  import ResetFromJson from '@/views/addDynamicFormJson/ResetForm'
  import { useRouter } from 'vue-router'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import componentsLayout from '@/views/components/Layout.vue'
  const router = useRouter()
  const props = defineProps({
    // 展示权限
    resetData: {
      type: Object,
      default: {}
    }
  })
  const state = reactive({
    selectPerson: false
  })
  const formJson = reactive(ResetFromJson)
  const formData = reactive({})
  const optionData = reactive({})
  const vFormRef = ref(null)
  const submitForm = type => {
    if (!type) {
      vFormRef.value.resetForm()
      return
    }
    vFormRef.value
      .getFormData()
      .then(formData => {
        // Form Validation OK
        alert(JSON.stringify(formData))
        showFormDialog.value = false
      })
      .catch(error => {
        // Form Validation failed

        ElMessage.error(error)
      })
  }

  // select25439
  function clickSelect(buttonWidget) {
    console.log(buttonWidget)
  }
  const onLoaded = () => {
    vFormRef.value.setFormJson(formJson)
  }
</script>

<style lang="scss" scoped>
  .inner-page-content {
    margin: 0%;
    width: 100%;
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
        margin-bottom: 24px;

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

    .base-info {
      width: 100%;
    }
  }
</style>
