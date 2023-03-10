<template>
  <componentsLayout
    :style="{
      padding: '16px'
    }"
    :free="true"
  >
    <div class="comp-info">
      <Top />
      <Centers />
      <Bottom />
    </div>
  </componentsLayout>
</template>

<script setup>
  import Top from './top'
  import Centers from './center'
  import Bottom from './bottom'
  import componentsLayout from '@/views/components/Layout.vue'
</script>

<script>
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'CompanyName'
  })
</script>

<script></script>

<style lang="scss" scoped>
  .comp-info {
    border-radius: 4px;
  }
</style>
