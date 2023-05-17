<!--
* @Descripttion 操作记录详情表格数据
* @FileName index.vue
* @Author walterXsk
* @module 
* @LastEditTime 2023-03-29 16:26:49
!-->
<template>
  <JyTable
    :data="tableData"
    :loading="loading"
    ref="recordTableRef"
    :highlightCurrentRow="true"
    class="table"
  >
    <el-table-column type="index" label="序号" width="60"> </el-table-column>
    <el-table-column
      v-for="item in tableHeader"
      :key="item.prop"
      :prop="item.prop"
      :width="item.width"
    >
      <template #header>
        {{ $t(item.label) }}
      </template>
    </el-table-column>
  </JyTable>
</template>

<script setup>
  import { ref, onBeforeMount, computed } from 'vue'
  import API from '../api/index'

  const tableData = ref([])
  const loading = ref(false)

  const props = defineProps({
    requestObj: {
      type: Object,
      defatult: () => {
        return {}
      }
    }
  })

  const tableHeader = computed({
    get() {
      return props.requestObj.tableHeaders[props.requestObj.value]
    }
  })

  const handleData = () => {
    loading.value = true
    API[props.requestObj.modulesName]
      [props.requestObj.urlName](props.requestObj.params)
      .then(result => {
        if (result.data) {
          tableData.value = result.data
        }
        loading.value = false
      })
      .catch(() => {
        loading.value = false
      })
  }

  onBeforeMount(() => {
    handleData()
  })
</script>

<script>
  export default { name: 'RecordTable' }
</script>

<style lang="scss" scoped>
  .table {
    padding-top: 28px;
  }
</style>
