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
      rememberPas: false,
      rememberPasTime: '',
      token: '',
      userInfo: {},
      oneDepartTitle: '',
      userDepartInfo: {}
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
      this.rememberPas = true
      this.rememberPasTime = new Date()
    },
    removeLoginStatus() {
      this.accountNo = ''
      this.accountPass = ''
      this.rememberPas = false
      this.rememberPasTime = ''
    },
    setUserInfo(obj) {
      this.userInfo = obj
    },
    setOneDeaprtTitle(title) {
      this.oneDepartTitle = title
    },
    setUserDepartInfo(obj) {
      this.userDepartInfo = obj
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
