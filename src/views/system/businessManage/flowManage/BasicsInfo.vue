<!--
* @Descripttion 基础信息-新建流程
* @FileName basics-info.vue
* @Author WalterXsk
* @LastEditTime 2023-03-16 16:17:17
!-->
<template>
  <div class="flowManage-basics-info">
    <div class="info-box">
      <div class="info-title"> 请填写如下基础信息 </div>
      <div class="info-from">
        <el-form
          :model="form"
          label-width="120px"
          :rules="rules"
          ref="ruleFormRef"
        >
          <el-form-item label="流程名称" prop="flowName">
            <el-input v-model="form.flowName" placeholder="请输入" clearable />
          </el-form-item>
          <el-form-item label="业务类型" prop="applyTypeId">
            <el-select
              v-model="form.applyTypeId"
              ref="selectApplyRef"
              @click="changeSelect"
            >
              <el-option-group
                v-for="group in props.businessList"
                :key="group.applyTypeName"
                :label="group.applyTypeName"
              >
                <el-option
                  v-for="item in group.children"
                  :key="item.applyTypeId"
                  :label="item.applyTypeName"
                  :value="item.applyTypeId"
                />
              </el-option-group>
            </el-select>
          </el-form-item>
          <el-form-item
            label="用印类型"
            prop="sealUseTypeId"
            v-if="form.applyTypeId === props.sealApplyInitId"
          >
            <el-radio-group v-model="form.sealUseTypeId">
              <el-radio label="1" size="large" @change="changeRadio('2')">
                物理用印
              </el-radio>
              <el-radio label="2" size="large" @change="changeRadio('1')">
                电子签章
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="文件类型"
            prop="fileTypeIds"
            v-if="form.applyTypeId === props.sealApplyInitId"
          >
            <div class="contbox">
              <el-select
                v-model="form.fileTypeIds"
                ref="selectRef"
                placeholder="请选择"
                multiple
                collapse-tags
                collapse-tags-tooltip
                :max-collapse-tags="4"
                @click="getDivision"
              >
                <el-option
                  :label="item.fileTypeName"
                  :value="item.fileTypeId"
                  v-for="item in fileTypeList"
                  :key="item.fileTypeId"
                />
              </el-select>
              <div class="box-icon">
                <img
                  class="box-icon-img"
                  src="@/assets/svg/ketanchude.svg"
                  alt=""
                />
              </div>
            </div>
          </el-form-item>
          <el-form-item label="流程适用范围" prop="showDataScope">
            <div class="contbox">
              <el-select
                v-model="form.showDataScope"
                ref="selectFileRef"
                placeholder="请选择"
                multiple
                collapse-tags
                collapse-tags-tooltip
                :max-collapse-tags="4"
                @click="getFileType"
              >
                <el-option
                  :label="item.name || item.scopeName"
                  :value="item.id || item.scopeId"
                  v-for="item in rangeList"
                  :key="item.id || item.scopeId"
                />
              </el-select>
              <div class="box-icon">
                <img
                  class="box-icon-img"
                  src="@/assets/svg/ketanchude.svg"
                  alt=""
                />
              </div>
            </div>
          </el-form-item>
          <el-form-item label="流程说明">
            <el-input
              v-model="form.readme"
              type="textarea"
              maxlength="100"
              show-word-limit
              placeholder="请输入"
            />
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 人员选择  -->
    <kDepartOrPersonVue
      :show="showDepPerDialog"
      @update:show="showDepPerDialog = $event"
      :searchSelected="searchSelected"
      @update:searchSelected="handleDepSelected"
      :tabsShow="tabsShow"
      :activeTab="activeTab"
      v-if="showDepPerDialog"
    >
    </kDepartOrPersonVue>

    <!-- 文件类型 -->
    <KDocumentTypeDialog
      v-if="showDocumentType"
      v-model:show="showDocumentType"
      :searchSelected="searchSelectedDocument"
      @update:searchSelected="handleFileSelected"
      :queryParams="queryParams"
    ></KDocumentTypeDialog>

    <JyMessageBox
      v-model="tipVisible"
      :mode="1"
      @on-confirm="confirmTip"
      @on-cancel="cancelTip"
    >
      变更会清空已设计的流程，请问确定要继续吗？
    </JyMessageBox>
  </div>
