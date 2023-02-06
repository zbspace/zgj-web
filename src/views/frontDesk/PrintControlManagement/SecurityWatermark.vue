<!-- 防伪水印验证 -->
<template>
  <div class="PrintControlManagement-SecurityWatermark">
    <componentsLayout Layout="title,tabs,searchForm,table,pagination,batch">
      <template #title>
        <div class="title"> 防伪水印验证 </div>
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
  import {
    ref,
    reactive,
    defineProps,
    defineEmits,
    onBeforeMount,
    onMounted
  } from 'vue'
  import Layout from '../../../layouts/main.vue'
  import componentsTable from '../../components/table'
  import componentsSearchForm from '../../components/searchForm'
  import componentsTree from '../../components/tree'
  import componentsBreadcrumb from '../../components/breadcrumb'
  import componentsPagination from '../../components/pagination.vue'
  import componentsTabs from '../../components/tabs.vue'
  import componentsLayout from '../../components/Layout.vue'
  import componentsBatch from '@/views/components/batch.vue'
  import componentsDocumentsDetails from '../../components/documentsDetails.vue'
  import kDepartOrPersonVue from '@/views/components/modules/kDepartOrPerson.vue'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { useRouter } from 'vue-router'
  const router = useRouter()
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
          label: '未验证',
          name: '1'
        },
        {
          label: '已验证',
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
          label: '所属部门',
          type: 'derivable',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '+选择部门'
          }
        },
        {
          id: 'picker',
          label: '申请时间',
          type: 'picker',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            type: 'daterange',
            'start-placeholder': '开始时间',
            'end-placeholder': '结束时间'
          },
          style: {}
        },
        {
          id: 'shenqingr',
          label: '用印状态',
          type: 'radioButton',
          data: [
            {
              name: '审批已完成'
            },
            {
              name: '智能用印中'
            },
            {
              name: '待上传文件归档'
            },
            {
              name: '已完成'
            }
          ]
        },
        {
          id: 'shenqingr',
          label: '用印模式',
          type: 'radioButton',
          data: [
            {
              name: '智能用印'
            },
            {
              name: '远程盖章'
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
          label: '用印文件类型',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '7',
          label: '用印状态',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '4',
          label: '申请人',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '5',
          label: '申请部门',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '6',
          label: '申请时间',
          sortable: true,
          'min-width': 180
        },
        {
          prop: 'caozuo',
          label: '操作',
          fixed: 'right',
          'min-width': 150,
          rankDisplayData: [
            {
              name: '取消水印验证'
            }
          ]
        }
      ],
      data: [
        {
          1: 'XXXXXXX',
          2: '用印申请',
          3: '',
          4: '往往',
          5: '',
          6: '2022/10/30  15:00:00',
          7: ''
        },
        {
          1: 'XXXXXXX',
          2: '用印申请',
          3: '',
          4: '往往',
          5: '',
          6: '2022/10/30  15:00:00',
          7: ''
        },
        {
          1: 'XXXXXXX',
          2: '用印申请',
          3: '',
          4: '往往',
          5: '',
          6: '2022/10/30  15:00:00',
          7: ''
        },
        {
          1: 'XXXXXXX',
          2: '用印申请',
          3: '',
          4: '往往',
          5: '',
          6: '2022/10/30  15:00:00',
          7: ''
        },
        {
          1: 'XXXXXXX',
          2: '用印申请',
          3: '',
          4: '往往',
          5: '',
          6: '2022/10/30  15:00:00',
          7: ''
        },
        {
          1: 'XXXXXXX',
          2: '用印申请',
          3: '',
          4: '往往',
          5: '',
          6: '2022/10/30  15:00:00',
          7: ''
        },
        {
          1: 'XXXXXXX',
          2: '用印申请',
          3: '',
          4: '往往',
          5: '',
          6: '2022/10/30  15:00:00',
          7: ''
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
          if (column.property == '2') {
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
        },
        {
          label: '领用记录',
          name: 'Record-of-requisition'
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
  //点击关闭详情
  function clickClose() {
    state.componentsDocumentsDetails.show = false
  }

  // 切换分页
  function tabChange(activeName) {
    // console.log(activeName);
    if (activeName == '1') {
      state.componentsTable.header = [
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
          label: '用印文件类型',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '7',
          label: '用印状态',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '4',
          label: '申请人',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '5',
          label: '申请部门',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '6',
          label: '申请时间',
          sortable: true,
          'min-width': 180
        },
        {
          prop: 'caozuo',
          label: '操作',
          fixed: 'right',
          'min-width': 150,
          rankDisplayData: [
            {
              name: '取消水印验证'
            }
          ]
        }
      ]
      state.componentsTable.data = [
        {
          1: 'XXXXXXX',
          2: '用印申请',
          3: '',
          4: '往往',
          5: '',
          6: '2022/10/30  15:00:00',
          7: ''
        },
        {
          1: 'XXXXXXX',
          2: '用印申请',
          3: '',
          4: '往往',
          5: '',
          6: '2022/10/30  15:00:00',
          7: ''
        },
        {
          1: 'XXXXXXX',
          2: '用印申请',
          3: '',
          4: '往往',
          5: '',
          6: '2022/10/30  15:00:00',
          7: ''
        },
        {
          1: 'XXXXXXX',
          2: '用印申请',
          3: '',
          4: '往往',
          5: '',
          6: '2022/10/30  15:00:00',
          7: ''
        },
        {
          1: 'XXXXXXX',
          2: '用印申请',
          3: '',
          4: '往往',
          5: '',
          6: '2022/10/30  15:00:00',
          7: ''
        },
        {
          1: 'XXXXXXX',
          2: '用印申请',
          3: '',
          4: '往往',
          5: '',
          6: '2022/10/30  15:00:00',
          7: ''
        },
        {
          1: 'XXXXXXX',
          2: '用印申请',
          3: '',
          4: '往往',
          5: '',
          6: '2022/10/30  15:00:00',
          7: ''
        }
      ]
    } else if (activeName == '2') {
      state.componentsTable.header = [
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
          label: '用印文件类型',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '7',
          label: '用印状态',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '8',
          label: '水印验证节点',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '9',
          label: '验证状态',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '10',
          label: '验证次数',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '4',
          label: '申请人',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '5',
          label: '申请部门',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '6',
          label: '申请时间',
          sortable: true,
          'min-width': 180
        },
        {
          prop: 'caozuo',
          label: '操作',
          fixed: 'right',
          'min-width': 150,
          rankDisplayData: [
            {
              name: '查看验证记录'
            }
          ]
        }
      ]
      state.componentsTable.data = [
        {
          1: 'XXXXXXX',
          2: '用印申请',
          3: '',
          4: '往往',
          5: '',
          6: '2022/10/30  15:00:00',
          7: '',
          8: '盖前验证',
          9: '正常',
          10: ''
        },
        {
          1: 'XXXXXXX',
          2: '用印申请',
          3: '',
          4: '往往',
          5: '',
          6: '2022/10/30  15:00:00',
          7: '',
          8: '盖中验证',
          9: '有异常',
          10: ''
        },
        {
          1: 'XXXXXXX',
          2: '用印申请',
          3: '',
          4: '往往',
          5: '',
          6: '2022/10/30  15:00:00',
          7: '',
          8: '盖后验证',
          9: '正常',
          10: ''
        },
        {
          1: 'XXXXXXX',
          2: '用印申请',
          3: '',
          4: '往往',
          5: '',
          6: '2022/10/30  15:00:00',
          7: '',
          8: '归档验证',
          9: '有异常',
          10: ''
        },
        {
          1: 'XXXXXXX',
          2: '用印申请',
          3: '',
          4: '往往',
          5: '',
          6: '2022/10/30  15:00:00',
          7: '',
          8: '盖前验证',
          9: '有异常',
          10: ''
        },
        {
          1: 'XXXXXXX',
          2: '用印申请',
          3: '',
          4: '往往',
          5: '',
          6: '2022/10/30  15:00:00',
          7: ''
        },
        {
          1: 'XXXXXXX',
          2: '用印申请',
          3: '',
          4: '往往',
          5: '',
          6: '2022/10/30  15:00:00',
          7: ''
        }
      ]
    }

    // 搜索条件
    if (activeName == '1') {
      state.componentsSearchForm.data = [
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
          id: 'shenqingr',
          label: '用印状态',
          type: 'checkButton',
          data: [
            {
              name: '待审批'
            },
            {
              name: '待文件核验'
            },
            {
              name: '待智能用印'
            },
            {
              name: '智能用印中'
            },
            {
              name: '已完成用印'
            },
            {
              name: '待上传文件归档'
            },
            {
              name: '已完成归档'
            }
          ]
        },
        {
          id: 'shenqingr',
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
      ]
    } else if (activeName == '2') {
      state.componentsSearchForm.data = [
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
          id: 'shenqingr',
          label: '用印状态',
          type: 'checkButton',
          data: [
            {
              name: '待审批'
            },
            {
              name: '待文件核验'
            },
            {
              name: '待智能用印'
            },
            {
              name: '智能用印中'
            },
            {
              name: '已完成用印'
            },
            {
              name: '待上传文件归档'
            },
            {
              name: '已完成归档'
            }
          ]
        },
        {
          id: 'shenqingr',
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
        },
        {
          id: 'shenqingr',
          label: '水印验证节点',
          type: 'checkButton',
          data: [
            {
              name: '盖前'
            },
            {
              name: '盖中'
            },
            {
              name: '盖后'
            },
            {
              name: '归档'
            }
          ]
        },
        {
          id: 'shenqingr',
          label: '水印验证状态',
          type: 'checkButton',
          data: [
            {
              name: '正常'
            },
            {
              name: '有异常'
            }
          ]
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
      ]
    }
  }
  //点击表格按钮
  function customClick(row, column, cell, event) {
    if (cell.name === '取消水印验证') {
      state.JyElMessageBox.header.data = '取消水印验证'
      state.JyElMessageBox.content.data = '请问确认要取消水印验证吗？'
      state.JyElMessageBox.show = true
    }
    if (cell.name === '查看验证记录') {
      router.push({
        // path: '/frontDesk/PrintControlManagement/File-checkRecord/WaterCheckRecord'
        name: 'WaterCheckRecord'
      })
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
    // 切换分页
    tabChange('1')
  })
  onMounted(() => {
    // console.log(`the component is now mounted.`)
  })
</script>
<style lang="scss" scoped>
  .PrintControlManagement-SecurityWatermark {
    margin: 0%;

    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
</style>
