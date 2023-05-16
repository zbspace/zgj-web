<!--
* @Descripttion index.vue
* @FileName index.vue
* @Author walterXsk
* @module 
 * @LastEditTime: 2023-05-11
!-->
<template>
  <div class="flow-detail">
    <JyLabel label="审批流程" />

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
  </div>
</template>

<script setup>
  import { ref, nextTick, onBeforeMount } from 'vue'
  import sealApply from '@/api/frontDesk/printControl/sealApply'

  // const props = defineProps({

  // })
  const wrapStyle = ref({})
  const node = ref(null)

  const flowDetail = (modelId, definitionId) => {
    sealApply
      .flowDetail({
        modelId,
        definitionId,
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

  onBeforeMount(() => {
    flowDetail()
  })
</script>

<style lang="scss" scoped>
  .flow-detail {
    padding-top: 28px;
  }
</style>
