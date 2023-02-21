<template>
  <div class="container-login">
    <!-- header -->
    <div class="header-login">
      <img class="logo" src="../../assets/images/login/logo.png" />
      <div class="left">
        <!-- 下载 -->
        <div class="down" ref="dropdownDownloadRef">
          <div
            class="down-t"
            @click="downloadToop"
            :class="showDownloadPop ? 'selected-toop' : 'no-selected'"
          >
            <div class="icon"></div>
            <div class="user-select">{{
              $t('t-zgj-DownloadApp.Download')
            }}</div>
          </div>

          <div
            class="tooltip-down"
            :style="{ display: showDownloadPop ? 'block' : 'none' }"
          >
            <div class="qrcode">
              <div class="ios box">
                <div class="code"></div>
                <div class="title">
                  <img src="../../assets/images/login/ios_down.svg" />
                  <div>{{ $t('t-zgj-DownloadApp.IOS') }}</div>
                </div>
              </div>

              <div class="android box">
                <div class="code"></div>
                <div class="title">
                  <img src="../../assets/images/login/android_down.svg" />
                  <div>{{ $t('t-zgj-DownloadApp.Android') }}</div>
                </div>
              </div>
            </div>
            <div class="tip">{{ $t('t-zgj-tips.downAppTips1') }}</div>
            <div class="tip">{{ $t('t-zgj-tips.downAppTips2') }}</div>
          </div>
        </div>

        <!-- 切换语言 -->
        <div
          class="language"
          @click="changeLangToop"
          ref="dropdownChangeLanRef"
        >
          <div
            class="common-btn user-select"
            :class="showChangeLanPop ? 'open-toop' : 'close-toop'"
            >{{ $t('t-zgj-type') }}</div
          >
          <div
            class="tooltip-lan"
            :style="{ display: showChangeLanPop ? 'block' : 'none' }"
          >
            <div class="item user-select" @click="changeLanguage('ch')"
              >简体中文</div
            >
            <div class="item user-select" @click="changeLanguage('en')"
              >English</div
            >
          </div>
        </div>
      </div>
    </div>

    <!-- content -->
    <div class="content-login">
      <div
        class="login-type"
        @click="changeLogin"
        :class="state.showAccountLogin ? 'account-icon' : 'code-icon'"
      >
        <div
          class="l-type-tip user-select"
          :class="state.languageCh ? 'tip' : 'tip-left'"
          >{{
            state.showAccountLogin ? $t('t-scan-login') : $t('t-code-login')
          }}</div
        >
      </div>

      <!-- 登录-账号密码 -->
      <div v-show="state.showAccountLogin">
        <VAccountLogin></VAccountLogin>
      </div>

      <!-- 登录-扫码 -->
      <div v-show="!state.showAccountLogin" class="l-scan-box">
        <!-- title -->
        <div class="scan-title user-select">{{ $t('t-scan-login') }}</div>

        <!-- msg -->
        <div class="scan-msg user-select">{{ $t('t-zgj-login.scan') }}</div>

        <!-- 二维码 -->
        <div class="scan-code" @click="updateScanCode">
          <div class="code">
            <div :style="{ display: state.scanCodeError ? 'block' : 'none' }">
              <div class="mask-code"></div>
              <div class="mask-top user-select">
                <!-- 二维码已失效 -->
                <div class="mask-title"> {{ $t('t-scan-code-error') }}</div>

                <!-- 刷新 -->
                <div class="mask-btn">{{ $t('t-zgj-refesh') }}</div>
              </div>
            </div>
          </div>

          <div class="scan-bg"></div>
        </div>
      </div>
    </div>

    <!-- footer -->
    <div class="footer-login"
      >Copyright@2012-2022 章管家 沪ICP备13006057号-6
      上海建业信息科技股份有限公司</div
    >
  </div>
</template>

