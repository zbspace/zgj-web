<template>
  <div class="update-password">

    <!-- top -->
    <div class="up-top">
      <!-- 返回按钮 -->
      <div class="back-btn" @click="$emit('close')">
        <i class="ri-arrow-left-s-line"></i>
      </div>
      <!-- title -->
      <div class="back-t">{{ $t('t-zgj-F_SYSTEM_PERSON_MANAGE_RESET_PWD') }}</div>

      <div></div>
    </div>

    <!-- 步骤条 -->
    <div class="l-steps">
      <VSteps :active="state.active" :lists="state.lists"></VSteps>
    </div>

    <!-- 输入框 -->
    <div class="l-u-inpt">
      <!-- ① - 验证码 -->
      <div class="login-input" v-if="state.active === state.lists[0].value">
        <el-input
          v-model="state.inputPhone"
          :placeholder="state.placeholderPhone"
          size="large"
          class="l-inpt"
          clearable
        >
          <template #prepend>
            <el-select v-model="state.select" placeholder="+86" style="width: 80px" size="large">
              <el-option label="+86" value="1" />
            </el-select>
          </template>
        </el-input>

        <div class="l-code"> 

          <el-input 
          v-model="state.inputCode"
          :placeholder="state.placeholderCode"
          size="large" clearable>
          </el-input>

          <VerificationBtn></VerificationBtn>
        </div>
      </div>

      <!-- ② - 重置密码 -->
      <div class="login-input" v-if="state.active === state.lists[1].value">
        <el-input 
          v-model="state.inputAccount"
          :placeholder="state.placeholderPassword"
          size="large" clearable
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
          class="l-code-inpt">

            <template #prefix>
              <div class="icon">
                <img src="../../../assets/images/login/l_password_icon.svg" />
              </div>
            </template>

          </el-input>

        </div>
      </div>

      <!-- ③ - 重置完成 -->
      <div class="l-u-succcess" v-if="state.active === state.lists[2].value">
        <img src="../../../assets/images/login/l_success_icon.png" />
        <div>{{ $t('t-zgj-pwd.succeeded')}}</div>
      </div>
    </div>

    <!-- footer -->
    <div class="l-u-footer">
      <!-- 下一步 -->
      <el-button type="primary" class="btn" @click="state.active = 2" v-if="state.active === state.lists[0].value">{{ $t('t-zgj-next') }}</el-button>
      <el-button type="primary" class="btn" @click="state.active = 3" v-if="state.active === state.lists[1].value">{{ $t('t-zgj-operation.submit') }}</el-button>
      <el-button type="primary" class="btn" @click="$emit('close')" v-if="state.active === state.lists[2].value">{{ $t('t-zgj-chooseUnit.ReturnLogin') }}</el-button>
      
    </div>
  </div>
</template>


<script setup>
import VSteps from "../components/VSteps.vue"
import VerificationBtn from "../components/VerificationBtn.vue"
import i18n from "../../../i18n";
import { reactive, watch } from "vue";

const state = reactive({
  active: 1,
  inputPhone: null,
  inputCode: null,
  inputAccount: null,
  inputPassword: null,
  placeholderPhone: null,
  placeholderCode: null,
  placeholderPassword: null,
  placeholderPasswordAgain: null,
  lists: [
    {
      value: 1,
      label: '验证手机号'
    },
    {
      value: 2,
      label: '重置密码'
    },
    {
      value: 3,
      label: '重置完成'
    },
  ]
})

// 监听 语言切换
watch(()=> i18n.global.locale, () => {
  state.placeholderPhone = i18n.global.t('t-zgj-sealElectronic.mobilePlease')
  state.placeholderCode = i18n.global.t('t-zgj-verification.required')
  state.placeholderPassword = i18n.global.t('t-zgj-password.PleaseSet816')
  state.placeholderPasswordAgain = i18n.global.t('t-zgj-password.PleaseNewAgain')
}, { immediate: true, deep: true})

</script>

<style scoped lang="scss">
.update-password {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  right: 0;
  bottom: 0;
  width: 790px;
  height: 530px;
  background: #FFFFFF;
  border: 1px solid #F0F0F0;
  box-shadow: 0 8px 100px 0 rgba(19,59,99,0.07);
  border-radius: 4px;
  margin: auto;
  z-index: 999;
  padding: 35px;

  .up-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  .back-btn {
      font-size: 34px;
      font-weight: 400;
      cursor: pointer;
    }

    .back-t {
      font-family: PingFang-SC-Bold;
      font-weight: 700;
      font-size: 20px;
      color: #303133;
    }
  }

  .l-steps {
    margin: 30px 0 70px 0;
  }

  .l-u-inpt {
    padding: 0 172px;
    margin: 27px 0 0px 0;
    height: 168px;

    .l-inpt {
      margin-bottom: 20px;
    }

    .l-code {
      display: flex;

      .btn {
        font-size: 16px;
        color: #FAFAFA;
        width: 180px;
        height: 44px;
        border-radius: 2px;
        text-align: center;
        line-height: 44px;
        background: #D0963E;
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
          content: "";
          position: absolute;
          right: 0;
          top: 52%;
          transform: translateY(-50%);
          width: 1px;
          height: 18px;
          background: #F0F0F0;
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

  .l-u-footer {
    display: flex;
    justify-content: center;
    margin-top: 70px;
    .btn {
      font-size: 16px;
      color: #FAFAFA;
      width: 362px;
      height: 44px;
      border-radius: 2px;
      text-align: center;
      line-height: 44px;
      background: #D0963E;
    }
  }
}
</style>