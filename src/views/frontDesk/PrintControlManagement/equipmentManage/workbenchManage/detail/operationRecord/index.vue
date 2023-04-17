<!--
* @Descripttion index.vue
* @FileName index.vue
* @Author zb
* @module 
* @LastEditTime 2023-04-10 10:19:14
!-->
<template>
  <JyTable
    :data="tableData"
    :loading="loading"
    ref="tableRef"
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
  import workbenchService from '@/api/frontDesk/printControl/workbenchManagement'

  const tableData = ref([])
  const loading = ref(false)

  const props = defineProps({
    benchId: {
      type: String,
      default: ''
    }
  })

  const queryHisVersion = async () => {
    loading.value = true
    const res = await workbenchService.queryHisVersion(props.benchId)
    tableData.value = res.data || []
    loading.value = false
  }

  onMounted(() => {
    // queryHisVersion()
  })
</script>

<script>
  export default { name: 'FlowRecord' }
</script>
<style lang="scss" scoped></style>
