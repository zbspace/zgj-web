import { defineStore } from 'pinia'
/**
 * 动态表单信息
 */
export const useVformInfoStore = defineStore({
  id: 'vformInfo',
  state: () => {
    return {
      businessType: '', // 业务类型(用印申请、印章申请)
      forbidRemove: [] // 禁止删除的控件标识
    }
  },
  getters: {},
  actions: {
    setBusinessType(value) {
      this.businessType = value
    },
    setForbidRemove(value) {
      this.forbidRemove = value
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
