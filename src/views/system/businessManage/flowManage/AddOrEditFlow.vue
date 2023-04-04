<template>
  <div class="add-flow-modal">
    <AntModalBox
      v-model="show"
      :custom-content="true"
      :defaultAttribute="{
        fullscreen: true,
        height: '100%'
      }"
    >
      <div class="flowManage-layout">
        <div class="process">
          <div class="header">
            <div class="process-back">
              <i class="iconpark" @click="clickClose">
                <svg class="iconpark-icon">
                  <use href="#Vector8Stroke"></use>
                </svg>
              </i>
              <span class="process-back-text">
                <span v-show="props.openType === 'add'">
                  {{ $t('t-zgj-sync.add') }}
                </span>
                <span v-show="props.openType === 'edit'">
                  {{ $t('t-editors') }}
                </span>
              </span>
            </div>
            <div class="process-tabs">
              <div
                class="tabs"
                v-for="(item, index) in state.tabsData"
                :key="index"
                :class="{
                  'checked-tabs': item.checked ? true : false
                }"
                @click="changeTabs(item)"
              >
                <div class="tabs-icon">{{ item.index }}</div>
                <div class="tabs-text">{{ item.label }}</div>
              </div>
            </div>
            <div class="process-save">
              <div class="process-save-down">
                <el-popover placement="bottom" :width="400" trigger="click">
                  <template #reference>
                    <div class="process-save-down-text">
                      <span v-show="errorInfo.length !== 0">
                        {{ errorInfo.length }}项不完善
                      </span>
                    </div>
                  </template>
                  <div class="popover-cont">
                    <div class="popover-cont-title">
                      内容不完善，当前无法发布
                    </div>
                    <div class="popover-cont-subTitle">
                      以下内容不完善，请修改后发布
                    </div>
                    <div class="popover-cont-list" v-if="errorInfo">
                      <div
                        class="popover-cont-list-li"
                        v-for="(item, index) in errorInfo"
                        :key="index"
                      >
                        <div class="popover-cont-list-li-name">
                          {{ item.type }}
                        </div>
                        <div class="popover-cont-list-li-desc">
                          {{ item.message }}
                        </div>
                        <div class="popover-cont-list-li-but">去修改 </div>
                      </div>
                    </div>
                  </div>
                </el-popover>
              </div>
              <el-button
                class="process-save-but"
                type="primary"
                @click="clickSave"
              >
                {{ $t('t-zgj-Save') }}
              </el-button>
            </div>
          </div>
          <div class="content">
            <BasicsInfo
              ref="refBasicsInfo"
              v-model="linkId"
              v-model:sealId="linkSealUseTypeId"
              v-show="state.checkedIndex == '1'"
              :businessList="props.businessList"
              :sealApplyInitId="props.sealApplyInitId"
              :openType="openType"
              :editBasicsForm="editBasicsForm"
            ></BasicsInfo>
            <AssociationForm
              ref="refAssociationForm"
              v-model="linkId"
              v-model:sealId="linkSealUseTypeId"
              v-show="state.checkedIndex == '2'"
              :businessList="props.businessList"
              :sealApplyInitId="props.sealApplyInitId"
              :openType="openType"
              :formMessageId="formMessageId"
            ></AssociationForm>
            <VFlowDesign
              ref="refVFlowDesign"
              v-show="state.checkedIndex == '3'"
              v-if="modelIds.modelId"
              v-loading="loadingModel"
              :initObj="modelIds"
              :openType="openType"
            ></VFlowDesign>
            <AdvancedSetup
              v-show="state.checkedIndex == '4'"
              ref="refAdvancedSetup"
            ></AdvancedSetup>
          </div>
        </div>
      </div>
    </AntModalBox>

    <JyElMessageBox
      v-model="state.jyBoxShow"
      :show="state.jyBoxShow"
      :defaultAttribute="{}"
      @on-cancel="jyBoxCancel"
    >
      <template #header>
        {{ state.jyBoxHeader }}
      </template>
      <template #content>
        {{ state.jyBoxCont }}
      </template>
      <template #footer>
        <el-button type="primary" @click="jyBoxCancel">确定</el-button>
      </template>
    </JyElMessageBox>
  </div>