<script setup>
  import I18n from '@/utils/i18n'
  import { reactive, onMounted, ref, watch } from 'vue'
  import VAccountLogin from './modules/AccountLogin.vue'
  import useClickQutside from '@/utils/hooks/useClickQutside.js'

  // 切换语言弹窗
  const dropdownChangeLanRef = ref(null)
  const showChangeLanPop = ref(false)
  const isClickOutsideChange = useClickQutside(dropdownChangeLanRef)
  watch(isClickOutsideChange, () => {
    if (isClickOutsideChange.value && showChangeLanPop.value) {
      showChangeLanPop.value = false
    }
  })

  // 下载弹窗
  const dropdownDownloadRef = ref(null)
  const showDownloadPop = ref(false)
  const isClickOutsideDownload = useClickQutside(dropdownDownloadRef)
  watch(isClickOutsideDownload, () => {
    if (isClickOutsideDownload.value && showDownloadPop.value) {
      showDownloadPop.value = false
    }
  })

  const state = reactive({
    showAccountLogin: true, // 账号密码登录页
    languageCh: true, // 中文
    scanCodeError: true // 二维码失效
  })
  // 切换语言
  const changeLanguage = locale => {
    I18n.global.locale = locale
    state.languageCh = locale === 'ch'
  }

  // 监听 切换语言展示弹窗
  const changeLangToop = () => {
    showChangeLanPop.value = !showChangeLanPop.value
  }

  // 监听 下载展示弹窗
  const downloadToop = () => {
    showDownloadPop.value = !showDownloadPop.value
  }

  // 监听 登录方式切换
  const changeLogin = () => {
    state.showAccountLogin = !state.showAccountLogin
  }

  // 监听 二维码刷新
  const updateScanCode = () => {
    state.scanCodeError = false
  }

  onMounted(() => {})
</script>

