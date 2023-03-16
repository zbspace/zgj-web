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
          <el-form-item label="流程名称" prop="processName">
            <el-input
              v-model="form.processName"
              placeholder="请输入"
              clearable
            />
          </el-form-item>
          <el-form-item label="业务类型" prop="applyTypeId">
            <el-tree-select
              clearable
              v-model="form.applyTypeId"
              :data="props.businessList"
              :render-after-expand="false"
              highlight-current
              accordion
              node-key="applyTypeId"
              :props="{
                label: 'applyTypeName',
                children: 'children'
              }"
            />
          </el-form-item>
          <el-form-item
            label="用印类型"
            prop="sealUseTypeId"
            v-if="form.applyTypeId === '2'"
          >
            <el-radio-group v-model="form.sealUseTypeId">
              <el-radio :label="1" size="large">物理用印</el-radio>
              <el-radio :label="2" size="large">电子签章</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="文件类型"
            prop="fileTypeIds"
            v-if="form.applyTypeId === '2'"
          >
            <el-select
              v-model="form.fileTypeIds"
              multiple
              placeholder="请选择"
              clearable
            >
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="流程适用范围" prop="dataScope">
            <el-input
              v-model="form.dataScope"
              readonly
              @click="showDepPerDialog = true"
              placeholder="请输入"
            />
            <div class="box-icon">
              <img
                class="box-icon-img"
                src="@/assets/svg/ketanchude.svg"
                alt=""
              />
            </div>
          </el-form-item>
          <el-form-item label="流程说明">
            <el-input
              v-model="form.remark"
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
  </div>
</template>
<script setup>
  import { reactive, ref, watch } from 'vue'
  import kDepartOrPersonVue from '@/views/components/modules/KDepartOrPersonDialog'
  const props = defineProps({
    businessList: {
      type: Array,
      default: () => {
        return [] // ['table', 'rate', 'switch'] 自定义组件的type
      }
    }
  })
  const showDepPerDialog = ref(false)
  const searchSelected = ref([])
  const tabsShow = ref(['user'])
  const activeTab = ref('user')

  const form = reactive({
    processName: '',
    applyTypeId: '2',
    sealUseTypeId: 1,
    fileTypeIds: [],
    dataScope: [],
    remark: ''
  })

  const rules = reactive({
    processName: [
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
        trigger: 'change'
      }
    ],
    dataScope: [
      {
        required: true,
        message: '请选择流程适用范围',
        trigger: 'change'
      }
    ]
  })

  const getFormValue = () => {
    return form
  }

  watch(
    () => searchSelected.value,
    val => {
      console.log(val, 12)
      const arr = []
      if (val.length > 0 && val) {
        val.forEach(item => {
          arr.push(item.name)
        })
        form.dataScope = arr.join(',')
      } else {
        form.dataScope = null
      }
    }
  )
  defineExpose({
    getFormValue
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
</style>
