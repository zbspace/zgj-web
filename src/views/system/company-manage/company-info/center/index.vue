<template>
  <div class="comp-info-center">
    <div class="left">
      <div class="base">
        <div class="header">
          <span />
          基础信息
        </div>
        <div>
          <div class="rows">
            <span class="label">单位负责人</span>
            <span class="content">马丽丽</span>
            <img
              :src="inputIcon"
              alt=""
            >
          </div>
          <div class="rows">
            <span class="label">负责人手机号</span>
            <span class="content">18017607672</span>
            <img
              :src="inputIcon"
              alt=""
            >
          </div>
        </div>
      </div>
      <div class="base">
        <div class="header">
          <span />
          超级管理员
          <el-button
            type="primary"
            size="small"
          >
            变更
          </el-button>
        </div>
        <div>
          <div class="rows">
            <span class="label">超级管理员</span>
            <span class="content">李旺</span>
            <img
              :src="inputIcon"
              alt=""
            >
          </div>
          <div class="rows">
            <span class="label">超级管理员账号</span>
            <span class="content">225487</span>
            <img
              :src="inputIcon"
              alt=""
            >
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="header">
        <span />
        超级管理员
        <el-button
          type="primary"
          size="small"
        >
          修改
        </el-button>
      </div>
      <div>
        <div class="rows">
          <span class="label w-140">首次登录必须修改密码</span>
          <span class="content">开</span>
        </div>
        <div class="rows">
          <span class="label w-140">弱密码禁止保存</span>
          <span class="content">关</span>
        </div>
        <div class="rows">
          <span class="label w-140">密码变更提醒</span>
          <span class="content">开</span>
        </div>
        <div class="rows">
          <span class="label w-140">密码至少包含</span>
          <span class="content">小写字母</span>
        </div>
        <div class="rows">
          <span class="label w-140">限制密码长度至少为</span>
          <span class="content">8位</span>
        </div>
        <div class="rows">
          <span class="label w-140">初始密码</span>
          <span class="content">13780094578</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import inputIcon from '@/assets/svg/system/comp-info/input.svg'

</script>

<style lang="scss" scoped>
.comp-info-center {
  margin-top: 16px;
  display: flex;
  .left {
    .base {
      width: 436px;
      background-color: #fff;
      padding: 24px;
      margin-bottom: 16px;
    }
  }
  .right {
    margin-left: 16px;
    background-color: #fff;
    flex: 1;
    padding: 24px;
    margin-bottom: 16px;
  }
  .header{
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    display: flex;
    align-items: center;
    position: relative;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    padding: 0 0 8px 0 ;
    margin-bottom: 16px;
    span {
      width: 3px;
      height:20px;
      background-color: #D0963E;
      display: inline-block;
      margin-right: 7px;
    }
    button {
      position: absolute;
      right: 0;
    }
  }
  .rows{
    display: flex;
    width: 100%;
    margin-bottom: 16px;
    .label {
      width:108px;
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      text-align: right;
      color: rgba(0, 0, 0, 0.65);
      margin-right: 24px;
    }
    .content {
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      color: rgba(0, 0, 0, 0.85);
    }
    img {
      margin-left: 14px;
      cursor: pointer;
    }
  }
  .w-140 {
    width: 140px !important;
  }
}
</style>