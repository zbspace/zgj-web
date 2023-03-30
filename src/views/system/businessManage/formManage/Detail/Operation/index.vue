<!--
* @Descripttion index.vue
* @FileName index.vue
* @Author zb
* @module 
* @LastEditTime 2023-03-29 16:26:49
!-->
<template>
  <JyTable
    :data="tableData"
    :loading="loading"
    ref="tableRef"
    rowKey="sealId"
    :highlightCurrentRow="true"
  >
    <el-table-column label="序号" type="index" width="60"> </el-table-column>
    <el-table-column label="操作人" prop="operationDate"> </el-table-column>
    <el-table-column label="操作时间" prop="sealName"> </el-table-column>
    <el-table-column label="操作记录" prop="operationTxt"> </el-table-column>
    <el-table-column label="操作说明" prop="operationTxt"> </el-table-column>
  </JyTable>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import formManageService from '@/api/system/formManagement'

  const tableData = ref([])
  const loading = ref(false)

  const props = defineProps({
    operationId: {
      type: String,
      default: ''
    },
    formMessageId: {
      type: String,
      default: ''
    }
  })
  const emit = defineEmits([])

  const queryOperation = () => {
    loading.value = true
    const res = formManageService.queryOperation({
      formMessageId: props.formMessageId
    })
    tableData.value = res.data || []
    loading.value = false
  }

  onMounted(() => {
    queryOperation()
  })
</script>

<script>
  export default { name: 'Operation' }
</script>
<style lang="scss" scoped></style>
