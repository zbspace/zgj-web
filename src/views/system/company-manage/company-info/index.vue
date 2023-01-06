<template>
  <div class="comp-info">
    <Top />
    <Center />
    <Bottom />
  </div>
</template>

<script setup>
  import Top from './top'
  import Center from './center'
  import Bottom from './bottom'
</script>

<script>
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'CompanyName'
  })
</script>

<style lang="scss" scoped>
  .comp-info {
    height: calc(100vh - 100px);
    overflow-y: auto;
    margin: 24px 0;
    border-radius: 4px;
  }
</style>
