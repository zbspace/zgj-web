<!--
* @Descripttion 审批流程
* @FileName approvalFlow.vue
* @Author Guanpf
* @LastEditTime 2023-03-13 17:55:42
!-->
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
            :activeName="state.componentsTabs.activeName"
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
            @clickSubmit="clickSubmit"
          >
          </componentsSearchForm>
        </div>
      </template>
      <template #batch>
        <div class="batch">
          <componentsBatch
            :tableHeader="state.componentsTable.header"
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
            :loading="state.componentsTable.loading"
            @selection-change="selectionChange"
            @custom-click="customClick"
            @cellClick="cellClick"
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
    <!-- <JyTable
      url="/queryTask/todo"
      ref="table"
      :needAutoRequest="false"
      :componentsSearchForm="state.componentsSearchForm"
      :componentsTableHeader="state.componentsTable.header"
      :componentsBatch="state.componentsBatch"
      :queryParams="queryParams"
      tableClick="sealName"
      @cellClick="cellClick"
      @customClick="customClick"
      @clickBatchButton="clickBatchButton"
    >
      <template #title>
        <div class="title">
          <div>流程审批</div>
          <div class="title-more">
            <div class="title-more-add">
              <el-button type="primary">导出台账</el-button>
            </div>
            <div class="title-more-down"> </div>
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
    </JyTable> -->
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
      :show="dialogProcess.show"
      :params="state.params"
      :title="dialogProcess.title"
      @on-cancel="closeDetail"
      @on-confirm="handelSubmit"
    ></ApprovalDetail>
  </div>
