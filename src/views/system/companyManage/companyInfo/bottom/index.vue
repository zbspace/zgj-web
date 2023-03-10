<template>
  <div class="comp-info-bottom">
    <JyLabel label="系统页面设置" />
    <div class="switch">
      <span>页面水印</span>
      <el-switch v-model="value" size="large" inactive-text="" />
    </div>
    <div class="upload">
      <el-upload
        drag
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      >
        <div class="uploadTip">
          <img class="uploadIcon" :src="shapeIcon" />
          <p>上传首页LOGO</p>
        </div>
        <!-- <el-image class="logoImage" :src="shapeIcon" fit="contain"></el-image> -->
      </el-upload>
    </div>
    <div class="upload">
      <el-upload
        drag
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      >
        <div class="uploadTip">
          <img class="uploadIcon" :src="shapeIcon" />
          <p>上传登录页LOGO</p>
        </div>
        <!-- <el-image class="logoImage" :src="shapeIcon" fit="contain"></el-image> -->
      </el-upload>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import shapeIcon from '@/assets/svg/system/comp-info/shape.svg'
  const value = ref(false)
</script>

<style lang="scss" scoped>
  .comp-info-bottom {
    background-color: #fff;
    padding: 24px;
    .switch {
      margin-bottom: 10px;

      span {
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        color: rgba(0, 0, 0, 0.85);
        margin-right: 14px;
      }
    }
    .upload {
      width: 362px;
      // height: 200px;
      // border: 2px dashed #e9ebec;
      // border-radius: 6px;
      // text-align: center;
      // padding-top: 66px;
      // cursor: pointer;
      display: inline-block;
      margin-right: 14px;

      .uploadTip {
        height: 200px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .uploadIcon {
        width: 60px;
        margin-bottom: 10px;
      }
      p {
        font-weight: 400;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.65);
      }
    }

    .logoImage {
      width: 100%;
      height: 200px;
    }
  }
</style>
<style lang="scss">
  .upload {
    .el-upload-dragger {
      padding: 10px;
    }
  }
</style>
