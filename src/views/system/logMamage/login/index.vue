<template>
  <div>
    <componentsLayout Layout="title,searchForm,table,pagination,tabs,batch">
      <template #title>
        <div class="title">登录日志</div>
      </template>

      <template #tabs>
        <div>
          <componentsTabs
            :activeName="state.activeName"
            :data="state.componentsTabs.data"
            @tabChange="tabChange"
          >
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
          <componentsBatch></componentsBatch>
        </div>
      </template>

      <template #table>
        <div>
          <componentsTable
            :defaultAttribute="state.componentsTable.defaultAttribute"
            :data="state.componentsTable.data"
            :header="state.componentsTable.header"
            :isSelection="true"
            v-if="state.activeName === '1'"
          >
          </componentsTable>

          <componentsTable
            :defaultAttribute="state.componentsErrorTable.defaultAttribute"
            :data="state.componentsErrorTable.data"
            :header="state.componentsErrorTable.header"
            :isSelection="true"
            v-if="state.activeName === '2'"
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
  import componentsTabs from '@/views/components/tabs.vue'
  import componentsBatch from '@/views/components/batch.vue'
  const state = reactive({
    componentsTabs: {
      data: [
        {
          label: '正常登录日志',
          name: '1'
        },
        {
          label: '异常登录日志',
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
            placeholder: '请输入'
          }
        },
        {
          id: 'picker',
          label: '登录时间',
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
          label: '设备类型',
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
          prop: '0',
          label: '序号',
          width: 60,
          align: 'center'
        },
        {
          prop: '1',
          label: '登录账号',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '2',
          label: '姓名',
          sortable: true,
          'min-width': 120
        },
        {
          prop: '3',
          label: '部门',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '4',
          label: 'IP地址',
          sortable: true,
          'min-width': 200
        },
        {
          prop: '5',
          label: '设备类型',
          sortable: true,
          'min-width': 180
        },
        {
          prop: '6',
          label: '设备',
          sortable: true,
          'min-width': 120
        },
        {
          prop: '7',
          label: '登陆时间',
          sortable: true,
          'min-width': 180
        },
        {
          prop: '8',
          label: '应用版本号',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '9',
          label: '登陆状态',
          sortable: true,
          'min-width': 110
        }
      ],
      data: [
        {
          0: 1,
          1: '15660799999',
          2: '肖世康',
          3: '建业科技',
          4: '10.0.14.88[未知IP地址]',
          5: 'Web/chrome/108.0.0.0',
          6: 'Web',
          7: '2022-12-30 16:41:32',
          8: 'v3.9.6',
          9: '登陆成功'
        },
        {
          0: 2,
          1: '1566079966666',
          2: '肖世康',
          3: '建业科技',
          4: '10.0.14.88[未知IP地址]',
          5: 'Web/chrome/108.0.0.0',
          6: 'Web',
          7: '2022-12-30 16:41:32',
          8: 'v3.9.3',
          9: '登陆成功'
        },
        {
          0: 3,
          1: '15660799889',
          2: '郭光林',
          3: '建业科技',
          4: '10.0.14.66',
          5: 'Web/chrome/108.0.0.0',
          6: 'Web',
          7: '2022-12-30 16:00:32',
          8: 'v3.9.5',
          9: '登陆成功'
        },
        {
          0: 4,
          1: '15660799999',
          2: '肖世康',
          3: '建业科技',
          4: '10.0.14.88[未知IP地址]',
          5: 'Web/chrome/108.0.0.0',
          6: 'Web',
          7: '2022-12-30 16:41:32',
          8: 'v3.9.6',
          9: '登陆成功'
        },
        {
          0: 5,
          1: '15660799999',
          2: '汤博',
          3: '建业科技',
          4: '10.0.14.89',
          5: 'Web/chrome/108.0.0.0',
          6: 'Web',
          7: '2022-12-30 16:41:32',
          8: 'v3.9.6',
          9: '登陆成功'
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

    componentsErrorTable: {
      header: [
        {
          prop: '0',
          label: '序号',
          width: 60,
          align: 'center'
        },
        {
          prop: '1',
          label: '登录账号',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '2',
          label: '姓名',
          sortable: true,
          'min-width': 120
        },
        {
          prop: '3',
          label: '部门',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '4',
          label: 'IP地址',
          sortable: true,
          'min-width': 200
        },
        {
          prop: '5',
          label: '设备类型',
          sortable: true,
          'min-width': 180
        },
        {
          prop: '6',
          label: '设备',
          sortable: true,
          'min-width': 120
        },
        {
          prop: '7',
          label: '登陆时间',
          sortable: true,
          'min-width': 180
        },
        {
          prop: '8',
          label: '异常现象',
          sortable: true,
          'min-width': 150
        }
      ],
      data: [
        {
          0: 1,
          1: '15660799999',
          2: '肖世康',
          3: '建业科技',
          4: '10.0.14.88[未知IP地址]',
          5: 'Web/chrome/108.0.0.0',
          6: 'Web',
          7: '2022-12-30 16:41:32',
          8: '登录失败'
        },
        {
          0: 2,
          1: '15660799999',
          2: '汤博',
          3: '建业科技',
          4: '10.0.14.88[未知IP地址]',
          5: 'Web/chrome/108.0.0.0',
          6: 'Web',
          7: '2022-12-30 16:41:32',
          8: '登录失败'
        },
        {
          0: 3,
          1: '15660799999',
          2: '周斌',
          3: '建业科技',
          4: '10.0.14.66',
          5: 'Web/chrome/108.0.0.0',
          6: 'Web',
          7: '2022-12-30 16:41:32',
          8: '登录失败'
        },
        {
          0: 4,
          1: '15660799999',
          2: '肖世康',
          3: '建业科技',
          4: '10.0.14.88[未知IP地址]',
          5: 'Web/chrome/108.0.0.0',
          6: 'Web',
          7: '2022-12-30 16:41:32',
          8: '登录失败'
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
    },
    activeName: '1'
  })

  const tabChange = val => {
    state.activeName = val
  }
</script>

<style lang="scss" scoped></style>