</template>
<script setup>
  import { ref, reactive, onBeforeMount, onMounted } from 'vue'
  import JyTable from '@/views/components/JyTable.vue'
  import componentsTable from '../../components/table'
  import componentsSearchForm from '../../components/searchForm'
  import componentsPagination from '../../components/pagination.vue'
  import componentsTabs from '../../components/JyTabs.vue'
  import componentsLayout from '../../components/Layout.vue'
  import componentsBatch from '@/views/components/batch.vue'
  import componentsDocumentsDetails from '../../components/documentsDetails.vue'
  import RecordSealToReviewJson from '@/views/addDynamicFormJson/RecordSealToReview.json'
  import ApprovalDetail from '@/views/frontDesk/approvalFlow/modules/approvalDetail.vue'
  // import ApprovalJson from '@/views/addDynamicFormJson/Approval.json'
  import toDoHeaderJson from '@/views/tableHeaderJson/frontDesk/approvalFlow/approvalFlowTodo.json'
  import DoneHeaderJson from '@/views/tableHeaderJson/frontDesk/approvalFlow/approvalFlowDone.json'
  import dayjs from 'dayjs'
  import { NodeButtonApi } from '@/api/flow/NodeButtonApi'
  import { QueryTaskApi } from '@/api/flow/QueryTaskApi'
  import { InstanceApi } from '@/api/flow/InstanceApi'
  import formApi from '@/api/system/formManagement/index'
  const dialogProcess = reactive({
    show: false,
    title: '处理',
    formJson: RecordSealToReviewJson
  })
  // const submitLibraryForm = type => {
  //   if (!type) {
  //     vFormLibraryRef.value.resetForm()
  //     return
  //   }
  //   vFormLibraryRef.value
  //     .getFormData()
  //     .then(formData => {
  //       alert(JSON.stringify(formData))
  //       // fromState.showDialog = false
  //     })
  //     .catch(error => {
  //       // Form Validation failed
  //       // ElMessage.error(error)
  //       console.log(error)
  //     })
  // }
  // 动态表单版本Id
  const formVersionId = ref('')
  // 动态表单Id
  const formMessageId = ref('')
  // 流程版本Id
  const flowVersionId = ref('')
  // 流程Id
  const flowMessageId = ref('')
  const showDialog = ref(false)
  const state = reactive({
    searchSelected: [],
    params: {
      formData: {},
      formJson: {},
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
          name: '1'
        },
        {
          label: '已审批',
          name: '2'
        }
      ],
      activeName: '1'
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
      data: [
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
          type: 'dilog',
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
          type: 'dilog',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            type: 'JySelectSeal',
            multiple: false,
            placeholder: '+选择印章'
          },
          options: [],
          values: []
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
  const closeDetail = data => {
    dialogProcess.show = false
  }
  const handelSubmit = data => {
    dialogProcess.show = false
    getFormPage()
  }
  // 切换分页
  function tabChange(activeName) {
    // console.log(activeName);
    state.componentsTabs.activeName = activeName
    if (activeName === '1') {
      state.componentsTable.header = toDoHeaderJson
      state.componentsTable.data = []
    } else if (activeName === '2') {
      state.componentsTable.header = DoneHeaderJson
      state.componentsTable.data = []
    }

    // 查询条件
    if (activeName === '1') {
      state.componentsSearchForm.data = [
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
          type: 'dilog',
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
          type: 'dilog',
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
    } else if (activeName === '2') {
      state.componentsSearchForm.data = [
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
          type: 'dilog',
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
          type: 'dilog',
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
    }
    getFormPage()
  }
  const addSignModeChange = item => {}
  // 当选择项发生变化时会触发该事件
  function selectionChange(selection) {
    console.log(selection)
    state.componentsBatch.selectionData = selection
    if (state.componentsBatch.selectionData.length > 0) {
      state.componentsBatch.defaultAttribute.disabled = false
    } else {
      state.componentsBatch.defaultAttribute.disabled = true
    }
  }

  // 点击表格按钮
  function customClick(row, column, cell, event) {
    console.log(column)
    dialogProcess.title = cell.name
    if (cell.name === '处理') {
      dialogProcess.formJson = RecordSealToReviewJson
    }
    if (cell.name === '审批') {
      state.params.instanceId = column.instanceId
      state.params.taskId = column.taskId
      state.params.approvalMode = column.approvalMode
      state.params.instanceStatus = column.instanceStatus
      state.params.approvalMode = column.approvalMode
      getDetail(column.instanceId.toString())
    }
  }
  /**
   * 获取当前流程模型详情
   */
  const getDetail = instanceId => {
    const params = {
      instanceId
    }
    InstanceApi.detail(params)
      .then(data => {
        console.log(data)
        console.log(JSON.parse(data.formJson))
        state.params.formData = JSON.parse(data.formJson)
        state.params.modelName = data.modelName
        state.params.modelId = data.modelId
        state.params.nodeId = data.nodeId
        state.params.definitionId = data.definitionId
        formVersionId.value = state.params.formData.formVersionId
        getFormDataJson()
        // attrState.instanceName = data.instanceName
        // loading.value = false
        // initAffix()
        if (state.params.instanceStatus === 1) {
          getButtons()
        }

        dialogProcess.show = true
        dialogProcess.title = '审批'
        console.log(dialogProcess.show)
      })
      .catch(() => {
        // loading.value = false
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
      console.log('getButtons', state.params.buttons)
    }
  }
  /**
   * 获取动态表单信息
   */
  const getFormDataJson = () => {
    formApi
      .queryColumInfoByFormId({ formVersionId: formVersionId.value })
      .then(res => {
        state.params.formJson = res.data
        console.log('getFormDataJson', res)
        const d = handelData(state.params.formData, state.params.formJson)
        state.params.detailData = d
        console.log('formJson', d)
      })
  }
  /**
   * 处理表单详情数据
   * @param {*} formData
   * @param {*} formJson
   */
  const handelData = (formData, formJson) => {
    const formTableData = []
    const modelNameArr = []
    // formJson.forEach(item => {
    //   modelNameArr.push(item.formColumnModel ? item.formColumnModel : '其他')
    // })
    formJson.forEach(v => {
      modelNameArr.push(v.formColumnModel ? v.formColumnModel : '其他')
      for (const item in formData) {
        if (v.formColumnNo === item) {
          if (v.formColumnNo === 'sealName') {
            if (formData[item].length > 0) {
              formData[item].forEach((cv, k) => {
                formTableData.push({
                  label: `印章名称${k + 1}`,
                  value: cv.seal,
                  type: v.formColumnModel ? v.formColumnModel : '其他'
                })
              })
            }
          } else if (v.formColumnNo === 'applicantInfo') {
            for (const i in formData[item]) {
              console.log(i)
              if (i === 'applyOrganName') {
                formTableData.push({
                  label: '所属部门',
                  value: formData[item][i],
                  type: v.formColumnModel ? v.formColumnModel : '其他'
                })
              } else if (i === 'applyUserName') {
                formTableData.push({
                  label: '申请人员',
                  value: formData[item][i],
                  type: v.formColumnModel ? v.formColumnModel : '其他'
                })
              }
            }
          } else if (v.formColumnNo === 'contactUnit') {
            const organNameList = []
            if (formData[item].length > 0) {
              formData[item].forEach((cv, k) => {
                organNameList.push(cv.organName)
              })
              formTableData.push({
                label: `往来单位`,
                value: organNameList.join(','),
                type: v.formColumnModel ? v.formColumnModel : '其他'
              })
            }
          } else if (v.formColumnNo === 'limitTimeSeal') {
            formTableData.push({
              label: `限时用印`,
              value: formData[item] === 1 ? '是' : '否',
              type: v.formColumnModel ? v.formColumnModel : '其他'
            })
          } else if (v.formColumnNo === 'usesealBesides') {
            formTableData.push({
              label: `印章外带`,
              value: formData[item] ? '是' : '否'
            })
          } else if (v.formColumnNo === 'sealFile') {
            if (formData[item].fileList.length > 0) {
              formData[item].fileList.forEach((cv, k) => {
                formTableData.push({
                  label: `文件名称`,
                  value: cv.name,
                  type: v.formColumnModel ? v.formColumnModel : '其他'
                })
              })
            }
          } else if (v.formColumnNo === 'remoteSeal') {
            formTableData.push({
              label: v.formColumnName,
              value: formData[item] ? '是' : '否',
              type: v.formColumnModel ? v.formColumnModel : '其他'
            })
          } else if (v.formColumnNo === 'videoSeal') {
            formTableData.push({
              label: v.formColumnName,
              value: formData[item] ? '是' : '否',
              type: v.formColumnModel ? v.formColumnModel : '其他'
            })
          } else {
            formTableData.push({
              label: v.formColumnName,
              value: formData[item],
              type: v.formColumnModel ? v.formColumnModel : '其他'
            })
          }
        }
      }
    })
    const allArr = []
    const newModeNames = Array.from(new Set(modelNameArr))
    newModeNames.forEach(item => {
      const obj = {
        title: item,
        data: [],
        labelStyle: {
          width: '8rem'
        }
      }
      formTableData.forEach(v => {
        if (v.type === item) {
          obj.data.push(v)
        }
      })
      allArr.push(obj)
    })
    console.log('allArr', allArr)
    return allArr
  }
  const cellClick = (row, column, cell, event) => {
    if (column.property === 'instanceTitle') {
      state.componentsDocumentsDetails.show = true
    }
  }
  const clickSubmit = (item, index) => {
    if (item.id === 'reset') {
      state.componentsSearchForm.data.forEach(element => {
        delete state.searchForm.data[element]
      })
    }
    getFormPage()
  }
  // 点击搜索表单
  function clickElement(item, index) {
    // console.log(item, index)
  }
  // 获取表格列表
  const getFormPage = () => {
    const searchData = state.componentsSearchForm.data
    const queryParams = {}
    searchData.forEach(item => {
      if (item.type === 'picker') {
        if (item.pickerType === 'date') {
          if (item.value) {
            queryParams.applyStartTime = dayjs(item.value[0]).format(
              'YYYY-MM-DD HH:mm:ss'
            )
            queryParams.applyEndTime = dayjs(item.value[1]).format(
              'YYYY-MM-DD HH:mm:ss'
            )
          }
        }
      }
      queryParams[item.id] = item.value
    })
    queryParams.pageNo = state.componentsPagination.index || 1
    queryParams.pageSize = state.componentsPagination.pageNumber || 10
    state.componentsTable.loading = true
    if (state.componentsTabs.activeName === '1') {
      queryTodoTask(queryParams)
    } else {
      queryDoneTask(queryParams)
    }
  }
  /**
   *查询待审批
   * @param {*} queryParams
   */
  const queryTodoTask = queryParams => {
    QueryTaskApi.queryTodoTask(queryParams).then(
      res => {
        console.log(res)
        state.componentsTable.data = res.records
        state.componentsPagination.data.amount = res.total
        state.componentsPagination.defaultAttribute.total = res.total
        state.componentsTable.loading = false
      },
      () => {
        state.componentsTable.loading = false
      }
    )
  }
  /**
   * 查询已审批
   * @param {*} queryParams
   */
  const queryDoneTask = queryParams => {
    QueryTaskApi.queryDoneTask(queryParams).then(
      res => {
        console.log(res)
        state.componentsTable.data = res.records
        state.componentsPagination.data.amount = res.total
        state.componentsPagination.defaultAttribute.total = res.total
        state.componentsTable.loading = false
        state.componentsTable.loading = false
      },
      () => {
        state.componentsTable.loading = false
      }
    )
  }
  onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
  })
  onMounted(() => {
    getFormPage()
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
