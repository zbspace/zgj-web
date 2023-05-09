<!--
* @Descripttion 审批流程
* @FileName approvalFlow.vue
* @Author Guanpf
* @LastEditTime 2023-03-13 17:55:42
!-->
<template>
  <div class="approvalFlow-approvalFlow">
    <JyTable
      :url="`/queryTask/${state.componentsTabs.activeName}`"
      ref="table"
      hasTabs
      :componentsSearchForm="state.componentsSearchForm"
      :componentsTableHeader="state.componentsTable.header"
      :componentsBatch="state.componentsBatch"
      tableClick="instanceTitle"
      @cellClick="cellClick"
      @customClick="customClick"
      :handleApprovalStatus="true"
    >
      <template #title>
        <div class="title">
          <div> {{ $t('t-zgj-workflow.ApprovalProcess') }} </div>
          <div class="title-more">
            <div class="title-more-add">
              <el-button type="primary">{{
                $t('t-zgj-F_SEAL_INFO_EXPORT_STANDING_BOOK')
              }}</el-button>
            </div>
          </div>
        </div>
      </template>
      <template #tabs>
        <div>
          <componentsTabs
            :activeName="state.componentsTabs.activeName"
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
    <ApprovalDetail
      v-if="dialogProcess.show"
      ref="drawer"
      :show="dialogProcess.show"
      @update:show="show = $event"
      :params="state.params"
      :title="dialogProcess.title"
      @on-cancel="closeDetail"
      @on-confirm="handelSubmit"
    ></ApprovalDetail>
  </div>
