<template>
  <div class="system-home-top">
    <div class="list">
      <div class="item" v-for="(item, index) in data" :key="index">
        <img :src="item.img" alt="" />
        <div>
          <span class="sum" :class="index !== 0 ? 'color-dark' : ''">
            {{ item.sum }}
          </span>
          <span class="unit">
            <span class="base" v-if="item.base">/{{ item.base }} </span>
            {{ item.unit }}
          </span>
        </div>
        <div class="type">
          {{ item.type }}
        </div>
        <div class="time" v-if="item.time">
          {{ item.time }}
        </div>
      </div>
    </div>
    <div class="space">
      <p>空间使用情况</p>
      <p><span>22GB</span>/100GB</p>
      <el-progress :percentage="22" />
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import dayjs from 'dayjs'
  import bgtop1 from '@/assets/svg/system/home/top1.svg'
  import bgtop2 from '@/assets/svg/system/home/top2.svg'
  import bgtop3 from '@/assets/svg/system/home/top3.svg'
  const data = ref([
    {
      sum: 20,
      unit: '',
      type: '用印中单据数',
      img: bgtop1
    },
    {
      sum: 145,
      unit: '',
      type: '绑定数/印章总数',
      base: 457,
      img: bgtop2
    },
    {
      sum: dayjs('2023-10-19').diff(dayjs().format('YYYY-MM-DD'), 'day'),
      unit: '天',
      type: '到期时间：2023-10-19',
      img: bgtop3
    }
  ])
</script>

<style lang="scss" scoped>
  .system-home-top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    .list {
      display: flex;
      justify-content: space-between;
      margin-right: 16px;
      flex: 1;
    }
    .item {
      margin-right: 16px;
      border: 1px solid rgba(0, 0, 0, 0.06);
      border-radius: 4px;
      transition: all 0.3s ease 0s;
      height: 116px;
      position: relative;
      padding: 34px 24px 0 24px;
      flex: 1;
      background-color: #fff;
      .bg {
        height: 100%;
        width: 100%;
        border: 0;
        border-radius: 4px;
        position: absolute;
        left: 0;
        top: 0;
        background-color: #fff;
      }
      img {
        height: 116px;
        position: absolute;
        right: 0;
        top: 0;
        z-index: 0;
      }
      .sum {
        font-size: 28px;
        color: var(--jy-primary-6);
      }

      .unit {
        color: #999;
      }

      .type {
        color: rgba(0, 0, 0, 0.65);
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
      }

      .time {
        color: #999;
      }

      &:last-child {
        margin-right: 0;
      }
    }

    .space {
      width: 356px;
      height: 116px;
      padding: 24px;
      left: 1064px;
      top: 89px;
      background: rgba(255, 255, 255, 0.5);
      box-shadow: inset 0px 0px 6px #ffffff;
      backdrop-filter: blur(35px);
      border-radius: 4px;
      width: 33%;
      p:nth-child(1) {
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        color: rgba(0, 0, 0, 0.85);
        margin-bottom: 4px;
      }
      p:nth-child(2) {
        font-weight: 400;
        font-size: 12px;
        line-height: 20px;
        color: rgba(0, 0, 0, 0.65);
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        span {
          font-weight: 400;
          font-size: 14px;
          line-height: 22px;
          color: var(--jy-primary-6);
          margin-right: 5px;
        }
      }
    }

    .color-dark {
      color: rgba(0, 0, 0, 0.85) !important;
    }
  }
</style>
