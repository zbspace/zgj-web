<!-- 用印申请 选中表单 -->
<template>
  <div class="Seal-application-fill-form">
    <componentsLayout Layout="breadcrumb,title,custom,tabs">
      <template #breadcrumb>
        <div class="breadcrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>格口管理 </el-breadcrumb-item>
            <el-breadcrumb-item>格口详情</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </template>
      <template #title>
        <div class="title">
          <div class="title-desc">
            <img
              class="title-desc-img"
              src="../../../../assets/svg/jiantou-zuo.svg"
              alt=""
              @click="clickBackPage"
            />
            格口详情
          </div>
          <div> </div>
        </div>
      </template>

      <template #custom>
        <div class="custom">
          <div class="grid-base">
            <div class="grid-base-item">
              <span>格口编号</span>
              <div>A-1-1</div>
            </div>
            <div class="grid-base-item">
              <span>可存放物品数</span>
              <div>4</div>
            </div>
            <div class="grid-base-item">
              <span>已绑定物品数</span>
              <div>3</div>
            </div>
            <div class="grid-base-item">
              <span>可绑定物品数</span>
              <div>3</div>
            </div>
            <div class="grid-base-item">
              <span>在柜物品数</span>
              <div>3</div>
            </div>
          </div>
        </div>
        <div class="tab-wrap">
          <div class="tab-content">
            <componentsTabs
              activeName="1"
              :data="state.componentsTabs.data"
              @tab-change="tabChange"
            >
            </componentsTabs>
            <div class="btn-list">
              <button>忽略异常</button>
              <button>停用</button>
              <button class="pan">盘点</button>
            </div>
          </div>
          <div
            class="seal-column-wrap"
            v-if="state.componentsDetails.activeName == 1"
          >
            <div
              class="seal-column-item"
              v-for="(it, io) in handleGrid()"
              :key="io"
            >
              <div class="seal-item" v-for="(ie, ix) in it" :key="ix">
                <div class="order">0{{ ie.position }}</div>
                <div
                  class="product-list"
                  v-if="ie.bindState > 0 || ie.productList.length > 0"
                >
                  <div
                    class="produce-item"
                    v-for="(item, index) in ie.productList"
                  >
                    <div class="seal-name"
                      >{{ item.name }}<span>（{{ item.mac }}）</span></div
                    >
                    <div
                      class="seal-base"
                      :class="item.state != 0 ? 'seal-error' : ''"
                    >
                      <div
                        v-if="item.state == 0 && item.inBoxState == 1"
                        class="inbox-tag"
                        >在柜</div
                      >
                      <div v-if="item.state == -2" class="error-tag"
                        >异常放入</div
                      >
                      <div v-if="item.state == -1" class="error-tag"
                        >异常取出</div
                      >
                      <div class="operate-name"
                        >操作人：{{ item.operateName }}</div
                      >
                      <div class="operate-time"
                        >操作时间：{{ item.operateTime }}</div
                      >
                      <div class="in-box" v-if="item.yBoxCode"
                        >原格位：{{ item.yBoxCode }}
                        <span v-if="item.yPosition"
                          >格位{{ item.yPosition }}</span
                        ></div
                      >
                    </div>
                  </div>
                </div>
                <div
                  class="no-bind"
                  v-if="ie.bindState == 0 && ie.productList.length <= 0"
                >
                  <img src="../../../../assets/svg/device/nobind-icon.svg" />
                </div>
                <div class="open-btn">开锁</div>
              </div>
            </div>
          </div>
          <div v-if="state.componentsDetails.activeName == 2">
            <componentsTable
              :defaultAttribute="
                state.componentsDetails.processData.defaultAttribute
              "
              :data="state.componentsDetails.processData.data"
              :header="state.componentsDetails.processData.header"
              @cellClick="cellClick"
              @custom-click="customClick"
              @selection-change="selectionChange"
            >
            </componentsTable>
          </div>
        </div>
      </template>
    </componentsLayout>
  </div>
