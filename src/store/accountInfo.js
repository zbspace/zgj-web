import { defineStore } from 'pinia'
/**
 * 账号信息 - 账号密码、用户信息-用户名等
 * token
 */
export const useAccountInfoStore = defineStore({
  id: 'accountInfo',
  state: () => {
    return {
      accountNo: '',
      accountPass: '',
      token: '',
      userInfo: {},
      oneDepartTitle: ''
    }
  },
  getters: {},
  actions: {
    setToken(attr) {
      this.token = attr ? attr.token : ''
    },
    setAccountAndPassword(accountInfo) {
      this.accountNo = accountInfo ? accountInfo.accountNo : ''
      this.accountPass = accountInfo ? accountInfo.accountPass : ''
    },
    setUserInfo(obj) {
      this.userInfo = obj
    },
    setOneDeaprtTitle(title) {
      this.oneDepartTitle = title
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
