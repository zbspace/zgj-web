<!--
* @Descripttion 登录页面
* @FileName account.vue
* @Author WalterXsk
* @LastEditTime 2023-03-09 11:33:37
!-->
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
              </div>
            </div>
            <div class="tip">
              {{ $t('t-zgj-tips.downAppTips1')
              }}{{ $t('t-zgj-tips.downAppTips2') }}
            </div>
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
            <div class="item user-select" @click="changeLanguage('ch')">
              简体中文
            </div>
            <div class="item user-select" @click="changeLanguage('en')">
              English
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- content -->
    <div class="content-login" v-show="!state.chooseDepartBox">
      <div class="login-type" @click="changeLogin">
        <!-- :class="state.showAccountLogin ? 'account-icon' : 'code-icon'" -->
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          v-show="!state.showAccountLogin"
        >
          <path
            opacity="0.600028"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0 0H76C78.2091 0 80 1.79086 80 4V80L0 0Z"
            fill="var(--jy-primary-6)"
          />
          <mask
            id="mask0_2118_64756"
            style="mask-type: luminance"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="80"
            height="80"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0 0H76C78.2091 0 80 1.79086 80 4V80L0 0Z"
              fill="white"
            />
          </mask>
          <g mask="url(#mask0_2118_64756)">
            <rect
              opacity="0.01"
              x="17"
              y="8"
              width="52"
              height="52"
              fill="white"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M21.9211 10H64.0797C68.4473 10 72.0008 13.827 72 18.5309V42.6463C72 47.3501 68.4465 51.1771 64.0789 51.1771H44.8208V56.0789H59.0145C60.02 56.0789 60.8349 56.9565 60.8349 58.0395C60.8349 59.1224 60.02 60 59.0145 60H26.987C25.9815 60 25.1666 59.1224 25.1666 58.0395C25.1666 56.9565 25.9815 56.0789 26.987 56.0789H41.1792V51.1771H21.9211C17.5535 51.1771 14 47.3501 14 42.6463V18.5309C14 13.827 17.5535 10 21.9211 10ZM60.3048 47C63.9966 47 67 43.7658 67 39.7904H66.9992V21.2096C66.9992 17.2342 63.9959 14 60.3041 14H24.6952C21.0034 14 18 17.2342 18 21.2096V39.7904C18 43.7658 21.0034 47 24.6952 47H60.3048Z"
              fill="white"
            />
            <path
              d="M60.808 18H25.192C23.4322 18 22 19.5749 22 21.5102V40.4898C22 42.4251 23.4322 44 25.192 44H60.808C62.5678 44 64 42.4251 64 40.4898V21.511C64 19.5749 62.5686 18 60.808 18Z"
              fill="white"
            />
          </g>
        </svg>

        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.600028"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0 0H76C78.2091 0 80 1.79086 80 4V80L0 0Z"
            fill="var(--jy-primary-6)"
            v-show="state.showAccountLogin"
          />
          <mask
            id="mask0_2118_64493"
            style="mask-type: luminance"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="80"
            height="80"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0 0H76C78.2091 0 80 1.79086 80 4V80L0 0Z"
              fill="white"
            />
          </mask>
          <g mask="url(#mask0_2118_64493)">
            <rect
              opacity="0.01"
              x="20"
              y="8"
              width="52"
              height="52"
              fill="white"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M24 13H40.6221V23.755H46.4883V28.6457H40.6221H29.8695V34.5132H24V28.6457V13ZM52.3285 28.6457V34.5132H46.4883V28.6457H52.3285ZM52.3578 28.6424H52.3285V28.6457H52.3578V34.5132V40.3775H46.4883V45.2682H57.2409V51.1357V57H68V51.1357H63.1104V45.2682H68V40.3775V34.5132H63.1104H57.2442V34.51H63.1104L63.1104 28.6457H68V13H52.3578H46.4883V17.8874H52.3578V28.6424ZM52.3578 28.6424H57.2442V34.51H57.2409V28.6457H52.3578V28.6424ZM63.1104 40.3775H62.1305H57.2409V40.3807H63.1104L63.1104 40.3775ZM55.2649 15.9305H55.2877V15.9338H55.2649V15.9305ZM65.0376 15.9338H55.2877V25.7087H55.2649V25.7119L55.2877 25.7119V25.7087H65.0376V15.9338ZM65.0376 15.9338V15.9305H65.0604V25.7119L65.0408 25.7119V15.9338H65.0376ZM37.6922 25.7119L37.689 25.7119V15.9338H37.6922V25.7119ZM27.9097 15.9338V15.9305H37.689V15.9338H27.9097ZM27.9097 15.9338V25.7119L27.7502 25.7119V15.9338H27.9097ZM57.2181 17.8874H63.0843V23.7582H57.2181V17.8874ZM29.736 17.8874H35.6999V23.7582H29.736V17.8874ZM35.5697 45.2682H29.7035V51.139H35.5697V45.2682ZM24 40.3775H35.7325V34.5132H40.6188V40.3775V57H24V40.3775ZM37.689 53.0894H27.9097V43.3145H37.689V53.0894ZM52.3578 51.1357H46.4883V57H52.3578V51.1357Z"
              fill="white"
            />
          </g>
        </svg>

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
        <VAccountLogin
          v-model="state.chooseDepartBox"
          :departLists="departLists"
          @update:departLists="departLists = $event"
          @getWater="getWater"
        ></VAccountLogin>
      </div>

      <!-- 登录-扫码 -->
      <div v-show="!state.showAccountLogin" class="l-scan-box">
        <!-- title -->
        <div class="scan-title user-select">{{ $t('t-scan-login') }}</div>

        <!-- msg -->
        <div class="scan-msg user-select">{{ $t('t-zgj-login.scan') }}</div>

        <!-- 二维码 -->
        <div class="scan-code">
          <div class="code">
            <div id="qrCodeBox"></div>
            <div :style="{ display: state.scanCodeError ? 'block' : 'none' }">
              <div class="mask-code"></div>
              <div class="mask-top user-select">
                <!-- 二维码已失效 -->
                <div class="mask-title"> {{ $t('t-scan-code-error') }}</div>

                <!-- 刷新 -->
                <div class="mask-btn" @click="updateScanCode">
                  {{ $t('t-zgj-refesh') }}
                </div>
              </div>
            </div>
            <div :style="{ display: state.scanCodeSuccess ? 'block' : 'none' }">
              <div class="mask-code"></div>
              <div class="mask-top user-select">
                <!-- 二维码已失效 -->
                <div class="mask-title"> 待手机端确认 </div>

                <!-- 刷新 -->
                <!-- <div class="mask-btn">{{ $t('t-zgj-refesh') }}</div> -->
              </div>
            </div>
          </div>
          <div class="scan-bg"></div>
        </div>
      </div>
    </div>
    <!-- 企业选择 -->
    <div v-show="state.chooseDepartBox" class="depart-content">
      <div class="depart-title">
        您的账号已经加入<span>&nbsp;{{ departLists.length }}&nbsp; </span>
        家企业，请选择
      </div>

      <div class="depart-cont">
        <div v-for="(item, i) in departLists" :key="i">
          <div class="column" @click="selectOrgan(item.tenantId)">
            <svg
              width="16"
              height="14"
              viewBox="0 0 16 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.99984 12.6667H9.33317V4L13.5958 5.82667C13.7158 5.87811 13.8181 5.96365 13.8899 6.07269C13.9617 6.18172 14 6.30944 13.9998 6.44V12.6667H15.3332V14H0.666504V12.6667H1.99984V3.76667C1.99982 3.63768 2.03722 3.51145 2.10751 3.4033C2.1778 3.29514 2.27796 3.2097 2.39584 3.15733L7.53117 0.874667C7.58198 0.852096 7.63762 0.842591 7.69303 0.847015C7.74845 0.85144 7.80188 0.869654 7.84846 0.900001C7.89504 0.930347 7.93329 0.971861 7.95973 1.02076C7.98617 1.06967 7.99996 1.12441 7.99984 1.18V12.6667Z"
                fill="black"
                fill-opacity="0.65"
              />
            </svg>
            {{ item.tenantName }}
          </div>
        </div>
      </div>
      <div class="depart-back">
        <svg
          width="12"
          height="10"
          viewBox="0 0 12 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 8.88906L7.92697 5L12 1.11094L10.8365 -5.08576e-08L5.6 5L10.8365 10L12 8.88906ZM6.4 8.88907L2.32698 5L6.4 1.11094L5.23652 4.09996e-06L4.54981e-06 5L5.23652 10L6.4 8.88907Z"
            fill="#3E78D0"
          />
        </svg>
        <span class="go-back" @click="state.chooseDepartBox = false">
          返回登录页
        </span>
      </div>
    </div>

    <!-- footer -->
    <div class="footer-login">
      Copyright@2012-2023 章管家
      <a
        style="font-size: 12px"
        href="https://beian.miit.gov.cn"
        target="_blank"
        >沪ICP备13006057号-6</a
      >
      上海建业信息科技股份有限公司
    </div>
  </div>
