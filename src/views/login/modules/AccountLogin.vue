<template>
  <div class="account-login-box user-select">
    <div class="login-box">
      <!-- tabs -->
      <div class="login-tabs">
        <div
          class="common-tabs"
          :class="state.activeCodeLogin ? 'active' : ''"
          @click="changeTabs(true)"
        >
          {{ $t('t-zgj-login.verification') }}
        </div>
        <div
          class="common-tabs"
          :class="!state.activeCodeLogin ? 'active' : ''"
          @click="changeTabs(false)"
        >
          {{ $t('t-zgj-login.accountlogin') }}
        </div>
      </div>

      <div class="login-content">
        <!-- 输入框 - 验证码 -->
        <div class="login-input" v-if="state.activeCodeLogin">
          <el-input
            v-model="state.inputPhone"
            :placeholder="state.placeholderPhone"
            size="large"
            class="l-inpt"
            clearable
          >
            <template #prepend>
              <el-select
                v-model="state.select"
                placeholder="+86"
                style="width: 80px"
                size="large"
              >
                <el-option label="+86" value="1" />
              </el-select>
            </template>
          </el-input>

          <div class="l-code">
            <el-input
              v-model="state.inputCode"
              :placeholder="state.placeholderCode"
              size="large"
              clearable
            />

            <VerificationBtn />
          </div>
        </div>

        <!-- 输入框 - 密码 -->
        <div v-else class="login-input">
          <el-input
            v-model="state.inputAccount"
            :placeholder="state.placeholderCodeAndAccount"
            size="large"
            clearable
            class="l-inpt l-code-inpt"
          >
            <template #prefix>
              <div class="icon">
                <img src="../../../assets/images/login/l_user_icon.svg" />
              </div>
            </template>
          </el-input>

          <div class="l-code">
            <el-input
              v-model="state.inputPassword"
              :placeholder="state.placeholderPassword"
              size="large"
              :type="state.showPass ? 'text' : 'password'"
              class="l-code-inpt"
            >
              <template #prefix>
                <div class="icon">
                  <img src="../../../assets/images/login/l_password_icon.svg" />
                </div>
              </template>

              <template #suffix>
                <div
                  class="open-pass"
                  @click="state.showPass = !state.showPass"
                >
                  <img
                    v-if="state.showPass"
                    src="../../../assets/images/login/l_open_pass.svg"
                  />
                  <img
                    v-else
                    src="../../../assets/images/login/l_close_pass.svg"
                  />
                </div>
              </template>
            </el-input>
          </div>

          <!-- 记住账号 -->
          <div class="remember-password">
            <div
              class="l-protocol"
              @click="state.rememberPas = !state.rememberPas"
            >
              <img
                v-if="state.rememberPas"
                src="../../../assets/images/login/l_select.svg"
                class="img"
              />
              <img
                v-else
                src="../../../assets/images/login/l_no_select.svg"
                class="img"
              />
              <span
                :style="{ color: state.rememberPas ? '#1985F5' : '#909399' }"
                >{{ $t('t-zgj-login.remember') }}</span
              >
            </div>
            <div @click="getUpdateDialog">
              {{ $t('t-zgj-login.forgot') }}
            </div>
          </div>
        </div>
      </div>

      <!-- 单选框 - 协议 -->
      <div class="l-protocol" @click="state.protocal = !state.protocal">
        <img
          v-if="state.protocal"
          src="../../../assets/images/login/l_select.svg"
          class="img"
        />
        <img
          v-else
          src="../../../assets/images/login/l_no_select.svg"
          class="img"
        />
        <div class="protocol-text">
          <span>{{ $t('t-agree-protocol') }}</span>
          <span class="item">《 {{ $t('t-service-protocol') }} 》</span>
          <span class="item">《{{ $t('t-privacy-policy') }}》</span>
        </div>
      </div>

      <!-- btn -->
      <div class="l-btn">
        <el-button type="primary" class="btn" @click="login">
          {{ $t('t-zgj-login.loginButton') }}
        </el-button>
      </div>

      <!-- 注册 -->
      <div class="l-registe">
        <span>{{ $t('t-no-account') }}?</span>
        <span class="item" @click="state.ImmediateRegisterDialog = true">{{
          $t('t-immediate-register')
        }}</span>
      </div>

      <!-- 其他登录方式 -->
      <div class="l-divider" v-if="false">
        <div class="divider">
          <div class="cover">
            {{ $t('t-other-login') }}
          </div>
        </div>

        <div class="l-other-enter">
          <div class="column1 common-col">
            <div class="img" />
          </div>
          <div class="column2 common-col">
            <div class="img" />
          </div>
          <div class="column3 common-col">
            <div class="img" />
          </div>
        </div>
      </div>
    </div>

    <!-- 重置密码弹窗 -->
    <UpdagePasswordDialog
      v-if="state.showUpdateDialog"
      @close="closeUpdateDialog"
    />

    <!-- 立即注册弹窗 -->
    <ImmediateRegister
      v-if="state.ImmediateRegisterDialog"
      @close="closeUpdateDialog"
    />
  </div>
