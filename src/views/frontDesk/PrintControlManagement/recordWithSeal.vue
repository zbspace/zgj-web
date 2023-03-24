<!-- 用印记录 -->
<template>
  <div class="PrintControlManagement-recordWithSeal">
    <JyTable
      :url="`/sealApply/${currentActiveName}`"
      ref="jyTable"
      hasTabs
      :componentsSearchForm="state.componentsSearchForm"
      :componentsTableHeader="state.componentsTable.header"
      :componentsBatch="state.componentsBatch"
      tableClick="useSealFileName"
      @cellClick="cellClick"
      @customClick="customClick"
      @clickBatchButton="clickBatchButton"
    >
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
            :activeName="currentActiveName"
            :data="state.componentsTabs.data"
            @tab-change="tabChange"
          >
          </componentsTabs>
        </div>
      </template>
    </JyTable>
    <!-- <componentsLayout Layout="title,tabs,searchForm,table,pagination,batch">
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
    </componentsLayout> -->
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
    <JyDialog
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
    </JyDialog>
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
  import { ref, reactive, onBeforeMount, onMounted, nextTick } from 'vue'
  import JyTable from '@/views/components/JyTable.vue'
  import componentsTabs from '@/views/components/tabs.vue'
  import componentsDocumentsDetails from '../../components/documentsDetails.vue'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { useRouter } from 'vue-router'
  import kDepartOrPersonVue from '@/views/components/modules/KDepartOrPersonDialog'
  import dialogProcessJson from '@/views/addDynamicFormJson/ProcessStopJson.json'
  import RecordSealToReviewJson from '@/views/addDynamicFormJson/RecordSealToReview.json'
  import listApproving from '@/views/tableHeaderJson/frontDesk/PrintControlManagement/recordWithSeal/listApproving.json'
  import listFileVerification from '@/views/tableHeaderJson/frontDesk/PrintControlManagement/recordWithSeal/listFileVerification.json'
  import listNoResult from '@/views/tableHeaderJson/frontDesk/PrintControlManagement/recordWithSeal/listNoResult.json'
  import listNotUse from '@/views/tableHeaderJson/frontDesk/PrintControlManagement/recordWithSeal/listNotUse.json'
  import listNoUse from '@/views/tableHeaderJson/frontDesk/PrintControlManagement/recordWithSeal/listNoUse.json'
  import listResultDone from '@/views/tableHeaderJson/frontDesk/PrintControlManagement/recordWithSeal/listResultDone.json'
  import listUseDone from '@/views/tableHeaderJson/frontDesk/PrintControlManagement/recordWithSeal/listUseDone.json'
  import listUsing from '@/views/tableHeaderJson/frontDesk/PrintControlManagement/recordWithSeal/listUsing.json'

  const router = useRouter()
  const showDepPerDialog = ref(false)
  const dialogProcess = reactive({
    show: false,
    title: '流程终止',
    formJson: dialogProcessJson
  })
  const vFormLibraryRef = ref(null)
  const currentActiveName = ref('listApproving')
  const tableHeaders = ref({
    listApproving,
    listFileVerification,
    listNoResult,
    listNotUse,
    listNoUse,
    listResultDone,
    listUseDone,
    listUsing
  })
  const jyTable = ref(null)

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
          name: 'listApproving'
        },
        {
          label: '待文件核验',
          name: 'listFileVerification'
        },
        {
          label: '待智能用印',
          name: 'listNoUse'
        },
        {
          label: '智能用印中',
          name: 'listUsing'
        },
        {
          label: '已完成用印',
          name: 'listUseDone'
        },
        {
          label: '待上传文件归档',
          name: 'listNoResult'
        },
        {
          label: '已完成归档',
          name: 'listResultDone'
        },
        {
          label: '不可用',
          name: 'listNotUse'
        }
      ]
    },
    componentsSearchForm: {
      data: [
        {
          id: 'keyword',
          label: '关键词',
          type: 'input',
          inCommonUse: true,
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '文件名称/申请人/用印编码'
          }
        },
        {
          id: 'applyTime',
          label: '申请时间',
          type: 'picker',
          requestType: 'array',
          startRequest: 'applyStartTime',
          endRequest: 'applyEndTime',
          inCommonUse: true,
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            type: 'daterange',
            'start-placeholder': '开始时间',
            'end-placeholder': '结束时间',
            'value-format': 'YYYY-MM-DD',
            'disabled-date': time => {
              return time.getTime() > Date.now() // 如果有后面的-8.64e7就是不可以选择今天的
            },
            'default-value': [
              new Date(new Date().setMonth(new Date().getMonth() - 1)),
              new Date()
            ]
          },
          style: {}
        },
        {
          id: 'fileTypeId',
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
          id: 'sealId',
          label: '印章名称',
          type: 'dialog',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            type: 'JySelectSeal',
            multiple: false,
            placeholder: '+印章名称'
          },
          options: [],
          values: []
        },
        {
          id: 'applyUser',
          requestParams: 'applyUserId',
          label: '申请人',
          type: 'derivable',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            type: 'user',
            multiple: false,
            placeholder: '+申请人'
          },
          options: [],
          values: null
        },
        {
          id: 'applyOrgan',
          requestParams: 'applyOrganId',
          label: '申请部门',
          type: 'derivable',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            type: 'organ',
            multiple: false,
            placeholder: '+申请部门'
          },
          options: [],
          values: null
        },
        {
          id: 'relatedCompanyId',
          label: '往来单位',
          type: 'dialog',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            type: 'JyRelatedCompany',
            placeholder: '+往来单位'
          },
          options: [],
          values: []
        },
        {
          id: 'totalMoney',
          label: '金额',
          type: 'scopeInput',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          startAttribute: {
            placeholder: '最小金额',
            id: 'totalMoneyMin'
          },
          endAttribute: {
            placeholder: '最大金额',
            id: 'totalMoneyMax'
          }
        },
        {
          id: 'applyTime',
          label: '盖章时间',
          type: 'picker',
          requestType: 'array',
          startRequest: 'applyStartTime',
          endRequest: 'applyEndTime',
          inCommonUse: true,
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            type: 'daterange',
            'start-placeholder': '开始时间',
            'end-placeholder': '结束时间',
            'value-format': 'YYYY-MM-DD'
          },
          style: {}
        },
        {
          id: 'status',
          label: '用印状态',
          type: 'checkButton',
          data: [
            {
              id: '1',
              name: '正常'
            },
            {
              id: '0',
              name: '异常'
            }
          ]
        },
        {
          id: 'extSeal',
          label: '',
          type: 'checkbox',
          checkbox: [
            {
              // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
              defaultAttribute: {
                label: '印章外带',
                'true-label': 1,
                'false-label': 0
              },
              style: {}
            }
          ]
        },
        {
          id: 'querySelf',
          label: '',
          type: 'checkbox',
          checkbox: [
            {
              // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
              defaultAttribute: {
                label: '我的申请单据',
                'true-label': 1,
                'false-label': 0
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
      header: listApproving
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

  // 切换tab
  function tabChange(activeName) {
    console.log(activeName)
    state.componentsTable.header = tableHeaders.value[activeName]
    currentActiveName.value = activeName
    nextTick(() => {
      jyTable.value.reloadData()
    })

    // 批量
    if (
      activeName === 'listApproving' ||
      activeName === 'listUseDone' ||
      activeName === 'listUsing'
    ) {
      state.componentsBatch.data = [
        {
          name: '批量作废'
        }
      ]
    } else if (
      activeName === 'listFileVerification' ||
      activeName === 'listNoResult' ||
      activeName === 'listNotUse' ||
      activeName === 'listNoUse' ||
      activeName === 'listResultDone'
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
      activeName === 'listApproving' ||
      activeName === 'listFileVerification' ||
      activeName === 'listNoResult' ||
      activeName === 'listNotUse' ||
      activeName === 'listNoUse' ||
      activeName === 'listResultDone' ||
      activeName === 'listUseDone'
    ) {
      state.componentsTitle.more.data = [
        {
          name: '查看已作废的单据'
        },
        {
          name: '导出台账'
        }
      ]
    } else if (activeName === 'listUsing') {
      state.componentsTitle.more.data = [
        {
          name: '查看已作废的单据'
        }
      ]
    }

    // 搜索条件
    if (
      activeName === 'listApproving' ||
      activeName === 'listFileVerification' ||
      activeName === 'listNoResult' ||
      activeName === 'listUsing'
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
    } else if (activeName === 'listNotUse') {
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
    } else if (
      activeName === 'listNoUse' ||
      activeName === 'listResultDone' ||
      activeName === 'listUseDone'
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

  onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
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
