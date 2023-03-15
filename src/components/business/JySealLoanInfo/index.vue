<!--
* @Descripttion index.vue
* @FileName index.vue
* @Author zb
* @module 印章外借信息
* @LastEditTime 2023-03-14 23:29:14
!-->
<template>
  <JyDialog
    v-model="isVisible"
    :width="1080"
    title="印章外带情况"
    :mode="1"
    @on-opened="getDataList"
    :appendToBody="true"
  >
    <JyTable
      :data="dataList"
      :loading="loading"
      ref="tableRef"
      :highlightCurrentRow="true"
    >
      <el-table-column type="index" label="序号" width="60" fixed="left">
      </el-table-column>
      <el-table-column label="sealId" prop="sealId" v-if="false">
      </el-table-column>
      <el-table-column label="印章名称" prop="sealName"> </el-table-column>
      <el-table-column label="印章类型" prop="sealTypeName"> </el-table-column>
      <el-table-column label="保管部门" prop="custodianDeptName">
      </el-table-column>
      <el-table-column label="保管人" prop="custodianName"> </el-table-column>
      <el-table-column label="外借人" prop="outUserName"> </el-table-column>
      <el-table-column label="外带时间" prop="outDatetime"> </el-table-column>
      <el-table-column label="外带地址" prop="outLocation"> </el-table-column>
    </JyTable>

    <JyPagination
      v-model:page="paginationInfo.current"
      v-model:pageSize="paginationInfo.size"
      :total="paginationInfo.total"
      :pages="paginationInfo.pages"
      :loadList="getDataList"
    />
  </JyDialog>
</template>

<script setup>
  import { computed, ref } from 'vue'
  import { ElMessage } from 'element-plus'
  import { PaginationInfo } from '@/utils/domain/paginationInfo'
  import sealloanInfoService from '@/api/frontDesk/sealManage/sealloanInformation'

  const dataList = ref([])
  const loading = ref(false)
  const paginationInfo = ref(new PaginationInfo())

  const props = defineProps({
    modelValue: {
      type: Boolean,
      defult: false
    }
  })

  const emit = defineEmits(['update:modelValue', 'on-submit'])

  const isVisible = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      emit('update:modelValue', value)
    }
  })

  const getDataList = async () => {
    try {
      loading.value = true
      const res = await sealloanInfoService.history(paginationInfo.value)
      dataList.value = res.data.records || []
      paginationInfo.value.total = res.data && res.data.total
      paginationInfo.value.pages = res.data && res.data.pages
    } catch (error) {
      ElMessage(error)
    }
    loading.value = false
  }
</script>
<script>
  export default {
    name: 'JySealLoanInfo'
  }
</script>
<style lang="scss" scoped></style>
