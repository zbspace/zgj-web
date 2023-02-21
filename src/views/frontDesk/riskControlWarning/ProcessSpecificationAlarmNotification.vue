<!-- 流程规范告警提醒 -->
<template>
  <div class="PrintControlManagement-ProcessSpecificationAlarmNotification">
    <componentsLayout Layout="title,searchForm,table,pagination,batch">
      <template #title>
        <div class="title">
          <div>流程规范告警提醒</div>
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
          <componentsBatch> </componentsBatch>
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
      <template #table>
        <div>
          <componentsTable
            :defaultAttribute="state.componentsTable.defaultAttribute"
            :data="state.componentsTable.data"
            :header="state.componentsTable.header"
            :isSelection="true"
            @cellClick="cellClick"
            @custom-click="customClick"
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
    <!-- 单据详情 -->
    <div class="ap-box">
      <componentsDocumentsDetails
        :show="state.componentsDocumentsDetails.show"
        :visible="state.componentsDocumentsDetails.visible"
        @clickClose="clickClose"
      >
      </componentsDocumentsDetails>
    </div>
    <!-- 动态表单 - 处理 -->
    <KDialog
      @update:show="fromState.show = $event"
      :show="fromState.show"
      :title="fromState.title"
      :centerBtn="true"
      :confirmText="$t('t-zgj-operation.submit')"
      :concelText="$t('t-zgj-operation.cancel')"
      :width="1000"
      :height="600"
      @close="submitLibraryForm"
      :key="fromState.title"
    >
      <v-form-render
        :form-json="fromState.formJson"
        :form-data="fromState.formJson"
        :option-data="fromState.optionData"
        ref="vFormLibraryRef"
      >
      </v-form-render>
    </KDialog>
  </div>
