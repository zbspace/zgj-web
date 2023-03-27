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
        >
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="业务规则名称" prop="ruleBusinessName">
                <el-input
                  v-model="ruleForm.ruleBusinessName"
                  clearable
                  placeholder="请输入"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="业务规则编码" prop="ruleBusinessNo">
                <el-input v-model="ruleForm.ruleBusinessNo" disabled />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="文件类型" prop="fileTypeIds">
                <el-select
                  v-model="ruleForm.fileTypeIds"
                  multiple
                  placeholder="请选择"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="用印类型" prop="sealUseTypeId">
                <el-select
                  v-model="ruleForm.sealUseTypeId"
                  placeholder="请选择"
                  style="width: 100%"
                  disabled
                >
                  <el-option label="物理用印" value="1" />
                  <el-option label="电子签章" value="2" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-tabs type="border-card">
            <el-tab-pane label="智能用印">
              <div class="labelTitle">用印设置</div>
              <div class="grayBg">
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="外借电子围栏" prop="railSwitch">
                      <el-switch v-model="ruleForm.railSwitch" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="批量用印" prop="batchSwitch">
                      <el-switch v-model="ruleForm.batchSwitch" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
              <div class="grayBg">
                <el-form-item label="防伪打印" prop="railSwitch">
                  <el-switch v-model="ruleForm.railSwitch" />
                </el-form-item>
              </div>
            </el-tab-pane>
            <el-tab-pane label="普通用印">User</el-tab-pane>
          </el-tabs>
        </el-form>
      </div>
    </componentsLayout>
  </div>
</template>

<script setup>
  import { reactive, ref, onMounted } from 'vue'
  import componentsLayout from '@/views/components/Layout'

  const ruleForm = ref({
    ruleBusinessName: '',
    ruleBusinessNo: '',
    fileTypeIds: [],
    sealUseTypeId: '1'
  })

  const rules = ref({
    ruleBusinessName: [
      {
        required: true,
        message: '请输入业务规则名称',
        trigger: 'change'
      }
    ],
    fileTypeIds: [
      {
        required: true,
        message: '请选择文件类型',
        trigger: 'change'
      }
    ]
  })

  onMounted(() => {})
</script>

<style lang="scss" scoped>
  .ap-deliberate {
    width: 100%;
  }
  .title {
    font-size: 22px;
    margin: 16px 0;
  }
</style>
