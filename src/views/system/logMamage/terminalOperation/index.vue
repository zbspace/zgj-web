<template>
  <div>
    <componentsLayout Layout="title,tabs,searchForm,table,pagination,batch">
      <template #title>
        <div class="title">终端操作日志</div>
      </template>

      <template #tabs>
        <VTabs
          :active="activeName"
          :label="tabsLabel"
          @update:active="activeName = $event"
          style="margin-top: 12px"
        ></VTabs>
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
          <componentsBatch
            :data="state.componentsBatch.data"
            :defaultAttribute="state.componentsBatch.defaultAttribute"
          ></componentsBatch>
        </div>
      </template>
      <template #table>
        <div>
          <componentsTable
            :defaultAttribute="state.componentsWorkbenchTable.defaultAttribute"
            :data="state.componentsWorkbenchTable.data"
            :header="state.componentsWorkbenchTable.header"
            :isSelection="true"
            @selection-change="selectionChange"
            v-if="activeName === 'first'"
          >
          </componentsTable>

          <componentsTable
            :defaultAttribute="state.componentsSmartSealTable.defaultAttribute"
            :data="state.componentsSmartSealTable.data"
            :header="state.componentsSmartSealTable.header"
            :isSelection="true"
            @selection-change="selectionChange"
            v-if="activeName === 'second'"
          >
          </componentsTable>

          <componentsTable
            :defaultAttribute="
              state.componentsSmartSealBoxTable.defaultAttribute
            "
            :data="state.componentsSmartSealBoxTable.data"
            :header="state.componentsSmartSealBoxTable.header"
            :isSelection="true"
            @selection-change="selectionChange"
            v-if="activeName === 'third'"
          >
          </componentsTable>

          <componentsTable
            :defaultAttribute="
              state.componentsSmartSealCabinetTable.defaultAttribute
            "
            :data="state.componentsSmartSealCabinetTable.data"
            :header="state.componentsSmartSealCabinetTable.header"
            :isSelection="true"
            @selection-change="selectionChange"
            v-if="activeName === 'fourth'"
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
  import { ref, reactive } from 'vue'
  import componentsTable from '@/views/components/table'
  import componentsLayout from '@/views/components/Layout.vue'
  import componentsSearchForm from '@/views/components/searchForm'
  import componentsPagination from '@/views/components/pagination.vue'
  import VTabs from '@/components/modules/tabs.vue'
  import componentsBatch from '@/views/components/batch.vue'
  const activeName = ref('first')

  const tabsLabel = ref([
    {
      name: 't-zgj-logRecord.Workbench',
      value: 'first'
    },
    {
      name: 't-zgj-view.SmartSeal',
      value: 'second'
    },
    {
      name: 't-zgj-cg-menu-zhineng-yinzhang-he',
      value: 'third'
    },
    {
      name: 't-zgj-cg-menu-zhineng-yinzhang-gui',
      value: 'fourth'
    }
  ])

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
          label: '上报时间',
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
          label: '终端类型',
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

    componentsWorkbenchTable: {
      header: [
        {
          prop: '1',
          label: '日志名称',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '2',
          label: '终端类型',
          sortable: true,
          'min-width': 120
        },
        {
          prop: '3',
          label: '终端编码',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '4',
          label: '终端名称',
          sortable: true,
          'min-width': 200
        },
        {
          prop: '5',
          label: '终端版本',
          sortable: true,
          'min-width': 180
        },
        {
          prop: '6',
          label: '上报时间',
          sortable: true,
          'min-width': 180
        },
        {
          prop: 'caozuo',
          label: '操作',
          fixed: 'right',
          'min-width': 100,
          rankDisplayData: [
            {
              name: '下载日志'
            }
          ]
        }
      ],
      data: [
        {
          1: '1111',
          2: 'Web',
          3: '10123',
          4: '岳海涛测试',
          5: 'V1.0.0',
          6: '2022-12-30 16:41:32'
        },
        {
          1: '1111',
          2: 'Web',
          3: '10123',
          4: '建业测试',
          5: 'V1.0.6',
          6: '2022-12-30 16:41:32'
        },
        {
          1: '测试',
          2: 'Web',
          3: '10123',
          4: 'Walter',
          5: 'V3.0.2',
          6: '2022-12-30 16:41:32'
        },
        {
          1: '1111',
          2: 'PC',
          3: '2033',
          4: '张三测试',
          5: 'V1.8.0',
          6: '2022-12-30 16:41:32'
        },
        {
          1: '技术部测试',
          2: 'Web',
          3: '10123',
          4: '岳海涛测试',
          5: 'V1.0.0',
          6: '2022-12-30 16:41:32'
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

    componentsSmartSealTable: {
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
          label: '日志名称',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '2',
          label: '终端类型',
          sortable: true,
          'min-width': 120
        },
        {
          prop: '3',
          label: '终端编码',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '4',
          label: '终端名称',
          sortable: true,
          'min-width': 200
        },
        {
          prop: '5',
          label: '终端版本',
          sortable: true,
          'min-width': 180
        },
        {
          prop: '6',
          label: '上报时间',
          sortable: true,
          'min-width': 180
        },
        {
          prop: 'caozuo',
          label: '操作',
          fixed: 'right',
          'min-width': 100,
          rankDisplayData: [
            {
              name: '下载日志'
            }
          ]
        }
      ],
      data: [
        {
          0: 1,
          1: '1111',
          2: 'Web',
          3: '10123',
          4: '岳海涛测试',
          5: 'V1.0.0',
          6: '2022-12-30 16:41:32'
        },
        {
          0: 2,
          1: '测试1111',
          2: 'Web',
          3: '10123',
          4: '建业测试',
          5: 'V1.0.0',
          6: '2022-12-30 16:41:32'
        },
        {
          0: 3,
          1: '测试',
          2: 'Web',
          3: '10123',
          4: '岳海涛测试',
          5: 'V1.0.0',
          6: '2022-12-30 16:41:32'
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

    componentsSmartSealBoxTable: {
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
          label: '日志名称',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '2',
          label: '终端类型',
          sortable: true,
          'min-width': 120
        },
        {
          prop: '3',
          label: '终端编码',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '4',
          label: '终端名称',
          sortable: true,
          'min-width': 200
        },
        {
          prop: '5',
          label: '终端版本',
          sortable: true,
          'min-width': 180
        },
        {
          prop: '6',
          label: '上报时间',
          sortable: true,
          'min-width': 180
        },
        {
          prop: 'caozuo',
          label: '操作',
          fixed: 'right',
          'min-width': 100,
          rankDisplayData: [
            {
              name: '下载日志'
            }
          ]
        }
      ],
      data: [
        {
          0: 1,
          1: '1111',
          2: 'Web',
          3: '10123',
          4: '岳海涛测试',
          5: 'V1.0.0',
          6: '2022-12-30 16:41:32'
        },
        {
          0: 2,
          1: '测试1111',
          2: 'Web',
          3: '10123',
          4: '建业测试',
          5: 'V1.0.0',
          6: '2022-12-30 16:41:32'
        },
        {
          0: 3,
          1: '测试',
          2: 'Web',
          3: '10123',
          4: '岳海涛测试',
          5: 'V1.0.0',
          6: '2022-12-30 16:41:32'
        },
        {
          0: 4,
          1: '1111',
          2: 'Web',
          3: '10123',
          4: '岳海涛测试',
          5: 'V1.0.0',
          6: '2022-12-30 16:41:32'
        },
        {
          0: 5,
          1: '测试1111',
          2: 'Web',
          3: '10123',
          4: '建业测试',
          5: 'V1.0.0',
          6: '2022-12-30 16:41:32'
        },
        {
          0: 6,
          1: '测试',
          2: 'Web',
          3: '10123',
          4: '岳海涛测试',
          5: 'V1.0.0',
          6: '2022-12-30 16:41:32'
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

    componentsSmartSealCabinetTable: {
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
          label: '日志名称',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '2',
          label: '终端类型',
          sortable: true,
          'min-width': 120
        },
        {
          prop: '3',
          label: '终端编码',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '4',
          label: '终端名称',
          sortable: true,
          'min-width': 200
        },
        {
          prop: '5',
          label: '终端版本',
          sortable: true,
          'min-width': 180
        },
        {
          prop: '6',
          label: '上报时间',
          sortable: true,
          'min-width': 180
        },
        {
          prop: 'caozuo',
          label: '操作',
          fixed: 'right',
          'min-width': 100,
          rankDisplayData: [
            {
              name: '下载日志'
            }
          ]
        }
      ],
      data: [
        {
          0: 1,
          1: '1111',
          2: 'Web',
          3: '10123',
          4: '岳海涛测试',
          5: 'V1.0.0',
          6: '2022-12-30 16:41:32'
        },
        {
          0: 2,
          1: '测试1111',
          2: 'Web',
          3: '10123',
          4: '建业测试',
          5: 'V1.0.0',
          6: '2022-12-30 16:41:32'
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
        amount: 40,
        index: 1,
        pageNumber: 10
      },
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        layout: 'prev, pager, next, jumper',
        total: 40,
        'page-sizes': [10, 100, 200, 300, 400],
        background: true
      }
    },

    componentsBatch: {
      selectionData: [],
      defaultAttribute: {
        disabled: true
      },
      data: [
        {
          name: '批量下载'
        }
      ]
    }
  })

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
</script>

<style lang="scss" scoped></style>
