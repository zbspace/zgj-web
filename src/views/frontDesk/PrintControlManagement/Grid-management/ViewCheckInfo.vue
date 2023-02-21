<!-- 用印申请 选中表单 -->
<template>
  <div class="Seal-application-fill-form">
    <componentsLayout Layout="breadcrumb,title,custom,tabs">
      <template #breadcrumb>
        <div class="breadcrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>格口管理 </el-breadcrumb-item>
            <el-breadcrumb-item>盘点汇总详情</el-breadcrumb-item>
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
            盘点汇总详情
          </div>
        </div>
      </template>

      <template #custom>
        <div class="custom">
          <div class="grid-all">
            <documentsDetailsPortion>
              <template #title>
                <div class="ap-cont-box-title-label">总览</div>
              </template>
              <template #content>
                <div class="grid-cell-item">
                  <div class="left">
                    <div>格口总数</div>
                    <span>20</span>
                  </div>
                  <div class="center"></div>
                  <div class="right">
                    <div>已绑定印章</div>
                    <span class="blue">12</span>
                  </div>
                </div>
                <div class="grid-cell-item">
                  <div class="left">
                    <div>应在柜印章</div>
                    <span>20</span>
                  </div>
                  <div class="center"></div>
                  <div class="right">
                    <div>实在柜印章</div>
                    <span class="red">12</span>
                  </div>
                </div>
                <div class="grid-cell-item">
                  <div class="left">
                    <div>应被取出印章</div>
                    <span>20</span>
                  </div>
                  <div class="center"></div>
                  <div class="right cursor" @click="viewOutSeal">
                    <div>实被取出印章</div>
                    <span class="red">12</span>
                  </div>
                </div>
              </template>
            </documentsDetailsPortion>
          </div>
          <div class="grid-error">
            <documentsDetailsPortion>
              <template #title>
                <div class="ap-cont-box-title-label">异常格口</div>
              </template>
              <template #content>
                <div class="grid-tab">
                  <div class="device-tab">
                    <div
                      class="device-item"
                      :class="{ selected: state.sealBoxIndex == index }"
                      v-for="(item, index) in state.deviceList"
                      :key="index"
                      @click.stop="selectSealBox(index)"
                    >
                      {{ item.deviceName }}</div
                    >
                  </div>
                </div>
                <div class="grid-list">
                  <div
                    class="grid-error-item"
                    v-for="(item, index) in state.errorGridList"
                  >
                    {{ item.boxCode }}
                  </div>
                </div>
              </template>
            </documentsDetailsPortion>
          </div>
        </div>
      </template>
    </componentsLayout>
  </div>
