<template>
  <div class="l-register">
    <!-- top -->
    <div class="up-top">
      <!-- 返回按钮 -->
      <div class="back-btn" @click="$emit('close')">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect opacity="0.01" width="24" height="24" fill="black" />
          <path
            d="M5.43286 11.2172C5.05786 11.5922 5.05786 12.1992 5.43286 12.5742L14.5407 21.682C14.9157 22.057 15.5227 22.057 15.8977 21.682C16.2727 21.307 16.2727 20.7 15.8977 20.325L6.78989 11.2172C6.41489 10.8422 5.80786 10.8422 5.43286 11.2172Z"
            fill="#242424"
          />
          <path
            d="M5.43286 12.6071C5.80786 12.9821 6.41489 12.9821 6.78989 12.6071L15.8977 3.49924C16.2727 3.12424 16.2727 2.51721 15.8977 2.14221C15.5227 1.76721 14.9157 1.76721 14.5407 2.14221L5.43286 11.25C5.05786 11.625 5.05786 12.2321 5.43286 12.6071Z"
            fill="#242424"
          />
        </svg>
      </div>
      <!-- title -->
      <div class="back-t">{{ $t('t-immediate-register') }}</div>

      <div class="back-btn"></div>
    </div>

    <!-- msg -->
    <div class="l-r-msg">{{ $t('t-tips-register') }}</div>

    <!-- input -->
    <div class="login-input l-r-inpt">
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
        >
        </el-input>

        <VerificationBtn></VerificationBtn>
      </div>

      <el-input
        v-model="state.inputAccount"
        :placeholder="state.placeholderPassword"
        size="large"
        clearable
        class="l-inpt l-code-inpt"
      >
        <template #prefix>
          <div class="icon">
            <img src="../../../assets/images/login/l_password_icon.svg" />
          </div>
        </template>
      </el-input>

      <div class="l-code">
        <el-input
          v-model="state.inputPassword"
          :placeholder="state.placeholderPasswordAgain"
          size="large"
          :type="state.showPass ? 'text' : 'password'"
          class="l-code-inpt"
        >
          <template #prefix>
            <div class="icon">
              <img src="../../../assets/images/login/l_password_icon.svg" />
            </div>
          </template>
        </el-input>
      </div>
    </div>

    <!-- 协议 -->
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

    <!-- footer -->
    <div class="l-r-footer">
      <el-button type="primary" class="btn" @click="$emit('close')">
        {{ $t('t-register') }}
      </el-button>
    </div>
  </div>
</template>

<script setup>
  import i18n from '@/utils/i18n'
  import { reactive, watch } from 'vue'
  import VerificationBtn from '../components/VerificationBtn.vue'
  const state = reactive({
    inputPhone: null,
    inputCode: null,
    inputAccount: null,
    inputPassword: null,
    placeholderPhone: null,
    placeholderCode: null,
    placeholderPassword: null,
    placeholderPasswordAgain: null,
    protocal: false
  })

  // 监听 语言切换
  watch(
    () => i18n.global.locale,
    () => {
      state.placeholderPhone = i18n.global.t(
        't-zgj-sealElectronic.mobilePlease'
      )
      state.placeholderCode = i18n.global.t('t-zgj-verification.required')
      state.placeholderPassword = i18n.global.t('t-zgj-password.PleaseSet816')
      state.placeholderPasswordAgain = i18n.global.t(
        't-zgj-password.PleaseNewAgain'
      )
    },
    { immediate: true, deep: true }
  )
</script>

<style scoped lang="scss">
  .l-register {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    right: 0;
    bottom: 0;
    width: 790px;
    height: 530px;
    background: #ffffff;
    border: 1px solid #f0f0f0;
    box-shadow: 0 8px 100px 0 rgba(19, 59, 99, 0.07);
    border-radius: 4px;
    margin: auto;
    z-index: 999;
    padding: 30px;

    .up-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .back-btn {
        width: 40px;
        font-size: 34px;
        font-weight: 400;
        cursor: pointer;
      }

      .back-t {
        flex: 1;
        text-align: center;
        font-family: PingFang-SC-Bold;
        font-weight: 700;
        font-size: 20px;
        color: #303133;
      }
    }

    .l-r-msg {
      font-family: PingFangSC-Regular;
      font-weight: 400;
      font-size: 14px;
      color: #303133;
      margin: 8px 0 15px 0;
      text-align: center;
    }

    .l-r-inpt {
      padding: 0 172px;

      .l-code {
        display: flex;
        margin: 20px 0;
        .btn {
          font-size: 16px;
          color: #fafafa;
          width: 180px;
          height: 44px;
          border-radius: 2px;
          text-align: center;
          line-height: 44px;
          background: var(--jy-primary-6);
          margin-left: 10px;
        }
      }

      .l-r-inpt {
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
      }

      .l-u-succcess {
        display: flex;
        justify-items: center;
        align-items: center;
        flex-direction: column;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        font-size: 16px;
        color: #303133;
        img {
          width: 102px;
          height: 102px;
          margin-bottom: 45px;
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

    .l-r-footer {
      display: flex;
      justify-content: center;
      margin-top: 20px;
      .btn {
        font-size: 16px;
        color: #fafafa;
        width: 362px;
        height: 44px;
        border-radius: 2px;
        text-align: center;
        line-height: 44px;
        background: var(--jy-primary-6);
      }
    }
  }
</style>
