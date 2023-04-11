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
    destroy-on-close
  >
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="业务规则详情" name="1">
        <BaseInfo :ruleBusinessId="props.ruleBusinessId" />
      </el-tab-pane>
      <el-tab-pane label="流程记录" name="2">
        <FlowRecord :ruleBusinessId="props.ruleBusinessId" />
      </el-tab-pane>
    </el-tabs>
  </JyDrawer>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import BaseInfo from './baseInfo'
  import FlowRecord from './flowRecord'

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
    ruleBusinessId: {
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
