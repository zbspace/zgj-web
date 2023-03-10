<!--
* @Descripttion NavBar
* @FileName index.vue
* @Author WalterXsk
* @LastEditTime 2023-03-09 14:08:17
!-->
<template>
  <header id="page-topbar">
    <div class="nav-bar-container header-content">
      <!-- nav-left -->
      <div class="nav-left">
        <!-- logo -->
        <router-link to="/" class="nav-logo">
          <span class="logo-lg">
            <img src="@/assets/icon/logo.png" alt="" height="37" />
          </span>
        </router-link>

        <!-- 公司选择 -->
        <el-button class="depart-dropdown" text>
          <el-dropdown
            trigger="hover"
            :teleported="false"
            @command="chooseDepart"
            :disabled="state.departLists.length < 2"
          >
            <span class="el-dropdown-link">
              {{ state.currentDepart.tenantName }}
              <el-icon
                class="el-icon--right"
                v-if="state.departLists.length > 1"
              >
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <div class="ap-enterprise">
                  <div class="ap-enterprise-text">
                    <div class="ap-enterprise-text-list"> 企业/组织/团队 </div>
                  </div>
                  <div class="ap-enterprise-cont">
                    <el-dropdown-item
                      v-for="(item, index) in state.departLists"
                      :command="item"
                      :disabled="
                        Number(item.tenantId) === Number(state.tenantId)
                      "
                      :key="index"
                    >
                      <div class="ap-enterprise-cont-list">
                        {{ item.tenantName }}
                        <div
                          class="defart-selected"
                          v-if="state.tenantId === Number(item.tenantId)"
                        />
                      </div>
                    </el-dropdown-item>
                  </div>
                </div>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-button>
      </div>

      <!-- nav-right -->
      <div class="nav-right">
        <!-- 系统 -->
        <div class="ap-sys">
          <div class="ap-sys-but" @click="changeSystemHome">
            <div v-if="menusInfoStore.currentType === 'business'">
              <svg class="ap-sys-but-icon">
                <use href="#xitonghoutai"></use>
              </svg>
              <span>{{ $t('t-back-system-platform') }}</span>
            </div>

            <div v-if="menusInfoStore.currentType === 'system'">
              <svg class="ap-sys-but-icon">
                <use href="#Property1yewuqiantai"></use>
              </svg>
              <span>{{ $t('t-front-platform') }}</span>
            </div>
          </div>
        </div>

        <!-- 帮助 -->
        <div ref="dropdownHelpRef">
          <el-button class="btn-ghost" @click="showHelpPop = !showHelpPop" text>
            <el-tooltip
              effect="dark"
              :content="$t('t-help-center')"
              placement="bottom"
              :show-arrow="true"
            >
              <div :class="showHelpPop ? '' : 'svg-img'" class="svg-img-hover">
                <img src="@/assets/images/navbar/help_select_icon.svg" />
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
            @before-enter="showUserPop"
            @after-leave="hideUserPop"
          >
            <template #reference>
              <el-button class="ap-personalCenter">
                <div class="ap-personalCenter-text">
                  <span class="ap-personalCenter-name">{{
                    accountInfoStore.userName.substr(1)
                  }}</span>
                  <img
                    v-show="!showUserInfoPop"
                    src="@/assets/images/navbar/user_info_close.svg"
                  />
                  <img
                    v-show="showUserInfoPop"
                    src="@/assets/images/navbar/user_info_open.svg"
                  />
                </div>
              </el-button>
            </template>

            <div class="ap-personalCenterDropdown">
              <div class="dropdown-box">
                <div class="dropdown-name">
                  <div class="dropdown-name-icon">
                    {{ accountInfoStore.userName.substr(1) }}
                  </div>
                  <div class="dropdown-name-text">
                    {{ accountInfoStore.userName }}
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
                          ? '#D0963E'
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
  <JyDialog title="修改密码" v-model="showFormDialog" :width="540">
    <el-form label-position="left" ref="loginformRef" :model="loginform">
      <el-form-item
        prop="username"
        :rules="[
          {
            required: true,
            message: '原密码不能为空',
            trigger: 'blur'
          }
        ]"
        style="margin-left: 30px"
      >
        <template #label>
          <div class="from-label">原密码</div>
        </template>
        <el-input
          v-model="loginform.username"
          placeholder="请输入"
          style="width: 264px"
        ></el-input>
      </el-form-item>
      <el-form-item
        prop="username"
        :rules="[
          {
            required: true,
            message: '新密码不能为空',
            trigger: 'blur'
          }
        ]"
        style="margin-left: 30px"
      >
        <template #label>
          <div class="from-label">新密码</div>
        </template>
        <el-input
          v-model="loginform.username"
          placeholder="请输入"
          style="width: 264px"
        ></el-input>
      </el-form-item>
      <el-form-item
        class="clearfix"
        label="验证码"
        prop="password"
        :rules="[
          {
            required: true,
            message: '确认新密码不能为空',
            trigger: 'blur'
          }
        ]"
      >
        <template #label>
          <div class="from-label">确认新密码</div>
        </template>
        <el-input
          v-model="loginform.password"
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
  import VMessageNav from './modules/messageNav.vue'
  import VDownload from './modules/downloadApp.vue'
  import router from '@/router'
  import { useAccountInfoStore } from '@/store/accountInfo'
  import { useMenusInfoStore } from '@/store/menus'
  import { useLanguageStore } from '@/store/language'
  import JyDialog from '@/components/common/JyDialog/index.vue'

  import { ArrowDown } from '@element-plus/icons-vue'
  import loginApi from '@/api/login'
  import { ElMessage } from 'element-plus'
  const accountInfoStore = useAccountInfoStore()
  const menusInfoStore = useMenusInfoStore()
  const languageStore = useLanguageStore()

  const state = reactive({
    application: {
      CurrentSystemType: 'business' // business / system
    },
    language: i18n.global.locale,
    departLists: JSON.parse(localStorage.getItem('departLists')),
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
  console.log(localStorage.getItem('departLists'))

  const CurrentSystemType = sessionStorage.getItem('CurrentSystemType')
  if (CurrentSystemType) {
    state.application.CurrentSystemType = CurrentSystemType
  }

  const getCurrentDepart = () => {
    const departId = Number(localStorage.getItem('tenantId'))
    state.tenantId = departId
    if (departId) {
      const index = state.departLists.findIndex(
        i => Number(i.tenantId) === departId
      )
      if (index > -1) {
        state.currentDepart = state.departLists[index]
      }
    }
  }

  const chooseDepart = e => {
    console.log(e)
    state.chooseTenant = e
    state.JyElMessageBox.header.data = '确认切换企业？'
    state.JyElMessageBox.content.data =
      '是否确认切换企业，切换企业后未保存的数据将被清除，请谨慎操作'
    state.JyElMessageBox.show = true
  }

  const confirmClick = () => {
    loginApi.chooseOrgan(state.chooseTenant.tenantId).then(
      () => {
        localStorage.setItem('tenantId', Number(state.chooseTenant.tenantId))
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
        accountInfoStore.setUserName(null)
        localStorage.removeItem('tenantId')
        localStorage.removeItem('menusInfo')
        localStorage.removeItem('departLists')
        const accountInfo = JSON.parse(localStorage.getItem('accountInfo'))
        accountInfo.token = ''
        accountInfo.userName = ''
        localStorage.setItem('accountInfo', accountInfo)
        // 跳转到登录页
        router.replace({ path: '/login/account' })
        ElMessage.success('退出登录！')
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
    username: '',
    password: ''
  })
  const loginformRef = ref(null)

  const login = () => {
    loginformRef.value.validate(valid => {
      if (valid) {
        showFormDialog.value = false
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
    // padding-left: 32px;
    .nav-left {
      display: flex;

      .nav-logo {
        margin: 0 16px 0 32px;
      }
      .depart-dropdown {
        margin: auto;
        color: #303133;

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

        .ap-sys-but {
          border-radius: 4px;
          opacity: 1;
          border: 1px solid var(--jy-primary-6);
          color: var(--jy-primary-6);
          padding: 0.3rem 0.8rem;
          box-sizing: border-box;
          cursor: pointer;
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
        margin: 0 8px;
        .svg-img {
          overflow: hidden;
          img {
            position: relative;
            left: -80px;
            filter: drop-shadow(rgba(#000000, 0.65) 80px 0);
          }
        }

        .svg-img-hover {
          height: 24px;
        }
      }
      .ap-personalCenter {
        font-size: 14px;
        width: 88px;
        height: 42px;
        border: none;
        --el-button-hover-bg-color: rgba(0, 0, 0, 0.04);
        .ap-personalCenter-text {
          display: flex;
          align-items: center;
          cursor: pointer;

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
            background-color: #e2b062;
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
              color: #d0963e !important;

              img {
                position: relative;
                left: -80px;
                filter: drop-shadow(#d0963e 80px 0);
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
              filter: drop-shadow(#d0963e 80px 0);
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
          color: #d0963e;
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
</style>
