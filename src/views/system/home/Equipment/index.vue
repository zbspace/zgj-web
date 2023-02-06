<template>
  <div class="home-equipment">
    <div class="left">
      <p class="label">智能设备信息</p>
      <div class="items">
        <div class="item" v-for="(v, i) in data" :key="i">
          <img :src="v.icon" alt="" />
          <div>
            <p class="num">{{ v.num }}</p>
            <p class="text">{{ v.text }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <img :src="cyandbm" />
      <p>成员与部门</p>
      <p>部门数：<span>20</span></p>
      <p>员工数：<span>20</span></p>
      <p>今日登录员工数：<span>20</span></p>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import equipment1 from '@/assets/svg/system/home/equipment1.svg'
  import equipment2 from '@/assets/svg/system/home/equipment2.svg'
  import equipment3 from '@/assets/svg/system/home/equipment3.svg'
  import equipment4 from '@/assets/svg/system/home/equipment4.svg'
  import cyandbm from '@/assets/svg/system/home/cyandbm.svg'
  const data = ref([
    { icon: equipment1, num: 20, text: '智能印章数' },
    { icon: equipment2, num: 20, text: '智能印章数' },
    { icon: equipment3, num: 20, text: '智能印章数' },
    { icon: equipment4, num: 20, text: '智能印章数' }
  ])
</script>

<style lang="scss" scoped>
  .home-equipment {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    .left {
      background: #ffffff;
      border: 1px solid rgba(0, 0, 0, 0.06);
      border-radius: 4px;
      flex: 2;
      height: 170px;
      padding: 24px;
      margin-right: 16px;
      .label {
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        color: rgba(0, 0, 0, 0.85);
      }
      .items {
        display: flex;
        justify-content: space-between;
        .item {
          margin-right: 33px;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 166px;
          height: 80px;
          background: rgba(0, 0, 0, 0.04);
          border-radius: 4px;
          padding: 12px;
          img {
            width: 40px;
            margin-right: 8px;
          }
          div {
            .num {
              font-weight: 400;
              font-size: 22px;
              line-height: 30px;
              color: rgba(0, 0, 0, 0.85);
              margin-bottom: 4px;
            }
            .text {
              font-weight: 400;
              font-size: 14px;
              line-height: 22px;
              text-align: center;
              color: rgba(0, 0, 0, 0.85);
              margin-bottom: 0;
            }
          }
        }
      }
    }
    .right {
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(0, 0, 0, 0.06);
      border-radius: 4px;
      padding: 24px;
      height: 170px;
      width: 33%;
      position: relative;
      img {
        position: absolute;
        right: 0;
        top: 0;
      }
      p {
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        text-align: center;
        color: rgba(0, 0, 0, 0.65);
        margin-bottom: 7px;
        text-align: left;
        span {
          font-size: 16px;
          line-height: 24px;
          color: rgba(0, 0, 0, 0.85);
        }
      }
      p:nth-child(1) {
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        color: rgba(0, 0, 0, 0.85);
        margin-bottom: 17px;
      }
    }
  }
</style>
