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
    <!-- 单据详情 -->
    <div class="ap-box">
      <componentsDocumentsDetails
        :show="state.componentsDocumentsDetails.show"
        :visible="state.componentsDocumentsDetails.visible"
        @clickClose="clickClose"
      >
      </componentsDocumentsDetails>
    </div>
    <!-- 处理弹窗 -->
    <JyDialog
      @update:show="dialogProcess.show = $event"
      :show="dialogProcess.show"
      :title="dialogProcess.title"
      :oneBtn="false"
      :confirmText="$t('t-zgj-operation.submit')"
      :concelText="$t('t-zgj-operation.cancel')"
      :height="700"
      :width="900"
      :footer="false"
    >
      <div class="ap-cont-tabsCont">
        <div class="scrollbar-div">
          <div class="ap-cont-box sealDetails-basic-information">
            <documentsDetailsPortion>
              <template #title>
                <div class="ap-cont-box-title-label">基本信息</div>
              </template>
              <template #content>
                <div>
                  <el-scrollbar style="height: 369px; overflow: auto">
                    <documentsDetailsInformationList
                      :data="state.ParticularsOfSeal.basicInformation.data"
                      :labelStyle="
                        state.ParticularsOfSeal.basicInformation.labelStyle
                      "
                    >
                    </documentsDetailsInformationList>
                  </el-scrollbar>
                </div>
              </template>
            </documentsDetailsPortion>
          </div>
        </div>
      </div>
      <div class="approval-footer">
        <!-- <v-form-render
          :form-json="dialogProcess.formJson"
          :form-data="dialogProcess.formJson"
          :option-data="dialogProcess.optionData"
          ref="vFormLibraryRef"
          :key="dialogProcess.title"
        >
        </v-form-render> -->
        <!-- <div class="select-person">
          <span>添加抄送</span>
          <div @click="showDepPerDialog = true">+请选择抄送人</div>
        </div> -->
        <el-form
          :model="state.form"
          :rules="state.rules"
          ref="vFormRef"
          label-width="100px"
        >
          <!-- <el-form-item label="审批选项">
            <el-radio-group>
              <el-radio :label="'1'" size="large">同意</el-radio>
              <el-radio :label="'2'" size="large">不同意</el-radio>
              <el-radio :label="'3'" size="large">转交</el-radio>
              <el-radio :label="'4'" size="large">加签</el-radio>
              <el-radio :label="'5'" size="large">征询他人意见</el-radio>
              <el-radio :label="'6'" size="large">退回</el-radio>
            </el-radio-group>
          </el-form-item> -->
          <el-form-item label="审批选项" prop="approvals">
            <el-radio-group v-model="state.form.approvals">
              <el-radio label="1">同意</el-radio>
              <el-radio label="2">不同意</el-radio>
              <el-radio label="3">转交</el-radio>
              <el-radio label="4">加签</el-radio>
              <el-radio label="5">征询他人意见</el-radio>
              <el-radio label="6">退回</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="下一步审批人">
            <span class="footer-approver">李旺</span>
            <span class="footer-approver">李旺</span>
            <span class="footer-approver">李旺</span>
            <span class="footer-approver">李旺</span>
          </el-form-item>
          <el-form-item label="添加抄送" prop="subOrganId">
            <div class="select-box-contBox">
              <el-checkbox
                v-model="checked"
                style="margin-right: 12px"
                size="mini"
              ></el-checkbox>
              <div class="footer-tagcon"
                ><el-tag
                  class="footer-tag"
                  closable
                  type="info"
                  v-for="item in state.searchSelected"
                  :key="item.id"
                  @close="delTags(item)"
                >
                  {{ item.name }}
                </el-tag>
                <!-- <el-tag
                  class="footer-tag"
                  closable
                  @close="delTags"
                  type="info"
                >
                  选中
                </el-tag> -->
              </div>
              <el-input
                class="ap-box-contBox-input width-100"
                type="hidden"
                v-model="state.form.subOrganId"
                placeholder=""
              />
              <div class="ap-box-contBox-icon">
                <el-icon
                  v-if="state.form.subOrganName"
                  style="margin-right: 5px"
                  color="#aaaaaa"
                  @click="clear('subOrgan')"
                  ><CircleClose
                /></el-icon>
                <img
                  @click="chooseOrgan('subOrgan', ['user'])"
                  class="ap-box-contBox-icon-img"
                  src="@/assets/svg/ketanchude.svg"
                  alt=""
                />
              </div>
            </div>
          </el-form-item>
          <el-form-item label="审批意见" prop="remark">
            <el-input
              v-model="state.form.remark"
              maxlength="100"
              show-word-limit
              type="textarea"
              placeholder="请输入"
            />
          </el-form-item>
        </el-form>
        <div class="footer-btns">
          <el-button type="primary" :loading="btnLoading" @click="sumitForm"
            >提交</el-button
          >
          <el-button @click="close">取消</el-button>
        </div>
      </div>
    </JyDialog>
    <!-- 人员选择  -->
    <kDepartOrPersonVue
      :show="showDepPerDialog"
      @update:show="showDepPerDialog = $event"
      v-if="showDepPerDialog"
      :tabsShow="['user']"
      @update:searchSelected="submitSelectDepart"
      :searchSelected="state.searchSelected"
    >
    </kDepartOrPersonVue>
  </div>