</template>
<script setup>
  import { reactive, onBeforeMount, onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import componentsLayout from '../../../components/Layout.vue'
  import componentsTabs from '../../../components/JyTabs.vue'
  import componentsTable from '../../../components/table'
  const props = defineProps({
    // 处理类型
    type: {
      type: String,
      default: '0'
    }
  })
  const router = useRouter()
  const emit = defineEmits([])
  const state = reactive({
    componentsTabs: {
      data: [
        {
          label: '绑定印章',
          name: '1'
        },
        {
          label: '流程记录',
          name: '2'
        }
      ]
    },
    componentsDetails: {
      activeName: 1,
      positionList: [
        {
          position: 1,
          bindState: 1,
          productList: [
            {
              name: '普通印章(锁)普通印章(锁) 普通印章(锁) 普通印章(锁)  ',
              mac: 'E28554700000',
              state: 0,
              inBoxState: 1,
              operateName: '马丽丽',
              operateTime: '2022-12-26 18:00:00',
              isbind: false
            }
          ]
        },
        {
          position: 2,
          bindState: 1,
          productList: [
            {
              name: '普通印章(锁)普通印章(锁) 普通印章(锁) 普通印章(锁)  ',
              mac: 'E28554700000',
              state: 0,
              inBoxState: 1,
              operateName: '马丽丽',
              operateTime: '2022-12-26 18:00:00',
              isbind: false
            },
            {
              name: '普通印章(锁)普通印章(锁) 普通印章(锁) 普通印章(锁)  ',
              mac: 'E28554700000',
              state: -2,
              inBoxState: 1,
              operateName: '马丽丽',
              operateTime: '2022-12-26 18:00:00',
              isbind: false
            }
          ]
        },
        {
          position: 3,
          bindState: 0,
          productList: []
        },
        {
          position: 4,
          bindState: 1,
          productList: [
            {
              name: '普通印章(锁)普通印章(锁) 普通印章(锁) 普通印章(锁)  ',
              mac: 'E28554700000',
              state: -2,
              inBoxState: 0,
              operateName: '马丽丽',
              operateTime: '2022-12-26 18:00:00',
              isbind: false,
              yBoxCode: 'A-1-2',
              yPosition: '5'
            }
          ]
        },
        {
          position: 5,
          bindState: 1,
          productList: [
            {
              name: '普通印章(锁)普通印章(锁) 普通印章(锁) 普通印章(锁)  ',
              mac: 'E28554700000',
              state: -1,
              inBoxState: 0,
              operateName: '马丽丽',
              operateTime: '2022-12-26 18:00:00',
              isbind: false
            }
          ]
        },
        {
          position: 6,
          bindState: 1,
          productList: [
            {
              name: '普通印章(锁)普通印章(锁) 普通印章(锁) 普通印章(锁)  ',
              mac: 'E28554700000',
              state: 0,
              inBoxState: 1,
              operateName: '马丽丽',
              operateTime: '2022-12-26 18:00:00',
              isbind: false
            }
          ]
        }
        // {
        //     position: 7,
        //     bindState: 1,
        //     productList: [
        //         {
        //             name: '普通印章(锁)普通印章(锁) 普通印章(锁) 普通印章(锁)  ',
        //             mac: 'E28554700000',
        //             state: 0,
        //             inBoxState: 1,
        //             operateName: '马丽丽',
        //             operateTime: '2022-12-26 18:00:00',
        //             isbind: false,
        //         }
        //     ]
        // },
        // {
        //     position: 8,
        //     bindState: 1,
        //     productList: [
        //         {
        //             name: '普通印章(锁)普通印章(锁) 普通印章(锁) 普通印章(锁)  ',
        //             mac: 'E28554700000',
        //             state: 0,
        //             inBoxState: 1,
        //             operateName: '马丽丽',
        //             operateTime: '2022-12-26 18:00:00',
        //             isbind: false,
        //         }
        //     ]
        // },
        // {
        //     position: 9,
        //     bindState: 1,
        //     productList: [
        //         {
        //             name: '普通印章(锁)普通印章(锁) 普通印章(锁) 普通印章(锁)  ',
        //             mac: 'E28554700000',
        //             state: 0,
        //             inBoxState: 1,
        //             operateName: '马丽丽',
        //             operateTime: '2022-12-26 18:00:00',
        //             isbind: false,
        //         }
        //     ]
        // },
      ],
      processData: {
        header: [
          {
            width: 50
            // type: "selection"
          },
          {
            prop: '0',
            label: '序号',
            width: 100
          },
          {
            prop: '1',
            label: '操作人',
            sortable: true,
            'min-width': 150
          },
          {
            prop: '2',
            label: '操作时间',
            sortable: true,
            'min-width': 150
          },
          {
            prop: '3',
            label: '操作记录',
            sortable: true,
            'min-width': 150
          },
          {
            prop: '4',
            label: '备注',
            sortable: true,
            'min-width': 150
          }
        ],
        data: [
          {
            0: '1',
            1: '马丽丽',
            2: '2022-12-27 15:00:00',
            3: '领取',
            4: '领取印章'
          },
          {
            0: '2',
            1: '马丽丽',
            2: '2022-12-27 15:00:00',
            3: '领取',
            4: '领取印章'
          },
          {
            0: '3',
            1: '马丽丽',
            2: '2022-12-27 15:00:00',
            3: '领取',
            4: '领取印章'
          },
          {
            0: '4',
            1: '马丽丽',
            2: '2022-12-27 15:00:00',
            3: '领取',
            4: '领取印章'
          },
          {
            0: '5',
            1: '马丽丽',
            2: '2022-12-27 15:00:00',
            3: '领取',
            4: '领取印章'
          },
          {
            0: '6',
            1: '马丽丽',
            2: '2022-12-27 15:00:00',
            3: '领取',
            4: '领取印章'
          },
          {
            0: '7',
            1: '马丽丽',
            2: '2022-12-27 15:00:00',
            3: '领取',
            4: '领取印章'
          }
        ],
        // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
        defaultAttribute: {
          stripe: true,
          'header-cell-style': {
            background: 'var(--jy-color-fill--3)'
          },
          'cell-style': ({ row, column, rowIndex, columnIndex }) => {
            // console.log({ row, column, rowIndex, columnIndex });
            // if (column.property == "2") {
            //     return {
            //         "color": "var(--jy-info-6)",
            //         "cursor": "pointer",
            //     }
            // }
          }
        }
      }
    }
  })
  const refFillFormInformation = ref(null)

  // 点击返回上一页
  function clickBackPage() {
    router.go(-1)
  }

  function tabChange(activeName) {
    state.componentsDetails.activeName = activeName
    if (activeName == 1) {
    } else if (activeName == 2) {
    }
  }
  function handleGrid() {
    const gridData1 = []
    const gridData2 = []
    const columnNum = state.componentsDetails.positionList.length / 2
    state.componentsDetails.positionList.map((item, index) => {
      if (index < columnNum) {
        gridData1.push(item)
      } else {
        gridData2.push(item)
      }
    })
    const newArr = []
    gridData1.map((item, index) => {
      const curArr = []
      curArr.push(item)
      if (gridData2[index]) {
        curArr.push(gridData2[index])
      }
      newArr.push(curArr)
    })
    // [gridData1, gridData2]
    return newArr
  }

  onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
    // vFormLibraryRef.value.resetForm()
    // vFormLibraryRef.value.getFormData().then()
  })
  onMounted(() => {
    // console.log(`the component is now mounted.`)
  })
