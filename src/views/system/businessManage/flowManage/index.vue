<template>
  <div class="flowManage-index">
    <componentsLayout Layout="title,searchForm,table,pagination,tree,batch">
      <template #title>
        <div class="title">
          <div>流程管理</div>
          <div class="title-more">
            <div class="title-more-add">
              <el-button
                type="primary"
                @click="state.JyElMessageBox.show = true"
                >+ 新建</el-button
              >
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
          >
          </componentsBatch>
        </div>
      </template>

      <template #tree>
        <div>
          <componentsTree
            :data="state.componentsTree.data"
            :defaultAttribute="state.componentsTree.defaultAttribute"
            :defaultProps="state.componentsTree.defaultProps"
            @current-change="currentChange"
          >
          </componentsTree>
        </div>
      </template>

      <template #table>
        <div>
          <componentsTable
            :defaultAttribute="state.componentsTable.defaultAttribute"
            refs="tables"
            ref="table"
            :data="state.componentsTable.data"
            :header="state.componentsTable.header"
            :paginationData="state.componentsPagination.data"
            :isSelection="true"
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
          @current-change="currentPageChange"
          @size-change="sizeChange"
        >
        </componentsPagination>
      </template>
    </componentsLayout>
    <!-- 流程详情 -->
    <div class="ap-box">
      <componentsDocumentsDetails
        v-model="state.componentsDocumentsDetails.show"
        :visible="state.componentsDocumentsDetails.visible"
        @clickClose="clickClose"
      >
      </componentsDocumentsDetails>
    </div>
    <!-- 新建弹框 -->
    <div v-if="state.JyElMessageBox.show">
      <AntModalBox
        v-model="state.JyElMessageBox.show"
        :custom-content="true"
        :defaultAttribute="{
          fullscreen: true,
          height: '100%'
        }"
      >
        <newlyIncreased
          :businessList="state.componentsTree.data"
          @close="state.JyElMessageBox.show = false"
        ></newlyIncreased>
      </AntModalBox>
    </div>
  </div>
</template>

