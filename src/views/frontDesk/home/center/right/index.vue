<template>
  <div class="home-center-right">
    <div class="title">
      <p>用印统计</p>
      <div>
        <span>全部</span>
        <span>一个月</span>
        <span>六个月</span>
        <span>一年</span>
      </div>
    </div>
    <vue-echarts :option="props.echartslineoption" style="height: 350px" />
  </div>
</template>

<script setup>
import { VueEcharts } from "vue3-echarts";
import { defineProps } from "vue"
const props = defineProps({
  echartslineoption: {
    type: Object,
    default: () => {
      return {
        tooltip: {},
        legend: {
          data: ['智能用印', '普通用印']
        },
        xAxis: {
          axisLabel: {
            interval: 0,
            rotate: 45,
          },
          data: [
            "2022-01",
            "2022-02",
            "2022-03",
            "2022-04",
            "2022-05",
            "2022-06",
            "2022-07",
            "2022-08",
            "2022-09",
            "2022-10",
            "2022-11",
            "2022-10",
          ],
        },
        yAxis: {},
        series: [{
          name: "智能用印",
          type: "line",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 35, 34, 78],
        },
        {
          name: "普通用印",
          color: "#00bd9d",
          type: "line",
          data: [40, 120, 83, 45, 31, 74, 35, 34, 78, 35, 34, 78],
        },
        ],
      }
    },
  }
})

</script>

<style lang="scss" scoped>
.home-center-right {
  width: 448px;

  p {
    margin-bottom: 0;
  }

  .title {
    display: flex;
    justify-content: space-between;
    padding: 3px 16px;

    p {
      font-size: 16px;
    }

    span {
      color: #878a99;
      background-color: rgba(135, 138, 153, 0.1);
      border-color: transparent;
      cursor: pointer;
      padding: 4px 8px;

      &:hover {
        background-color: #fff;
      }
    }
  }
}
</style>