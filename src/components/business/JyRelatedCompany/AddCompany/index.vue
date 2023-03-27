<!--
* @Descripttion index.vue
* @FileName index.vue
* @Author zb
* @module 单位新增
* @LastEditTime 2023-03-09 13:52:44
!-->
<template>
  <div class="add-company">
    <JyDialog
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
            <el-form-item label="单位编码" prop="tenantId">
              <el-input v-model="formData.tenantId" disabled />
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
            <el-form-item label="联系人">
              <el-input v-model="formData.contactName" />
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="联系方式">
              <el-input v-model="formData.contactInformation" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="备注">
          <el-input
            v-model="formData.remark"
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
    </JyDialog>
  </div>
</template>

<script setup>
  import { computed, onMounted, ref } from 'vue'
  import { compManageService } from '@/api/system/compManage'
  import { CompanyAddInfo } from '@/utils/domain/compManage'
  import { ElMessage } from 'element-plus'
  import JyDialog from '@/components/common/JyDialog/index2.vue'

  const formData = ref(new CompanyAddInfo())
  const formRef = ref(null)
  const rules = {
    tenantId: [
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

  const opened = () => {
    if (props.editInfo) {
      formData.value = { ...formData.value, ...props.editInfo }
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
</style>
