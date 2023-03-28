<!--
* @Descripttion index.vue
* @FileName index.vue
* @Author zb
* @module 特殊类型隐私配置
* @LastEditTime 2023-03-22 14:32:47
!-->
<template>
  <JyDialog2
    title="特殊类型隐私配置"
    v-model="isVisible"
    @on-opened="opened"
    @on-closed="closed"
    :width="500"
    appendToBody
    class="privacy-set-form"
  >
    <el-form ref="formRef" :model="formData" :rules="rules">
      <el-form-item
        label="用印单据上传附件仅申请人能预览"
        prop="applicantPreview"
      >
        <el-switch
          v-model="formData.applicantPreview"
          active-value="1"
          inactive-value="0"
        />
      </el-form-item>
      <el-form-item
        label="用印单据上传附件仅申请人能预览"
        prop="applicantDownload"
      >
        <el-switch
          v-model="formData.applicantDownload"
          active-value="1"
          inactive-value="0"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="submit">提交</el-button>
      <el-button @click="calcel">取消</el-button>
    </template>
  </JyDialog2>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import { PrivacySetInfo } from '@/utils/domain/fileManage'
  import { messageError, messageSuccess } from '@/hooks/useMessage'
  import { fileManageService } from '@/api/frontDesk/fileManage'

  const formData = ref(new PrivacySetInfo())
  const formRef = ref(null)
  const rules = {
    fileTypeName: [{ required: true, message: '请输入', trigger: 'blur' }]
  }

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    optionsTree: {
      type: Array,
      default: () => []
    },
    fileTypeId: {
      type: String,
      default: ''
    }
  })

  const emit = defineEmits(['update:modelValue', 'refresh', 'on-closed'])

  const isVisible = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      emit('update:modelValue', value)
    }
  })

  const submit = async () => {
    try {
      await fileManageService.privacySet(formData.value)
      isVisible.value = false
      formData.value = new PrivacySetInfo()
      messageSuccess('特殊类型隐私设置成功')
      emit('refresh')
    } catch (error) {
      messageError(error)
    }
  }

  const queryPrivacyByType = async () => {
    try {
      const res = await fileManageService.queryPrivacyByType(props.fileTypeId)
      formData.value = { ...formData.value, ...res.data }
    } catch (error) {
      messageError(error)
    }
  }

  const opened = () => {
    formData.value.fileTypeId = props.fileTypeId
    queryPrivacyByType()
  }

  const calcel = () => {
    isVisible.value = false
  }

  const closed = () => {
    formData.value = new PrivacySetInfo()
    emit('on-closed')
  }
</script>
<script>
  export default { name: 'PrivacySet' }
</script>
<style lang="scss">
  .privacy-set-form {
    .el-dialog__body {
      display: flex;
      justify-content: center;
    }
  }
</style>
