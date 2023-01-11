<template>
  <div>
    <componentsLayout Layout="title,searchForm,table,pagination,tabs,batch">
      <template #title>
        <div class="title">
          <div>固件版本管理</div>
          <div>
            <el-button type="primary">+ 新建</el-button>
          </div>
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
          <el-button
            :disabled="state.componentsBatch.selectionData.length == 0"
            v-for="(item, index) in state.componentsBatch.data"
            :key="index"
            >{{ item.name }}
          </el-button>
          <componentsBatch></componentsBatch>
        </div>
      </template>

      <template #table>
        <div>
          <componentsTable
            :defaultAttribute="state.componentsTable.defaultAttribute"
            :data="state.componentsTable.data"
            :header="state.componentsTable.header"
            @selection-change="selectionChange"
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
  import componentsBatch from '@/views/components/batch.vue'
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
            placeholder: '请输入'
          }
        },
        {
          id: 'name',
          label: '强制升级',
          type: 'select',
          inCommonUse: true,
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '请选择'
          },
          options: []
        },
        {
          id: 'picker',
          label: '创建时间',
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
          id: 'name2',
          label: '状态',
          type: 'select',
          inCommonUse: true,
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '请选择'
          },
          options: []
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
          align: 'center'
        },
        {
          prop: '0',
          label: '序号',
          width: 60,
          align: 'center'
        },
        {
          prop: '1',
          label: '固件版本号',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '2',
          label: '固件版本号',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '3',
          label: '状态',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '4',
          label: '可升级的固件版本号',
          sortable: true,
          'min-width': 220
        },
        {
          prop: '5',
          label: '是否强制',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '6',
          label: '创建人',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '7',
          label: '创建时间',
          sortable: true,
          'min-width': 180
        },
        {
          prop: '8',
          label: '版本说明',
          sortable: true,
          'min-width': 180
        },
        {
          prop: 'caozuo',
          label: '操作',
          fixed: 'right',
          'min-width': 170,
          rankDisplayData: [
            {
              name: '修改'
            },
            {
              name: '删除'
            },
            {
              name: '固件下载'
            }
          ]
        }
      ],
      data: [
        {
          0: 1,
          1: 'V1.0.9',
          2: '1.0.3',
          3: '启用',
          4: '1.0.3',
          5: '是',
          6: '岳海涛',
          7: '2021-04-13 11:30:14',
          8: '说明内容'
        },
        {
          0: 2,
          1: 'V1.1.9',
          2: '1.0.3',
          3: '启用',
          4: '1.0.3',
          5: '否',
          6: '岳海涛',
          7: '2021-04-13 11:00:14',
          8: '说明内容'
        },
        {
          0: 3,
          1: 'V1.0.9',
          2: '1.0.3',
          3: '启用',
          4: '1.0.3',
          5: '是',
          6: '岳海涛',
          7: '2021-04-13 11:30:14',
          8: '说明内容'
        },
        {
          0: 4,
          1: 'V1.0.9',
          2: '1.0.3',
          3: '启用',
          4: '1.0.3',
          5: '是',
          6: '岳海涛',
          7: '2021-04-13 11:30:14',
          8: '说明内容'
        },
        {
          0: 5,
          1: 'V1.0.9',
          2: '1.0.3',
          3: '启用',
          4: '1.0.3',
          5: '是',
          6: '岳海涛',
          7: '2021-04-13 11:30:14',
          8: '说明内容'
        },
        {
          0: 6,
          1: 'V1.0.9',
          2: '1.0.3',
          3: '启用',
          4: '1.0.3',
          5: '是',
          6: '岳海涛',
          7: '2021-04-13 11:30:14',
          8: '说明内容'
        },
        {
          0: 7,
          1: 'V1.0.9',
          2: '1.0.3',
          3: '启用',
          4: '1.0.3',
          5: '是',
          6: '岳海涛',
          7: '2021-04-13 11:30:14',
          8: '说明内容'
        },
        {
          0: 8,
          1: 'V1.0.9',
          2: '1.0.3',
          3: '启用',
          4: '1.0.3',
          5: '是',
          6: '岳海涛',
          7: '2021-04-13 11:30:14',
          8: '说明内容'
        }
      ],
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        stripe: true,
        'header-cell-style': {
          background: 'var(--color-fill--3)'
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
        layout: 'sizes, prev, pager, next, jumper',
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
    },
    componentsBatch: {
      selectionData: [],
      data: [
        {
          name: '批量删除'
        }
      ]
    }
  })

  // 当选择项发生变化时会触发该事件
  function selectionChange(selection) {
    //    console.log(selection);
    state.componentsBatch.selectionData = selection
  }
</script>

<style lang="scss" scoped>
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
