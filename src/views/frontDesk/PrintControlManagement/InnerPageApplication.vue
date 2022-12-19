<template>
  <div class="inner-page-content">
    <!-- 面包屑 -->
    <div class="inner-crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>用印管理</el-breadcrumb-item>
        <el-breadcrumb-item>用印申请</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- title -->
    <div class="inner-page-title">


      <div class="inner-title">
        <!-- <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M0.313093 8.72017C-0.104364 8.32243 -0.104364 7.67757 0.313093 7.27983L7.11595 0.798304C7.5334 0.400565 8.21024 0.400565 8.62769 0.798304C9.04515 1.19604 9.04515 1.8409 8.62769 2.23864L3.64968 6.98153H18V9.01847H3.64968L8.62769 13.7614C9.04515 14.1591 9.04515 14.804 8.62769 15.2017C8.21024 15.5994 7.5334 15.5994 7.11595 15.2017L0.313093 8.72017Z"
            fill="black" fill-opacity="0.85" />
        </svg> -->
        <div>用印申请</div>
      </div>
      <!-- <div class="confirm btn">提交</div> -->
    </div>

    <!-- content -->
    <div class="inner-page-content">
      <!-- 进度条 -->
      <div class="process" style="display:flex;">
        <div >1</div>
        <div class="jiantou-right"></div>
        <div>2</div>
        <div class="jiantou-right"></div>
        <div>3</div>
        <div class="jiantou-right"></div>
        <div>4</div>
      </div>
      <!-- 选择表单 -->
      <div class="step-1"></div>
      <!-- 填写表单信息 -->
      <div class="step-2"></div>
      <!-- 确认审批流程 -->
      <div class="step-3"></div>
      <!-- 完成 -->
      <div class="step-4"></div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { Edit, Picture, UploadFilled } from '@element-plus/icons-vue'
const router = useRouter()

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
  border-radius: var(--border-radius-4);
  background-color: var(--in-common-use-1);
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
    .process{
      display:flex;
      justify-content:center;
      width:100%;
      >div{
        width:24px;
        height:24px;
        display:flex;
        align-items:center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.04);
        border-radius: 2px;
        color: rgba(0, 0, 0, 0.85);
      }
      >.jiantou-right{
        width:52px;
        margin:0 38px;
        background-color:#fff;
        background-image:url('../../../assets/svg/jiantou-right.svg');
        background-size:100% auto;
        background-repeat:no-repeat;
        background-position: center;
      }
    }
    
  }


  
}
</style>