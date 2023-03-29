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
            <el-select v-model="form.applyTypeId">
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
              <el-radio label="1" size="large">物理用印</el-radio>
              <el-radio label="2" size="large">电子签章</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="文件类型"
            prop="fileTypeIds"
            v-if="form.applyTypeId === props.sealApplyInitId"
          >
            <el-select
              v-model="form.fileTypeIds"
              ref="selectRef"
              placeholder="请选择"
              multiple
              collapse-tags
              collapse-tags-tooltip
              @click="getDivision"
            >
              <el-option
                :label="item.fileTypeName"
                :value="item.fileTypeId"
                v-for="item in fileTypeList"
                :key="item.fileTypeId"
              />
            </el-select>
            <div class="box-icon" v-show="false">
              <img
                class="box-icon-img"
                src="@/assets/svg/ketanchude.svg"
                alt=""
              />
            </div>
          </el-form-item>
          <el-form-item label="流程适用范围" prop="showDataScope">
            <el-select
              v-model="form.showDataScope"
              ref="selectFileRef"
              placeholder="请选择"
              multiple
              collapse-tags
              collapse-tags-tooltip
              @click="getFileType"
            >
              <el-option
                :label="item.name"
                :value="item.id"
                v-for="item in rangeList"
                :key="item.id"
              />
            </el-select>
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
      @update:searchSelected="searchSelected = $event"
      :tabsShow="tabsShow"
      :activeTab="activeTab"
      v-if="showDepPerDialog"
    >
    </kDepartOrPersonVue>

    <!-- 文件类型 -->
    <KDocumentTypeDialog
      v-if="showDocumentType"
      v-model:show="showDocumentType"
      v-model:searchSelected="searchSelectedDocument"
    ></KDocumentTypeDialog>
  </div>
</template>
<script setup>
  import { reactive, ref, watch, computed } from 'vue'
  import kDepartOrPersonVue from '@/views/components/modules/KDepartOrPersonDialog'
  import KDocumentTypeDialog from '@/views/components/modules/KDocumentTypeDialog'

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
    }
  })
  const emits = defineEmits('update:modelValue', 'update:sealId')
  const showDepPerDialog = ref(false)
  const showDocumentType = ref(false)
  const searchSelected = ref([])
  const tabsShow = ref(['user', 'organ'])
  const activeTab = ref('user')
  const fileTypeList = ref([])
  const rangeList = ref([])
  const ruleFormRef = ref(null)

  const form = reactive({
    flowName: '',
    applyTypeId: '',
    sealUseTypeId: '1',
    fileTypeIds: [],
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

  // const setFileTypeList = async () => {
  //   try {
  //     const res = await fileManageService.getFileTypeList(form.applyTypeId)
  //     fileTypeList.value = res.data || []
  //   } catch (error) {
  //     messageError(error)
  //   }
  // }

  form.sealUseTypeId = computed({
    get() {
      return props.sealId
    },
    set(value) {
      emits('update:sealId', value)
    }
  })

  watch(
    () => searchSelected.value,
    val => {
      const arr = []
      if (val.length > 0 && val) {
        val.forEach(item => {
          arr.push(item.name)
          // 初始化 form.dataScope
          form.dataScope.push({
            scopeId: item.id,
            scopeName: item.name,
            scipeType: item.type === 'user' ? '1' : '2'
          })
        })
        form.showDataScope = arr
        rangeList.value = val
      } else {
        form.showDataScope = []
        form.dataScope = []
      }
    }
  )

  watch(
    () => form.applyTypeId,
    val => {
      // if (val === props.sealApplyInitId) {
      //   setFileTypeList()
      // }
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

  watch(
    () => searchSelectedDocument.value,
    val => {
      if (!val) return
      const arr = []
      const selectIds = []
      val.forEach(item => {
        arr.push({
          fileTypeId: item.fileTypeId,
          fileTypeName: item.fileTypeName
        })
        selectIds.push(item.fileTypeId)
      })
      fileTypeList.value = arr
      form.fileTypeIds = selectIds
    }
  )

  defineExpose({
    getBasicsFormValue,
    form
  })
</script>
<style lang="scss" scoped>
  .flowManage-basics-info {
    margin: 0%;
    width: 90%;
    height: calc(95% - 1rem);
    margin-top: 1rem;
    background-color: var(--jy-color-fill--5);
    .info-box {
      width: 50%;
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