</template>

<script setup>
  import I18n from '@/utils/i18n'
  import { reactive, onMounted, ref, watch, onBeforeUnmount } from 'vue'
  import VAccountLogin from './modules/AccountLogin.vue'
  import useClickQutside from '@/utils/useClickQutside.js'
  import { useRouter, useRoute } from 'vue-router'
  import loginApi from '@/api/login'
  import companyApi from '@/api/system/companyManagement/companyInfo'
  import { setWaterMark, removeWatermark } from '@/utils/water'
  import dayjs from 'dayjs'
  import { useAccountInfoStore } from '@/store/accountInfo'
  import navBarApi from '@/api/common/navbar.js'
  import { useMenusInfoStore } from '@/store/menus'
  import { useHomeLogoUrl } from '@/store/logo'
  import { getItem, setItem } from '@/utils/storage'
  import QRCode from 'qrcodejs2-fix'
  import { ElMessage } from 'element-plus'

  const accountInfo = useAccountInfoStore()
  const menusInfoStore = useMenusInfoStore()
  const homeLogoUrl = useHomeLogoUrl()
  const router = useRouter()
  const route = useRoute()

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
    scanCodeError: false, // 二维码失效
    scanCodeSuccess: false, // 二维码待确认
    chooseDepartBox: false
  })
  const departLists = ref([])
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
    // 刷新二维码
    if (!state.showAccountLogin) {
      getQrCode()
    }
  }

  const timer = ref(null)
  const qrCodeQuery = ref('')
  const getQrCode = async () => {
    const result = await loginApi.qrCode()
    qrCodeQuery.value = result.data
    // 清空该元素内内容
    document.getElementById('qrCodeBox').innerHTML = ''
    // eslint-disable-next-line no-new
    new QRCode(document.getElementById('qrCodeBox'), {
      text: result.data,
      width: 180, // 二维码宽
      height: 180 // 二维码高
    })
    clearInterval(timer.value)
    // 递归查询扫码状态
    intervalTime()
    // 无伤大雅
    state.scanCodeError = false
  }

  const getQrCodeStatus = () => {
    loginApi.qrCodeStatus({ qrCodeToken: qrCodeQuery.value }).then(res => {
      if (res.code === 210203) {
        // console.log('未被扫描')
      } else if (res.code === 210207) {
        state.scanCodeError = true
        clearInterval(timer.value)
      } else if (res.code === 210204) {
        state.scanCodeSuccess = true
      } else if (res.code === 210208) {
        ElMessage.waring(res.msg)
      } else if (res.code === 200) {
        state.scanCodeSuccess = false
        getLoginTenantList(res)
        clearInterval(timer.value)
      }
    })
  }

  const intervalTime = () => {
    timer.value = setInterval(() => {
      getQrCodeStatus()
    }, 1000)
  }
  // 监听 二维码刷新
  const updateScanCode = () => {
    getQrCode()
  }

  // 选择企业
  const selectOrgan = tenantId => {
    loginApi.chooseOrgan(tenantId).then(async res => {
      setItem('tenantId', tenantId)

      const redirect = getRedirect()
      menusInfoStore.currentType =
        redirect.indexOf('/system') > -1 ? 'system' : 'business'
      await menusInfoStore.setMenus()

      getUserLoginInfo(false)
    })
  }

  function getWater(isOneDepart) {
    companyApi.getTenantInfo().then(res => {
      if (res.data.tenantShowInfo && res.data.tenantShowInfo.homeLogoPath) {
        homeLogoUrl.setHomeUrl(res.data.tenantShowInfo.homeLogoPath)
      }
      if (res.data.tenantShowInfo) {
        setItem('watermark', res.data.tenantShowInfo.pageWatermark)
      } else {
        setItem('watermark', '1')
      }
      if (String(getItem('watermark')) === '1') {
        const text =
          getItem('accountInfo').userInfo.userName +
          ' ' +
          dayjs().format('YYYY-MM-DD HH:mm')
        setWaterMark(text)
      } else {
        removeWatermark()
      }
      if (isOneDepart) {
        accountInfo.setOneDeaprtTitle(res.data && res.data.tenant.tenantTitle)
      } else {
        accountInfo.setOneDeaprtTitle()
      }

      goHome()
    })
  }

  const getRedirect = () => {
    return route.query.redirect
      ? decodeURIComponent(route.query.redirect)
      : '/frontDesk/home'
  }
  const goHome = () => {
    const redirect = getRedirect()
    router.replace(redirect)
  }

  // 扫码成功后 处理登录状态
  const getLoginTenantList = loginResult => {
    // 存储登录用户信息
    accountInfo.setToken({
      token: loginResult.data.tokenValue
    })
    loginApi.tenantInfoList().then(async departListResult => {
      setItem('departLists', JSON.stringify(departListResult.data))
      const index = departListResult.data.findIndex(
        i => i.tenantId === loginResult.data.lastTenantId
      )
      if (index === -1) {
        if (departListResult.data && departListResult.data.length === 1) {
          // 初始化 且 一个企业
          loginApi
            .chooseOrgan(departListResult.data[0].tenantId)
            .then(async () => {
              setItem('tenantId', departListResult.data[0].tenantId)
              const redirect = getRedirect()
              menusInfoStore.currentType =
                redirect.indexOf('/system') > -1 ? 'system' : 'business'
              await menusInfoStore.setMenus()
              getUserLoginInfo(true)
            })
        } else {
          // 进入列表选择页面
          state.chooseDepartBox = true
          departLists.value = departListResult.data
        }
      } else {
        // 已经选择企业
        const redirect = getRedirect()
        menusInfoStore.currentType =
          redirect.indexOf('/system') > -1 ? 'system' : 'business'
        await menusInfoStore.setMenus()

        setItem('tenantId', loginResult.data.lastTenantId)
        if (departListResult.data && departListResult.data.length === 1) {
          getUserLoginInfo(true)
        } else {
          getUserLoginInfo(false)
        }
      }
    })
  }

  const getUserLoginInfo = bool => {
    // 获取用户信息 - 缓存
    navBarApi.getUserInfo().then(userInfo => {
      const obj = {
        userId: userInfo.data && userInfo.data.userId,
        userName: userInfo.data && userInfo.data.userName
      }
      accountInfo.setUserInfo(obj)
      getWater(bool)
      // goHome()
    })
  }
  onMounted(() => {})

  onBeforeUnmount(() => {
    state.chooseDepartBox = false
  })
