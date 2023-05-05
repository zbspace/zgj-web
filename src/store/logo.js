import { defineStore } from 'pinia'
import { API_BASE_PREFIX } from '@/utils/constants'
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
      this.homeUrl = url ? API_BASE_PREFIX + url : ''
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
