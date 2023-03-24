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
  const layoutStore = useLayoutStore()
  document
    .getElementsByTagName('body')[0]
    .style.setProperty('--jy-primary-6', layoutStore.customColor)
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
