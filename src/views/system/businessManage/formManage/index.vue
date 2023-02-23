<template>
  <div>
    <componentsLayout Layout="title,searchForm,table,pagination,tree,batch">
      <template #title>
        <div class="title">
          <div>表单管理</div>
          <div>
            <el-button type="primary" @click="showAddForm">+ 新建</el-button>
          </div>
        </div>
      </template>

      <template #searchForm>
        <div>
          <componentsSearchForm
            :data="state.componentsSearchForm.data"
            :butData="state.componentsSearchForm.butData"
            :style="state.componentsSearchForm.style"
            @clickSubmit="getFormPage"
          >
          </componentsSearchForm>
        </div>
      </template>

      <template #batch>
        <div class="batch">
          <componentsBatch>
            <el-button>批量删除</el-button>
            <el-button>批量停用</el-button>
          </componentsBatch>
        </div>
      </template>

      <template #tree>
        <div>
          <componentsTree
            :data="state.componentsTree.data"
            :defaultAttribute="state.componentsTree.defaultAttribute"
            @node-click="clickTreeNode"
          >
          </componentsTree>
        </div>
      </template>

      <template #table>
        <div>
          <componentsTable
            :defaultAttribute="state.componentsTable.defaultAttribute"
            :data="state.componentsTable.data"
            :header="state.componentsTable.header"
            :isSelection="true"
            @cellClick="cellClick"
            @custom-click="customClick"
          >
          </componentsTable>
        </div>
      </template>

      <template #pagination>
        <componentsPagination
          :data="state.componentsPagination.data"
          :defaultAttribute="state.componentsPagination.defaultAttribute"
        >
        </componentsPagination>
      </template>
    </componentsLayout>
    <!-- 表单管理详情 -->
    <div class="ap-box">
      <componentsDocumentsDetails
        :show="state.componentsDocumentsDetails.show"
        :visible="state.componentsDocumentsDetails.visible"
        @clickClose="clickClose"
      >
      </componentsDocumentsDetails>
    </div>
    <!-- 新增表单 -->
    <AddFrom
      v-model="dialogVisible"
      v-if="dialogVisible"
      @close="dialogVisible = false"
    />
  </div>
</template>

