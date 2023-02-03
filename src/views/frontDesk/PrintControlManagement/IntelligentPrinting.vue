<!-- 智能用印 -->
<template>
  <div class="PrintControlManagement-IntelligentPrinting">
    <componentsLayout Layout="title,tabs,searchForm,table,pagination,batch">
      <template #title>
        <div class="title">
          <div>智能用印</div>
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
            @clickBatchButton="clickBatchButton"
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
    <!-- 人员选择  -->
    <kDepartOrPersonVue
      :show="showDepPerDialog"
      @update:show="showDepPerDialog = $event"
      v-if="showDepPerDialog"
    >
    </kDepartOrPersonVue>
    <JyElMessageBox :show="true" :defaultAttribute="{}">
      <template #header>
        <div class="header"> 标题 </div>
      </template>
      <div> ceshi </div>
    </JyElMessageBox>
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
  import componentsPagination from '../../components/pagination.vue'
  import componentsTabs from '../../components/tabs.vue'
  import componentsLayout from '../../components/Layout.vue'
  import componentsBatch from '../../components/batch.vue'
  import componentsDocumentsDetails from '../../components/documentsDetails.vue'
  import kDepartOrPersonVue from '@/views/components/modules/kDepartOrPerson.vue'
  import { ElMessageBox } from 'element-plus'
  import { useRouter } from 'vue-router'
  const router = useRouter()
  // const props = defineProps({
  //   // 处理类型
  //   type: {
  //     type: String,
  //     default: '0'
  //   }
  // })
  // const emit = defineEmits([])
  const state = reactive({
    componentsTabs: {
      data: [
        {
          label: '待智能用印',
          name: '1'
        },
        {
          label: '智能用印中',
          name: '2'
        },
        {
          label: '已完成用印',
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
            placeholder: '盖章码/申请人员/文件名称'
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
          label: '文件类型',
          type: 'derivable',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '+文件类型'
          }
        },
        {
          id: 'derivable',
          label: '印章名称',
          type: 'derivable',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '+印章名称'
          }
        },
        {
          id: 'derivable',
          label: '申请人',
          type: 'derivable',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '+申请人'
          }
        },
        {
          id: 'derivable',
          label: '申请部门',
          type: 'derivable',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '+申请部门'
          }
        },
        {
          id: 'wdyy',
          label: '用印模式',
          type: 'checkButton',
          data: [
            {
              name: '智能用印'
            },
            {
              name: '远程盖章'
            },
            {
              name: '实时视频盖章'
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
          type: 'selection',
          align: 'center'
        },
        {
          prop: '1',
          label: '单据编号',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '2',
          label: '单据名称',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '3',
          label: '使用印章',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '4',
          label: '盖章码',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '5',
          label: '申请盖章次数',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '6',
          label: '实际盖章次数',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '7',
          width: 100,
          label: '申请人',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '8',
          label: '申请部门',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '9',
          label: '申请时间',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '10',
          label: '用印状态',
          sortable: true,
          'min-width': 150
        },
        {
          prop: 'caozuo',
          label: '操作',
          fixed: 'right',
          'min-width': 300,
          rankDisplayData: [
            {
              name: '申请转办'
            },
            {
              name: '申请重置'
            },
            {
              name: '撤销转办'
            },
            {
              name: '撤销重置'
            }
          ]
        }
      ],
      data: [
        {
          1: '989117',
          2: '测试专用章-李慧斌',
          3: '测试专用',
          4: '测试专用章',
          5: '989117',
          6: '3',
          7: '7',
          8: '李慧斌',
          9: '2022/10/30  15:00:00',
          10: '智能用印中'
        },
        {
          1: '989117',
          2: '测试专用章-汤博',
          3: '测试专用',
          4: '测试专用章',
          5: '989117',
          6: '3',
          7: '7',
          8: '汤博',
          9: '2022/10/30  15:00:00',
          10: '智能用印中'
        },
        {
          1: '989117',
          2: '测试专用章-李慧斌',
          3: '测试专用',
          4: '测试专用章',
          5: '989117',
          6: '3',
          7: '7',
          8: '李慧斌',
          9: '2022/10/30  15:00:00',
          10: '智能用印中'
        }
      ],
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        stripe: true,
        'header-cell-style': {
          background: 'var(--color-fill--3)'
        },
        'cell-style': ({ row, column, rowIndex, columnIndex }) => {
          // console.log({ row, column, rowIndex, columnIndex });
          if (column.property === '2') {
            return {
              color: 'var(--Info-6)',
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
        amount: 4,
        index: 1,
        pageNumber: 10
      },
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        layout: 'prev, pager, next, jumper',
        total: 10,
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
      defaultAttribute: {
        disabled: true
      },
      data: [
        {
          name: '批量操作'
        }
      ]
    }
  })
  const showDepPerDialog = ref(false)
  const goInnerPage = (path, params) => {
    const routeObj = { path: path }
    if (params) {
      routeObj.query = { transfer: params }
    }
    router.push(routeObj)
  }
  // 点击表格单元格
  function cellClick(row, column, cell, event) {
    // console.log(row, column, cell, event);
    if (column.property === '2') {
      state.componentsDocumentsDetails.show = true
    }
  }
  // 点击关闭详情
  function clickClose() {
    state.componentsDocumentsDetails.show = false
  }

  // 点击表格按钮
  function customClick(row, column, cell, event) {
    console.log(cell)
    if (cell.name === '申请转办') {
      // goInnerPage('/frontDesk/transferApplication', 'transfer')
      goInnerPage(
        '/frontDesk/printControlManage/useSealManage/intelligentPrinting/transferApplication',
        'transfer'
      )
    }
    if (cell.name === '申请重置') {
      // goInnerPage('/frontDesk/transferApplication')
      goInnerPage(
        '/frontDesk/printControlManage/useSealManage/intelligentPrinting/transferApplication',
        'transfer'
      )
    }
    if (cell.name === '撤销转办') {
      ElMessageBox.confirm('请问确定要撤销转办申请吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {})
    }
    if (cell.name === '撤销重置') {
      ElMessageBox.confirm('请问确定要撤销重置用印申请吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {})
    }
    if (cell.name === '结束用印') {
      ElMessageBox.confirm('请问确定要结束用印吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {})
    }
    if (cell.name === '查看历史记录') {
      ElMessageBox.confirm('请问确定要催办吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {})
    }
  }

  // 切换分页
  function tabChange(activeName) {
    // console.log(activeName);
    if (activeName === '1') {
      state.componentsTable.header = [
        {
          width: 50,
          type: 'selection'
        },
        {
          prop: '1',
          label: '单据编号',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '2',
          label: '单据名称',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '3',
          label: '使用印章',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '4',
          label: '盖章码',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '5',
          label: '申请盖章次数',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '6',
          label: '实际盖章次数',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '7',
          width: 100,
          label: '申请人',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '8',
          label: '申请部门',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '9',
          label: '申请时间',
          sortable: true,
          'min-width': 180
        },
        {
          prop: '10',
          label: '用印状态',
          sortable: true,
          'min-width': 150
        },
        {
          prop: 'caozuo',
          label: '操作',
          fixed: 'right',
          'min-width': 300,
          rankDisplayData: [
            {
              name: '申请转办'
            },
            {
              name: '申请重置'
            },
            {
              name: '撤销转办'
            },
            {
              name: '撤销重置'
            }
          ]
        }
      ]
      state.componentsTable.data = [
        {
          1: '989117',
          2: '测试专用章-李丽',
          3: '测试专用',
          4: '测试专用章',
          5: '989117',
          6: '3',
          7: '7',
          8: '李丽',
          9: '2022/10/30  15:04:00',
          10: '智能用印中'
        },
        {
          1: '989119',
          2: '测试专用章-郭光林',
          3: '测试专用',
          4: '测试专用章',
          5: '989117',
          6: '3',
          7: '8',
          8: '郭光林',
          9: '2022-10-30  15:10:08',
          10: '智能用印中'
        },
        {
          1: '989110',
          2: '测试专用章-汤博',
          3: '测试专用',
          4: '测试专用章',
          5: '989117',
          6: '5',
          7: '7',
          8: '汤博',
          9: '2022/10/30  08:06:10',
          10: '智能用印中'
        },
        {
          1: '989111',
          2: '测试专用章-李慧斌',
          3: '测试专用',
          4: '测试专用章',
          5: '989117',
          6: '3',
          7: '9',
          8: '李慧斌',
          9: '2022-10-30  15:10:08',
          10: '智能用印中'
        }
      ]
    } else if (activeName === '2') {
      state.componentsTable.header = [
        {
          width: 50,
          type: 'selection'
        },
        {
          prop: '1',
          label: '单据编号',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '2',
          label: '单据名称',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '3',
          label: '印章名称',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '4',
          label: '盖章码',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '5',
          label: '申请盖章次数',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '6',
          label: '实际盖章次数',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '7',
          width: 100,
          label: '申请人',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '8',
          label: '申请部门',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '9',
          label: '申请时间',
          sortable: true,
          'min-width': 180
        },
        {
          prop: '10',
          label: '用印状态',
          sortable: true,
          'min-width': 150
        },
        {
          prop: 'caozuo',
          label: '操作',
          fixed: 'right',
          'min-width': 250,
          rankDisplayData: [
            {
              name: '结束用印'
            },
            {
              name: '申请重置'
            }
          ]
        }
      ]
      state.componentsTable.data = [
        {
          1: '989117',
          2: '测试专用章-李慧斌',
          3: '测试专用',
          4: '测试专用章',
          5: '989117',
          6: '3',
          7: '7',
          8: '李慧斌',
          9: '2022-10-30  15:10:00',
          10: '智能用印中'
        },
        {
          1: '989118',
          2: '测试专用章-李慧斌',
          3: '测试专用',
          4: '测试专用章',
          5: '989117',
          6: '3',
          7: '9',
          8: '李慧斌',
          9: '2022-10-30  05:08:00',
          10: '智能用印中'
        },
        {
          1: '989119',
          2: '测试专用章-李慧斌',
          3: '测试专用',
          4: '测试专用章',
          5: '989117',
          6: '3',
          7: '7',
          8: '李慧斌',
          9: '2022-10-30  15:10:08',
          10: '智能用印中'
        }
      ]
    } else if (activeName === '3') {
      state.componentsTable.header = [
        {
          width: 50,
          type: 'selection'
        },
        {
          prop: '1',
          label: '单据编号',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '2',
          label: '单据名称',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '3',
          label: '印章名称',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '4',
          label: '盖章码',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '5',
          label: '申请盖章次数',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '6',
          label: '实际盖章次数',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '7',
          width: 100,
          label: '申请人',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '8',
          label: '申请部门',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '9',
          label: '申请时间',
          sortable: true,
          'min-width': 180
        },
        {
          prop: '10',
          label: '用印状态',
          sortable: true,
          'min-width': 150
        },
        {
          prop: 'caozuo',
          label: '操作',
          fixed: 'right',
          'min-width': 100,
          rankDisplayData: [
            {
              name: '申请重置'
            }
          ]
        }
      ]
      state.componentsTable.data = [
        {
          1: '989117',
          2: '测试专用章-李慧斌',
          3: '测试专用',
          4: '测试专用章',
          5: '989117',
          6: '3',
          7: '7',
          8: '李慧斌',
          9: '2022/10/30  15:00:00',
          10: '智能用印中'
        },
        {
          1: '989118',
          2: '测试专用章-李慧斌',
          3: '测试专用',
          4: '测试专用章',
          5: '989117',
          6: '3',
          7: '7',
          8: '李慧斌',
          9: '2022/10/30  15:00:00',
          10: '智能用印中'
        }
      ]
    }
    // 批量
    if (activeName === '1') {
      state.componentsBatch.data = []
    } else if (activeName === '2') {
      state.componentsBatch.data = [
        {
          name: '批量结束用印'
        }
      ]
    } else if (activeName === '2') {
      state.componentsBatch.data = []
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

  // 点击搜索表单
  function clickElement(item, index) {
    // console.log(item, index)
    if (item.type === 'derivable') {
      showDepPerDialog.value = true
    }
  }

  // 点击批量按钮
  function clickBatchButton(item, index) {
    console.log(item, index)
    if (item.name === '批量结束用印') {
      ElMessageBox.confirm(
        '已选中单据【】、【】、【】，请问确定要结束用印吗？',
        '批量结束用印',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {})
    }
  }
  onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
    // 切换分页
    tabChange('1')
  })
  onMounted(() => {
    // console.log(`the component is now mounted.`)
  })
</script>
<style lang="scss" scoped>
  .PrintControlManagement-IntelligentPrinting {
    margin: 0%;

    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
</style>
