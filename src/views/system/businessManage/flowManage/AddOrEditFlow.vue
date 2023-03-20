<template>
  <div class="add-flow-modal">
    <AntModalBox
      v-model="show"
      :custom-content="true"
      :defaultAttribute="{
        fullscreen: true,
        height: '100%'
      }"
    >
      <div class="flowManage-layout">
        <div class="process">
          <div class="header">
            <div class="process-back">
              <i class="iconpark" @click="clickClose">
                <svg class="iconpark-icon">
                  <use href="#Vector8Stroke"></use>
                </svg>
              </i>
              <span class="process-back-text">
                {{ $t('t-zgj-sync.add') }}
              </span>
            </div>
            <div class="process-tabs">
              <div
                class="tabs"
                v-for="(item, index) in state.tabsData"
                :key="index"
                :class="{
                  'checked-tabs': item.checked ? true : false
                }"
                @click="changeTabs(item)"
              >
                <div class="tabs-icon">{{ item.index }}</div>
                <div class="tabs-text">{{ item.label }}</div>
              </div>
            </div>
            <div class="process-save">
              <div class="process-save-down">
                <el-popover placement="bottom" :width="400" trigger="click">
                  <template #reference>
                    <div class="process-save-down-text"> 0项不完善 </div>
                  </template>
                  <div class="popover-cont">
                    <div class="popover-cont-title">
                      内容不完善，当前无法发布
                    </div>
                    <div class="popover-cont-subTitle">
                      以下内容不完善，请修改后发布
                    </div>
                    <div class="popover-cont-list">
                      <div class="popover-cont-list-li" v-for="n in 6" :key="n">
                        <div class="popover-cont-list-li-name">基础信息</div>
                        <div class="popover-cont-list-li-desc">
                          流程名称不能为空
                        </div>
                        <div class="popover-cont-list-li-but">去修改 </div>
                      </div>
                    </div>
                  </div>
                </el-popover>
              </div>
              <el-button
                class="process-save-but"
                type="primary"
                @click="clickSave"
              >
                {{ $t('t-zgj-Save') }}
              </el-button>
            </div>
          </div>
          <div class="content">
            <BasicsInfo
              v-show="state.checkedIndex == '1'"
              ref="refBasicsInfo"
              :businessList="props.businessList"
            ></BasicsInfo>
            <AssociationForm
              :getModelValue="getModelValue"
              @update:getModelValue="getModelValue = $event"
              :businessList="props.businessList"
              v-show="state.checkedIndex == '2'"
              ref="refAssociationForm"
            ></AssociationForm>
            <VFlowDesign
              v-show="state.checkedIndex == '3'"
              v-if="getModelValue"
              ref="refVFlowDesign"
              :initObj="getModelValue"
            ></VFlowDesign>
            <AdvancedSetup
              v-show="state.checkedIndex == '4'"
              ref="refAdvancedSetup"
            ></AdvancedSetup>
          </div>
        </div>
      </div>
    </AntModalBox>
  </div>
</template>

<script setup>
  import BasicsInfo from './BasicsInfo.vue'
  import AssociationForm from './AssociationForm.vue'
  import AdvancedSetup from './AdvancedSetup.vue'
  import AntModalBox from '@/views/components/modules/AntModalBox.vue'
  import { reactive, computed, defineAsyncComponent, ref } from 'vue'
  import apiFlow from '@/api/system/flowManagement'
  import { useFlowStore } from '@/components/FlowDesign/store/flow'
  const flowStore = useFlowStore()
  // 异步组件
  const VFlowDesign = defineAsyncComponent({
    loader: () => import('@/views/components/FlowDesign/index.vue')
  })
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    }
  })
  const emits = defineEmits('update:modelValue')
  const state = reactive({
    checkedIndex: '1',
    tabsData: [
      {
        index: '1',
        label: '基础信息',
        checked: true
      },
      {
        index: '2',
        label: '关联表单'
      },
      {
        index: '3',
        label: '流程设计'
      },
      {
        index: '4',
        label: '高级设置'
      }
    ]
  })

  const show = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      emits('update:modelValue', value)
    }
  })

  const clickClose = () => {
    show.value = false
  }

  const changeTabs = attr => {
    state.tabsData.forEach(item => {
      item.checked = false
      if (item.index === attr.index) {
        item.checked = true
        state.checkedIndex = item.index
      }
    })
  }
  const refVFlowDesign = ref(null)
  const refAssociationForm = ref(null)
  const refBasicsInfo = ref(null)
  const refAdvancedSetup = ref(null)
  const errorInfo = ref([])
  // 点击保存
  const clickSave = async () => {
    errorInfo.value = []
    if (!refVFlowDesign.value)
      return {
        // 提示信息
      }
    const basicsResult = await refBasicsInfo.value.getBasicsFormValue()
    if (Array.isArray(basicsResult)) {
      errorInfo.value = errorInfo.value.concat(basicsResult)
    }
    const associationResult =
      await refAssociationForm.value.getAssociationValue()

    if (Array.isArray(associationResult)) {
      errorInfo.value = errorInfo.value.concat(associationResult)
    }
    const designResult = await refVFlowDesign.value.designSave()
    if (Array.isArray(designResult)) {
      errorInfo.value = errorInfo.value.concat(designResult)
    }
    console.log(errorInfo.value.length, '错误信息', errorInfo.value)
    if (errorInfo.value.length > 0) return

    const params = {
      ...basicsResult,
      ...associationResult,
      ...designResult
    }
    // 保存流程设计
    apiFlow.add(params).then(() => {
      clickClose()
    })
  }
