<template>
  <div>
    <JyBreadcrumb :routes="routes" />
    <!-- <el-button @click="cancel"> 取消 </el-button>
    <el-button type="primary" @click="handleSubmit"> 确定 </el-button> -->
    <jy-vform ref="vformRef" />
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  const vformRef = ref(null)
  const routes = ref([
    { path: '/system/businessManage/formManage', label: '表单管理' },
    { path: '', label: '新增' }
  ])
  defineProps({
    modelValue: {
      type: Boolean,
      default: false
    }
  })
  const emit = defineEmits(['update:modelValue'])

  const cancel = () => {
    emit('update:modelValue', false)
  }
  const handleSubmit = () => {
    console.log('vform--->', vformRef.value.getFormJson())
  }
</script>

<style lang="scss" scoped>
  :deep(.add-form-dialog) {
    .el-dialog__header {
      display: none;
    }

    .el-dialog__body {
      padding: 0 24px;
      height: calc(100% - 63px);
      overflow: auto;
    }

    .el-dialog__footer {
      border-top: 1px solid #e9ebec;
    }
  }
</style>
