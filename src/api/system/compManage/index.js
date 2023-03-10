// api 全局配置
import request from '@/utils/request'

// 文件管理
export const compManageService = {
  /**
   * 查询往来单位列表
   * @param {*} params {tenantId: number, relatedCompanyName: string, organId: string, current: number, size: number}
   * @returns
   */
  relatedCompanyList: params => {
    return request({
      method: 'GET',
      url: '/tenant/relatedCompany/list',
      params
    })
  },

  /**
   * 新增往来单位
   * @param {*} params {tenantId: number, relatedCompanyName: string, organId: string, contactName: string, contactInformation: string, rank: string }
   * @returns
   */
  relatedCompanyAdd: data => {
    return request({
      method: 'POST',
      url: '/tenant/relatedCompany/add',
      data
    })
  },

  /**
   * 编辑往来单位
   * @param {*} params {tenantId: number, relatedCompanyName: string, organId: string, contactName: string, contactInformation: string, rank: string }
   * @returns
   */
  relatedCompanyUpdate: data => {
    return request({
      method: 'POST',
      url: '/tenant/relatedCompany/update',
      data
    })
  }
}
