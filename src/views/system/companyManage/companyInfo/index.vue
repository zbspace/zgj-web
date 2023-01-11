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
    border-radius: 4px;
  }
</style>