</template>
<script setup>
  import { reactive, ref, watch, computed } from 'vue'
  import kDepartOrPersonVue from '@/views/components/modules/KDepartOrPersonDialog'
  import KDocumentTypeDialog from '@/views/components/modules/KDocumentTypeDialog'
  import { useFlowStore } from '@/components/FlowDesign/store/flow'
  import { getItem } from '@/utils/storage'

  const flowStore = useFlowStore()
  const props = defineProps({
    businessList: {
      type: Array,
      default: () => {
        return []
      }
    },
    modelValue: {
      type: String,
      default: ''
    },
    sealId: {
      type: String,
      default: ''
    },
    sealApplyInitId: {
      type: String,
      default: ''
    },
    openType: {
      type: String,
      default: 'add'
    },
    editBasicsForm: {
      type: Object,
      default: () => {
        return {
          flowName: '',
          applyTypeId: '',
          sealUseTypeId: '1',
          fileTypeIds: [],
          fileTypeScope: [],
          showDataScope: [],
          dataScope: [],
          readme: ''
        }
      }
    },
    modelLinkId: {
      type: Object,
      deftault: () => {
        return {}
      }
    }
  })
  const emits = defineEmits(
    'update:modelValue',
    'update:sealId',
    'update:modelLinkId'
  )
  const showDepPerDialog = ref(false)
  const showDocumentType = ref(false)
  const searchSelected = ref([])
  const tabsShow = ref(['user', 'organ'])
  const activeTab = ref('user')
  const fileTypeList = ref([])
  const rangeList = ref([])
  const ruleFormRef = ref(null)
  const tipVisible = ref(false)

  const form = reactive({
    flowName: '',
    applyTypeId: '',
    sealUseTypeId: '1',
    fileTypeIds: [],
    fileTypeScope: [],
    showDataScope: [],
    dataScope: [],
    readme: ''
  })

  const rules = reactive({
    flowName: [
      {
        required: true,
        message: '请填写流程名称',
        trigger: 'change'
      }
    ],
    applyTypeId: [
      {
        required: true,
        message: '请选择业务类型',
        trigger: 'change'
      }
    ],
    sealUseTypeId: [
      {
        required: true,
        message: '请选择用印类型',
        trigger: 'change'
      }
    ],
    fileTypeIds: [
      {
        required: true,
        message: '请选择文件类型',
        trigger: ['change', 'blur']
      }
    ],
    showDataScope: [
      {
        required: true,
        message: '请选择流程适用范围',
        trigger: ['change', 'blur']
      }
    ]
  })

  const userId =
    getItem('accountInfo') && getItem('accountInfo').userInfo
      ? getItem('accountInfo').userInfo.userId
      : ''
  const queryParams = ref({
    userId
  })
  watch(
    () => props.editBasicsForm,
    val => {
      if (val && val.flowName) {
        if (props.openType === 'edit') {
          form.flowName = val.flowName
          form.applyTypeId = val.applyTypeId
          form.sealUseTypeId = val.sealUseTypeId
          form.readme = val.readme
          handleScopeArr(val.dataScope)
          handleFileArr(val.fileType)
          searchSelected.value = val.dataScope.map(item => {
            return {
              id: item.scopeId || item.id,
              name: item.scopeName || item.name,
              type: item.type,
              includeChild: item.includeChild,
              haveChildren: item.haveChildren,
              idFullPathSet: item.idFullPathSet ? item.idFullPathSet : []
            }
          })

          searchSelectedDocument.value = val.fileType.map(item => {
            return {
              fileTypeId: item.fileTypeId,
              fileTypeName: item.fileTypeName,
              type: 'document',
              includeChild: item.includeChild,
              haveChildren: item.haveChildren
            }
          })
        }
      }
    }
  )

  const selectRef = ref(null)
  const getDivision = () => {
    selectRef.value.blur()
    showDocumentType.value = true
  }

  const selectFileRef = ref(null)
  const getFileType = () => {
    selectFileRef.value.blur()
    showDepPerDialog.value = true
  }

  const getBasicsFormValue = async () => {
    const valid = await ruleFormRef.value.validate().catch(err => err)
    if (typeof valid === 'boolean' && valid) {
      return form
    } else {
      return [valid]
    }
  }

  form.sealUseTypeId = computed({
    get() {
      return props.sealId
    },
    set(value) {
      emits('update:sealId', value)
    }
  })

  const handleDepSelected = val => {
    searchSelected.value = val
    handleScopeArr(val)
  }

  const handleScopeArr = val => {
    const arr = []
    if (val && val.length > 0) {
      form.dataScope = []
      rangeList.value = val
      val.forEach(item => {
        arr.push(item.id || item.scopeId)
        // 初始化 form.dataScope
        form.dataScope.push({
          scopeId: item.id || item.scopeId,
          scopeName: item.name || item.scopeName,
          includeChild: item.includeChild,
          scopeType: item.scopeType
            ? item.scopeType
            : item.type === 'user'
            ? 1
            : 2
        })
      })
      form.showDataScope = arr
    } else {
      form.showDataScope = []
      form.dataScope = []
    }
  }

  // 监听 流程设计是否初始化完成
  const testIds = computed({
    get() {
      return props.modelLinkId
    },
    set(value) {
      emits('update:modelLinkId', value)
    }
  })

  const typeTip = ref('apply')

  const selectApplyRef = ref(null)
  const changeSelect = () => {
    // 判断是否已有设计 - 有提示信息
    selectApplyRef.value.blur()
    tipVisible.value = true
    typeTip.value = 'apply'
  }

  const confirmTip = () => {
    tipVisible.value = false
    if (typeTip.value === 'apply') {
      selectApplyRef.value.toggleMenu()
    } else {
      form.sealUseTypeId = form.sealUseTypeId === '1' ? '2' : '1'
    }
    // 重新初始化流程设计
    flowStore.setModelId('', '')
    testIds.value = {
      modleId: '',
      definitionId: ''
    }
  }

  const cancelTip = () => {
    tipVisible.value = false
    if (typeTip.value === 'apply') {
      selectApplyRef.value.blur()
    }
  }

  const changeRadio = val => {
    // 判断是否已有设计 - 有提示信息
    if (testIds.value.modelId) {
      form.sealUseTypeId = val
      // 打开 提示弹框
      tipVisible.value = true
      typeTip.value = 'sealType'
    }
  }

  watch(
    () => form.applyTypeId,
    val => {
      emits('update:modelValue', val)
    }
  )

  watch(
    () => props.modelValue,
    val => {
      form.applyTypeId = val
    },
    {
      deep: true,
      immediate: true
    }
  )

  const searchSelectedDocument = ref([])

  const handleFileSelected = val => {
    searchSelectedDocument.value = val
    handleFileArr(val)
  }

  const handleFileArr = val => {
    const arr = []
    const selectIds = []
    val.forEach(item => {
      arr.push({
        fileTypeId: item.fileTypeId,
        fileTypeName: item.fileTypeName,
        includeChild: item.includeChild ? '1' : '0',
        type: 'document'
      })
      selectIds.push(item.fileTypeId)
    })
    fileTypeList.value = arr
    form.fileTypeIds = selectIds
    form.fileTypeScope = arr
  }

  defineExpose({
    getBasicsFormValue,
    form
  })
</script>
<style lang="scss" scoped>
  .flowManage-basics-info {
    margin: auto;
    width: calc(100vw - 160px);
    height: calc(100vh - 92px);
    min-height: 500px;
    min-width: 800px;
    margin-top: 16px;
    background-color: var(--jy-color-fill--5);
    .info-box {
      width: 680px;
      margin: 0% auto;
      text-align: center;
      .info-title {
        margin-top: 3rem;
        font-size: var(--jy-font-size-title-2);
        color: var(--jy-color-text-1);
      }
      .info-from {
        margin-top: 1.5rem;
      }
    }
    :deep(.el-form) {
      .el-form-item__label {
        margin-bottom: 0%;
      }
      .el-select {
        width: 100%;
      }
    }
  }
  .box-icon {
    position: absolute;
    right: 0.8rem;
    cursor: pointer;
    height: 50%;
    display: flex;
    align-items: center;

    .box-icon-img {
      height: 100%;
    }
  }
  .el-form-item {
    margin-bottom: 24px !important;
  }
</style>

<style lang="scss">
  .contbox {
    width: calc(100%);
    position: relative;
    display: flex;
    align-items: center;
    .el-input__suffix {
      display: none;
    }
  }
</style>
