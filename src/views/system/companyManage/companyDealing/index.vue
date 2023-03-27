<!--
* @Descripttion 往来企业
* @FileName index.vue
* @Author Guanpf
* @LastEditTime 2023-03-14 15:43:20
!-->
<template>
  <div>
    <!-- <componentsLayout Layout="title,searchForm,table,pagination,batch">
      <template #title>
        <div class="title">
          <div>往来企业</div>
          <div class="title-more">
            <div class="title-more-add">
              <el-button
                type="primary"
                @click="
                  () => {
                    ;(showFormDialog = true),
                      (state.title = '新增'),
                      (state.column = {})
                  }
                "
                >+ 增加</el-button
              >
            </div>
            <div class="title-more-down">
              <el-dropdown>
                <el-button>
                  <img
                    class="button-icon"
                    src="@/assets/svg/gengduo-caozuo.svg"
                    alt=""
                    srcset=""
                  />
                  <span>更多操作</span>
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>导入</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
        </div>
      </template>

      <template #searchForm>
        <div>
          <componentsSearchForm
            :data="state.componentsSearchForm.data"
            :butData="state.componentsSearchForm.butData"
            :style="state.componentsSearchForm.style"
            @clickSubmit="clickSubmit"
          >
          </componentsSearchForm>
        </div>
      </template>

      <template #batch>
        <div class="batch">
          <componentsBatch
            :data="state.componentsBatch.data"
            :defaultAttribute="state.componentsBatch.defaultAttribute"
            @clickBatchButton="clickBatchButton"
          ></componentsBatch>
        </div>
      </template>

      <template #table>
        <div>
          <componentsTable
            :defaultAttribute="state.componentsTable.defaultAttribute"
            :data="state.componentsTable.data"
            :header="state.componentsTable.header"
            :paginationData="state.componentsPagination.data"
            :isSelection="true"
            :loading="state.componentsTable.loading"
            @cellClick="cellClick"
            @custom-click="customClick"
            @selection-change="selectionChange"
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
    </componentsLayout> -->
    <JyTable
      url="/tenant/relatedCompany/list"
      ref="table"
      :needAutoRequest="true"
      :componentsSearchForm="state.componentsSearchForm"
      :componentsTableHeader="state.componentsTable.header"
      :componentsBatch="state.componentsBatch"
      tableClick="userName"
      @cellClick="cellClick"
      @customClick="customClick"
      @clickBatchButton="clickBatchButton"
    >
      <template #title>
        <div class="title">
          <div>往来企业</div>
          <div class="title-more">
            <div class="title-more-add">
              <el-button
                type="primary"
                @click="
                  () => {
                    ;(showFormDialog = true),
                      (state.title = '新增'),
                      (state.column = {})
                  }
                "
                >+ 增加</el-button
              >
            </div>
            <div class="title-more-down">
              <el-dropdown>
                <el-button>
                  <img
                    class="button-icon"
                    src="@/assets/svg/gengduo-caozuo.svg"
                    alt=""
                    srcset=""
                  />
                  <span>更多操作</span>
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>导入</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
        </div>
      </template>
    </JyTable>
    <!-- 往来详情 -->
    <div class="ap-box">
      <componentsDocumentsDetails
        :show="state.componentsDocumentsDetails.show"
        :visible="state.componentsDocumentsDetails.visible"
        @clickClose="clickClose"
      >
      </componentsDocumentsDetails>
    </div>
    <!-- 新建 -->
    <componetsAddForm
      :showAdd="showFormDialog"
      :title="state.title"
      :column="state.column"
      @on-cancel="closeFormDialog"
      @on-confirm="submitFromDialog"
    >
    </componetsAddForm>
    <JyElMessageBox
      v-model="state.JyElMessageBox.show"
      :show="state.JyElMessageBox.show"
      :defaultAttribute="{}"
      @confirmClick="confirmClick"
    >
      <template #header>
        <div class="header-div">
          <img :src="state.JyElMessageBox.header.icon" alt="" />
          <span>{{ state.JyElMessageBox.header.data }}</span>
        </div>
      </template>
      <template #content>
        {{ state.JyElMessageBox.content.data }}
      </template>
    </JyElMessageBox>
  </div>
</template>

