import { defineStore } from 'pinia'
import { fileManageService } from '@/api/frontDesk/fileManage'
/**
 * 动态表单信息
 */
export const useVformInfoStore = defineStore({
  id: 'vformInfo',
  state: () => {
    return {
      forbidRemove: [], // 禁止删除的控件标识
      fileTypeList: [] // 文件类型list
    }
  },
  getters: {},
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
