<!--
* @Descripttion 审批弹窗
* @FileName approvalDetail.vue
* @Author Guanpf
* @LastEditTime 2023-03-27 14:37:30
!-->
<template>
  <!-- 处理弹窗 -->
  <JyDialog
    @update:show="isVisible = $event"
    :show="isVisible"
    destroy-on-close
    :title="$t(props.title)"
    :oneBtn="false"
    :confirmText="$t('t-zgj-operation.submit')"
    :concelText="$t('t-zgj-operation.cancel')"
    :height="700"
    :width="900"
    :footer="false"
    @close="closeDialog"
  >
    <div class="ap-cont-tabsCont">
      <div class="scrollbar-div">
        <el-scrollbar style="height: 369px; overflow: auto">
          <div
            class="ap-cont-box sealDetails-basic-information"
            v-for="item in props.params.detailData"
            :key="item.title"
          >
            <documentsDetailsPortion>
              <template #title>
                <div class="ap-cont-box-title-label">{{ item.title }}</div>
              </template>
              <template #content>
                <div>
                  <documentsDetailsInformationList
                    :data="item.data"
                    :labelStyle="item.labelStyle"
                  >
                  </documentsDetailsInformationList>
                </div>
              </template>
            </documentsDetailsPortion>
          </div>
        </el-scrollbar>
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
        label-width="110px"
      >
        <el-form-item label="审批选项" prop="suggest">
          <el-radio-group
            @change="approvalsChange"
            v-model="state.form.suggest"
          >
            <el-radio label="1">同意</el-radio>
            <el-radio label="2">不同意</el-radio>
            <!-- <el-radio label="5">征询他人意见</el-radio> -->
            <!-- <el-radio label="3">转交</el-radio>
            <el-radio label="4">加签</el-radio>
            <el-radio label="6">退回</el-radio> -->
            <el-radio
              :label="item.buttonCode"
              v-for="item in props.params.buttons.filter(b =>
                ['agree', 'reject'].includes(b.buttonCode)
              )"
              :key="item.buttonCode"
              >{{ item.buttonName }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <!-- <el-form-item
          label="下一步审批人"
          v-if="state.form.suggest === '1'"
          prop="nextApprover"
        >
          <span class="footer-approver">李旺</span>
          <span class="footer-approver">李旺</span>
          <span class="footer-approver">李旺</span>
          <span class="footer-approver">李旺</span>
          <div class="select-box-contBox" @click="chooseOrgan('nextApprover')">
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
        </el-form-item> -->
        <el-form-item
          label="审批人"
          prop="approver"
          v-if="
            state.form.suggest === '5' ||
            state.form.suggest === '4' ||
            state.form.suggest === '3'
          "
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
            v-model:value="state.form.destTaskId"
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
            v-model="sate.form.adminId"
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
                @close="delTags(item, 'carbon')"
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
        <el-button type="primary" :loading="btnLoading" @click="sumitForm">{{
          $t('t-zgj-operation.submit')
        }}</el-button>
        <el-button @click="close">{{ $t('t-zgj-operation.cancel') }}</el-button>
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
</template>

<script setup>
  import { ref, reactive, computed, onMounted, nextTick } from 'vue'
  import { ElMessage } from 'element-plus'
  import kDepartOrPersonVue from '@/views/components/modules/KDepartOrPersonDialog'
  import documentsDetailsPortion from '@/views/components/documentsDetails/portion.vue'
  import documentsDetailsInformationList from '@/views/components/documentsDetails/informationList.vue'
  import { ApproverApi } from '@/api/flow/ApproverApi'
  import { NodeAttrApi } from '@/api/flow/NodeAttrApi'
  import loadApproverData from '@/components/FlowDesign/data/load-approver-data'
  import useCommon from '@/components/FlowDesign/hooks/useCommon'
  import { CircleClose } from '@element-plus/icons-vue'
  import { ModelApi } from '@/api/flow/ModelApi'
  import { TaskApi } from '@/api/flow/TaskApi'
  import { RuTaskSignApi } from '@/api/flow/RuTaskSignApi'
  const { toUgroup } = useCommon()
  // 数据
  const { backApprovalTypeDatas } = loadApproverData()
  const showDepPerDialog = ref(false)
  const props = defineProps({
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    params: {
      type: Object,
      default: () => {
        return {}
      }
    }
  })
  const vFormRef = ref(null)
  const btnLoading = ref(false)
  // 加签方式，如果是前加签,或是后加签前一个节点没有审批, 操作按钮不可用
  const addSignMode = ref(0)
  // 流程记录
  const records = ref(null)
  // 子组件
  const flowDesign = ref()
  // 模型id
  const modelId = ref(null)
  // 最新定义ID
  const definitionId = ref(null)
  // 最新实例ID
  const instanceId = ref(null)
  // 表单内容
  const formData = ref(null)
  // 任务ID
  const taskId = ref('')
  const approvalMode = ref('')
  // 按钮列表
  const buttons = ref([])
  // 退回后发起审批列表
  const datas = ref([])
  // 被退回人列表
  const tasks = ref([])

  const depChoose = ref('')
  const emit = defineEmits(['update:show', 'on-confirm', 'on-cancel'])
  const state = reactive({
    searchSelected: [],
    carbonSelected: [],
    approverSelected: [],
    nextApproverSelected: [],
    form: {
      remark: '同意',
      carbon: false,
      suggest: '1',
      nextApprover: '',
      nextApproverIds: [],
      addSignMode: [2, 3].includes(props.params.approvalMode)
        ? 3
        : props.params.approvalMode === 4
        ? 4
        : 3,
      destTaskId: '',
      backType: '',
      adminId: '',
      approver: ''
    },
    rules: {
      suggest: [
        {
          required: true,
          message: '请选择审批选项',
          trigger: 'blur'
        }
      ],
      nextApprover: [
        {
          required: true,
          message: '请选择下一步审批人'
        }
      ]
    }
  })
  const closeDialog = data => {
    emit('on-cancel', false)
  }
  const isVisible = computed({
    get() {
      return props.show
    },
    set(value) {
      emit('update:show', value)
    }
  })

  // 删除操作人
  const delTags = (item, type) => {
    if (type === 'approver') {
      for (let i = 0; i < state.approverSelected.length; i++) {
        console.log(state.approverSelected[i])
        if (item.id === state.approverSelected[i].id) {
          state.approverSelected.splice(i, 1)
          state.form.approver.splice(i, 1)
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
    vFormRef.value.validate(valid => {
      if (valid) {
        btnLoading.value = true
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
          // onFinish()
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
      instanceId: props.params.instanceId,
      modelId: props.params.modelId,
      formData: props.params.formData,
      definitionId: props.params.definitionId,
      remark: state.form.remark,
      suggest: 2
    }
    console.log(params)
    ApproverApi.reject(params)
      .then(result => {
        if (result.code === '00000') {
          ElMessage.success('提交成功')
          emit('on-confirm')
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
      instanceId: props.params.instanceId,
      modelId: props.params.modelId,
      formData: props.params.formData,
      definitionId: props.params.definitionId,
      remark: state.form.remark,
      suggest: 1
    }
    console.log(params)
    ApproverApi.agree(params)
      .then(result => {
        if (result.code === '00000') {
          console.info(result)
          ElMessage.success('提交成功！')
          emit('on-confirm', result)
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
    const ids = []
    state.approverSelected.forEach(item => {
      ids.push(item.id)
    })
    const params = {
      taskId: props.params.taskId,
      assigneeList: ids,
      addSignMode: state.form.addSignMode,
      whisper: state.form.remark
    }
    ApproverApi.addSign(params)
      .then(result => {
        if (result.code === '00000') {
          console.info(result)
          ElMessage.success('加签成功！')
          emit('on-confirm', result)
        }
        btnLoading.value = false
      })
      .catch(() => {
        btnLoading.value = false
      })
  }
  // 转交
  const onTurn = () => {
    const ids = []
    state.approverSelected.forEach(item => {
      ids.push(item.id)
    })
    const params = {
      taskId: props.params.taskId,
      assigneeList: ids,
      whisper: state.form.remark
    }
    ApproverApi.turn(params)
      .then(result => {
        if (result.code === '00000') {
          console.info(result)
          ElMessage.success('转交成功！')
          emit('on-confirm', result)
        }
        btnLoading.value = false
      })
      .catch(() => {
        btnLoading.value = false
      })
  }
  /**
   *  征询提交
   */
  const consultSubmit = async () => {
    try {
      const params = {
        instanceId: props.params.instanceId,
        modelId: props.params.modelId,
        definitionId: props.params.definitionId,
        taskId: props.params.taskId,
        suggest: 1,
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
        taskId: props.params.taskId,
        instanceId: props.params.instanceId
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
      console.log(datas)
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
      instanceId: props.params.instanceId,
      modelId: props.params.modelId,
      definitionId: props.params.definitionId,
      // 当前任务ID
      taskId: props.parmas.taskId,
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
      state.from.nextApproverIds = []
    }
  }
  // 关闭弹窗
  const close = value => {
    console.log(value)
    emit('on-cancel', value)
    isVisible.value = false
  }
  const getAllDetailInfo = () => {
    getDesign()
    getRuNode()
    // getSign()
  }
  const getDesign = () => {
    const params = {
      modelId: props.params.modelId,
      definitionId: props.params.definitionId,
      edit: false
    }
    ModelApi.getDesign(params)
      .then(result => {
        console.log('getDesignresult', result)
        if (result) {
          // flowDesign.value.handleSetData(result)
        }
      })
      .catch(() => {})
  }
  const approvalsChange = item => {
    if (item === '1') {
      state.form.remark = '同意'
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
    if (item === '3' || item === '4' || item === '5') {
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
            message: '请选择审批人',
            trigger: 'change'
          }
        ]
      }
    }
    // if (item === '4') {
    //   state.rules = {
    //     suggest: [
    //       {
    //         required: true,
    //         message: '请选择审批选项',
    //         trigger: 'change'
    //       }
    //     ]
    //     // addSignMode: [
    //     //   {
    //     //     required: true,
    //     //     message: '请选择加签方式'
    //     //   }
    //     // ]
    //   }
    // }
    if (item === '6') {
      getBackBaseInfo()
    }
  }
  // 选择部门员工
  const submitSelectDepart = data => {
    if (depChoose.value === 'approver') {
      state.approverSelected = data
      state.form.approver = data
    } else if (depChoose.value === 'carbon') {
      state.carbonSelected = data
    } else if (depChoose.value === 'nextApprover') {
      state.nextApproverSelected = data
      const nextApproverNames = []
      data.forEach(v => {
        nextApproverNames.push(v.name)
        state.form.nextApproverIds.push(v.id)
      })
      state.form.nextApprover = nextApproverNames.join(',')
    }
  }
  /**
   * 获取流程记录表格数据
   */
  const getRuNode = async () => {
    // records.value = await TaskApi.findList({
    //   instanceId: props.params.instanceId
    // })
    const result = await TaskApi.findList({
      instanceId: props.params.instanceId
    })
    console.log('recordsResult', result)
    // 如果加签前一个节点没有审批, 操作按钮不可用
    /* let currTask = null;
  for (let index = 0; index < records.value.length; index++) {
    const element = records.value[index];
    if (currRecord.value.taskId == element.taskId) {
      currTask = element;
    }
  }
  records.value.forEach(record => {
    if (currTask && currTask.beforeAddSignTaskId && currTask.beforeAddSignTaskId == record.taskId && record.taskStatus == 2) {
      addSignMode.value = 1;
    }
  }); */
  }

  /**
   * 获取加签方式
   */
  const getSign = async () => {
    // 查询审批中的
    const params = { taskId: props.params.taskId, taskStatus: 2 }
    const list = await RuTaskSignApi.findListByTaskId(params)
    console.log('list', list)
    // 如果加签前一个节点没有审批, 操作按钮不可用
    if (list && list.length > 0) {
      addSignMode.value = 1
    }
  }
  onMounted(() => {})

  defineExpose({
    getAllDetailInfo
  })
</script>
<style lang="scss" scoped>
  .el-form-item__content {
    margin-bottom: 18px;
  }
  :deep {
    .content-custom {
      padding: 0;
    }
  }
  .approval-footer {
    border-radius: 4px;
    position: absolute;
    bottom: 0px;
    width: 100%;
    min-height: 220px;
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