<script setup>
  import {
    reactive,
    onBeforeMount,
    onMounted,
    defineAsyncComponent,
    ref
  } from 'vue'
  import componentsTable from '@/views/components/table'
  import componentsSearchForm from '@/views/components/searchForm'
  import componentsPagination from '@/views/components/pagination.vue'
  import componentsLayout from '@/views/components/Layout.vue'
  import componentsTree from '@/views/components/tree'
  import componentsDocumentsDetails from '@/views/components/documentsDetails.vue'
  import componentsBatch from '@/views/components/batch.vue'
  // import newlyIncreased from './newly-increased.vue'
  import AntModalBox from '@/views/components/modules/AntModalBox.vue'
  import apiFlow from '@/api/system/flowManagement'
  import apiForm from '@/api/system/formManagement'
  // 异步组件
  const newlyIncreased = defineAsyncComponent(() =>
    import('./newly-increased.vue')
  )

  const loading = ref(false)
  const table = ref(null)
  const orderBy = ref(null)

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
          id: 'keyword',
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
          id: 'status',
          label: '状态',
          type: 'select',
          optionLabel: 'label',
          optionValue: 'value',
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
          id: 'fileTypeId',
          label: '文件类型',
          type: 'select',
          inCommonUse: true,
          optionLabel: 'label',
          optionValue: 'value',
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
          id: 'sealUseTypeId',
          label: '用印类型',
          type: 'select',
          optionLabel: 'label',
          optionValue: 'value',
          inCommonUse: true,
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '请选择'
          },
          options: [
            {
              value: '1',
              label: '物理用印'
            },
            {
              value: '2',
              label: '电子签章'
            }
          ]
        },
        {
          id: 'relationForm',
          label: '关联表单名称',
          type: 'select',
          optionLabel: 'label',
          optionValue: 'value',
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
          prop: 'formName',
          label: '流程名称',
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
          prop: '4',
          label: '文件类型',
          sortable: true,
          'min-width': 150
        },
        {
          prop: 'relationFlow',
          label: '状态',
          sortable: true,
          'min-width': 150
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
          sortable: true,
          width: 180
        },

        {
          prop: '8',
          label: '操作',
          width: 180,
          fixed: 'right',
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
        amount: 0,
        index: 1,
        pageNumber: 10
      },
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        layout: 'prev, pager, next, jumper',
        total: 0,
        'page-sizes': [10, 100, 200, 300, 400],
        background: true
      }
    },

    componentsTree: {
      data: [],
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        'check-on-click-node': true,
        'show-checkbox': false,
        'default-expand-all': true,
        'expand-on-click-node': false,
        'check-strictly': true,
        'highlight-current': true,
        'node-key': 'applyTypeId',
        'current-node-key': '2'
      },
      defaultProps: {
        label: 'applyTypeName',
        children: 'children'
      },
      value: '2'
    },
    componentsBatch: {
      selectionData: [],
      defaultAttribute: {
        disabled: true
      },
      data: [
        {
          name: '批量删除'
        },
        {
          name: '批量启用'
        },
        {
          name: '批量停用'
        }
      ]
    },
    componentsDocumentsDetails: {
      show: false,
      visible: [
        {
          label: '流程详情',
          name: 'Process-Details'
        },
        {
          label: '流程版本',
          name: 'Process-Version'
        },
        {
          label: '流程记录',
          name: 'operating-record'
        }
      ]
    },
    JyElMessageBox: {
      show: false,
      header: {
        data: ''
      },
      content: {
        data: ''
      }
    }
  })
  // 点击表格单元格
  const cellClick = (row, column, cell, event) => {
    // console.log(row, column, cell, event)
    if (column.property === 'formName') {
      state.componentsDocumentsDetails.show = true
    }
  }
  // 点击关闭
  const clickClose = () => {
    console.log('--->', state.componentsDocumentsDetails.show)
    // state.componentsDocumentsDetails.show = false
  }
  // 发送api请求 查询表单树解构
  const listApplyTypeTreeApi = () => {
    apiForm.listApplyTypeTree({}).then(result => {
      const listApplyTypeTree = []
      result.data.forEach(element => {
        if (!element.applyTypePid) {
          element.children = []
          listApplyTypeTree.push(element)
        } else {
          const index = listApplyTypeTree.findIndex(
            i => i.applyTypeId === element.applyTypePid
          )
          if (index > -1) {
            listApplyTypeTree[index].children.push(element)
          }
        }
      })
      state.componentsTree.data = listApplyTypeTree
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

  // 筛选条件按钮
  const clickSubmit = (item, index) => {
    if (item.id === 'reset') {
      table.value.clearSorts()
      state.componentsSearchForm.data.forEach(item => {
        if (item.type === 'checkButton') {
          item.data.forEach(i => {
            delete i.checked
          })
        } else if (item.type === 'checkbox') {
          console.log(JSON.parse(JSON.stringify(item.checkbox)))
          item.checkbox.forEach(i => {
            i.value = false
          })
          console.log(JSON.parse(JSON.stringify(item.checkbox)))
        } else {
          delete item.value
        }
      })
    }
    reloadData()
  }

  // 自定义排序
  function sortChange(orderBack) {
    console.log(JSON.parse(JSON.stringify(orderBack)))
    orderBy.value = orderBack
    reloadData()
  }

  const reloadData = () => {
    state.componentsPagination.data.index = 1
    state.componentsTable.data = []
    state.componentsPagination.data.amount = 0
    flowPageApi()
  }

  // 发送api请求 流程列表
  const flowPageApi = () => {
    loading.value = true
    const params = {}
    state.componentsSearchForm.data.forEach(item => {
      if (item.type === 'checkButton') {
        params[item.id] = item.data
          .filter(i => i.checked)
          .map(i => i.id)
          .join(',')
      } else if (item.type === 'checkbox') {
        params[item.id] = item.checkbox[0].value ? item.checkbox[0].value : ''
      } else if (item.type === 'picker') {
        if (item.value) {
          params[item.id] =
            item.value[0] + ' 00:00:00,' + item.value[1] + ' 23:59:59'
        }
      } else {
        params[item.id] = item.value
      }
    })
    apiFlow
      .page({
        ...{
          current: state.componentsPagination.data.index,
          size: state.componentsPagination.data.pageNumber,
          applyTypeId: state.componentsTree.value,
          sorts: orderBy.value
            ? orderBy.value.prop +
              ',' +
              (orderBy.value.order === 'ascending' ? 'asc' : 'desc')
            : ''
        },
        ...params
      })
      .then(result => {
        console.log(result)
        state.componentsTable.data = result.data.records
        state.componentsPagination.data.amount = result.data.total
        state.componentsPagination.defaultAttribute.total = result.data.total
        loading.value = false
      })
  }
  // // 发送api请求 删除流程
  // const flowDeleteApi = () => {
  //   return apiFlow
  //     .delete({
  //       processId: ''
  //     })
  //     .then(result => {
  //       console.log(result)
  //       return result
  //     })
  // }
  // // 发送api请求 启用/停用
  // const flowEnableApi = () => {
  //   return apiFlow
  //     .enable({
  //       processId: '',
  //       processStatus: ''
  //     })
  //     .then(result => {
  //       console.log(result)
  //       return result
  //     })
  // }
  // // 发送api请求 复制流程
  // const flowCopyApi = () => {
  //   return apiFlow
  //     .copy({
  //       processId: '',
  //       processName: ''
  //     })
  //     .then(result => {
  //       console.log(result)
  //       return result
  //     })
  // }
  // // 发送api请求 批量删除
  // const batchDeleteApi = () => {
  //   return apiFlow
  //     .batchDelete([
  //       {
  //         processId: '主键'
  //       },
  //       {
  //         processId: '主键'
  //       }
  //     ])
  //     .then(result => {
  //       console.log(result)
  //       return result
  //     })
  // }
  // // 发送api请求 批量启用
  // const batachEnableApi = () => {
  //   return apiFlow
  //     .batachEnable([
  //       {
  //         processId: '主键'
  //       },
  //       {
  //         processId: '主键'
  //       }
  //     ])
  //     .then(result => {
  //       console.log(result)
  //       return result
  //     })
  // }
  // // 发送api请求 批量停用
  // const batachDisableApi = () => {
  //   return apiFlow
  //     .batachDisable([
  //       {
  //         processId: '主键'
  //       },
  //       {
  //         processId: '主键'
  //       }
  //     ])
  //     .then(result => {
  //       console.log(result)
  //       return result
  //     })
  // }
  const currentChange = e => {
    state.componentsTree.value = e.applyTypeId
    reloadData()
  }
  onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
    // 发送api请求 查询表单树解构
    listApplyTypeTreeApi()
    // 发送api请求 流程列表
    flowPageApi()
    // // 发送api请求 删除流程
    // flowDeleteApi()
    // // 发送api请求 启用/停用
    // flowEnableApi()
    // // 发送api请求 复制流程
    // flowCopyApi()
    // // 发送api请求 批量删除
    // batchDeleteApi()
    // // 发送api请求 批量启用
    // batachEnableApi()
    // // 发送api请求 批量停用
    // batachDisableApi()
  })
  onMounted(() => {
    // console.log(`the component is now mounted.`)
  })
</script>

<style lang="scss" scoped>
  .flowManage-index {
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title-more {
        height: 100%;
        display: flex;
        align-items: center;

        .title-more-add {
          // margin-right: 0.5rem;
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
  }
</style>
