<!-- 用印申请 选中表单 -->
<template>
  <div class="Seal-application-Confirm-approval-process">
    <componentsLayout Layout="breadcrumb,title,custom,fixed">
      <template #breadcrumb>
        <div class="breadcrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>用印申请 </el-breadcrumb-item>
            <el-breadcrumb-item>新建用印申请</el-breadcrumb-item>
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
            新建用印申请
          </div>
          <div> </div>
        </div>
      </template>
      <template #custom>
        <div class="custom">
          <div class="custom-buzhou">
            <SealApplicationStep
              :data="state.cache.flowList"
            ></SealApplicationStep>
          </div>
          <div>
            <documentsDetailsPortion>
              <template #title>
                <div>审批流程</div>
              </template>
              <template #content>
                <div style="height: 1000px">
                  <VFlowDesign
                    ref="refVFlowDesign"
                    :defaultAttribute="{
                      readable: true,
                      mapable: false,
                      scroll: false,
                      top: '100'
                    }"
                  ></VFlowDesign>
                </div>
              </template>
            </documentsDetailsPortion>
          </div>
          <div class="PrintingProcess">
            <documentsDetailsPortion>
              <template #title>
                <div>用印流程</div>
              </template>
              <template #content>
                <div class="PrintingProcess-content">
                  <div
                    class="PrintingProcess-content-list"
                    v-for="(item, index) in state.cache.PrintingProcess.list"
                    :key="index"
                  >
                    <div class="PrintingProcess-content-list-cont">
                      <div class="PrintingProcess-content-list-cont-title">
                        <img
                          class="PrintingProcess-content-list-cont-title-img"
                          src="@/assets/svg/yongyin-shenqing-rili-lan.svg"
                          alt=""
                        />
                        <span
                          class="PrintingProcess-content-list-cont-title-span"
                          >{{ item.title }}</span
                        >
                      </div>
                      <div
                        class="PrintingProcess-content-list-cont-list"
                        v-for="(node, num) in item.list"
                        :key="num"
                      >
                        <div class="PrintingProcess-content-list-cont-list-name"
                          >{{ node.name }}
                        </div>
                        <div
                          class="PrintingProcess-content-list-cont-list-icon"
                        >
                          <img
                            class="PrintingProcess-content-list-cont-list-icon-img"
                            src="@/assets/svg/yongyin-shenqing-wenhao-hui.svg"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                    <div class="PrintingProcess-content-list-iocn">
                      <img
                        class="PrintingProcess-content-list-iocn-img"
                        src="@/assets/svg/yongyin-shenqing-xiayibu.svg"
                        alt=""
                        v-if="
                          index < state.cache.PrintingProcess.list.length - 1
                        "
                      />
                    </div>
                  </div>
                </div>
              </template>
            </documentsDetailsPortion>
          </div>
        </div>
      </template>
      <template #fixed>
        <div class="fixed">
          <div class="ap-fixed">
            <el-button type="primary" @click="clickSubmit">提交</el-button>
            <el-button @click="clickBackPage">上一步</el-button>
            <el-button class="ap-fixed-save">
              <span class="ap-fixed-save-text"> 保存模板 </span>
              <el-tooltip
                class="box-item"
                effect="dark"
                content=""
                placement="top"
              >
                <template #content>
                  <div style="width: 300px">
                    模板可用于提高重复发起同种类型用印申请的填写效率，一种文件类型仅允许保存一个模板，保存后可在申请页面直接引用
                  </div>
                </template>
                <i class="ap-fixed-save-icon">
                  <svg class="iconpark-icon"><use href="#icon4"></use></svg>
                </i>
              </el-tooltip>
            </el-button>
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
    ref,
    defineAsyncComponent
  } from 'vue'
  import { useRouter } from 'vue-router'
  import componentsLayout from '../../../components/Layout.vue'
  import documentsDetailsPortion from '../../../components/documentsDetails/portion.vue'
  import SealApplicationStep from '@/views/components/Seal-application/step.vue'
  import FillFormInformation from '@/views/addDynamicFormJson/Fill-form-information.json'
  import FillFormInformationSeal from '@/views/addDynamicFormJson/Fill-form-information-seal.json'
  import flowJson from '@/views/jyGunsJson/flow'
  // 异步组件
  const VFlowDesign = defineAsyncComponent({
    loader: () => import('@/views/components/FlowDesign/index.vue')
    // // 加载异步组件时使用的组件
    // loadingComponent: LoadingComponent,
    // // 加载失败时使用的组件
    // errorComponent: ErrorComponent
  })
  const props = defineProps({
    // 处理类型
    type: {
      type: String,
      default: '0'
    }
  })
  const router = useRouter()
  const emit = defineEmits([])
  const refVFlowDesign = ref(null)
  const state = reactive({
    cache: {
      flowList: [
        {
          name: '填写表单信息'
        },
        {
          name: '确认审批流程',
          active: true
        },
        {
          name: '完成'
        }
      ],
      formData: {},
      optionData: {},
      SealformData: {},
      SealoptionData: {},
      PrintingProcess: {
        list: [
          {
            title: '盖前',
            list: [
              {
                name: '说明详情后续补上'
              }
            ]
          },
          {
            title: '实时视频盖章',
            list: [
              {
                name: '说明详情后续补上'
              },
              {
                name: '说明详情后续补上'
              },
              {
                name: '说明详情后续补上'
              }
            ]
          },
          {
            title: '盖中',
            list: [
              {
                name: '说明详情后续补上'
              },
              {
                name: '说明详情后续补上'
              },
              {
                name: '说明详情后续补上'
              },
              {
                name: '说明详情后续补上'
              },
              {
                name: '说明详情后续补上'
              }
            ]
          },
          {
            title: '盖后',
            list: [
              {
                name: '说明详情后续补上'
              }
            ]
          },
          {
            title: '归档',
            list: [
              {
                name: '说明详情后续补上'
              }
            ]
          }
        ]
      }
    }
  })
  const refFillFormInformation = ref(null)

  // 点击返回上一页
  function clickBackPage() {
    router.go(-1)
  }

  // 点击提交
  function clickSubmit() {
    router.push({ name: 'Accomplish' })
  }

  onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
    // vFormLibraryRef.value.resetForm()
    // vFormLibraryRef.value.getFormData().then()
  })
  onMounted(() => {
    // console.log(`the component is now mounted.`)
    setTimeout(() => {
      // console.log('--->', refVFlowDesign.value.handleSetData)
      refVFlowDesign.value.handleSetData(flowJson)
    }, 1000)
  })
