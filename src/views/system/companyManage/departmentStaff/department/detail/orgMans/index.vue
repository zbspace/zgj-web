<!--
* @Descripttion index.vue
* @FileName index.vue
* @Author zb
* @module 保管记录
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
    <el-table-column label="人员列表" prop="userName"> </el-table-column>
    <el-table-column label="账号" prop="accountNo"> </el-table-column>
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

  const userInfoList = async () => {
    loading.value = true
    const res = await departmentService.userInfoList(props.organId)
    tableData.value = res.data || []
    loading.value = false
  }

  onMounted(() => {
    userInfoList()
  })
</script>

<script>
  export default { name: 'OrgMans' }
</script>
<style lang="scss" scoped></style>
