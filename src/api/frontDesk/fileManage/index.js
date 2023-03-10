// api 全局配置
import request from '@/utils/request'

// 文件管理
export const fileManageService = {
  /**
   * 文件类型集合（树形）
   * @param {*} params {tenantId: string}
   * @returns
   */
  getTreeList: params => {
    return request({
      method: 'POST',
      url: '/fileType/treeList',
      params
    })
  },

  /**
   * 文件类型列表
   * @param {*} params {formMessageId: string, relationRule: string}
   * @returns
   */
  getFileTypeList: params => {
    return request({
      method: 'GET',
      url: '/fileType/list',
      params
    })
  }
}