</template>

<script setup>
  import BasicsInfo from './BasicsInfo.vue'
  import AssociationForm from './AssociationForm.vue'
  import AdvancedSetup from './AdvancedSetup.vue'
  import AntModalBox from '@/views/components/modules/AntModalBox.vue'
  import { reactive, computed, defineAsyncComponent, ref, watch } from 'vue'
  import apiFlow from '@/api/system/flowManagement'
  import editModelApi from '@/api/frontDesk/printControl/sealApply'
  import { ElMessage } from 'element-plus'
  import { useFlowStore } from '@/components/FlowDesign/store/flow'
  import { ModelApi } from '@/api/flow/ModelApi'
  const flowStore = useFlowStore()
  const linkSealUseTypeId = ref('1')
  // 异步组件
  const VFlowDesign = defineAsyncComponent({
    loader: () => import('@/views/components/FlowDesign/index.vue')
  })
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    businessList: {
      type: Array,
      default: () => {
        return []
      }
    },
    openType: {
      type: String,
      default: 'add'
    },
    treeSelectedId: {
      type: String,
      default: ''
    },
    sealApplyInitId: {
      type: String,
      default: ''
    },
    editModleIds: {
      type: Object,
      default: () => {
        return {
          definitionId: '',
          modelId: '',
          flowMessageId: ''
        }
      }
    }
  })

  const emits = defineEmits(
    'update:modelValue',
    'update:treeSelectedId',
    'reloadData'
  )

  const state = reactive({
    checkedIndex: '1',
    tabsData: [
      {
        index: '1',
        label: '基础信息',
        checked: true
      },
      {
        index: '2',
        label: '关联表单'
      },
      {
        index: '3',
        label: '流程设计'
      },
      {
        index: '4',
        label: '高级设置'
      }
    ],
    jyBoxHeader: '',
    jyBoxCont: '',
    jyBoxShow: false
  })

  // model show
  const show = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      emits('update:modelValue', value)
    }
  })

  // 联动Id - 业务类型
  const linkId = computed({
    get() {
      return props.treeSelectedId
    },
    set(value) {
      emits('update:treeSelectedId', value)
    }
  })
  const clickClose = () => {
    show.value = false
    emits('reloadData')
  }
  const refVFlowDesign = ref(null)
  const refAssociationForm = ref(null)
  const refBasicsInfo = ref(null)
  const refAdvancedSetup = ref(null)
  const errorInfo = ref([])
  const modelIds = ref({
    modelId: '',
    definitionId: ''
  })
  const editInitModel = ref(true)
  const loadingModel = ref(false)
  const editBasicsForm = ref({
    applyTypeId: '',
    fileType: [],
    dataScope: [],
    flowName: '',
    readme: '',
    sealUseTypeId: ''
  })

  const formMessageId = ref('')

  // 编辑回显
  const editInit = () => {
    // 更新 modelId
    modelIds.value.definitionId = props.editModleIds.definitionId
    modelIds.value.modelId = props.editModleIds.modelId
    flowStore.setModelId(modelIds.value.modelId, modelIds.value.definitionId)

    apiFlow
      .flowDetail({
        flowMessageId: props.editModleIds.flowMessageId
      })
      .then(res => {
        editBasicsForm.value = {
          applyTypeId: res.data.applyTypeId,
          fileType: res.data.fileType,
          dataScope: res.data.dataScope,
          flowName: res.data.flowName,
          readme: res.data.readme,
          sealUseTypeId: res.data.sealUseTypeId
        }

        // 关联表单信息
        formMessageId.value = res.data.formMessageId
      })
  }
  // 编辑 - 初始化form
  if (props.openType === 'edit') {
    editInit()
  }
  const changeTabs = async attr => {
    if (attr.index === '3') {
      // 1 编辑
      if (props.openType === 'edit') {
        loadingModel.value = true
        handleTabFn(attr)
        if (!editInitModel.value) {
          loadingModel.value = false
          return
        }

        editModelApi
          .flowDetail({
            ...props.editModleIds,
            edit: true
          })
          .then(res => {
            loadingModel.value = false
            editInitModel.value = false
            refVFlowDesign.value.handleSetData(res.data.data)
          })

        return
      }
      // 2 新增
      // 优先判断 - 基础信息填写完成
      errorInfo.value = []
      const basicsResult = await refBasicsInfo.value.getBasicsFormValue()
      if (Array.isArray(basicsResult)) {
        for (const k in basicsResult[0]) {
          errorInfo.value.push({
            type: '基础信息',
            message: basicsResult[0][k][0].message
          })
        }
        ElMessage.warning('请填写基础信息')
      }
      const associationResult = refAssociationForm.value.getAssociationValue()
      if (Array.isArray(associationResult)) {
        for (const k in associationResult[0]) {
          errorInfo.value.push({
            type: '关联表单',
            message: associationResult[0][k][0].message
          })
        }
        ElMessage.warning('请选择关联表单')
      }

      if (errorInfo.value.length > 0) return

      modelIds.value = await refAssociationForm.value
        .saveAddModel(refBasicsInfo.value.form.flowName)
        .catch(err => {
          state.jyBoxHeader = '提示？'
          state.jyBoxCont = err
          state.jyBoxShow = true
        })

      // ② 是否 模型建立
      if (!modelIds.value) {
        // 新增 - 初次 流程设计模型
        state.jyBoxHeader = '提示？'
        state.jyBoxCont = '请填写完整信息'
        state.jyBoxShow = true
      }
    }
    handleTabFn(attr)
  }

  const handleTabFn = attr => {
    state.tabsData.forEach(item => {
      item.checked = false
      if (item.index === attr.index) {
        item.checked = true
        state.checkedIndex = item.index
      }
    })
  }
  const jyBoxCancel = () => {
    state.jyBoxShow = false
  }

  // 点击保存
  const clickSave = async () => {
    errorInfo.value = []

    // 基础信息
    const basicsResult = await refBasicsInfo.value.getBasicsFormValue()
    if (Array.isArray(basicsResult)) {
      for (const k in basicsResult[0]) {
        errorInfo.value.push({
          type: '基础信息',
          message: basicsResult[0][k][0].message
        })
      }
    }
    const associationResult = refAssociationForm.value.getAssociationValue()
    console.log(associationResult, '表单', Array.isArray(associationResult))
    if (Array.isArray(associationResult)) {
      for (const k in associationResult[0]) {
        errorInfo.value.push({
          type: '关联表单',
          message: associationResult[0][k][0].message
        })
      }
    }
    let designResult = []
    if (refVFlowDesign.value) {
      designResult = await refVFlowDesign.value.designSave(
        props.openType === 'add' ? 'designModel' : 'updateModel'
      )
      if (Array.isArray(designResult)) {
        for (const k in designResult[0]) {
          errorInfo.value.push({
            type: '流程设计',
            message: designResult[0][k][0].message
          })
        }
      }
    } else {
      errorInfo.value.push({
        type: '流程设计',
        message: '请设计流程'
      })
    }

    console.log(errorInfo.value.length, '错误信息', errorInfo.value)
    if (errorInfo.value.length > 0) return

    const params = {
      ...basicsResult,
      ...associationResult,
      ...designResult
    }
    if (props.openType === 'add') {
      // 保存流程设计
      apiFlow.add(params).then(() => {
        clickClose()
        emits('reloadData')
      })
    } else if (props.openType === 'edit') {
      ModelApi.detail({ modelId: props.editModleIds.modelId }).then(res => {
        // flowStore.setModelId(props.editModleIds.modelId, res.definitionId)
        apiFlow
          .flowEdit({
            ...params,
            flowMessageId: props.editModleIds.flowMessageId,
            modelId: props.editModleIds.modelId,
            definitionId: res.definitionId
          })
          .then(() => {
            clickClose()
            emits('reloadData')
          })
      })
    }
  }

  watch(
    () => modelIds.value,
    val => {
      if (val) {
        if (!val || !val.modelId) return
        flowStore.setModelId(val.modelId, val.definitionId)
      }
    }
  )
