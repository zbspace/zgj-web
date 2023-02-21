// api 全局配置
import request from '@/utils/request'
// 流程管理
export class flow {
  /**
   * 流程列表
   */

  static page(params) {
    const url = '/flow/page'
    return request({
      // 请求方式
      method: 'GET',
      // 请求的地址
      url: url,
      // 请求 中的查询参数
      params: params
    })
  }

  /**
   * 流程详情
   */

  static view(params) {
    const url = '/flow/view'
    return request({
      // 请求方式
      method: 'GET',
      // 请求的地址
      url: url,
      // 请求 中的查询参数
      params: params
    })
  }

  /**
   * 流程详情_操作记录
   */

  static viewOperation(params) {
    const url = '/flow/viewOperation'
    return request({
      // 请求方式
      method: 'GET',
      // 请求的地址
      url: url,
      // 请求 中的查询参数
      params: params
    })
  }

  /**
   * 流程详情_历史版本
   */

  static viewHisVersion(params) {
    const url = '/flow/viewHisVersion'
    return request({
      // 请求方式
      method: 'GET',
      // 请求的地址
      url: url,
      // 请求 中的查询参数
      params: params
    })
  }

  /**
   * 新增流程
   */

  static add(params) {
    const url = '/flow/add'
    return request({
      // 请求方式
      method: 'POST',
      // 请求的地址
      url: url,
      // 请求 中的查询参数
      data: params
    })
  }

  /**
   * 编辑流程
   */

  static edit(params) {
    const url = '/flow/edit'
    return request({
      // 请求方式
      method: 'POST',
      // 请求的地址
      url: url,
      // 请求 中的查询参数
      data: params
    })
  }

  /**
   * 删除流程
   */

  static delete(params) {
    const url = '/flow/delete'
    return request({
      // 请求方式
      method: 'POST',
      // 请求的地址
      url: url,
      // 请求 中的查询参数
      data: params
    })
  }

  /**
   * 启用/停用
   */

  static enable(params) {
    const url = '/flow/enable'
    return request({
      // 请求方式
      method: 'POST',
      // 请求的地址
      url: url,
      // 请求 中的查询参数
      data: params
    })
  }

  /**
   * 复制流程
   */

  static copy(params) {
    const url = '/flow/copy'
    return request({
      // 请求方式
      method: 'POST',
      // 请求的地址
      url: url,
      // 请求 中的查询参数
      data: params
    })
  }

  /**
   * 批量删除
   */

  static batchDelete(params) {
    const url = '/flow/batchDelete'
    return request({
      // 请求方式
      method: 'POST',
      // 请求的地址
      url: url,
      // 请求 中的查询参数
      data: params
    })
  }

  /**
   * 批量启用
   */

  static batachEnable(params) {
    const url = '/flow/batachEnable'
    return request({
      // 请求方式
      method: 'POST',
      // 请求的地址
      url: url,
      // 请求 中的查询参数
      data: params
    })
  }

  /**
   * 批量停用
   */

  static batachDisable(params) {
    const url = '/flow/batachDisable'
    return request({
      // 请求方式
      method: 'POST',
      // 请求的地址
      url: url,
      // 请求 中的查询参数
      data: params
    })
  }

  /**
   * 根据表单id查询关联且启用的流程
   */

  static getEnableProcessByForm(params) {
    const url = '/flow/getEnableProcessByForm'
    return request({
      // 请求方式
      method: 'POST',
      // 请求的地址
      url: url,
      // 请求 中的查询参数
      data: params
    })
  }

  /**
   * 根据表单id查询流程中引用的相关字段
   */

  static getProcessFormColum(params) {
    const url = '/flow/getProcessFormColum'
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
