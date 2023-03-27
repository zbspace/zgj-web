<!-- 电子签章记录 -->
<template>
  <div class="PrintControlManagement-electronicSignatureRecord">
    <componentsLayout Layout="title,tabs,searchForm,table,pagination,batch">
      <template #title>
        <div class="title">
          <div>电子签章记录</div>
          <div class="title-more">
            <div class="title-more-add"> </div>
            <div class="title-more-down">
              <el-dropdown>
                <el-button>
                  <img
                    class="button-icon"
                    src="../../../assets/svg/gengduo-caozuo.svg"
                    alt=""
                    srcset=""
                  />
                  <span>更多操作</span>
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>导出台账</el-dropdown-item>
                    <el-dropdown-item>查看已作废的单据</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
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
            :paginationData="state.componentsPagination.data"
            isSelection
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
    <JyElMessageBox
      v-model="state.JyElMessageBox.show"
      :show="state.JyElMessageBox.show"
      :defaultAttribute="{}"
    >
      <template #header>
        {{ state.JyElMessageBox.header.data }}
      </template>
      <template #content>
        {{ state.JyElMessageBox.content.data }}
      </template>
    </JyElMessageBox>
  </div>
</template>
<script setup>
  import { ref, reactive, onBeforeMount, onMounted } from 'vue'
  import componentsTable from '../../components/table'
  import componentsSearchForm from '../../components/searchForm'
  import componentsTree from '../../components/tree'
  import componentsBreadcrumb from '../../components/breadcrumb'
  import componentsPagination from '../../components/pagination.vue'
  import componentsTabs from '../../components/JyTabs.vue'
  import componentsLayout from '../../components/Layout.vue'
  import componentsBatch from '@/views/components/batch.vue'
  import componentsDocumentsDetails from '../../components/documentsDetails.vue'
  import kDepartOrPersonVue from '@/views/components/modules/KDepartOrPersonDialog'
  import { ElMessage, ElMessageBox } from 'element-plus'
  const props = defineProps({
    // 处理类型
    type: {
      type: String,
      default: '0'
    }
  })
  const emit = defineEmits([])
  const state = reactive({
    componentsTabs: {
      data: [
        {
          label: '待签署',
          name: '1'
        },
        {
          label: '签署中',
          name: '2'
        },
        {
          label: '已签署',
          name: '3'
        },
        {
          label: '不可用',
          name: '4'
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
            placeholder: '文件名称/申请人/用印编码'
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
          id: 'derivable',
          label: '往来单位',
          type: 'derivable',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '+往来单位'
          }
        },
        {
          id: 'name',
          label: '金额',
          type: 'scopeInput',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          startAttribute: {
            placeholder: '最小金额'
          },
          endAttribute: {
            placeholder: '最大金额'
          }
        },
        {
          id: 'wdyy',
          label: '',
          type: 'checkbox',
          checkbox: [
            {
              // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
              defaultAttribute: {
                label: '我的申请单据'
              },
              style: {}
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
          prop: '1',
          label: '单据编号',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '2',
          label: '文件名称',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '3',
          label: '文件类型',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '4',
          label: '印章名称',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '5',
          label: '申请人',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '6',
          label: '申请部门',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '7',
          label: '申请时间',
          sortable: true,
          'min-width': 180
        },
        {
          prop: '8',
          label: '审批状态',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '9',
          label: '签章状态',
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
              name: '作废'
            }
          ]
        }
      ],
      data: [
        {
          1: 'XXXXXXXXXX',
          2: '用印申请',
          3: '',
          4: '',
          5: '往往',
          6: '',
          7: '2022/10/30  15:00:00',
          8: '',
          9: ''
        },
        {
          1: 'XXXXXXXXXX',
          2: '用印申请',
          3: '',
          4: '',
          5: '往往',
          6: '',
          7: '2022/10/30  15:00:00',
          8: '',
          9: ''
        },
        {
          1: 'XXXXXXXXXX',
          2: '用印申请',
          3: '',
          4: '',
          5: '往往',
          6: '',
          7: '2022/10/30  15:00:00',
          8: '',
          9: ''
        },
        {
          1: 'XXXXXXXXXX',
          2: '用印申请',
          3: '',
          4: '',
          5: '往往',
          6: '',
          7: '2022/10/30  15:00:00',
          8: '',
          9: ''
        },
        {
          1: 'XXXXXXXXXX',
          2: '用印申请',
          3: '',
          4: '',
          5: '往往',
          6: '',
          7: '2022/10/30  15:00:00',
          8: '',
          9: ''
        },
        {
          1: 'XXXXXXXXXX',
          2: '用印申请',
          3: '',
          4: '',
          5: '往往',
          6: '',
          7: '2022/10/30  15:00:00',
          8: '',
          9: ''
        },
        {
          1: 'XXXXXXXXXX',
          2: '用印申请',
          3: '',
          4: '',
          5: '往往',
          6: '',
          7: '2022/10/30  15:00:00',
          8: '',
          9: ''
        },
        {
          1: 'XXXXXXXXXX',
          2: '用印申请',
          3: '',
          4: '',
          5: '往往',
          6: '',
          7: '2022/10/30  15:00:00',
          8: '',
          9: ''
        },
        {
          1: 'XXXXXXXXXX',
          2: '用印申请',
          3: '',
          4: '',
          5: '往往',
          6: '',
          7: '2022/10/30  15:00:00',
          8: '',
          9: ''
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
          if (column.property == '2') {
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
          name: '批量作废'
        }
      ]
    },
    JyElMessageBox: {
      show: false,
      header: {
        data: ''
      },
      content: {
        data: ''
      }
    }
  })
  const showDepPerDialog = ref(false)
  // 点击表格单元格
  function cellClick(row, column, cell, event) {
    // console.log(row, column, cell, event);
    if (column.property == '2') {
      state.componentsDocumentsDetails.show = true
    }
  }
  // 点击关闭详情
  function clickClose() {
    state.componentsDocumentsDetails.show = false
  }

  // 切换分页
  function tabChange(activeName) {
    // console.log(activeName);
    if (activeName == '1' || activeName == '2' || activeName == '3') {
      state.componentsTable.header = [
        {
          prop: '1',
          label: '单据编号',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '2',
          label: '文件名称',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '3',
          label: '文件类型',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '4',
          label: '印章名称',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '5',
          label: '申请人',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '6',
          label: '申请部门',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '7',
          label: '申请时间',
          sortable: true,
          'min-width': 180
        },
        {
          prop: '8',
          label: '审批状态',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '9',
          label: '签章状态',
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
              name: '作废'
            }
          ]
        }
      ]
      state.componentsTable.data = [
        {
          1: 'XXXXXXXXXX',
          2: '用印申请',
          3: '',
          4: '',
          5: '往往',
          6: '',
          7: '2022/10/30  15:00:00',
          8: '',
          9: ''
        },
        {
          1: 'XXXXXXXXXX',
          2: '用印申请',
          3: '',
          4: '',
          5: '往往',
          6: '',
          7: '2022/10/30  15:00:00',
          8: '',
          9: ''
        },
        {
          1: 'XXXXXXXXXX',
          2: '用印申请',
          3: '',
          4: '',
          5: '往往',
          6: '',
          7: '2022/10/30  15:00:00',
          8: '',
          9: ''
        },
        {
          1: 'XXXXXXXXXX',
          2: '用印申请',
          3: '',
          4: '',
          5: '往往',
          6: '',
          7: '2022/10/30  15:00:00',
          8: '',
          9: ''
        },
        {
          1: 'XXXXXXXXXX',
          2: '用印申请',
          3: '',
          4: '',
          5: '往往',
          6: '',
          7: '2022/10/30  15:00:00',
          8: '',
          9: ''
        },
        {
          1: 'XXXXXXXXXX',
          2: '用印申请',
          3: '',
          4: '',
          5: '往往',
          6: '',
          7: '2022/10/30  15:00:00',
          8: '',
          9: ''
        },
        {
          1: 'XXXXXXXXXX',
          2: '用印申请',
          3: '',
          4: '',
          5: '往往',
          6: '',
          7: '2022/10/30  15:00:00',
          8: '',
          9: ''
        },
        {
          1: 'XXXXXXXXXX',
          2: '用印申请',
          3: '',
          4: '',
          5: '往往',
          6: '',
          7: '2022/10/30  15:00:00',
          8: '',
          9: ''
        },
        {
          1: 'XXXXXXXXXX',
          2: '用印申请',
          3: '',
          4: '',
          5: '往往',
          6: '',
          7: '2022/10/30  15:00:00',
          8: '',
          9: ''
        }
      ]
    } else if (activeName == '4') {
      state.componentsTable.header = [
        {
          prop: '1',
          label: '单据编号',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '2',
          label: '文件名称',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '3',
          label: '文件类型',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '4',
          label: '印章名称',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '5',
          label: '申请人',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '6',
          label: '申请部门',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '7',
          label: '申请时间',
          sortable: true,
          'min-width': 180
        },
        {
          prop: '8',
          label: '审批状态',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '9',
          label: '签章状态',
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
              name: '撤销'
            },
            {
              name: '作废'
            }
          ]
        }
      ]
      state.componentsTable.data = [
        {
          1: 'XXXXXXXXXX',
          2: '用印申请',
          3: '',
          4: '',
          5: '往往',
          6: '',
          7: '2022/10/30  15:00:00',
          8: '',
          9: ''
        },
        {
          1: 'XXXXXXXXXX',
          2: '用印申请',
          3: '',
          4: '',
          5: '往往',
          6: '',
          7: '2022/10/30  15:00:00',
          8: '',
          9: ''
        },
        {
          1: 'XXXXXXXXXX',
          2: '用印申请',
          3: '',
          4: '',
          5: '往往',
          6: '',
          7: '2022/10/30  15:00:00',
          8: '',
          9: ''
        },
        {
          1: 'XXXXXXXXXX',
          2: '用印申请',
          3: '',
          4: '',
          5: '往往',
          6: '',
          7: '2022/10/30  15:00:00',
          8: '',
          9: ''
        },
        {
          1: 'XXXXXXXXXX',
          2: '用印申请',
          3: '',
          4: '',
          5: '往往',
          6: '',
          7: '2022/10/30  15:00:00',
          8: '',
          9: ''
        },
        {
          1: 'XXXXXXXXXX',
          2: '用印申请',
          3: '',
          4: '',
          5: '往往',
          6: '',
          7: '2022/10/30  15:00:00',
          8: '',
          9: ''
        },
        {
          1: 'XXXXXXXXXX',
          2: '用印申请',
          3: '',
          4: '',
          5: '往往',
          6: '',
          7: '2022/10/30  15:00:00',
          8: '',
          9: ''
        },
        {
          1: 'XXXXXXXXXX',
          2: '用印申请',
          3: '',
          4: '',
          5: '往往',
          6: '',
          7: '2022/10/30  15:00:00',
          8: '',
          9: ''
        },
        {
          1: 'XXXXXXXXXX',
          2: '用印申请',
          3: '',
          4: '',
          5: '往往',
          6: '',
          7: '2022/10/30  15:00:00',
          8: '',
          9: ''
        }
      ]
    }
  }
  // 点击表格按钮
  function customClick(row, column, cell, event) {
    if (cell.name === '作废') {
      state.JyElMessageBox.header.data = '提示？'
      state.JyElMessageBox.content.data =
        '作废后当前记录将从当前表格中消失，请问确定要作废吗？'
      state.JyElMessageBox.show = true
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

  onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
  })
  onMounted(() => {
    // console.log(`the component is now mounted.`)
  })
</script>
<style lang="scss" scoped>
  .PrintControlManagement-electronicSignatureRecord {
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
