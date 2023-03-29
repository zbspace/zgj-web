<!-- 用印记录 -->
<template>
  <div class="PrintControlManagement-recordWithSeal">
    <JyTable
      url="/sealApply/listInvalid"
      ref="jyTable"
      method="POST"
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
          <div>已作废单据</div>
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
  import componentsDocumentsDetails from '../../components/documentsDetails.vue'
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

  const router = useRouter()
  const showDepPerDialog = ref(false)
  const dialogProcess = reactive({
    show: false,
    title: '流程终止',
    formJson: dialogProcessJson
  })
  const vFormLibraryRef = ref(null)
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
        }
      ],
      butData: [
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
      row: '',
      flag: '',
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
    if (column.property === 'useSealFileName') {
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
              iconPath: '@/assets/svg/yuan-lv.svg',
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
          state.componentsDocumentsDetails.show = true
        })
    }
  }
  // 点击表格按钮
  function customClick(row, column, cell, event) {
    state.JyElMessageBox.type = cell.name
    state.JyElMessageBox.row = row
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
      ApproverApi.withdraw({
        taskId: state.JyElMessageBox.row.taskId
      })
        .then(() => {
          sealApplyIntellect
            .cancel({
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
    } else if (state.JyElMessageBox.type === 't-zgj-Void') {
      ApproverApi.withdraw({
        taskId: state.JyElMessageBox.row.taskId
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
