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
      :computedData="
        currentActiveName === 'listApproving' ? state.computedData : []
      "
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
                    src="@/assets/svg/gengduo-caozuo.svg"
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
      centerBtn
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
    <!-- 单个操作 -->
    <actionOneDialog
      v-model="state.JyElMessageBox.show"
      :JyElMessageBox="state.JyElMessageBox"
      @update:modelValue="state.JyElMessageBox.show"
      @submitElMessageBox="submitElMessageBox"
    ></actionOneDialog>
  </div>
</template>
<script setup>
  import { ref, reactive, onBeforeMount, onMounted, nextTick } from 'vue'
  import JyTable from '@/views/components/JyTable.vue'
  import componentsTabs from '@/views/components/JyTabs.vue'
  import componentsDocumentsDetails from '@/views/components/documentsDetails.vue'
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
  import sealApplyIntellect from '@/api/frontDesk/printControl/sealApplyIntellect'
  import actionOneDialog from '@/views/components/actionOneDialog.vue'
  import { ApproverApi } from '@/api/flow/ApproverApi'
  import listApprovingJson from '@/views/frontDesk/PrintControlManagement/recordWithSeal/searchFormJson/listApprovingJson'
  import listNotUseJson from '@/views/frontDesk/PrintControlManagement/recordWithSeal/searchFormJson/listNotUseJson'
  import listFileVerificationJson from '@/views/frontDesk/PrintControlManagement/recordWithSeal/searchFormJson/listFileVerificationJson'
  import { messageSuccess } from '@/hooks/useMessage'

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
    vFormLibraryRef.value.getFormData().then(formData => {
      alert(JSON.stringify(formData))
      // fromState.showDialog = false
    })
  }
  const state = reactive({
    componentsTitle: {
      more: {
        data: [
          {
            name: '查看已作废的单据'
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
      data: listApprovingJson,
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
      type: '',
      column: {},
      flag: '',
      show: false,
      header: {
        data: ''
      },
      content: {
        data: ''
      }
    },
    computedData: [
      // {
      //   computedData: 'instanceId',
      //   prop: 'approvalStatus',
      //   request: {
      //     url: '/ruInstance/detail',
      //     method: 'GET'
      //   }
      // }
    ]
  })
  // 点击表格单元格
  function cellClick(row, column, cell, event) {
    if (column.property === 'useSealFileName') {
      state.componentsDocumentsDetails.show = true
      sealApplyIntellect
        .sealBaseInfo({
          useSealApplyId: row.useSealApplyId
        })
        .then(res => {
          const data = res.data
          const detail = [
            {
              label: '文件名称',
              value: data.useSealFileName
            },
            {
              label: '单据编码',
              value: data.useSealApplyNo
            },
            {
              label: '文件类型',
              value: data.fileTypeName
            },
            {
              label: '文件份数',
              value: (data.useSealFileNum || 0) + '份'
            },
            {
              label: '金额',
              value: data.totalMoney || '-'
            },
            {
              label: '申请事由',
              value: data.useSealInfo
            },
            {
              label: '盖章码',
              value: data.sealCode || '-'
            },
            {
              label: '申请人员',
              value: data.applyUserName
            },
            {
              label: '申请时间',
              value: data.applyDatetime
            },
            {
              label: '所属部门',
              value: data.applyOrganName
            },
            {
              label: '单据状态',
              value:
                data.useSealStateId === 'APPROVAL'
                  ? '用印审批中'
                  : data.useSealStateId === 'USING'
                  ? '智能用印中'
                  : '',
              iconPath: '@/assets/svg/common/yuan-lv.svg',
              iconStyle: {},
              valStyle: {
                color: 'var(--jy-success-6)'
              }
            }
          ]
          if (data.listSeal.length) {
            if (data.listSeal.length === 1) {
              detail.splice(
                detail.length - 5,
                0,
                {
                  label: '印章名称',
                  value: data.listSeal[0].useSealApplySealInfoDto.sealName
                },
                {
                  label: '常规盖章',
                  value:
                    data.listSeal[0].useSealApplySealNumDto.applySealNum + '次'
                }
              )
            } else {
              data.listSeal.forEach((item, index) => {
                detail.splice(
                  detail.length - 5,
                  0,
                  {
                    label: `印章${index + 1}名称`,
                    value: item.useSealApplySealInfoDto.sealName
                  },
                  {
                    label: '常规盖章',
                    value: item.useSealApplySealNumDto.applySealNum + '次'
                  }
                )
              })
            }
          }
          state.componentsDocumentsDetails.visible[0].basicInformation = {
            show: true,
            data: detail
          }
        })
      sealApplyIntellect
        .intellect({
          useSealApplyId: row.useSealApplyId
          // useSealApplyId: '1641248927057453058'
        })
        .then(res => {
          console.log(res.data)
          if (res.data?.length) {
            state.componentsDocumentsDetails.visible[0].IntelligentPrinting = {
              show: true,
              data: res.data
            }
          } else {
            state.componentsDocumentsDetails.visible[0].IntelligentPrinting = {
              show: false,
              data: []
            }
          }
        })
      sealApplyIntellect
        .attachment({
          useSealApplyId: row.useSealApplyId
          // useSealApplyId: '222'
        })
        .then(res => {
          console.log(res.data)
          if (res.data.fileInfos?.length || res.data.fileInfoAdds?.length) {
            state.componentsDocumentsDetails.visible[0].accessory = {
              show: true,
              printedData: res.data.fileInfos,
              additionalData: res.data.fileInfoAdds
            }
          } else {
            state.componentsDocumentsDetails.visible[0].accessory = {
              show: false,
              printedData: [],
              additionalData: []
            }
          }
        })
    }
  }
  // 点击表格按钮
  function customClick(row, column, cell, event) {
    state.JyElMessageBox.type = cell.name
    state.JyElMessageBox.column = column
    if (cell.name === 't-zgj-Revocation') {
      state.JyElMessageBox.header.data = '提示？'
      state.JyElMessageBox.content.data =
        '撤销后本次申请送审将被取消，请问确定要撤销吗？'
      state.JyElMessageBox.show = true
    }
    if (cell.name === 't-zgj-Void') {
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

  const submitElMessageBox = () => {
    if (state.JyElMessageBox.type === 't-zgj-Revocation') {
      console.log(state.JyElMessageBox.column)
      ApproverApi.withdraw({
        instanceId: state.JyElMessageBox.column.gunsSysId
      })
        .then(() => {
          messageSuccess('撤销成功')
          jyTable.value.reloadData()
        })
        .finally(() => {
          state.JyElMessageBox.show = false
        })
    } else if (state.JyElMessageBox.type === 't-zgj-Void') {
      ApproverApi.withdraw({
        instanceId: state.JyElMessageBox.column.gunsSysId
      })
        .then(() => {
          sealApplyIntellect
            .invalid({
              sealUseApplyIds: state.JyElMessageBox.row.useSealApplyId
            })
            .then(() => {
              jyTable.value.reloadData()
            })
            .finally(() => {
              state.JyElMessageBox.show = false
            })
        })
        .finally(() => {
          state.JyElMessageBox.show = false
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
      state.componentsSearchForm.data = JSON.parse(
        JSON.stringify(listApprovingJson)
      )
    } else if (activeName === 'listNotUse') {
      state.componentsSearchForm.data = JSON.parse(
        JSON.stringify(listNotUseJson)
      )
    } else if (
      activeName === 'listNoUse' ||
      activeName === 'listResultDone' ||
      activeName === 'listUseDone'
    ) {
      state.componentsSearchForm.data = JSON.parse(
        JSON.stringify(listFileVerificationJson)
      )
    }

    nextTick(() => {
      jyTable.value.reloadData()
    })
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
