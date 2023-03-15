<template>
  <div class="contanier-flow">
    <FlowHeader
      :update="isUpdate"
      @back="back"
      @refresh="getDesign"
      @save="designSave"
      @upgrade="designUpgrade"
    />
    <FlowDesign ref="flowDesign" top="100" v-bind="props.defaultAttribute" />
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import FlowDesign from '@/components/FlowDesign/index.vue'
  import FlowHeader from '@/components/FlowDesign/manage/FlowHeader.vue'
  import { ModelApi } from '@/api/flow/ModelApi'
  import { useRouter } from 'vue-router'
  const router = useRouter()
  // 子组件
  const flowDesign = ref(null)
  const emit = defineEmits(['onMountedCallBack'])
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
  // 获取 模板json
  const getValue = () => {
    // console.log('--->', 456)
    return flowDesign.value.getValue()
  }
  // 加载完成后回调
  const onMountedCallBack = () => {
    emit('onMountedCallBack')
  }
  onMounted(() => {
    // 加载完成后回调
    onMountedCallBack()
    flowDesign.value.handleSetData({})

    // 测试
    // const random = Math.random()
    // ModelApi.add({ modelKey: random }).then(() => {
    //   ModelApi.getModelKey({
    //     modelKey: random
    //   })
    // })
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
          back()
        })
      }
    } else {
      loading.value = false
    }
  }

  /**
   * 流程设计保存
   */
  const designSave = () => {
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
        loading.value = false
      } else {
        // 新增
        ModelApi.saveDesign(params).then(() => {
          loading.value = false

          back()
        })
      }
    } else {
      loading.value = false
    }
  }
  const back = () => {
    router.go(-1)
  }
  defineExpose({
    handleSave,
    handleSetData,
    getValue
  })
</script>

<style scoped lang="scss">
  .contanier-flow {
    width: 100%;
    height: 100%;
    .flow-designer .flow-designer-wrap {
      background-color: rgba($color: #000000, $alpha: 0);
    }
  }
</style>
