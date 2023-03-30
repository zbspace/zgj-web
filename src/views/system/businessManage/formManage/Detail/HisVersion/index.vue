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
    :highlightCurrentRow="true"
  >
    <el-table-column type="index" label="序号" width="60"> </el-table-column>
    <el-table-column label="版本号" prop="sealName"> </el-table-column>
    <el-table-column label="历史版本" prop="keepUserName"> </el-table-column>
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

  const queryHisVersion = () => {
    loading.value = true
    const res = formManageService.queryHisVersion({
      operationId: props.formMessageId
    })
    tableData.value = res.data || []
    loading.value = false
  }

  onMounted(() => {
    queryHisVersion()
  })
</script>

<script>
  export default { name: 'HisVersion' }
</script>
<style lang="scss" scoped></style>
