<template>
  <div>
    <JyDialog
      :title="step === 1 ? '身份验证' : '变更超级管理员'"
      v-model="isVisible"
      @on-closed="onClosed"
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
                <el-radio label="1">手机号验证</el-radio>
                <el-radio label="2">邮箱验证</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="超级管理员">
              <span>李旺</span>
            </el-form-item>
            <el-form-item label="超级管理员账号">
              <span>225487</span>
            </el-form-item>
            <el-form-item label="超级管理员手机号">
              <span>13780094758</span>
            </el-form-item>
            <el-form-item label="超级管理员邮箱号">
              <span>13780094758@qq.com</span>
            </el-form-item>
            <el-form-item label="手机验证码" prop="vcode">
              <div class="vcode">
                <el-input v-model="formData.vcode" />
                <el-button
                  type="primary"
                  :disabled="countdownTime >= 0"
                  @click="visibleVcode = true"
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
              <span>李旺</span>
            </el-form-item>
            <el-form-item label="超级管理员账号">
              <span>225487</span>
            </el-form-item>
            <el-form-item label="新的超管姓名" prop="name">
              <el-select style="width: 264px" v-model="formData.name">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="新的超管账号">
              <el-input disabled style="width: 264px"></el-input>
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
    </JyDialog>
    <JyVertifyBox
      v-model="visibleVcode"
      @on-success="success"
      @on-failed="failed"
    />
  </div>
</template>

<script setup>
  import { ref, reactive, computed } from 'vue'
  import { ElMessage } from 'element-plus'
  class SuperAdmin {
    name = ''
    data = ''
    vcode = ''
    verification = '1'
  }
  const formData = ref(new SuperAdmin())
  const formRef = ref(null)
  const visibleVcode = ref(false)
  const step = ref(1)
  const options = ref([{ label: 'zb', value: '1' }])
  const timer = ref(null)
  const countdownTime = ref(-1)
  const props = defineProps({
    visible: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: Boolean,
      default: false
    }
  })
  const emit = defineEmits(['update:modelValue'])
  const rules = reactive({
    vcode: [
      {
        required: true,
        message: '验证码不能为空',
        trigger: 'change'
      }
    ],
    name: [
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
    await formRef.value.validate((valid, fields) => {
      if (valid) {
        step.value = 2
      } else {
        console.log('error', fields)
      }
    })
  }

  const submit = async () => {
    await formRef.value.validate((valid, fields) => {
      if (valid) {
        // cancel()
        ElMessage({
          message: '超级管理员变更成功',
          type: 'success'
        })
        showImgVCode()
      } else {
        console.log('error', fields)
      }
    })
  }

  const cancel = () => {
    isVisible.value = false
    step.value = 1
    formData.value = new SuperAdmin()
  }

  const showImgVCode = () => {}

  const sendVCode = () => {
    countdownTime.value = 10
    if (!timer.value) {
      timer.value = setInterval(() => {
        if (countdownTime.value < 0) {
          clearInterval(timer.value)
          timer.value = null
        } else {
          countdownTime.value--
        }
      }, 1000)
    }
  }

  const onClosed = () => {
    clearInterval(timer.value)
    timer.value = null
    countdownTime.value = -1
  }

  const success = () => {
    // console.log('--->', 'success')
    sendVCode()
  }
  const failed = () => {
    console.log('--->', 'failed')
  }
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
