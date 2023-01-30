import { defineStore } from 'pinia'
/**
 * menus信息
 */
export const useMenusInfoStore = defineStore({
  id: 'menusInfo',
  state: () => {
    return {
      currentType: 'business',
      menus: [],
      asides: []
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

    setAsides(asides) {
      this.asides = asides
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
