<template>
  <div class="home-useSealStatistical">
    <p class="title">用印统计</p>
    <div class="content">
      <div>
        <JyEcharts :options="option1" />
      </div>
      <div>
        <JyEcharts :options="option2" />
      </div>
      <div>
        <JyEcharts :options="option3" />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  var datas1 = [
    { value: 335, name: '正常' },
    { value: 310, name: '停用' },
    { value: 234, name: '销毁' }
  ]
  var datas2 = [
    { value: 335, name: '公章' },
    { value: 310, name: '财务章' },
    { value: 234, name: '法人章' }
  ]
  var datas3 = [
    { value: 335, name: '智能用印' },
    { value: 310, name: '普通用印' },
    { value: 234, name: '电子签章' }
  ]
  const option1 = ref({
    title: {
      text: '印章状态占比',
      left: 'center',
      top: 0,
      textStyle: {
        fontSize: 16,
        color: 'rgba(0, 0, 0, 0.85)',
        fontWeight: 400
      }
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      show: true,
      right: 10,
      top: 24,
      itemStyle: {},
      formatter: function (name) {
        const singleData = datas1.filter(function (item) {
          return item.name === name
        })
        return `${name} ${singleData[0].value}%`
      },
      textStyle: {
        color: ' rgba(0, 0, 0, 0.45)'
      },
      itemWidth: 8,
      itemHeight: 8,
      data: ['正常', '停用', '销毁']
    },
    series: [
      {
        name: '印章状态占比',
        type: 'pie',
        radius: [78, 100],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: 'center',
          color: '#4c4a4a',
          formatter: `{total|总数}\n\r{active|200}{fen| 份}`,
          rich: {
            total: {
              fontSize: 12,
              fontFamily: 'PingFang SC',
              color: 'rgba(0, 0, 0, 0.65)',
              lineHeight: 20
            },
            active: {
              fontFamily: 'Helvetica',
              fontSize: 28,
              color: 'rgba(0, 0, 0, 0.85)',
              lineHeight: 36
            },
            fen: {
              fontFamily: 'PingFang SC',
              fontSize: 16,
              color: 'rgba(0, 0, 0, 0.65)',
              lineHeight: 24
            }
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: '正常' },
          { value: 735, name: '停用' },
          { value: 580, name: '销毁' }
        ]
      }
    ]
  })
  const option2 = ref({
    title: {
      text: '印章类型占比',
      left: 'center',
      top: 0,
      textStyle: {
        fontSize: 16,
        color: 'rgba(0, 0, 0, 0.85)',
        fontWeight: 400
      }
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      show: true,
      right: 10,
      top: 24,
      itemStyle: {},
      formatter: function (name) {
        const singleData = datas2.filter(function (item) {
          return item.name === name
        })
        return `${name} ${singleData[0].value}%`
      },
      textStyle: {
        color: ' rgba(0, 0, 0, 0.45)'
      },
      itemWidth: 8,
      itemHeight: 8
    },
    series: [
      {
        name: '印章类型占比',
        type: 'pie',
        radius: [78, 100],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: 'center',
          color: '#4c4a4a',
          formatter: `{total|总数}\n\r{active|200}{fen| 份}`,
          rich: {
            total: {
              fontSize: 12,
              fontFamily: 'PingFang SC',
              color: 'rgba(0, 0, 0, 0.65)',
              lineHeight: 20
            },
            active: {
              fontFamily: 'Helvetica',
              fontSize: 28,
              color: 'rgba(0, 0, 0, 0.85)',
              lineHeight: 36
            },
            fen: {
              fontFamily: 'PingFang SC',
              fontSize: 16,
              color: 'rgba(0, 0, 0, 0.65)',
              lineHeight: 24
            }
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: '公章' },
          { value: 735, name: '财务章' },
          { value: 580, name: '法人章' }
        ]
      }
    ]
  })
  const option3 = ref({
    title: {
      text: '用印占比',
      left: 'center',
      top: 0,
      textStyle: {
        fontSize: 16,
        color: 'rgba(0, 0, 0, 0.85)',
        fontWeight: 400
      }
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      show: true,
      right: 10,
      top: 24,
      itemStyle: {},
      formatter: function (name) {
        const singleData = datas3.filter(function (item) {
          return item.name === name
        })
        return `${name} ${singleData[0].value}%`
      },
      textStyle: {
        color: ' rgba(0, 0, 0, 0.45)'
      },
      itemWidth: 8,
      itemHeight: 8
    },
    series: [
      {
        name: '印章状态占比',
        type: 'pie',
        radius: [78, 100],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: 'center',
          color: '#4c4a4a',
          formatter: `{total|总数}\n\r{active|200}{fen| 份}`,
          rich: {
            total: {
              fontSize: 12,
              fontFamily: 'PingFang SC',
              color: 'rgba(0, 0, 0, 0.65)',
              lineHeight: 20
            },
            active: {
              fontFamily: 'Helvetica',
              fontSize: 28,
              color: 'rgba(0, 0, 0, 0.85)',
              lineHeight: 36
            },
            fen: {
              fontFamily: 'PingFang SC',
              fontSize: 16,
              color: 'rgba(0, 0, 0, 0.65)',
              lineHeight: 24
            }
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: '智能用印' },
          { value: 735, name: '普通用印' },
          { value: 580, name: '电子签章' }
        ]
      }
    ]
  })
</script>

<style lang="scss" scoped>
  .home-useSealStatistical {
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.06);
    border-radius: 4px;
    padding: 24px;
    .title {
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      color: rgba(0, 0, 0, 0.85);
      margin-bottom: 24px;
    }
    .content {
      display: flex;
      justify-content: space-between;
      div {
        width: 33%;
        div {
          margin: 0 auto;
          width: 100%;
        }
      }
    }
  }
</style>
