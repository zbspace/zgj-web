/**
 * 通用请求工具类封装
 */
import request from '@/utils/request'
import { getToken } from '@/utils/token-util'

export default class RequestUtil {
  /**
   * get请求
   */
  static async get(url, params) {
    if (params === undefined) {
      params = {}
    }
    const result = await request.get(url, { params })
    return result.data
  }

  /**
   * get请求并获取数据
   */
  static async getAndLoadData(url, params) {
    const result = await this.get(url, params)
    return result.data
  }

  /**
   * post请求
   */
  static async post(url, params) {
    if (params === undefined) {
      params = {}
    }
    const result = await request.post(url, params)
    return result.data
  }

  /**
   * post请求并获取数据
   */
  static async postAndLoadData(url, params) {
    const result = await this.post(url, params)
    return result.data
  }

  /**
   * 封装downLoad请求
   */
  static downLoad(url, params) {
    if (params === undefined) {
      params = {}
    }
    let paramUrl = '?'
    for (const field in params) {
      if (params[field]) {
        paramUrl = paramUrl + field + '=' + params[field] + '&'
      }
    }
    paramUrl = paramUrl.substring(0, paramUrl.length - 1)
    if (!paramUrl.includes('&token=')) {
      paramUrl = `${paramUrl}&token=${getToken()}`
    }
    window.location.href = `${url}${paramUrl}`
  }
}