</script>
<script>
  export default {
    name: 'LoginAccount'
  }
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
            color: var(--jy-primary-6);
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
            left: -220px;
            width: 340px;
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
              // display: flex;
              // justify-content: space-between;
              padding: 12px 26px;

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
              padding: 0px 8px 8px 8px;
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
            color: var(--jy-primary-6);
            border: 1px solid var(--jy-primary-6);

            &::after {
              top: 60%;
              border-top: 6px solid
                rgba($color: var(--jy-primary-6), $alpha: 0.8);
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
                color: var(--jy-primary-6);
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
          background: var(--jy-primary-6);
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
            border-left: 10px solid var(--jy-primary-6);
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
            // background: url(../../assets/images/login/test.png) no-repeat center
            //   center;
            // background-size: 100%;
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

    .depart-content {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      display: flex;
      flex-direction: column;
      width: 503px;
      height: 530px;
      background: #ffffff;
      border: 1px solid #f0f0f0;
      box-shadow: 0px 8px 100px rgba(19, 59, 99, 0.0711593);
      border-radius: 4px;
      padding: 44px 40px 22px;

      .depart-title {
        font-size: 22px;
        line-height: 30px;
        text-align: center;
        color: var(--jy-primary-6);
        padding-bottom: 16px;
      }

      .depart-cont {
        flex: 1;
        overflow-y: auto;

        &::-webkit-scrollbar {
          width: 0 !important;
        }

        & {
          -ms-overflow-style: none;
          overflow: -moz-scrollbars-none;
        }
        .column {
          cursor: pointer;
          margin-top: 24px;
          color: rgba(0, 0, 0, 0.85);
          font-size: 16px;
          &:hover {
            color: var(--jy-primary-6);
            svg {
              position: relative;
              left: -80px;
              filter: drop-shadow(var(--jy-primary-6) 80px 0);
            }
          }
        }
      }

      .depart-back {
        text-align: center;

        .go-back {
          color: #3e78d0;
          text-align: center;
          font-weight: 400;
          font-size: 14px;
          line-height: 22px;
          margin-left: 4px;
          cursor: pointer;
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
  #qrCodeBox {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
</style>
