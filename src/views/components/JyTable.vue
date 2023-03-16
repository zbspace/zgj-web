<template>
  <div>
    <componentsLayout
      :Layout="
        'title,searchForm,table,pagination,batch' +
        (props.hasTree ? ',tree' : '') +
        (props.hasTabs ? ',tabs' : '')
      "
    >
      <template #title><slot name="title"></slot></template>
      <template #tabs>
        <slot name="tabs"></slot>
      </template>
      <template #searchForm>
        <div>
          <componentsSearchForm
            :data="props.componentsSearchForm.data"
            :butData="props.componentsSearchForm.butData"
            :style="state.componentsSearchForm.style"
            @clickSubmit="clickSubmit"
          >
          </componentsSearchForm>
        </div>
      </template>

      <template #batch>
        <div class="batch">
          <componentsBatch
            :tableHeader="props.componentsTableHeader"
            :data="props.componentsBatch.data"
            :defaultAttribute="state.componentsBatch.defaultAttribute"
            @clickBatchButton="clickBatchButton"
            @setTableHeader="setTableHeader"
          >
          </componentsBatch>
        </div>
      </template>

      <template #tree>
        <slot name="tree"></slot>
      </template>

      <template #table>
        <div>
          <componentsTable
            :defaultAttribute="state.componentsTable.defaultAttribute"
            refs="tables"
            ref="table"
            :data="state.componentsTable.data"
            :header="state.componentsTable.headers"
            :paginationData="state.componentsPagination.data"
            :isSelection="isSelection"
            :loading="loading"
            @cellClick="cellClick"
            @custom-click="customClick"
            @selection-change="selectionChange"
            @sort-change="sortChange"
          >
          </componentsTable>
        </div>
      </template>

      <template #pagination>
        <componentsPagination
          :data="state.componentsPagination.data"
          :defaultAttribute="state.componentsPagination.defaultAttribute"
          @size-change="sizeChange"
          @current-change="currentChange"
        >
        </componentsPagination>
      </template>
    </componentsLayout>
  </div>
