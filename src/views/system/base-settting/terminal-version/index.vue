<template>
  <div>
    <componentsLayout Layout="title,searchForm,table,pagination,tabs,batch">
      <template #title>
        <div class="title">
          <div>终端版本管理</div>
          <div>
            <el-button type="primary">+ 新建</el-button>
            <el-button>
              <img
                class="button-icon"
                src="@/assets/svg/gengduo-caozuo.svg"
                alt=""
                srcset=""
              />
              <span>更多操作</span>
            </el-button>
          </div>
        </div>
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

      <template #batch>
        <div class="batch">
          <el-button>批量操作</el-button>
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
  import componentsPagination from '@/views/components/pagination'
  import componentsLayout from '@/views/components/Layout'
  import componentsTabs from '@/views/components/tabs'
  import componentsTree from '@/views/components/tree'

  const state = reactive({
    componentsTabs: {
      data: [
        {
          label: '工作台',
          name: '1'
        },
        {
          label: 'APP',
          name: '2'
        },
        {
          label: 'IOS',
          name: '3'
        },
        {
          label: '智能印章柜',
          name: '4'
        },
        {
          label: '智能印章盒',
          name: '5'
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
            placeholder: '请输入'
          }
        },
        {
          id: 'picker',
          label: '选择时间',
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
          label: 'xx',
          type: 'select',
          inCommonUse: true,
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '请选择'
          },
          options: [
            {
              value: 'Option1',
              label: 'Option1'
            },
            {
              value: 'Option2',
              label: 'Option2'
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
          type: 'selection'
        },
        {
          prop: '0',
          label: '序号',
          width: 100
        },
        {
          prop: '1',
          label: 'xxx',
          sortable: true,
          'min-width': 150
        }
      ],
      data: [
        {
          1: 'TradeCode21',
          2: '',
          3: '往往',
          4: '',
          5: '2022/10/30',
          6: ''
        },
        {
          1: 'TradeCode21',
          2: '',
          3: '往往',
          4: '',
          5: '2022/10/30',
          6: ''
        },
        {
          1: 'TradeCode21',
          2: '',
          3: '往往',
          4: '',
          5: '2022/10/30',
          6: ''
        },
        {
          1: 'TradeCode21',
          2: '',
          3: '往往',
          4: '',
          5: '2022/10/30',
          6: ''
        },
        {
          1: 'TradeCode21',
          2: '',
          3: '往往',
          4: '',
          5: '2022/10/30',
          6: ''
        },
        {
          1: 'TradeCode21',
          2: '',
          3: '往往',
          4: '',
          5: '2022/10/30',
          6: ''
        },
        {
          1: 'TradeCode21',
          2: '',
          3: '往往',
          4: '',
          5: '2022/10/30',
          6: ''
        },
        {
          1: 'TradeCode21',
          2: '',
          3: '往往',
          4: '',
          5: '2022/10/30',
          6: ''
        }
      ],
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        stripe: true,
        'header-cell-style': {
          background: 'var(--color-fill--1)'
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
        },
        {
          label: 'A层级菜单2',
          children: [
            {
              label: 'B层级菜单1',
              children: [
                {
                  label: 'C层级菜单1'
                }
              ]
            },
            {
              label: 'B层级菜单2',
              children: [
                {
                  label: 'C层级菜单1'
                }
              ]
            }
          ]
        },
        {
          label: 'A层级菜单3',
          children: [
            {
              label: 'B层级菜单1',
              children: [
                {
                  label: 'C层级菜单1'
                }
              ]
            },
            {
              label: 'B层级菜单2',
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
    }
  })
</script>

<style lang="scss" scoped>
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
