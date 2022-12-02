<template>
  <header id="page-topbar">
    <div class="layout-width user-select">
      <div class="navbar-header header-content">
        <div class="d-flex">
          <!-- LOGO -->
          <div class="navbar-brand-box horizontal-logo">
            <router-link to="/" class="logo logo-dark">
              <span class="logo-sm">
                <img src="@/assets/icon/logo.png" alt="" height="22" />
              </span>
              <span class="logo-lg">
                <img src="@/assets/icon/logo.png" alt="" height="17" />
              </span>
            </router-link>

            <router-link to="/" class="logo logo-light">
              <span class="logo-sm">
                <img src="@/assets/icon/logo.png" alt="" height="22" />
              </span>
              <span class="logo-lg">
                <img src="@/assets/icon/logo.png" alt="" height="17" />
              </span>
            </router-link>
          </div>

          <!-- 菜单开关 -->
          <button type="button" class="
                btn btn-sm
                px-3
                fs-16
                header-item
                vertical-menu-btn
                topnav-hamburger
              " id="topnav-hamburger-icon">
            <span class="hamburger-icon">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>

          <!-- 公司选择 -->
          <form class="app-search d-none d-md-block">
            <div class="ap-dropdown">
              <el-dropdown trigger="click">
                <span class="ap-dropdown-text">
                  <span>上海建业科技股份有限公司</span>&nbsp;&nbsp;
                  <i class="ri-arrow-down-s-line"></i>
                </span>
                <template #dropdown>
                  <div class="ap-enterprise">
                    <div class="ap-enterprise-text">
                      <div class="ap-enterprise-text-list">
                        企业/组织/团队
                      </div>
                    </div>
                    <div class="ap-enterprise-cont">
                      <div class="ap-enterprise-cont-list">
                        上海建业科技股份有限公司
                      </div>
                      <div class="ap-enterprise-cont-list">
                        杭州好运科技股份有限公司
                      </div>
                    </div>
                  </div>
                </template>
              </el-dropdown>
            </div>
          </form>
        </div>

        <div class="d-flex align-items-center">

          <!-- 系统 -->
          <div class="ap-sys">
            <div class="ap-sys-but" @click="changeSystemHome">
              
              <div v-if="state.application.CurrentSystemType == 'business'">
                <img class="ap-sys-but-icon" src="../assets/icon/system-setup.png" alt="" srcset="">
                <span class="ap-sys-but-text">{{ $t('t-back-system-platform') }}</span>
              </div>

              <div v-if="state.application.CurrentSystemType == 'system'">
                <img class="ap-sys-but-icon" src="../assets/images/navbar/nav_front_home.svg" alt="" srcset="">
                <span class="ap-sys-but-text">{{ $t('t-front-platform') }}</span>
              </div>
            </div>
          </div>

          <!-- 帮助 -->
          <div class="ms-1 header-item d-none d-sm-flex" ref="dropdownHelpRef">
            <button type="button" class="btn btn-icon btn-topbar btn-ghost-secondary"
              data-toggle="fullscreen" @click="showHelpPop = !showHelpPop">

              <el-tooltip class="box-item" effect="dark" content="帮助中心" placement="bottom" :show-arrow="true">
                <div>
                  <img v-show="showHelpPop" src="../assets/images/navbar/help_select_icon.svg" />
                  <img v-show="!showHelpPop" src="../assets/images/navbar/help_icon.svg" />
                </div>
              </el-tooltip>
            </button>
          </div>

          <!-- 信息 -->
          <div class="dropdown topbar-head-dropdown ms-1 header-item" ref="dropdownMailRef">
            <button type="button" class="btn btn-icon btn-topbar btn-ghost-secondary"
              id="page-header-cart-dropdown" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-haspopup="true"
              aria-expanded="false" @click="showMailPop = !showMailPop">
              <img v-show="!showMailPop" src="../assets/images/navbar/mail_icon.svg" />
              <img v-show="showMailPop" src="../assets/images/navbar/mail_select_icon.svg" />
              <span
                class="position-absolute topbar-badge cartitem-badge fs-10 translate-middle badge rounded-pill bg-danger">5</span>
            </button>
            <div class="dropdown-menu dropdown-menu-xl dropdown-menu-end p-0 dropdown-menu-cart"
              aria-labelledby="page-header-cart-dropdown" 
              style="width: 560px;" id="close-pop">
              
              <div class="nav-msg">
                <div class="msg-title">
                  <div>{{ $t('t-zgj-message.Title') }}</div>
                  <div @click="closeMailPop">
                    <img src="../assets/images/navbar/Closeclose.svg" />
                  </div>
                </div>

                <div class="msg-content" :style="{ 'max-height': maxHeight + 'px'}">
                  <!-- 待我确认 -->
                  <div>
                    <div class="content-title">
                      <div class="title">{{ $t('t-to-be-confirm') }}</div>
                      <div class="view-more">{{ $t('t-view-more') }}<img src="../assets/images/navbar/nav_msg_more.svg" /></div>
                    </div>

                    <div class="content-list user-select">
                      <div class="column" v-for="(item, index) in toBeConfirmedList" :key="index">
                        <div class="msg">{{ item.content }}</div>
                        <div class="tag">
                          <el-tag type="warning" size="small">{{ item.label }}</el-tag>
                          <el-tag type="info" size="small"  class="t">{{ item.depart }}</el-tag>
                          <el-tag type="info" size="small">{{ item.person }}</el-tag>
                        </div>
                        <div class="date">
                          <div class="left">{{ item.dateTime }}</div>
                          <div class="custom-button user-select">{{ $t('t-zgj-confirm') }}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- 待我审批 -->
                  <div>
                    <div class="content-title">
                      <div class="title">{{ $t('t-to-be-approval') }}</div>
                      <div class="view-more">{{ $t('t-view-more') }}<img src="../assets/images/navbar/nav_msg_more.svg" /></div>
                    </div>
                  
                    <div class="content-list user-select">
                      <div class="column" v-for="(item, index) in toBeConfirmedList" :key="index">
                        <div class="msg">{{ item.content }}</div>
                        <div class="tag">
                          <el-tag size="small">{{ item.label }}</el-tag>
                          <el-tag type="info" size="small" class="t">{{ item.depart }}</el-tag>
                          <el-tag type="info" size="small">{{ item.person }}</el-tag>
                        </div>
                        <div class="date">
                          <div class="left">{{ item.dateTime }}</div>
                          <div class="custom-button user-select">{{ $t('t-zgj-Approval') }}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- 待我处理 -->
                  <div>
                    <div class="content-title">
                      <div class="title">{{ $t('t-to-be-handle') }}</div>
                      <div class="view-more">{{ $t('t-view-more') }}<img src="../assets/images/navbar/nav_msg_more.svg" /></div>
                    </div>
                  
                    <div class="content-list user-select">
                      <div class="column" v-for="(item, index) in toBeConfirmedList" :key="index">
                        <div class="msg">{{ item.content }}</div>
                        <div class="tag">
                          <el-tag type="warning" size="small">{{ item.label }}</el-tag>
                          <el-tag type="info" size="small" class="t">{{ item.depart }}</el-tag>
                          <el-tag type="info" size="small">{{ item.person }}</el-tag>
                        </div>
                        <div class="date">
                          <div class="left">{{ item.dateTime }}</div>
                          <div class="custom-button user-select">{{ $t('t-zgj-Handle') }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </div>

              </div>
            </div>
          </div>
          
          <!-- 消息 -->
          <div class="dropdown topbar-head-dropdown ms-1 header-item" ref="dropdownNotifyRef">
            <button type="button" class="btn btn-icon btn-topbar btn-ghost-secondary"
              id="page-header-cart-dropdown" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-haspopup="true"
              aria-expanded="false" @click="showNotifyPop = !showNotifyPop" style="transform: rotateY(180deg);">
              <img v-show="!showNotifyPop" src="../assets/images/navbar/notify_icon.svg" />
              <img v-show="showNotifyPop" src="../assets/images/navbar/notify_select_icon.svg" />
              <span class="position-absolute translate-middle p-1 bg-danger border border-light rounded-circle"></span>
            </button>
            <div class="dropdown-menu dropdown-menu-xl dropdown-menu-end p-0 dropdown-menu-cart"
              aria-labelledby="page-header-cart-dropdown">

              <!-- tabs -->
              <div class="nav-natify-tab">
                <VTabs :active="active" :label="tabsLabel" @update:active="active = $event"></VTabs>

                <div class="natify-content">
                  <div v-if="active === tabsLabel[0].value" class="column">
                    <!-- content -->
                    <div class="item" :class="item.isRead ? '' : 'diot'" v-for="(item, index) in listMsg" :key="index">
                      <div class="item-msg">{{item.content}}</div>
                      <div class="item-time">{{item.date}}</div>
                    </div>

                  </div>
                  <div v-if="active === tabsLabel[1].value" class="column">
                     
                    <!-- content -->
                    <div class="item" :class="item.isRead ? '' : 'diot'" v-for="(item, index) in listNoticeMsg" :key="index">
                      <div class="item-msg">{{item.content}}</div>
                      <div class="item-time">{{item.date}}</div>
                    </div>
                  </div>
                </div>

                <div class="natify-footer">
                  <div>{{ $t('t-zgj-index.tab.Markread') }}</div>
                  <div>{{ $t('t-view-all-notify') }}</div>
                </div>
              </div>

            </div>
          </div>

          <!-- 应用入口 -->
          <div class="dropdown topbar-head-dropdown ms-1 header-item" ref="dropdownAppRef">
            <button type="button" class="btn btn-icon btn-topbar btn-ghost-secondary"
              id="page-header-notifications-dropdown" data-bs-toggle="dropdown" aria-haspopup="true"
              aria-expanded="false" @click="showAppPop = !showAppPop">
              <img  v-show="!showAppPop" src="../assets/images/navbar/application_icon.svg" />
              <img v-show="showAppPop" src="../assets/images/navbar/application_select_icon.svg" />
            </button>
            <div class="dropdown-menu dropdown-menu-xl dropdown-menu-end p-0 dropdown-menu-cart"
              aria-labelledby="page-header-cart-dropdown" style="width: 340px;">
              <div class="ap-moreDropdown">
                <div class="dropdown-list">
                  <div class="dropdown-list-cont" v-for="( item, index ) in state.application.more" :key="index">
                    <img class="dropdown-list-cont-img" :src="item.icon" alt="" srcset="">
                    <div class="dropdown-list-cont-name">{{$t(item.name)}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 用户信息 -->
          <div class="dropdown topbar-head-dropdown ms-1 header-item" ref="dropdownUserRef">
            <button type="button" class="btn btn-icon btn-topbar btn-ghost-secondary ap-personalCenter"
              id="page-header-cart-dropdown" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-haspopup="true"
              aria-expanded="false" @click="showUserInfoPop = !showUserInfoPop">
              <div class="ap-personalCenter-text">
                <span class="ap-personalCenter-name">春青</span>
                <img v-show="showUserInfoPop" src="../assets/images/navbar/user_info_close.svg" />
                <img v-show="!showUserInfoPop" src="../assets/images/navbar/user_info_open.svg" />
              </div>
            </button>
            <div class="dropdown-menu dropdown-menu-xl dropdown-menu-end p-0 dropdown-menu-cart"
              aria-labelledby="page-header-cart-dropdown" style="width: 240px;">
              <div class="ap-personalCenterDropdown">
                <div class="dropdown-box">
                  <div class="dropdown-name">
                    <div class="dropdown-name-icon">春青</div>
                    <div class="dropdown-name-text">曹春青</div>
                  </div>
                </div>

                <div class="dropdown-list">

                  <div class="dropdown-list-li">
                    <img src="../assets/images/navbar/user_info_logo.svg" />
                    <span class="dropdown-list-li-text">{{ $t('t-zgj-person.center') }}</span>
                  </div>

                  <div class="dropdown-list-li">
                    <img src="../assets/images/navbar/user_info_lock.svg" />
                    <span class="dropdown-list-li-text">{{ $t('t-zgj-index.updatePwd') }}</span>
                  </div>

                  <div class="dropdown-list-li">
                    <img src="../assets/images/navbar/user_info_down.svg" />
                    <span class="dropdown-list-li-text">{{ $t('t-zgj-DownloadApp.Download') }}</span>
                  </div>

                  <el-popover trigger="hover" placement="left-start" :show-arrow="false" :close-delay="80" :visible="showChanglanPop">
                    <template #reference>
                      <div class="dropdown-list-li" :style="{ color: showChanglanPop ? '#D0963E' : 'rgba(0, 0, 0, 0.65)'}" @click="showChanglanPop = true">
                        <img src="../assets/images/navbar/user_info_lan.svg" />
                        <span class="dropdown-list-li-text">{{ $t('t-zgj-changeLang') }}</span>
                        <i class="ri-arrow-right-s-line"></i>
                      </div>
                    </template>
                    <div class="popover-cont ap-personalCenterPopover">
                      <div class="popover-cont-list" @click="setLanguage('ch')" :class="state.language === 'ch' ? 'popover-selected' : ''">简体中文</div>
                      <div class="popover-cont-list" @click="setLanguage('en')" :class="state.language === 'en' ? 'popover-selected' : ''">English</div>
                    </div>
                  </el-popover>

                  <div class="dropdown-list-li">
                    <img src="../assets/images/navbar/user_info_iphone.svg" />
                    <span class="dropdown-list-li-text">{{ $t('t-zgj-mobile-app')}}</span>
                  </div>

                  <div class="dropdown-list-li">
                    <img src="../assets/images/navbar/user_info_layout.svg" />
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
import { onMounted, reactive, ref, watch } from "vue";
import useCurrentInstance from "@/hooks/getInstance.js"
import i18n from "../i18n";
import useClickQutside from "../hooks/useClickQutside.js"
import VTabs from "./modules/tabs.vue"
const _this = useCurrentInstance()
const state = reactive({
  application: {
    CurrentSystemType: "business",//business / system
    more: [{
      icon: require("../assets/svg/more-Seal-Application.svg"),
      name: "t-zgj-F_SEAL_APPLY",
    }, {
      icon: require("../assets/svg/more-my-Seal-Application.svg"),
      name: "t-zgj-F_SEAL_APPLY_MY",
    }, {
      icon: require("../assets/svg/more-file-document.svg"),
      name: "t-zgj-F_SEAL_FILE_UPLOAD",
    }, {
      icon: require("../assets/svg/more-Application-Seal.svg"),
      name: "t-zgj-F_SEAL_INFO_APPLY",
    }, {
      icon: require("../assets/svg/more-file-document.svg"),
      name: "t-zgj-F_DOCUMENT_INFO",
    }, {
      icon: require("../assets/svg/more-document-library.svg"),
      name: "t-zgj-F_SEAL_INFO",
    }],
  },
  language: i18n.global.locale
})

let CurrentSystemType = sessionStorage.getItem("CurrentSystemType");
if (CurrentSystemType) {
  state.application.CurrentSystemType = CurrentSystemType
}

let maxHeight = ref(null)
onMounted(() => {
  // 添加监听 滚动事件
  document.addEventListener("scroll", function () {
    var pageTopbar = document.getElementById("page-topbar");
    if (pageTopbar) {
      document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50 ? pageTopbar.classList.add(
        "topbar-shadow") : pageTopbar.classList.remove("topbar-shadow");
    }
  });
  
  // 添加 全屏开关监听 事件
  if (document.getElementById("topnav-hamburger-icon"))
    document
      .getElementById("topnav-hamburger-icon")
      .addEventListener("click", toggleHamburgerMenu);
  
  maxHeight.value = window.innerHeight - 150
  window.addEventListener("resize", function () {
    maxHeight.value = window.innerHeight - 150
  })
})

// 监听 菜单开关
const toggleHamburgerMenu = () => {
  var windowSize = document.documentElement.clientWidth;

  if (windowSize > 767)
    document.querySelector(".hamburger-icon").classList.toggle("open");

  //For collapse horizontal menu
  if (
    document.documentElement.getAttribute("data-layout") === "horizontal"
  ) {
    document.body.classList.contains("menu") ?
      document.body.classList.remove("menu") :
      document.body.classList.add("menu");
  }

  //For collapse vertical menu
  if (document.documentElement.getAttribute("data-layout") === "vertical") {
    if (windowSize < 1025 && windowSize > 767) {
      document.body.classList.remove("vertical-sidebar-enable");
      document.documentElement.getAttribute("data-sidebar-size") == "sm" ?
        document.documentElement.setAttribute("data-sidebar-size", "") :
        document.documentElement.setAttribute("data-sidebar-size", "sm");
    } else if (windowSize > 1025) {
      document.body.classList.remove("vertical-sidebar-enable");
      document.documentElement.getAttribute("data-sidebar-size") == "lg" ?
        document.documentElement.setAttribute("data-sidebar-size", "sm") :
        document.documentElement.setAttribute("data-sidebar-size", "lg");
    } else if (windowSize <= 767) {
      document.body.classList.add("vertical-sidebar-enable");
      document.documentElement.setAttribute("data-sidebar-size", "lg");
    }
  }

  //Two column menu
  if (document.documentElement.getAttribute("data-layout") == "twocolumn") {
    document.body.classList.contains("twocolumn-panel") ?
      document.body.classList.remove("twocolumn-panel") :
      document.body.classList.add("twocolumn-panel");
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

const dropdownMailRef = ref(null)
const showMailPop = ref(false)
const isClickOutsideMail = useClickQutside(dropdownMailRef)
watch(isClickOutsideMail, () => {
  // 邮件弹框
  if (isClickOutsideMail.value && showMailPop.value) {
    showMailPop.value = false
  }
})

const closeMailPop = () => {
  showMailPop.value = false
  document.getElementById('close-pop').classList.remove("show");
}
const dropdownHelpRef = ref(null)
const showHelpPop = ref(false)
const isClickOutsideHelp = useClickQutside(dropdownHelpRef)
watch(isClickOutsideHelp, () => {
  // 帮助弹框
  if (isClickOutsideHelp.value && showHelpPop.value) {
    showHelpPop.value = false
  }
})

const dropdownNotifyRef = ref(null)
const showNotifyPop = ref(false)
const isClickOutsideNotify = useClickQutside(dropdownNotifyRef)
watch(isClickOutsideNotify, () => {
  // 消息弹框
  if (isClickOutsideNotify.value && showNotifyPop.value) {
    showNotifyPop.value = false
  }
 })

const dropdownAppRef = ref(null)
const showAppPop = ref(false)
const isClickOutsideApp = useClickQutside(dropdownAppRef)
watch(isClickOutsideApp, () => {
  // 应用弹框
  if (isClickOutsideApp.value && showAppPop.value) {
    showAppPop.value = false
  }
 })

// 切换 中英文
const setLanguage = (locale) => {
  i18n.global.locale = locale;
  state.language = locale;
  showChanglanPop.value = false
}

// 跳转业务首页或者系统首页
const changeSystemHome = () => {
  // 跳转业务首页或者系统首页
  if (state.application.CurrentSystemType == "business") {
    _this.$router.push("/system/home")
  } else if (state.application.CurrentSystemType == "system") {
    _this.$router.push("/frontDesk/home")
  }
}

// 消息 tabs
const active = ref('first')
const tabsLabel = ref([
  {
    name: 't-zgj-F_WARNING',
    value: 'first'
  },
  {
    name: 't-zgj-F_NOTICE',
    value: 'second'
  }
])

// 预警消息列表
const listMsg = ref([
  {
    content: '消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容',
    date: '2022-09-11 10:21:55',
    isRead: false
  },
  {
    content: '消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容',
    date: '2022-09-11 10:21:55',
    isRead: true
  },
  {
    content: '消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容',
    date: '2022-09-11 10:21:55',
    isRead: false
  },
  {
    content: '消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容',
    date: '2022-09-11 10:21:55',
    isRead: false
  }
])

const listNoticeMsg = ref([
  {
    content: '消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容',
    date: '2022-09-11 10:21:55',
    isRead: true
  },
  {
    content: '消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容',
    date: '2022-09-11 10:21:55',
    isRead: true
  },
  {
    content: '消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容',
    date: '2022-09-11 10:21:55',
    isRead: false
  }
])

// 消息列表 - 待我确认
const toBeConfirmedList = ref([
  {
    content: '消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内内容消息内内容消息内',
    label: '远程盖章',
    depart: '产品部',
    person: '马丽丽',
    dateTime: '2022-09-21 10:01:00'
  },
  {
    content: '消息内容消息内容消息内容消息息内内容消息内内容消息内',
    label: '实时视频盖章',
    depart: '产品部',
    person: '马丽丽',
    dateTime: '2022-09-21 10:01:00'
  },
  {
    content: '消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内内容消息内内容消息内',
    label: '远程盖章',
    depart: '产品部',
    person: '马丽丽',
    dateTime: '2022-09-21 10:01:00'
  },
  {
    content: '消息内容消息内容消息内容消息息内内容消息内内容消息内',
    label: '实时视频盖章',
    depart: '产品部',
    person: '马丽丽',
    dateTime: '2022-09-21 10:01:00'
  }
])

</script>
<style lang='scss' scoped>
// @import "../style/index.scss";
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
        color: #D0963E!important;
        img{
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
    width: 150px;
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

.ap-moreDropdown {
  @include mixin-width(340);
  @include mixin-height(400);
  @include mixin-padding(20);

  .dropdown-list {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-content: space-between;
    flex-flow: wrap;

    .dropdown-list-cont {
      @include mixin-width(130);
      @include mixin-height(100);
      text-align: center;
      display: flex;
      flex-flow: wrap;
      align-content: center;
      justify-content: center;

      .dropdown-list-cont-name {
        width: 100%;
        @include mixin-margin-top(11);
      }
    }

    .dropdown-list-cont:hover {
      background-color: var(--color-fill--2);
      color: #D0963E;
    }
  }

}

.ap-enterprise {
  @include mixin-width(290);
  padding: 1rem;

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
    }

    .ap-enterprise-cont-list:hover {
      background-color: var(--color-fill--2);
      color: var(--primary-6);
    }
  }
}

.nav-natify-tab {
  padding-top: 26px;

  .natify-content {
    height: 294px;

    .column {
      padding: 5px 4px 5px 32px;
      height: 64px;

      .item {
        position: relative;
        padding: 10px 0;
        .item-msg {
          font-family: 'PingFang SC';
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 22px;
          color: #303133;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        .item-time {
          font-family: 'PingFang SC';
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 20px;
          color: #909399;
        }
      }
      .diot::before {
        content: "";
        position: absolute;
        width: 8px;
        height: 8px;
        left: -16px;
        top: 14px;
        border-radius: 50%;
        background: #D04D3E;
      }
    }
  }

  .natify-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    height: 50px;
    color: rgba($color: #000000, $alpha: 0.45);
    border-top: 1px solid rgba($color: #000000, $alpha: 0.06);
    
    div {
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 24px;
      cursor: pointer;
    }
  }
}

.nav-msg {
  
  .msg-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    height: 55px;
    padding: 0 24px;
    border-bottom: 1px solid rgba($color: #000000, $alpha: 0.06);
  }

  .msg-content {
    padding: 10px 24px 30px 24px;
    overflow-y: scroll;
    .content-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 44px;
      padding-left: 10px;

      .title {
        position: relative;
        color: rgba(0, 0, 0, 0.85);
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
      }
      .title::before {
        content: "";
        position: absolute;
        top: 2px;
        left: -10px;
        height: 16px;
        width: 2px;
        background: #D0963E;
      }

      .view-more {
        color: rgba(0, 0, 0, 0.45);
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        cursor: pointer;
      }
    }

    .content-list {
      max-height: 240px;
      overflow: hidden;
      .msg {
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 30px;
        color: rgba(0, 0, 0, 0.85);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .tag {
        .t {
          margin: 0 6px;
        }
      }

      .date {
        display: flex;
        justify-content: space-between;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 20px;
        color: #909399;

        .left {
          line-height: 29px;
        }
      }

    }
  }
}

.custom-button {
  padding: 0 16px;
  height: 26px;
  background: #FFFFFF;
  mix-blend-mode: normal;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  color: #3E78D0;
  font-size: 12px;
  line-height: 24px;
  &:hover {
    border: 1px solid #3E78D0;
  }
}
</style>