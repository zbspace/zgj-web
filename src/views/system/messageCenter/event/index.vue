<template>
  <div class="message-center-event">
    <componentsLayout
      Layout="title,searchForm,table,pagination,tabs,tree,batch"
    >
      <template #title>
        <div class="title"> 消息事件 </div>
      </template>

      <template #tabs>
        <div>
          <componentsTabs
            active-name="1"
            @tab-change="tabChange"
            :data="state.componentsTabs.data"
          />
        </div>
      </template>

      <template #searchForm>
        <div>
          <componentsSearchForm
            :data="state.componentsSearchForm.data"
            :but-data="state.componentsSearchForm.butData"
            :style="state.componentsSearchForm.style"
          />
        </div>
      </template>

      <template #tree>
        <div>
          <template
            v-for="(item, index) in state.componentsTree.filter(v => {
              return v.type === activeName
            })"
            :key="index"
          >
            <div class="type" v-if="item.children && item.children.length">
              <img :src="icon" alt="" />
              <span>{{ item.label }}</span>
            </div>

            <template v-for="(item1, index1) in item.children" :key="index1">
              <div class="item">
                {{ item1.label }}
              </div>
            </template>
          </template>
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
            :default-attribute="state.componentsTable.defaultAttribute"
            :data="state.componentsTable.data"
            :header="state.componentsTable.header"
            :is-selection="true"
            @cell-click="cellClick"
          />
        </div>
      </template>

      <template #pagination>
        <componentsPagination
          :data="state.componentsPagination.data"
          :default-attribute="state.componentsPagination.defaultAttribute"
        />
      </template>
    </componentsLayout>
    <!-- 消息时间详情 -->
    <div class="ap-box">
      <componentsDocumentsDetails
        :show="state.componentsDocumentsDetails.show"
        :visible="state.componentsDocumentsDetails.visible"
        @click-close="clickClose"
      />
    </div>
  </div>
</template>

<script setup>
  import { reactive, ref } from 'vue'
  import componentsTable from '@/views/components/table'
  import componentsSearchForm from '@/views/components/searchForm'
  import componentsPagination from '@/views/components/pagination.vue'
  import componentsLayout from '@/views/components/Layout.vue'
  import componentsTabs from '@/views/components/tabs.vue'
  import componentsDocumentsDetails from '@/views/components/documentsDetails.vue'
  import icon from '@/assets/svg/system/message-center/icon.svg'
  import componentsBatch from '@/views/components/batch.vue'

  const activeName = ref('1')
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
          fixed: true
        },
        {
          prop: '2',
          label: '事件名称',
          sortable: true,
          'min-width': 150,
          fixed: true
        },
        {
          prop: '1',
          label: '事件类别',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '3',
          label: '事件描述',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '4',
          label: '更新时间',
          sortable: true,
          width: 180
        },
        {
          prop: '5',
          label: '状态',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '6',
          label: '通知人',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '7',
          label: '触发渠道',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '8',
          label: '操作',
          width: 260,
          fixed: 'right',
          rankDisplayData: [
            {
              name: '编辑'
            },
            {
              name: '复制'
            },
            {
              name: '删除'
            },
            {
              name: '其他操作'
            }
          ]
        }
      ],
      data: [
        {
          0: 1,
          1: '用印申请',
          2: '用印申请',
          3: '事件描述',
          4: '2022/10/30 22:22:22',
          5: '启用',
          6: '小张',
          7: '钉钉'
        },
        {
          0: 1,
          1: '用印申请',
          2: '用印申请',
          3: '事件描述',
          4: '2022/10/30 22:22:22',
          5: '启用',
          6: '小张',
          7: '钉钉'
        },
        {
          0: 1,
          1: '用印申请',
          2: '用印申请',
          3: '事件描述',
          4: '2022/10/30 22:22:22',
          5: '启用',
          6: '小张',
          7: '钉钉'
        },
        {
          0: 1,
          1: '用印申请',
          2: '用印申请',
          3: '事件描述',
          4: '2022/10/30 22:22:22',
          5: '启用',
          6: '小张',
          7: '钉钉'
        },
        {
          0: 1,
          1: '用印申请',
          2: '用印申请',
          3: '事件描述',
          4: '2022/10/30 22:22:22',
          5: '启用',
          6: '小张',
          7: '钉钉'
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

    componentsTree: [
      {
        label: '用印申请',
        type: '1',
        children: [
          {
            label: '用印申请'
          },
          {
            label: '转办申请'
          },
          {
            label: '重置用印申请'
          }
        ]
      },
      {
        label: '印章申请',
        type: '1',
        children: [
          {
            label: '刻章申请'
          },
          {
            label: '停用申请'
          },
          {
            label: '启用申请'
          },
          {
            label: '销毁申请'
          },
          {
            label: '变更申请'
          },
          {
            label: '换章申请'
          }
        ]
      },
      {
        label: '智能用印',
        type: '2',
        children: [
          {
            label: 'xxx'
          },
          {
            label: 'xxx'
          },
          {
            label: 'xxx'
          }
        ]
      },
      {
        label: '智能印章盒',
        type: '2',
        children: [
          {
            label: 'xxx'
          },
          {
            label: 'xxx'
          },
          {
            label: 'xxx'
          }
        ]
      },
      {
        label: '智能印章柜',
        type: '2',
        children: [
          {
            label: 'xxx'
          },
          {
            label: 'xxx'
          },
          {
            label: 'xxx'
          }
        ]
      }
    ],

    componentsDocumentsDetails: {
      show: false,
      visible: [
        {
          label: '通知事件详情',
          name: 'Notification-Event-Details'
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
    if (column.property === '1') {
      state.componentsDocumentsDetails.show = true
    }
  }
  // 点击关闭
  function clickClose() {
    state.componentsDocumentsDetails.show = false
  }

  function tabChange(active) {
    activeName.value = active
  }
</script>

<style lang="scss" scoped>
  .message-center-event {
    .type {
      padding: 8px 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.06);
      margin-right: 24px;
      margin-bottom: 8px;
      margin-top: 8px;
      display: flex;
      align-items: center;
      img {
        margin-right: 12px;
      }
      span {
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        color: rgba(0, 0, 0, 0.85);
      }
    }
    .item {
      padding: 7px 28px;
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      color: rgba(0, 0, 0, 0.65);
      cursor: pointer;
      margin-right: 24px;
      border-radius: 2px;
      & .active,
      &:hover {
        background: #d0963e;
        color: #fff;
      }
    }
  }
</style>
