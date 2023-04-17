<!--
* @Descripttion index.vue
* @FileName index.vue
* @Author zb
* @module 操作记录
* @LastEditTime 2023-04-10 10:19:14
!-->
<template>
  <JyTable
    :data="tableData"
    :loading="loading"
    ref="tableRef"
    :highlightCurrentRow="true"
  >
    <el-table-column type="index" label="序号" width="60"> </el-table-column>
    <el-table-column label="操作人" prop="operator"> </el-table-column>
    <el-table-column label="操作时间" prop="operateDatetime"> </el-table-column>
    <el-table-column label="操作记录" prop="operateAction"> </el-table-column>
    <el-table-column label="操作说明" prop="operateDesc"> </el-table-column>
  </JyTable>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import departmentService from '@/api/system/companyManagement/department'

  const tableData = ref([])
  const loading = ref(false)

  const props = defineProps({
    organId: {
      type: String,
      default: ''
    }
  })

  const operationList = async () => {
    loading.value = true
    const res = await departmentService.operationList(props.organId)
    tableData.value = res.data || []
    loading.value = false
  }

  onMounted(() => {
    // operationList()
  })
</script>

<script>
  export default { name: 'OperationRecord' }
</script>
<style lang="scss" scoped></style>
