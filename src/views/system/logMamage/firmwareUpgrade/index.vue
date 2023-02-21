<template>
  <div>
    <componentsLayout Layout="title,searchForm,table,pagination,batch">
      <template #title>
        <div class="title">固件升级日志</div>
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
            placeholder: '请输入'
          }
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
          label: '印章名称',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '2',
          label: '印章MAC地址',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '3',
          label: '固件版本号',
          sortable: true,
          'min-width': 120
        },
        {
          prop: '4',
          label: '更新人',
          sortable: true,
          'min-width': 100
        },
        {
          prop: '5',
          label: '更新时间',
          sortable: true,
          'min-width': 180
        }
      ],
      data: [
        {
          0: 1,
          1: '王锡春测试章',
          2: '806FB012185A',
          3: 'V2.3.0',
          4: '易善林',
          5: '2022-12-09 13:56:46'
        },
        {
          0: 2,
          1: '建业测试章',
          2: '806FB012185B',
          3: 'V2.3.0',
          4: '易善林',
          5: '2022-12-09 13:56:46'
        },
        {
          0: 3,
          1: '王锡春测试章',
          2: '806FB012185A',
          3: 'V2.3.0',
          4: '易善林',
          5: '2022-03-09 13:56:46'
        },
        {
          0: 4,
          1: '技术部测试章',
          2: '806FB012185A',
          3: 'V2.3.1',
          4: '刘德华',
          5: '2021-12-09 13:00:46'
        },
        {
          0: 5,
          1: '王锡春测试章',
          2: '806FB012185A',
          3: 'V2.3.0',
          4: '易善林',
          5: '2022-12-09 13:56:00'
        },
        {
          0: 6,
          1: '王锡春测试章',
          2: '806FB012185A',
          3: 'V2.3.0',
          4: '易善林',
          5: '2022-12-09 13:56:46'
        },
        {
          0: 7,
          1: '建业测试章',
          2: '806FB012185A',
          3: 'V2.3.0',
          4: '刘德华',
          5: '2022-12-09 10:56:00'
        }
      ],
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        stripe: true,
        'header-cell-style': {
          background: 'var(--jy-color-fill--3)'
        }
      }
    },

    componentsPagination: {
      data: {
        amount: 30,
        index: 1,
        pageNumber: 6
      },
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        layout: 'prev, pager, next, jumper',
        total: 30,
        'page-sizes': [10, 100, 200, 300, 400],
        background: true
      }
    }
  })
</script>

<style lang="scss" scoped></style>
