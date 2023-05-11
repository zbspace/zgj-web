<!--
* @Descripttion NavBar
* @FileName index.vue
* @Author WalterXsk
 * @LastEditTime: 2023-05-11
!-->
<template>
  <header id="page-topbar">
    <div class="nav-bar-container header-content" :class="layoutStore.topbar">
      <!-- nav-left -->
      <div class="nav-left">
        <!-- logo -->
        <router-link to="/" class="nav-logo">
          <img
            src="@/assets/icon/logo.png"
            alt=""
            height="37"
            v-if="!homeLogoUrl.homeUrl"
            style="object-fit: scale-down; width: 130px; height: 46px"
          />
          <el-image
            style="width: 130px; height: 46px"
            :src="homeLogoUrl.homeUrl"
            fit="scale-down"
            v-else
          >
            <template #error>
              <img
                src="@/assets/icon/logo.png"
                style="object-fit: scale-down; width: 130px; height: 46px"
              />
            </template>
          </el-image>
        </router-link>

        <!-- 公司选择 -->
        <el-button
          class="depart-dropdown"
          text
          v-show="state.departLists.length < 2"
        >
          {{ accountInfoStore.oneDepartTitle }}
        </el-button>

        <el-dropdown
          trigger="hover"
          :teleported="false"
          @command="chooseDepart"
          @visible-change="visibleChange"
          :disabled="state.departLists.length < 2"
          v-show="state.departLists.length > 1"
          style="margin: auto; height: 32px"
        >
          <span class="el-dropdown-link">
            <el-button class="depart-dropdown" text>
              {{ state.currentDepart.tenantName }}
              <el-icon
                class="el-icon--right"
                v-if="state.departLists.length > 1"
              >
                <arrow-down
                  style="transition: all 0.3s"
                  :style="showDept ? 'transform: rotate(180deg);' : ''"
                />
              </el-icon>
            </el-button>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <div class="ap-enterprise">
                <div class="ap-enterprise-cont">
                  <el-dropdown-item
                    v-for="(item, index) in state.departLists"
                    :command="item"
                    :disabled="item.tenantId === state.tenantId"
                    :key="index"
                  >
                    <div class="ap-enterprise-cont-list">
                      {{ item.tenantName }}
                      <div
                        class="defart-selected"
                        v-if="state.tenantId === item.tenantId"
                      />
                    </div>
                  </el-dropdown-item>
                </div>
              </div>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>

      <!-- nav-right -->
      <div class="nav-right">
        <!-- 系统 -->
        <div class="ap-sys">
          <el-button class="ap-sys-but" @click="changeSystemHome" text>
            <div v-if="menusInfoStore.currentType === 'business'">
              <svg class="iconpark-icon">
                <use href="#xitonghoutai"></use>
              </svg>
              <span>{{ $t('t-back-system-platform') }}</span>
            </div>

            <div v-if="menusInfoStore.currentType === 'system'">
              <svg class="iconpark-icon">
                <use href="#Property1yewuqiantai"></use>
              </svg>
              <span>{{ $t('t-front-platform') }}</span>
            </div>
          </el-button>
        </div>

        <!-- 帮助 -->
        <div ref="dropdownHelpRef">
          <el-button class="btn-ghost" @click="toHelp" text>
            <el-tooltip
              effect="dark"
              :content="$t('t-help-center')"
              placement="bottom"
              :show-arrow="true"
              :show-after="200"
            >
              <div :class="showHelpPop ? '' : 'svg-img'" class="svg-img-hover">
                <!-- <img src="@/assets/images/navbar/help_select_icon.svg" /> -->
                <svg class="iconpark-icon"><use href="#help"></use></svg>
              </div>
            </el-tooltip>
          </el-button>
        </div>

        <!-- 信息 -->
        <VMailNav />

        <!-- 消息 -->
        <VMessageNav />

        <!-- 应用入口 -->
        <VApplicationNav />

        <!-- 用户信息 -->
        <div>
          <el-popover
            placement="bottom"
            :width="240"
            trigger="hover"
            :show-arrow="false"
            :teleported="false"
            :show-after="200"
            :hide-after="120"
            @before-enter="showUserPop"
            @after-leave="hideUserPop"
          >
            <template #reference>
              <div class="ap-personalCenter">
                <div class="ap-personalCenter-text">
                  <span class="ap-personalCenter-name">
                    {{
                      accountInfoStore.userInfo &&
                      accountInfoStore.userInfo.userName &&
                      accountInfoStore.userInfo.userName.substr(
                        accountInfoStore.userInfo.userName.length - 1
                      )
                    }}
                  </span>
                </div>
                <svg
                  class="iconpark-icon"
                  style="transition: all 0.3s"
                  :style="
                    !showUserInfoPop && layoutStore.topbar === 'light'
                      ? ''
                      : !showUserInfoPop && layoutStore.topbar === 'dark'
                      ? 'color: #fff'
                      : 'color: var(--jy-primary-6);transform: rotate(180deg);'
                  "
                >
                  <use href="#weizhankai"></use>
                </svg>
              </div>
            </template>

            <div class="ap-personalCenterDropdown">
              <div class="dropdown-box">
                <div class="dropdown-name">
                  <div class="dropdown-name-icon">
                    {{
                      accountInfoStore.userInfo &&
                      accountInfoStore.userInfo.userName &&
                      accountInfoStore.userInfo.userName.substr(
                        accountInfoStore.userInfo.userName.length - 1
                      )
                    }}
                  </div>
                  <div class="dropdown-name-text">
                    {{
                      accountInfoStore.userInfo &&
                      accountInfoStore.userInfo.userName
                    }}
                  </div>
                </div>
              </div>

              <div class="dropdown-list">
                <div class="dropdown-list-li" @click="goPersonCenter">
                  <img src="@/assets/images/navbar/user_info_logo.svg" />
                  <span class="dropdown-list-li-text">{{
                    $t('t-zgj-person.center')
                  }}</span>
                </div>

                <div class="dropdown-list-li" @click="changePassword">
                  <img src="@/assets/images/navbar/user_info_lock.svg" />
                  <span class="dropdown-list-li-text">{{
                    $t('t-zgj-index.updatePwd')
                  }}</span>
                </div>

                <div class="dropdown-list-li" @click="openDownload">
                  <img src="@/assets/images/navbar/user_info_down.svg" />
                  <span class="dropdown-list-li-text">{{
                    $t('t-zgj-DownloadApp.Download')
                  }}</span>
                </div>

                <el-popover
                  trigger="hover"
                  placement="left-start"
                  :show-arrow="false"
                  :close-delay="80"
                  :teleported="false"
                  @show="showPop"
                  @hide="hidePop"
                >
                  <template #reference>
                    <div
                      class="dropdown-list-li"
                      :class="showChanglanPop ? 'svg-hover' : ''"
                      :style="{
                        color: showChanglanPop
                          ? 'var(--jy-primary-6)'
                          : 'rgba(0, 0, 0, 0.65)'
                      }"
                    >
                      <img src="@/assets/images/navbar/user_info_lan.svg" />

                      <span class="dropdown-list-li-text">{{
                        $t('t-zgj-changeLang')
                      }}</span>
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
                  <img src="@/assets/images/navbar/user_info_iphone.svg" />
                  <span class="dropdown-list-li-text">{{
                    $t('t-zgj-mobile-app')
                  }}</span>
                </div>

                <div class="dropdown-list-li" @click="showAbout = true">
                  <img src="@/assets/images/navbar/user_info_about.svg" />
                  <span class="dropdown-list-li-text">{{
                    $t('t-zgj-index.zhanginAbout')
                  }}</span>
                </div>

                <div class="dropdown-list-li" @click="handleLogout">
                  <img src="@/assets/images/navbar/user_info_layout.svg" />
                  <span class="dropdown-list-li-text">{{
                    $t('t-zgj-logout-user')
                  }}</span>
                </div>
              </div>
            </div>
          </el-popover>
        </div>
      </div>
    </div>
  </header>
  <JyDialog
    title="修改密码"
    v-model="showFormDialog"
    :width="540"
    :height="220"
  >
    <el-form
      label-position="left"
      ref="loginformRef"
      :model="loginform"
      :rules="formRules"
    >
      <el-form-item prop="oldPassword" style="margin-left: 30px">
        <template #label>
          <div class="from-label">原密码</div>
        </template>
        <el-input
          v-model="loginform.oldPassword"
          show-password
          placeholder="请输入"
          style="width: 264px"
        ></el-input>
      </el-form-item>
      <el-form-item prop="newPassword" style="margin-left: 30px">
        <template #label>
          <div class="from-label">新密码</div>
        </template>
        <el-input
          v-model="loginform.newPassword"
          show-password
          placeholder="请输入"
          style="width: 264px"
        ></el-input>
      </el-form-item>
      <el-form-item class="clearfix" label="确认新密码" prop="againPassword">
        <template #label>
          <div class="from-label">确认新密码</div>
        </template>
        <el-input
          v-model="loginform.againPassword"
          show-password
          placeholder="请输入"
          style="width: 264px"
        ></el-input>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button type="primary" @click="login"> 确定 </el-button>
      <el-button @click="onClose">取消</el-button>
    </template>
  </JyDialog>
  <VDownload v-model="showDialog"></VDownload>
  <VAbout v-model="showAbout"></VAbout>
  <JyElMessageBox
    v-model="state.JyElMessageBox.show"
    :show="state.JyElMessageBox.show"
    :defaultAttribute="{}"
    @confirmClick="confirmClick"
  >
    <template #header>
      {{ state.JyElMessageBox.header.data }}
    </template>
    <template #content>
      {{ state.JyElMessageBox.content.data }}
    </template>
  </JyElMessageBox>
