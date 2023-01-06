<template>
  <div>
    <componentsLayout Layout="title,searchForm,table,pagination">
      <template #title>
        <div class="title">系统操作日志</div>
      </template>

      <template #searchForm>
        <div>
          <componentsSearchForm
            :data="state.componentsSearchForm.data"
            :butData="state.componentsSearchForm.butData"
            :style="state.componentsSearchForm.style"
            @getSelectDepartInfo="showDepPerDialog = true"
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

    <!-- 人员选择  -->
    <kDepartOrPersonVue
      :show="showDepPerDialog"
      @update:show="showDepPerDialog = $event"
      v-if="showDepPerDialog"
    >
    </kDepartOrPersonVue>
  </div>
</template>

<script setup>
  import { reactive, ref } from 'vue'
  import componentsTable from '@/views/components/table'
  import componentsSearchForm from '@/views/components/searchForm'
  import componentsPagination from '@/views/components/pagination.vue'
  import componentsLayout from '@/views/components/Layout.vue'
  import kDepartOrPersonVue from '@/views/components/modules/kDepartOrPerson.vue'
  const showDepPerDialog = ref(false)
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
          label: '所属部门',
          type: 'derivable',
          inCommonUse: true,
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '请选择'
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
          prop: '0',
          label: '序号',
          width: 80,
          align: 'center'
        },
        {
          prop: '1',
          label: '操作人',
          sortable: true,
          'min-width': 120
        },
        {
          prop: '2',
          label: '所属部门',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '3',
          label: '操作时间',
          sortable: true,
          'min-width': 180
        },
        {
          prop: '4',
          label: '操作页面',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '5',
          label: '操作说明',
          sortable: true,
          'min-width': 180
        }
      ],
      data: [
        {
          0: 1,
          1: '郭光林',
          2: '软件部',
          3: '2023-01-05 13:57:17',
          4: '权限',
          5: '角色授权：二级管理员'
        },
        {
          0: 2,
          1: '郭光林',
          2: '建业科技',
          3: '2023-01-05 13:57:17',
          4: '权限',
          5: '角色授权：二级管理员'
        },
        {
          0: 3,
          1: '郭光林',
          2: '建业科技',
          3: '2023-01-05 13:57:17',
          4: '用印申请',
          5: '新增用印申请：010501'
        },
        {
          0: 4,
          1: '李慧斌',
          2: '软件部',
          3: '2023-01-05 13:57:17',
          4: '权限',
          5: '角色授权：二级管理员'
        },
        {
          0: 5,
          1: '郭光林',
          2: '产品研发中心',
          3: '2023-01-05 13:57:17',
          4: '用印申请',
          5: '新增用印申请：010501'
        },
        {
          0: 6,
          1: '李慧斌',
          2: '软件部',
          3: '2023-01-05 13:57:17',
          4: '权限',
          5: '角色授权：二级管理员'
        },
        {
          0: 7,
          1: '李慧斌',
          2: '软件部',
          3: '2023-01-05 13:57:17',
          4: '权限',
          5: '角色授权：二级管理员'
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
    }
  })
</script>

<style lang="scss" scoped></style>