</template>
<script setup>
  import { ref, reactive, onBeforeMount, defineExpose, nextTick } from 'vue'
  import componentsLayout from '@/views/components/Layout'
  import componentsTable from '@/views/components/table'
  import componentsSearchForm from '@/views/components/searchForm'
  import componentsPagination from '@/views/components/pagination'
  import componentsBatch from '@/views/components/batch'
  import request from '@/utils/request'

  const props = defineProps({
    url: {
      type: String,
      required: true
    },
    componentsSearchForm: {
      type: Object
    },
    componentsTableHeader: {
      type: Object
    },
    componentsBatch: {
      type: Object
    },
    tableClick: {
      type: String
    },
    isSelection: {
      type: Boolean,
      default: true
    },
    queryParams: {
      type: Object
    },
    hasTree: {
      type: Boolean,
      default: false
    },
    method: {
      type: String,
      default: 'GET'
    },
    needAutoRequest: {
      type: Boolean,
      default: true
    }
  })

  const state = reactive({
    componentsSearchForm: {
      style: {
        lineStyle: {
          width: '30%'
        },
        labelStyle: {
          width: '100px'
        }
      }
    },
    componentsTable: {
      data: [],
      headers: props.componentsTableHeader,
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        stripe: true,
        'header-cell-style': {
          background: 'var(--jy-color-fill--3)'
        },
        'cell-style': ({ row, column, rowIndex, columnIndex }) => {
          if (column.property === props.tableClick) {
            return {
              color: 'var(--jy-info-6)',
              cursor: 'pointer'
            }
          }
        }
      }
    },

    componentsPagination: {
      data: {
        amount: 0,
        index: 1,
        pageNumber: 10
      },
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        layout: 'prev, pager, next, jumper',
        total: 0,
        'page-sizes': [10, 50, 100],
        background: true
      }
    },

    componentsBatch: {
      selectionData: [],
      defaultAttribute: {
        disabled: true
      }
    }
  })

  const loading = ref(false)
  const table = ref(null)
  const orderBy = ref(null)

  const emit = defineEmits(['cellClick', 'customClick', 'clickBatchButton'])

  defineExpose({
    reloadData
  })

  const clickBatchButton = (item, index) => {
    if (item.name === 'refresh') {
      reloadData()
      return
    }
    emit('clickBatchButton', item, state.componentsBatch.selectionData)
  }

  // 设置表格表头
  function setTableHeader(headers) {
    state.componentsTable.headers = headers
  }

  // 点击表格单元格
  function cellClick(row, column, cell, event) {
    if (column.property === props.tableClick) {
      emit('cellClick', row, column, cell, event)
    }
  }
  // 当选择项发生变化时会触发该事件
  function selectionChange(selection) {
    state.componentsBatch.selectionData = selection
    if (state.componentsBatch.selectionData.length > 0) {
      state.componentsBatch.defaultAttribute.disabled = false
    } else {
      state.componentsBatch.defaultAttribute.disabled = true
    }
  }
  // 点击表格按钮
  function customClick(row, column, cell, event) {
    emit('customClick', row, column, cell, event)
  }
  const clickSubmit = item => {
    if (item.id === 'reset') {
      table.value.clearSorts()
      props.componentsSearchForm.data.forEach(item => {
        if (item.type === 'checkButton') {
          item.data.forEach(i => {
            delete i.checked
          })
        } else if (item.type === 'checkbox') {
          item.checkbox.forEach(i => {
            i.value = false
          })
        } else {
          delete item.value
        }
      })
    }
    reloadData()
  }
  // 自定义排序
  function sortChange(orderBack) {
    orderBy.value = orderBack
    reloadData()
  }

  // 分页页数变化
  const currentChange = data => {
    state.componentsPagination.data.index = data
    page()
  }
  // 每页请求数量变化
  const sizeChange = data => {
    state.componentsPagination.data.pageNumber = data
    reloadData()
  }

  function reloadData() {
    nextTick(() => {
      state.componentsPagination.data.index = 1
      state.componentsTable.data = []
      state.componentsPagination.data.amount = 0
      page()
    })
  }

  const page = () => {
    loading.value = true
    const params = {}
    props.componentsSearchForm.data.forEach(item => {
      if (item.type === 'checkButton') {
        params[item.id] = item.data
          .filter(i => i.checked)
          .map(i => i.id)
          .join(',')
      } else if (item.type === 'checkbox') {
        params[item.id] = item.checkbox[0].value ? item.checkbox[0].value : ''
      } else if (item.type === 'picker') {
        if (item.defaultAttribute.type === 'daterange' && item.value) {
          params[item.id] =
            item.value[0] + ' 00:00:00,' + item.value[1] + ' 23:59:59'
        }
      } else {
        params[item.id] = item.value
      }
    })
    const requestDatas = {
      current: state.componentsPagination.data.index,
      size: state.componentsPagination.data.pageNumber,
      sorts: orderBy.value
        ? orderBy.value.prop +
          ',' +
          (orderBy.value.order === 'ascending' ? 'asc' : 'desc')
        : '',
      ...params,
      ...props.queryParams
    }
    let requestData = {}
    if (props.method === 'GET') {
      requestData = {
        params: requestDatas
      }
    } else {
      requestData = {
        data: requestDatas
      }
    }
    request({
      ...{
        method: props.method,
        url: props.url
      },
      ...requestData
    }).then(
      result => {
        state.componentsTable.data = result.data.records
        state.componentsPagination.data.amount = result.data.total
        state.componentsPagination.defaultAttribute.total = result.data.total
        loading.value = false
      },
      () => {
        loading.value = false
      }
    )
  }

  onBeforeMount(() => {
    // 初始化布局
    if (props.needAutoRequest) {
      reloadData()
    }
  })
</script>
<style lang="scss" scoped></style>
