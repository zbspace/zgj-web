<template>
  <el-drawer
    class="right-bar"
    v-model="layoutStore.rightBarVisible"
    direction="rtl"
    size="400"
  >
    <template #header>
      <span>主题定制器</span>
    </template>

    <template #default>
      <div>
        <p class="label">整体风格设置</p>
        <p class="label-normal">选择浅色或深色方案</p>
        <div class="select-img">
          <div
            @click="layoutStore.themeType = 'light'"
            :class="layoutStore.themeType === 'light' ? 'active' : ''"
          >
            <img src="@/assets/svg/rightbar/lightColor.svg" alt="" />
          </div>
          <div
            @click="messageWarning('敬请期待')"
            :class="layoutStore.themeType === 'dark' ? 'active' : ''"
          >
            <img src="@/assets/svg/rightbar/darkColor.svg" alt="" />
          </div>
        </div>
      </div>

      <div>
        <p class="label">主题色</p>
        <div class="theme-color-list">
          <span class="color-1"></span>
          <span class="color-2"></span>
          <span class="color-3"></span>
          <span class="color-4"></span>
          <span class="color-5"></span>
          <span class="color-6"></span>
          <span class="color-7"></span>
          <span class="color-8"></span>
        </div>

        <div class="custom-color">
          <span>自定义</span>
          <div>
            <span></span>
          </div>
          <span>#D0963E</span>
        </div>
      </div>

      <div>
        <p class="label">顶栏颜色</p>
        <p class="label-normal">选择浅色或深色顶栏颜色</p>
        <div class="select-img">
          <div
            @click="layoutStore.topbar = 'light'"
            :class="layoutStore.topbar === 'light' ? 'active' : ''"
          >
            <img src="@/assets/svg/rightbar/lightColor.svg" alt="" />
          </div>
          <div
            @click="layoutStore.topbar = 'dark'"
            :class="layoutStore.topbar === 'dark' ? 'active' : ''"
          >
            <img src="@/assets/svg/rightbar/topDarkColor.svg" alt="" />
          </div>
        </div>
      </div>

      <div>
        <p class="label">侧边栏大小</p>
        <p class="label-normal">选择侧边栏的大小</p>
        <div class="select-img">
          <div
            @click="layoutStore.isCollapse = false"
            :class="!layoutStore.isCollapse ? 'active' : ''"
          >
            <img src="@/assets/svg/rightbar/lightColor.svg" alt="" />
          </div>
          <div
            @click="layoutStore.isCollapse = true"
            :class="layoutStore.isCollapse ? 'active' : ''"
          >
            <img src="@/assets/svg/rightbar/small.svg" alt="" />
          </div>
        </div>
      </div>

      <div>
        <p class="label">侧边栏视图</p>
        <p class="label-normal">选择默认或分离的侧边栏视图</p>

        <div class="select-img">
          <div
            @click="sidebarTypeChange('1')"
            :class="layoutStore.sidebarType === '1' ? 'active' : ''"
          >
            <img src="@/assets/svg/rightbar/lightColor.svg" alt="" />
          </div>
          <div
            @click="sidebarTypeChange('2')"
            :class="layoutStore.sidebarType === '2' ? 'active' : ''"
          >
            <img src="@/assets/svg/rightbar/combination.svg" alt="" />
          </div>
        </div>
      </div>

      <div>
        <p class="label">侧边栏颜色</p>
        <p class="label-normal">选择侧边栏的颜色</p>

        <div class="select-img">
          <div
            @click="layoutStore.menuColor = 'light'"
            :class="layoutStore.menuColor === 'light' ? 'active' : ''"
          >
            <img src="@/assets/svg/rightbar/lightColor.svg" alt="" />
          </div>
          <div
            @click="layoutStore.menuColor = 'dark'"
            :class="layoutStore.menuColor === 'dark' ? 'active' : ''"
          >
            <img src="@/assets/svg/rightbar/menuDark.svg" alt="" />
          </div>
        </div>
      </div>
    </template>

    <template #footer>
      <el-button @click="reset">重置</el-button>
    </template>
  </el-drawer>
</template>

<script setup>
  import { messageWarning } from '@/hooks/useMessage'
  import { useLayoutStore } from '@/store/layout'
  import { useMenusInfoStore } from '@/store/menus'
  import { business } from '../Menu/business'
  import { system } from '../menu/system'

  const layoutStore = useLayoutStore()
  const menusInfoStore = useMenusInfoStore()

  const reset = () => {
    layoutStore.reset()
    // layoutStore.setThemeType()
    // layoutStore.changeTopbar()
    // layoutStore.setSidebarType()
  }

  const sidebarTypeChange = value => {
    layoutStore.sidebarType = value
    if (layoutStore.sidebarType === '1') {
      const menus =
        menusInfoStore.currentType === 'business' ? business : system
      menusInfoStore.setMenus(menus)
    }
  }
</script>

<style lang="scss">
  .right-bar {
    .el-drawer__header {
      background-color: #d0963e;
      height: 50px;
      display: flex;
      align-items: center;
      padding: 0 20px;
      margin-bottom: 0;

      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      color: #ffffff;
    }
    .el-drawer__body {
      padding: 40px 20px;
      .label {
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        color: rgba(0, 0, 0, 0.85);
        margin-bottom: 4px;
      }
      .label-normal {
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        color: rgba(0, 0, 0, 0.45);
        margin-bottom: 12px;
      }
      .select-img {
        display: flex;
        margin-bottom: 40px;
        div {
          margin-right: 12px;
          cursor: pointer;
          border: 1px solid rgba(0, 0, 0, 0.02);
          border-radius: 4px;
          width: 114px;
          height: 76px;
          img {
            width: 112px;
            height: 74px;
          }
        }
        .active {
          border-color: var(--jy-primary-6);
        }
      }
      .theme-color-list {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        margin-bottom: 12px;
        span {
          width: 26px;
          height: 26px;
          background: #448ef7;
          border-radius: 2px;
          cursor: pointer;
        }
        .color-1 {
          background-color: #448ef7;
        }
        .color-2 {
          background-color: #e13c39;
        }
        .color-3 {
          background-color: #e76033;
        }
        .color-4 {
          background-color: #efb041;
        }
        .color-5 {
          background-color: #5abfc1;
        }
        .color-6 {
          background-color: #72c240;
        }
        .color-7 {
          background-color: #3853e2;
        }
        .color-8 {
          background-color: #6a32c9;
        }
      }
      .custom-color {
        display: flex;
        align-items: center;
        margin-bottom: 40px;
        span {
          font-weight: 400;
          font-size: 14px;
          line-height: 22px;
          color: #000000;
        }
        div {
          width: 86px;
          height: 26px;
          left: 54px;
          top: 0px;
          border: 1px solid rgba(0, 0, 0, 0.15);
          border-radius: 2px;
          margin: 0 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          span {
            display: inline-block;
            width: 78px;
            height: 18px;
            left: 58px;
            top: 4px;
            background: #d0963e;
            border-radius: 2px;
          }
        }
      }
    }
  }
</style>
