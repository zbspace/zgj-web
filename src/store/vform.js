import { defineStore } from 'pinia'
import { fileManageService } from '@/api/frontDesk/fileManage'
import sealApplyService from '@/api/frontDesk/printControl/sealApply'

/**
 * 动态表单信息
 */
export const useVformInfoStore = defineStore({
  id: 'vformInfo',
  state: () => {
    return {
      forbidRemove: [], // 禁止删除的控件标识
      fileTypeList: [], // 文件类型list
      moneyType: [] // 币种
    }
  },
  actions: {
    setForbidRemove(value) {
      this.forbidRemove = value
    },
    async setFileTypeList() {
      if (this.fileTypeList.length) return
      try {
        const res = await fileManageService.getFileTypeList({
          formMessageId: '',
          relationRule: ''
        })
        this.fileTypeList = res.data || []
      } catch (error) {}
    },
    async getMoneyType() {
      if (this.moneyType.length) {
        return this.moneyType
      } else {
        const res = await sealApplyService.getMoneyType()
        return (this.moneyType = res.data || [])
      }
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
