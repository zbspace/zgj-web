<template>
  <div>
    <v-form-designer ref="vfDesigner" />
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  const vfDesigner = ref(null)
  /**
   * 获取json数据
   */
  const getFormJson = () => {
    return vfDesigner.value.getFormJson() || ''
  }

  defineExpose({
    getFormJson
  })
</script>

<style lang="scss"></style>
