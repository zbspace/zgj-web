<!-- 抄送给我 -->
<template>
  <div class="frontDesk-home-page-home">
    <componentsLayout :free="true">
      <div class="ap-box">
        <div class="ap-back">
          <img class="ap-back-img" src="@/assets/icon/home-back.png" alt="" />
        </div>
        <div class="ap-cont">
          <div class="ap-cont-info">
            <div class="ap-cont-info-user">
              <div class="user-box"> 陈潭 </div>
              <div class="user-info">
                <div class="user-info-basic">
                  <span class="user-info-basic-name">陈潭</span>
                  <span class="user-info-basic-jues">用印人员</span>
                  <span class="user-info-basic-jues">管理员</span>
                </div>
                <div class="user-info-work">
                  <span class="user-info-work-text">研发中心 - 产品部</span>
                  <span class="user-info-work-text">137****4598</span>
                </div>
              </div>
            </div>
            <div class="ap-cont-info-record">
              <div class="module-box">
                <div class="module-box-num"> 457 </div>
                <div class="module-box-text"> 用印记录 </div>
              </div>
              <div class="module-box">
                <div class="module-box-num"> 414 </div>
                <div class="module-box-text"> 保管记录 </div>
              </div>
              <div class="module-box">
                <div class="module-box-num"> 4 </div>
                <div class="module-box-text"> 我的外借 </div>
              </div>
              <div class="module-box">
                <div class="module-box-num"> 84 </div>
                <div class="module-box-text"> 待智能用印 </div>
              </div>
              <div class="module-box">
                <div class="module-box-num"> 74 </div>
                <div class="module-box-text"> 待普通用印 </div>
              </div>
              <div class="module-box">
                <div class="module-box-num"> 78 </div>
                <div class="module-box-text"> 待文件归档 </div>
              </div>
            </div>
          </div>
          <div class="ap-cont-module">
            <div class="ap-cont-module-left">
              <div class="module-box flow">
                <div class="flow-tabs">
                  <componentsTabs
                    activeName="1"
                    :data="state.componentsTabs.data"
                  ></componentsTabs>
                  <div class="flow-more"> 更多 </div>
                </div>
                <div class="flow-list">
                  <div class="flow-list-li" v-for="n in 6" :key="n">
                    <div class="flow-list-li-name">
                      <div class="flow-list-li-name-sign">春青</div>
                      <span class="flow-list-li-name-icon">
                        <svg class="iconpark-icon">
                          <use href="#juxing"></use>
                        </svg>
                      </span>
                    </div>
                    <div class="flow-list-li-desc">
                      <div class="flow-list-li-desc-cont">
                        消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容
                      </div>
                      <div class="flow-list-li-desc-jues">
                        <span class="label checked">实时视频盖章</span>
                        <span class="label">产品部</span>
                        <span class="label">马丽丽</span>
                      </div>
                    </div>
                    <div class="flow-list-li-addition">
                      <div class="label"> 去审批 </div>
                      <div class="time">2022-09-11 10:21:55</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="module-box">
                <div class="module-box-title">
                  <div class="module-box-title-name">用印统计</div>
                  <div class="module-box-title-cut">
                    <div class="module-box-title-cut-but">本周</div>
                    <div class="module-box-title-cut-but">本月</div>
                    <div class="module-box-title-cut-but checked">全年</div>
                  </div>
                </div>
                <JyEcharts :options="echartslineoption"></JyEcharts>
              </div>
              <div class="module-box">
                <div class="module-box-title">
                  <div class="module-box-title-name">风险预警统计</div>
                  <div class="module-box-title-cut">
                    <div class="module-box-title-cut-but">本周</div>
                    <div class="module-box-title-cut-but">本月</div>
                    <div class="module-box-title-cut-but checked">全年</div>
                  </div>
                </div>
                <JyEcharts :options="echartslineoption"></JyEcharts>
              </div>
            </div>
            <div class="ap-cont-module-right">
              <div class="module-box fast">
                <div class="fast-back">
                  <img
                    class="fast-back-img"
                    src="@/assets/icon/home-back-kuaijie.png"
                    alt=""
                  />
                </div>
                <div class="fast-cont">
                  <div class="fast-cont-title">快捷申请用印 </div>
                  <div class="fast-cont-but">
                    <el-button type="primary" class="fast-button">
                      <i class="fast-icon">
                        <svg class="iconpark-icon">
                          <use href="#shenqing-yongyin"></use>
                        </svg>
                      </i>
                      用印申请
                    </el-button>
                  </div>
                  <div class="fast-cont-but">
                    <el-button class="fast-button" plain>
                      <i class="fast-icon">
                        <svg class="iconpark-icon">
                          <use href="#dianzi-qianzhang"></use>
                        </svg>
                      </i>
                      电子签章
                    </el-button>
                  </div>
                </div>
              </div>
              <div class="module-box remind">
                <div class="remind-tabs">
                  <componentsTabs
                    activeName="1"
                    :data="state.remind.tabs.data"
                  ></componentsTabs>
                  <div class="remind-more"> 更多 </div>
                </div>
                <div class="remind-box">
                  <div class="list" v-for="n in 6" :key="n">
                    <div class="list-timeLine">
                      <div
                        class="list-timeLine-dian"
                        :class="{ 'dian-new': n == 1 ? true : false }"
                      ></div>
                      <div class="list-timeLine-line" v-if="n < 6"></div>
                    </div>
                    <div class="list-cont">
                      <div class="list-cont-time">
                        <div class="list-cont-time-o">12-01 </div>
                        <div class="list-cont-time-t">12:18 </div>
                      </div>
                      <div class="list-cont-desc">
                        <div class="list-cont-desc-title">
                          【消息】用印申请单状态提醒
                          <i class="remind-icon" v-if="n == 1">
                            <svg class="iconpark-icon">
                              <use href="#Group3982"></use>
                            </svg>
                          </i>
                        </div>
                        <div class="list-cont-desc-cont">
                          《项目二承包合同》用印申请已审批
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="module-box copy">
                <div class="copy-title">
                  <div class="copy-title-name"> 抄送给我 </div>
                  <div class="copy-title-more"> 更多 </div>
                </div>
                <div class="copy-box">
                  <div class="list" v-for="n in 6" :key="n">
                    <div class="list-timeLine">
                      <div
                        class="list-timeLine-dian"
                        :class="{ 'dian-new': n == 1 ? true : false }"
                      ></div>
                      <div class="list-timeLine-line" v-if="n < 6"></div>
                    </div>
                    <div class="list-cont">
                      <div class="list-cont-time">
                        <div class="list-cont-time-o">12-01 </div>
                        <div class="list-cont-time-t">12:18 </div>
                      </div>
                      <div class="list-cont-desc">
                        <div class="list-cont-desc-title">
                          【消息】用印申请单状态提醒
                          <i class="copy-icon" v-if="n == 1">
                            <svg class="iconpark-icon">
                              <use href="#Group3982"></use>
                            </svg>
                          </i>
                        </div>
                        <div class="list-cont-desc-cont">
                          《项目二承包合同》用印申请已审批
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </componentsLayout>
  </div>
