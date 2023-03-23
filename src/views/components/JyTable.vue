<!-- eslint-disable vue/valid-v-slot -->
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
            @reloadData="reloadData"
          >
          </componentsSearchForm>
        </div>
      </template>

      <template #batch>
        <div class="batch">
          <componentsBatch
            :tableHeader="props.componentsTableHeader"
            :data="props.componentsBatch ? props.componentsBatch.data : []"
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
        <div class="components-table">
          <el-table
            v-bind="state.componentsTable.defaultAttribute"
            v-loading="props.loading"
            ref="table"
            :data="state.componentsTable.data"
            style="width: 100%"
            @selection-change="selectionChange"
            @cell-click="cellClick"
            @row-click="rowClick"
            @custom-click="customClick"
            @sort-change="sortChange"
            class="ap-table"
            @getSelectionRows="getSelectionRows"
          >
            <el-table-column
              v-if="props.isSelection"
              type="selection"
              width="50"
            />
            <el-table-column
              label="序号"
              type="index"
              width="55"
              fixed="left"
              align="center"
              v-if="props.isNo"
            >
              <template #default="scope">
                <span>{{
                  (state.componentsPagination.index
                    ? (state.componentsPagination.data.index - 1) *
                      state.componentsPagination.data.pageNumber
                    : 0) +
                  scope.$index +
                  1
                }}</span>
              </template>
            </el-table-column>
            <!-- 列表内容 -->
            <template v-for="(item, index) in state.componentsTable.headers">
              <el-table-column
                v-bind="item"
                :key="index"
                v-if="item.show !== false"
              >
                <!-- 自定义内容显示 -->
                <template
                  #default="scope"
                  v-if="item.customDisplayType == 'switch'"
                >
                  <div class="switch">
                    <el-switch v-model="scope.row.switchValue" />
                  </div>
                </template>
                <template
                  #default="scope"
                  v-if="item.customDisplayType == 'format'"
                >
                  <span>{{ scope.row[item.prop] }} {{ item.unit }}</span>
                </template>
                <!-- 状态 -->
                <template #default="scope" v-if="item.prop == 'flag'">
                  <span>{{
                    scope.row[item.prop] === '1'
                      ? '正常'
                      : scope.row[item.prop] === '0'
                      ? '停用'
                      : scope.row[item.prop]
                  }}</span>
                </template>
                <!-- 自定义内容显示 -->
                <template
                  #default="scope"
                  v-if="item.customDisplayType == 'custom'"
                >
                  <div class="custom" :index="scope.$index">
                    <slot
                      :name="'custom_' + item.prop"
                      :value="scope.row[item.prop]"
                    ></slot>
                  </div>
                </template>
                <!-- 自定义内容显示 -->
                <template
                  #default="scope"
                  v-if="item.rankDisplayData && item.rankDisplayData.length > 0"
                >
                  <div class="rankDisplayData">
                    <div
                      class="rankDisplayData-node"
                      v-for="(data, num) in item.rankDisplayData.slice(0, 4)"
                      :key="num"
                      @click="customClick(scope.$index, scope.row, data)"
                    >
                      <span>{{
                        data.name === 'status'
                          ? scope.row[props.statusColoum] !== props.openValue
                            ? $t('t-zgj-Enable')
                            : $t('t-zgj-seal.deactivated')
                          : $t(data.name)
                      }}</span>
                    </div>
                    <div
                      class="rankDisplayData-more"
                      v-if="item.rankDisplayData.length > 4"
                    >
                      <el-dropdown>
                        <span class="el-dropdown-link">
                          <img
                            class="rankDisplayData-node"
                            src="../../assets/svg/sangedian.svg"
                            alt=""
                          />
                        </span>
                        <template #dropdown>
                          <el-dropdown-menu>
                            <el-dropdown-item
                              v-for="(data, num) in item.rankDisplayData.slice(
                                4
                              )"
                              :key="num"
                              @click="
                                customClick(scope.$index, scope.row, data)
                              "
                            >
                              {{
                                data.name === 'status'
                                  ? scope.row[props.statusColoum] !==
                                    props.openValue
                                    ? $t('t-zgj-Enable')
                                    : $t('t-zgj-seal.deactivated')
                                  : $t(data.name)
                              }}
                            </el-dropdown-item>
                          </el-dropdown-menu>
                        </template>
                      </el-dropdown>
                    </div>
                  </div>
                </template>
              </el-table-column>
            </template>
          </el-table>
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
    },
    statusColoum: {
      type: String
    },
    openValue: {}
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
    reloadData,
    getSelectionRows
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
      table.value.clearSort()
      props.componentsSearchForm.data.forEach(item => {
        if (item.type === 'checkButton') {
          item.data.forEach(i => {
            delete i.checked
          })
        } else if (item.type === 'checkbox') {
          item.checkbox.forEach(i => {
            i.value = false
          })
        } else if (item.type === 'derivable') {
          item.options = []
          item.values = []
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

  function getSelectionRows() {
    return table.value.getSelectionRows()
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
    console.log(props.componentsSearchForm.data)
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
          if (item.requestType === 'array') {
            params.beginTime = item.value[0] + ' 00:00:00'
            params.endTime = item.value[0] + ' 23:59:59'
          } else {
            params[item.id] =
              item.value[0] + ' 00:00:00,' + item.value[1] + ' 23:59:59'
          }
        }
      } else if (item.type === 'derivable') {
        if (item.values && item.values.length) {
          if (item.defaultAttribute.multiple) {
            params[item.requestParams] = item.defaultAttribute.joinStr
              ? item.values.join(item.defaultAttribute.joinStr)
              : item.values
          } else {
            params[item.requestParams] = item.values[0]
          }
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
    console.log(JSON.parse(JSON.stringify(props.componentsTableHeader)))
    if (props.needAutoRequest) {
      reloadData()
    }
  })
</script>
<style lang="scss" scoped>
  .components-table {
    margin: 0%;
    width: 100%;

    .rankDisplayData {
      display: flex;
      // justify-content: space-around;
      // text-align: center;
      color: var(--jy-info-6);

      .rankDisplayData-node {
        cursor: pointer;
        margin-right: 0.5rem;
      }

      .rankDisplayData-more {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    th {
      font-weight: var(--jy-font-weight-400);
    }

    :deep {
      .el-table thead {
        color: var(--jy-color-text-1);
        font-size: var(--jy-font-size-body-2);
        font-weight: var(--jy-font-weight-400);
      }

      .el-checkbox__input.is-checked .el-checkbox__inner {
        background-color: var(--jy-primary-6);
        border-color: var(--jy-primary-6);
      }

      .el-checkbox__inner:hover {
        border-color: var(--jy-primary-6);
      }

      .el-checkbox__input.is-indeterminate .el-checkbox__inner {
        background-color: var(--jy-primary-6);
        border-color: var(--jy-primary-6);
      }
      .el-table__body tr.hover-row.current-row > td,
      .el-table__body tr.hover-row.el-table__row--striped.current-row > td,
      .el-table__body tr.hover-row.el-table__row--striped > td,
      .el-table__body tr.hover-row > td {
        background-color: var(--jy-background-color-1);
      }
      .el-table tbody tr:hover > td {
        background-color: var(--jy-background-color-1);
      }
    }
  }
</style>
