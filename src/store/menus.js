import { defineStore } from 'pinia'
import { useLayoutStore } from '@/store/layout'

/**
 * menus信息
 */
export const useMenusInfoStore = defineStore({
  id: 'menusInfo',
  state: () => {
    return {
      currentType: 'business',
      menus: [], // 菜单集合
      asides: [], // 外层模块栏集合
      modelRoute: '' // 外层模块栏选中（hover）的模块url
    }
  },
  getters: {},
  actions: {
    setMenusInfo(menusInfo) {
      console.log(menusInfo)
      this.currentType = menusInfo
    },

    setMenus(menus) {
      this.menus = menus
    },

    autoSetMenus() {
      const layoutStore = useLayoutStore()
      // 模式2需要根据当前的模块来获取menus集合
      if (layoutStore.sidebarType === '2') {
      }
    },

    setAsides(asides) {
      this.asides = asides
    },

    setModelRoute(route) {
      this.modelRoute = route
    }
  },
  // 开启数据缓存
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage
      }
    ]
  }
})
