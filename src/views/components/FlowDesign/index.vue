<template>
  <div class="contanier-flow">
    <!-- <FlowHeader
      :update="isUpdate"
      @refresh="getDesign"
      @save="designSave"
      @upgrade="designUpgrade"
      style="background: #ffffff !important"
    /> -->
    <FlowDesign ref="flowDesign" top="100" v-bind="props.defaultAttribute" />
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import FlowDesign from '@/components/FlowDesign/index.vue'
  // import FlowHeader from '@/components/FlowDesign/manage/FlowHeader.vue'
  import { ModelApi } from '@/api/flow/ModelApi'
  import { useFlowStore } from '@/components/FlowDesign/store/flow'
  const flowStore = useFlowStore()
  // 子组件
  const flowDesign = ref(null)
  const props = defineProps({
    // 默认属性
    defaultAttribute: {
      type: Object,
      default: () => {
        return {}
      }
    },
    initObj: {
      type: Object,
      deftault: () => {
        return {}
      }
    }
  })

  // 设置默认数据
  const handleSetData = json => {
    return flowDesign.value.handleSetData(json)
  }

  onMounted(() => {
    flowStore.initFreeFlow(props.initObj.modelId, props.initObj.definitionId)
    flowDesign.value.handleSetData({})
  })
  // Loading
  const loading = ref(false)
  // 最近定义ID
  const definitionId = ref(props.initObj.definitionId || null)
  // 模型id
  const modelId = ref(props.initObj.modelId || null)

  /**
   * 流程设计保存
   */
  const designSave = async type => {
    loading.value = true
    const node = flowDesign.value.handleSave()
    if (!node || !modelId.value)
      return [
        {
          node: [
            {
              message: '请配置流程节点',
              fieldValue: '',
              field: 'node'
            }
          ]
        }
      ]
    if (!modelId.value)
      return [
        {
          modelId: [
            {
              message: '请先填写基础信息',
              fieldValue: '',
              field: 'modelId'
            }
          ]
        }
      ]
    if (node && modelId.value) {
      const params = {
        modelId: modelId.value,
        definitionId: definitionId.value,
        node
      }
      if (type !== 'designModel') {
        console.log('修改时的id', params.modelId, params.definitionId)
        // 修改
        ModelApi.updateDesignUpgrade(params).then(() => {
          loading.value = false
        })
      } else {
        // 新增
        const result = await ModelApi.saveDesign(params)
        if (result && result.success) return props.initObj
      }
    } else {
      loading.value = false
    }
  }

  defineExpose({
    handleSetData,
    designSave
  })
</script>

<style scoped lang="scss">
  .contanier-flow {
    // width: 90%;
    // height: calc(100% - 30px);
    // margin-top: 16px;
    margin: auto;
    width: calc(100vw - 160px);
    height: calc(100vh - 92px);
    min-height: 500px;
    min-width: 800px;
    margin-top: 16px;
    .flow-designer .flow-designer-wrap {
      background-color: rgba($color: #000000, $alpha: 0);
    }
  }
</style>