</template>
<script setup>
  import { ref, reactive, onBeforeMount, onMounted } from 'vue'
  import componentsTable from '../../components/table'
  import componentsSearchForm from '../../components/searchForm'
  import componentsPagination from '../../components/pagination.vue'
  import componentsTabs from '../../components/tabs.vue'
  import componentsLayout from '../../components/Layout.vue'
  import componentsBatch from '@/views/components/batch.vue'
  import componentsDocumentsDetails from '../../components/documentsDetails.vue'
  import RecordSealToReviewJson from '@/views/addDynamicFormJson/RecordSealToReview.json'
  // import ApprovalJson from '@/views/addDynamicFormJson/Approval.json'
  import kDepartOrPersonVue from '@/views/components/modules/KDepartOrPersonDialog'
  import documentsDetailsPortion from '@/views/components/documentsDetails/portion.vue'
  import documentsDetailsInformationList from '@/views/components/documentsDetails/informationList.vue'
  import dayjs from 'dayjs'
  import { ElMessage } from 'element-plus'
  import yuanLvSvg from '@/assets/svg/yuan-lv.svg'
  // import api from '@/api/frontDesk/approvalFlow/approvalFlow'
  import { ModelApi } from '@/api/flow/ModelApi'
  import { QueryTaskApi } from '@/api/flow/QueryTaskApi'
  import { InstanceApi } from '@/api/flow/InstanceApi'
  import { ApproverApi } from '@/api/flow/ApproverApi'

  const showDepPerDialog = ref(false)
  const dialogProcess = reactive({
    show: false,
    title: '处理',
    formJson: RecordSealToReviewJson
  })
  const vFormRef = ref(null)
  const btnLoading = ref(false)
  // 子组件
  const flowDesign = ref()
  // 模型id
  const modelId = ref(null)
  // 模型名称
  const modelName = ref('')
  // 最新定义ID
  const definitionId = ref(null)
  // 最新实例ID
  const instanceId = ref(null)
  const formData = ref(null)
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
  // 删除操作人
  const delTags = item => {
    console.log('delTags')
    for (let i = 0; i < state.searchSelected.length; i++) {
      console.log(state.searchSelected[i])
      if (item.id === state.searchSelected[i].id) {
        state.searchSelected.splice(i, 1)
      }
    }
  }
  // 提交审批
  const sumitForm = () => {
    console.log('提交')
    btnLoading.value = true
    vFormRef.value.validate(valid => {
      if (valid) {
        console.log(state.form.approvals)
        // ElMessage.success('审批成功')
        // btnLoading.value = false
        if (state.form.approvals === '1') {
          onAgree()
        } else if (state.form.approvals === '2') {
          onReject()
        }
      } else {
        ElMessage.error('校验失败')
      }
    })
  }
  const onReject = res => {
    const params = {
      instanceId: instanceId.value,
      modelId: modelId.value,
      formData: formData.value,
      definitionId: definitionId.value,
      remark: state.form.remark,
      suggest: 2
    }
    console.log(params)
    ApproverApi.reject(params)
      .then(result => {
        if (result.code === '00000') {
          console.info(result)
          dialogProcess.show = false
          getFormPage()
        }
        btnLoading.value = false
      })
      .catch(() => {
        btnLoading.value = false
      })
  }
  const onAgree = res => {
    const params = {
      instanceId: instanceId.value,
      modelId: modelId.value,
      formData: formData.value,
      definitionId: definitionId.value,
      remark: state.form.remark,
      suggest: 1
    }
    console.log(params)
    ApproverApi.agree(params)
      .then(result => {
        if (result.code === '00000') {
          console.info(result)
          dialogProcess.show = false
          getFormPage()
        }
        btnLoading.value = false
      })
      .catch(() => {
        btnLoading.value = false
      })
  }
  const state = reactive({
    searchSelected: [],
    detailInfo: {
      createTime: '2022-11-27 01:04:49',
      createUser: '1339550467939639299',
      updateTime: '2023-02-17 11:51:27',
      updateUser: '1339550467939639299',
      modelId: '1596550552731209730',
      definitionId: '1638009270522269697',
      categoryId: '1596550398875750401',
      modelName: '合同审批',
      modelKey: 'hetong',
      modelType: null,
      modelIcon: 'A(1).png',
      remark: null,
      modelSort: null,
      currentVersion: '1.2',
      statusFlag: 1,
      versionFlag: '2',
      tenantId: null,
      delFlag: 'N',
      formIdList: ['1589976128312606721'],
      formDefinitions: [
        {
          createTime: '2022-11-08 21:40:24',
          createUser: '1339550467939639299',
          updateTime: null,
          updateUser: null,
          formDefinitionId: '1589976128312606721',
          formModelId: '1589976128245497857',
          formModelCode: 'ContractReview',
          formModelRef: 'contractReview',
          flowDefinitionName: '合同评审',
          preDefinitionId: '0',
          formJson: null,
          definitionVersion: '1.0',
          statusFlag: null,
          versionFlag: null,
          delFlag: null,
          tenantId: null
        }
      ],
      assignees: ['1339550467939639299'],
      node: {
        createTime: '2023-03-21 10:46:58',
        createUser: '1339550467939639299',
        updateTime: null,
        updateUser: null,
        nodeId: '1638009270539046913',
        modelId: '1596550552731209730',
        definitionId: '1638009270522269697',
        nodePid: null,
        nodeName: '发起人',
        nodeType: 0,
        addable: true,
        deletable: false,
        error: false,
        content: '已设置',
        remark: null,
        nodeStatus: null,
        delFlag: 'N',
        versionFlag: '1',
        tenantId: null,
        attr: null,
        childNode: null,
        conditionNodes: [],
        privileges: [],
        approverGroups: [],
        conditionGroup: [],
        buttons: [
          {
            createTime: '2023-03-21 10:46:57',
            createUser: '1339550467939639299',
            updateTime: null,
            updateUser: null,
            buttonId: '1638009270539046919',
            modelId: '1596550552731209730',
            definitionId: '1638009270522269697',
            nodeId: '1638009270539046913',
            buttonType: 1,
            buttonName: '保存',
            buttonCode: 'save',
            checked: true,
            disabled: false,
            color: 'default',
            content: '发起节点保存操作，审批节点下无保存操作，可在草稿箱查看',
            statusFlag: 1,
            versionFlag: '0',
            delFlag: 'N',
            tenantId: null
          },
          {
            createTime: '2023-03-21 10:46:57',
            createUser: '1339550467939639299',
            updateTime: null,
            updateUser: null,
            buttonId: '1638009270539046920',
            modelId: '1596550552731209730',
            definitionId: '1638009270522269697',
            nodeId: '1638009270539046913',
            buttonType: 1,
            buttonName: '提交',
            buttonCode: 'submit',
            checked: false,
            disabled: false,
            color: 'primary',
            content:
              '发起节点填写完申请单，,提交流程到下一步，可在我发起的查看',
            statusFlag: 1,
            versionFlag: '0',
            delFlag: 'N',
            tenantId: null
          },
          {
            createTime: '2023-03-21 10:46:57',
            createUser: '1339550467939639299',
            updateTime: null,
            updateUser: null,
            buttonId: '1638009270539046921',
            modelId: '1596550552731209730',
            definitionId: '1638009270522269697',
            nodeId: '1638009270539046913',
            buttonType: 1,
            buttonName: '同意',
            buttonCode: 'agree',
            checked: false,
            disabled: true,
            color: 'success',
            content: '审批节点同意该审核之操作，审批通过，可在我已办查看',
            statusFlag: 1,
            versionFlag: '0',
            delFlag: 'N',
            tenantId: null
          },
          {
            createTime: '2023-03-21 10:46:57',
            createUser: '1339550467939639299',
            updateTime: null,
            updateUser: null,
            buttonId: '1638009270539046922',
            modelId: '1596550552731209730',
            definitionId: '1638009270522269697',
            nodeId: '1638009270539046913',
            buttonType: 1,
            buttonName: '拒绝',
            buttonCode: 'reject',
            checked: false,
            disabled: true,
            color: 'error',
            content:
              '节点负责人可以拒绝该流程（拒绝后流程直接结束，标记为已拒绝）',
            statusFlag: 1,
            versionFlag: '0',
            delFlag: 'N',
            tenantId: null
          },
          {
            createTime: '2023-03-21 10:46:57',
            createUser: '1339550467939639299',
            updateTime: null,
            updateUser: null,
            buttonId: '1638009270539046923',
            modelId: '1596550552731209730',
            definitionId: '1638009270522269697',
            nodeId: '1638009270539046913',
            buttonType: 1,
            buttonName: '转交',
            buttonCode: 'turn',
            checked: false,
            disabled: true,
            color: 'cyan',
            content: '转交给他人办理，依然在当前节点',
            statusFlag: 1,
            versionFlag: '0',
            delFlag: 'N',
            tenantId: null
          },
          {
            createTime: '2023-03-21 10:46:57',
            createUser: '1339550467939639299',
            updateTime: null,
            updateUser: null,
            buttonId: '1638009270539046924',
            modelId: '1596550552731209730',
            definitionId: '1638009270522269697',
            nodeId: '1638009270539046913',
            buttonType: 1,
            buttonName: '退回',
            buttonCode: 'back',
            checked: false,
            disabled: true,
            color: 'default',
            content: '退回给申请人，申请人修改完成后，流程按节点开始走',
            statusFlag: 1,
            versionFlag: '0',
            delFlag: 'N',
            tenantId: null
          },
          {
            createTime: '2023-03-21 10:46:57',
            createUser: '1339550467939639299',
            updateTime: null,
            updateUser: null,
            buttonId: '1638009270539046925',
            modelId: '1596550552731209730',
            definitionId: '1638009270522269697',
            nodeId: '1638009270539046913',
            buttonType: 1,
            buttonName: '撤回',
            buttonCode: 'revoke',
            checked: false,
            disabled: true,
            color: 'default',
            content:
              '允许申请人对未进入流程（第一个流程节点为待处理状态）的申请进行撤回',
            statusFlag: 1,
            versionFlag: '0',
            delFlag: 'N',
            tenantId: null
          },
          {
            createTime: '2023-03-21 10:46:57',
            createUser: '1339550467939639299',
            updateTime: null,
            updateUser: null,
            buttonId: '1638009270539046926',
            modelId: '1596550552731209730',
            definitionId: '1638009270522269697',
            nodeId: '1638009270539046913',
            buttonType: 1,
            buttonName: '加签',
            buttonCode: 'addSign',
            checked: false,
            disabled: true,
            color: 'warning',
            content: '这个事情我不能完全做主，需要某些人先处理，再右我处理',
            statusFlag: 1,
            versionFlag: '0',
            delFlag: 'N',
            tenantId: null
          }
        ],
        notice: null,
        update: false
      }
    },
    form: {
      remark: '',
      approvals: '1',
      // sealState: 1,
      hardwareVersionId: '',
      firmwareVersionId: '',
      bylawsUrl: '',
      sealExplain: '',
      stampAttachments: ''
    },
    rules: {
      approvals: [
        {
          required: true,
          message: '请选择审批选项',
          trigger: 'blur'
        }
      ]
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
          type: 'derivable',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '+往来单位'
          }
        },
        {
          id: 'sealIds',
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
          prop: 'instanceTitle',
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
          prop: 'positionName',
          label: '申请人',
          sortable: true,
          'min-width': 150
        },
        {
          prop: 'orgName',
          label: '申请部门',
          sortable: true,
          'min-width': 150
        },
        {
          prop: 'createTime',
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
    },
    // 印章详情
    ParticularsOfSeal: {
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
          // {
          //   label: '印章状态',
          //   value: '状态',
          //   iconPath: yuanLvSvg,
          //   iconStyle: {},
          //   valStyle: {
          //     color: 'var(--jy-success-6)'
          //   }
          // },
          // {
          //   label: '印模',
          //   value: '查看',
          //   valStyle: {
          //     color: 'var(--jy-info-7)'
          //   }
          // },
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
    }
  })
  const chooseOrgan = () => {
    showDepPerDialog.value = true
  }
  // 关闭弹窗
  const close = () => {
    dialogProcess.show = false
  }
  // 切换分页
  function tabChange(activeName) {
    // console.log(activeName);
    state.componentsTabs.activeName = activeName
    if (activeName === '1') {
      state.componentsTable.header = [
        {
          prop: 'instanceTitle',
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
          prop: 'positionName',
          label: '申请人',
          sortable: true,
          'min-width': 150
        },
        {
          prop: 'orgName',
          label: '申请部门',
          sortable: true,
          'min-width': 150
        },
        {
          prop: 'createTime',
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
      state.componentsTable.data = []
    } else if (activeName === '2') {
      state.componentsTable.header = [
        {
          prop: 'flowName',
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
          type: 'derivable',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '+往来单位'
          }
        },
        {
          id: 'sealIds',
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
              label: '状态1',
              value: '1'
            },
            {
              label: '状态2',
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
          type: 'derivable',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '+往来单位'
          }
        },
        {
          id: 'sealIds',
          label: '印章名称',
          type: 'derivable',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '+选择印章'
          }
        }
      ]
    }
    getFormPage()
  }
  // 选择部门员工
  const submitSelectDepart = data => {
    console.log(data)
    state.searchSelected = data
  }
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
      instanceId.value = column.instanceId
      getDetail(column.instanceId)
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
        dialogProcess.show = true

        console.log(data)
        console.log(JSON.parse(data.formJson))
        formData.value = JSON.parse(data.formJson)
        modelName.value = data.modelName
        modelId.value = data.modelId
        definitionId.value = data.definitionId
        // attrState.instanceName = data.instanceName
        // loading.value = false
        // initAffix()
      })
      .catch(() => {
        // loading.value = false
      })
  }
  const getDesign = () => {
    const params = {
      modelId: modelId.value,
      definitionId: definitionId.value,
      edit: false
    }
    ModelApi.getDesign(params)
      .then(result => {
        if (result) {
          flowDesign.value.handleSetData(result)
        }
      })
      .catch(() => {})
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
    if (item.type === 'derivable') {
      showDepPerDialog.value = true
    }
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
        // state.componentsTable.data = res.data.rows
        // state.componentsPagination.data.amount = res.data.totalRows
        // state.componentsPagination.data.pageNumber = res.data.totalPage
        // state.componentsPagination.defaultAttribute.total = res.data.totalRows
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
  .approval-footer {
    border-radius: 4px;
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 260px;
    left: 0;
    box-sizing: border-box;
    padding: 20px 24px 12px 24px;
    background: #ffffff;
    box-shadow: 0px -9px 22px rgb(0 0 0 / 3%);
    overflow: auto;
    .footer-tagcon {
      width: 100%;
      border: 1px solid var(--el-border-color);
      border-radius: var(
        --el-input-border-radius,
        var(--el-border-radius-base)
      );
      box-sizing: border-box;
      padding: 0 12px;
      height: 32px;
      .footer-tag {
        background: rgba(0, 0, 0, 0.04);
        border-radius: 3px;
        border-color: rgba(0, 0, 0, 0.04);
        color: rgba(0, 0, 0, 0.65);
        margin-right: 12px;
      }
    }
    .footer-approver {
      font: size 14px;
      color: rgba($color: #000000, $alpha: 0.45);
      margin-right: 16px;
    }
    .footer-btns {
      text-align: center;
      padding-top: 6px;
    }
    .el-form-item {
      margin-bottom: 10px;
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
