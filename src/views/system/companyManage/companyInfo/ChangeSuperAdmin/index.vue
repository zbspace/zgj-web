<template>
  <div>
    <JyDialog
      :title="step === 1 ? '身份验证' : '变更超级管理员'"
      v-model="isVisible"
      @on-closed="onClosed"
      @on-opened="getUserList"
    >
      <div class="authentication-form">
        <el-form
          :model="formData"
          label-width="112px"
          :rules="rules"
          ref="formRef"
        >
          <div v-if="step === 1">
            <el-form-item label="验证方式">
              <el-radio-group v-model="formData.verification">
                <el-radio :label="1">手机号验证</el-radio>
                <el-radio :label="2">邮箱验证</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="超级管理员">
              <span>{{ superAdminInfo.adminName }}</span>
            </el-form-item>
            <el-form-item label="超级管理员账号">
              <span>{{ superAdminInfo.accountNo }}</span>
            </el-form-item>
            <el-form-item label="超级管理员手机号">
              <span>{{ superAdminInfo.adminTel }}</span>
            </el-form-item>
            <el-form-item label="超级管理员邮箱号">
              <span>{{ superAdminInfo.adminEmail }}</span>
            </el-form-item>
            <el-form-item label="验证码" prop="vcode">
              <div class="vcode">
                <el-input
                  v-model="formData.vcode"
                  maxlength="6"
                  oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
                />
                <el-button
                  type="primary"
                  :disabled="countdownTime >= 0"
                  @click="sendVCode"
                  >{{
                    countdownTime < 0
                      ? '获取验证码'
                      : countdownTime + '秒后重发'
                  }}</el-button
                >
              </div>
            </el-form-item>
          </div>

          <div v-if="step === 2">
            <el-form-item label="超级管理员">
              <span>{{ superAdminInfo.adminName }}</span>
            </el-form-item>
            <el-form-item label="超级管理员账号">
              <span>{{ superAdminInfo.accountNo }}</span>
            </el-form-item>
            <el-form-item label="新的超管姓名" prop="adminId">
              <el-select
                style="width: 264px"
                v-model="formData.adminId"
                filterable
                @change="changeAdmin"
              >
                <el-option
                  v-for="item in userList"
                  :key="item.userId"
                  :label="item.userName"
                  :value="item.userId"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="新的超管账号">
              <el-input
                v-model="formData.adminName"
                disabled
                style="width: 264px"
              ></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>

      <template #footer>
        <el-button type="primary" @click="next" v-if="step === 1">
          下一步
        </el-button>
        <el-button type="primary" @click="submit" v-if="step === 2">
          提交
        </el-button>
        <el-button @click="cancel"> 取消 </el-button>
      </template>
      <Verify
        captchaType="blockPuzzle"
        v-model="openVerify"
        v-if="openVerify"
        @success="success"
        getUrl="/tenant/tenantAdminInfo/getImageVerifyCode/blockPuzzle"
        checkUrl="/tenant/tenantAdminInfo/verifyCode"
      ></Verify>
    </JyDialog>
  </div>
</template>

<script setup>
  import { ref, reactive, computed } from 'vue'
  import JyDialog from '@/components/common/JyDialog/index2'
  import apis from '@/api/system/companyManagement/companyInfo'
  import userApi from '@/api/system/companyManagement/departmentStaff'
  import { ElMessage } from 'element-plus'
  import Verify from '@/views/login/components/verifition/Verify'
  import { messageError } from '@/hooks/useMessage'

  class SuperAdmin {
    name = ''
    data = ''
    vcode = ''
    verification = 1
    adminId = null
    adminName = ''
  }
  const formData = ref(new SuperAdmin())
  const formRef = ref(null)
  const step = ref(1)
  const userList = ref([])
  const timer = ref(null)
  const countdownTime = ref(-1)
  const haveChecked = ref(false)
  const openVerify = ref(false)

  const props = defineProps({
    visible: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    superAdminInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  })

  const emit = defineEmits(['update:modelValue', 'updateSuperAdminInfo'])
  const rules = reactive({
    vcode: [
      {
        required: true,
        message: '验证码是6位数字',
        trigger: 'change',
        pattern: /^\d{6}$/
      }
    ],
    adminId: [
      {
        required: true,
        message: '超管不能为空',
        trigger: 'change'
      }
    ]
  })

  const isVisible = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      emit('update:modelValue', value)
    }
  })

  const next = async () => {
    try {
      await formRef.value.validate()
      await apis.verifyCode({
        type: formData.value.verification,
        contact:
          formData.value.verification === 1
            ? props.superAdminInfo.adminTel
            : props.superAdminInfo.adminEmail,
        verifyCode: formData.value.vcode
      })
      step.value = 2
    } catch (error) {
      messageError(error)
    }
  }

  const getUserList = () => {
    userApi
      .userPage({
        flag: 1,
        current: 1,
        size: 10000
      })
      .then(res => {
        userList.value = res.data.records
      })
  }

  const changeAdmin = e => {
    formData.value.adminName = userList.value.find(
      i => i.userId === e
    ).accountNo
  }

  const submit = async () => {
    await formRef.value.validate((valid, fields) => {
      console.log(fields)
      if (valid) {
        // cancel()
        apis
          .updateAdmin({
            adminId: formData.value.adminId
          })
          .then(res => {
            ElMessage({
              message: '超级管理员变更成功',
              type: 'success'
            })
            emit('updateSuperAdminInfo')
            step.value = 1
            formData.value = ref(new SuperAdmin())
          })
      } else {
        console.log('error', fields)
      }
    })
  }

  const cancel = () => {
    isVisible.value = false
    setTimeout(() => {
      step.value = 1
      formData.value = new SuperAdmin()
    }, 300)
  }

  const sendVCode = async () => {
    if (!haveChecked.value) {
      openVerify.value = true
    } else {
      if (!timer.value) {
        try {
          await apis.getVerificationCode({
            type: formData.value.verification,
            contact:
              formData.value.verification === 1
                ? props.superAdminInfo.adminTel
                : props.superAdminInfo.adminEmail
          })
          countdownTime.value = 60
          timer.value = setInterval(() => {
            if (countdownTime.value < 0) {
              clearInterval(timer.value)
              timer.value = null
            } else {
              countdownTime.value--
            }
          }, 1000)
        } catch (error) {
          ///
        }
      }
    }
  }

  const onClosed = () => {
    clearInterval(timer.value)
    timer.value = null
    countdownTime.value = -1
  }

  const success = captchaVerification => {
    haveChecked.value = true
    sendVCode()
  }

  defineExpose({ success })
</script>

<script>
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'ChangeSuperAdmin'
  })
</script>

<script></script>
<style lang="scss" scoped>
  .authentication-form {
    :deep(.el-form) {
      .el-form-item {
        margin-bottom: 16px;
        .el-form-item__label {
          font-family: 'PingFang SC';
          font-style: normal;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.65);
          padding: 0;
          margin-right: 16px;
          margin-bottom: 0;
        }
        .vcode {
          display: flex;
          button {
            margin-left: 10px;
            width: 124px;
            flex-shrink: 0;
          }
        }
      }
    }
  }
</style>