</template>
<script setup>
  import { ref, reactive, onMounted } from 'vue'
  import componentsTabs from '../../components/JyTabs.vue'
  import componentsDocumentsDetails from '../../components/documentsDetails.vue'
  import RecordSealToReviewJson from '@/views/addDynamicFormJson/RecordSealToReview.json'
  import ApprovalDetail from '@/views/frontDesk/approvalFlow/modules/approvalDetail.vue'
  import toDoHeaderJson from '@/views/tableHeaderJson/frontDesk/approvalFlow/approvalFlowTodo.json'
  import DoneHeaderJson from '@/views/tableHeaderJson/frontDesk/approvalFlow/approvalFlowDone.json'
  import { NodeButtonApi } from '@/api/flow/NodeButtonApi'
  import { InstanceApi } from '@/api/flow/InstanceApi'
  import FormInfoApi from '@/api/system/flowManagement'
  import apiForm from '@/api/system/formManagement'
  import { useVformInfoStore } from '@/store/vform'
  import JyTable from '@/views/components/JyTable.vue'

  const vformInfoStore = useVformInfoStore()
  const dialogProcess = ref({
    show: false,
    title: 't-zgj-Approval',
    formJson: RecordSealToReviewJson
  })
  const drawer = ref(null)
  // 动态表单版本Id
  const formVersionId = ref('')
  const state = reactive({
    searchSelected: [],
    approvalModes: {
      1: '审批中',
      2: '会签中',
      3: '会签中',
      4: '或签中'
    },
    params: {
      formJson: null,
      formData: {},
      taskId: '',
      // 最新实例ID
      instanceId: '',
      approvalMode: '',
      // 模型名称
      modelName: '',
      // 模型Id
      modelId: '',
      // 节点Id
      nodeId: '',
      // 最新定义ID
      definitionId: '',
      // 按钮列表
      buttons: [],
      detailData: [],
      basicInformation: {
        title: '基本信息',
        show: true,
        data: [
          {
            label: '单据名称',
            value: '上海建筑材料清单合同明细'
          },
          {
            label: '文件类型：',
            value: '1份'
          },
          {
            label: '金额：',
            value: '110,88,00'
          },
          {
            label: '申请事由：',
            value: '20次'
          },
          {
            label: '印章名称：',
            value: '销售合同'
          },
          {
            label: '常规盖章：',
            value: '20次'
          },
          {
            label: '盖章码：',
            value: '554778'
          },
          {
            label: '申请人员：',
            value: '20次'
          },
          {
            label: '申请时间：',
            value: '2022-11-12 19:00:12'
          },
          {
            label: '所属部门：',
            value: '20次'
          }
        ],
        labelStyle: {
          width: '8rem'
        }
      }
    },
    componentsTabs: {
      data: [
        {
          label: '待审批',
          name: 'todo'
        },
        {
          label: '已审批',
          name: 'done'
        }
      ],
      activeName: 'todo'
    },
    componentsDocumentsDetails: {
      show: false,
      visible: [
        {
          label: '用印详情',
          name: 'approval-process'
        },
        {
          label: '保管记录',
          name: 'Record-of-custody'
        },
        {
          label: '操作记录',
          name: 'operating-record'
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
      data: [],
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
          name: 't-zgj-query',
          label: '查询',
          type: 'click',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            type: 'primary'
          },
          style: {}
        },
        {
          id: 'reset',
          name: 't-zgj-reset',
          label: '重置',
          type: 'click',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {},
          style: {}
        }
      ]
    },
    componentsTable: {
      header: toDoHeaderJson,
      data: [],
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        stripe: true,
        'header-cell-style': {
          background: 'var(--jy-color-fill--3)'
        },
        'cell-style': ({ row, column, rowIndex, columnIndex }) => {
          if (column.property === 'instanceTitle') {
            return {
              color: 'var(--jy-info-6)',
              cursor: 'pointer'
            }
          }
        }
      },
      loading: false
    },
    componentsPagination: {
      data: {
        amount: 0,
        index: 1,
        pageNumber: 10
      },
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        layout: 'prev, pager, next, jumper',
        total: 0,
        'page-sizes': [10, 50, 400],
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
  const table = ref(null)
  const closeDetail = data => {
    dialogProcess.value.show = false
  }
  const handelSubmit = data => {
    dialogProcess.value.show = false
    table.value.reloadData()
  }
  const todoSearchForm = [
    {
      id: 'keyword',
      label: '关键词',
      type: 'input',
      inCommonUse: true,
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        placeholder: '单据名称'
      }
    },
    {
      id: 'picker',
      label: '申请时间',
      type: 'picker',
      pickerType: 'date',
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
      id: 'applyOrganId',
      label: '申请部门',
      type: 'derivable',
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        placeholder: '+选择部门'
      }
    },
    {
      id: 'applyTypeId',
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
      ],
      defaultAttribute: {
        multiple: false
      }
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
      id: 'sealIds',
      label: '印章名称',
      type: 'dialog',
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        type: 'JySelectSeal',
        multiple: false,
        placeholder: '+选择印章'
      },
      options: [],
      values: []
    }
  ]
  const doneSearchForm = [
    {
      id: 'keyword',
      label: '关键词',
      type: 'input',
      inCommonUse: true,
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        placeholder: '单据名称'
      }
    },
    {
      id: 'picker',
      label: '申请时间',
      type: 'picker',
      pickerType: 'date',
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
      id: 'approvalStatus',
      label: '审批状态',
      type: 'select',
      options: [
        {
          label: '未审批',
          value: '1'
        },
        {
          label: '已审批',
          value: '2'
        }
      ],
      defaultAttribute: {
        multiple: false
      }
    },
    {
      id: 'applyOrganId',
      label: '申请部门',
      type: 'derivable',
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        type: 'organ',
        placeholder: '+选择部门'
      },
      options: [],
      values: []
    },
    {
      id: 'applyTypeId',
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
      ],
      defaultAttribute: {
        multiple: false
      }
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
      id: 'sealIds',
      label: '印章名称',
      type: 'dialog',
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        type: 'JySelectSeal',
        multiple: false,
        placeholder: '+选择印章'
      },
      options: [],
      values: []
    }
  ]
  state.componentsSearchForm.data = todoSearchForm
  // 切换 tab
  function tabChange(activeName) {
    state.componentsTabs.activeName = activeName
    if (activeName === 'todo') {
      state.componentsTable.header = toDoHeaderJson
      state.componentsTable.data = []
    } else if (activeName === 'done') {
      state.componentsTable.header = DoneHeaderJson
      state.componentsTable.data = []
    }

    // 查询条件
    if (activeName === 'todo') {
      state.componentsSearchForm.data = todoSearchForm
    } else if (activeName === 'done') {
      state.componentsSearchForm.data = doneSearchForm
    }
    table.value.reloadData()
  }
  // 点击关闭详情
  function clickClose() {
    state.componentsDocumentsDetails.show = false
  }

  // 点击表格按钮
  function customClick(row, column, cell, event) {
    dialogProcess.value.title = cell.name
    if (cell.name === 't-zgj-Approval') {
      state.params.instanceId = column.instanceId
      state.params.taskId = column.taskId
      state.params.approvalMode = column.approvalMode
      state.params.instanceStatus = column.instanceStatus
      state.params.approvalMode = column.approvalMode
      getDetail(column, 't-zgj-Approval')
    }
    if (cell.name === 't-zgj-F_WORKFLOW_RE_APPROVAL') {
      state.params.instanceId = column.instanceId
      state.params.taskId = column.taskId
      state.params.approvalMode = column.approvalMode
      state.params.instanceStatus = column.instanceStatus
      state.params.approvalMode = column.approvalMode
      getDetail(column, 't-zgj-F_WORKFLOW_RE_APPROVAL')
    }
  }
  /**
   * 获取当前流程模型详情
   */
  const getDetail = (column, title) => {
    const params = {
      instanceId: column.instanceId
    }
    InstanceApi.detail(params)
      .then(data => {
        state.params.formData = JSON.parse(data.formJson)
        state.params.modelName = data.modelName
        state.params.modelId = data.modelId
        state.params.nodeId = data.nodeId
        state.params.definitionId = data.definitionId
        formVersionId.value = state.params.formData.formVersionId

        if (state.params.instanceStatus === 1) {
          getButtons()
        }
        getFormInfo(column, title)
        getPrivileges(data.privileges)
      })
      .catch(() => {})
  }

  // 获取动态表单模版
  const getFormInfo = (column, title) => {
    const params = {
      modelId: column.modelId,
      definitionId: column.definitionId
    }
    FormInfoApi.queryByGunsId(params).then(res => {
      state.params.formJson = JSON.parse(res.data)
      dialogProcess.value.show = true
      dialogProcess.value.title = title
    })
  }
  /**
   * 按钮
   */
  const getButtons = async () => {
    const params = {
      modelId: state.params.modelId,
      definitionId: state.params.definitionId,
      nodeId: state.params.nodeId
    }
    const result = await NodeButtonApi.findList(params)
    if (result) {
      // 按钮
      state.params.buttons = result.filter(t => t.checked)
    }
  }

  const getPrivileges = attr => {
    const disableWidgets = []
    attr.forEach(item => {
      if (item.readable) {
        disableWidgets.push(item.fieldKey)
      }
    })
    const hideWidgets = []
    attr.forEach(item => {
      if (item.displayable) {
        hideWidgets.push(item.fieldKey)
      }
    })
    state.params.disableWidgets = disableWidgets
    state.params.hideWidgets = hideWidgets
  }

  const cellClick = (row, column, cell, event) => {
    if (column.property === 'instanceTitle') {
      state.componentsDocumentsDetails.show = true
    }
  }

  onMounted(() => {
    vformInfoStore.getMoneyType()
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

  .components-documentsDetails {
    margin: 0%;

    .ap-cont {
      height: 100%;
    }

    .ap-title {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .title-name-span {
        font-size: var(--jy-font-size-title-2);
      }

      .title-cion-img {
        width: 1rem;
        margin-right: 1rem;
        cursor: pointer;
      }

      .quanping {
        width: 1.2rem;
      }
    }

    .ap-Tabs {
      display: flex;

      .ap-Tabs-cont {
        flex-grow: 1;
      }

      .ap-Tabs-sub {
        width: 5rem;
        margin-bottom: 14px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        border-bottom: 1px solid var(--jy-color-border-2);

        .ap-Tabs-sub-icon {
          margin-right: 0.5rem;
        }

        .ap-Tabs-sub-text {
          cursor: pointer;
          color: var(-color-text-2);
        }
      }
    }

    .ap-cont-tabsCont {
      width: calc(100% + 18px);
      height: calc(100% - 80px);

      .arco-scrollbar {
        height: 100%;
      }

      .scrollbar-div {
        padding-right: 18px;
        box-sizing: border-box;
      }

      .ap-cont-box-title {
        border-bottom: 1px solid var(--jy-color-border-2);
        padding: 0rem 0 0rem 0.8rem;
        box-sizing: border-box;
        background: url(../../assets/svg/shuxian-after.svg) no-repeat left
          center;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 2.3rem;

        .ap-cont-box-title-label {
          font-size: var(--jy-font-size-title-1);
          font-weight: var(--jy-font-weight-400);
        }

        .ap-cont-box-title-xiazai {
          display: flex;
          align-items: center;

          .ap-cont-box-title-xiazai-icon {
            margin-right: 0.5rem;
          }

          .ap-cont-box-title-xiazai-text {
            color: var(--jy-color-text-2);
          }
        }

        .ap-cont-box-title-but {
          .ap-cont-box-title-but-box {
            display: flex;
            align-items: center;
          }

          .ap-cont-box-title-but-icon {
            width: 0.8rem;
            margin-right: 0.2rem;
          }
        }
      }

      .ap-cont-box-details {
        padding: 0.5rem 0;
        box-sizing: border-box;
      }

      .Details-of-Printing {
        .sealDetails-basic-information {
          .sealDetails-basic-information-details {
            display: flex;
            flex-flow: wrap;
            padding: 0.5rem 0;
            box-sizing: border-box;

            .sealDetails-basic-information-list {
              display: flex;
              align-items: center;
              width: 50%;
              padding: 0.5rem 0;
              box-sizing: border-box;

              .sealDetails-basic-information-list-label {
                width: 4.5rem;
                display: flex;
                justify-content: flex-end;
                color: var(--jy-color-text-3);
              }

              .sealDetails-basic-information-list-value {
                padding: 0rem 0 0rem 0.5rem;
                box-sizing: border-box;
              }
            }
          }
        }
      }

      .Particulars-of-Seal {
        .sealDetails-basic-information {
          .sealDetails-basic-information-details {
            display: flex;
            flex-flow: wrap;
            padding: 0.5rem 0;
            box-sizing: border-box;

            .sealDetails-basic-information-list {
              display: flex;
              align-items: center;
              width: 50%;
              padding: 0.5rem 0;
              box-sizing: border-box;

              .sealDetails-basic-information-list-label {
                width: 7rem;
                display: flex;
                justify-content: flex-end;
                color: var(--jy-color-text-3);
              }

              .sealDetails-basic-information-list-value {
                padding: 0rem 0 0rem 0.5rem;
                box-sizing: border-box;
              }
            }
          }
        }
      }

      .Details-of-Document {
        .sealDetails-basic-information {
          .sealDetails-basic-information-details {
            display: flex;
            flex-flow: wrap;
            padding: 0.5rem 0;
            box-sizing: border-box;

            .sealDetails-basic-information-list {
              display: flex;
              align-items: center;
              width: 50%;
              padding: 0.5rem 0;
              box-sizing: border-box;

              .sealDetails-basic-information-list-label {
                width: 7rem;
                display: flex;
                justify-content: flex-end;
                color: var(--jy-color-text-3);
              }

              .sealDetails-basic-information-list-value {
                padding: 0rem 0 0rem 0.5rem;
                box-sizing: border-box;
              }
            }
          }
        }
      }

      .Record-of-requisition {
        .ap-cont-ma {
          height: 3rem;
          display: flex;
          align-items: center;

          .ap-cont-ma-text {
            color: var(--jy-color-text-3);
          }

          .ap-cont-ma-value {
            color: var(--jy-primary-6);
            font-size: var(--jy-font-size-title-2);
          }
        }

        .SealInformation {
          .SealInformation-details-list {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 2.5rem;

            .SealInformation-details-list-cont {
              display: flex;
              align-items: center;

              .SealInformation-details-list-cont-icon {
                display: flex;
                align-items: center;
                margin-right: 0.5rem;
              }

              .SealInformation-details-list-cont-val {
                display: flex;
                align-items: center;

                .iconPathValue {
                  margin-right: 0.5rem;
                }
              }
            }
          }

          .SealInformation-details-image {
            .SealInformation-details-image-title {
              display: flex;
              align-items: center;
              height: 2.5rem;

              .SealInformation-details-image-title-icon {
                display: flex;
                align-items: center;
                margin-right: 0.5rem;
              }
            }

            .SealInformation-details-image-cont {
              display: flex;
              flex-flow: wrap;

              .SealInformation-details-image-cont-list {
                width: 50%;
                display: flex;
                min-width: 25rem;
                padding: 0.5rem 0;
                box-sizing: border-box;

                .SealInformation-details-image-cont-list-img {
                  position: relative;
                  width: auto;

                  .SealInformation-details-image-cont-list-img-icon {
                    position: absolute;
                    right: 0%;
                    top: 0%;
                    width: 40%;
                  }

                  .SealInformation-details-image-cont-list-img-time {
                    position: absolute;
                    bottom: 0%;
                    text-align: center;
                    width: 100%;
                    background-color: var(--jy-color-fill-65);
                    color: var(--jy-in-common-use-1);
                    height: 2rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  }
                }

                .SealInformation-details-image-cont-list-cont {
                  flex-grow: 1;
                  padding: 0 0.5rem;
                  box-sizing: border-box;
                  display: flex;
                  align-content: space-between;
                  flex-flow: wrap;

                  .SealInformation-details-image-cont-list-cont-list {
                    width: 100%;
                    display: flex;

                    .SealInformation-details-image-cont-list-cont-list-label {
                      width: 4.5rem;
                      display: flex;
                      justify-content: flex-end;
                      color: var(--jy-color-text-3);
                    }

                    .SealInformation-details-image-cont-list-cont-list-subValue {
                      display: flex;
                      align-items: center;
                      padding-left: 0.5rem;
                      box-sizing: border-box;

                      .SealInformation-details-image-cont-list-cont-list-subValue-icon {
                        margin-right: 0.2rem;
                      }

                      .SealInformation-details-image-cont-list-cont-list-subValue-text {
                        color: var(--jy-danger-6);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