</script>
<style lang="scss" scoped>
  .Seal-application-Confirm-approval-process {
    margin: 0%;
    position: relative;
    height: 100%;
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

      .custom-buzhou {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem 0;
        box-sizing: border-box;

        .custom-buzhou-list {
          display: flex;
          justify-content: center;
          align-items: center;

          .custom-buzhou-list-desc {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 10rem;

            .custom-buzhou-list-desc-index {
              width: 1.5rem;
              height: 1.5rem;
              display: flex;
              justify-content: center;
              align-items: center;
              background-color: var(--jy-color-fill--3);
              color: var(--jy-color-text-3);
              border-radius: var(--jy-border-radius-2);
              margin-right: 0.5rem;
            }

            .custom-buzhou-list-desc-text {
              font-size: var(--jy-font-size-title-1);
              color: var(--jy-color-text-3);
            }
          }

          .custom-buzhou-list-jiantou {
            width: 7rem;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }

        .indexActive {
          background-color: var(--jy-primary-6) !important;
          color: var(--jy-in-common-use-1) !important;
        }

        .textActive {
          color: var(--jy-color-text-1) !important;
        }

        .font-color-45 {
          color: var(--jy-color-text-3) !important;
        }
      }

      .PrintingProcess {
        .PrintingProcess-content {
          display: flex;
          flex-flow: wrap;

          // align-items: flex-start;
          .PrintingProcess-content-list {
            // margin-right: 1rem;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;

            .PrintingProcess-content-list-cont {
              height: 17rem;
              align-self: flex-start;
              width: 15rem;
              border: 1px solid var(--jy-color-border-1);
              background-color: var(--jy-color-fill--1);
              padding: 1rem;
              box-sizing: border-box;

              .PrintingProcess-content-list-cont-title {
                display: flex;
                justify-content: center;
                height: 2rem;
                align-items: center;
                font-size: var(--jy-font-size-title-1);

                .PrintingProcess-content-list-cont-title-img {
                  margin-right: 0.5rem;
                }
              }

              .PrintingProcess-content-list-cont-list {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0.5rem 1rem;
                box-sizing: border-box;
              }
            }

            .PrintingProcess-content-list-iocn {
              margin-left: 1rem;
              margin-right: 1rem;
              width: 3rem;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }
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
      .ap-fixed-save-icon {
        .iconpark-icon {
          width: 1rem;
          height: 1rem;
        }
      }
    }
  }
</style>
