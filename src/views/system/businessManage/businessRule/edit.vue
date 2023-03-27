<template>
  <div>
    <componentsLayout special>
      <div class="ap-deliberate">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item
            style="--el-text-color-regular: rgba(0, 0, 0, 0.65)"
          >
            业务管理
          </el-breadcrumb-item>
          <el-breadcrumb-item
            style="--el-text-color-regular: rgba(0, 0, 0, 0.25)"
          >
            业务规则管理
          </el-breadcrumb-item>
          <el-breadcrumb-item
            style="--el-text-color-regular: rgba(0, 0, 0, 0.25)"
          >
            新增
          </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="title">新增</div>
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-width="120px"
          class="demo-ruleForm"
          :size="formSize"
          status-icon
        >
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="Activity name" prop="name">
                <el-input v-model="ruleForm.name" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <div class="grid-content ep-bg-purple" />
            </el-col>
          </el-row>
        </el-form>
      </div>
    </componentsLayout>
  </div>
</template>

<script setup>
  import { reactive, ref, onMounted } from 'vue'
  import componentsLayout from '@/views/components/Layout'

  const ruleForm = ref({
    a: ''
  })

  const rules = ref({
    a: [
      {
        required: true,
        message: 'Please input Activity name',
        trigger: 'blur'
      }
    ]
  })

  onMounted(() => {})
</script>

<style lang="scss" scoped>
  .title {
    font-size: 22px;
    margin-top: 16px;
  }
</style>