<style lang="scss" scoped>
  .container-login {
    height: 100vh;
    width: 100vw;
    // min-width: 1000px;
    // min-height: 800px;
    padding: 30px 40px 20px 60px;
    background: #f5f6f7;

    .header-login {
      display: flex;
      justify-content: space-between;

      .logo {
        width: 118px;
        height: 38px;
      }

      .left {
        display: flex;
        font-family: Helvetica;
        font-size: 14px;
        color: #303133;
        .down {
          position: relative;
          .down-t {
            display: flex;
            align-items: center;
            font-family: Helvetica;
            font-size: 14px;
            cursor: pointer;
            width: 160px;
            height: 100%;
            .icon {
              width: 16px;
              height: 16px;
              vertical-align: middle;
              margin-right: 6px;
            }
          }

          .selected-toop {
            color: #d0963e;
            .icon {
              background: url(../../assets/images/login/phone_icon_hover.png)
                no-repeat center center;
              background-size: 100%;
            }
          }

          .no-selected {
            color: #303133;
            .icon {
              background: url(../../assets/images/login/phone_icon.png)
                no-repeat center center;
              background-size: 100%;
            }
          }

          .tooltip-down {
            position: absolute;
            top: 52px;
            left: -280px;
            width: 420px;
            background: #ffffff;
            border-radius: 4px;
            border: 1px solid #f0f0f0;
            box-shadow: 0 -8px 20px 0 rgba(19, 59, 99, 0.07);
            padding: 8px 0;
            z-index: 9999;

            &::before {
              content: '';
              position: absolute;
              top: -20px;
              left: 80%;
              width: 0;
              height: 0;
              border-bottom: 12px solid #ffffff;
              border-left: 12px solid transparent;
              border-top: 12px solid transparent;
              border-right: 12px solid transparent;
              border-radius: 2px;
            }

            .qrcode {
              display: flex;
              justify-content: space-between;
              padding: 20px 46px;

              .box {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                .code {
                  width: 140px;
                  height: 140px;
                  background: url(../../assets/images/login/test.png) no-repeat
                    center center;
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
        }

        .language {
          position: relative;
          cursor: pointer;

          .common-btn {
            padding: 0px 30px 0px 14px;
            line-height: 36px;
            font-family: Helvetica;
            font-size: 14px;
            border-radius: 4px;
            width: 105px;
            text-align: center;
            &::after {
              content: '';
              position: absolute;
              right: 10px;
              transform: translateY(-50%);
              width: 0;
              height: 0;
              border-left: 6px solid transparent;
              border-right: 6px solid transparent;
              border-radius: 2px;
            }
          }

          .open-toop {
            color: #d0963e;
            border: 1px solid #d0963e;

            &::after {
              top: 60%;
              border-top: 6px solid rgba($color: #d0963e, $alpha: 0.8);
              border-bottom: 6px solid transparent;
            }
          }

          .close-toop {
            color: #303133;
            border: 1px solid #909399;
            &::after {
              top: 40%;
              border-top: 6px solid transparent;
              border-bottom: 6px solid rgba($color: #303133, $alpha: 0.8);
            }
          }

          .tooltip-lan {
            position: absolute;
            top: 50px;
            left: -6px;
            width: 120px;
            background: #ffffff;
            border-radius: 4px;
            border: 1px solid #f0f0f0;
            box-shadow: 0 -8px 20px 0 rgba(19, 59, 99, 0.07);
            padding: 8px 0;

            &::before {
              content: '';
              position: absolute;
              top: -20px;
              left: 50%;
              transform: translateX(-50%);
              width: 0;
              height: 0;
              border-bottom: 12px solid #ffffff;
              border-left: 12px solid transparent;
              border-top: 12px solid transparent;
              border-right: 12px solid transparent;
              border-radius: 4px;
            }

            .item {
              font-family: Helvetica;
              font-size: 14px;
              color: #333333;
              letter-spacing: 0;
              line-height: 32px;
              text-align: center;
              &:hover {
                border-radius: 4px;
                color: #d0963e;
              }
            }
          }
        }
      }
    }

    .content-login {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      // height: 530px;
      height: 450px;
      width: 504px;
      background: #ffffff;
      border: 1px solid #f0f0f0;
      box-shadow: 0 8px 100px 0 rgba(19, 59, 99, 0.07);
      border-radius: 4px;
      margin: auto;
      z-index: 99;

      .login-type {
        width: 80px;
        height: 80px;
        position: absolute;
        top: 0;
        right: 0;
        cursor: pointer;
        font-family: Helvetica-Bold;
        font-weight: 700;
        font-size: 14px;
        color: #fafafa;
        letter-spacing: 0;
        line-height: 50px;
        text-align: center;

        .l-type-tip {
          display: none;
          position: absolute;
          // left: -130px;
          top: 20px;
          min-width: 127px;
          // padding: 0 4px;
          height: 50px;
          background: #d0963e;
          box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.12);
          border-radius: 2px;

          &::after {
            content: '';
            position: absolute;
            right: -20px;
            top: 50%;
            transform: translateY(-50%);
            width: 0;
            height: 0;
            border-radius: 2px;
            border-right: 10px solid transparent;
            border-left: 10px solid #d0963e;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
          }
        }

        .tip-left {
          left: -180px;
          padding: 0 10px;
        }

        .tip {
          left: -130px;
        }
      }

      .login-type:hover {
        .l-type-tip {
          display: block;
        }
      }

      .account-icon {
        background: url(../../assets/images/login/ercode.png) no-repeat center
          center;
        background-size: 100%;
      }

      .code-icon {
        background: url(../../assets/images/login/account.png) no-repeat center
          center;
        background-size: 100%;
      }

      .l-scan-box {
        text-align: center;
        .scan-title {
          font-family: Helvetica-Bold;
          font-weight: 700;
          font-size: 22px;
          color: #303133;
          margin-top: 90px;
        }

        .scan-msg {
          font-family: Helvetica;
          font-size: 14px;
          color: #909399;
          margin: 40px 0 20px 0;
        }

        .scan-code {
          display: flex;
          padding: 0 50px;
          .code {
            position: relative;
            width: 214px;
            height: 214px;
            background: #ffffff;
            border: 1px solid #f0f0f0;
            border-radius: 8px;
            background: url(../../assets/images/login/test.png) no-repeat center
              center;
            background-size: 100%;
          }

          .mask-code {
            position: absolute;
            top: 0;
            left: 0;
            width: 214px;
            height: 214px;
            opacity: 0.8;
            background: #303133;
            border-radius: 8px;
          }

          .mask-top {
            position: absolute;
            top: 0;
            left: 0;
            width: 214px;
            height: 214px;
            .mask-title {
              font-family: Helvetica-Bold;
              font-weight: 700;
              font-size: 16px;
              color: #fafafa;
              text-align: center;
              margin: 60px 0 22px 0;
            }

            .mask-btn {
              width: 120px;
              height: 50px;
              background: #ffffff;
              border-radius: 4px;
              margin: auto;
              color: #606266;
              line-height: 50px;
              text-align: center;
              cursor: pointer;
            }
          }
          .scan-bg {
            height: 206px;
            width: 168px;
            margin-left: 4px;
            background: url(../../assets/images/login/l_scan_bg.png) no-repeat
              center center;
            background-size: 100%;
          }
        }
      }
    }

    .footer-login {
      position: fixed;
      bottom: 40px;
      left: 0;
      width: 100%;
      text-align: center;
      font-family: Helvetica;
      font-size: 12px;
      color: #606266;
    }

    .user-select {
      -webkit-user-select: none;
      -moz-user-select: none;
      user-select: none;
    }
  }
</style>
