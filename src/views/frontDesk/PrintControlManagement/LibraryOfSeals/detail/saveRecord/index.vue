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
    <el-table-column label="保管人" prop="keepUserName"> </el-table-column>
    <el-table-column label="保管部门" prop="keepOrganName"> </el-table-column>
    <el-table-column label="保管时间" prop="keepDatetime"> </el-table-column>
  </JyTable>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import sealService from '@/api/frontDesk/sealManage/libraryOfSeals'

  const tableData = ref([])
  const loading = ref(false)

  const props = defineProps({
    sealId: {
      type: String,
      default: ''
    }
  })

  const sealInfoKeepList = async () => {
    loading.value = true
    const res = await sealService.sealInfoKeepList(props.sealId)
    tableData.value = res.data || []
    loading.value = false
  }

  onMounted(() => {
    sealInfoKeepList()
  })
</script>

<script>
  export default { name: 'SaveRecord' }
</script>
<style lang="scss" scoped></style>