</script>
<style lang="scss" scoped>
  .Seal-application-fill-form {
    margin: 0%;
    position: relative;

    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .title-desc {
        display: flex;
        align-items: center;

        .title-desc-img {
          margin-right: 0.5rem;
          cursor: pointer;
        }
      }
    }

    .custom {
      // padding-right: 1.25rem;
      box-sizing: border-box;
      text-align: center;
      padding-bottom: 4rem;

      .grid-base {
        display: flex;
        margin-top: 10px;
        justify-content: space-evenly;

        .grid-base-item {
          width: 18%;
          height: 106px;
          background: #ffffff;
          /* 线条 border/描边 */

          border: 1px solid rgba(0, 0, 0, 0.15);
          border-radius: 4px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          > span {
            margin-bottom: 16px;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.65);
          }

          > div {
            font-size: 28px;
            color: rgba(0, 0, 0, 0.85);
          }

          > .error {
            color: #d04d3e;
          }
        }
      }
    }

    .tab-wrap {
      padding-right: 24px;

      .tab-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #d0963e;

        .btn-list {
          > button {
            border: none;
            padding: 5px 16px;
            background: #ffffff;
            border: 1px solid #d0963e;
            border-radius: 2px;
            margin-left: 16px;
            color: #d0963e;
            font-size: 14px;
          }

          > .pan {
            color: #fff;
            background: #d0963e;
          }
        }
      }

      .seal-column-wrap {
        // display: flex;
        // justify-content: space-between;

        .seal-column-item {
          width: 100%;
          display: flex;
          justify-content: space-between;
        }
      }

      .seal-item {
        width: 49%;
        background: #ffffff;
        padding: 16px;
        padding-bottom: 50px;
        /* 线条 border/描边 */
        margin-bottom: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 2px;
        position: relative;

        .order {
          position: absolute;
          font-family: 'DIN';
          font-style: normal;
          font-weight: 400;
          font-size: 50px;
          right: 0;
          top: 0;
          color: #000000;
          opacity: 0.1;
          line-height: 1;
        }
        .no-bind {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .seal-name {
          color: rgba(0, 0, 0, 0.85);

          > span {
            color: rgba(0, 0, 0, 0.45);
          }
        }
        .seal-base {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          margin: 12px 0;
          font-size: 12px;
          color: rgba(0, 0, 0, 0.45);
          > div {
            margin-right: 12px;
          }
          .inbox-tag {
            background: #e8fff2;
            color: #3ed096;
            border-radius: 2px;
            padding: 1px 8px;
          }
          .operate-name {
            border-right: 1px solid rgba(0, 0, 0, 0.45);
            padding-right: 12px;
          }
        }
        .seal-error {
          color: #d04d3e;
          .error-tag {
            background: #ffeee8;
            border: 1px solid #ecad9d;
            border-radius: 2px;
            padding: 1px 8px;
          }
          .operate-name {
            border-right: 1px solid #d04d3e;
            padding-right: 12px;
          }
          .in-box {
            border-left: 1px solid #d04d3e;
            padding-left: 12px;
          }
        }

        .open-btn {
          position: absolute;
          bottom: 16px;
          right: 16px;
          background: #d0963e;
          border-radius: 2px;
          border: none;
          padding: 5px 16px;
          color: #ffffff;
          cursor: pointer;
        }
      }
    }

    .ap-fixed {
      width: calc(100%);
      position: absolute;
      bottom: 0%;
      height: 4rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-top: 1px solid var(--jy-color-border-2);
      background-color: var(--jy-in-common-use-1);
      z-index: 999;
    }
  }
</style>