</template>

<script setup>
  import { onMounted, reactive, ref, watch } from 'vue'
  import i18n from '@/utils/i18n'
  import useClickQutside from '@/utils/useClickQutside.js'
  import VApplicationNav from './modules/applicationNav.vue'
  import VMailNav from './modules/mailNav.vue'
  import VAbout from './modules/about.vue'
  import VMessageNav from './modules/messageNav.vue'
  import VDownload from './modules/downloadApp.vue'
  import router from '@/router'
  import { useAccountInfoStore } from '@/store/accountInfo'
  import { useMenusInfoStore } from '@/store/menus'
  import { useLanguageStore } from '@/store/language'
  import { useLayoutStore } from '@/store/layout'
  import JyDialog from '@/components/common/JyDialog/index2.vue'
  import { useRoute } from 'vue-router'
  import { ArrowDown } from '@element-plus/icons-vue'
  import loginApi from '@/api/login'
  import navbarApi from '@/api/common/navbar'
  import { ElMessage } from 'element-plus'
  import { getItem, setItem, removeItem } from '@/utils/storage'
  import { useHomeLogoUrl } from '@/store/logo'
  import md5 from 'js-md5'

  const homeLogoUrl = useHomeLogoUrl()
  const accountInfoStore = useAccountInfoStore()
  const menusInfoStore = useMenusInfoStore()
  const languageStore = useLanguageStore()
  const layoutStore = useLayoutStore()
  const route = useRoute()
  const showDept = ref(false)
  const showAbout = ref(false)
  const state = reactive({
    application: {
      CurrentSystemType: 'business' // business / system
    },
    language: i18n.global.locale,
    departLists: getItem('departLists'),
    tenantId: null,
    currentDepart: {},
    chooseTenant: {},
    JyElMessageBox: {
      show: false,
      header: {
        data: ''
      },
      content: {
        data: ''
      }
    }
  })
  const CurrentSystemType = sessionStorage.getItem('CurrentSystemType')
  if (CurrentSystemType) {
    state.application.CurrentSystemType = CurrentSystemType
  }

  // const validatePass1 = (rule, value, callback) => {
  //   if (value !== loginform.value.againPassword) {
  //     callback(new Error('两次输入密码不一致'))
  //   } else {
  //     callback()
  //   }
  // }

  const validatePass2 = (rule, value, callback) => {
    if (value !== loginform.value.newPassword) {
      callback(new Error('两次输入密码不一致'))
    } else {
      callback()
    }
  }

  const formRules = reactive({
    oldPassword: [
      {
        required: true,
        message: '原密码不能为空',
        trigger: 'blur'
      }
    ],
    newPassword: [
      {
        required: true,
        message: '新密码不能为空',
        trigger: 'blur'
      }
    ],
    againPassword: [
      {
        required: true,
        message: '确认新密码不能为空',
        trigger: 'blur'
      },
      { validator: validatePass2, trigger: 'change' }
    ]
  })

  const getCurrentDepart = () => {
    const departId = String(getItem('tenantId'))
    state.tenantId = departId
    if (departId) {
      const index = state.departLists.findIndex(i => i.tenantId === departId)
      if (index > -1) {
        state.currentDepart = state.departLists[index]
        // 存储 当前用户对应部门
        accountInfoStore.setUserDepartName(
          state.departLists[index] && state.departLists[index].tenantName
        )
      }
    }
  }

  const toHelp = () => {
    window.open('https://oms.zhangin.com/zgj/help/queenView.htm', '_blank')
  }

  const chooseDepart = e => {
    state.chooseTenant = e
    state.JyElMessageBox.header.data = '确认切换企业？'
    state.JyElMessageBox.content.data =
      '是否确认切换企业，切换企业后未保存的数据将被清除，请谨慎操作'
    state.JyElMessageBox.show = true
  }

  const visibleChange = e => {
    showDept.value = e
  }

  const getRedirect = () => {
    return route.query.redirect
      ? decodeURIComponent(route.query.redirect)
      : '/frontDesk/home'
  }

  const confirmClick = () => {
    loginApi.chooseOrgan(state.chooseTenant.tenantId).then(
      async () => {
        setItem('tenantId', state.chooseTenant.tenantId)
        // 存储 当前用户对应部门
        const index = state.departLists.findIndex(
          i => i.tenantId === state.chooseTenant.tenantId
        )
        if (index > -1) {
          accountInfoStore.setUserDepartName(
            state.departLists[index] && state.departLists[index].tenantName
          )
        }

        const redirect = getRedirect()
        menusInfoStore.currentType =
          redirect.indexOf('/system') > -1 ? 'system' : 'business'
        await menusInfoStore.setMenus()

        state.JyElMessageBox.show = false
        window.location.reload()
      },
      () => {
        state.JyElMessageBox.show = false
      }
    )
  }

  onMounted(() => {
    getCurrentDepart()
    // 添加监听 滚动事件
    document.addEventListener('scroll', function () {
      const pageTopbar = document.getElementById('page-topbar')
      if (pageTopbar) {
        document.body.scrollTop >= 50 ||
        document.documentElement.scrollTop >= 50
          ? pageTopbar.classList.add('topbar-shadow')
          : pageTopbar.classList.remove('topbar-shadow')
      }
    })
  })

  // 用户信息弹框
  const showUserInfoPop = ref(false)
  const showUserPop = () => {
    showUserInfoPop.value = true
  }
  const hideUserPop = () => {
    showUserInfoPop.value = false
  }

  // 帮助中心
  const dropdownHelpRef = ref(null)
  const showHelpPop = ref(false)
  const isClickOutsideHelp = useClickQutside(dropdownHelpRef)
  watch(isClickOutsideHelp, () => {
    // 帮助弹框
    if (isClickOutsideHelp.value && showHelpPop.value) {
      showHelpPop.value = false
    }
  })

  // 切换 中英文
  const showChanglanPop = ref(false)
  const setLanguage = locale => {
    i18n.global.locale = locale
    state.language = locale
    languageStore.setLanguage(locale)
    hideUserPop()
  }
  const showPop = () => {
    showChanglanPop.value = true
  }
  const hidePop = () => {
    showChanglanPop.value = false
  }
  // 跳转业务首页或者系统首页
  const changeSystemHome = () => {
    // 跳转业务首页或者系统首页
    if (menusInfoStore.currentType === 'business') {
      router.push({ path: '/system/home' })
    } else if (menusInfoStore.currentType === 'system') {
      router.push({ path: '/frontDesk/home' })
    }
  }

  // 退出登录
  const handleLogout = () => {
    loginApi.logOut().then(res => {
      if (res.success) {
        accountInfoStore.setToken(null)
        accountInfoStore.setUserInfo(null)
        accountInfoStore.setUserDepartName(null)
        homeLogoUrl.setHomeUrl(null)
        removeItem('tenantId')
        removeItem('menusInfo')
        removeItem('departLists')
        // 跳转到登录页
        ElMessage.success('退出登录！')
        router.replace({
          path: '/login/account',
          // 保存我们所在的位置，以便以后再来
          query: {
            redirect: encodeURIComponent(router.currentRoute.value.fullPath)
          }
        })
      }
    })
  }

  // 个人中心
  const goPersonCenter = () => {
    router.push({ path: '/personally' })
    hideUserPop()
  }

  // 修改密码弹框
  const showFormDialog = ref(false)

  const changePassword = () => {
    showFormDialog.value = true
    hideUserPop()
  }

  const onClose = value => {
    showFormDialog.value = false
  }

  const loginform = ref({
    oldPassword: '',
    newPassword: '',
    againPassword: ''
  })
  const loginformRef = ref(null)

  const login = () => {
    loginformRef.value.validate(valid => {
      if (valid) {
        navbarApi
          .changeMobile({
            oldPassword: md5(loginform.value.oldPassword),
            newPassword: md5(loginform.value.newPassword)
          })
          .then(res => {
            ElMessage.success('修改密码成功！')
            showFormDialog.value = false
          })
      } else {
        return false
      }
    })
  }

  // 下载app弹窗
  const showDialog = ref(false)
  const openDownload = () => {
    showDialog.value = true
    hideUserPop()
  }
