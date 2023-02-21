<template>
  <div>
    <componentsLayout
      Layout="title,searchForm,table,pagination,tabs,tree,batch"
    >
      <template #title>
        <div class="title">消息模板</div>
      </template>

      <template #tabs>
        <div>
          <componentsTabs activeName="1" :data="state.componentsTabs.data">
          </componentsTabs>
        </div>
      </template>

      <template #searchForm>
        <div>
          <componentsSearchForm
            :data="state.componentsSearchForm.data"
            :butData="state.componentsSearchForm.butData"
            :style="state.componentsSearchForm.style"
          >
          </componentsSearchForm>
        </div>
      </template>

      <template #tree>
        <div>
          <componentsTree
            :data="state.componentsTree.data"
            :defaultAttribute="state.componentsTree.defaultAttribute"
          >
          </componentsTree>
        </div>
      </template>

      <template #batch>
        <div class="batch">
          <componentsBatch> </componentsBatch>
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
    <!-- 消息模板详情 -->
    <div class="ap-box">
      <componentsDocumentsDetails
        :show="state.componentsDocumentsDetails.show"
        :visible="state.componentsDocumentsDetails.visible"
        @clickClose="clickClose"
      >
      </componentsDocumentsDetails>
    </div>
  </div>
</template>

<script setup>
  import { reactive } from 'vue'
  import componentsTable from '@/views/components/table'
  import componentsSearchForm from '@/views/components/searchForm'
  import componentsPagination from '@/views/components/pagination.vue'
  import componentsLayout from '@/views/components/Layout.vue'
  import componentsTabs from '@/views/components/tabs.vue'
  import componentsTree from '@/views/components/tree'
  import componentsDocumentsDetails from '@/views/components/documentsDetails.vue'
  import componentsBatch from '@/views/components/batch.vue'

  const state = reactive({
    componentsTabs: {
      data: [
        {
          label: '通知事件',
          name: '1'
        },
        {
          label: '预警事件',
          name: '2'
        }
      ]
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
          id: 'name',
          label: '关键词',
          type: 'input',
          inCommonUse: true,
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '事件名称/事件描述'
          }
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
          id: 'name',
          label: '渠道类型',
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
          prop: '0',
          label: '序号',
          width: 60,
          fixed: true,
          align: 'center'
        },
        {
          prop: '1',
          label: '模版名称',
          sortable: true,
          'min-width': 150,
          fixed: true
        },
        {
          prop: '2',
          label: '关联事件',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '3',
          label: '事件类别',
          sortable: true,
          'min-width': 150
        },

        {
          prop: '4',
          label: '状态',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '5',
          label: '渠道类型',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '6',
          label: '更新时间',
          sortable: true,
          width: 180
        },
        {
          prop: '7',
          label: '备注',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '8',
          label: '操作',
          width: 80,
          fixed: 'right',
          rankDisplayData: [
            {
              name: '修改'
            }
          ]
        }
      ],
      data: [
        {
          0: 1,
          1: '模版名称',
          2: '关联事件',
          3: '事件类别',
          4: '启用',
          5: '渠道类型',
          6: '2022/10/30 22:22:22',
          7: '备注'
        },
        {
          0: 2,
          1: '模版名称',
          2: '关联事件',
          3: '事件类别',
          4: '启用',
          5: '渠道类型',
          6: '2022/10/30 22:22:22',
          7: '备注'
        },
        {
          0: 3,
          1: '模版名称',
          2: '关联事件',
          3: '事件类别',
          4: '启用',
          5: '渠道类型',
          6: '2022/10/30 22:22:22',
          7: '备注'
        },
        {
          0: 4,
          1: '模版名称',
          2: '关联事件',
          3: '事件类别',
          4: '启用',
          5: '渠道类型',
          6: '2022/10/30 22:22:22',
          7: '备注'
        },
        {
          0: 5,
          1: '模版名称',
          2: '关联事件',
          3: '事件类别',
          4: '启用',
          5: '渠道类型',
          6: '2022/10/30 22:22:22',
          7: '备注'
        }
      ],
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        stripe: true,
        'header-cell-style': {
          background: 'var(--jy-color-fill--3)'
        },
        'cell-style': ({ row, column, rowIndex, columnIndex }) => {
          // console.log({ row, column, rowIndex, columnIndex });
          if (column.property === '1') {
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
        {
          label: 'A层级菜单1',
          children: [
            {
              label: 'B层级菜单1',
              children: [
                {
                  label: 'C层级菜单1'
                }
              ]
            }
          ]
        }
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
          label: '模板详情',
          name: 'Template-Details'
        },
        {
          label: '流程记录',
          name: 'operating-record'
        }
      ]
    }
  })
  // 点击表格单元格
  function cellClick(row, column, cell, event) {
    console.log(row, column, cell, event)
    if (column.property == '1') {
      state.componentsDocumentsDetails.show = true
    }
  }
  // 点击关闭
  function clickClose() {
    state.componentsDocumentsDetails.show = false
  }
</script>

<style lang="scss" scoped></style>
