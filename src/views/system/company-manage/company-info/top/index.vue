<template>
  <div class="comp-info-top">
    <div class="bg">
      <div class="left">
        23
      </div>
      <div class="right">
        <div class="name">
          上海建业信息科技股份有限公司
        </div>
        <div class="label">
          <span>上海测试专属</span>
          <img
            :src="inputIcon"
            alt=""
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import inputIcon from '@/assets/svg/system/comp-info/input.svg'

</script>

<style lang="scss" scoped>
  .comp-info-top{
  background-color: #fff;
  height: 188px;
  width: 100%;
  border-radius: 4px;
  padding:  24px 16px;
  margin-top: 24px;
  .bg{
      background: rgba(105, 70, 70, 0.04);
      border-radius: 4px;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      padding: 0 24px;
      .left {
        margin-right: 18px;
        height: 72px;
        width: 72px;
        border-radius: 0px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff;
      }
      .right {
        .name{
          font-style: normal;
          font-weight: 400;
          font-size: 22px;
          line-height: 30px;
          margin-bottom: 12px;
          color: #212529;
        }
        .label {
          span {
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 22px;
            color: #212529;
            margin-right: 14px;
          }
        }
      }
    }
  }
</style>