<script setup>
  import { reactive, ref, defineAsyncComponent, onBeforeMount } from 'vue'
  import componentsTable from '@/views/components/table'
  import componentsSearchForm from '@/views/components/searchForm'
  import componentsPagination from '@/views/components/pagination.vue'
  import componentsLayout from '@/views/components/Layout.vue'
  import componentsTree from '@/views/components/tree'
  import componentsDocumentsDetails from '@/views/components/documentsDetails.vue'
  import componentsBatch from '@/views/components/batch.vue'
  import api from '@/api/system/formManagement'
  const AddFrom = defineAsyncComponent(() => import('./AddForm'))
  const dialogVisible = ref(false)
  const state = reactive({
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
          id: 'name',
          label: '关键词',
          type: 'input',
          inCommonUse: true,
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '表单名称/创建人'
          },
          options: [
            {
              value: '1',
              label: '全部'
            }
          ]
        },
        {
          id: 'name',
          label: '状态',
          type: 'select',
          inCommonUse: true,
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '请选择'
          },
          options: [
            {
              value: '1',
              label: '全部'
            }
          ]
        },
        {
          id: 'picker',
          label: '更新时间',
          type: 'picker',
          inCommonUse: true,
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            type: 'daterange',
            'start-placeholder': '开始时间',
            'end-placeholder': '结束时间'
          },
          style: {}
        },
        {
          id: 'name',
          label: '业务类型',
          type: 'select',
          inCommonUse: true,
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '请选择'
          },
          options: [
            {
              value: '1',
              label: '全部'
            }
          ]
        },
        {
          id: 'name',
          label: '文件类型',
          type: 'select',
          inCommonUse: true,
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '请选择'
          },
          options: [
            {
              value: '1',
              label: '全部'
            }
          ]
        },
        {
          id: 'name',
          label: '用印类型',
          type: 'select',
          inCommonUse: true,
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '请选择'
          },
          options: [
            {
              value: '1',
              label: '全部'
            }
          ]
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
          width: 50,
          type: 'selection',
          fixed: true
        },
        {
          prop: '0',
          label: '序号',
          width: 60,
          fixed: true,
          align: 'center'
        },
        {
          prop: 'formName',
          label: '表单名称',
          sortable: true,
          'min-width': 150,
          fixed: true
        },
        {
          prop: 'applyTypeName',
          label: '业务类型',
          sortable: true,
          'min-width': 150
        },
        {
          prop: 'sealUseTypeName',
          label: '用印类型',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '4',
          label: '文件类型',
          sortable: true,
          'min-width': 150
        },
        {
          prop: 'relationFlow',
          label: '状态',
          width: 90,
          sortable: true
        },
        {
          prop: 'createUserName',
          label: '创建人',
          sortable: true,
          'min-width': 150
        },
        {
          prop: 'modifyDatetime',
          label: '更新时间',
          width: 190,
          sortable: true
        },

        {
          prop: '8',
          label: '操作',
          fixed: 'right',
          width: 320,
          rankDisplayData: [
            {
              name: '修改'
            },
            {
              name: '删除'
            },
            {
              name: '启用'
            },
            {
              name: '复制'
            },
            {
              name: '关联文件类型'
            }
          ]
        }
      ],
      data: [
        // {
        //   0: 1,
        //   1: '小黄文件',
        //   2: '用印申请',
        //   3: '电子签章',
        //   4: '文件类型',
        //   5: '停用',
        //   6: '小白',
        //   7: '2022/10/30 15:00:00'
        // },
        // {
        //   0: 1,
        //   1: '小黄文件',
        //   2: '用印申请',
        //   3: '电子签章',
        //   4: '文件类型',
        //   5: '停用',
        //   6: '小白',
        //   7: '2022/10/30 15:00:00'
        // },
        // {
        //   0: 1,
        //   1: '小黄文件',
        //   2: '用印申请',
        //   3: '电子签章',
        //   4: '文件类型',
        //   5: '停用',
        //   6: '小白',
        //   7: '2022/10/30 15:00:00'
        // },
        // {
        //   0: 1,
        //   1: '小黄文件',
        //   2: '用印申请',
        //   3: '电子签章',
        //   4: '文件类型',
        //   5: '停用',
        //   6: '小白',
        //   7: '2022/10/30 15:00:00'
        // },
        // {
        //   0: 1,
        //   1: '小黄文件',
        //   2: '用印申请',
        //   3: '电子签章',
        //   4: '文件类型',
        //   5: '停用',
        //   6: '小白',
        //   7: '2022/10/30 15:00:00'
        // },
        // {
        //   0: 1,
        //   1: '小黄文件',
        //   2: '用印申请',
        //   3: '电子签章',
        //   4: '文件类型',
        //   5: '停用',
        //   6: '小白',
        //   7: '2022/10/30 15:00:00'
        // }
      ],
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        stripe: true,
        'header-cell-style': {
          background: 'var(--jy-color-fill--3)'
        },
        'cell-style': ({ row, column, rowIndex, columnIndex }) => {
          // console.log({ row, column, rowIndex, columnIndex });
          if (column.property === 'formName') {
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
        amount: 400,
        index: 1,
        pageNumber: 80
      },
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        layout: 'prev, pager, next, jumper',
        total: 500,
        'page-sizes': [10, 100, 200, 300, 400],
        background: true
      }
    },

    componentsTree: {
      data: [
        // {
        //   label: '用印申请',
        //   children: [
        //     {
        //       label: '用印申请'
        //     },
        //     {
        //       label: '转办申请'
        //     },
        //     {
        //       label: '重置用印申请'
        //     }
        //   ]
        // },
        // {
        //   label: '印章申请',
        //   children: [
        //     {
        //       label: '刻章申请'
        //     },
        //     {
        //       label: '停用申请'
        //     },
        //     {
        //       label: '启用申请'
        //     },
        //     {
        //       label: '销毁申请'
        //     },
        //     {
        //       label: '变更申请'
        //     },
        //     {
        //       label: '换章申请'
        //     }
        //   ]
        // }
      ],
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        'check-on-click-node': true,
        'show-checkbox': false,
        'default-expand-all': true,
        'expand-on-click-node': false,
        'check-strictly': true
      }
    },
    componentsDocumentsDetails: {
      show: false,
      visible: [
        {
          label: '表单详情',
          name: 'Form-Details'
        },
        {
          label: '操作记录',
          name: 'operating-record'
        },
        {
          label: '历史版本',
          name: 'Process-Version'
        }
      ]
    }
  })
  // 点击树节点
  function clickTreeNode(data) {
    console.log(data)
    getFormPage()
  }
  // 请求表单树
  function getListApplyTypeTree() {
    api.listApplyTypeTree().then(res => {
      console.log(res)
      const { code, data } = res
      if (code === 200) {
        const listApplyTypeTree = []
        const applyTypeId = []
        data.forEach(element => {
          element.label = element.applyTypeName
          if (element.parent_id === '') {
            element.children = []
            listApplyTypeTree.push(element)
            applyTypeId.push(element.applyTypeId)
          }
        })
        data.forEach(element => {
          const index = applyTypeId.indexOf(element.parent_id)
          if (index > -1) {
            listApplyTypeTree[index].children.push(element)
          }
        })
        state.componentsTree.data = listApplyTypeTree
      }
    })
  }
  // 请求表单列表
  function getFormPage() {
    const searchData = state.componentsSearchForm.data
    const queryParams = {
      keyword: '',
      updateStartTime: '',
      updateEndTime: '',
      applyTypeId: '',
      sealUseTypeId: '',
      relationFlow: ''
    }
    searchData.map((item, index) => {
      switch (item.label) {
        case '关键词':
          queryParams.keyword = item.value
          break
        case '状态':
          queryParams.relationFlow = item.value
          break
        case '更新时间':
          queryParams.updateStartTime = item.value && item.value[0]
          queryParams.updateEndTime = item.value && item.value[1]
          break
        case '业务类型':
          queryParams.applyTypeId = item.value
          break
        case '用印类型':
          queryParams.sealUseTypeId = item.value
          break
      }
    })
    console.log(queryParams)
    api.formPage(queryParams).then(res => {
      console.log(res)
      const { code, data } = res
      if (code === 200) {
        state.componentsTable.data = data
      }
    })
  }
  // 点击表格单元格
  function cellClick(row, column, cell, event) {
    // console.log(row, column, cell, event)
    if (column.property === 'formName') {
      state.componentsDocumentsDetails.show = true
    }
  }
  // 点击表格按钮
  function customClick(row, column, cell, event) {
    if (cell.name === '修改') {
      console.log(111)
      dialogVisible.value = true
    }
    if (cell.name === '修改') {
      console.log(111)
    }
  }
  // 点击关闭
  function clickClose() {
    state.componentsDocumentsDetails.show = false
  }
  function showAddForm() {
    dialogVisible.value = true
  }
  onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
    // 加载表单列表
    getListApplyTypeTree()
    getFormPage()
  })
</script>

<style lang="scss" scoped>
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
