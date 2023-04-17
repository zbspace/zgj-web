<!--
* @Descripttion index.vue
* @FileName index.vue
* @Author zb
* @module 
* @LastEditTime 2023-04-10 10:12:12
!-->
<template>
  <JyDrawer
    v-model="isVisible"
    direction="rtl"
    @close="clickClose"
    title="详情"
    class="detail-drawer"
    size="800px"
  >
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="印章详情" name="1">
        <BaseInfo :sealId="props.sealId" />
      </el-tab-pane>
      <el-tab-pane label="保管记录" name="2">
        <SaveRecord :sealId="props.sealId" />
      </el-tab-pane>
      <el-tab-pane label="操作记录" name="3">
        <OperationRecord :sealId="props.sealId" />
      </el-tab-pane>
    </el-tabs>
  </JyDrawer>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import BaseInfo from './baseInfo'
  import OperationRecord from './operationRecord'
  import SaveRecord from './saveRecord'

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
    sealId: {
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
  const clickClose = () => {
    activeName.value = '1'
  }
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