</template>
<script setup>
  import {
    reactive,
    defineProps,
    defineEmits,
    onBeforeMount,
    onMounted,
    inject,
    ref
  } from 'vue'
  import { useRouter } from 'vue-router'
  import componentsLayout from '../../../components/Layout.vue'
  import documentsDetailsPortion from '../../../components/documentsDetails/portion.vue'

  const props = defineProps({
    // 处理类型
    type: {
      type: String,
      default: '0'
    }
  })
  const router = useRouter()
  const commonFun = inject('commonFun')
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
    sealBoxIndex: 0,
    deviceList: [
      {
        deviceName: 'A-1',
        id: ''
      },
      {
        deviceName: 'A-2',
        id: ''
      },
      {
        deviceName: 'A-3',
        id: ''
      }
    ],
    errorGridList: [
      {
        id: '',
        boxCode: 'A-1-1'
      },
      {
        id: '',
        boxCode: 'A-1-1'
      },
      {
        id: '',
        boxCode: 'A-1-1'
      },
      {
        id: '',
        boxCode: 'A-1-1'
      },
      {
        id: '',
        boxCode: 'A-1-1'
      },
      {
        id: '',
        boxCode: 'A-1-1'
      },
      {
        id: '',
        boxCode: 'A-1-1'
      },
      {
        id: '',
        boxCode: 'A-1-1'
      },
      {
        id: '',
        boxCode: 'A-1-1'
      }
    ],
    componentsDetails: {
      activeName: 1,
      bindData: [
        {
          name: '普通印章(锁)普通印章(锁) 普通印章(锁) 普通印章(锁)  ',
          mac: 'E28554700000',
          state: -2,
          operateName: '马丽丽',
          operateTime: '2022-12-26 18:00:00',
          isbind: false
        }
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
            1: 'XXXXXXX',
            2: '用印申请',
            3: '',
            4: '往往',
            5: '',
            6: '2022/10/30  15:00:00'
          },
          {
            1: 'XXXXXXX',
            2: '用印申请',
            3: '',
            4: '往往',
            5: '',
            6: '2022/10/30  15:00:00'
          },
          {
            1: 'XXXXXXX',
            2: '用印申请',
            3: '',
            4: '往往',
            5: '',
            6: '2022/10/30  15:00:00'
          },
          {
            1: 'XXXXXXX',
            2: '用印申请',
            3: '',
            4: '往往',
            5: '',
            6: '2022/10/30  15:00:00'
          },
          {
            1: 'XXXXXXX',
            2: '用印申请',
            3: '',
            4: '往往',
            5: '',
            6: '2022/10/30  15:00:00'
          },
          {
            1: 'XXXXXXX',
            2: '用印申请',
            3: '',
            4: '往往',
            5: '',
            6: '2022/10/30  15:00:00'
          },
          {
            1: 'XXXXXXX',
            2: '用印申请',
            3: '',
            4: '往往',
            5: '',
            6: '2022/10/30  15:00:00'
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
            if (column.property == '2') {
              return {
                color: 'var(--jy-Info-6)',
                cursor: 'pointer'
              }
            }
          }
        }
      }
    }
  })
  const refFillFormInformation = ref(null)

  // 点击返回上一页
  function clickBackPage() {
    commonFun.routerPage(router, -1)
  }

  function tabChange(activeName) {
    state.componentsDetails.activeName = activeName
    if (activeName == 1) {
    } else if (activeName == 2) {
    }
  }

  function selectSealBox(index) {
    state.sealBoxIndex = index
  }
  function viewOutSeal() {
    router.push({
      // path: "/frontDesk/PrintControlManagement/Grid-management/ViewOutSeal"
      name: 'ViewOutSeal'
    })
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
      display: flex;
      justify-content: space-between;

      > div {
        width: 49%;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 4px;
        padding: 16px;
      }

      .grid-cell-item {
        display: flex;
        margin-bottom: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 10px;
        padding: 20px 63px;

        > .left,
        .right {
          width: calc(50% - 1px);

          > div {
            color: rgba(0, 0, 0, 0.85);
            font-size: 16px;
          }

          > span {
            font-size: 28px;
            color: #f7a54b;
          }

          .blue {
            color: #3e78d0;
          }

          .red {
            color: #d04d3e;
          }
        }
        .cursor {
          cursor: pointer;
        }
        .center {
          border: 1px dashed rgba(0, 0, 0, 0.15);
          width: 1px;
        }
      }
      .grid-cell-item:hover {
        box-shadow: 0px 3px 6px -4px rgba(0, 0, 0, 0.12),
          0px 6px 16px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05);
      }
      .grid-tab {
        display: flex;

        .device-tab {
          display: flex;
          padding: 2px;
          background: rgba(0, 0, 0, 0.04);
          /* 线条 border/描边 */

          border: 1px solid rgba(0, 0, 0, 0.15);
          border-radius: 2px;

          .device-item {
            width: 68px;
            height: 24px;
            border-radius: 4px;
            list-style: none;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: PingFang-SC-Bold;
            font-size: 12px;
            color: rgba(0, 0, 0, 0.85);
            text-align: center;
            cursor: pointer;
          }

          .selected {
            background: #ffffff;
            color: #d0963e;
          }
        }
      }
      .grid-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .grid-error-item {
          width: 30%;
          height: 72px;
          background: #ecad9d;
          mix-blend-mode: normal;
          border-radius: 2.8px;
          font-size: 16px;
          color: rgba(0, 0, 0, 0.85);
          margin-top: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
</style>
