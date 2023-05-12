<!-- 用印申请 选中表单 -->
<template>
  <div class="Seal-application-fill-form">
    <componentsLayout
      Layout="breadcrumb,title,custom,fixed"
      :cardStyle="cardStyle"
    >
      <template #breadcrumb>
        <div class="breadcrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item
              style="--el-text-color-regular: rgba(0, 0, 0, 0.65)"
            >
              用印申请
            </el-breadcrumb-item>
            <el-breadcrumb-item
              style="--el-text-color-regular: rgba(0, 0, 0, 0.25)"
            >
              新建用印申请
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </template>
      <template #title>
        <div class="title">
          <div class="title-desc">
            <img
              class="title-desc-img"
              src="@/assets/svg/front/sealApply/back.svg"
              alt=""
              @click="clickBackPage"
            />
            新建用印申请
          </div>
          <div> </div>
        </div>
      </template>
      <template #custom>
        <div class="custom-buzhou">
          <SealApplicationStep
            :data="state.cache.flowList"
          ></SealApplicationStep>
        </div>
        <el-scrollbar height="calc(100vh - 300px)" style="padding-right: 24px">
          <div class="custom">
            <JyVform
              v-show="step === 'one'"
              v-if="fillFormInformationJson"
              mode="render"
              :formJson="fillFormInformationJson"
              :formData="state.cache.formData"
              :optionData="state.cache.optionData"
              ref="refFillFormInformation"
            >
            </JyVform>
            <div v-if="step === 'two'">
              <JyLabel label="审批流程">
                <template #right>
                  <el-select
                    v-model="flowMessageId"
                    placeholder="请选择流程"
                    @change="changeFlow"
                  >
                    <el-option
                      v-for="item in flowLists"
                      :key="item.flowMessageId"
                      :label="item.flowName"
                      :value="item.flowMessageId"
                    />
                  </el-select>
                </template>
              </JyLabel>

              <FlowDesign
                id="flow"
                v-bind="{
                  readable: true,
                  mapable: false,
                  scroll: false,
                  scrollY: false,
                  top: '50'
                }"
                :node="node"
                v-if="node"
                :wrapStyle="wrapStyle"
              />

              <div class="PrintingProcess">
                <JyLabel label="用印流程" />

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
                          src="@/assets/svg/front/sealApply/calendar.svg"
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
                            src="@/assets/svg/front/sealApply/tips.svg"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                    <div class="PrintingProcess-content-list-iocn">
                      <img
                        class="PrintingProcess-content-list-iocn-img"
                        src="@/assets/svg/front/sealApply/step_next.svg"
                        alt=""
                        v-if="
                          index < state.cache.PrintingProcess.list.length - 1
                        "
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </template>
      <template #fixed>
        <div class="fixed" v-if="step === 'one'">
          <div class="ap-fixed">
            <el-button type="primary" @click="clickNextStep">下一步</el-button>
            <el-button class="ap-fixed-save" @click="saveTem">
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
        <div class="fixed" v-if="step === 'two'">
          <div class="ap-fixed">
            <el-button
              type="primary"
              :loading="submitLoading"
              @click="clickSubmit"
              >提交
            </el-button>
            <el-button @click="clickPrevious">上一步</el-button>
          </div>
        </div>
      </template>
    </componentsLayout>

    <JyMessageBox
      v-model="tipVisible"
      :mode="1"
      @on-confirm="confirmTip"
      @on-cancel="cancelTip"
      title="保存模版"
    >
      若当前文件类型已有模版则会覆盖，若当前文件类型没有模板则会创建，请问确定要保存吗？
    </JyMessageBox>
  </div>
