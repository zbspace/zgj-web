<template>
  <div class="home-center">
    <Left />
    <Right />
  </div>
</template>

<script setup>
import Left from "./left"
import Right from "./right"
</script>

<style lang="scss" scoped>
.home-center {
  background-color: #fff;
  display: flex;
  margin-bottom: 24px;
}
</style>