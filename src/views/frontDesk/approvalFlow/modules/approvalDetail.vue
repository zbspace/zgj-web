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
          <div class="contentBoxes">
            <div class="ap-box-contBox">
              <el-select
                v-model="state.approverSelected"
                multiple
                placeholder="+请选择审批人"
                style="width: 100%"
                popper-class="hidePoper"
                :class="{
                  hasContent: state.approverSelected.length
                }"
                @click="chooseOrgan('approver')"
              >
                <el-option
                  v-for="one in state.approverSelected"
                  :key="one.value"
                  :label="one.label"
                  :value="one.value"
                />
              </el-select>
              <div class="ap-box-contBox-icon" @click="chooseOrgan('approver')">
                <img
                  class="ap-box-contBox-icon-img"
                  src="@/assets/svg/ketanchude.svg"
                  alt=""
                />
              </div>
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
            <div class="contentBoxes" v-if="state.form.carbon">
              <div class="ap-box-contBox">
                <el-select
                  v-model="state.carbonSelected"
                  multiple
                  placeholder="+请选择抄送人"
                  style="width: 100%"
                  popper-class="hidePoper"
                  :class="{
                    hasContent: state.carbonSelected.length
                  }"
                  @click="chooseOrgan('carbon')"
                >
                  <el-option
                    v-for="one in state.carbonSelected"
                    :key="one.value"
                    :label="one.label"
                    :value="one.value"
                  />
                </el-select>
                <div class="ap-box-contBox-icon" @click="chooseOrgan('carbon')">
                  <img
                    class="ap-box-contBox-icon-img"
                    src="@/assets/svg/ketanchude.svg"
                    alt=""
                  />
                </div>
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

  // // 删除操作人
  // const delTags = (item, type) => {
  //   if (type === 'approver') {
  //     for (let i = 0; i < state.approverSelected.length; i++) {
  //       console.log(state.approverSelected[i])
  //       if (item.id === state.approverSelected[i].id) {
  //         state.approverSelected.splice(i, 1)
  //         state.form.approver.splice(i, 1)
  //       }
  //     }
  //   } else if (type === 'carbon') {
  //     for (let i = 0; i < state.carbonSelected.length; i++) {
  //       console.log(state.carbonSelected[i])
  //       if (item.id === state.carbonSelected[i].id) {
  //         state.carbonSelected.splice(i, 1)
  //       }
  //     }
  //   }
  // }
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
      ids.push(item.value)
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
      ids.push(item.value)
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
      state.searchSelected = state.carbonSelected.map(i => {
        return {
          id: i.value,
          name: i.label,
          type: 'user'
        }
      })
    } else if (type === 'approver') {
      state.searchSelected = state.approverSelected.map(i => {
        return {
          id: i.value,
          name: i.label,
          type: 'user'
        }
      })
    } else if (type === 'nextApprover') {
      state.searchSelected = state.nextApproverSelected.map(i => {
        return {
          id: i.value,
          name: i.label,
          type: 'user'
        }
      })
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
      state.approverSelected = data.map(i => {
        return {
          label: i.name,
          value: i.id
        }
      })
      state.form.approver = data
    } else if (depChoose.value === 'carbon') {
      state.carbonSelected = data.map(i => {
        return {
          label: i.name,
          value: i.id
        }
      })
    } else if (depChoose.value === 'nextApprover') {
      state.nextApproverSelected = data.map(i => {
        return {
          label: i.name,
          value: i.id
        }
      })
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
</style>
<style lang="scss">
  .hidePoper {
    display: none;
  }
  .approval-footer {
    .el-divider {
      margin: 8px 0 16px;
    }
    .hasContent {
      .el-input__wrapper {
        -webkit-text-fill-color: #000;
      }

      .el-input__inner {
        -webkit-text-fill-color: #000;
      }
    }

    .contentBoxes {
      display: flex;
      justify-content: space-between;
      width: 100%;

      .xian {
        color: rgba($color: #000000, $alpha: 0.45);
        font-size: 12px;
      }
    }

    .ap-box-contBox {
      width: calc(100%);
      position: relative;
      display: flex;
      align-items: center;

      .el-input__suffix {
        display: none;
      }

      .el-select .el-input.is-disabled .el-input__wrapper {
        cursor: pointer;
      }

      .el-select .el-input.is-disabled .el-input__inner {
        cursor: pointer;
      }

      .el-input.is-disabled .el-input__wrapper {
        background-color: #ffffff;
      }

      .ap-box-contBox-icon {
        position: absolute;
        right: 0.8rem;
        cursor: pointer;
        height: 14px;
        display: flex;
        align-items: center;

        .ap-box-contBox-icon-img {
          height: 100%;
        }
      }

      :deep {
        .el-input__inner {
          padding-right: 1.5rem;
          box-sizing: border-box;
        }
      }
    }
  }
</style>
