<template>
  <div class="flowManage-newly-increased">
    <layout
      @clickCutTabs="clickCutTabs"
      :tabsData="state.processTabs.data"
      @close="clickClose"
    >
      <template #backTitle>
        <span class="process-back-text">新增</span>
      </template>
      <template #subTitle>
        <el-button class="process-save-but" type="primary"> 保存 </el-button>
      </template>
      <template #content>
        <basicsInfo
          v-if="state.processTabs.checkedNode.index == '1'"
        ></basicsInfo>
        <AssociationForm
          v-if="state.processTabs.checkedNode.index == '2'"
        ></AssociationForm>
        <VFlowDesign
          v-if="state.processTabs.checkedNode.index == '3'"
        ></VFlowDesign>
        <advancedSetup
          v-if="state.processTabs.checkedNode.index == '4'"
        ></advancedSetup>
      </template>
    </layout>
  </div>
</template>
<script setup>
  import { reactive, onBeforeMount, onMounted } from 'vue'
  import layout from './layout.vue'
  import basicsInfo from './basics-info.vue'
  import AssociationForm from './Association-form.vue'
  import VFlowDesign from './flow-design.vue'
  import advancedSetup from './advanced-setup.vue'
  const emit = defineEmits(['close', 'update:modelValue', 'clickCutTabs'])
  const state = reactive({
    processTabs: {
      checkedNode: {},
      data: [
        {
          index: '1',
          label: '基础信息'
        },
        {
          index: '2',
          label: '关联表单',
          checked: true
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
    }
  })
  // 点击切换选项
  function clickCutTabs(data, item) {
    data.forEach(element => {
      element.checked = false
    })
    item.checked = true
    // 处理选项
    disCutTabs()
  }
  // 处理选项
  function disCutTabs() {
    state.processTabs.data.forEach(item => {
      if (item.checked) {
        state.processTabs.checkedNode = item
      }
    })
  }
  // 点击关闭弹框
  function clickClose() {
    emit('close')
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
  }
</style>
