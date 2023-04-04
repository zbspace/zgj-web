<template>
  <div class="app" id="app">
    <router-view v-slot="{ Component }">
      <keep-alive exclude="LoginAccount">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script setup>
  import { useLayoutStore } from '@/store/layout'
  import { TinyColor } from '@ctrl/tinycolor'
  const layoutStore = useLayoutStore()
  const value = layoutStore.customColor
  const color = new TinyColor(value)
  const activeBgColor = color.mix(color, 20).toString()
  layoutStore.customColor = value
  const hoverBgColor = color.tint(30).toString()
  const hoverBgColor1 = color.tint(90).toString()
  const node = document.getElementsByTagName('body')[0]
  node.style.setProperty('--jy-primary-6', value)
  node.style.setProperty('--jy-primary-5', hoverBgColor)
  node.style.setProperty('--jy-primary-1', hoverBgColor)
  node.style.setProperty('--jy-primary-9', hoverBgColor1)
  node.style.setProperty('--jy-primary-4', activeBgColor)
  node.style.setProperty('--jy-primary-2', hoverBgColor1)
  node.style.setProperty(
    '--jy-primary-11',
    color.isDark() || value === '#efb041' || value === '#D0963E'
      ? '#fff'
      : '#000'
  )
  node.style.setProperty('--jy-primary-3', value)
</script>

<script>
  export default {
    name: 'App'
  }
</script>

<style lang="scss">
  #nprogress .bar {
    background: var(--jy-primary-6) !important;
  }
</style>
