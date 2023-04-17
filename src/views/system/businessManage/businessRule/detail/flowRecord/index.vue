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
    <el-table-column type="index" label="序号" width="60"> </el-table-column>
    <el-table-column label="版本号" prop="modifyDatetime"> </el-table-column>
    <el-table-column label="版本时间" prop="formVerison"> </el-table-column>
  </JyTable>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import formManageService from '@/api/system/formManagement'

  const tableData = ref([])
  const loading = ref(false)

  const props = defineProps({
    formMessageId: {
      type: String,
      default: ''
    }
  })

  const queryHisVersion = async () => {
    loading.value = true
    const res = await formManageService.queryHisVersion({
      operationId: props.formMessageId
    })
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
