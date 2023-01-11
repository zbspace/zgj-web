import { defineStore } from 'pinia'
export const useAccountInfoStore = defineStore({
  id: 'language',
  state: () => {
    return {
      lang: 'zh'
    }
  },
  getters: {},
  actions: {
    setLanguage(lang) {
      this.lang = lang || 'zh'
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
