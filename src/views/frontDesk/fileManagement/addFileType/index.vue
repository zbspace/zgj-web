<!--
* @Descripttion index.vue
* @FileName index.vue
* @Author zb
* @module 添加文件类型
* @LastEditTime 2023-03-20 14:43:21
!-->
<template>
  <JyDialog2
    :title="curFromData.fileTypeId ? '修改文件类型' : '新增文件类型'"
    v-model="isVisible"
    @on-opened="opened"
    @on-closed="closed"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="文件类型编码">
        <el-input v-model="formData.fileTypeNo" disabled />
      </el-form-item>
      <el-form-item label="文件类型名称" prop="fileTypeName">
        <el-input v-model="formData.fileTypeName" />
      </el-form-item>
      <el-form-item label="文件类型字号">
        <el-input v-model="formData.fileTypeSn" />
      </el-form-item>
      <el-form-item label="上级文件夹">
        <el-tree-select
          v-model="formData.fileTypePid"
          :data="props.optionsTree"
          check-strictly
          style="width: 100%"
          :props="{
            children: 'child',
            label: 'fileTypeName',
            disabled: data =>
              data.fileTypeId === props.curFromData.fileTypeId ||
              data.fileTypePid === props.curFromData.fileTypeId
          }"
          value-key="fileTypeId"
          :default-checked-keys="['1638091635105542145']"
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
  import { AddFileTypeInfo } from '@/utils/domain/fileManage'
  import { messageError, messageSuccess } from '@/hooks/useMessage'
  import { fileManageService } from '@/api/frontDesk/fileManage'

  const formData = ref(new AddFileTypeInfo())
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
    curFromData: {
      type: Object,
      default: () => {}
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
      await formRef.value.validate()
      if (!formData.value.fileTypePid) {
        formData.value.fileTypePid = '0'
      }
      if (formData.value.fileTypeId) {
        await fileManageService.fileTypeEdit(formData.value)
        messageSuccess('文件类型修改成功')
      } else {
        await fileManageService.fileTypeAdd(formData.value)
        messageSuccess('文件类型添加成功')
      }
      isVisible.value = false
      formData.value = new AddFileTypeInfo()

      emit('refresh')
    } catch (error) {
      messageError(error)
    }
  }

  const getGenerateBizNo = async () => {
    try {
      const res = await fileManageService.generateBizNo()
      formData.value.fileTypeNo = res.data || ''
    } catch (error) {
      messageError(error)
    }
  }

  const opened = () => {
    console.log('--->', props.curFromData)
    if (props.curFromData.fileTypeId) {
      formData.value = { ...formData.value, ...props.curFromData }
    } else {
      getGenerateBizNo()
    }
  }

  const calcel = () => {
    isVisible.value = false
  }

  const closed = () => {
    formData.value = new AddFileTypeInfo()
    emit('on-closed')
  }
</script>

<script>
  export default { name: 'AddFileType' }
</script>

<style lang="scss" scoped></style>
