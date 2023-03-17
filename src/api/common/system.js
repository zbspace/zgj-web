// api 系统设置
import request from '@/utils/request'

// 文件管理
export const systemService = {
  /**
   * 系统左侧菜单
   * @param {*} params {systemTypeId: string, functionGroupId: string, }
   * @returns
   */
  getLeftMenu: data => {
    return request({
      method: 'POST',
      url: '/function/leftMenu',
      data
    })
  }
}
