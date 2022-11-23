<template>
  <div class="account-login-box">
    <div class="login-box">

      <!-- tabs -->
      <div class="login-tabs">
        <div class="common-tabs" :class="state.activeCodeLogin ? 'active' : ''">{{ $t('t-zgj-login.verification')}}</div>
        <div class="common-tabs" :class="!state.activeCodeLogin ? 'active' : ''">{{ $t('t-zgj-login.accountlogin')}}</div>
      </div>

      <div>
        <!-- 输入框 - 验证码 -->
        <div>1</div>

        <!-- 输入框 - 密码 -->
        <div>1</div>
      </div>

      <!-- 单选框 -->
      <div>2</div>

      <!-- btn -->
      <div>3</div>

      <!-- 注册 -->
      <div>4</div>

      <!-- 其他登录方式 -->
      <div>5</div>
    </div>
  </div>
</template>

<script setup>
import  I18n from "../../../i18n";
import { reactive } from "vue";


const state = reactive({
  activeCodeLogin: true, // 验证码登录
})
console.log(I18n.global.locale, state.activeCodeLogin)
</script>

<style scoped lang="scss">
.account-login-box {
  padding: 80px 70px 30px;

  .login-tabs {
    display: flex;
    font-family: Helvetica-Bold;
    font-weight: 700;
    font-size: 16px;
    text-align: center;
    color: #303133;

    .active {
      color: #D0963E;
      border-bottom: 4px solid #D0963E;
    }

    .common-tabs {
      padding: 4px 50px;
    }
  }
}
</style>