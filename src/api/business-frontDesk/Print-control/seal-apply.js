// api 全局配置
import request from '@/utils/request'
// 用印申请
export class sealApply {
  /**
   * 用印申请新增
   */

  static add(params) {
    const url = '/sealApply/add'
    return request({
      // 请求方式
      method: 'POST',
      // 请求的地址
      url: url,
      // 请求 中的查询参数
      data: params
    })
  }
}