<script setup>
  import { ref, reactive, onBeforeMount } from 'vue'
  import JyTable from '@/views/components/JyTable.vue'
  import componentsTable from '@/views/components/table'
  import componentsSearchForm from '@/views/components/searchForm'
  import componentsPagination from '@/views/components/pagination'
  import componentsLayout from '@/views/components/Layout'
  import componentsDocumentsDetails from '@/views/components/documentsDetails.vue'
  import componentsBatch from '@/views/components/batch.vue'
  import componetsAddForm from './modules/addDealing.vue'
  import { ElMessage } from 'element-plus'
  import api from '@/api/system/companyManagement/companyDealing'
  const showFormDialog = ref(false)
  const table = ref(null)
  const state = reactive({
    title: '新增',
    column: {},
    relatedCompanyIds: [],
    componetsAddForm: {
      showAddDialog: false
    },
    componentsSearchForm: {
      style: {
        lineStyle: {
          width: '30%'
        },
        labelStyle: {
          width: '100px'
        }
      },

      data: [
        {
          id: 'relatedCompanyName',
          label: '关键词',
          type: 'input',
          inCommonUse: true,
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '企业名称/企业编码/联系人/联系方式'
          }
        },
        {
          id: 'organId',
          requestParams: 'organId',
          label: '所属部门',
          type: 'derivable',
          inCommonUse: true,
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            type: 'organ',
            placeholder: '+所属部门',
            joinStr: ','
          }
        }
      ],
      butData: [
        {
          id: 'more',
          name: '展开',
          type: 'unfold',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            type: 'primary'
          },
          style: {}
        },
        {
          id: 'inquire',
          name: '查询',
          type: 'click',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            type: 'primary'
          },
          style: {}
        },
        {
          id: 'reset',
          name: '重置',
          type: 'click',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {},
          style: {}
        }
      ]
    },

    componentsTable: {
      header: [
        {
          prop: 'relatedCompanyName',
          label: '企业名称',
          sortable: true,
          'min-width': 150,
          fixed: true,
          'show-overflow-tooltip': true
        },
        {
          prop: 'relatedCompanyNo',
          label: '企业编码',
          sortable: true,
          'min-width': 150
        },

        {
          prop: 'organName',
          label: '所属部门',
          sortable: true,
          'min-width': 150
        },
        {
          prop: 'contactName',
          label: '联系人',
          sortable: true,
          'min-width': 150
        },
        {
          prop: 'contactInformation',
          label: '联系方式',
          sortable: true,
          'min-width': 150
        },
        {
          prop: 'readme',
          label: '备注',
          sortable: true,
          'min-width': 150,
          'show-overflow-tooltip': true
        },
        {
          prop: '7',
          label: '操作',
          fixed: 'right',
          width: '120px',
          rankDisplayData: [
            {
              name: '修改'
            },
            {
              name: '删除'
            }
          ]
        }
      ],
      data: [],
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        stripe: true,
        'header-cell-style': {
          background: 'var(--jy-color-fill--3)'
        },
        'cell-style': ({ row, column, rowIndex, columnIndex }) => {
          // console.log({ row, column, rowIndex, columnIndex });
          if (column.property === 'relatedCompanyName') {
            return {
              color: 'var(--jy-info-6)',
              cursor: 'pointer'
            }
          }
        }
      },
      loading: false
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
    componentsDocumentsDetails: {
      show: false,
      visible: [
        {
          label: '往来企业详情',
          name: 'Current-Business-Details'
        },
        {
          label: '流程记录',
          name: 'operating-record'
        }
      ]
    },
    componentsBatch: {
      selectionData: [],
      defaultAttribute: {
        disabled: true
      },
      data: [
        {
          name: '批量删除'
        }
      ]
    },
    JyElMessageBox: {
      show: false,
      header: {
        data: '',
        icon: '/src/assets/svg/common/warning.svg'
      },
      content: {
        data: ''
      },
      type: '删除'
    }
  })
  // 筛选条件按钮
  const clickSubmit = (item, index) => {
    console.log(item)
    if (item.id === 'reset') {
      state.componentsSearchForm.data.forEach(v => {
        delete v.value
      })
    }
    getFormPage()
  }
  // 分页页数变化
  const currentChange = data => {
    console.log(data)
    state.componentsPagination.data.index = data
    getFormPage()
  }
  // 每页请求数量变化
  const sizeChange = data => {
    console.log(data)
    state.componentsPagination.data.index = 1
    state.componentsPagination.data.pageNumber = data
    getFormPage()
  }
  // 获取表格列表
  const getFormPage = () => {
    const searchData = state.componentsSearchForm.data
    console.log(searchData)
    const queryParams = {}
    searchData.forEach(item => {
      queryParams[item.id] = item.value
    })
    queryParams.pageNo = state.componentsPagination.index || 1
    queryParams.pageSize = state.componentsPagination.pageNumber || 10
    state.componentsTable.loading = true
    console.log(queryParams)
    api.getRelatedCompanyList(queryParams).then(
      res => {
        console.log(res)
        if (res.code === 200) {
          state.componentsTable.data = res.data.records
          state.componentsPagination.data.amount = res.data.total
          state.componentsPagination.defaultAttribute.total = res.data.total
        }
        state.componentsTable.loading = false
      },
      () => {
        state.componentsTable.loading = false
      }
    )
  }
  // 关闭新增弹窗
  const closeFormDialog = () => {
    showFormDialog.value = false
  }
  // 提交
  const submitFromDialog = (data, type) => {
    console.log('submitFromDialog', data, type)
    if (data.code === 200) {
      ElMessage.success(`${type}了一条记录！`)
      showFormDialog.value = false
      getFormPage()
    }
  }
  // 点击表格单元格
  function cellClick(row, column, cell, event) {
    console.log('row', row)
    console.log('column', column)
    console.log('cell', cell)
    console.log('event', event)
    if (column.property === 'relatedCompanyName') {
      api.detailRelatedCompany(row.relatedCompanyId).then(res => {
        if (res.code === 200) {
          const baseData = [
            {
              label: '企业名称',
              value: res.data.relatedCompanyName
            },
            {
              label: '企业编码',
              value: res.data.relatedCompanyNo
            },
            {
              label: '企业所属部门',
              value: res.data.organName
            },
            {
              label: '联系人',
              value: res.data.contactName
            },
            {
              label: '备注：',
              value: res.data.readme,
              lineStyle: {
                width: '100%'
              }
            }
          ]

          state.componentsDocumentsDetails.visible.forEach(item => {
            if (item.name === 'Current-Business-Details') {
              state.componentsDocumentsDetails.visible[0][
                'basicInformation-data'
              ] = baseData
            }
          })
          state.componentsDocumentsDetails.show = true
        }
      })
    }
  }
  // 点击关闭
  function clickClose() {
    state.componentsDocumentsDetails.show = false
  }
  // 点击表格按钮
  function customClick(row, column, cell, event) {
    state.relatedCompanyIds = []
    state.relatedCompanyIds.push(column.relatedCompanyId)
    if (cell.name === '修改') {
      state.title = '修改'
      showFormDialog.value = true
      state.column = column
    }
    if (cell.name === '删除') {
      state.JyElMessageBox.header.data = '删除'
      state.JyElMessageBox.content.data = '请问确定要删除吗？'
      state.JyElMessageBox.show = true
    }
  }
  const confirmClick = data => {
    console.log(data)
    delRows(state.JyElMessageBox.header.data)
  }
  const delRows = delType => {
    console.log(state.relatedCompanyIds)
    api
      .deleteRelatedCompany({ relatedCompanyIds: state.relatedCompanyIds })
      .then(res => {
        if (res.code === 200) {
          ElMessage.success(`${delType}成功！`)
          state.JyElMessageBox.show = false
          // getFormPage()
          table.value.reloadData()
        }
      })
  }
  // 当选择项发生变化时会触发该事件
  function selectionChange(selection) {
    //    console.log(selection);
    state.componentsBatch.selectionData = selection
    if (state.componentsBatch.selectionData.length > 0) {
      state.componentsBatch.defaultAttribute.disabled = false
    } else {
      state.componentsBatch.defaultAttribute.disabled = true
    }
  }
  // 批量操作
  const clickBatchButton = (item, index) => {
    state.relatedCompanyIds = []
    const list = state.componentsBatch.selectionData
    console.log('list', list)
    console.log(list[0])
    let nameList = ''
    const nameArr = []
    const nameIdArr = []
    list.forEach(el => {
      nameArr.push(`[${el.relatedCompanyName}]`)
      nameIdArr.push(el.relatedCompanyId)
    })
    state.relatedCompanyIds = nameIdArr
    nameList = nameArr.join('、')
    if (item.name === '批量删除') {
      state.JyElMessageBox.header.data = '批量删除'
      state.JyElMessageBox.content.data = `已选中往来企业：${nameList}，请问确定要批量删除吗？`
      state.JyElMessageBox.show = true
      state.JyElMessageBox.type = '批量删除'
    }
  }
  onBeforeMount(() => {
    getFormPage()
  })
</script>

<style lang="scss" scoped>
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title-more {
      height: 100%;
      display: flex;
      align-items: center;

      .title-more-add {
        margin-right: 0.5rem;
        height: 100%;
        display: flex;
        align-items: center;
      }

      .title-more-down {
        height: 100%;
        display: flex;
        align-items: center;
      }
    }
  }
</style>
