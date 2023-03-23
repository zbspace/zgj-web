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
      userName: '',
      userId: ''
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
    setUserName(name) {
      this.userName = name || ''
    },
    setUserId(userId) {
      this.userId = userId || ''
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
