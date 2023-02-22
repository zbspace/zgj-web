<template>
  <div class="contanier-flow">
    <FlowDesign ref="flowDesign" top="60" />
  </div>
</template>

<script setup>
  import { ref, onMounted, defineExpose, defineAsyncComponent } from 'vue'
  // import FlowDesign from '@/components/FlowDesign/index.vue'
  // 异步组件
  const FlowDesign = defineAsyncComponent({
    loader: () => import('@/components/FlowDesign/index.vue')
    // // 加载异步组件时使用的组件
    // loadingComponent: LoadingComponent,
    // // 加载失败时使用的组件
    // errorComponent: ErrorComponent
  })
  // 子组件
  const flowDesign = ref(null)
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
  onMounted(() => {
    // console.log('--->', 123);
  })
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
