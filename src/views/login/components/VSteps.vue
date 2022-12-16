<template>
  <div class="steps-line" style="display: flex;">

    <div v-for="(item, index) in lists" :key="item.value">
      <!-- 步骤条 -->
      <div class="steps">

        <div class="circle" :class="index + 1  <= active ? 'shadow-c' : 'no-shadow'">
          <div class="msg" :class="index + 1  <= active ? 'l-s-color' : 'l-n-s-color'">{{ item.label }}</div>
        </div>

        <div class="line" :class="index + 2  <= active ? 'line-select' : 'line-n-select'" v-if="index !== lists.length - 1"></div>
      </div>
    </div>
    
  </div>
</template>

<script setup>
/**
 * active String 当前状态 one 、 two、 three
 * lists Array 文本展示
 */

import { defineProps, reactive } from 'vue';

const obj = defineProps(['active', 'lists'])

const state = reactive({})

console.log(obj.active, state)
</script>

<style scoped lang="scss">
.steps-line {
  padding: 0 30px;
  display: flex;
  justify-content: center;
  .steps {
    display: flex;
    justify-content: center;
    align-items: center;
    
    .shadow-c {
      box-shadow: 0 0 0 8px rgba($color: #E2B062, $alpha: 0.3);
      background: #D0963E;
    }
    .no-shadow {
      background: #C0C4CC;
    }
    .circle {
      position: relative;
      width: 15px;
      height: 15px;
      border-radius: 50%;

      .msg {
        position: absolute;
        bottom: -30px;
        left: -40px;
        text-align: center;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        min-width: 100px;
      }

      .l-s-color {
        color: #D0963E;
      }

      .l-n-s-color {
        color: #909399;
      }
    }

    .line {
      width: 113px;
      height: 5px;
      border-radius: 1.67px;
      margin: 0 28px;
    }

    .line-select {
      background: #D0963E;
    }

    .line-n-select {
      background: #C0C4CC;
    }
  }
}
</style>