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
            <div v-if="!edit1">
              <span class="content">18017607672</span>
              <img
                :src="inputIcon"
                alt=""
                @click="edit1 = true"
              >
            </div>
            <div
              class="input"
              v-else
            >
              <el-input
                v-model="input1"
                placeholder="请输入新的头部系统显示名称"
              />
              <span
                class="save"
                @click="save1"
              >保存</span>
              <span
                class="cancel"
                @click="cancel1"
              >取消</span>
            </div>
          </div>
        </div>
      </div>
      <div class="base">
        <el-form
          ref="ruleFormRef"
          :model="formData"
          :rules="rules"
          label-width="120px"
          class="demo-ruleForm"
        >
          <JyLabel
            label="超级管理员"
            :btn=" edit2 ? '保存' : '变更'"
            :btn1=" edit2 ? '取消' : ''"
            @on-click="onClick2"
            @on-click-cancel="onClickCancel2"
          />
          <div>
            <div class="rows input">
              <el-form-item
                label="超级管理员"
                prop="data1"
              >
                <span
                  class="content"
                  v-if="!edit2"
                >李旺</span>
                <el-input
                  v-if="edit2"
                  v-model="data1"
                  placeholder=""
                />
              </el-form-item>
            </div>
            <div class="rows input">
              <el-form-item
                label="超级管理员账号"
                prop="data1"
              >
                <span
                  class="content"
                  v-if="!edit2"
                >225487</span>
                <el-input
                  v-if="edit2"
                  v-model="data2"
                  placeholder=""
                />
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <div class="right">
      <JyLabel
        label="密码设置"
        :btn="edit3 ? '保存' : '修改'"
        :btn1="edit3 ? '取消' : ''"
        @on-click="onClick3"
        @on-click-cancel="onClickCancel3"
      />
      <el-form
        ref="ruleFormRef"
        :model="formData"
        :rules="rules"
        label-width="160px"
        class="demo-ruleForm"
      >
        <div>
          <div class="rows">
            <el-form-item
              label="首次登录必须修改密码"
              prop="data1"
            >
              <span
                class="content color-3ED096"
                v-if="!edit3"
              >开</span>
              <el-switch
                v-else
                v-model="data1"
              />
            </el-form-item>
          </div>
          <div class="rows">
            <el-form-item
              label="弱密码禁止保存"
              prop="data1"
            >
              <span
                class="content color-3ED096"
                v-if="!edit3"
              >开</span>
              <el-switch
                v-else
                v-model="data1"
              />
            </el-form-item>
          </div>
          <div class="rows">
            <!-- <span class="label w-140">密码变更提醒</span>
            <span class="content color-3ED096">开</span>
             -->
            <el-form-item
              label="密码变更提醒"
              prop="data1"
            >
              <div v-if="!edit3">
                <span
                  class="content color-3ED096"
                >开</span>
                <span class="color-black-045">（提醒周期5天）</span>
              </div>
              <div v-else>
                <el-switch
                  v-model="data1"
                />
                <span>&ensp;&ensp;提醒周期&ensp;&ensp;</span>
                <el-input-number
                  v-model="data1"
                  :min="1"
                  :max="31"
                  @change="handleChange"
                />
                <span>&ensp;&ensp;天</span>
              </div>
            </el-form-item>
          </div>
          <div class="rows">
            <el-form-item
              label="密码至少包含"
              prop="data1"
            >
              <span
                class="tab"
                v-if="!edit3"
              >小写字母</span>
              <div v-else>
                <el-checkbox-group v-model="data1">
                  <el-checkbox
                    label="大写字母"
                  />
                  <el-checkbox
                    label="小写字母"
                  />
                  <el-checkbox
                    label="数字"
                  />
                  <el-checkbox
                    label="特殊字符"
                  />
                </el-checkbox-group>
              </div>
            </el-form-item>
          </div>
          <div class="rows">
            <el-form-item
              label="限制密码长度至少为"
              prop="data1"
            >
              <span
                class="content tab"
                v-if="!edit3"
              >8</span>
              <el-input-number
                v-else
                v-model="data1"
                :min="1"
                :max="31"
                @change="handleChange"
              />
              <span class="color-black-045">&ensp;&ensp;位</span>
            </el-form-item>
          </div>
          <div class="rows">
            <el-form-item
              label="初始密码"
              prop="data1"
            >
              <span
                class="content tab"
                v-if="!edit3"
              >13780094578</span>
              <div v-else>
                <el-input
                  v-model="data1"
                  type="password"
                  style="width: 126px;"
                  placeholder="请输入"
                  show-password
                />
              </div>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import inputIcon from '@/assets/svg/system/comp-info/input.svg'
import { ref } from 'vue'
const input = ref('上海测试专属')
const input1 = ref('上海测试专属')
const edit = ref(false)
const edit1 = ref(false)
const edit2 = ref(false)
const edit3 = ref(false)
const rules = ref([])
const formData = ref({
  data1: '',
  data2: ''
})
const save = () => { edit.value = !edit.value }
const cancel = () => { edit.value = !edit.value }
const save1 = () => { edit1.value = !edit1.value }
const cancel1 = () => { edit1.value = !edit1.value }

const onClick3 = () => {
  edit3.value = !edit3.value
}
const onClickCancel3 = () => {
  edit3.value = !edit3.value
}
const onClick2 = () => {
  edit2.value = !edit2.value
}
const onClickCancel2 = () => {
  edit2.value = !edit2.value
}

const handleChange = () => {
  //
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
      align-items: center;
      padding: 0 14px;
      gap: 10px;
      height: 30px;
      background: rgba(0, 0, 0, 0.04);
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
  :deep(.el-form) {
    .el-form-item {
      margin-bottom: 0;
      .el-form-item__label {
        font-weight: 400;
        font-size: 14px;
        text-align: right;
        color: rgba(0, 0, 0, 0.65);
        margin-right: 0;
        margin-bottom: 0;
      }
      .el-checkbox__label {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0 14px;
        gap: 10px;
        height: 30px;
        background: rgba(0, 0, 0, 0.04);
        color: rgba(0, 0, 0, 0.85);
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        margin-left: 12px;
      }
      .el-checkbox {
        padding: 0;
        margin-right: 24px;
      }
    }
  }
}
</style>