<template>
  <div>
    <el-form :model="form" label-width="160px" style="margin-top: 20px;">
      <el-row>
        <el-col :span="24">
          <el-form-item>
            <template #label>
              <div class="label-t">附件大小</div>
            </template>
            <el-input v-model="form.fileSize" placeholder="请输入" size="large" />
          </el-form-item>
        </el-col>
    
      </el-row>
    
      <el-row>
        <el-col :span="24">
          <el-form-item>
            <template #label>
              <div class="label-t">允许批量文件归档</div>
            </template>
            <el-switch v-model="form.FileArchive" />
          </el-form-item>
        </el-col>
    
      </el-row>
    
      
    </el-form>
  </div>
</template>

<script setup>
import { reactive } from "vue"
const form = reactive({ 
  fileSize: '',
  FileArchive: false
})
</script>

<style lang="scss" scoped>
.label-t {
  color: rgba(0, 0, 0, 0.85);
  line-height: 40px;
  font-size: 14px;
  margin-right: 12px;
}
</style>
