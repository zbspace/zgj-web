import { defineStore } from 'pinia'

/**
 * menus信息
 */
export const useMenusInfoStore = defineStore({
  id: 'menusInfo',
  state: () => {
    return {
      currentType: 'business',
      menus: [], // 菜单集合
      tempMenus: null, // 临时菜单集合
      asides: [], // 外层模块栏集合
      modelRoute: '' // 外层模块栏选中（hover）的模块url
    }
  },
  getters: {},
  actions: {
    setMenusInfo(menusInfo) {
      // console.log(menusInfo)
      this.currentType = menusInfo
    },

    setMenus(menus) {
      this.menus = menus
    },

    setTempMenus(menus) {
      this.tempMenus = menus || null
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
