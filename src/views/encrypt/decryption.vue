<template>
  <div class="encrypt-container">
    <div class="content">
      <div class="title">解密工具</div>

      <div class="box">
        <el-form :model="form" label-width="120px">
          <el-form-item label="解密内容">
            <el-input
              v-model="form.messge"
              type="textarea"
              placeholder="解密内容"
            />
          </el-form-item>

          <el-form-item label="解密算法">
            <el-input
              v-model="form.algorithm"
              placeholder="请输入"
              min="6"
              max="50"
            />
          </el-form-item>

          <el-form-item label="输出类型">
            <el-radio-group v-model="form.type">
              <el-radio label="1">16进制</el-radio>
              <el-radio label="2">base64</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="解密密码">
            <el-input
              v-model="form.pwdStr"
              placeholder="请输入"
              min="8"
              max="100"
            />
          </el-form-item>
          <!-- <el-form-item label="加密结果"> </el-form-item> -->
        </el-form>

        <!-- <el-input
          v-model="form.result"
          type="textarea"
          placeholder="加密结果"
          style="margin-left: 50px; width: 515px"
        /> -->

        <div class="btn">
          <el-button type="primary" @click="onSubmit">解密</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { reactive } from 'vue'

  const form = reactive({
    pwdStr: '',
    algorithm: 'PBEWITHHMACSHA512ANDAES_256',
    messge: '',
    type: '1', // outputType: 'hexadecimal' '1'
    outputType: 'hexadecimal'
  })

  const onSubmit = () => {
    console.log('submit!')
  }
</script>

<style scoped lang="scss">
  .encrypt-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    min-height: 800px;
    background: #f0f2f3;
    .content {
      width: 600px;
      height: 460px;
      background: #fff;
      border-radius: 8px;

      .title {
        font-size: 18px;
        font-weight: 600;
        padding: 40px 24px;
      }

      .box {
        padding: 0px 32px 24px 0;
      }
    }

    .btn {
      display: flex;
      justify-content: center;
      margin-top: 80px;
    }
  }
</style>
