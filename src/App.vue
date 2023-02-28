<template>
  <div class="app" id="app">
    <router-view v-slot="{ Component }">
      <keep-alive exclude="LoginAccount">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>
