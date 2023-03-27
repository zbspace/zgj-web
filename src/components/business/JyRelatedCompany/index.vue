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
      @on-closed="closed"
      :appendToBody="true"
    >
      <div class="select-block jy-constact-uit">
        <div>
          <el-input
            v-model="searchRelatedCompanyInfo.relatedCompanyName"
            prefix-icon="el-icon-search"
            placeholder="请输入"
            clearable
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
        @select-all="selectAll"
        @selection-change="selectionChange"
        @select="select"
        class="relate-comp-table"
      >
        <el-table-column
          width="60"
          label=""
          v-if="props.checkType === 'radio'"
          fixed="left"
        >
          <template #default="scope">
            <el-radio v-model="radio" :label="scope.row.relatedCompanyId"
              >&emsp;</el-radio
            >
          </template>
        </el-table-column>
        <el-table-column
          type="selection"
          width="55"
          fixed="left"
          v-if="props.checkType === 'checkbox'"
        />
        <el-table-column type="index" label="序号" width="80" fixed="left">
          <template #default="scope">
            <span>{{
              (paginationInfo.current - 1) * paginationInfo.size +
              scope.$index +
              1
            }}</span>
          </template>
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
  import JyDialog from '@/components/common/JyDialog/index2.vue'

  const searchRelatedCompanyInfo = ref(new FeatchRelatedCompanyListInfo())
  const paginationInfo = ref(new PaginationInfo())
  const loading = ref(false)
  const addVisible = ref(false)
  const relatedCompanyList = ref([])
  const editInfo = ref(null)
  const tableRef = ref(null)
  const selectList = ref([])
  const radio = ref(null)

  const props = defineProps({
    modelValue: {
      type: Boolean,
      defult: false
    },
    haveSelectList: {
      type: [Array, String]
    },
    checkType: {
      type: String,
      default: 'checkbox'
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

  const selectAll = selection => {
    if (selection.length) {
      selection.forEach(i => {
        if (
          selectList.value.findIndex(
            o => o.relatedCompanyId === i.relatedCompanyId
          ) === -1
        ) {
          selectList.value.push(i)
        }
      })
    } else {
      relatedCompanyList.value.forEach(i => {
        const index = selectList.value.findIndex(
          o => o.relatedCompanyId === i.relatedCompanyId
        )
        if (index > -1) {
          selectList.value.splice(index, 1)
        }
      })
    }
  }

  const select = (selection, row) => {
    const bool = selection.filter(
      v => v.relatedCompanyId === row.relatedCompanyId
    )
    console.log('bool', bool)
    if (bool && bool.length) {
      selectList.value.push(row)
    } else {
      selectList.value = selectList.value.filter(
        v => v.relatedCompanyId !== row.relatedCompanyId
      )
    }
  }

  const selectionChange = selectArr => {
    if (props.checkType === 'radio' && selectArr) {
      radio.value = selectArr.relatedCompanyId
      selectList.value = selectArr
    }
  }

  const showChange = row => {
    editInfo.value = row
    addVisible.value = true
  }

  const submit = () => {
    console.log(selectList.value)
    emit('on-submit', selectList.value)
  }

  const cancel = () => {
    isVisible.value = false
  }

  const opened = async () => {
    if (props.checkType === 'radio') {
      radio.value = props.haveSelectList
      selectList.value = props.haveSelectList ? [props.haveSelectList] : []
    } else {
      selectList.value = selectList.value.concat(props.haveSelectList)
      console.log(selectList.value)
    }
    await getRelatedCompanyList()
  }

  const closed = () => {
    radio.value = ''
    selectList.value = []
  }

  const initSelect = () => {
    nextTick(() => {
      if (props.checkType === 'radio') {
        const index = relatedCompanyList.value.findIndex(
          i => i.relatedCompanyId === selectList.value
        )
        if (index > -1) {
          tableRef.value.toggleRowSelection(
            relatedCompanyList.value[index],
            true
          )
          radio.value = relatedCompanyList.value[index].relatedCompanyId
        }
      } else {
        selectList.value.forEach(item => {
          const obj = relatedCompanyList.value.find(
            v => v.relatedCompanyId === item.relatedCompanyId
          )
          if (obj) {
            tableRef.value.toggleRowSelection(obj, true)
          }
        })
      }
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

  // .jy-table.relate-comp-table {
  //   .el-table__header-wrapper {
  //     .el-checkbox {
  //       display: none;
  //     }
  //   }
  // }
</style>
