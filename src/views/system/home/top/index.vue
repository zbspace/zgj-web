<template>
  <div class="system-home-top">
    <div class="item" v-for="(item, index) in data" :key="index">
      <div>
        <span class="sum">{{ item.sum }}</span>
        <span class="unit"
          ><span class="base" v-if="item.base">/{{ item.base }}</span
          >{{ item.unit }}</span
        >
      </div>
      <div class="type">
        {{ item.type }}
      </div>
      <div class="time" v-if="item.time">
        {{ item.time }}
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  const data = ref([
    { sum: 720, unit: '人', type: '员工总数' },
    { sum: 15, unit: '人', type: '今日员工登录数' },
    { sum: 74, unit: '枚', type: '绑定数/印章总数', base: 391 },
    { sum: 2979, unit: '天', time: '2030-12-24（到期）', type: '倒计时间' }
  ])
</script>

<style lang="scss" scoped>
  .system-home-top {
    display: flex;
    justify-content: space-between;

    .item {
      margin-right: 20px;
      flex: 1;
      background-color: #fff;
      border: 1px solid #fff;
      border-radius: 4px;
      box-shadow: 0 0 2px 2px rgb(224 227 234 / 70%);
      box-sizing: border-box;
      margin-bottom: 15px;
      transition: all 0.3s ease 0s;
      padding: 0.4rem 0rem;
      text-align: center;

      .sum {
        font-size: 2rem;
        color: #d0963e;
      }

      .unit {
        color: #999;

        .base {
        }
      }

      .type {
        font-weight: bold;
      }

      .time {
        color: #999;
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }
</style>
