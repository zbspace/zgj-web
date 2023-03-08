<template>
  <div>
    <JySelectSeal v-model="visible" />
    <!-- <JyVform /> -->
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  const visible = ref(true)
</script>

<style lang="scss" scoped></style>
