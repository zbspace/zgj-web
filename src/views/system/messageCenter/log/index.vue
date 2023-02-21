<template>
  <div>
    <componentsLayout Layout="title,searchForm,table,pagination">
      <template #title>
        <div class="title">消息日志</div>
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

      <template #table>
        <div>
          <componentsTable
            :defaultAttribute="state.componentsTable.defaultAttribute"
            :data="state.componentsTable.data"
            :header="state.componentsTable.header"
            :isSelection="true"
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
  </div>
</template>

<script setup>
  import { reactive } from 'vue'
  import componentsTable from '@/views/components/table'
  import componentsSearchForm from '@/views/components/searchForm'
  import componentsPagination from '@/views/components/pagination.vue'
  import componentsLayout from '@/views/components/Layout.vue'

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
            placeholder: '通知人/通知账号/通知标题/通知内容'
          }
        },
        {
          id: 'name',
          label: '发送渠道',
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
          label: '发送状态',
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
          label: '通知事件',
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
          label: '通知人',
          sortable: true,
          'min-width': 150,
          fixed: true
        },
        {
          prop: '2',
          label: '通知账号',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '3',
          label: '通知事件',
          sortable: true,
          'min-width': 150
        },

        {
          prop: '4',
          label: '通知标题',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '5',
          label: '通知内容',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '6',
          label: '发送渠道',
          sortable: true,
          width: 180
        },
        {
          prop: '7',
          label: '发送状态',
          sortable: true,
          'min-width': 150
        }
      ],
      data: [
        {
          0: 1,
          1: '通知人',
          2: '19999999',
          3: '通知事件',
          4: '通知标题',
          5: '通知内容',
          6: '发送渠道',
          7: '发送状态'
        },
        {
          0: 2,
          1: '通知人',
          2: '19999999',
          3: '通知事件',
          4: '通知标题',
          5: '通知内容',
          6: '发送渠道',
          7: '发送状态'
        },
        {
          0: 3,
          1: '通知人',
          2: '19999999',
          3: '通知事件',
          4: '通知标题',
          5: '通知内容',
          6: '发送渠道',
          7: '发送状态'
        },
        {
          0: 4,
          1: '通知人',
          2: '19999999',
          3: '通知事件',
          4: '通知标题',
          5: '通知内容',
          6: '发送渠道',
          7: '发送状态'
        },
        {
          0: 5,
          1: '通知人',
          2: '19999999',
          3: '通知事件',
          4: '通知标题',
          5: '通知内容',
          6: '发送渠道',
          7: '发送状态'
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
    }
  })
</script>

<style lang="scss" scoped></style>