</template>
<script setup>
  import {
    ref,
    reactive,
    // defineProps,
    // defineEmits,
    onBeforeMount,
    onMounted
  } from 'vue'
  import componentsLayout from '@/views/components/Layout.vue'
  import componentsTabs from '@/views/components/tabs.vue'
  // const props = defineProps({
  //   // 处理类型
  //   type: {
  //     type: String,
  //     default: '0'
  //   }
  // })
  // const emit = defineEmits([])
  const state = reactive({
    componentsTabs: {
      data: [
        {
          label: '待我审批',
          name: '1'
        },
        {
          label: '待我确认',
          name: '2'
        },
        {
          label: '待我处理',
          name: '3'
        },
        {
          label: '已审批',
          name: '4'
        },
        {
          label: '已确认',
          name: '5'
        },
        {
          label: '已处理',
          name: '6'
        }
      ]
    },
    remind: {
      tabs: {
        data: [
          {
            label: '预警提醒',
            name: '1'
          },
          {
            label: '通知提醒',
            name: '2'
          }
        ]
      }
    }
  })
  const echartslineoption = ref({
    tooltip: {},
    legend: {
      data: ['远程盖章', '智能用印', '普通用印']
    },
    toolbox: {
      show: true,
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        dataView: { readOnly: false },
        magicType: { type: ['line', 'bar'] },
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
        '2022-10-01',
        '2022-10-02',
        '2022-10-03',
        '2022-10-04',
        '2022-10-05',
        '2022-10-06',
        '2022-10-07',
        '2022-10-08',
        '2022-10-09',
        '2022-10-10',
        '2022-10-11',
        '2022-10-12',
        '2022-10-13',
        '2022-10-14',
        '2022-10-15',
        '2022-10-16',
        '2022-10-17',
        '2022-10-18',
        '2022-10-19',
        '2022-10-20',
        '2022-10-21',
        '2022-10-22',
        '2022-10-23',
        '2022-10-24',
        '2022-10-25',
        '2022-10-26',
        '2022-10-27',
        '2022-10-28'
      ]
    },
    yAxis: {},
    series: [
      {
        name: '远程盖章',
        type: 'line',
        data: [
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '7',
          '9',
          '2',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '2',
          '1',
          '0',
          '6',
          '0',
          '0',
          '0',
          '0',
          '4',
          '1',
          '1'
        ]
      },
      {
        name: '智能用印',
        type: 'line',
        data: [
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '2',
          '0',
          '0',
          '0'
        ]
      },
      {
        name: '普通用印',
        type: 'line',
        data: [
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '7',
          '10',
          '19',
          '2',
          '3',
          '9',
          '0',
          '0',
          '11',
          '11',
          '18',
          '13',
          '16',
          '0',
          '0',
          '2',
          '26',
          '31',
          '17',
          '6'
        ]
      }
    ]
  })
  onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
  })
  onMounted(() => {
    // console.log(`the component is now mounted.`)
  })
