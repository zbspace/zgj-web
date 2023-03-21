<!--
* @Descripttion 新建流程
* @FileName newly-increased.vue
* @Author WalterXsk
* @LastEditTime 2023-03-16 16:17:37
!-->
<template>
  <div class="flowManage-newly-increased">
    <layout
      @clickCutTabs="clickCutTabs"
      :tabsData="state.processTabs.data"
      @close="clickClose"
      :beforeCutTabs="beforeCutTabs"
    >
      <template #backTitle>
        <span class="process-back-text">新增</span>
      </template>
      <template #subTitle>
        <div class="process-save">
          <div class="process-save-down">
            <el-popover placement="bottom" :width="400" trigger="click">
              <template #reference>
                <div
                  class="process-save-down-text"
                  v-show="errorInfo.length !== 0"
                >
                  {{ errorInfo.length }}项不完善
                </div>
              </template>
              <div class="popover-cont">
                <div class="popover-cont-title">内容不完善，当前无法发布</div>
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
          <el-button class="process-save-but" type="primary" @click="clickSave">
            保存
          </el-button>
        </div>
      </template>
      <template #content>
        <basicsInfo
          v-show="state.processTabs.checkedNode.index == '1'"
          ref="refBasicsInfo"
          :businessList="props.businessList"
        ></basicsInfo>
        <AssociationForm
          :getModelValue="getModelValue"
          @update:getModelValue="getModelValue = $event"
          :businessList="props.businessList"
          v-show="state.processTabs.checkedNode.index == '2'"
          ref="refAssociationForm"
        ></AssociationForm>
        <VFlowDesign
          v-show="state.processTabs.checkedNode.index == '3'"
          v-if="getModelValue"
          ref="refVFlowDesign"
          :initObj="getModelValue"
        ></VFlowDesign>
        <advancedSetup
          v-show="state.processTabs.checkedNode.index == '4'"
          ref="refAdvancedSetup"
        ></advancedSetup>
      </template>
    </layout>
    <JyElMessageBox
      v-model="state.JyElMessageBox.show"
      :show="state.JyElMessageBox.show"
      :defaultAttribute="{}"
    >
      <template #header>
        {{ state.JyElMessageBox.header.data }}
      </template>
      <template #content>
        {{ state.JyElMessageBox.content.data }}
      </template>
    </JyElMessageBox>
  </div>
</template>
<script setup>
  import {
    ref,
    reactive,
    onBeforeMount,
    onMounted,
    defineAsyncComponent,
    watch
  } from 'vue'
  import layout from './layout.vue'
  import basicsInfo from './BasicsInfo.vue'
  import AssociationForm from './AssociationForm.vue'
  // import VFlowDesign from '@/views/components/FlowDesign/index.vue'
  import advancedSetup from './AdvancedSetup.vue'
  import apiFlow from '@/api/system/flowManagement'
  import { useFlowStore } from '@/components/FlowDesign/store/flow'
  // Store
  const flowStore = useFlowStore()
  // import { ModelApi } from '@/api/flow/ModelApi'
  const emit = defineEmits(['close', 'update:modelValue'])
  // 异步组件
  const VFlowDesign = defineAsyncComponent({
    loader: () => import('@/views/components/FlowDesign/index.vue')
  })
  const props = defineProps({
    businessList: {
      type: Array,
      default: () => {
        return [] // ['table', 'rate', 'switch'] 自定义组件的type
      }
    }
  })
  const refVFlowDesign = ref(null)
  const refAssociationForm = ref(null)
  const refBasicsInfo = ref(null)
  const refAdvancedSetup = ref(null)
  const state = reactive({
    processTabs: {
      checkedNode: {},
      data: [
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
    },
    JyElMessageBox: {
      show: false,
      header: {
        data: ''
      },
      content: {
        data: ''
      }
    }
  })
  // 点击切换选项
  const clickCutTabs = (data, item) => {
    data.forEach(element => {
      element.checked = false
    })
    item.checked = true
    // 处理选项
    disCutTabs()
  }
  // 处理选项
  const disCutTabs = () => {
    state.processTabs.data.forEach(item => {
      if (item.checked) {
        state.processTabs.checkedNode = item
      }
    })
  }
  // 点击关闭弹框
  const clickClose = () => {
    emit('close')
  }
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

  // 切换tabs之前
  const beforeCutTabs = (data, item) => {
    if (item.index === '3' && !getModelValue.value) {
      state.JyElMessageBox.header.data = '提示？'
      state.JyElMessageBox.content.data = '请填写完整信息'
      state.JyElMessageBox.show = true
      return false
    }
  }

  onBeforeMount(() => {
    // 处理选项
    disCutTabs()
  })
  onMounted(() => {})

  const getModelValue = ref(null)
  watch(
    () => getModelValue.value,
    val => {
      if (!val) return
      state.processTabs.checkedNode = {
        index: '3',
        label: '流程设计'
      }
      state.processTabs.data.forEach(item => {
        item.checked = false
        if (item.index === '3') {
          item.checked = true
        }
      })
      flowStore.setModelId(
        getModelValue.value.modelId,
        getModelValue.value.definitionId
      )
    }
  )
</script>
<style lang="scss" scoped>
  .flowManage-newly-increased {
    margin: 0%;
    width: 100%;
    height: 100%;
    .process-save {
      width: 100%;
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
