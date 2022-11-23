<template>
  <div class="container-login">
    
    <!-- header -->
    <div class="header-login">
      <img class="logo" src="../../assets/images/login/logo.png" />
      <div class="left">
        <!-- 下载 -->
        <div class="down">
          <div class="down-t" @click="downloadToop" :class="state.showDownToop ? 'selected-toop' : 'no-selected'">
            <div class="icon"></div>
            <div class="user-select">{{ $t('t-zgj-DownloadApp.Download')}}</div>
          </div>

          <div class="tooltip-down" :style="{'display': state.showDownToop ? 'block' : 'none'}">
            <div class="qrcode">

              <div class="ios box">
                <div class="code"></div>
                <div class="title">
                  <img src="../../assets/images/login/ios_down.svg" />
                  <div>{{ $t('t-zgj-DownloadApp.IOS')}}</div>
                </div>
              </div>

              <div class="android box">
                <div class="code"></div>
                <div class="title">
                  <img src="../../assets/images/login/android_down.svg" />
                  <div>{{ $t('t-zgj-DownloadApp.Android')}}</div>
                </div>
              </div>
              
            </div>
            <div class="tip">{{ $t('t-zgj-tips.downAppTips1')}}</div>
            <div class="tip">{{ $t('t-zgj-tips.downAppTips2')}}</div>
          </div>
        </div>
        
        <!-- 切换语言 -->
        <div class="language" @click="changeLangToop">
          <div class="common-btn user-select" :class="state.showLangToop ? 'open-toop' : 'close-toop'">{{ $t("l-language") }}</div>
          <div class="tooltip-lan" :style="{'display': state.showLangToop ? 'block' : 'none'}">
            <div class="item user-select" @click="changeLanguage('ch')">简体中文</div>
            <div class="item user-select" @click="changeLanguage('en')">English</div>
          </div>
        </div>

      </div>
    </div>

    <!-- content -->
    <div class="content-login">
      <div class="login-type" @click="changeLogin" :class="state.showAccountLogin ? 'account-icon' : 'code-icon'"></div>

      <!-- 登录-账号密码 -->
      <div v-show="state.showAccountLogin">
        <VAccountLogin></VAccountLogin>
      </div>

      <!-- 登录-扫码 -->
      <div v-show="!state.showAccountLogin">2</div>
    </div>

    <!-- footer -->
    <div class="footer-login">Copyright@2012-2022  章管家  沪ICP备13006057号-6  上海建业信息科技股份有限公司</div>
  </div>
</template>

<script setup>
import  I18n from "../../i18n";
import { reactive } from "vue";
import VAccountLogin from "./modules/account_login.vue"
const state = reactive({
  showDownToop: false, // 下载弹窗
  showLangToop: false, // 切换语言弹窗
  showAccountLogin: true, // 账号密码登录页
})
// 切换语言
const changeLanguage = (locale) => {
  I18n.global.locale = locale
}

// 监听 切换语言展示弹窗
const changeLangToop = () => {
  state.showLangToop = !state.showLangToop;
}

// 监听 下载展示弹窗
const downloadToop = () => {
  state.showDownToop = !state.showDownToop;
}

// 监听 登录方式切换
const changeLogin = () => {
  state.showAccountLogin = !state.showAccountLogin;
}

</script>

<style lang="scss" scoped>
  .container-login {
    height: 100vh;
    width: 100vw;
    min-width: 1000px;
    min-height: 800px;
    padding: 30px 40px 20px 60px;
    background: #F5F6F7;

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
            color: #D0963E;
            .icon {
              background: url(../../assets/images/login/phone_icon_hover.png) no-repeat center center;
              background-size: 100%;
            }
          }

          .no-selected {
            color: #303133;
            .icon {
              background: url(../../assets/images/login/phone_icon.png) no-repeat center center;
              background-size: 100%;
            }
          }

          .tooltip-down {
            position: absolute;
            top: 52px;
            left: -280px;
            width: 420px;
            background: #FFFFFF;
            border-radius: 4px;
            border: 1px solid #F0F0F0;
            box-shadow: 0 -8px 20px 0 rgba(19,59,99,0.07);
            padding: 8px 0;
            z-index: 9999;

            &::before {
              content: "";
              position: absolute;
              top: -20px;
              left: 80%;
              width: 0;
              height: 0;
              border-bottom: 12px solid #FFFFFF;
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
                  background: url(../../assets/images/login/test.png) no-repeat center center;
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
              content: "";
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
            color: #D0963E;
            border: 1px solid #D0963E;

            &::after {
              top: 60%;
              border-top: 6px solid rgba($color: #D0963E, $alpha: 0.8);
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
            left: 0;
            width: 106px;
            background: #FFFFFF;
            border-radius: 4px;
            border: 1px solid #F0F0F0;
            box-shadow: 0 -8px 20px 0 rgba(19,59,99,0.07);
            padding: 8px 0;
            
            &::before {
              content: "";
              position: absolute;
              top: -20px;
              left: 50%;
              transform: translateX(-50%);
              width: 0;
              height: 0;
              border-bottom: 12px solid #FFFFFF;
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
      height: 530px;
      width: 504px;
      background: #FFFFFF;
      border: 1px solid #F0F0F0;
      box-shadow: 0 8px 100px 0 rgba(19,59,99,0.07);
      border-radius: 4px;
      margin: auto;

      .login-type{
        width: 80px;
        height: 80px;
        position: absolute;
        top: 0;
        right: 0;
      }

      .account-icon {
        background: url(../../assets/images/login/ercode.png) no-repeat center center;
        background-size: 100%;
      }

      .code-icon {
        background: url(../../assets/images/login/account.png) no-repeat center center;
        background-size: 100%;
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