</template>
<script setup>
  import i18n from '../../../i18n'
  import { reactive, watch, onMounted } from 'vue'
  import router from '../../../router/index'
  import VerificationBtn from '../components/VerificationBtn.vue'
  import UpdagePasswordDialog from './UpdagePasswordDialog.vue'
  import ImmediateRegister from './Register.vue'
  import { useAccountInfoStore } from '@/store/accountInfo'
  import { useRoute } from 'vue-router'
  const accountInfo = useAccountInfoStore()
  const route = useRoute()
  const state = reactive({
    activeCodeLogin: false, // 验证码登录
    protocal: false, // 协议
    rememberPas: false, // 记住密码
    inputPhone: null,
    inputCode: null,
    inputAccount: null,
    inputPassword: null,
    placeholderPhone: null,
    placeholderCode: null,
    placeholderCodeAndAccount: null,
    placeholderPassword: null,
    lang: i18n.global.locale,
    showPass: false, // 显示密码
    showUpdateDialog: false,
    ImmediateRegisterDialog: false
  })

  // 监听 语言切换
  watch(
    () => i18n.global.locale,
    () => {
      state.placeholderPhone = i18n.global.t(
        't-zgj-sealElectronic.mobilePlease'
      )
      state.placeholderCode = i18n.global.t('t-zgj-verification.required')
      state.placeholderCodeAndAccount = i18n.global.t(
        't-zgj-person.PleaseAccount'
      )
      state.placeholderPassword = i18n.global.t('t-zgj-password.required')
    },
    { immediate: true, deep: true }
  )

  onMounted(() => {
    state.inputAccount = '156666666666'
    state.inputPassword = '666666'
  })

  // 监听 tabs 切换
  const changeTabs = val => {
    state.activeCodeLogin = val
  }

  // 打开 重置密码
  const getUpdateDialog = () => {
    state.showUpdateDialog = true
  }

  // 关闭 重置密码弹窗
  const closeUpdateDialog = () => {
    state.showUpdateDialog = false
    state.ImmediateRegisterDialog = false
  }

  const login = () => {
    // 存储登录用户信息
    accountInfo.setAccountInfo({ name: 'xxx', token: 'xxx' })
    let redirect = route.query.redirect || '/frontDesk/home'
    if (typeof redirect !== 'string') {
      redirect = '/frontDesk/home'
    }
    router.replace(redirect)
  }
</script>

