<template>
  <div class="home-dus">
    <div class="left">
      <div class="charts-title">
        <p>文件新增趋势</p>
        <div>
          <span>本周</span>
          <span>本月</span>
          <span>全年</span>
        </div>
      </div>
      <JyEcharts :options="option" />
    </div>
    <div class="right">
      <p class="title">文件类型下的文件数排名</p>
      <div class="list">
        <div class="item" v-for="(v, i) in data" :key="i">
          <div>
            <svg class="iconpark-icon" v-if="i < 3">
              <use :href="`#sort${i + 1}`"></use>
            </svg>
            <p v-else class="sortp">{{ `0${i + 1}` }}</p>
          </div>
          <p>{{ v.name }}</p>
          <div style="width: 136px">
            <el-progress :percentage="v.val" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const data = ref([
    { icon: '', name: '某某某类型', num: 1000, val: 90 },
    { icon: '', name: '某某某类型', num: 1000, val: 80 },
    { icon: '', name: '某某某类型', num: 1000, val: 70 },
    { icon: '', name: '某某某类型', num: 1000, val: 60 },
    { icon: '', name: '某某某类型', num: 1000, val: 40 },
    { icon: '', name: '某某某类型', num: 1000, val: 20 }
  ])
  const option = ref({
    barWidth: 28,
    grid: {
      left: 80,
      right: 36,
      top: 18
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'category',
      data: [
        '一月',
        '二月',
        '三月',
        '四月',
        '五月',
        '六月',
        '七月',
        '八月',
        '九月',
        '十月',
        '十一月',
        '十二月'
      ]
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [
          200000, 400000, 900000, 500000, 500000, 500000, 500000, 500000,
          500000, 500000, 500000, 500000
        ],
        type: 'bar'
      }
    ]
  })
</script>

<style lang="scss" scoped>
  .home-dus {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    .charts-title {
      height: 44px;
      line-height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      div {
        display: flex;
        align-items: center;
      }
      p {
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        color: rgba(0, 0, 0, 0.85);
        margin-bottom: 0;
      }
    }
    .left {
      border-radius: 4px;
      box-shadow: 0 0 2px 2px rgba(224, 227, 234, 0.7);
      box-sizing: border-box;
      transition: all 0.3s ease 0s;
      padding: 24px;
      position: relative;
      flex: 1;
      background-color: #fff;
      margin-right: 16px;
      height: 396px;
    }
    .right {
      background: #ffffff;
      border: 1px solid rgba(0, 0, 0, 0.06);
      border-radius: 4px;
      height: 396px;
      width: 356px;
      padding: 24px;
      .title {
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        color: rgba(0, 0, 0, 0.85);
        margin-bottom: 26px;
      }
      .list {
        .item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 26px;
          align-items: center;
          .iconpark-icon {
            width: 24px;
            height: 24px;
          }
          p {
            margin-bottom: 0;
          }
          .sortp {
            font-family: 'Helvetica';
            font-weight: 700;
            font-size: 16px;
            line-height: 30px;
            color: rgba(0, 0, 0, 0.25);
          }
          div {
            min-width: 26px;
            text-align: center;
          }
        }
      }
    }
  }
</style>
