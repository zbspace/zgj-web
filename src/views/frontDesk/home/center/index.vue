<template>
  <div class="home-center">
    <Left />
    <Right />
  </div>
</template>

<script setup>
  import Left from './left'
  import Right from './right'
</script>

<style lang="scss" scoped>
  .home-center {
    background-color: #fff;
    display: flex;
    margin: 0 auto 24px;
    width: calc(100% - 40px);
  }
</style>
