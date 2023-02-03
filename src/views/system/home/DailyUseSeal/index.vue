<template>
  <div class="home-dus">
    <div class="charts-title">
      <p>每日用印情况统计图</p>
      <div>
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          clearable
        />
        <el-select v-model="value" placeholder="Select">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </div>
    <JyEcharts :options="option" />
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  const value = ref('')
  const value1 = ref('')
  const options = ref([])

  const option = ref({
    grid: {
      top: 132,
      left: 60,
      right: 36
    },
    tooltip: {},
    legend: {
      top: 56,
      itemWidth: 10,
      itemHeight: 1,
      itemStyle: {},
      textStyle: {
        color: 'rgba(0, 0, 0, 0.85)',
        fontSize: '14px'
      }
    },
    toolbox: {
      top: 4,
      show: true,
      orient: 'vertical',
      feature: {
        restore: {},
        saveAsImage: {}
      }
    },
    xAxis: {
      axisLabel: {
        interval: 0,
        rotate: 45
      },
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
    yAxis: {},
    series: [
      {
        name: '电子签章',
        type: 'line',
        data: [
          100, 1000, 1200, 13000, 14000, 15000, 16000, 10900, 13000, 120000,
          11000, 1000
        ]
      },
      {
        name: '智能用印',
        type: 'line',
        data: [
          1100, 1000, 1200, 113000, 66666, 15000, 16000, 10900, 13000, 120000,
          11000, 1000
        ]
      },
      {
        name: '普通用印',
        type: 'line',
        data: [
          100, 10100, 1200, 13000, 14000, 3333, 16000, 10900, 13000, 120000,
          11000, 1000
        ]
      }
    ]
  })
</script>

<style lang="scss" scoped>
  .home-dus {
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 2px 2px rgba(224, 227, 234, 0.7);
    box-sizing: border-box;
    margin-top: 15px;
    transition: all 0.3s ease 0s;
    padding: 24px;
    position: relative;
    .charts-title {
      height: 44px;
      line-height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: absolute;
      top: 20px;
      z-index: 2;
      right: 90px;
      left: 24px;
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
      :deep(.el-select) {
        margin-left: 16px;
      }
    }
  }
</style>