</template>
<script setup>
  import {
    ref,
    reactive,
    defineProps,
    defineEmits,
    onBeforeMount,
    onMounted
  } from 'vue'
  import componentsTable from '../../components/table'
  import componentsSearchForm from '../../components/searchForm'
  import componentsTree from '../../components/tree'
  import componentsBreadcrumb from '../../components/breadcrumb'
  import componentsPagination from '../../components/pagination.vue'
  import componentsTabs from '../../components/tabs.vue'
  import componentsLayout from '../../components/Layout.vue'
  import componentsBatch from '@/views/components/batch.vue'
  import componentsDocumentsDetails from '../../components/documentsDetails.vue'
  import WarningOperateJson from '@/views/addDynamicFormJson/WarningOperate.json'
  import KDialog from '@/views/components/modules/kdialog.vue'
  const props = defineProps({
    // 处理类型
    type: {
      type: String,
      default: '0'
    }
  })
  const emit = defineEmits([])

  const fromState = reactive({
    show: false,
    title: '处理',
    formJson: WarningOperateJson
  })
  const vFormLibraryRef = ref(null)

  const submitLibraryForm = type => {
    if (!type) {
      vFormLibraryRef.value.resetForm()
      return
    }
    vFormLibraryRef.value
      .getFormData()
      .then(formData => {
        alert(JSON.stringify(formData))
        fromState.showDialog = false
      })
      .catch(error => {
        // Form Validation failed
        ElMessage.error(error)
      })
  }
  const state = reactive({
    componentsTabs: {
      data: [
        {
          label: '待签章',
          name: '1'
        },
        {
          label: '已签章',
          name: '2'
        },
        {
          label: '不可用',
          name: '3'
        }
      ]
    },
    componentsSearchForm: {
      style: {
        lineStyle: {
          width: 'calc(100% / 3)'
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
            placeholder: '文件名称/申请人/报警信息'
          }
        },
        {
          id: 'picker',
          label: '操作时间',
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
          id: 'wjlx',
          label: '印章名称',
          type: 'select',
          options: [
            {
              label: '印章名称1',
              value: '1'
            },
            {
              label: '印章名称2',
              value: '2'
            }
          ]
        },
        {
          id: 'wjlx',
          label: '告警风险项',
          type: 'select',
          options: [
            {
              label: '告警风险项1',
              value: '1'
            },
            {
              label: '告警风险项2',
              value: '2'
            }
          ]
        },
        {
          id: 'wjlx',
          label: '处理状态',
          type: 'select',
          options: [
            {
              label: '状态1',
              value: '1'
            },
            {
              label: '状态2',
              value: '2'
            }
          ]
        },
        {
          id: 'wjlx',
          label: '处理意见',
          type: 'select',
          options: [
            {
              label: '意见1',
              value: '1'
            },
            {
              label: '意见2',
              value: '2'
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
          width: 60
        },
        {
          prop: '1',
          label: '用印单据名称',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '2',
          label: '文件类型',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '3',
          label: '申请人',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '4',
          label: '申请部门',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '5',
          label: '申请时间',
          sortable: true,
          'min-width': 180
        },
        {
          prop: '6',
          label: '操作时间',
          sortable: true,
          'min-width': 180
        },
        {
          prop: '7',
          label: '未用印时长',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '8',
          label: '处理状态',
          sortable: true,
          'min-width': 150
        },
        {
          prop: 'caozuo',
          label: '操作',
          fixed: 'right',
          'min-width': 150,
          rankDisplayData: [
            {
              name: '处理'
            }
          ]
        }
      ],
      data: [
        {
          1: '测试单据名称1',
          2: '',
          3: '往往',
          4: '',
          5: '2022/10/30  15:00:00',
          6: '2022/10/30  15:00:00',
          7: '',
          8: ''
        },
        {
          1: '测试单据名称2',
          2: '',
          3: '往往',
          4: '',
          5: '2022/10/30  15:00:00',
          6: '2022/10/30  15:00:00',
          7: '',
          8: ''
        },
        {
          1: '测试单据名称1',
          2: '',
          3: '往往',
          4: '',
          5: '2022/10/30  15:00:00',
          6: '2022/10/30  15:00:00',
          7: '',
          8: ''
        },
        {
          1: '测试单据名称1',
          2: '',
          3: '往往',
          4: '',
          5: '2022/10/30  15:00:00',
          6: '2022/10/30  15:00:00',
          7: '',
          8: ''
        },
        {
          1: '测试单据名称1',
          2: '',
          3: '往往',
          4: '',
          5: '2022/10/30  15:00:00',
          6: '2022/10/30  15:00:00',
          7: '',
          8: ''
        },
        {
          1: '测试单据名称1',
          2: '',
          3: '往往',
          4: '',
          5: '2022/10/30  15:00:00',
          6: '2022/10/30  15:00:00',
          7: '',
          8: ''
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
          if (column.property == '1') {
            return {
              color: 'var(--jy-info-6)',
              cursor: 'pointer'
            }
          }
        }
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
    componentsBreadcrumb: {
      data: [
        {
          name: 'ceshi'
        },
        {
          name: 'ceshi'
        }
      ],
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        separator: '/'
      }
    },
    componentsDocumentsDetails: {
      show: false,
      visible: [
        {
          label: '用印详情',
          name: 'Details-of-Printing'
        },
        {
          label: '审批流程',
          name: 'approval-process'
        },
        {
          label: '领用记录',
          name: 'Record-of-requisition'
        },
        {
          label: '操作记录',
          name: 'operating-record'
        }
      ]
    },
    componentsBatch: {
      selectionData: [],
      data: [
        {
          name: '批量操作'
        }
      ]
    }
  })
  // 点击表格单元格
  function cellClick(row, column, cell, event) {
    // console.log(row, column, cell, event);
    if (column.property == '1') {
      state.componentsDocumentsDetails.show = true
    }
  }
  // 点击关闭详情
  function clickClose() {
    state.componentsDocumentsDetails.show = false
  }
  // 点击表格按钮
  function customClick(row, column, cell, event) {
    if (cell.name === '处理') {
      fromState.show = true
    }
  }

  // 当选择项发生变化时会触发该事件
  function selectionChange(selection) {
    //    console.log(selection);
    state.componentsBatch.selectionData = selection
  }

  onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
  })
  onMounted(() => {
    // console.log(`the component is now mounted.`)
  })
</script>
<style lang="scss" scoped>
  .PrintControlManagement-ProcessSpecificationAlarmNotification {
    margin: 0%;

    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .batch {
      display: flex;
      align-items: center;

      .batch-desc {
        @include mixin-margin-right(12);
      }
    }
  }
</style>
