import { defineStore } from 'pinia'
/**
 * menus信息
 */
export const useMenusInfoStore = defineStore({
  id: 'menusInfo',
  state: () => {
    return {
      currentType: 'business',
      menus: []
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
