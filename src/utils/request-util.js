/**
 * 通用请求工具类封装
 *
 * @author fengshuonan
 * @date 2022/4/8 10:47
 */
import request from '@/utils/request'

export default class RequestUtil {
  /**
   * get请求
   *
   * @author fengshuonan
   * @date 2022/4/8 10:50
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
   *
   * @author fengshuonan
   * @date 2022/4/8 10:50
   */
  static async getAndLoadData(url, params) {
    const result = await this.get(url, params)
    return result.data
  }

  /**
   * post请求
   *
   * @author fengshuonan
   * @date 2022/4/8 10:50
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
   *
   * @author fengshuonan
   * @date 2022/4/8 10:50
   */
  static async postAndLoadData(url, params) {
    const result = await this.post(url, params)
    return result.data
  }
}
