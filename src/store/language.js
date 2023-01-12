import { defineStore } from 'pinia'
import { LANGUAGE } from '@/utils/constants'
export const useLanguageStore = defineStore({
  id: LANGUAGE,
  state: () => {
    return {
      lang: ''
    }
  },
  getters: {},
  actions: {
    setLanguage(lang) {
      this.lang = lang || ''
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
