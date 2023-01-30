<template>
  <el-container class="layout-container">
    <el-aside class="left-aside"> <Asides /> </el-aside>
    <el-main>
      <el-container>
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
    </el-main>
  </el-container>
  <RightBar />
</template>

<script setup>
  import NavBar from '@/components/nav-bar'
  import Menus from '@/views/layout/Menu/index.vue'
  import Asides from '@/views/layout/Aside/index.vue'
  import RightBar from '@/components/right-bar'
</script>

<style lang="scss" scoped>
  .layout-container {
    background-color: var(--background-color-1);

    .left-aside {
      background: linear-gradient(
        180.03deg,
        #2a313d 5.3%,
        #35394f 42.55%,
        #29303a 97.47%
      );
      box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.06);
      width: 72px;
    }
    :deep(.el-header) {
      background: #ffffff;
      box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.06);
      position: relative;
      z-index: 1;
      height: 64px;
      #page-topbar {
        margin-left: 72px;
      }
    }
    :deep(.el-main) {
      padding: 0px;
      .el-aside {
        width: auto;
      }
    }
    :deep {
      .el-scrollbar__view {
        height: 100%;
      }
    }
  }
</style>
