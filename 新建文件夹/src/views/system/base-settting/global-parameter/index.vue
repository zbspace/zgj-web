<template>
  <div>
    <componentsLayout Layout="title,tabs">
      <template #title>
        <div class="title">全局参数设置</div>
      </template>

      <template #tabs>
        <div>
          <componentsTabs activeName="1" :data="state.componentsTabs.data" @tab-change="tabChange">
          </componentsTabs>
        </div>
      </template>

      <keep-alive>
        <component :is="current" />
      </keep-alive>

    </componentsLayout>
  </div>
</template>

<script setup>
import { reactive, shallowRef } from "vue";
import componentsLayout from "@/views/components/Layout.vue";
import componentsTabs from "@/views/components/tabs.vue"
import ExportTemplate from './export-template'
import File from './file'
import SmartTerminal from './smart-terminal'
import SmartUse from './smart-use'
import System from './system'
const current = shallowRef(SmartUse)
const state = reactive({
  componentsTabs: {
    data: [
      {
        label: '智能用印设置',
        name: '1',
      },
      {
        label: '文件设置',
        name: '2',
      },
      {
        label: '智能终端设置',
        name: '3',
      },
      {
        label: '导出模板设置',
        name: '4',
      },
      {
        label: '系统设置',
        name: '5',
      },
    ]
  },
})
const map = {
  '1': SmartTerminal,
  '2': File,
  '3': SmartTerminal,
  '4': ExportTemplate,
  '5': System,
}

function tabChange(value) {
  current.value = map[value]
}

</script>

<style lang="scss" scoped>

</style>
