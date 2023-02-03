<template>
  <div class="system-home">
    <componentsLayout
      :style="{
        padding: '16px'
      }"
      :free="true"
    >
      <div class="content">
        <Top />
        <Equipment />
        <Appreciation />
        <UseSealStatistical />
        <DailyUseSeal />
        <FileAddTrend />
      </div>
    </componentsLayout>
  </div>
</template>

<script setup>
  import Top from './Top'
  import Equipment from './Equipment'
  import Appreciation from './Appreciation'
  import UseSealStatistical from './UseSealStatistical'
  import DailyUseSeal from './DailyUseSeal'
  import FileAddTrend from './FileAddTrend'
  import componentsLayout from '@/views/components/Layout.vue'
</script>

<style lang="scss" scoped>
  .system-home {
  }
</style>
