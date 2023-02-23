<!-- 处理任务 -->
<template>
  <div class="PrintControlManagement-handleTask">
    <componentsLayout Layout="title,tabs,searchForm,table,pagination,batch">
      <template #title>
        <div class="title">
          <div>处理任务</div>
          <div class="title-more">
            <div class="title-more-add">
              <el-button type="primary">导出台账</el-button>
            </div>
          </div>
        </div>
      </template>
      <template #tabs>
        <div>
          <componentsTabs
            activeName="1"
            :data="state.componentsTabs.data"
            @tab-change="tabChange"
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
            @clickElement="clickElement"
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
            @cellClick="cellClick"
            @custom-click="customClick"
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
    <!-- 处理弹窗 -->
    <KDialog
      @update:show="dialogProcess.show = $event"
      :show="dialogProcess.show"
      :title="dialogProcess.title"
      :oneBtn="false"
      :confirmText="$t('t-zgj-operation.submit')"
      :concelText="$t('t-zgj-operation.cancel')"
      @close="submitLibraryForm"
    >
      <v-form-render
        :form-json="dialogProcess.formJson"
        :form-data="dialogProcess.formJson"
        :option-data="dialogProcess.optionData"
        ref="vFormLibraryRef"
        :key="dialogProcess.title"
      >
      </v-form-render>
      <div class="select-person">
        <span>添加抄送</span>
        <div @click="showDepPerDialog = true">+请选择抄送人</div>
      </div>
    </KDialog>
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
  import { ref, reactive, onBeforeMount, onMounted } from 'vue'
  import componentsTable from '../../components/table'
  import componentsSearchForm from '../../components/searchForm'
  import componentsTree from '../../components/tree'
  import componentsBreadcrumb from '../../components/breadcrumb'
  import componentsPagination from '../../components/pagination.vue'
  import componentsTabs from '../../components/tabs.vue'
  import componentsLayout from '../../components/Layout.vue'
  import componentsBatch from '@/views/components/batch.vue'
  import componentsDocumentsDetails from '../../components/documentsDetails.vue'
  import KDialog from '@/views/components/modules/kdialog.vue'
  import RecordSealToReviewJson from '@/views/addDynamicFormJson/RecordSealToReview.json'
  import ApprovalJson from '@/views/addDynamicFormJson/Approval.json'
  import kDepartOrPersonVue from '../../components/modules/kDepartOrPerson.vue'
  const props = defineProps({
    // 处理类型
    type: {
      type: String,
      default: '0'
    }
  })
  const emit = defineEmits([])

  const showDepPerDialog = ref(false)
  const dialogProcess = reactive({
    show: false,
    title: '处理',
    formJson: RecordSealToReviewJson
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
          label: '待处理',
          name: '1'
        },
        {
          label: '已处理',
          name: '2'
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
            placeholder: '流程主题/申请人/编码'
          }
        },
        {
          id: 'picker',
          label: '任务生成时间',
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
          id: 'derivable',
          label: '单据申请部门',
          type: 'derivable',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '+选择部门'
          }
        },
        {
          id: 'wjlx',
          label: '任务类型',
          type: 'select',
          options: [
            {
              label: '任务类型1',
              value: '1'
            },
            {
              label: '任务类型2',
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
          prop: '0',
          label: '序号',
          width: 60
        },
        {
          prop: '1',
          label: '任务单据名称',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '2',
          label: '任务类型',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '3',
          label: '单据申请人',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '4',
          label: '单据申请部门',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '5',
          label: '任务生成时间',
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
            },
            {
              name: '审批'
            }
          ]
        }
      ],
      data: [
        {
          1: 'TradeCode21',
          2: '用印复核',
          3: '往往',
          4: '',
          5: '2022/10/30',
          6: ''
        },
        {
          1: 'TradeCode21',
          2: '远程盖章',
          3: '往往',
          4: '',
          5: '2022/10/30',
          6: ''
        },
        {
          1: 'TradeCode21',
          2: '远程盖章',
          3: '往往',
          4: '',
          5: '2022/10/30',
          6: ''
        },
        {
          1: 'TradeCode21',
          2: '远程盖章',
          3: '往往',
          4: '',
          5: '2022/10/30',
          6: ''
        },
        {
          1: 'TradeCode21',
          2: '远程盖章',
          3: '往往',
          4: '',
          5: '2022/10/30',
          6: ''
        },
        {
          1: 'TradeCode21',
          2: '远程盖章',
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
          label: 'Level one 1',
          children: [
            {
              label: 'Level two 1-1',
              children: [
                {
                  label: 'Level three 1-1-1'
                }
              ]
            }
          ]
        },
        {
          label: 'Level one 2',
          children: [
            {
              label: 'Level two 2-1',
              children: [
                {
                  label: 'Level three 2-1-1'
                }
              ]
            },
            {
              label: 'Level two 2-2',
              children: [
                {
                  label: 'Level three 2-2-1'
                }
              ]
            }
          ]
        },
        {
          label: 'Level one 3',
          children: [
            {
              label: 'Level two 3-1',
              children: [
                {
                  label: 'Level three 3-1-1'
                }
              ]
            },
            {
              label: 'Level two 3-2',
              children: [
                {
                  label: 'Level three 3-2-1'
                }
              ]
            }
          ]
        }
      ],
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        'check-on-click-node': true,
        'show-checkbox': true,
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
    }
  })

  // 切换分页
  function tabChange(activeName) {
    // console.log(activeName);
    if (activeName == '1') {
      state.componentsTable.header = [
        {
          prop: '0',
          label: '序号',
          width: 60
        },
        {
          prop: '1',
          label: '任务单据名称',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '2',
          label: '任务类型',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '3',
          label: '单据申请人',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '4',
          label: '单据申请部门',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '5',
          label: '任务生成时间',
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
      ]
      state.componentsTable.data = [
        {
          1: 'TradeCode21',
          2: '用印复核',
          3: '往往',
          4: '',
          5: '2022/10/30',
          6: ''
        },
        {
          1: 'TradeCode21',
          2: '远程盖章',
          3: '往往',
          4: '',
          5: '2022/10/30',
          6: ''
        },
        {
          1: 'TradeCode21',
          2: '远程盖章',
          3: '往往',
          4: '',
          5: '2022/10/30',
          6: ''
        },
        {
          1: 'TradeCode21',
          2: '远程盖章',
          3: '往往',
          4: '',
          5: '2022/10/30',
          6: ''
        },
        {
          1: 'TradeCode21',
          2: '远程盖章',
          3: '往往',
          4: '',
          5: '2022/10/30',
          6: ''
        },
        {
          1: 'TradeCode21',
          2: '远程盖章',
          3: '往往',
          4: '',
          5: '2022/10/30',
          6: ''
        }
      ]
    } else if (activeName == '2') {
      state.componentsTable.header = [
        {
          prop: '0',
          label: '序号',
          width: 60
        },
        {
          prop: '1',
          label: '任务单据名称',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '2',
          label: '任务类型',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '3',
          label: '单据申请人',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '4',
          label: '单据申请部门',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '5',
          label: '任务生成时间',
          sortable: true,
          'min-width': 150
        }
      ]
      state.componentsTable.data = [
        {
          1: 'TradeCode21',
          2: '用印复核',
          3: '往往',
          4: '',
          5: '2022/10/30',
          6: ''
        },
        {
          1: 'TradeCode21',
          2: '远程盖章',
          3: '往往',
          4: '',
          5: '2022/10/30',
          6: ''
        },
        {
          1: 'TradeCode21',
          2: '远程盖章',
          3: '往往',
          4: '',
          5: '2022/10/30',
          6: ''
        },
        {
          1: 'TradeCode21',
          2: '远程盖章',
          3: '往往',
          4: '',
          5: '2022/10/30',
          6: ''
        },
        {
          1: 'TradeCode21',
          2: '远程盖章',
          3: '往往',
          4: '',
          5: '2022/10/30',
          6: ''
        },
        {
          1: 'TradeCode21',
          2: '远程盖章',
          3: '往往',
          4: '',
          5: '2022/10/30',
          6: ''
        }
      ]
    }
  }
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
    dialogProcess.show = true
    dialogProcess.title = cell.name
    if (cell.name === '处理') {
      dialogProcess.formJson = RecordSealToReviewJson
    }
    if (cell.name === '审批') {
      dialogProcess.formJson = ApprovalJson
    }
  }

  // 点击搜索表单
  function clickElement(item, index) {
    // console.log(item, index)
    if (item.type === 'derivable') {
      showDepPerDialog.value = true
    }
  }

  onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
  })
  onMounted(() => {
    // console.log(`the component is now mounted.`)
  })
</script>
<style lang="scss" scoped>
  .PrintControlManagement-handleTask {
    margin: 0%;

    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  .select-person {
    display: flex;
    align-items: center;
    > span {
      font-size: 14px;
      font-weight: bold;
      margin-right: 20px;
    }
    > div {
      cursor: pointer;
    }
  }
</style>