</script>

<style scoped lang="scss">
  .flowManage-layout {
    margin: 0%;
    width: 100%;
    height: 100%;
    .process {
      width: 100%;
      height: 100%;
      .header {
        position: relative;
        z-index: 1;
        display: flex;
        height: 4rem;
        align-items: center;
        padding: 0% 1rem;
        box-sizing: border-box;
        box-shadow: 0px 3px 6px -4px rgba(0, 0, 0, 0.12),
          0px 6px 16px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05);
        background-color: #ffffff;
        justify-content: space-between;
        .process-back {
          color: rgba(0, 0, 0, 0.85);
          display: flex;
          align-items: center;
          min-width: 110px;
          font-size: 22px;
          .iconpark {
            width: 1.5rem;
            height: 1.5rem;
            display: flex;
            align-items: center;
            margin-right: 0.5rem;
            cursor: pointer;
            .iconpark-icon {
              width: 1.2rem;
              height: 1.2rem;
            }
          }
          .process-back-text {
            font-size: 22px;
            // cursor: pointer;
          }
        }
        .process-tabs {
          display: flex;
          height: 100%;
          min-width: 600px;
          flex: 1;
          justify-content: center;
          .tabs {
            display: flex;
            align-items: center;
            color: rgba(0, 0, 0, 0.45);
            margin: 0% 4%;
            box-sizing: border-box;
            height: 100%;
            cursor: pointer;
            border-bottom: 2px solid rgba(0, 0, 0, 0);
            .tabs-icon {
              width: 1.2rem;
              height: 1.2rem;
              border-radius: 50%;
              border: 1px solid rgba(0, 0, 0, 0.15);
              display: flex;
              align-items: center;
              justify-content: center;
              margin-right: 0.5rem;
            }
            .tabs-text {
              font-size: 16px;
            }
          }
          .checked-tabs {
            border-bottom: 2px solid #d0963e;
            .tabs-icon {
              background-color: #d0963e;
              border: 1px solid #d0963e;
              color: #ffffff;
            }
            .tabs-text {
              color: #d0963e;
            }
          }
        }
        .process-save {
          min-width: 200px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          .process-save-down {
            margin-right: 0.5rem;
            .process-save-down-text {
              color: var(--jy-danger-6);
              cursor: pointer;
            }
          }
        }
      }
      .content {
        width: 100%;
        height: calc(100% - 4rem);
        background-color: #f2f2f2;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        position: relative;
        z-index: 0;
      }
    }
  }

  .popover-cont {
    padding: 0.5rem;
    color: var(--jy-color-text-1);
    .popover-cont-title {
      font-size: var(--jy-font-size-title-1);
    }
    .popover-cont-subTitle {
      color: var(--jy-color-text-3);
      margin-top: 0.8rem;
    }
    .popover-cont-list {
      margin-top: 0.2rem;
      .popover-cont-list-li {
        display: flex;
        align-items: center;
        background: rgba(0, 0, 0, 0.04);
        justify-content: space-between;
        padding: 0.8rem 1rem;
        margin: 0rem 0rem 0.5rem 0rem;
        .popover-cont-list-li-name {
          width: 4rem;
        }
        .popover-cont-list-li-desc {
          color: var(--jy-color-text-3);
          width: calc(100% - 7rem);
          padding: 0% 0.5rem;
        }
        .popover-cont-list-li-but {
          color: var(--jy-info-6);
          width: 3rem;
          cursor: pointer;
        }
      }
    }
  }
</style>
