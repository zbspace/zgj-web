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
          <el-form
            label-position="left"
            ref="loginformCodeRef"
            label-width="1"
            :model="codeLoginForm"
            hide-required-asterisk
            :rules="codeRules"
          >
            <el-form-item prop="inputPhone" class="l-inpt">
              <el-input
                v-model="codeLoginForm.inputPhone"
                :placeholder="state.placeholderPhone"
                size="large"
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
            </el-form-item>

            <el-form-item prop="inputCode">
              <div class="l-code">
                <el-input
                  v-model="codeLoginForm.inputCode"
                  :placeholder="state.placeholderCode"
                  size="large"
                  clearable
                />

                <VerificationBtn
                  :customStyle="customStyle"
                  :customClick="true"
                  @customClickFn="customClick"
                />
              </div>
            </el-form-item>
          </el-form>
        </div>

        <!-- 输入框 - 密码 -->
        <div v-else class="login-input">
          <el-form
            label-position="left"
            ref="loginformAccountRef"
            label-width="1"
            :model="accountLoginForm"
            hide-required-asterisk
            :rules="accountRules"
          >
            <el-form-item prop="accountNo">
              <el-input
                v-model="accountLoginForm.accountNo"
                :placeholder="state.placeholderCodeAndAccount"
                size="large"
                clearable
                class="l-code-inpt"
                @keyup.enter="login"
              >
                <template #prefix>
                  <div class="icon">
                    <img src="../../../assets/images/login/l_user_icon.svg" />
                  </div>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item prop="accountPass">
              <div class="l-code">
                <el-input
                  v-model="accountLoginForm.accountPass"
                  :placeholder="state.placeholderPassword"
                  size="large"
                  maxlength="18"
                  :type="state.showPass ? 'text' : 'password'"
                  class="l-code-inpt"
                  @keyup.enter="login"
                >
                  <template #prefix>
                    <div class="icon">
                      <img
                        src="../../../assets/images/login/l_password_icon.svg"
                      />
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
            </el-form-item>
          </el-form>

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
          <!-- <span class="item" @click.stop="previewAgreement"
            >《 {{ $t('t-service-protocol') }} 》</span
          >
          <span class="item" @click.stop="previewPolicy"
            >《{{ $t('t-privacy-policy') }}》</span
          > -->
          <span class="item">《 {{ $t('t-service-protocol') }} 》</span>
          <span class="item">《{{ $t('t-privacy-policy') }}》</span>
        </div>
      </div>

      <!-- btn -->
      <div class="l-btn">
        <el-button
          type="primary"
          class="btn"
          @click="login"
          :loading="loginLoading"
        >
          {{ $t('t-zgj-login.loginButton') }}
        </el-button>
      </div>

      <!-- 注册 -->
      <div class="l-registe" v-if="false">
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
    <Verify
      captchaType="blockPuzzle"
      v-model="openVerify"
      v-if="openVerify"
      @success="loginFn"
    ></Verify>
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

    <JyDialog
      @update:show="showDialog = $event"
      :show="showDialog"
      :title="title"
      :footer="false"
      :width="600"
      :height="600"
      :key="title"
    >
      <el-scrollbar height="570px">
        <div v-html="content"></div>
      </el-scrollbar>
    </JyDialog>
  </div>