<style scoped lang="scss">
  .account-login-box {
    padding: 80px 0 30px;

    .login-tabs {
      display: flex;
      font-family: Helvetica-Bold;
      font-weight: 700;
      font-size: 16px;
      color: #303133;
      cursor: pointer;
      padding: 0 70px;
      .active {
        position: relative;
        color: #d0963e;
        &::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 180px;
          height: 4px;
          background: #d0963e;
          border-radius: 2px;
        }
      }

      .common-tabs {
        padding: 6px 0px;
        width: 180px;
        text-align: center;
      }
    }

    .login-content {
      padding: 0 70px;
      margin: 27px 0 0px 0;
      height: 168px;

      .l-inpt {
        margin-bottom: 20px;
      }

      .l-code {
        display: flex;

        .btn {
          font-size: 16px;
          color: #fafafa;
          width: 180px;
          height: 44px;
          border-radius: 2px;
          text-align: center;
          line-height: 44px;
          background: #d0963e;
          margin-left: 10px;
        }
      }

      .l-code-inpt {
        .icon {
          position: relative;
          padding-right: 16px;
          margin-right: 16px;
          img {
            width: 16px;
            height: 16px;
          }

          &::after {
            content: '';
            position: absolute;
            right: 0;
            top: 52%;
            transform: translateY(-50%);
            width: 1px;
            height: 18px;
            background: #f0f0f0;
          }
        }

        .open-pass {
          img {
            width: 16px;
            height: 16px;
            cursor: pointer;
          }
        }
      }

      .remember-password {
        display: flex;
        justify-content: space-between;
        font-family: Helvetica;
        font-size: 12px;
        color: #1985f5;
        text-align: center;
        margin-top: 16px;
        cursor: pointer;
        img {
          margin-right: 8px;
        }
      }
    }

    .l-protocol {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      .img {
        width: 14px;
        height: 14px;
      }

      .protocol-text {
        font-family: Helvetica;
        font-size: 12px;
        color: #333333;
        letter-spacing: 0;
        text-align: center;
        margin-left: 6px;
        .item {
          color: #1985f5;
          cursor: pointer;
        }
      }
    }

    .l-btn {
      margin: 10px 70px;

      .btn {
        font-size: 16px;
        color: #fafafa;
        width: 362px;
        height: 44px;
        border-radius: 2px;
        text-align: center;
        line-height: 44px;
        background: #d0963e;
      }
    }

    .l-registe {
      font-family: Helvetica;
      font-size: 12px;
      color: #909399;
      text-align: center;
      margin: 10px 0 20px 0;
      .item {
        font-size: 12px;
        color: #1985f5;
        margin-left: 6px;
        cursor: pointer;
      }
    }

    .l-divider {
      .divider {
        position: relative;
        width: 200px;
        height: 1px;
        background: #c0c4cc;
        font-weight: 400;
        font-size: 12px;
        color: #c0c4cc;
        margin: 16px auto;

        .cover {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          height: 25px;
          width: 140px;
          line-height: 25px;
          text-align: center;
          background: #ffffff;
          z-index: 888;
        }
      }

      .l-other-enter {
        display: flex;
        width: 200px;
        margin: 0 auto;
        justify-content: space-around;
        .common-col {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 50px;
          height: 50px;
          background: #f0f0f0;
          border-radius: 50%;
          cursor: pointer;
          .img {
            width: 26px;
            height: 26px;
          }
        }
        .column1 {
          .img {
            background: url(../../../assets/images/login/l_wechat_white.svg)
              no-repeat center center;
            background-size: 100%;
          }
        }

        .column2 {
          .img {
            background: url(../../../assets/images/login/l_ding_white.svg)
              no-repeat center center;
            background-size: 100%;
          }
        }

        .column3 {
          .img {
            background: url(../../../assets/images/login/l_fshu_white.svg)
              no-repeat center center;
            background-size: 100%;
          }
        }

        .column1:hover {
          box-shadow: 0 2px 6px 0 rgba(40, 46, 48, 0.1);
          .img {
            background: url(../../../assets/images/login/l_wechat.svg) no-repeat
              center center;
            background-size: 100%;
          }
        }

        .column2:hover {
          box-shadow: 0 2px 6px 0 rgba(40, 46, 48, 0.1);
          .img {
            background: url(../../../assets/images/login/l_ding.svg) no-repeat
              center center;
            background-size: 100%;
          }
        }

        .column3:hover {
          box-shadow: 0 2px 6px 0 rgba(40, 46, 48, 0.1);
          .img {
            background: url(../../../assets/images/login/l_fshu.svg) no-repeat
              center center;
            background-size: 100%;
          }
        }
      }
    }
  }
  .user-select {
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
  }

  .wrapper {
    box-shadow: 0 0 0 1px #ef1e1e;
    border-radius: 4px;
  }
</style>
