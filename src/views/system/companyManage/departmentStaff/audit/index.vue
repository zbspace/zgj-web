<template>
  <div>
    <componentsLayout Layout="title,searchForm,table,pagination,batch">
      <template #title>
        <div class="title">
          <div>邀请审核</div>
          <div class="title-more">
            <div class="title-more-add">
              <el-button type="primary" @click="showFormDialog = true">
                + 邀请注册
              </el-button>
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
          >
          </componentsSearchForm>
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
            placeholder: '姓名/账号/邀请人'
          }
        },
        {
          id: 'name',
          label: '部门',
          type: 'select',
          inCommonUse: true,
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '请选择'
          }
        },
        {
          id: 'name',
          label: '审核状态',
          type: 'select',
          inCommonUse: true,
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '请选择'
          }
        }
      ],
      butData: [
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
          width: 80,
          align: 'center'
        },
        {
          prop: '1',
          label: '姓名',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '2',
          label: '账号',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '3',
          label: '部门',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '4',
          label: '邀请人',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '5',
          label: '审核状态',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '6',
          label: '操作',
          rankDisplayData: [
            {
              name: '审核'
            }
          ]
        }
      ],
      data: [
        {
          0: 1,
          1: '小黄',
          2: '177777777',
          3: '往往',
          4: '小蓝',
          5: '待审核'
        },
        {
          0: 2,
          1: '小黄',
          2: '177777777',
          3: '往往',
          4: '小蓝',
          5: '待审核'
        },
        {
          0: 2,
          1: '小黄',
          2: '177777777',
          3: '往往',
          4: '小蓝',
          5: '待审核'
        },
        {
          0: 3,
          1: '小黄',
          2: '177777777',
          3: '往往',
          4: '小蓝',
          5: '待审核'
        },
        {
          0: 4,
          1: '小黄',
          2: '177777777',
          3: '往往',
          4: '小蓝',
          5: '待审核'
        },
        {
          0: 5,
          1: '小黄',
          2: '177777777',
          3: '往往',
          4: '小蓝',
          5: '待审核'
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
        layout: 'prev, pager, next, jumper',
        total: 500,
        'page-sizes': [10, 100, 200, 300, 400],
        background: true
      }
    }
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
