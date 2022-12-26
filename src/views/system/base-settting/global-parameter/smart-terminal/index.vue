<template>
  <div class="smart-terminal-container">
    <el-form :model="form" label-width="180px">
      <el-row>
        <el-col :span="8">
          <el-form-item>
            <template #label>
              <div class="label-t">多设备授权</div>
            </template>
            <el-switch v-model="form.ApprovalProcess" />
          </el-form-item>
        </el-col>
    
        <el-col :span="8">
          <el-form-item>
            <template #label>
              <div class="label-t">工作台归档图片自动剪裁</div>
            </template>
            <el-switch v-model="form.RecheckCover" />
          </el-form-item>
        </el-col>
    
        <el-col :span="8">
          <el-form-item>
            <template #label>
              <div class="label-t">APP归档图片自动剪裁</div>
            </template>
            <el-switch v-model="form.RepeatSeal" />
          </el-form-item>
        </el-col>
    
      </el-row>
    
      <el-row>
        <el-col :span="24">
          <el-form-item>
            <template #label>
              <div class="label-t">物品领用截止时间</div>
            </template>
            <el-input-number v-model="form.sealEndTime" /> &nbsp; &nbsp; 小时
          </el-form-item>
        </el-col>
    
      </el-row>
    </el-form>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
const form = reactive({
  ApprovalProcess: true,
  RecheckCover: true,
  RepeatSeal: true,
  ResetArchive: true,
  BatchArchiving: true,
  sealEndTime: 0,
  noSealEndTime: 0
})
</script>

<style lang="scss" scoped>
.smart-terminal-container {
  width: 100%;
  padding-top: 20px;
}
</style>