</script>

<style lang="scss" scoped>
  .nav-bar-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 64px;
    padding: 0 32px;
    .nav-left {
      display: flex;

      .nav-logo {
        margin: 0 16px 0 32px;
      }
      .depart-dropdown {
        margin: auto;
        color: #303133;
        font-size: 16px;

        .el-dropdown-link {
          cursor: pointer;
          color: #303133;
          font-size: 16px;
          display: flex;
          align-items: center;
        }
      }

      .ap-enterprise {
        // padding: 1rem;
        // width: 290px;
        --el-dropdown-menuItem-hover-fill: transparent;
        .ap-enterprise-text {
          display: flex;
          flex-flow: wrap;
          justify-content: center;

          .ap-enterprise-text-list {
            width: 258px;
            padding: 4px 24px;
            cursor: pointer;
            margin: 4px;
            border-radius: 4px;
            font-weight: 600;
            font-size: 14px;
            text-align: left;
          }
        }

        .ap-enterprise-cont {
          display: flex;
          flex-flow: wrap;
          justify-content: center;

          .ap-enterprise-cont-list {
            width: 258px;
            padding: 0px 10px;
            cursor: pointer;
            margin: 4px;
            line-height: 40px;
            border-radius: 4px;
            position: relative;
            text-align: left;
            color: rgba(0, 0, 0, 0.85);
            font-weight: 400;
          }

          .defart-selected::after {
            content: '';
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            width: 12px;
            height: 8px;
            background: url(@/assets/images/navbar/change_lan_icon.svg)
              no-repeat center center;
            background-size: 100%;
          }

          .ap-enterprise-cont-list:hover {
            background-color: rgba(0, 0, 0, 0.04);
            color: var(--jy-primary-6);
          }
        }
      }
    }

    .nav-right {
      display: flex;
      align-items: center;
      .ap-sys {
        margin-right: 1rem;

        :deep(.el-button.is-text):not(.is-disabled):hover {
          background-color: var(--el-fill-color-light2);
        }

        .ap-sys-but {
          border-radius: 4px;
          opacity: 1;
          border: 1px solid var(--jy-primary-6);
          color: var(--jy-primary-6);
          padding: 0.3rem 0.8rem;
          box-sizing: border-box;
          cursor: pointer;
          div {
            display: flex;
            align-items: center;
          }
          .ap-sys-but-icon {
            width: 1.5rem;
            height: 1.5rem;
            margin-right: 0.3rem;
            color: var(--jy-primary-6);
          }

          svg {
            vertical-align: middle;
          }
        }
      }

      .btn-ghost {
        width: 28px;
        height: 28px;
        margin: 0 6px;
        .svg-img {
          overflow: hidden;
          img {
            position: relative;
            left: -80px;
            filter: drop-shadow(rgba(#000000, 0.65) 80px 0);
          }
        }
      }
      .ap-personalCenter {
        display: flex;
        align-items: center;
        font-size: 14px;
        width: 55px;
        height: 42px;
        border: none;
        --el-button-hover-bg-color: rgba(0, 0, 0, 0.04);
        margin-left: 10px;
        .ap-personalCenter-text {
          display: flex;
          align-items: center;
          cursor: pointer;
          margin-right: 8px;

          .ap-personalCenter-name {
            @include mixin-width(34);
            @include mixin-height(34);
            border-radius: 4px;
            background-color: var(--jy-primary-6);
            color: var(--jy-in-common-use-1);
            // padding: 0.5rem 0.4rem;
            box-sizing: border-box;
            margin-right: 0.3rem;
            display: flex;
            align-items: center;
            align-content: center;
            justify-content: center;
            font-size: var(--jy-font-size-body-1);
          }

          img {
            margin-left: 8px;
          }
        }
        .iconpark-icon {
          width: 8px;
        }
      }

      .ap-personalCenterDropdown {
        .dropdown-box {
          box-sizing: border-box;
        }

        .dropdown-name {
          height: 120px;
          border-radius: 4px;
          background-color: #f4f5f7;
          text-align: center;
          display: flex;
          align-items: center;
          align-content: center;
          justify-content: center;
          flex-flow: wrap;
          margin-bottom: 8px;

          .dropdown-name-icon {
            @include mixin-width(50);
            @include mixin-height(50);
            display: flex;
            align-items: center;
            align-content: center;
            justify-content: center;
            border-radius: 4px;
            background-color: var(--jy-primary-4);
            color: var(--jy-in-common-use-1);
            margin-bottom: 0.5rem;
          }

          .dropdown-name-text {
            width: 100%;
            font-weight: 500;
            font-size: 16px;
          }
        }

        .dropdown-list {
          .dropdown-list-li {
            position: relative;
            padding: 0 8px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            cursor: pointer;
            color: rgba(0, 0, 0, 0.65);
            overflow: hidden;

            &:hover {
              color: var(--jy-primary-6) !important;

              img {
                position: relative;
                left: -80px;
                filter: drop-shadow(var(--jy-primary-6) 80px 0);
              }
            }

            i {
              position: absolute;
              right: 0;
              top: 50%;
              font-size: 18px;
              transform: translateY(-50%);
            }
          }

          .svg-hover {
            img {
              position: relative;
              left: -80px;
              filter: drop-shadow(var(--jy-primary-6) 80px 0);
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
          color: var(--jy-primary-6);
        }

        .popover-selected::after {
          content: '';
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          width: 12px;
          height: 8px;
          background: url(@/assets/images/navbar/change_lan_icon.svg) no-repeat
            center center;
          background-size: 100%;
        }
      }
      .iconpark-icon {
        width: 20px;
        height: 20px;
      }
    }
  }

  .header-content {
    min-width: 800px;
  }

  .from-label {
    text-align: end;
    font-size: 14px;
    font-weight: 400;
    width: 100%;
    color: rgba(0, 0, 0, 0.65);
  }
  .nav-bar-container.light {
    background-color: #fff;
  }
  .nav-bar-container.dark {
    background: linear-gradient(
      90deg,
      #2a313d 5.28%,
      #35394f 42.55%,
      #29303a 97.5%
    );
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.06);

    .nav-left {
      :deep(.depart-dropdown) {
        font-size: 16px;
        color: #fff;
        .el-dropdown-link {
          color: #fff;
        }
      }
    }
    .nav-right {
      .ap-sys-but {
        background-color: var(--jy-primary-6);
        color: #fff;
        .iconpark-icon {
          margin-right: 8px;
        }
      }
      .iconpark-icon {
        color: #fff;
      }
    }
  }
</style>

<style lang="scss">
  :focus-visible {
    outline: 0;
  }
</style>
