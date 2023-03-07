// api 全局配置
import request from '@/utils/request'

// 文件管理
export const fileManageService = {
  /**
   * 文件类型集合（树形）
   * @param {*} params
   * @returns
   */
  getTreeList: params => {
    return request({
      method: 'POST',
      url: '/fileType/treeList',
      params
    })
  }
}
