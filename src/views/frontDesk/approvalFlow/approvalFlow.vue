<!-- 审批流程 -->
<template>
  <div class="approvalFlow-approvalFlow">
    <componentsLayout Layout="title,tabs,searchForm,table,pagination,batch">
      <template #title>
        <div class="title">
          <div> 审批流程 </div>
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
          <componentsBatch
            :data="state.componentsBatch.data"
            :defaultAttribute="state.componentsBatch.defaultAttribute"
          >
          </componentsBatch>
        </div>
      </template>
      <template #table>
        <div>
          <componentsTable
            :defaultAttribute="state.componentsTable.defaultAttribute"
            :data="state.componentsTable.data"
            :header="state.componentsTable.header"
            isSelection
            @selection-change="selectionChange"
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
  import {
    ref,
    reactive,
    // defineProps,
    // defineEmits,
    onBeforeMount,
    onMounted
  } from 'vue'
  import componentsTable from '../../components/table'
  import componentsSearchForm from '../../components/searchForm'
  // import componentsTree from '../../components/tree'
  // import componentsBreadcrumb from '../../components/breadcrumb'
  import componentsPagination from '../../components/pagination.vue'
  import componentsTabs from '../../components/tabs.vue'
  import componentsLayout from '../../components/Layout.vue'
  import componentsBatch from '@/views/components/batch.vue'
  import KDialog from '@/views/components/modules/kdialog.vue'
  import RecordSealToReviewJson from '@/views/addDynamicFormJson/RecordSealToReview.json'
  import ApprovalJson from '@/views/addDynamicFormJson/Approval.json'
  import kDepartOrPersonVue from '../../components/modules/kDepartOrPerson.vue'
  // const props = defineProps({
  //   // 处理类型
  //   type: {
  //     type: String,
  //     default: '0'
  //   }
  // })
  // const emit = defineEmits([])

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
        // fromState.showDialog = false
      })
      .catch(error => {
        // Form Validation failed
        // ElMessage.error(error)
        console.log(error)
      })
  }

  const state = reactive({
    componentsTabs: {
      data: [
        {
          label: '待审批',
          name: '1'
        },
        {
          label: '已审批',
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
          label: '申请时间',
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
          label: '申请部门',
          type: 'derivable',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '+选择部门'
          }
        },
        {
          id: 'wjlx',
          label: '流程类型',
          type: 'select',
          options: [
            {
              label: '用印申请',
              value: '1'
            },
            {
              label: '刻章申请',
              value: '2'
            },
            {
              label: '销毁申请',
              value: '3'
            },
            {
              label: '停用申请',
              value: '4'
            },
            {
              label: '变更申请',
              value: '5'
            },
            {
              label: '启用申请',
              value: '6'
            }
          ]
        },
        {
          id: 'derivable',
          label: '往来单位',
          type: 'derivable',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '+往来单位'
          }
        },
        {
          id: 'derivable',
          label: '印章名称',
          type: 'derivable',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '+选择印章'
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
          prop: '1',
          label: '流程名称',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '2',
          label: '流程类型',
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
          'min-width': 150
        },
        {
          prop: 'caozuo',
          label: '操作',
          fixed: 'right',
          'min-width': 150,
          rankDisplayData: [
            {
              name: '审批'
            }
          ]
        }
      ],
      data: [
        {
          1: 'TradeCode21',
          2: '',
          3: '往往',
          4: '',
          5: '2022/10/30  15:00:00',
          6: ''
        },
        {
          1: 'TradeCode21',
          2: '',
          3: '往往',
          4: '',
          5: '2022/10/30  15:00:00',
          6: ''
        },
        {
          1: 'TradeCode21',
          2: '',
          3: '往往',
          4: '',
          5: '2022/10/30  15:00:00',
          6: ''
        },
        {
          1: 'TradeCode21',
          2: '',
          3: '往往',
          4: '',
          5: '2022/10/30  15:00:00',
          6: ''
        },
        {
          1: 'TradeCode21',
          2: '',
          3: '往往',
          4: '',
          5: '2022/10/30  15:00:00',
          6: ''
        },
        {
          1: 'TradeCode21',
          2: '',
          3: '往往',
          4: '',
          5: '2022/10/30  15:00:00',
          6: ''
        },
        {
          1: 'TradeCode21',
          2: '',
          3: '往往',
          4: '',
          5: '2022/10/30  15:00:00',
          6: ''
        },
        {
          1: 'TradeCode21',
          2: '',
          3: '往往',
          4: '',
          5: '2022/10/30  15:00:00',
          6: ''
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
    componentsBatch: {
      selectionData: [],
      defaultAttribute: {
        disabled: true
      },
      data: []
    }
  })

  // 切换分页
  function tabChange(activeName) {
    // console.log(activeName);
    if (activeName === '1') {
      state.componentsTable.header = [
        {
          prop: '1',
          label: '流程名称',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '2',
          label: '流程类型',
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
          'min-width': 150
        },
        {
          prop: 'caozuo',
          label: '操作',
          fixed: 'right',
          'min-width': 150,
          rankDisplayData: [
            {
              name: '审批'
            }
          ]
        }
      ]
      state.componentsTable.data = [
        {
          1: 'TradeCode21',
          2: '',
          3: '往往',
          4: '',
          5: '2022/10/30  15:00:00',
          6: ''
        },
        {
          1: 'TradeCode21',
          2: '',
          3: '往往',
          4: '',
          5: '2022/10/30  15:00:00',
          6: ''
        },
        {
          1: 'TradeCode21',
          2: '',
          3: '往往',
          4: '',
          5: '2022/10/30  15:00:00',
          6: ''
        },
        {
          1: 'TradeCode21',
          2: '',
          3: '往往',
          4: '',
          5: '2022/10/30  15:00:00',
          6: ''
        },
        {
          1: 'TradeCode21',
          2: '',
          3: '往往',
          4: '',
          5: '2022/10/30  15:00:00',
          6: ''
        },
        {
          1: 'TradeCode21',
          2: '',
          3: '往往',
          4: '',
          5: '2022/10/30  15:00:00',
          6: ''
        },
        {
          1: 'TradeCode21',
          2: '',
          3: '往往',
          4: '',
          5: '2022/10/30  15:00:00',
          6: ''
        },
        {
          1: 'TradeCode21',
          2: '',
          3: '往往',
          4: '',
          5: '2022/10/30  15:00:00',
          6: ''
        }
      ]
    } else if (activeName === '2') {
      state.componentsTable.header = [
        {
          prop: '1',
          label: '流程名称',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '2',
          label: '流程类型',
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
          'min-width': 150
        },
        {
          prop: '6',
          label: '审批时间',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '7',
          label: '审批状态',
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
              name: '重批'
            }
          ]
        }
      ]
      state.componentsTable.data = [
        {
          1: 'TradeCode21',
          2: '',
          3: '往往',
          4: '',
          5: '2022/10/30  15:00:00',
          6: '2022/10/30  15:00:00',
          7: ''
        },
        {
          1: 'TradeCode21',
          2: '',
          3: '往往',
          4: '',
          5: '2022/10/30  15:00:00',
          6: '2022/10/30  15:00:00'
        },
        {
          1: 'TradeCode21',
          2: '',
          3: '往往',
          4: '',
          5: '2022/10/30  15:00:00',
          6: '2022/10/30  15:00:00'
        },
        {
          1: 'TradeCode21',
          2: '',
          3: '往往',
          4: '',
          5: '2022/10/30  15:00:00',
          6: '2022/10/30  15:00:00'
        },
        {
          1: 'TradeCode21',
          2: '',
          3: '往往',
          4: '',
          5: '2022/10/30  15:00:00',
          6: '2022/10/30  15:00:00'
        },
        {
          1: 'TradeCode21',
          2: '',
          3: '往往',
          4: '',
          5: '2022/10/30  15:00:00',
          6: '2022/10/30  15:00:00'
        },
        {
          1: 'TradeCode21',
          2: '',
          3: '往往',
          4: '',
          5: '2022/10/30  15:00:00',
          6: '2022/10/30  15:00:00'
        },
        {
          1: 'TradeCode21',
          2: '',
          3: '往往',
          4: '',
          5: '2022/10/30  15:00:00',
          6: '2022/10/30  15:00:00'
        }
      ]
    }

    // 查询条件
    if (activeName === '1') {
      state.componentsSearchForm.data = [
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
          label: '申请时间',
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
          label: '申请部门',
          type: 'derivable',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '+选择部门'
          }
        },
        {
          id: 'wjlx',
          label: '流程类型',
          type: 'select',
          options: [
            {
              label: '用印申请',
              value: '1'
            },
            {
              label: '刻章申请',
              value: '2'
            },
            {
              label: '销毁申请',
              value: '3'
            },
            {
              label: '停用申请',
              value: '4'
            },
            {
              label: '变更申请',
              value: '5'
            },
            {
              label: '启用申请',
              value: '6'
            }
          ]
        },
        {
          id: 'derivable',
          label: '往来单位',
          type: 'derivable',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '+往来单位'
          }
        },
        {
          id: 'derivable',
          label: '印章名称',
          type: 'derivable',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '+选择印章'
          }
        }
      ]
    } else if (activeName === '2') {
      state.componentsSearchForm.data = [
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
          label: '申请时间',
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
          label: '审批状态',
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
          id: 'derivable',
          label: '申请部门',
          type: 'derivable',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '+选择部门'
          }
        },
        {
          id: 'wjlx',
          label: '流程类型',
          type: 'select',
          options: [
            {
              label: '用印申请',
              value: '1'
            },
            {
              label: '刻章申请',
              value: '2'
            },
            {
              label: '销毁申请',
              value: '3'
            },
            {
              label: '停用申请',
              value: '4'
            },
            {
              label: '变更申请',
              value: '5'
            },
            {
              label: '启用申请',
              value: '6'
            }
          ]
        },
        {
          id: 'derivable',
          label: '往来单位',
          type: 'derivable',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '+往来单位'
          }
        },
        {
          id: 'derivable',
          label: '印章名称',
          type: 'derivable',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '+选择印章'
          }
        }
      ]
    }
  }

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
  .approvalFlow-approvalFlow {
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
