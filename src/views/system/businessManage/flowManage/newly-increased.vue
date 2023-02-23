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
                <div class="process-save-down-text"> 5项不完善 </div>
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
        ></basicsInfo>
        <AssociationForm
          v-show="state.processTabs.checkedNode.index == '2'"
          ref="refAssociationForm"
        ></AssociationForm>
        <VFlowDesign
          v-show="state.processTabs.checkedNode.index == '3'"
          ref="refVFlowDesign"
          @onMountedCallBack="onMountedCallBack"
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
    nextTick,
    defineAsyncComponent
  } from 'vue'
  import layout from './layout.vue'
  import basicsInfo from './basics-info.vue'
  import AssociationForm from './Association-form.vue'
  // import VFlowDesign from '@/views/components/FlowDesign/index.vue'
  import advancedSetup from './advanced-setup.vue'
  import apiFlow from '@/api/system/flowManagement'

  import flowJson from '@/views/jyGunsJson/flow'
  const emit = defineEmits(['close', 'update:modelValue', 'clickCutTabs'])
  // 异步组件
  const VFlowDesign = defineAsyncComponent({
    loader: () => import('@/views/components/FlowDesign/index.vue')
    // // 加载异步组件时使用的组件
    // loadingComponent: LoadingComponent,
    // // 加载失败时使用的组件
    // errorComponent: ErrorComponent
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
  // 点击保存
  const clickSave = () => {
    console.log('--->点击保存')
    console.log('--->refVFlowDesign', refVFlowDesign.value.getValue())
    console.log('--->refBasicsInfo', refBasicsInfo.value.getFormValue())
    console.log(
      '--->refAssociationForm',
      refAssociationForm.value.getInfoValue()
    )
    // 发送api请求 保存流程设计
    apiFlowAdd().then(result => {
      console.log('--->', result)
    })
  }
  // 设置流程模板默认数据
  const handleSetData = () => {
    refVFlowDesign.value.handleSetData(flowJson)
  }
  // 切换tabs之前
  const beforeCutTabs = (data, item) => {
    if (item.index === '3') {
      const InfoValue = refAssociationForm.value.getInfoValue()
      console.log('--->', InfoValue)
      if (!InfoValue.SelectionForm) {
        state.JyElMessageBox.header.data = '提示？'
        state.JyElMessageBox.content.data = '请选择表单'
        state.JyElMessageBox.show = true
        return false
      }
    }
  }

  // 组件加载完成回调
  const onMountedCallBack = () => {
    // 设置流程模板默认数据
    handleSetData()
  }

  // 发送api请求 保存流程设计
  const apiFlowAdd = () => {
    return apiFlow
      .add({
        processName: '流程名称',
        applyTypeId: '业务类型',
        sealUseTypeId: '用印类型',
        fileTypeId: '文件类型',
        dataScope: [
          {
            scopeId: 'id',
            scopeName: '管理员',
            scopeType: 1
          }
        ],
        remark: '流程说明',
        formMessageId: '表单id',
        isTimeoutRemind: 1,
        remindDuration: 24,
        autoDistinct: 0
      })
      .then(result => {
        console.log(result)
        return result
      })
  }
  onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
    // 处理选项
    disCutTabs()
  })
  onMounted(() => {
    // console.log(`the component is now mounted.`)
  })
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
