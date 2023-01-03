<template>
  <header id="page-topbar">
    <div class="layout-width user-select">
      <div class="navbar-header header-content">
        <div class="d-flex">
          <!-- LOGO -->
          <div class="navbar-brand-box horizontal-logo logo-p-t">
            <router-link
              to="/"
              class="logo logo-dark"
            >
              <span class="logo-sm">
                <img
                  src="@/assets/icon/logo.png"
                  alt=""
                  height="22"
                >
              </span>
              <span class="logo-lg">
                <img
                  src="@/assets/icon/logo.png"
                  alt=""
                  height="37"
                >
              </span>
            </router-link>

            <router-link
              to="/"
              class="logo logo-light"
            >
              <span class="logo-sm">
                <img
                  src="@/assets/icon/logo.png"
                  alt=""
                  height="22"
                >
              </span>
              <span class="logo-lg">
                <img
                  src="@/assets/icon/logo.png"
                  alt=""
                  height="17"
                >
              </span>
            </router-link>
          </div>

          <!-- 菜单开关 -->
          <button
            type="button"
            class="
              btn btn-sm
              px-3
              fs-16
              header-item
              vertical-menu-btn
              "
            id="topnav-hamburger-icon"
            @click="toggleHamburgerMenu"
          >
            <!-- topnav-hamburger -->
            <span class="hamburger-icon">
              <span />
              <span />
              <span />
            </span>
          </button>

          <!-- 公司选择 -->
          <form class="app-search d-none d-md-block">
            <div class="ap-dropdown">
              <el-dropdown trigger="click">
                <span class="ap-dropdown-text">
                  <span>上海建业科技股份有限公司</span>&nbsp;&nbsp;
                  <i class="ri-arrow-down-s-line" />
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <div class="ap-enterprise">
                      <div class="ap-enterprise-text">
                        <div class="ap-enterprise-text-list">
                          企业/组织/团队
                        </div>
                      </div>
                      <div class="ap-enterprise-cont">
                        <el-dropdown-item>
                          <div class="ap-enterprise-cont-list">
                            上海建业科技股份有限公司
                            <div class="defart-selected" />
                          </div>
                        </el-dropdown-item>
                        <el-dropdown-item>
                          <div class="ap-enterprise-cont-list">
                            杭州好运科技股份有限公司
                          </div>
                        </el-dropdown-item>
                      </div>
                    </div>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </form>
        </div>

        <div class="d-flex align-items-center">
          <!-- 系统 -->
          <div class="ap-sys">
            <div
              class="ap-sys-but"
              @click="changeSystemHome"
            >
              <div v-if="state.application.CurrentSystemType == 'business'">
                <img
                  class="ap-sys-but-icon"
                  src="../assets/icon/system-setup.png"
                  alt=""
                  srcset=""
                >
                <span class="ap-sys-but-text">{{ $t('t-back-system-platform') }}</span>
              </div>

              <div v-if="state.application.CurrentSystemType == 'system'">
                <img
                  class="ap-sys-but-icon"
                  src="../assets/images/navbar/nav_front_home.svg"
                  alt=""
                  srcset=""
                >
                <span class="ap-sys-but-text">{{ $t('t-front-platform') }}</span>
              </div>
            </div>
          </div>

          <!-- 帮助 -->
          <div
            class="ms-1 header-item d-none d-sm-flex"
            ref="dropdownHelpRef"
          >
            <button
              type="button"
              class="btn btn-icon btn-topbar btn-ghost-secondary"
              data-toggle="fullscreen"
              @click="showHelpPop = !showHelpPop"
            >
              <el-tooltip
                class="box-item"
                effect="dark"
                :content="$t('t-help-center')"
                placement="bottom"
                :show-arrow="true"
              >
                <div>
                  <img
                    v-show="showHelpPop"
                    src="../assets/images/navbar/help_select_icon.svg"
                  >
                  <img
                    v-show="!showHelpPop"
                    src="../assets/images/navbar/help_icon.svg"
                  >
                </div>
              </el-tooltip>
            </button>
          </div>

          <!-- 信息 -->
          <VMailNav />

          <!-- 消息 -->
          <VMessageNav />

          <!-- 应用入口 -->
          <VApplicationNav />

          <!-- 用户信息 -->
          <div
            class="dropdown topbar-head-dropdown ms-1 header-item"
            ref="dropdownUserRef"
          >
            <button
              type="button"
              class="btn btn-icon btn-topbar btn-ghost-secondary ap-personalCenter"
              id="page-header-cart-dropdown"
              data-bs-toggle="dropdown"
              data-bs-auto-close="outside"
              aria-haspopup="true"
              aria-expanded="false"
              @click="showUserInfoPop = !showUserInfoPop"
            >
              <div class="ap-personalCenter-text">
                <span class="ap-personalCenter-name">春青</span>
                <img
                  v-show="showUserInfoPop"
                  src="../assets/images/navbar/user_info_close.svg"
                >
                <img
                  v-show="!showUserInfoPop"
                  src="../assets/images/navbar/user_info_open.svg"
                >
              </div>
            </button>
            <div
              class="dropdown-menu dropdown-menu-xl dropdown-menu-end p-0 dropdown-menu-cart"
              aria-labelledby="page-header-cart-dropdown"
              style="width: 240px;"
            >
              <div class="ap-personalCenterDropdown">
                <div class="dropdown-box">
                  <div class="dropdown-name">
                    <div class="dropdown-name-icon">
                      春青
                    </div>
                    <div class="dropdown-name-text">
                      {{ accountInfoStore.name }}
                    </div>
                  </div>
                </div>

                <div class="dropdown-list">
                  <div class="dropdown-list-li">
                    <img src="../assets/images/navbar/user_info_logo.svg">
                    <span class="dropdown-list-li-text">{{ $t('t-zgj-person.center') }}</span>
                  </div>

                  <div class="dropdown-list-li">
                    <img src="../assets/images/navbar/user_info_lock.svg">
                    <span class="dropdown-list-li-text">{{ $t('t-zgj-index.updatePwd') }}</span>
                  </div>

                  <div class="dropdown-list-li">
                    <img src="../assets/images/navbar/user_info_down.svg">
                    <span class="dropdown-list-li-text">{{ $t('t-zgj-DownloadApp.Download') }}</span>
                  </div>

                  <el-popover
                    trigger="hover"
                    placement="left-start"
                    :show-arrow="false"
                    :close-delay="80"
                    :visible="showChanglanPop"
                  >
                    <template #reference>
                      <div
                        class="dropdown-list-li"
                        :style="{ color: showChanglanPop ? '#D0963E' : 'rgba(0, 0, 0, 0.65)' }"
                        @click="showChanglanPop = true"
                      >
                        <img src="../assets/images/navbar/user_info_lan.svg">
                        <span class="dropdown-list-li-text">{{ $t('t-zgj-changeLang') }}</span>
                        <i class="ri-arrow-right-s-line" />
                      </div>
                    </template>
                    <div class="popover-cont ap-personalCenterPopover">
                      <div
                        class="popover-cont-list"
                        @click="setLanguage('ch')"
                        :class="state.language === 'ch' ? 'popover-selected' : ''"
                      >
                        简体中文
                      </div>
                      <div
                        class="popover-cont-list"
                        @click="setLanguage('en')"
                        :class="state.language === 'en' ? 'popover-selected' : ''"
                      >
                        English
                      </div>
                    </div>
                  </el-popover>

                  <div class="dropdown-list-li">
                    <img src="../assets/images/navbar/user_info_iphone.svg">
                    <span class="dropdown-list-li-text">{{ $t('t-zgj-mobile-app') }}</span>
                  </div>

                  <div
                    class="dropdown-list-li"
                    @click="handleLogout"
                  >
                    <img src="../assets/images/navbar/user_info_layout.svg">
                    <span class="dropdown-list-li-text">{{ $t('t-zgj-logout-user') }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import useCurrentInstance from '@/hooks/getInstance.js'
import i18n from '../i18n'
import useClickQutside from '../hooks/useClickQutside.js'
import VApplicationNav from '../components/modules/applicationNav.vue'
import VMailNav from '../components/modules/mailNav.vue'
import VMessageNav from '../components/modules/messageNav.vue'
import router from '@/router'
import { useAccountInfoStore } from '@/store/accountInfo'
const accountInfoStore = useAccountInfoStore()
const _this = useCurrentInstance()

const state = reactive({
  application: {
    CurrentSystemType: 'business' // business / system
  },
  language: i18n.global.locale
})

const CurrentSystemType = sessionStorage.getItem('CurrentSystemType')
if (CurrentSystemType) {
  state.application.CurrentSystemType = CurrentSystemType
}

onMounted(() => {
  // 添加监听 滚动事件
  document.addEventListener('scroll', function () {
    const pageTopbar = document.getElementById('page-topbar')
    if (pageTopbar) {
      document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50
        ? pageTopbar.classList.add(
          'topbar-shadow')
        : pageTopbar.classList.remove('topbar-shadow')
    }
  })

  // 添加 全屏开关监听 事件
  // if (document.getElementById("topnav-hamburger-icon"))
  //   document
  //     .getElementById("topnav-hamburger-icon")
  //     .addEventListener("click", toggleHamburgerMenu);
})

// 监听 菜单开关
const toggleHamburgerMenu = () => {
  const windowSize = document.documentElement.clientWidth

  if (windowSize > 767) { document.querySelector('.hamburger-icon').classList.toggle('open') }

  // For collapse horizontal menu
  if (
    document.documentElement.getAttribute('data-layout') === 'horizontal'
  ) {
    document.body.classList.contains('menu')
      ? document.body.classList.remove('menu')
      : document.body.classList.add('menu')
  }

  // For collapse vertical menu
  if (document.documentElement.getAttribute('data-layout') === 'vertical') {
    if (windowSize < 1025 && windowSize > 767) {
      document.body.classList.remove('vertical-sidebar-enable')
      document.documentElement.getAttribute('data-sidebar-size') == 'sm'
        ? document.documentElement.setAttribute('data-sidebar-size', '')
        : document.documentElement.setAttribute('data-sidebar-size', 'sm')
    } else if (windowSize > 1025) {
      document.body.classList.remove('vertical-sidebar-enable')
      document.documentElement.getAttribute('data-sidebar-size') == 'lg'
        ? document.documentElement.setAttribute('data-sidebar-size', 'sm')
        : document.documentElement.setAttribute('data-sidebar-size', 'lg')
    } else if (windowSize <= 767) {
      document.body.classList.add('vertical-sidebar-enable')
      document.documentElement.setAttribute('data-sidebar-size', 'lg')
    }
  }

  // Two column menu
  if (document.documentElement.getAttribute('data-layout') == 'twocolumn') {
    document.body.classList.contains('twocolumn-panel')
      ? document.body.classList.remove('twocolumn-panel')
      : document.body.classList.add('twocolumn-panel')
  }
}

// 切换中英文popover
const dropdownUserRef = ref(null)
const showChanglanPop = ref(false)
const showUserInfoPop = ref(false)
const isClickOutsideUser = useClickQutside(dropdownUserRef)
watch(isClickOutsideUser, () => {
  // 切换中英文
  if (isClickOutsideUser.value && showChanglanPop.value) {
    showChanglanPop.value = false
  }
  // 用户信息弹框
  if (isClickOutsideUser.value && showUserInfoPop.value) {
    showUserInfoPop.value = false
  }
})

const dropdownHelpRef = ref(null)
const showHelpPop = ref(false)
const isClickOutsideHelp = useClickQutside(dropdownHelpRef)
watch(isClickOutsideHelp, () => {
  // 帮助弹框
  if (isClickOutsideHelp.value && showHelpPop.value) {
    showHelpPop.value = false
  }
})

// const dropdownNotifyRef = ref(null)
// const showNotifyPop = ref(false)
// const isClickOutsideNotify = useClickQutside(dropdownNotifyRef)
// watch(isClickOutsideNotify, () => {
//   // 消息弹框
//   if (isClickOutsideNotify.value && showNotifyPop.value) {
//     showNotifyPop.value = false
//   }
//  })

// 切换 中英文
const setLanguage = (locale) => {
  i18n.global.locale = locale
  state.language = locale
  showChanglanPop.value = false
}

// 跳转业务首页或者系统首页
const changeSystemHome = () => {
  // 跳转业务首页或者系统首页
  if (state.application.CurrentSystemType === 'business') {
    _this.$router.push('/system/home')
  } else if (state.application.CurrentSystemType === 'system') {
    _this.$router.push('/frontDesk/home')
  }
}

const handleLogout = () => {
  accountInfoStore.setAccountInfo(null)
  // 跳转到登录页
  router.push({ name: 'login-account' })
}

</script>
<style lang='scss' scoped>
.header-content {
  min-width: 800px;
}

.nav-bar-iconpark {
  font-size: 22px;
}

.dropdown-item {
  display: flex;
  align-items: center;
}

.ap-dropdown {
  height: 100%;
  display: flex;
  align-items: center;

  .ap-dropdown-text {
    font-size: var(--font-size-title-1);
    font-weight: var(--font-weight-700);
    display: flex;
    align-items: center;
  }
}

.ap-sys {
  margin-right: 1rem;

  .ap-sys-but {
    border-radius: var(--border-radius-4);
    opacity: 1;
    border: 1px solid var(--primary-6);
    color: var(--primary-6);
    padding: 0.3rem 0.8rem;
    box-sizing: border-box;
    cursor: pointer;

    .ap-sys-but-icon {
      width: 1.5rem;
      margin-right: 0.3rem;
    }
  }
}

.ap-personalCenter {
  font-size: 14px;
  width: 88px;
  height: 42px;

  .ap-personalCenter-text {
    display: flex;
    align-items: center;
    cursor: pointer;

    .ap-personalCenter-name {
      @include mixin-width(34);
      @include mixin-height(34);
      border-radius: var(--border-radius-4);
      background-color: var(--primary-6);
      color: var(--in-common-use-1);
      // padding: 0.5rem 0.4rem;
      box-sizing: border-box;
      margin-right: 0.3rem;
      display: flex;
      align-items: center;
      align-content: center;
      justify-content: center;
      font-size: var(--font-size-body-1);
    }

  }

}

.ap-personalCenterDropdown {
  @include mixin-width(240);

  .dropdown-box {
    @include mixin-padding(10);
    box-sizing: border-box;
  }

  .dropdown-name {
    @include mixin-height(120);
    border-radius: var(--border-radius-4);
    background-color: #F4F5F7;
    text-align: center;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    flex-flow: wrap;

    .dropdown-name-icon {
      @include mixin-width(50);
      @include mixin-height(50);
      display: flex;
      align-items: center;
      align-content: center;
      justify-content: center;
      border-radius: var(--border-radius-4);
      background-color: #E2B062;
      color: var(--in-common-use-1);
      margin-bottom: 0.5rem;
    }

    .dropdown-name-text {
      width: 100%;
      font-weight: var(--font-weight-500);
      font-size: 16px;
    }
  }

  .dropdown-list {
    .dropdown-list-li {
      position: relative;
      padding: 0 20px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      cursor: pointer;
      color: rgba(0, 0, 0, 0.65);
      overflow: hidden;

      &:hover {
        color: #D0963E !important;

        img {
          position: relative;
          left: -80px;
          filter: drop-shadow(#D0963E 80px 0);
        }
      }

      i {
        position: absolute;
        right: 20px;
        top: 50%;
        font-size: 18px;
        transform: translateY(-50%);
      }
    }

    .dropdown-list-li-text {
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 44px;
      margin-left: 8px;
    }

    .dropdown-list-li:hover {
      background: rgba(192, 196, 204, 0.19829);
    }
  }

}

.ap-personalCenterPopover {

  .popover-cont-list {
    position: relative;
    // width: 150px;
    padding: 16px 24px;
    cursor: pointer;
  }

  .popover-cont-list:hover {
    background: rgba(192, 196, 204, 0.19829);
    color: #D0963E;
  }

  .popover-selected::after {
    content: "";
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    width: 12px;
    height: 8px;
    background: url(../assets/images/navbar/change_lan_icon.svg) no-repeat center center;
    background-size: 100%;
  }
}

.ap-enterprise {
  @include mixin-width(300);
  // padding: 1rem;

  .ap-enterprise-text {
    display: flex;
    flex-flow: wrap;
    justify-content: center;

    .ap-enterprise-text-list {
      @include mixin-width(258);
      padding: 0.4rem 0.5rem;
      cursor: pointer;
      margin: 0.2rem;
      border-radius: var(--border-radius-4);
      font-weight: var(--font-weight-600);
      font-size: var(--font-size-body-2);

    }
  }

  .ap-enterprise-cont {
    display: flex;
    flex-flow: wrap;
    justify-content: center;

    .ap-enterprise-cont-list {
      @include mixin-width(258);
      padding: 0.4rem 1rem;
      cursor: pointer;
      margin: 0.2rem;
      border-radius: var(--border-radius-4);
      position: relative;
    }

    .defart-selected::after {
      content: "";
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      width: 12px;
      height: 8px;
      background: url(../assets/images/navbar/change_lan_icon.svg) no-repeat center center;
      background-size: 100%;
    }

    .ap-enterprise-cont-list:hover {
      // background-color: var(--color-fill--2);
      color: var(--primary-6);
    }
  }
}
</style>