<template>
  <div>
    <div ref="echart" :style="style" :options="options" />
  </div>
</template>

<script setup>
  // 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
  import * as echarts from 'echarts/core'
  import { LineChart, BarChart, PieChart } from 'echarts/charts'
  // 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
  import {
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent
  } from 'echarts/components'
  // 标签自动布局，全局过渡动画等特性
  import { LabelLayout, UniversalTransition } from 'echarts/features'
  // 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
  import { CanvasRenderer } from 'echarts/renderers'
  import { onMounted, ref } from 'vue'
  // 注册必须的组件
  echarts.use([
    LabelLayout,
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    LineChart,
    CanvasRenderer,
    UniversalTransition,
    BarChart,
    PieChart
  ])
  const echart = ref(null)
  const props = defineProps({
    options: {
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
              rotate: 45
            },
            data: [
              '2022-01',
              '2022-02',
              '2022-03',
              '2022-04',
              '2022-05',
              '2022-06',
              '2022-07',
              '2022-08',
              '2022-09',
              '2022-10',
              '2022-11',
              '2022-10'
            ]
          },
          yAxis: {},
          series: [
            {
              name: '智能用印',
              type: 'line',
              data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 35, 34, 78]
            },
            {
              name: '普通用印',
              color: '#00bd9d',
              type: 'line',
              data: [40, 120, 83, 45, 31, 74, 35, 34, 78, 35, 34, 78]
            }
          ]
        }
      }
    },
    style: {
      type: Object,
      default: () => {
        return {
          height: '350px',
          width: 'auto'
        }
      }
    }
  })

  onMounted(() => {
    const myChart = echarts.init(echart.value)
    myChart.setOption(props.options)
  })
</script>

<style lang="scss" scoped></style>
