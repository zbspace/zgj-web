<template>
  <el-container
    class="layout-container"
    :class="'layout-container-' + layoutStore.sidebarType"
  >
    <el-aside class="left-aside-div" v-if="layoutStore.sidebarType === '2'">
      <Asides />
    </el-aside>
    <el-main>
      <el-container>
        <el-header>
          <NavBar />
        </el-header>
        <el-container>
          <el-aside
            :style="
              (menusInfoStore.tempMenus && !menusInfoStore.tempMenus.length) ||
              (!menusInfoStore.menus.length && !menusInfoStore.tempMenus)
                ? 'width: 0'
                : ''
            "
          >
            <el-scrollbar height="calc(100vh - 64px)" style="background: #fff">
              <Menus />
            </el-scrollbar>
          </el-aside>
          <el-main>
            <!-- 子路由出口 -->
            <el-scrollbar
              height="calc(100vh - 64px)"
              class="layout-scrollbar"
              ref="contentRef"
            >
              <router-view />
            </el-scrollbar>
          </el-main>
        </el-container>
      </el-container>
    </el-main>
  </el-container>
  <RightBar />
  <JyBackTop @on-scrollToTop="scrollToTop" />
</template>

<script setup>
  import NavBar from '@/components/nav-bar'
  import Menus from '@/views/layout/Menu/index.vue'
  import Asides from '@/views/layout/Aside/index.vue'
  // import RightBar from '@/components/right-bar'
  import RightBar from './RightBar'
  import { useLayoutStore } from '@/store/layout'
  import { useMenusInfoStore } from '@/store/menus'
  import { ref } from 'vue'

  const layoutStore = useLayoutStore()
  const menusInfoStore = useMenusInfoStore()

  const contentRef = ref(null)

  const scrollToTop = () => {
    contentRef.value.setScrollTop(0)
  }
</script>

<style lang="scss" scoped>
  .layout-container {
    background-color: var(--background-color-1);

    :deep(.el-header) {
      background: #ffffff;
      box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.06);
      position: relative;
      z-index: 1;
      height: 64px;
    }
    :deep {
      .el-scrollbar__view {
        height: 100%;
      }
    }
  }
  .layout-container-1 {
    :deep(.el-main) {
      padding: 0px;
      .el-aside {
        transition: all 0.3s;
        width: auto;
      }
    }
  }
  .layout-container-2 {
    .left-aside-div {
      background: linear-gradient(
        180.03deg,
        #2a313d 5.3%,
        #35394f 42.55%,
        #29303a 97.47%
      );
      box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.06);
      width: 72px;
    }
    :deep(.el-main) {
      padding: 0px;
      .el-aside {
        transition: all 0.3s;
        width: 216px;
      }
    }
    :deep(.el-header) {
      #page-topbar {
        margin-left: 72px;
      }
    }
  }
</style>