</template>
<script setup>
  import { reactive, onBeforeMount, onMounted, ref, nextTick } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import componentsLayout from '../../../components/Layout.vue'
  import SealApplicationStep from '@/views/components/sealApplication/JyStep.vue'
  import sealApply from '@/api/frontDesk/printControl/sealApply'
  import { ElMessage } from 'element-plus'
  import { generatingNumber } from '@/utils/tools'
  import { customComponents } from '@/lib/vform/extension/samples/extension-schema.js'

  import FlowDesign from '@/components/FlowDesign/index.vue'

  const router = useRouter()
  const route = useRoute()
  const initObj = ref(null)
  const applyTypeId = ref(null)
  const applyTypePid = ref(null)
  const sealUseTypeId = ref(null)
  const formVersionId = ref(route.query.formVersionId)
  const flowVersionId = ref(null)
  const submitLoading = ref(false)
  // const emit = defineEmits([])
  const state = reactive({
    cache: {
      flowList: [
        {
          name: '填写表单信息',
          active: true
        },
        {
          name: '确认审批流程',
          active: false
        },
        {
          name: '完成',
          active: false
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
  const step = ref('one')
  const fillFormInformationJson = ref(null)
  const flowLists = ref([])
  const flowMessageId = ref(null)
  const tipVisible = ref(false)
  const formDataTem = ref(null)
  const wrapStyle = ref({})
  const node = ref(null)
  const cardStyle = ref({
    padding: '24px 0 24px 24px'
  })

  const confirmTip = () => {
    sealApply
      .templateAdd({
        formVersionId: formVersionId.value,
        templateName: formDataTem.value.applyName,
        fileTypeId: formDataTem.value.fileTypeId,
        templateValue: JSON.stringify(formDataTem.value)
      })
      .then(res => {
        ElMessage.success('保存模板成功')
        tipVisible.value = false
      })
      .catch(() => {
        tipVisible.value = false
      })
  }

  const cancelTip = () => {
    tipVisible.value = false
  }

  // 点击返回上一页
  function clickBackPage() {
    router.go(-1)
  }

  // 点击下一步
  function clickNextStep() {
    refFillFormInformation.value.getFormData().then(formData => {
      state.cache.formData = formData
      const flowList = state.cache.flowList
      flowList[0].active = false
      flowList[1].active = true
      state.cache.flowList = JSON.parse(JSON.stringify(flowList))
      step.value = 'two'
      sealApply
        .flowList({
          formMessageId: route.query.formMessageId,
          fileTypeId: formData.fileTypeId
        })
        .then(res => {
          if (res.data && res.data.length) {
            flowLists.value = res.data
            flowMessageId.value = res.data[0].flowMessageId
            flowVersionId.value = res.data[0].flowVersionId
            flowDetail(res.data[0].modelId, res.data[0].definitionId)
          }
        })
    })
  }

  // 保存模版
  const saveTem = async () => {
    formDataTem.value = null
    // 名称-文件类型必填
    const formData = await refFillFormInformation.value.getFormData(false)
    if (!formData.fileTypeId && !formData.applyName) {
      ElMessage.warning('单据名称和文件类型必填，否则不允许保存模板')
      return
    }
    formDataTem.value = formData
    tipVisible.value = true
  }

  function changeFlow() {
    const item = flowLists.value.find(
      i => i.flowMessageId === flowMessageId.value
    )
    flowVersionId.value = item.flowVersionId
    flowDetail(item.modelId, item.definitionId)
  }

  function flowDetail(modelId, definitionId) {
    initObj.value = { modelId, definitionId }
    sealApply
      .flowDetail({
        ...initObj.value,
        edit: true
      })
      .then(async res => {
        node.value = null
        nextTick(() => {
          node.value = res.data.data
          nextTick(() => {
            wrapStyle.value = {
              height:
                document.getElementById('flow-designer-box').clientHeight +
                'px',
              overflow: 'hidden'
            }
          })
        })
      })
  }

  // 上一步
  function clickPrevious() {
    const flowList = state.cache.flowList
    flowList[0].active = true
    flowList[1].active = false
    state.cache.flowList = JSON.parse(JSON.stringify(flowList))
    step.value = 'one'
  }

  // 点击提交
  function clickSubmit() {
    if (!flowMessageId.value) {
      ElMessage.warning('请选择审批流程')
      return
    }
    const fixedParamsArr = customComponents
    let fixedParams = {}
    let customApplyField = {}
    for (const item in state.cache.formData) {
      const index = fixedParamsArr.indexOf(item)
      if (index > -1) {
        fixedParams = {
          ...fixedParams,
          ...{
            [item]: state.cache.formData[item]
          }
        }
      } else {
        customApplyField = {
          ...customApplyField,
          ...{
            [item]: state.cache.formData[item]
          }
        }
      }
    }
    const params = {
      modelId: initObj.value.modelId,
      definitionId: initObj.value.definitionId,
      instanceName: state.cache.formData.applyName,
      suggest: null,
      formData: {
        ...state.cache.formData,
        formVersionId: formVersionId.value,
        flowVersionId: flowVersionId.value,
        formMessageId: route.query.formMessageId,
        flowMessageId: flowMessageId.value
      },
      variable: {
        subType: applyTypeId.value,
        instanceType: applyTypePid.value
      }
    }
    submitLoading.value = true
    sealApply
      .submit(params)
      .then(res => {
        sealApply
          .add({
            formMessageId: route.query.formMessageId,
            formVersionId: formVersionId.value,
            flowVersionId: flowVersionId.value,
            applyTypeId: applyTypeId.value,
            sealUseTypeId: sealUseTypeId.value,
            flowMessageId: flowMessageId.value,
            gunsSysId: res.data.data.instanceId,
            customApplyField:
              JSON.stringify(customApplyField) === '{}'
                ? null
                : customApplyField,
            ...fixedParams
          })
          .then(() => {
            router.replace({
              path: '/frontDesk/printControlManage/useSealManage/sealApplication/accomplish',
              query: {
                applyNo: state.cache.formData.applyNo
              }
            })
          })
          .finally(() => {
            submitLoading.value = false
          })
      })
      .finally(() => {
        submitLoading.value = false
      })
  }

  const infoDetail = () => {
    sealApply
      .formQuery({
        formMessageId: route.query.formMessageId
      })
      .then(res => {
        applyTypeId.value = res.data.applyTypeId
        applyTypePid.value = res.data.applyTypePid
        sealUseTypeId.value = res.data.sealUseTypeId
        fillFormInformationJson.value = JSON.parse(res.data.formInfo)
        nextTick(() => {
          refFillFormInformation.value.setFieldValue(
            'applyNo',
            generatingNumber()
          )
        })
      })
  }

  const useInfo = () => {
    sealApply
      .formQuery({
        formMessageId: route.query.formMessageId
      })
      .then(res => {
        applyTypeId.value = res.data.applyTypeId
        applyTypePid.value = res.data.applyTypePid
        sealUseTypeId.value = res.data.sealUseTypeId
        fillFormInformationJson.value = JSON.parse(res.data.formInfo)
        sealApply.templateView(route.query.useId).then(res1 => {
          // if (res1.data.fileTypeId) {
          //   getFileTypeDetail(res1.data.fileTypeId)
          // }
          formVersionId.value = res1.data.formVersionId
          refFillFormInformation.value.setFormData(
            JSON.parse(res1.data.templateValue)
          )
          nextTick(() => {
            refFillFormInformation.value.setFieldValue(
              'applyNo',
              generatingNumber()
            )
          })
        })
      })
  }

  onBeforeMount(() => {
    if (route.query.useId) {
      useInfo()
    } else {
      infoDetail()
    }
  })
  onMounted(() => {})
</script>
<style lang="scss" scoped>
  .Seal-application-fill-form {
    margin: 0%;
    position: relative;

    .contanier-flow {
      width: 100%;
      padding: 0;
      margin-top: 0;
    }

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

    .PrintingProcess {
      min-width: 1440px;
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

    .custom {
      // padding-right: 1.25rem;
      box-sizing: border-box;
      text-align: center;
      padding: 10px 16px 0;
      max-height: calc(100vh - 210px);
    }

    .custom-buzhou {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0;
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
      z-index: 9;

      .ap-fixed-save-icon {
        .iconpark-icon {
          width: 1rem;
          height: 1rem;
        }
      }
    }
  }

  .topTitles {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
<style lang="scss" scoped>
  .upload-demo {
    text-align: left;
  }

  .custom {
    .ap-cont-box-title-label {
      width: 100% !important;
    }
  }
</style>