</script>
<style lang="scss" scoped>
  .frontDesk-home-page-home {
    margin: 0%;
    .ap-box {
      width: 100%;
      height: 100%;
      position: relative;
    }
    .ap-back-img {
      width: 100%;
      position: absolute;
      top: 0%;
      left: 0%;
    }
    .ap-cont {
      position: absolute;
      top: 0%;
      left: 0%;
      width: 100%;
      .ap-cont-info {
        width: 100%;
        box-sizing: border-box;
        @include mixin-padding(16);
        height: 8rem;
        display: flex;
        align-items: center;
        background-color: var(--color-fill--4);
        justify-content: space-between;
        .ap-cont-info-user {
          display: flex;
          align-items: center;
          .user-box {
            width: 3rem;
            height: 3rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: var(--border-radius-4);
            color: var(--color-text-6);
            background-color: var(--primary-6);
            margin: 0% 1rem;
          }
          .user-info-basic-name {
            color: var(--color-text-1);
            font-size: var(--font-size-title-2);
            margin-right: 0.2rem;
          }
          .user-info-basic-jues {
            color: var(--color-text-2);
            font-size: var(--font-size-caption);
            background-color: var(--color-fill--2);
            margin: 0% 0.2rem;
            padding: 0.1rem 0.2rem;
            box-sizing: border-box;
          }
          .user-info-work-text {
            color: var(--color-text-2);
            font-size: var(--font-size-caption);
            margin-right: 0.2rem;
          }
        }
        .ap-cont-info-record {
          display: flex;
          align-items: center;
          .module-box {
            width: 7rem;
            text-align: center;
            .module-box-num {
              color: var(--color-text-1);
              font-size: var(--font-size-title-2);
            }
            .module-box-text {
              color: var(--color-text-2);
              font-size: var(--font-size-body-2);
            }
          }
        }
      }
      .ap-cont-module {
        @include mixin-padding(16);
        display: flex;
        justify-content: space-between;
        .ap-cont-module-left {
          width: calc(70% - 16px);
          .flow {
            position: relative;
            .flow-more {
              position: absolute;
              right: 0%;
              top: 0rem;
              @include mixin-padding(16);
              color: var(--color-text-3);
              height: 38px;
              display: flex;
              align-items: center;
            }
            .flow-list-li {
              display: flex;
              padding: 1rem 0rem;
              box-sizing: border-box;
              .flow-list-li-name {
                position: relative;
                .flow-list-li-name-sign {
                  width: 2.5rem;
                  height: 2.5rem;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  border-radius: var(--border-radius-4);
                  color: var(--color-text-6);
                  background-color: var(--primary-6);
                }
                .flow-list-li-name-icon {
                  position: absolute;
                  right: -0.25rem;
                  top: -0.25%;
                  width: 0.5rem;
                  height: 0.5rem;
                  .iconpark-icon {
                    position: absolute;
                    width: 0.5rem;
                    height: 0.5rem;
                    // right: -0.25rem;
                    top: -0.25%;
                  }
                }
              }
              .flow-list-li-desc {
                flex-grow: 1;
                padding: 0% 1rem;
                box-sizing: border-box;
                .flow-list-li-desc-cont {
                  color: var(--color-text-1);
                }
                .flow-list-li-desc-jues {
                  margin-top: 0.2rem;
                  .label {
                    color: var(--color-text-2);
                    font-size: var(--font-size-caption);
                    background-color: var(--color-fill--2);
                    margin: 0% 0.2rem 0% 0rem;
                    padding: 0.1rem 0.2rem;
                    box-sizing: border-box;
                  }
                  .checked {
                    background-color: var(--primary-1);
                    color: var(--primary-6);
                  }
                }
              }
              .flow-list-li-addition {
                display: flex;
                justify-content: flex-end;
                flex-flow: wrap;
                width: 9rem;
                .label {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: var(--Info-6);
                  font-size: var(--font-size-caption);
                  background-color: var(--Info-1);
                  // margin: 0% 0.2rem 0% 0rem;
                  padding: 0.2rem 0.2rem;
                  box-sizing: border-box;
                  width: 4rem;
                  text-align: center;
                  border-radius: var(--border-radius-4);
                }
                .time {
                  margin-top: 0.2rem;
                  width: 100%;
                  text-align: right;
                  color: var(--color-text-3);
                  font-size: var(--font-size-caption);
                }
              }
            }
          }
        }
        .ap-cont-module-right {
          width: 30%;
          .fast {
            position: relative;
            .fast-back {
              position: absolute;
              height: 100%;
              right: 0%;
              top: 0%;
              .fast-back-img {
                height: 100%;
              }
            }
            .fast-cont {
              .fast-cont-title {
                font-size: var(--font-size-title-2);
                color: var(--color-text-1);
                margin-bottom: 1rem;
              }
              .fast-cont-but {
                margin-top: 0.5rem;
                .fast-button {
                  width: 40%;
                  height: 2.2rem;
                  box-sizing: border-box;
                  display: flex;
                  align-items: center;
                }
                .fast-icon {
                  margin-right: 0.3rem;
                  width: 1rem;
                  height: 1rem;
                  .iconpark-icon {
                    width: 1rem;
                    height: 1rem;
                  }
                }
              }
            }
            .fast-icon {
              .iconpark-icon {
                width: 1rem;
              }
            }
          }
          .remind {
            position: relative;
            .remind-more {
              position: absolute;
              right: 0%;
              top: 0rem;
              @include mixin-padding(16);
              color: var(--color-text-3);
              height: 38px;
              display: flex;
              align-items: center;
            }
            .list {
              display: flex;
              .list-timeLine {
                width: 1rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;
                padding-top: 0.5rem;
                box-sizing: border-box;
                .list-timeLine-dian {
                  width: 0.4rem;
                  height: 0.4rem;
                  background-color: var(--color-fill-25);
                  border-radius: 50%;
                }
                .list-timeLine-line {
                  height: calc(100% - 0.9rem);
                  width: 1px;
                  background-color: var(--color-border-1);
                }
                .dian-new {
                  background-color: var(--danger-6);
                }
              }
              .list-cont {
                width: calc(100% - 1rem);
                display: flex;
                padding: 0% 0% 1rem 0%;
                box-sizing: border-box;
                .list-cont-time {
                  color: var(--color-text-3);
                  text-align: right;
                  width: 2.5rem;
                  .list-cont-time-o {
                    margin-bottom: 0.3rem;
                  }
                  .list-cont-time-t {
                    font-size: var(--font-size-body-1);
                  }
                }
                .list-cont-desc {
                  width: calc(100% - 2.5rem);
                  .list-cont-desc-title {
                    color: var(--color-text-1);
                    margin-bottom: 0.3rem;
                  }
                  .list-cont-desc-cont {
                    color: var(--color-text-3);
                  }
                }
              }
            }

            .remind-icon {
              width: auto;
              height: 0.8rem;
              .iconpark-icon {
                width: 2rem;
                height: 0.8rem;
              }
            }
          }
          .copy {
            position: relative;
            .copy-title {
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-bottom: 1rem;
              .copy-title-name {
                font-size: var(--font-size-title-1);
                color: var(--color-text-1);
              }
              .copy-title-more {
                color: var(--color-text-3);
              }
            }
            .list {
              display: flex;
              .list-timeLine {
                width: 1rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;
                padding-top: 0.5rem;
                box-sizing: border-box;
                .list-timeLine-dian {
                  width: 0.4rem;
                  height: 0.4rem;
                  background-color: var(--color-fill-25);
                  border-radius: 50%;
                }
                .list-timeLine-line {
                  height: calc(100% - 0.9rem);
                  width: 1px;
                  background-color: var(--color-border-1);
                }
                .dian-new {
                  background-color: var(--danger-6);
                }
              }
              .list-cont {
                width: calc(100% - 1rem);
                display: flex;
                padding: 0% 0% 1rem 0%;
                box-sizing: border-box;
                .list-cont-time {
                  color: var(--color-text-3);
                  text-align: right;
                  width: 2.5rem;
                  .list-cont-time-o {
                    margin-bottom: 0.3rem;
                  }
                  .list-cont-time-t {
                    font-size: var(--font-size-body-1);
                  }
                }
                .list-cont-desc {
                  width: calc(100% - 2.5rem);
                  .list-cont-desc-title {
                    color: var(--color-text-1);
                    margin-bottom: 0.3rem;
                  }
                  .list-cont-desc-cont {
                    color: var(--color-text-3);
                  }
                }
              }
            }

            .copy-icon {
              width: auto;
              height: 0.8rem;
              .iconpark-icon {
                width: 2rem;
                height: 0.8rem;
              }
            }
          }
        }
        .module-box {
          background: var(--color-fill--5);
          border-radius: var(--border-radius-4);
          @include mixin-padding(16);
          @include mixin-margin-bottom(16);
          .module-box-title {
            display: flex;
            justify-content: space-between;
            .module-box-title-name {
              color: var(--color-text-1);
              font-size: var(--font-size-title-1);
            }
            .module-box-title-cut {
              display: flex;
              .module-box-title-cut-but {
                margin-left: 1rem;
                color: var(--color-text-3);
              }
              .checked {
                color: var(--primary-6);
              }
            }
          }
        }
      }
    }
  }
</style>
