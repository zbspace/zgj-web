<template>
  <div class="comp-info-center">
    <div class="left">
      <div class="base">
        <JyLabel label="基础信息" />
        <div>
          <div
            class="rows"
          >
            <span class="label">单位负责人</span>
            <div v-if="!edit">
              <span class="content">马丽丽</span>
              <img
                :src="inputIcon"
                alt=""
                @click="edit = true"
              >
            </div>
            <div
              class="input"
              v-else
            >
              <el-input
                v-model="input"
                placeholder="请输入新的头部系统显示名称"
              />
              <span
                class="save"
                @click="save"
              >保存</span>
              <span
                class="cancel"
                @click="cancel"
              >取消</span>
            </div>
          </div>

          <div class="rows">
            <span class="label">负责人手机号</span>
            <div v-if="!edit">
              <span class="content">18017607672</span>
              <img
                :src="inputIcon"
                alt=""
                @click="edit = true"
              >
            </div>
            <div
              class="input"
              v-else
            >
              <el-input
                v-model="input"
                placeholder="请输入新的头部系统显示名称"
              />
              <span
                class="save"
                @click="save"
              >保存</span>
              <span
                class="cancel"
                @click="cancel"
              >取消</span>
            </div>
          </div>
        </div>
      </div>
      <div class="base">
        <JyLabel
          label="超级管理员"
          btn="变更"
          @on-click="onClick"
        />
        <div>
          <div class="rows">
            <span class="label">超级管理员</span>
            <span class="content">李旺</span>
            <img
              :src="inputIcon"
              alt=""
            >
          </div>
          <div class="rows">
            <span class="label">超级管理员账号</span>
            <span class="content">225487</span>
            <img
              :src="inputIcon"
              alt=""
            >
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <JyLabel
        label="密码设置"
        btn="修改"
        @on-click="onClick"
      />
      <div>
        <div class="rows">
          <span class="label w-140">首次登录必须修改密码</span>
          <span class="content color-3ED096">开</span>
        </div>
        <div class="rows">
          <span class="label w-140">弱密码禁止保存</span>
          <span class="content color-black-045">关</span>
        </div>
        <div class="rows">
          <span class="label w-140">密码变更提醒</span>
          <span class="content color-3ED096">开</span>
          <span class="color-black-045">（提醒周期5天）</span>
        </div>
        <div class="rows">
          <span class="label w-140">密码至少包含</span>
          <span class="content" />
          <span class="tab">小写字母</span>
          <span class="tab">特殊字符</span>
        </div>
        <div class="rows">
          <span class="label w-140">限制密码长度至少为</span>
          <span class="content tab">8</span>
          <span class="color-black-045">位</span>
        </div>
        <div class="rows">
          <span class="label w-140">初始密码</span>
          <span class="content tab">13780094578</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import inputIcon from '@/assets/svg/system/comp-info/input.svg'
import { ref } from 'vue'
const input = ref('上海测试专属')
const edit = ref(false)
const save = () => { edit.value = !edit.value }
const cancel = () => { edit.value = !edit.value }

const onClick = () => {
  console.log(123)
}
</script>

<style lang="scss" scoped>
.comp-info-center {
  margin-top: 16px;
  display: flex;
  .left {
    .base {
      width: 436px;
      background-color: #fff;
      padding: 24px;
      margin-bottom: 16px;
    }
  }
  .right {
    margin-left: 16px;
    background-color: #fff;
    flex: 1;
    padding: 24px;
    margin-bottom: 16px;
  }
  .header{
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    display: flex;
    align-items: center;
    position: relative;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    padding: 0 0 8px 0 ;
    margin-bottom: 16px;
    span {
      width: 3px;
      height:20px;
      background-color: #D0963E;
      display: inline-block;
      margin-right: 7px;
    }
    button {
      position: absolute;
      right: 0;
    }
  }
  .rows{
    display: flex;
    width: 100%;
    margin-bottom: 16px;
    align-items: center;
    .label {
      width:108px;
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      text-align: right;
      color: rgba(0, 0, 0, 0.65);
      margin-right: 24px;
    }
    .content {
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      color: rgba(0, 0, 0, 0.85);
    }
    img {
      margin-left: 14px;
      cursor: pointer;
    }
    .tab {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      padding: 4px 14px;
      gap: 10px;
      height: 30px;
      background: rgba(0, 0, 0, 0.04);
      margin-right: 14px;
      color: rgba(0, 0, 0, 0.85);
    }
  }
  .w-140 {
    width: 140px !important;
  }
  .input {
    display: flex;
    align-items: center;
    :deep(.el-input) {
      width: 130px
    }
    .save {
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      color: #3E78D0;
      margin-right: 12px;
      margin-left: 18px;
      cursor: pointer;
      width: 42px;
    }
    .cancel {
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      color: rgba(0, 0, 0, 0.45);
      cursor: pointer;
      width: 42px;
    }
  }
  .color-3ED096 {
    color: #3ED096 !important;
  }
  .color-black-045 {
    color: rgba(0, 0, 0, 0.45) !important;
  }
}
</style>