<!--
* @Descripttion 修改员工密码
* @FileName updatePassword.vue
* @Author Guanpf
* @LastEditTime 2023-03-09 15:32:49
!-->
<template>
  <div class="jy-message-box">
    <el-dialog
      v-model="isVisible"
      :before-close="handleClose"
      :show-close="false"
      destroy-on-close
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      width="40%"
      align-center
    >
      <template #header>
        <!-- mode1 -->
        <div>
          <slot name="header">
            <div class="header-div">
              <span>{{ $t(props.title) }}</span>
            </div>
          </slot>
        </div>
        <div class="dialog-header-remove" @click="cancel">
          <svg class="iconpark-icon"><use href="#Vector"></use></svg>
        </div>
      </template>
      <el-form
        :model="state.formData"
        :rules="state.formRules"
        ref="passwordForm"
        label-width="80"
      >
        <el-form-item label="重置方式" prop="resetType" @change="resetChange">
          <el-radio-group v-model="state.formData.resetType">
            <el-radio label="1">手动输入</el-radio>
            <el-radio label="2">随机生成</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-row :gutter="10">
            <el-col :span="state.formData.resetType === '2' ? 22 : 24">
              <el-input
                v-model="state.formData.newPassword"
                placeholder="请输入新密码"
                :disabled="state.formData.resetType === '2'"
              >
              </el-input>
            </el-col>
            <el-col :span="2" v-if="state.formData.resetType === '2'">
              <div @click="generatePass">
                <el-icon class="refresh-icon">
                  <Refresh />
                </el-icon>
              </div>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div class="tips"
        >提示：当员工存在手机号时会以短信的形式向员工发送随机密码，否则重置后请告知员工，以确保其正常登录</div
      >
      <template #footer>
        <el-button type="primary" @click="comifrm">{{
          $t('t-zgj-operation.submit')
        }}</el-button>
        <el-button @click="cancel">{{
          $t('t-zgj-operation.cancel')
        }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
  import { ref, reactive, computed, watch, nextTick } from 'vue'
  import { Refresh } from '@element-plus/icons-vue'
  import api from '@/api/system/companyManagement/departmentStaff'
  import { messageError, messageSuccess } from '@/hooks/useMessage'
  import md5 from 'js-md5'
  const passwordForm = ref(null)
  const props = defineProps({
    show: {
      type: Boolean,
      default: false
    },
    userIds: {
      type: Array,
      default: () => {
        return []
      }
    },
    title: {
      type: String,
      default: '重置密码'
    }
  })
  const emit = defineEmits(['update:show', 'on-confirm', 'on-cancel'])
  const isVisible = computed({
    get() {
      return props.show
    },
    set(value) {
      emit('update:show', value)
    }
  })
  const state = reactive({
    formData: {
      newPassword: '',
      resetType: '1'
    },
    formRules: {
      resetType: [
        {
          required: true,
          message: '请选择重置方式',
          trigger: 'change'
        }
      ],
      newPassword: [
        {
          required: true,
          message: '请输入新密码',
          trigger: 'blur'
        }
      ]
    }
  })

  watch(
    () => props.show,
    () => {
      if (props.show) {
        nextTick(() => {
          passwordForm.value.resetFields()
          state.formData.newPassword = ''
          state.formData.resetType = '1'
        })
      }
    }
  )
  // 重置方式切换
  const resetChange = () => {
    console.log(state.formData.resetType)
    if (state.formData.resetType === '2') {
      generatePass()
    } else {
      state.formData.newPassword = null
    }
  }
  // 生成密码
  const generatePass = () => {
    const pass = getPassword(8)
    state.formData.newPassword = pass
    console.log(pass)
  }
  const handleClose = () => {
    console.log('handleClose')
    state.props.show = false
  }
  const comifrm = () => {
    passwordForm.value.validate(valid => {
      if (valid) {
        console.log(props.title)
        if (props.title === 't-zgj-findpwd.resetPassword') {
          api
            .userResetPassword({
              newPassword: md5(state.formData.newPassword),
              userId: props.userIds[0]
            })
            .then(res => {
              if (res.code === 200) {
                emit('on-confirm')
                messageSuccess('重置密码成功')
              } else {
                messageError('重置密码失败，请重试！')
              }
            })
        }
        if (props.title === 't-zgj-findpwd.batchResetPassword') {
          api
            .userBatchResetPassword({
              newPassword: state.formData.newPassword,
              userIds: props.userIds
            })
            .then(res => {
              if (res.code === 200) {
                emit('on-confirm')
                messageSuccess('批量重置密码成功')
              } else {
                messageError('重置密码失败，请重试！')
              }
            })
        }
      }
    })
    isVisible.value = false
  }
  const cancel = value => {
    emit('on-cancel', value)
    isVisible.value = false
  }
  // 查表得知：
  // 数字0~9对应的ASCII码值是 48-57
  // 大写字母A-Z对应的ASCII码值是 65-90
  // 小写字母a-z对应的ASCII码值是 97-122
  const getPassword = legnth => {
    // 定义一个空数组保存我们的密码
    const passArrItem = []

    // 定义获取密码成员的方法
    const getNumber = () => Math.floor(Math.random() * 10) // 0~9的数字
    const getUpLetter = () =>
      String.fromCharCode(Math.floor(Math.random() * 26) + 65) // A-Z
    const getLowLetter = () =>
      String.fromCharCode(Math.floor(Math.random() * 26) + 97) // a-z

    // 将获取成员的方法保存在一个数组中方便用后面生成的随机index取用
    const passMethodArr = [getNumber, getUpLetter, getLowLetter]

    // 随机index
    const getIndex = () => Math.floor(Math.random() * 3)

    // 从0-9，a-z，A-Z中随机获取一项
    const getPassItem = () => passMethodArr[getIndex()]()

    // 不多解释
    Array(legnth - 3)
      .fill('')
      .forEach(() => {
        passArrItem.push(getPassItem())
      })

    const confirmItem = [getNumber(), getUpLetter(), getLowLetter()]

    // 加上我们确认的三项，从而使生成的密码，大写字母、小写字母和数字至少各包含一个
    passArrItem.push(...confirmItem)

    // 转为字符串返回
    return passArrItem.join('')
  }
</script>
<style lang="scss" scoped>
  .jy-message-box {
    :deep(.el-dialog) {
      min-height: auto;
      padding: 0;
      height: 400px;
      .el-dialog__header {
        padding: 0;
        display: flex;
        align-items: center;
        margin-right: 0;
        height: 55px;
        padding: 0 12px 0 24px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        .dialog-header-remove {
          position: absolute;
          right: 1rem;
          cursor: pointer;
          height: 1.5rem;
          display: flex;
          align-items: center;
          .iconpark-icon {
            width: 1rem;
            height: 1rem;
          }
        }
        .header-div {
          display: flex;
          align-items: center;
        }
        img {
          width: 21px;
          margin-right: 18px;
        }
        span {
          font-family: 'PingFang SC';
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 24px;
          color: rgba(0, 0, 0, 0.85);
        }
      }
      .el-dialog__body {
        height: auto;
        min-height: auto;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        color: rgba(0, 0, 0, 0.65);
      }
      .el-dialog__footer {
        position: absolute;
        bottom: 0;
        left: 0;
        text-align: center;
        right: 0;
        height: 55px;
        line-height: 55px;
        padding: 0;
        border-top: 1px solid rgba(0, 0, 0, 0.06);
      }
      .el-form-item__content {
        display: block;
      }
      .tips {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
    }
    .refresh-icon {
      cursor: pointer;
      font-size: 24px;
      display: inline-block;
      position: relative;
      top: 5px;
    }
  }
</style>
