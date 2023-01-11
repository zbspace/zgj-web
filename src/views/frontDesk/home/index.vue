<template>
  <div class="frontdesk-home">
    <div class="top-bg" />
    <div class="content">
      <Top />
      <Center />
      <Bottom />
    </div>
  </div>
</template>
<script setup>
  import Top from './top'
  import Center from './center'
  import Bottom from './bottom'
</script>
<style lang="scss" scoped>
  .frontdesk-home {
    // height: calc(100vh - 100px);
    // overflow-y: auto;
    // margin-top: 24px;
    border-radius: 5px;
    position: relative;
    z-index: 0;

    .top-bg {
      position: absolute;
      z-index: 0;
      width: 100%;
      height: 335px;
      filter: blur(100px);
      background: url('../../../assets/svg/home/top-bg.svg') no-repeat;
      background-size: 100% 335px;
    }

    .content {
      position: relative;
      z-index: 1;
    }
  }
</style>
