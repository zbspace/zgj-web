<template>
  <el-container class="layout-container">
    <el-header>
      <NavBar />
    </el-header>
    <el-container>
      <el-aside>
        <el-scrollbar height="calc(100vh - 64px)" style="background: #fff">
          <Menus />
        </el-scrollbar>
      </el-aside>
      <el-main>
        <!-- 子路由出口 -->
        <el-scrollbar height="calc(100vh - 82px)" class="layout-scrollbar">
          <router-view />
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
  import NavBar from '@/components/nav-bar'
  import Menus from '@/views/layout/menu/index.vue'
</script>
<style lang="scss" scoped>
  .layout-container {
    background-color: var(--background-color-1);
    .el-aside {
      width: auto;
    }
    :deep(.el-header) {
      background: #ffffff;
      box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.06);
      position: relative;
      z-index: 1;
      height: 64px;
    }
    :deep(.el-main) {
      padding: 16px;
      // padding: 16px 0 0 20px;
      // .layout-scrollbar {
      //   padding-right: 20px;
      // }
    }
  }
</style>
