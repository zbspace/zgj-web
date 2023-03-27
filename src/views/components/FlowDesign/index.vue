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
  // 子组件
  const flowDesign = ref(null)
  const props = defineProps({
    // 处理类型
    type: {
      type: String,
      default: '0'
    },
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

  // 触发保存
  const handleSave = () => {
    return flowDesign.value.handleSave()
  }
  // 设置默认数据
  const handleSetData = json => {
    return flowDesign.value.handleSetData(json)
  }

  onMounted(() => {
    // 加载完成后回调
    // onMountedCallBack()
    flowDesign.value.handleSetData({})
  })
  // Loading
  const loading = ref(false)
  // 最近定义ID
  const definitionId = ref(props.initObj.definitionId || null)
  // isUpdate
  const isUpdate = ref(false)
  // 模型id
  const modelId = ref(props.initObj.modelId || null)
  /**
   * 流程设计升级版本
   */
  const designUpgrade = () => {
    loading.value = true
    const node = flowDesign.value.handleSave()

    if (node && modelId.value) {
      const params = {
        modelId: modelId.value,
        definitionId: definitionId.value,
        node
      }
      if (isUpdate.value) {
        // 修改
        ModelApi.updateDesignUpgrade(params).then(() => {
          loading.value = false
        })
      }
    } else {
      loading.value = false
    }
  }

  /**
   * 流程设计保存
   */
  const designSave = async () => {
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
      if (isUpdate.value) {
        // 修改
        loading.value = false
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
    handleSave,
    handleSetData,
    designSave
  })
</script>

<style scoped lang="scss">
  .contanier-flow {
    width: 90%;
    height: calc(100% - 80px);
    margin-top: 16px;
    .flow-designer .flow-designer-wrap {
      background-color: rgba($color: #000000, $alpha: 0);
    }
  }
</style>
