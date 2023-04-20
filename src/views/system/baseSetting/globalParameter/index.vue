<template>
  <componentsLayout
    :style="{
      padding: '16px 24px'
    }"
    :free="true"
  >
    <div class="components-Layout1">
      <!-- title -->
      <div class="ap-box-title">全局参数设置</div>

      <!-- tabs -->
      <div style="padding-left: 20px">
        <VTabs
          :active="currentValue"
          :label="tabsLabel"
          @update:active="currentValue = $event"
          :border="false"
        ></VTabs>
      </div>
      <keep-alive>
        <component :is="map[currentValue]" />
      </keep-alive>
    </div>
  </componentsLayout>
</template>

<script setup>
  import { ref } from 'vue'
  import VTabs from '@/components/common/JyTabs.vue'
  import ExportTemplate from './export-template'
  import File from './file'
  import SmartTerminal from './smart-terminal'
  import SmartUse from './smart-use'
  import System from './system'
  import componentsLayout from '@/views/components/Layout.vue'

  const currentValue = ref('1')
  const tabsLabel = ref([
    {
      name: 't-smart-use-seal-setting',
      value: '1'
    },
    {
      name: 't-file-setting',
      value: '2'
    },
    {
      name: 't-smart-terminal-setting',
      value: '3'
    },
    {
      name: 't-zgj-F_SYS_UNIT_EXPORT_TEMPLATE_SETTING',
      value: '4'
    }
  ])
  const map = {
    1: SmartUse,
    2: File,
    3: SmartTerminal,
    4: ExportTemplate,
    5: System
  }
</script>

<style lang="scss" scoped>
  .components-Layout1 {
    margin: 0%;
    width: 100%;
    height: 100%;

    display: flex;
    // flex-flow: wrap;
    align-content: flex-start;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    @include mixin-padding-top(10);
    @include mixin-padding-right(0);
    background: #fff;
    position: relative;
  }
  .ap-box-title {
    width: 100%;
    padding: 0rem 0 0.5rem 0;
    @include mixin-padding-left(20);
    box-sizing: border-box;
    font-size: var(--jy-font-size-title-2);
    @include mixin-padding-right(20);
    box-sizing: border-box;
  }
</style>
