import { defineStore } from 'pinia'
export const useHomeLogoUrl = defineStore({
  id: 'homeLogoPath',
  state: () => {
    return {
      homeUrl: ''
    }
  },
  getters: {},
  actions: {
    setHomeUrl(url) {
      this.homeUrl = url || ''
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