</template>
<script setup>
  import i18n from '@/utils/i18n'
  import { reactive, watch, onMounted, ref } from 'vue'
  import VerificationBtn from '../components/VerificationBtn.vue'
  import UpdagePasswordDialog from './UpdagePasswordDialog.vue'
  import ImmediateRegister from './Register.vue'
  import { useAccountInfoStore } from '@/store/accountInfo'
  import { useRoute } from 'vue-router'
  import { ElMessage } from 'element-plus'
  import md5 from 'js-md5'
  import { setItem, getItem } from '@/utils/storage.js'
  import loginApi from '@/api/login'
  import navBarApi from '@/api/common/navbar.js'
  import Verify from '../components/verifition/Verify'
  import { useMenusInfoStore } from '@/store/menus'

  const accountInfo = useAccountInfoStore()
  const menusInfoStore = useMenusInfoStore()
  const route = useRoute()
  const showDialog = ref(false)
  const title = ref(null)
  const content = ref(null)
  // eslint-disable-next-line no-unused-vars
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    departLists: {
      type: Array,
      default() {
        return []
      }
    }
  })
  const openVerify = ref(false)
  const emits = defineEmits([
    'update:modelValue',
    'update:departLists',
    'getWater'
  ])
  const state = reactive({
    activeCodeLogin: false, // 验证码登录
    protocal: false, // 协议
    rememberPas: false, // 记住密码
    placeholderPhone: null,
    placeholderCode: null,
    placeholderCodeAndAccount: null,
    placeholderPassword: null,
    lang: i18n.global.locale,
    showPass: false, // 显示密码
    showUpdateDialog: false,
    ImmediateRegisterDialog: false
  })

  const rulesTips = reactive({
    codeRulesPhoneMsg: null,
    codeRulesCodeMsg: null,
    accountRulesNo: null,
    accountRulesPass: null
  })

  const loginLoading = ref(false)

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

      rulesTips.codeRulesPhoneMsg = i18n.global.t('t-zgj-login-iphone-num')
      rulesTips.codeRulesCodeMsg = i18n.global.t('t-zgj-login-veritify-code')
      rulesTips.accountRulesNo = i18n.global.t('t-zgj-login-account-num')
      rulesTips.accountRulesPass = i18n.global.t('t-zgj-login-account-pwd')
    },
    { immediate: true, deep: true }
  )

  const validatePhone = (rule, value, callback) => {
    const reg = /^1[3-9]\d{9}$/
    if (reg.test(value)) {
      callback()
    } else {
      callback(new Error('手机号格式不正确'))
    }
  }
  const codeLoginForm = reactive({
    inputPhone: null,
    inputCode: null
  })
  const codeRules = reactive({
    inputPhone: [
      {
        required: true,
        message: rulesTips.codeRulesPhoneMsg,
        trigger: 'blur'
      },
      { validator: validatePhone, trigger: 'blur' }
    ],
    inputCode: [
      {
        required: true,
        message: rulesTips.codeRulesCodeMsg,
        trigger: 'blur'
      },
      {
        type: 'number',
        message: '验证码错误',
        trigger: ['blur', 'change']
      }
    ]
  })

  const accountLoginForm = reactive({
    accountNo: null,
    accountPass: null
  })
  const accountRules = reactive({
    accountNo: [
      {
        required: true,
        message: rulesTips.accountRulesNo,
        trigger: 'blur'
      }
    ],
    accountPass: [
      {
        required: true,
        message: rulesTips.accountRulesPass,
        trigger: 'blur'
      }
    ]
  })

  onMounted(() => {
    const accountInfo = getItem('accountInfo')
    accountLoginForm.accountNo = accountInfo && accountInfo.accountNo
    accountLoginForm.accountPass = accountInfo && accountInfo.accountPass
    state.rememberPas = accountInfo && accountInfo.rememberPas
    state.protocal = accountInfo && accountInfo.rememberPas
  })

  // 监听 tabs 切换
  const changeTabs = val => {
    state.activeCodeLogin = val
  }
  const loginformCodeRef = ref(null)
  const loginformAccountRef = ref(null)
  // 打开 重置密码
  const getUpdateDialog = () => {
    loginformAccountRef.value.clearValidate()
    state.showUpdateDialog = true
  }

  // 关闭 重置密码弹窗
  const closeUpdateDialog = () => {
    state.showUpdateDialog = false
    state.ImmediateRegisterDialog = false
  }
  const getRedirect = () => {
    return route.query.redirect
      ? decodeURIComponent(route.query.redirect)
      : '/frontDesk/home'
  }
  // const goHome = () => {
  //   const redirect = getRedirect()
  //   router.replace(redirect)
  // }

  const loginFn = attr => {
    let params = {
      accountNo: accountLoginForm.accountNo,
      accountPass: md5(accountLoginForm.accountPass)
    }
    if (attr) {
      params = {
        accountNo: accountLoginForm.accountNo,
        accountPass: md5(accountLoginForm.accountPass),
        captchaToken: attr.token,
        captcha: attr.pointJson,
        secretKey: attr.secretKey
      }
    }
    // 账号密码登录
    loginLoading.value = true
    loginApi.loginByAccount(params).then(
      loginResult => {
        if (loginResult.code === 210600) {
          loginLoading.value = false
          openVerify.value = true
          return
        }
        loginLoading.value = false
        openVerify.value = false
        // 存储登录用户信息
        accountInfo.setToken({
          token: loginResult.data.tokenValue
        })

        // 记住密码
        if (state.rememberPas) {
          accountInfo.setAccountAndPassword({
            accountNo: accountLoginForm.accountNo,
            accountPass: accountLoginForm.accountPass
          })
        } else {
          accountInfo.removeLoginStatus()
        }

        // 获取登录列表
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
              emits('update:modelValue', true)
              emits('update:departLists', departListResult.data)
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
      },
      () => {
        loginLoading.value = false
      }
    )
  }

  const loginByCodeFn = attr => {
    let params = {
      accountNo: accountLoginForm.accountNo,
      accountPass: md5(accountLoginForm.accountPass)
    }
    if (attr) {
      params = {
        accountNo: accountLoginForm.accountNo,
        accountPass: md5(accountLoginForm.accountPass),
        captchaToken: attr.token,
        captcha: attr.pointJson,
        secretKey: attr.secretKey
      }
    }
    // 验证码登录
    loginLoading.value = true
    loginApi.sendVerificationCode(params).then(
      loginResult => {
        if (loginResult.code === 210600) {
          loginLoading.value = false
          openVerify.value = true
          return
        }
        loginLoading.value = false
        openVerify.value = false
        // 存储登录用户信息
        accountInfo.setToken({
          token: loginResult.data.tokenValue
        })

        // 获取登录列表
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
              emits('update:modelValue', true)
              emits('update:departLists', departListResult.data)
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
      },
      () => {
        loginLoading.value = false
      }
    )
  }

  const getUserLoginInfo = bool => {
    // 获取用户信息 - 缓存
    navBarApi.getUserInfo().then(userInfo => {
      const obj = {
        userId: userInfo.data && userInfo.data.userId,
        userName: userInfo.data && userInfo.data.userName
      }
      accountInfo.setUserInfo(obj)
      emits('getWater', bool)
      // goHome()
    })
  }

  const login = () => {
    if (!state.protocal) {
      ElMessage.warning('请阅读并同意服务协议和隐私政策')
      return
    }

    // 验证码登录验证
    const formRef = ref(null)
    formRef.value = state.activeCodeLogin
      ? loginformCodeRef.value
      : loginformAccountRef.value

    formRef.value.validate(async valid => {
      if (valid) {
        if (!state.activeCodeLogin) {
          // ① 账号密码登录
          loginFn()
        } else {
          // ② 验证码登录 - 删除
        }
      }
    })
  }

  const previewAgreement = () => {
    showDialog.value = true
    title.value = '服务协议'
    content.value = `
<p><strong>一、受理原则</strong></p>
<p>交易双方使用好测网服务进行交易时，应当遵守好测网网站上公示的各项规则，因未使用好测网公示服务进行交易或超出时限而产生的举报或交易纠纷，本网站不予受理。</p>
<p><strong>二、身份核实</strong></p>
<p>举报或争议纠纷处理过程中，本网站可要求您提供身份证明，拒不提供身份证明的，本网站将不予接受其举报或争议纠纷处理申请或者会做出不利于该方的处理。</p>
<p><strong>三、举证责任</strong></p>
<p>本网站可要求任意一方或双方提供包括但不限于下述证据，且本网站有权单方判断证据的效力：</p>
<p>1、维权方负有证明责任，要求提供包括交易过程、原始信息、相关凭证等证据资料；</p>
<p>2、纠纷双方均同意，因交易双方约定不清而产生交易纠纷的，撤销该交易，因此导致的损失由交易双方共同承担，具体承担比例由本网站根据具体情况判断；</p>
<p>3、纠纷双方同意，在纠纷处理过程中，当任何一方如出现以下情况：</p>
<p>1）更换联系方式未通知网站或对方一直在纠纷处理过程中无法联系；</p>
<p>2）网站三次联系任何一方（无论任何途径）均无法在纠纷问题上进行实质沟通；</p>
<p>3）拒接电话、无人接听、在通话中因不属于网站的原因中断等任何一种或各种情况累加达三次；</p>
<p>4）恶意辱骂工作人员导致无法沟通的。</p>
<p>平台将视该方自愿放弃辩解的权利。平台将依据已有的证据给出处理意见。平台将以站内信、短信、邮件等形式通知其纠纷处理的进度及结果。</p>
<p>4、纠纷双方同意，本网站仅以普通人的判断力对双方提交的证据进行形式和内容的审查，并作出判断，纠纷双方需自行对证据的真实性、完整性、合法性、准确性和及时性负责，并承担举证不能的后果。</p>
<p><strong>四、处理方式</strong></p>
<p>一经核实相关证据后，平台将采取以下处理方式：</p>
<p>1、双方协商处理：对于双方无异议事实，双方并可自愿协商处理的，由双方自行解决。</p>
<p>2、报请相关部门：对于涉及违反相关法律法规条款，由平台报请相关部门进行处理，并配合相关部门提供调查取证工作。</p>
<p>3、寻求法律手段：以上两种方式无法解决的，由平台协助举报方寻求相关法律渠道进行处理，并配合相关要求提供调查取证工作。</p>`
  }

  const previewPolicy = () => {
    showDialog.value = true
    showDialog.value = true
    title.value = '隐私政策'
    content.value = `
<p><strong>一、受理原则</strong></p>
<p>交易双方使用好测网服务进行交易时，应当遵守好测网网站上公示的各项规则，因未使用好测网公示服务进行交易或超出时限而产生的举报或交易纠纷，本网站不予受理。</p>
<p><strong>二、身份核实</strong></p>
<p>举报或争议纠纷处理过程中，本网站可要求您提供身份证明，拒不提供身份证明的，本网站将不予接受其举报或争议纠纷处理申请或者会做出不利于该方的处理。</p>
<p><strong>三、举证责任</strong></p>
<p>本网站可要求任意一方或双方提供包括但不限于下述证据，且本网站有权单方判断证据的效力：</p>
<p>1、维权方负有证明责任，要求提供包括交易过程、原始信息、相关凭证等证据资料；</p>
<p>2、纠纷双方均同意，因交易双方约定不清而产生交易纠纷的，撤销该交易，因此导致的损失由交易双方共同承担，具体承担比例由本网站根据具体情况判断；</p>
<p>3、纠纷双方同意，在纠纷处理过程中，当任何一方如出现以下情况：</p>
<p>1）更换联系方式未通知网站或对方一直在纠纷处理过程中无法联系；</p>
<p>2）网站三次联系任何一方（无论任何途径）均无法在纠纷问题上进行实质沟通；</p>
<p>3）拒接电话、无人接听、在通话中因不属于网站的原因中断等任何一种或各种情况累加达三次；</p>
<p>4）恶意辱骂工作人员导致无法沟通的。</p>
<p>平台将视该方自愿放弃辩解的权利。平台将依据已有的证据给出处理意见。平台将以站内信、短信、邮件等形式通知其纠纷处理的进度及结果。</p>
<p>4、纠纷双方同意，本网站仅以普通人的判断力对双方提交的证据进行形式和内容的审查，并作出判断，纠纷双方需自行对证据的真实性、完整性、合法性、准确性和及时性负责，并承担举证不能的后果。</p>
<p><strong>四、处理方式</strong></p>
<p>一经核实相关证据后，平台将采取以下处理方式：</p>
<p>1、双方协商处理：对于双方无异议事实，双方并可自愿协商处理的，由双方自行解决。</p>
<p>2、报请相关部门：对于涉及违反相关法律法规条款，由平台报请相关部门进行处理，并配合相关部门提供调查取证工作。</p>
<p>3、寻求法律手段：以上两种方式无法解决的，由平台协助举报方寻求相关法律渠道进行处理，并配合相关要求提供调查取证工作。</p>`
  }

  const customStyle = {
    height: '48px'
  }

  const customClick = () => {
    loginformCodeRef.value.validateField('inputPhone', async valid => {
      if (valid) {
        openVerify.value = true
      }
    })
  }
  defineExpose({
    loginFn,
    loginByCodeFn
  })
</script>

<style scoped lang="scss">
  .el-input {
    --el-component-size-large: 48px;
  }
  .el-input__wrapper {
    height: 48px;
  }
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
        color: var(--jy-primary-6);
        &::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 180px;
          height: 4px;
          background: var(--jy-primary-6);
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
        padding-bottom: 20px;
      }

      .l-code {
        display: flex;
        width: 100%;

        .btn {
          font-size: 16px;
          color: #fafafa;
          width: 180px;
          border-radius: 2px;
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
