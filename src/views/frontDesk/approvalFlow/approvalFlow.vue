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
          <el-form-item label="审批选项" prop="suggest">
            <el-radio-group
              @change="approvalsChange"
              v-model="state.form.suggest"
            >
              <el-radio label="1">同意</el-radio>
              <el-radio label="2">不同意</el-radio>
              <el-radio label="3">转交</el-radio>
              <el-radio label="4">加签</el-radio>
              <el-radio label="5">征询他人意见</el-radio>
              <el-radio label="6">退回</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="下一步审批人"
            v-if="state.form.suggest === '5' || state.form.suggest === '3'"
            prop="nextApprover"
          >
            <!-- <span class="footer-approver">李旺</span>
            <span class="footer-approver">李旺</span>
            <span class="footer-approver">李旺</span>
            <span class="footer-approver">李旺</span> -->
            <div
              class="select-box-contBox"
              @click="chooseOrgan('nextApprover')"
            >
              <el-input
                class="ap-box-contBox-input width-100"
                readonly
                v-model="state.form.nextApprover"
                placeholder="请选择下一步审批人"
              />
              <div class="ap-box-contBox-icon">
                <el-icon
                  style="color: #aaaaaa; margin-right: 5px"
                  v-if="state.form.nextApprover"
                  @click.stop="clear('nextApprover')"
                  ><CircleClose
                /></el-icon>
                <img
                  class="ap-box-contBox-icon-img"
                  src="@/assets/svg/ketanchude.svg"
                  alt=""
                />
              </div>
            </div>
          </el-form-item>
          <el-form-item
            label="审批人"
            prop="approver"
            v-if="state.form.suggest === '4'"
          >
            <div class="select-box-contBox">
              <div class="footer-tagcon" @click="chooseOrgan('approver')"
                ><el-tag
                  class="footer-tag"
                  closable
                  type="info"
                  v-for="item in state.approverSelected"
                  :key="item.id"
                  @close="delTags(item, 'approver')"
                >
                  {{ item.name }}
                </el-tag>
                <span v-if="state.approverSelected.length <= 10"
                  >+请添加审批人</span
                >
              </div>
              <div class="ap-box-contBox-icon">
                <!-- <el-icon
                  v-if="state.form.approver"
                  style="margin-right: 5px"
                  color="#aaaaaa"
                  @click="clear('approver')"
                  ><CircleClose
                /></el-icon> -->
                <img
                  class="ap-box-contBox-icon-img"
                  src="@/assets/svg/ketanchude.svg"
                  alt=""
                />
              </div>
            </div>
          </el-form-item>
          <el-form-item
            v-if="tasks.length > 0"
            label="被退回人"
            name="destTaskId"
            :rules="[{ required: true, message: '请选择人员!' }]"
          >
            <el-radio-group
              v-model:value="formState.destTaskId"
              class="w-fill"
              :size="size"
            >
              <el-radio v-for="(task, i) in tasks" :key="i" :value="task.value">
                <span>{{ task.label }}</span>
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="退回后发起审批"
            prop="approver"
            v-if="state.form.suggest === '6'"
          >
            <el-select
              style="width: 264px"
              v-model="formData.adminId"
              filterable
              @change="changeAdmin"
            >
              <el-option
                v-for="(data, i) in datas"
                :key="i"
                :label="data[labelName]"
                :value="data[valueName]"
                >{{ data[labelName] }}</el-option
              >
            </el-select>
          </el-form-item>
          <!-- <el-form-item
            label="加签方式"
            prop="addSignMode"
            v-if="state.form.suggest === '4'"
          >
            <el-radio-group
              @change="addSignModeChange"
              v-model="state.form.addSignMode"
            >
              <el-radio
                v-for="(signType, i) in state.signTypes"
                :key="i"
                :label="signType.value"
                :disabled="[2, 3].includes(approvalMode) && signType.value == 4"
              >
                <span>{{ signType.name }}</span>
              </el-radio>
            </el-radio-group>
          </el-form-item> -->
          <el-form-item label="添加抄送" prop="carbon">
            <div class="select-box-contBox">
              <el-checkbox
                v-model="state.form.carbon"
                style="margin-right: 12px"
                size="mini"
              ></el-checkbox>
              <div
                v-if="state.form.carbon"
                @click="chooseOrgan('carbon')"
                class="footer-tagcon"
                ><el-tag
                  class="footer-tag"
                  closable
                  type="info"
                  v-for="item in state.carbonSelected"
                  :key="item.id"
                  @close="delTags(item, 'catbon')"
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
                <span v-if="state.carbonSelected.length <= 10"
                  >+请添加抄送人</span
                >
                <div class="ap-box-contBox-icon">
                  <!-- <el-icon
                    v-if="state.form.carbon"
                    style="margin-right: 5px"
                    color="#aaaaaa"
                    @click.stop="clear('carbon')"
                    ><CircleClose
                  /></el-icon> -->
                  <img
                    class="ap-box-contBox-icon-img"
                    src="@/assets/svg/ketanchude.svg"
                    alt=""
                  />
                </div>
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
  import componentsTabs from '../../components/JyTabs.vue'
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
  import { CircleClose } from '@element-plus/icons-vue'
  import formApi from '@/api/system/formManagement/index'
  import { ModelApi } from '@/api/flow/ModelApi'
  import { TaskApi } from '@/api/flow/TaskApi'
  import { QueryTaskApi } from '@/api/flow/QueryTaskApi'
  import { InstanceApi } from '@/api/flow/InstanceApi'
  import { ApproverApi } from '@/api/flow/ApproverApi'
  import { NodeButtonApi } from '@/api/flow/NodeButtonApi'
  import { NodeAttrApi } from '@/api/flow/NodeAttrApi'
  import loadApproverData from '@/components/FlowDesign/data/load-approver-data'
  import useCommon from '@/components/FlowDesign/hooks/useCommon'
  import form from '@/mock/form'

  const { toUgroup } = useCommon()
  // 数据
  const { backApprovalTypeDatas } = loadApproverData()
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
  // 节点Id
  const nodeId = ref(null)
  // 模型名称
  const modelName = ref('')
  // 最新定义ID
  const definitionId = ref(null)
  // 最新实例ID
  const instanceId = ref(null)
  // 表单内容
  const formData = ref(null)
  // 表单json
  const formJson = ref(null)
  // 动态表单版本Id
  const formVersionId = ref('')
  // 动态表单Id
  const formMessageId = ref('')
  // 流程版本Id
  const flowVersionId = ref('')
  // 流程Id
  const flowMessageId = ref('')
  const taskId = ref('')
  const approvalMode = ref('')
  const buttons = ref([])
  // 退回后发起审批列表
  const datas = ref([])
  // 被退回人列表
  const tasks = ref([])

  const depChoose = ref('')
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
  const delTags = (item, type) => {
    if (type === 'approver') {
      for (let i = 0; i < state.approverSelected.length; i++) {
        console.log(state.approverSelected[i])
        if (item.id === state.approverSelected[i].id) {
          state.approverSelected.splice(i, 1)
        }
      }
    } else if (type === 'carbon') {
      for (let i = 0; i < state.carbonSelected.length; i++) {
        console.log(state.carbonSelected[i])
        if (item.id === state.carbonSelected[i].id) {
          state.carbonSelected.splice(i, 1)
        }
      }
    }
  }
  // 提交审批
  const sumitForm = () => {
    console.log('提交')
    btnLoading.value = true
    vFormRef.value.validate(valid => {
      if (valid) {
        console.log(state.form.suggest)
        // ElMessage.success('审批成功')
        // btnLoading.value = false
        if (state.form.suggest === '1') {
          onAgree()
        } else if (state.form.suggest === '2') {
          onReject()
        } else if (state.form.suggest === '3') {
          onTurn()
        } else if (state.form.suggest === '4') {
          onAssignee()
        } else if (state.form.suggest === '5') {
          consultSubmit()
        } else if (state.form.suggest === '6') {
          onFinish()
        }
      } else {
        // ElMessage.error('校验失败')
      }
    })
  }
  /**
   * 不同意
   * @param {*} res
   */
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
          ElMessage.success('提交成功')
          dialogProcess.show = false
          getFormPage()
        }
        btnLoading.value = false
      })
      .catch(() => {
        btnLoading.value = false
      })
  }
  /**
   * 同意
   * @param {*} res
   */
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
          ElMessage.success('提交成功')
          dialogProcess.show = false
          getFormPage()
        }
        btnLoading.value = false
      })
      .catch(() => {
        btnLoading.value = false
      })
  }
  /**
   * 加签
   */
  const onAssignee = () => {
    const params = {
      taskId: taskId.value,
      assigneeList: state.approverSelected.forEach(item => {
        const ids = []
        ids.push(item.id)
        return ids
      }),
      addSignMode: state.form.addSignMode,
      whisper: state.form.remark
    }
    ApproverApi.addSign(params)
      .then(result => {
        if (result.code === '00000') {
          console.info(result)
          dialogProcess.show = false
          ElMessage.success('提交成功')
          getFormPage()
        }
        btnLoading.value = false
      })
      .catch(() => {
        btnLoading.value = false
      })
  }
  // 转交
  const onTurn = () => {
    const params = {
      taskId: taskId.value,
      newApprover: state.form.nextApprover,
      whisper: state.form.remark
    }
    ApproverApi.turn(params)
      .then(() => {
        dialogProcess.show = false
      })
      .catch(() => {})
  }
  /**
   *  征询提交
   */
  const consultSubmit = async () => {
    try {
      const params = {
        instanceId: instanceId.value,
        modelId: modelId.value,
        definitionId: definitionId.value,
        taskId: taskId.value,
        suggest: state.form.suggest,
        remark: state.form.remark
      }
      ApproverApi.consultSubmit(params)
        .then(result => {
          if (result) {
            console.info(result)
          }
          btnLoading.value = false
          close()
        })
        .catch(() => {
          btnLoading.value = false
        })
    } catch (e) {
      console.log('error', e)
      btnLoading.value = false
    }
  }
  /**
   * 退回需要获取的信息
   */
  const getBackBaseInfo = async () => {
    try {
      const params = {
        taskId: taskId.value,
        instanceId: instanceId.value
      }
      // 获取节点对退回的配置
      const nodeAttr = await NodeAttrApi.detailByTaskId(params)
      const allowBackType = nodeAttr.allowBackType
      const backApprovalType = nodeAttr.backApprovalType
      if (backApprovalType) {
        const backApprovalTypes = toUgroup(backApprovalType)
        backApprovalTypeDatas.forEach(element => {
          if (backApprovalTypes.includes(element.value)) {
            datas.value.push(element)
          }
        })
      }
      if (allowBackType === 2) {
        // 获取被退回人
        const list = await TaskApi.preList(params)
        if (list && list.length > 0) {
          tasks.value = []
          list.forEach(element => {
            tasks.value.push({
              label: element.approverWrapper,
              value: element.taskId,
              popovers: [
                {
                  title: element.nodeName,
                  content: `任务类型:${element.taskTypeWrapper}`
                },
                {
                  content: `接收时间:${element.createTime}`
                },
                {
                  content: `审批时间:${element.updateTime}`
                }
              ]
            })
          })
        }
      }
    } finally {
      // loading.value = false
    }
  }
  /**
   * 退回
   */
  const onFinish = () => {
    const params = {
      instanceId: instanceId.value,
      modelId: modelId.value,
      definitionId: definitionId.value,
      // 当前任务ID
      taskId: taskId.value,
      // 需要退回到的人(任务),其实也是数据值也是任务ID
      destTaskId: state.form.destTaskId,
      backType: state.form.backType,
      whisper: state.form.remark
    }
    ApproverApi.returned(params)
      .then(res => {
        console.log(res)
      })
      .catch(() => {})
  }
  const state = reactive({
    searchSelected: [],
    carbonSelected: [],
    approverSelected: [],
    nextApproverSelected: [],
    // 审批人
    signTypes: [
      {
        name: '前加签',
        value: 1,
        popovers: [
          {
            title: '什么是前加签？',
            content: '在我之前审批,且只支持会签'
          }
        ]
      },
      {
        name: '后加签',
        value: 2,
        popovers: [
          {
            title: '什么是后加签？',
            content: '在我之后审批,且只支持会签'
          }
        ]
      },
      {
        name: '加会签',
        value: 3,
        popovers: [
          {
            title: '什么是加会签？',
            content: '节点配置为会签时支持添加会签,会签人不存在先后顺序'
          }
        ]
      },
      {
        name: '加或签',
        value: 4,
        popovers: [
          {
            title: '什么是加或签？',
            content: '节点配置为或签时支持添加或签,或签人不存在先后顺序'
          }
        ]
      }
    ],
    form: {
      remark: '同意',
      carbon: false,
      suggest: '1',
      nextApprover: '',
      nextApproverIds: '',
      addSignMode: [2, 3].includes(approvalMode.value)
        ? 3
        : approvalMode.value === 4
        ? 4
        : 3,
      destTaskId: '',
      backType: ''
    },
    rules: {
      suggest: [
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
  const chooseOrgan = type => {
    depChoose.value = type
    if (type === 'carbon') {
      state.searchSelected = state.carbonSelected
    } else if (type === 'approver') {
      state.searchSelected = state.approverSelected
    } else if (type === 'nextApprover') {
      state.searchSelected = state.nextApproverSelected
    }
    showDepPerDialog.value = true
  }
  const clear = type => {
    if (type === 'nextApprover') {
      state.nextApproverSelected = []
      state.form.nextApprover = ''
    }
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
  const approvalsChange = item => {
    console.log(item)
    if (item === '1') {
      state.form.remark = '同意'
      state.rules = {
        suggest: [
          {
            required: true,
            message: '请选择审批选项',
            trigger: 'change'
          }
        ]
      }
    } else if (item === '2') {
      state.form.remark = '不同意'
      state.rules = {
        suggest: [
          {
            required: true,
            message: '请选择审批选项',
            trigger: 'change'
          }
        ]
      }
    } else {
      state.form.remark = '请审批'
    }
    if (item === '3' || item === '5') {
      state.rules = {
        suggest: [
          {
            required: true,
            message: '请选择审批选项',
            trigger: 'change'
          }
        ],
        nextApprover: [
          {
            required: true,
            message: '请选择下一步审批人'
          }
        ]
      }
    }
    if (item === '4') {
      state.rules = {
        suggest: [
          {
            required: true,
            message: '请选择审批选项',
            trigger: 'change'
          }
        ],
        approver: [
          {
            required: true,
            message: '请选择审批人'
          }
        ]
        // addSignMode: [
        //   {
        //     required: true,
        //     message: '请选择加签方式'
        //   }
        // ]
      }
    }
    if (item === '6') {
      getBackBaseInfo()
    }
  }
  const addSignModeChange = item => {}
  // 选择部门员工
  const submitSelectDepart = data => {
    if (depChoose.value === 'approver') {
      state.approverSelected = data
    } else if (depChoose.value === 'carbon') {
      state.carbonSelected = data
    } else if (depChoose.value === 'nextApprover') {
      state.nextApproverSelected = data
      const nextApproverNames = []
      data.forEach(v => {
        nextApproverNames.push(v.name)
      })
      state.form.nextApprover = nextApproverNames.join(',')
    }
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
      taskId.value = column.taskId
      approvalMode.value = column.approvalMode
      console.log(approvalMode.value)
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
        nodeId.value = data.nodeId
        definitionId.value = data.definitionId
        formVersionId.value = formData.value.formVersionId
        flowVersionId.value = formData.value.flowVersionId
        formMessageId.value = formData.value.formMessageId
        flowMessageId.value = formData.value.flowMessageId
        getFormDataJson()
        // attrState.instanceName = data.instanceName
        // loading.value = false
        // initAffix()
        getButtons()
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
      modelId: modelId.value,
      definitionId: definitionId.value,
      nodeId: nodeId.value
    }
    const result = await NodeButtonApi.findList(params)
    if (result) {
      // 按钮
      buttons.value = result.filter(t => t.checked)
      console.log('getButtons', buttons.value)
    }
  }
  /**
   * 获取动态表单信息
   */
  const getFormDataJson = () => {
    console.log(formVersionId)
    formApi
      .queryColumInfoByFormId({ formVersionId: formVersionId.value })
      .then(res => {
        formJson.value = res.data
        console.log('getFormDataJson', res)
        const d = handelData(formData.value, formJson.value)
        state.ParticularsOfSeal.basicInformation.data = d
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
    formJson.forEach(v => {
      for (const item in formData) {
        if (v.formColumnNo === item) {
          if (v.formColumnNo === 'sealName') {
            if (formData[item].length > 0) {
              formData[item].forEach((v, k) => {
                formTableData.push({
                  label: `印章名称${k + 1}`,
                  value: v.seal
                })
              })
            }
          } else if (v.formColumnNo === 'applicantInfo') {
            for (const i in formData[item]) {
              console.log(i)
              if (i === 'applyOrganName') {
                formTableData.push({
                  label: '所属部门',
                  value: formData[item][i]
                })
              } else if (i === 'applyUserName') {
                formTableData.push({
                  label: '申请人员',
                  value: formData[item][i]
                })
              }
            }
          } else if (v.formColumnNo === 'contactUnit') {
            const organNameList = []
            if (formData[item].length > 0) {
              formData[item].forEach((v, k) => {
                organNameList.push(v.organName)
              })
              formTableData.push({
                label: `往来单位`,
                value: organNameList.join(',')
              })
            }
          } else if (v.formColumnNo === 'limitTimeSeal') {
            formTableData.push({
              label: `限时用印`,
              value: formData[item] === 1 ? '是' : '否'
            })
          } else if (v.formColumnNo === 'usesealBesides') {
            formTableData.push({
              label: `印章外带`,
              value: formData[item] ? '是' : '否'
            })
          } else if (v.formColumnNo === 'sealFile') {
            if (formData[item].fileList.length > 0) {
              formData[item].fileList.forEach((v, k) => {
                formTableData.push({
                  label: `文件名称`,
                  value: v.name
                })
              })
            }
          } else if (v.formColumnNo === 'remoteSeal') {
            formTableData.push({
              label: v.formColumnName,
              value: formData[item] ? '是' : '否'
            })
          } else if (v.formColumnNo === 'videoSeal') {
            formTableData.push({
              label: v.formColumnName,
              value: formData[item] ? '是' : '否'
            })
          } else {
            formTableData.push({
              label: v.formColumnName,
              value: formData[item]
            })
          }
        }
      }
    })
    return formTableData
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
      display: flex;
      align-items: center;
      color: rgba($color: #000000, $alpha: 0.45);
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
