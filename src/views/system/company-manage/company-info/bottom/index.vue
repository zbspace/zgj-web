<template>
  <div class="comp-info-bottom">
    <JyLabel
      label="系统页面设置"
      btn="修改"
      @on-click="onClick"
    />
    <div class="switch">
      <span>页面水印</span>
      <el-switch
        v-model="value"
        size="large"
        inactive-text=""
      />
    </div>
    <div class="upload">
      <img
        :src="shapeIcon"
        alt=""
      >
      <p>上传首页LOGO</p>
    </div>
    <div class="upload">
      <img
        :src="shapeIcon"
        alt=""
      >
      <p>上传首页LOGO</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import shapeIcon from '@/assets/svg/system/comp-info/shape.svg'
const value = ref(false)

const onClick = () => {
  console.log(123)
}
</script>

<style lang="scss" scoped>
.comp-info-bottom{
  background-color: #fff;
  padding: 24px;
  .switch {
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
    height: 232px;
    border: 2px dashed #E9EBEC;
    border-radius: 6px;
    text-align: center;
    padding-top: 66px;
    cursor: pointer;
    display: inline-block;
    margin-right: 14px;
    img {
      margin-bottom: 32px;
    }
    p {
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      text-align: center;
      color: rgba(0, 0, 0, 0.65);
    }
  }
}
</style>