</script>

<style scoped lang="scss">
  .flowManage-layout {
    margin: 0%;
    width: 100%;
    height: 100%;
    .process {
      width: 100%;
      height: 100%;
      .header {
        position: relative;
        z-index: 1;
        display: flex;
        height: 4rem;
        align-items: center;
        padding: 0% 1rem;
        box-sizing: border-box;
        box-shadow: 0px 3px 6px -4px rgba(0, 0, 0, 0.12),
          0px 6px 16px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05);
        background-color: #ffffff;
        justify-content: space-between;
        .process-back {
          color: rgba(0, 0, 0, 0.85);
          display: flex;
          align-items: center;
          min-width: 110px;
          font-size: 22px;
          .iconpark {
            width: 1.5rem;
            height: 1.5rem;
            display: flex;
            align-items: center;
            margin-right: 0.5rem;
            cursor: pointer;
            .iconpark-icon {
              width: 1.2rem;
              height: 1.2rem;
            }
          }
          .process-back-text {
            font-size: 22px;
            // cursor: pointer;
          }
        }
        .process-tabs {
          display: flex;
          height: 100%;
          min-width: 600px;
          flex: 1;
          justify-content: center;
          .tabs {
            display: flex;
            align-items: center;
            color: rgba(0, 0, 0, 0.45);
            margin: 0% 4%;
            box-sizing: border-box;
            height: 100%;
            cursor: pointer;
            border-bottom: 2px solid rgba(0, 0, 0, 0);
            .tabs-icon {
              width: 1.2rem;
              height: 1.2rem;
              border-radius: 50%;
              border: 1px solid rgba(0, 0, 0, 0.15);
              display: flex;
              align-items: center;
              justify-content: center;
              margin-right: 0.5rem;
            }
            .tabs-text {
              font-size: 16px;
            }
          }
          .checked-tabs {
            border-bottom: 2px solid var(--jy-primary-6);
            .tabs-icon {
              background-color: var(--jy-primary-6);
              border: 1px solid var(--jy-primary-6);
              color: #ffffff;
            }
            .tabs-text {
              color: var(--jy-primary-6);
            }
          }
        }
        .process-save {
          min-width: 200px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          .process-save-down {
            margin-right: 0.5rem;
            .process-save-down-text {
              color: var(--jy-danger-6);
              cursor: pointer;
            }
          }
        }
      }
      .content {
        width: 100%;
        height: calc(100% - 4rem);
        background-color: #f2f2f2;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        position: relative;
        z-index: 0;
      }
    }
  }

  .popover-cont {
    padding: 0.5rem;
    color: var(--jy-color-text-1);
    .popover-cont-title {
      font-size: var(--jy-font-size-title-1);
    }
    .popover-cont-subTitle {
      color: var(--jy-color-text-3);
      margin-top: 0.8rem;
    }
    .popover-cont-list {
      margin-top: 0.2rem;
      .popover-cont-list-li {
        display: flex;
        align-items: center;
        background: rgba(0, 0, 0, 0.04);
        justify-content: space-between;
        padding: 0.8rem 1rem;
        margin: 0rem 0rem 0.5rem 0rem;
        .popover-cont-list-li-name {
          width: 4rem;
        }
        .popover-cont-list-li-desc {
          color: var(--jy-color-text-3);
          width: calc(100% - 7rem);
          padding: 0% 0.5rem;
        }
        .popover-cont-list-li-but {
          color: var(--jy-info-6);
          width: 3rem;
          cursor: pointer;
        }
      }
    }
  }
</style>
