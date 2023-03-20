<!--
* @Descripttion index.vue
* @FileName index.vue
* @Author zb
* @module 往来单位
* @LastEditTime 2023-03-09 13:52:44
!-->
<template>
  <div>
    <JyDialog
      v-model="isVisible"
      :width="1080"
      title="往来单位"
      :mode="1"
      @on-opened="opened"
      :appendToBody="true"
    >
      <div class="select-block jy-constact-uit">
        <div>
          <el-input
            v-model="searchRelatedCompanyInfo.relatedCompanyName"
            prefix-icon="el-icon-search"
            placeholder="请输入"
            style="width: 400px"
          >
            <template #append>
              <el-button icon="el-icon-search" @click="getRelatedCompanyList" />
            </template>
          </el-input>
        </div>
        <el-button type="primary" @click="addVisible = true">
          <svg class="iconpark-icon"><use href="#icon-add"></use></svg>新增
        </el-button>
      </div>

      <JyTable
        :data="relatedCompanyList"
        :loading="loading"
        ref="tableRef"
        rowKey="relatedCompanyId"
        @selection-change="selectionChange"
        @select="select"
        class="relate-comp-table"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" label="序号" width="80" fixed="left">
        </el-table-column>
        <el-table-column label="单位编码" prop="relatedCompanyNo">
        </el-table-column>
        <el-table-column label="单位名称名称" prop="relatedCompanyName">
        </el-table-column>
        <el-table-column label="所属部门">
          <template #default="scope">
            {{ scope.row.organName || '-' }}
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template #default="scope">
            <a @click="showChange(scope.row)">修改</a>
          </template>
        </el-table-column>
      </JyTable>

      <JyPagination
        v-model:page="paginationInfo.current"
        v-model:pageSize="paginationInfo.size"
        :total="paginationInfo.total"
        :pages="paginationInfo.pages"
        :loadList="getRelatedCompanyList"
      />

      <template #footer>
        <el-button type="primary" @click="submit">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </template>
    </JyDialog>

    <AddCompany
      @on-success="getRelatedCompanyList"
      v-model="addVisible"
      :editInfo="editInfo"
      @on-closed="editInfo = null"
    />
  </div>
</template>

<script setup>
  import { computed, ref, nextTick } from 'vue'
  import { PaginationInfo } from '@/utils/domain/paginationInfo'
  import { compManageService } from '@/api/system/compManage'
  import { FeatchRelatedCompanyListInfo } from '@/utils/domain/compManage'
  import AddCompany from './AddCompany'

  const searchRelatedCompanyInfo = ref(new FeatchRelatedCompanyListInfo())
  const paginationInfo = ref(new PaginationInfo())
  const loading = ref(false)
  const addVisible = ref(false)
  const relatedCompanyList = ref([])
  const editInfo = ref(null)
  const tableRef = ref(null)
  const selectList = ref([])

  const props = defineProps({
    modelValue: {
      type: Boolean,
      defult: false
    },
    haveSelectList: {
      type: Array,
      default: () => []
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

  const getRelatedCompanyList = async () => {
    try {
      loading.value = true
      const res = await compManageService.relatedCompanyList({
        ...searchRelatedCompanyInfo.value,
        ...paginationInfo.value
      })
      relatedCompanyList.value = res.data.records
      paginationInfo.value.total = res.data && res.data.total
      paginationInfo.value.pages = res.data && res.data.pages
      initSelect()
    } catch (error) {}
    loading.value = false
  }

  const select = (selection, row) => {
    const bool = selection.filter(
      v => v.relatedCompanyId === row.relatedCompanyId
    )
    if (bool) {
      selectList.value.push(row)
    } else {
      selectList.value = selectList.value.filter(
        v => v.relatedCompanyId !== row.relatedCompanyId
      )
    }
  }

  const showChange = row => {
    editInfo.value = row
    addVisible.value = true
  }

  const submit = () => {
    emit('on-submit', selectList.value)
  }

  const cancel = () => {
    isVisible.value = false
  }

  const opened = async () => {
    selectList.value = [...props.haveSelectList]
    await getRelatedCompanyList()
  }

  const initSelect = () => {
    nextTick(() => {
      selectList.value.forEach(item => {
        const obj = relatedCompanyList.value.find(
          v => v.relatedCompanyId === item.relatedCompanyId
        )
        if (obj) {
          tableRef.value.toggleRowSelection(obj, true)
        }
      })
    })
  }
</script>

<script>
  export default {
    name: 'JyRelatedCompany'
  }
</script>

<style lang="scss">
  .select-block.jy-constact-uit {
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    .iconpark-icon {
      width: 16px;
      height: 16px;
      margin-right: 8px;
    }
  }

  .jy-table.relate-comp-table {
    .el-table__header-wrapper {
      .el-checkbox {
        display: none;
      }
    }
  }
</style>
