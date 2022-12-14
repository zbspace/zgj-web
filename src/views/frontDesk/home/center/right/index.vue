<template>
  <div class="home-center-right">
    <div class="title">
      <p>用印统计</p>
      <div>
        <span>全部</span>
        <span>一个月</span>
        <span>六个月</span>
        <span>一年</span>
      </div>
    </div>
    <jy-echarts />
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.home-center-right {
  width: 448px;

  p {
    margin-bottom: 0;
  }

  .title {
    display: flex;
    justify-content: space-between;
    padding: 3px 16px;

    p {
      font-size: 16px;
    }

    span {
      color: #878a99;
      background-color: rgba(135, 138, 153, 0.1);
      border-color: transparent;
      cursor: pointer;
      padding: 4px 8px;

      &:hover {
        background-color: #fff;
      }
    }
  }
}
</style>