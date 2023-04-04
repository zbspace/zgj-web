<!--
* @Descripttion index.vue
* @FileName index.vue
* @Author zb
* @module 单位新增
* @LastEditTime 2023-03-09 13:52:44
!-->
<template>
  <div class="add-company">
    <JyDialog2
      v-model="isVisible"
      :width="900"
      title="单位新增"
      :mode="1"
      @on-opened="opened"
      @on-closed="closed"
      :appendToBody="true"
    >
      <el-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        label-width="82px"
        class="demo-ruleForm"
      >
        <el-row :gutter="20">
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="单位编码" prop="relatedCompanyNo">
              <el-input v-model="formData.relatedCompanyNo" disabled />
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="单位名称" prop="relatedCompanyName">
              <el-input
                v-model="formData.relatedCompanyName"
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="联系人" prop="contactName">
              <el-input v-model="formData.contactName" />
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="联系方式" prop="contactInformation">
              <el-input v-model="formData.contactInformation" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="所属部门" prop="organId">
              <el-select
                v-model="formData.organId"
                collapse-tags
                collapse-tags-tooltip
                :max-collapse-tags="5"
                placeholder="请选择"
                style="width: 100%"
                @focus="openSelectOrgan"
                popper-class="select-hidden"
                ref="selectRef"
                class="select-prefix"
              >
                <template #prefix>
                  <svg class="iconpark-icon">
                    <use href="#selecticon"></use>
                  </svg>
                </template>
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="备注">
          <el-input
            v-model="formData.readme"
            maxlength="100"
            placeholder="请输入"
            show-word-limit
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 4 }"
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button @click="cancel">取消</el-button>
      </template>

      <kDepartOrPersonVue
        :multiple="false"
        :show="xzyzDialogVisible"
        @update:show="xzyzDialogVisible = $event"
        :searchSelected="[]"
        @update:searchSelected="callback"
        :tabsShow="['organ']"
        apiModule="systemOrganOrPerson"
        v-if="xzyzDialogVisible"
      />
    </JyDialog2>
  </div>
</template>

<script setup>
  import { computed, onMounted, ref } from 'vue'
  import { compManageService } from '@/api/system/compManage'
  import { CompanyAddInfo } from '@/utils/domain/compManage'
  import { ElMessage } from 'element-plus'
  import JyDialog2 from '@/components/common/JyDialog/index2.vue'
  import kDepartOrPersonVue from '@/views/components/modules/KDepartOrPersonDialog'
  import Validator from '@/utils/validator'

  const formData = ref(new CompanyAddInfo())
  const formRef = ref(null)
  const selectRef = ref(null)
  const xzyzDialogVisible = ref(false)
  const options = ref([])
  const rules = {
    contactName: [
      {
        required: true,
        message: '请输入',
        trigger: 'change'
      }
    ],
    relatedCompanyName: [
      {
        required: true,
        message: '请输入',
        trigger: 'change'
      }
    ],
    organId: [
      {
        required: true,
        message: '请选择',
        trigger: 'change'
      }
    ],
    contactInformation: [
      {
        required: true,
        validator: Validator.validateMobile,
        trigger: 'blur'
      }
    ]
  }

  const props = defineProps({
    modelValue: {
      type: Boolean,
      defult: false
    },
    editInfo: {
      type: Object,
      defult: null
    }
  })

  const emit = defineEmits(['update:modelValue', 'on-success', 'on-closed'])

  const isVisible = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      emit('update:modelValue', value)
    }
  })

  const submit = async () => {
    try {
      await formRef.value.validate()
      if (!formData.value.relatedCompanyId) {
        await compManageService.relatedCompanyAdd(formData.value)
        ElMessage.success('往来单位创建成功')
      } else {
        await compManageService.relatedCompanyUpdate(formData.value)
        ElMessage.success('往来单位修改成功')
      }

      isVisible.value = false
      formData.value = new CompanyAddInfo()
      emit('on-success')
    } catch (error) {}
  }

  const cancel = () => {
    formData.value = new CompanyAddInfo()
    emit('update:modelValue', false)
  }

  const callback = value => {
    if (value && value.length) {
      formData.value.organId = value[0].id
      formData.value.organName = value[0].name
      options.value = value
    }
  }

  const openSelectOrgan = () => {
    selectRef.value.blur()
    xzyzDialogVisible.value = true
  }

  const opened = async () => {
    if (props.editInfo) {
      formData.value = { ...formData.value, ...props.editInfo }
      options.value = [
        {
          id: props.editInfo.organId,
          name: props.editInfo.organName
        }
      ]
    }
    if (!formData.value.relatedCompanyNo) {
      const res = await compManageService.getRelatedCompanyNo()
      formData.value.relatedCompanyNo = res.data
    }
  }

  const closed = () => {
    emit('on-closed')
  }

  onMounted(() => {})
</script>

<script>
  export default {
    name: 'AddCompany'
  }
</script>

<style lang="scss" scoped>
  .add-company {
    .select-block {
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
      .iconpark-icon {
        width: 16px;
        height: 16px;
        margin-right: 8px;
      }
    }
  }
  // select 自定义右侧icon
  :deep(.select-prefix) {
    .el-input__suffix {
      display: none;
    }
    .el-input__prefix {
      position: absolute;
      right: 16px;
      width: 12px;
      height: 16px;
      .el-input__prefix-inner {
        .iconpark-icon {
          display: inline-block;
          width: 16px;
          height: 16px;
          color: #000;
        }
      }
    }
  }
</style>
<style>
  .select-hidden {
    display: none;
  }
</style>
