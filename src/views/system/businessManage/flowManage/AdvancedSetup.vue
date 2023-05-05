<template>
  <div class="flowManage-advanced-setup">
    <div class="info-box">
      <div class="time">
        <div class="time-eminder">
          <div class="time-eminder-label">
            <span class="time-eminder-label-text"> 超时提醒 </span>
            <i class="icon">
              <svg class="iconpark-icon"><use href="#Vector1"></use></svg>
            </i>
          </div>
          <div class="time-eminder-switch">
            <el-switch
              v-model="form.isTimeoutRemind"
              :active-value="1"
              :inactive-value="0"
            />
          </div>
        </div>
        <div class="time-Number">
          <span class="time-Number-text">超时</span>
          <div class="time-Number-input">
            <el-input-number v-model="form.remindDuration" :min="0" />
          </div>
          <span class="time-Number-text">小时</span>
        </div>
      </div>
      <div class="deWeight">
        <span class="deWeight-text">审批人自动去重</span>
        <div class="deWeight-radio">
          <el-radio-group v-model="form.autoDistinct">
            <el-radio :label="0">不去重</el-radio>
            <el-radio :label="1">出现多次时，仅保留第一次</el-radio>
            <el-radio :label="2">在连续出现时，仅保留第一次</el-radio>
          </el-radio-group>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { reactive } from 'vue'
  const form = reactive({
    isTimeoutRemind: 1,
    remindDuration: 24,
    autoDistinct: 0
  })
</script>
<style lang="scss" scoped>
  .flowManage-advanced-setup {
    margin: auto;
    width: calc(100vw - 160px);
    height: calc(100vh - 100px);
    min-height: 500px;
    min-width: 800px;
    margin-top: 16px;
    background-color: var(--jy-color-fill--5);
    display: flex;
    justify-content: center;
    color: var(--jy-color-text-1);
    .info-box {
      width: auto;
      margin: 0% auto;
      text-align: left;
      padding-top: 3rem;
    }
    .time {
      display: flex;
      align-items: center;
      .time-eminder {
        display: flex;
        align-items: center;
        margin-right: 1rem;
        .time-eminder-label {
          display: flex;
          align-items: center;
          margin-right: 0.5rem;
          .time-eminder-label-text {
            margin-right: 0.2rem;
          }
        }
      }
      .time-Number {
        display: flex;
        align-items: center;
        .time-Number-text {
          margin-right: 0.5rem;
        }
        .time-Number-input {
          margin-right: 0.5rem;
        }
      }
    }
    .deWeight {
      margin-top: 1rem;
      display: flex;
      align-items: center;
      .deWeight-text {
        margin-right: 0.5rem;
      }
    }
    .icon {
      width: 1rem;
      height: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      .iconpark-icon {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
