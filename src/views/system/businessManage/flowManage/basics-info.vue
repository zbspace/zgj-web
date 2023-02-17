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
          status-icon
        >
          <el-form-item label="流程名称" required>
            <el-input v-model="form.ProcessName" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="业务类型" required>
            <el-select v-model="form.businessType" placeholder="请选择">
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="文件类型" required>
            <el-select v-model="form.fileType" placeholder="请选择">
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="流程适用范围" required>
            <el-input v-model="form.rangeApplication" />
          </el-form-item>
          <el-form-item label="流程说明">
            <el-input
              v-model="form.desc"
              type="textarea"
              placeholder="请输入"
            />
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { reactive } from 'vue'
  const form = reactive({
    ProcessName: '',
    ProcessType: false,
    businessType: '',
    fileType: '',
    rangeApplication: '',
    desc: ''
  })
  const rules = reactive({
    name: [
      {
        required: true
        // message: '名称为空，请填写',
        // trigger: 'blur'
      }
    ],
    region: [
      {
        required: true
        // message: '类型为空，请选择',
        // trigger: 'change'
      }
    ]
  })
</script>
<style lang="scss" scoped>
  .flowManage-basics-info {
    margin: 0%;
    width: 90%;
    height: calc(95% - 1rem);
    margin-top: 1rem;
    background-color: var(--color-fill--5);
    .info-box {
      width: 50%;
      margin: 0% auto;
      text-align: center;
      .info-title {
        margin-top: 3rem;
        font-size: var(--font-size-title-2);
        color: var(--color-text-1);
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
</style>
