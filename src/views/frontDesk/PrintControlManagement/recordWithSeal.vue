<!-- 用印记录 -->
<template>
  <div class="PrintControlManagement-recordWithSeal">
    <componentsLayout Layout="title,tabs,searchForm,table,pagination,batch">
      <template #title>
        <div class="title">
          <div>用印记录</div>
          <div class="title-more">
            <div class="title-more-add"> </div>
            <div
              class="title-more-down"
              v-if="state.componentsTitle.more.data.length > 0"
            >
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
                    <el-dropdown-item
                      v-for="(item, index) in state.componentsTitle.more.data"
                      :key="index"
                    >
                      {{ item.name }}
                    </el-dropdown-item>
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
    <!-- 流程终止弹窗 -->
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
    </KDialog>
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
  import componentsDocumentsDetails from '../../components/documentsDetails.vue'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { useRouter } from 'vue-router'
  import KDialog from '@/views/components/modules/kdialog.vue'

  import kDepartOrPersonVue from '@/views/components/modules/kDepartOrPerson.vue'
  import dialogProcessJson from '@/views/addDynamicFormJson/ProcessStopJson.json'
  import RecordSealToReviewJson from '@/views/addDynamicFormJson/RecordSealToReview.json'

  // import { ConsoleWriter } from "istanbul-lib-report";
  const router = useRouter()
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
    title: '流程终止',
    formJson: dialogProcessJson
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
        ElMessage.error(error)
      })
  }
  const state = reactive({
    componentsTitle: {
      more: {
        data: [
          {
            name: ''
          }
        ]
      }
    },
    componentsTabs: {
      data: [
        {
          label: '待审批',
          name: '1'
        },
        {
          label: '待文件核验',
          name: '2'
        },
        {
          label: '待智能用印',
          name: '3'
        },
        {
          label: '智能用印中',
          name: '4'
        },
        {
          label: '已完成用印',
          name: '5'
        },
        {
          label: '待上传文件归档',
          name: '6'
        },
        {
          label: '已完成归档',
          name: '7'
        },
        {
          label: '不可用',
          name: '8'
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
          id: 'wjlx',
          label: '文件类型',
          type: 'select',
          options: [
            {
              label: '归档强制',
              value: '1'
            },
            {
              label: '审批测试',
              value: '2'
            },
            {
              label: '测试审批',
              value: '3'
            },
            {
              label: '中安全+移动侦测',
              value: '4'
            },
            {
              label: '中安全+骑缝',
              value: '4'
            },
            {
              label: '白板',
              value: '4'
            },
            {
              label: '中安全+远程+视频+盖后+限次',
              value: '4'
            },
            {
              label: '中安全-多组合',
              value: '4'
            },
            {
              label: '中安全--',
              value: '4'
            },
            {
              label: '中安全-盖后',
              value: '4'
            }
          ]
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
          id: 'picker',
          label: '盖章时间',
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
          id: 'wdyy',
          label: '用印状态',
          type: 'checkButton',
          data: [
            {
              name: '正常'
            },
            {
              name: '异常'
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
                label: '印章外带'
              },
              style: {}
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
          width: 60,
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
          prop: '6',
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
              name: '撤销'
            },
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
          8: ''
        },
        {
          1: 'XXXXXXXXXX',
          2: '用印申请',
          3: '',
          4: '',
          5: '往往',
          6: '',
          7: '2022/10/30  15:00:00',
          8: ''
        },
        {
          1: 'XXXXXXXXXX',
          2: '用印申请',
          3: '',
          4: '',
          5: '往往',
          6: '',
          7: '2022/10/30  15:00:00',
          8: ''
        },
        {
          1: 'XXXXXXXXXX',
          2: '用印申请',
          3: '',
          4: '',
          5: '往往',
          6: '',
          7: '2022/10/30  15:00:00',
          8: ''
        },
        {
          1: 'XXXXXXXXXX',
          2: '用印申请',
          3: '',
          4: '',
          5: '往往',
          6: '',
          7: '2022/10/30  15:00:00',
          8: ''
        },
        {
          1: 'XXXXXXXXXX',
          2: '用印申请',
          3: '',
          4: '',
          5: '往往',
          6: '',
          7: '2022/10/30  15:00:00',
          8: ''
        },
        {
          1: 'XXXXXXXXXX',
          2: '用印申请',
          3: '',
          4: '',
          5: '往往',
          6: '',
          7: '2022/10/30  15:00:00',
          8: ''
        },
        {
          1: 'XXXXXXXXXX',
          2: '用印申请',
          3: '',
          4: '',
          5: '往往',
          6: '',
          7: '2022/10/30  15:00:00',
          8: ''
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
  // 点击表格单元格
  function cellClick(row, column, cell, event) {
    // console.log(row, column, cell, event);
    if (column.property === '2') {
      state.componentsDocumentsDetails.show = true
    }
  }
  // 点击表格按钮
  function customClick(row, column, cell, event) {
    if (cell.name === '撤销') {
      state.JyElMessageBox.header.data = '提示？'
      state.JyElMessageBox.content.data =
        '撤销后本次申请送审将被取消，请问确定要撤销吗？'
      state.JyElMessageBox.show = true
    }
    if (cell.name === '作废') {
      state.JyElMessageBox.header.data = '提示？'
      state.JyElMessageBox.content.data =
        '作废后当前记录将从当前表格中消失，请问确定要作废吗？'
      state.JyElMessageBox.show = true
    }
    if (cell.name === '流程终止') {
      dialogProcess.show = true
      dialogProcess.title = '流程终止'
      dialogProcess.formJson = dialogProcessJson
      // ElMessageBox.confirm(
      //     '作废后当前记录将从当前表格中消失，请问确定要作废吗？',
      //     {
      //         confirmButtonText: '确定',
      //         cancelButtonText: '取消',
      //         type: 'warning',
      //     }
      // )
      //     .then(() => {

      //     })
    }
    if (cell.name === '复核') {
      dialogProcess.show = true
      dialogProcess.title = '复核'
      dialogProcess.formJson = RecordSealToReviewJson
    }
    if (cell.name === '解除用印限制') {
      state.JyElMessageBox.header.data = '提示？'
      state.JyElMessageBox.content.data =
        '若单据满足【远程盖章】、【实时视频盖章】、【二维码水印校验】、【限时用印】、【印章外带】、【盖前文件内容核验】条件，此操作会取消所有相关校验并将盖章模式转为普通智能用印，以支持用印人跳过限制直接用印，确定要继续吗？'
      state.JyElMessageBox.show = true
    }
    if (cell.name === '去送审') {
      router.push({
        // path: '/frontDesk/InnerPageApplication'
        name: 'InnerPageApplication'
      })
    }
  }
  // 点击关闭详情
  function clickClose() {
    state.componentsDocumentsDetails.show = false
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
          prop: '0',
          label: '序号',
          width: 60,
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
          0: 1,
          1: 'zsz009',
          2: '测试文件01',
          3: '普通智能印章',
          4: '测试专用章',
          5: '肖世康',
          6: '技术部',
          7: '2022-10-30  08:00:50',
          8: '审批已完成'
        },
        {
          0: 2,
          1: 'zsz011',
          2: '测试文件05',
          3: '智能印章',
          4: '测试专用章',
          5: '肖世康',
          6: '技术部',
          7: '2022-10-30  08:00:50',
          8: '审批已完成'
        },
        {
          0: 3,
          1: 'zsz019',
          2: '测试文件12',
          3: '普通智能印章',
          4: '研发专用章',
          5: '汤博',
          6: '建业科技',
          7: '2022-10-30  08:00:50',
          8: '待审批'
        },
        {
          0: 4,
          1: 'zsz009',
          2: '测试文件03',
          3: '智能印章',
          4: '技术部专用章',
          5: '郭光林',
          6: '技术部',
          7: '2022-10-30  08:00:50',
          8: '审批已完成'
        },
        {
          0: 5,
          1: 'zsz012',
          2: '测试文件08',
          3: '普通智能印章',
          4: '测试专用章',
          5: '岳海涛',
          6: '测试部',
          7: '2022-10-30  08:00:50',
          8: '待审批'
        }
      ]
    } else if (activeName === '2' || activeName === '3') {
      state.componentsTable.header = [
        {
          width: 50,
          type: 'selection'
        },
        {
          prop: '0',
          label: '序号',
          width: 60,
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
          prop: '6',
          label: '审批状态',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '8',
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
              name: '流程终止'
            },
            {
              name: '解除用印限制'
            },
            {
              name: '作废'
            }
          ]
        }
      ]
      state.componentsTable.data = [
        {
          0: 1,
          1: 'zsz009',
          2: '测试文件01',
          3: '普通智能印章',
          4: '测试专用章',
          5: '肖世康',
          6: '技术部',
          7: '2022-10-30  08:00:50',
          8: '审批已完成'
        },
        {
          0: 2,
          1: 'zsz011',
          2: '测试文件05',
          3: '智能印章',
          4: '测试专用章',
          5: '肖世康',
          6: '技术部',
          7: '2022-10-30  08:00:50',
          8: '审批已完成'
        },
        {
          0: 3,
          1: 'zsz012',
          2: '测试文件08',
          3: '普通智能印章',
          4: '测试专用章',
          5: '岳海涛',
          6: '测试部',
          7: '2022-10-30  08:00:50',
          8: '待审批'
        }
      ]
    } else if (activeName === '4') {
      state.componentsTable.header = [
        {
          width: 50,
          type: 'selection'
        },
        {
          prop: '0',
          label: '序号',
          width: 60,
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
              name: '流程终止'
            },
            {
              name: '解除用印限制'
            },
            {
              name: '作废'
            }
          ]
        }
      ]
      state.componentsTable.data = [
        {
          0: 1,
          1: 'zsz009',
          2: '测试文件01',
          3: '普通智能印章',
          4: '测试专用章',
          5: '肖世康',
          6: '技术部',
          7: '2022-10-30  08:00:50',
          8: '审批已完成'
        },
        {
          0: 2,
          1: 'zsz011',
          2: '测试文件05',
          3: '智能印章',
          4: '测试专用章',
          5: '肖世康',
          6: '技术部',
          7: '2022-10-30  08:00:50',
          8: '审批已完成'
        },
        {
          0: 3,
          1: 'zsz019',
          2: '测试文件12',
          3: '普通智能印章',
          4: '研发专用章',
          5: '汤博',
          6: '建业科技',
          7: '2022-10-30  08:00:50',
          8: '待审批'
        },
        {
          0: 4,
          1: 'zsz009',
          2: '测试文件03',
          3: '智能印章',
          4: '技术部专用章',
          5: '郭光林',
          6: '技术部',
          7: '2022-10-30  08:00:50',
          8: '审批已完成'
        },
        {
          0: 5,
          1: 'zsz012',
          2: '测试文件08',
          3: '普通智能印章',
          4: '测试专用章',
          5: '岳海涛',
          6: '测试部',
          7: '2022-10-30  08:00:50',
          8: '待审批'
        }
      ]
    } else if (activeName === '5') {
      state.componentsTable.header = [
        {
          width: 50,
          type: 'selection'
        },
        {
          prop: '0',
          label: '序号',
          width: 60,
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
          label: '用印状态',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '9',
          label: '用印情况',
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
              name: '复核'
            },
            {
              name: '作废'
            }
          ]
        }
      ]
      state.componentsTable.data = [
        {
          0: 1,
          1: 'zsz009',
          2: '测试文件01',
          3: '普通智能印章',
          4: '测试专用章',
          5: '肖世康',
          6: '技术部',
          7: '2022-10-30  08:00:50',
          8: '正常',
          9: '待审批'
        },
        {
          0: 2,
          1: 'zsz011',
          2: '测试文件05',
          3: '智能印章',
          4: '测试专用章',
          5: '肖世康',
          6: '技术部',
          7: '2022-10-30  08:00:50',
          8: '正常',
          9: '待审批'
        },
        {
          0: 3,
          1: 'zsz009',
          2: '测试文件03',
          3: '智能印章',
          4: '技术部专用章',
          5: '郭光林',
          6: '技术部',
          7: '2022-10-30  08:00:50',
          8: '正常',
          9: '待审批'
        },
        {
          0: 4,
          1: 'zsz012',
          2: '测试文件08',
          3: '普通智能印章',
          4: '测试专用章',
          5: '岳海涛',
          6: '测试部',
          7: '2022-10-30  08:00:50',
          8: '正常',
          9: '待审批'
        }
      ]
    } else if (activeName === '6') {
      state.componentsTable.header = [
        {
          width: 50,
          type: 'selection'
        },
        {
          prop: '0',
          label: '序号',
          width: 60,
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
          label: '用印状态',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '9',
          label: '用印情况',
          sortable: true,
          'min-width': 150
        },
        {
          prop: 'caozuo',
          label: '操作',
          fixed: 'right',
          'min-width': 200,
          rankDisplayData: [
            {
              name: '流程终止'
            },
            {
              name: '复核'
            },
            {
              name: '作废'
            }
          ]
        }
      ]
      state.componentsTable.data = [
        {
          0: 1,
          1: 'zsz009',
          2: '测试文件01',
          3: '普通智能印章',
          4: '测试专用章',
          5: '肖世康',
          6: '技术部',
          7: '2022-10-30  08:00:50',
          8: '正常',
          9: '待审批'
        },
        {
          0: 2,
          1: 'zsz011',
          2: '测试文件05',
          3: '智能印章',
          4: '测试专用章',
          5: '肖世康',
          6: '技术部',
          7: '2022-10-30  08:00:50',
          8: '正常',
          9: '待审批'
        },
        {
          0: 3,
          1: 'zsz019',
          2: '测试文件12',
          3: '普通智能印章',
          4: '研发专用章',
          5: '汤博',
          6: '建业科技',
          7: '2022-10-30  08:00:50',
          8: '正常',
          9: '待审批'
        },
        {
          0: 4,
          1: 'zsz009',
          2: '测试文件03',
          3: '智能印章',
          4: '技术部专用章',
          5: '郭光林',
          6: '技术部',
          7: '2022-10-30  08:00:50',
          8: '正常',
          9: '待审批'
        },
        {
          0: 5,
          1: 'zsz012',
          2: '测试文件08',
          3: '普通智能印章',
          4: '测试专用章',
          5: '岳海涛',
          6: '测试部',
          7: '2022-10-30  08:00:50',
          8: '正常',
          9: '待审批'
        }
      ]
    } else if (activeName === '7') {
      state.componentsTable.header = [
        {
          width: 50,
          type: 'selection'
        },
        {
          prop: '0',
          label: '序号',
          width: 60,
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
          label: '用印状态',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '9',
          label: '用印情况',
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
              name: '复核'
            },
            {
              name: '作废'
            }
          ]
        }
      ]
      state.componentsTable.data = [
        {
          0: 1,
          1: 'zsz009',
          2: '测试文件01',
          3: '普通智能印章',
          4: '测试专用章',
          5: '肖世康',
          6: '技术部',
          7: '2022-10-30  08:00:50',
          8: '正常',
          9: '待审批'
        },
        {
          0: 2,
          1: 'zsz011',
          2: '测试文件05',
          3: '智能印章',
          4: '测试专用章',
          5: '肖世康',
          6: '技术部',
          7: '2022-10-30  08:00:50',
          8: '正常',
          9: '待审批'
        },
        {
          0: 3,
          1: 'zsz019',
          2: '测试文件12',
          3: '普通智能印章',
          4: '研发专用章',
          5: '汤博',
          6: '建业科技',
          7: '2022-10-30  08:00:50',
          8: '正常',
          9: '待审批'
        },
        {
          0: 4,
          1: 'zsz009',
          2: '测试文件03',
          3: '智能印章',
          4: '技术部专用章',
          5: '郭光林',
          6: '技术部',
          7: '2022-10-30  08:00:50',
          8: '正常',
          9: '待审批'
        },
        {
          0: 5,
          1: 'zsz012',
          2: '测试文件08',
          3: '普通智能印章',
          4: '测试专用章',
          5: '岳海涛',
          6: '测试部',
          7: '2022-10-30  08:00:50',
          8: '正常',
          9: '待审批'
        }
      ]
    } else if (activeName === '8') {
      state.componentsTable.header = [
        {
          width: 50,
          type: 'selection'
        },
        {
          prop: '0',
          label: '序号',
          width: 60,
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
          label: '用印状态',
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
              name: '去送审'
            },
            {
              name: '作废'
            }
          ]
        }
      ]
      state.componentsTable.data = [
        {
          0: 1,
          1: 'zsz009',
          2: '测试文件01',
          3: '普通智能印章',
          4: '测试专用章',
          5: '肖世康',
          6: '技术部',
          7: '2022-10-30  08:00:50',
          8: '正常',
          9: '待审批'
        },
        {
          0: 2,
          1: 'zsz011',
          2: '测试文件05',
          3: '智能印章',
          4: '测试专用章',
          5: '肖世康',
          6: '技术部',
          7: '2022-10-30  08:00:50',
          8: '正常',
          9: '待审批'
        },
        {
          0: 3,
          1: 'zsz019',
          2: '测试文件12',
          3: '普通智能印章',
          4: '研发专用章',
          5: '汤博',
          6: '建业科技',
          7: '2022-10-30  08:00:50',
          8: '正常',
          9: '待审批'
        },
        {
          0: 4,
          1: 'zsz009',
          2: '测试文件03',
          3: '智能印章',
          4: '技术部专用章',
          5: '郭光林',
          6: '技术部',
          7: '2022-10-30  08:00:50',
          8: '正常',
          9: '待审批'
        },
        {
          0: 5,
          1: 'zsz012',
          2: '测试文件08',
          3: '普通智能印章',
          4: '测试专用章',
          5: '岳海涛',
          6: '测试部',
          7: '2022-10-30  08:00:50',
          8: '正常',
          9: '待审批'
        }
      ]
    }

    // 批量
    if (activeName === '1' || activeName === '7' || activeName === '8') {
      state.componentsBatch.data = [
        {
          name: '批量作废'
        }
      ]
    } else if (
      activeName === '2' ||
      activeName === '3' ||
      activeName === '4' ||
      activeName === '5' ||
      activeName === '6'
    ) {
      state.componentsBatch.data = [
        {
          name: '批量作废'
        },
        {
          name: '批量流程终止'
        }
      ]
    }

    // 更多操作
    if (
      activeName === '1' ||
      activeName === '2' ||
      activeName === '3' ||
      activeName === '4' ||
      activeName === '5' ||
      activeName === '6' ||
      activeName === '7'
    ) {
      state.componentsTitle.more.data = [
        {
          name: '查看已作废的单据'
        },
        {
          name: '导出台账'
        }
      ]
    } else if (activeName === '8') {
      state.componentsTitle.more.data = [
        {
          name: '查看已作废的单据'
        }
      ]
    }

    // 搜索条件
    if (
      activeName === '1' ||
      activeName === '2' ||
      activeName === '3' ||
      activeName === '8'
    ) {
      state.componentsSearchForm.data = [
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
          id: 'wjlx',
          label: '文件类型',
          type: 'select',
          options: [
            {
              label: '归档强制',
              value: '1'
            },
            {
              label: '审批测试',
              value: '2'
            },
            {
              label: '测试审批',
              value: '3'
            },
            {
              label: '中安全+移动侦测',
              value: '4'
            },
            {
              label: '中安全+骑缝',
              value: '4'
            },
            {
              label: '白板',
              value: '4'
            },
            {
              label: '中安全+远程+视频+盖后+限次',
              value: '4'
            },
            {
              label: '中安全-多组合',
              value: '4'
            },
            {
              label: '中安全--',
              value: '4'
            },
            {
              label: '中安全-盖后',
              value: '4'
            }
          ]
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
                label: '印章外带'
              },
              style: {}
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
    } else if (activeName === '4') {
      state.componentsSearchForm.data = [
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
          id: 'wjlx',
          label: '文件类型',
          type: 'select',
          options: [
            {
              label: '归档强制',
              value: '1'
            },
            {
              label: '审批测试',
              value: '2'
            },
            {
              label: '测试审批',
              value: '3'
            },
            {
              label: '中安全+移动侦测',
              value: '4'
            },
            {
              label: '中安全+骑缝',
              value: '4'
            },
            {
              label: '白板',
              value: '4'
            },
            {
              label: '中安全+远程+视频+盖后+限次',
              value: '4'
            },
            {
              label: '中安全-多组合',
              value: '4'
            },
            {
              label: '中安全--',
              value: '4'
            },
            {
              label: '中安全-盖后',
              value: '4'
            }
          ]
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
          id: 'picker',
          label: '盖章时间',
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
          id: 'wdyy',
          label: '',
          type: 'checkbox',
          checkbox: [
            {
              // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
              defaultAttribute: {
                label: '印章外带'
              },
              style: {}
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
    } else if (activeName === '5' || activeName === '6' || activeName === '7') {
      state.componentsSearchForm.data = [
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
          id: 'wjlx',
          label: '文件类型',
          type: 'select',
          options: [
            {
              label: '归档强制',
              value: '1'
            },
            {
              label: '审批测试',
              value: '2'
            },
            {
              label: '测试审批',
              value: '3'
            },
            {
              label: '中安全+移动侦测',
              value: '4'
            },
            {
              label: '中安全+骑缝',
              value: '4'
            },
            {
              label: '白板',
              value: '4'
            },
            {
              label: '中安全+远程+视频+盖后+限次',
              value: '4'
            },
            {
              label: '中安全-多组合',
              value: '4'
            },
            {
              label: '中安全--',
              value: '4'
            },
            {
              label: '中安全-盖后',
              value: '4'
            }
          ]
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
          id: 'picker',
          label: '盖章时间',
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
          id: 'wdyy',
          label: '用印状态',
          type: 'checkButton',
          data: [
            {
              name: '正常'
            },
            {
              name: '异常'
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
                label: '印章外带'
              },
              style: {}
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
    // 切换分页
    tabChange('1')
  })
  onMounted(() => {
    // console.log(`the component is now mounted.`)
  })
</script>
<style lang="scss" scoped>
  .PrintControlManagement-recordWithSeal {
    margin: 0%;

    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .title-more {
        height: 100%;
        display: flex;
        align-items: center;

        .title-more-add {
          margin-right: 0.5rem;
          height: 100%;
          display: flex;
          align-items: center;
        }

        .title-more-down {
          height: 100%;
          display: flex;
          align-items: center;
        }
      }
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
