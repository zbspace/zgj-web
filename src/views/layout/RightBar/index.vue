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
        <p>配色方案</p>
        <p>选择浅色或深色方案</p>
        <el-radio-group v-model="layoutStore.themeType" class="ml-4">
          <el-radio label="light" size="large">浅色</el-radio>
          <el-radio label="dark" size="large">深色</el-radio>
        </el-radio-group>
      </div>

      <div>
        <p>顶栏颜色</p>
        <p>选择浅色或深色顶栏颜色</p>
        <el-radio-group v-model="layoutStore.topbar" class="ml-4">
          <el-radio label="light" size="large">浅色</el-radio>
          <el-radio label="dark" size="large">深色</el-radio>
        </el-radio-group>
      </div>

      <div>
        <p>侧边栏视图</p>
        <p>选择默认或分离的侧边栏视图</p>
        <el-radio-group
          v-model="layoutStore.sidebarType"
          class="ml-4"
          @change="sidebarTypeChange"
        >
          <el-radio label="1" size="large">默认</el-radio>
          <el-radio label="2" size="large">待定</el-radio>
        </el-radio-group>
      </div>
    </template>

    <template #footer>
      <el-button @click="reset">重置</el-button>
    </template>
  </el-drawer>
</template>

<script setup>
  import { useLayoutStore } from '@/store/layout'
  import { useMenusInfoStore } from '@/store/menus'
  import { business } from '../Menu/business'
  import { system } from '../menu/system'

  const layoutStore = useLayoutStore()
  const menusInfoStore = useMenusInfoStore()

  function reset() {
    layoutStore.setThemeType()
    layoutStore.changeTopbar()
    layoutStore.setSidebarType()
  }

  const sidebarTypeChange = value => {
    console.log('--->', value)
    if (layoutStore.sidebarType === '1') {
      const menus =
        menusInfoStore.currentType === 'business' ? business : system
      menusInfoStore.setMenus(menus)
    }
  }
</script>

<style lang="scss" scoped></style>
