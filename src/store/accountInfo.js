import { defineStore } from 'pinia'
/**
 * 账号信息
 */
export const useAccountInfoStore = defineStore({
  id: 'accountInfo',
  state: () => {
    return {
      name: '',
      token: ''
    }
  },
  getters: {},
  actions: {
    setAccountInfo(accountInfo) {
      this.name = accountInfo ? accountInfo.name : ''
      this.token = accountInfo ? accountInfo.token : ''
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
