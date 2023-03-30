<!--
* @Descripttion index.vue
* @FileName index.vue
* @Author zb
* @module 
* @LastEditTime 2023-03-29 16:08:13
!-->
<template>
  <el-drawer
    v-model="isVisible"
    direction="rtl"
    @close="clickClose"
    title="详情"
    class="detail-drawer"
    size="800px"
    destroy-on-close
  >
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="表单详情" name="1">
        <FormDetail :formMessageId="props.formMessageId" />
      </el-tab-pane>
      <el-tab-pane label="操作记录" name="2">
        <Operation :formMessageId="props.formMessageId" />
      </el-tab-pane>
      <el-tab-pane label="历史版本" name="3">
        <HisVersion :formMessageId="props.formMessageId" />
      </el-tab-pane>
    </el-tabs>
  </el-drawer>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import formManageService from '@/api/system/formManagement'
  import FormDetail from './FormDetail'
  import HisVersion from './HisVersion'
  import Operation from './Operation'

  const activeName = ref('1')

  const props = defineProps({
    modelValue: {
      type: Boolean,
      defult: false
    },
    operationId: {
      type: String,
      default: ''
    },
    formMessageId: {
      type: String,
      default: ''
    }
  })
  const emit = defineEmits([
    'update:modelValue',
    'on-confirm',
    'on-closed',
    'on-opened'
  ])

  const isVisible = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      emit('update:modelValue', value)
    }
  })

  const handleClick = () => {}
  const clickClose = () => {}
</script>
<script>
  export default { name: 'FormManageDetail' }
</script>
<style lang="scss">
  .detail-drawer {
    .el-drawer__header {
      margin-bottom: 0;
    }
  }
</style>
