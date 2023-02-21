// api 全局配置
import request from '@/utils/request'
// 表单管理
export class form {
  /**
   * 查询表单树解构
   */

  static listApplyTypeTree(params) {
    const url = '/form/listApplyTypeTree'
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
   * 表单列表
   */

  static page(params) {
    const url = '/form/page'
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
   * 新增表单
   */

  static add(params) {
    const url = '/form/add'
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
   * 编辑表单
   */

  static edit(params) {
    const url = '/form/edit'
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
   * 删除表单
   */

  static delete(params) {
    const url = '/form/delete'
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
   * 表单详情
   */

  static view(params) {
    const url = '/form/view'
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
   * 表单详情_操作记录
   */

  static viewOperation(params) {
    const url = '/form/viewOperation'
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
   * 表单详情_历史版本
   */

  static viewHisVersion(params) {
    const url = '/form/viewHisVersion'
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
   * 启用/停用
   */

  static enable(params) {
    const url = '/form/enable'
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
   * 复制表单
   */

  static copy(params) {
    const url = '/form/copy'
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
    const url = '/form/batchDelete'
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

  static batchEnable(params) {
    const url = '/form/batchEnable'
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

  static batchDisable(params) {
    const url = '/form/batchDisable'
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
   * 关联文件类型
   */

  static relationContractType(params) {
    const url = '/form/relationContractType'
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
   * 流程配置时查询可用表单
   */

  static flowSettingForm(params) {
    const url = '/form/flowSettingForm'
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
   * 单据申请时查询可用表单
   */

  static applyUseForm(params) {
    const url = '/form/applyUseForm'
    return request({
      // 请求方式
      method: 'GET',
      // 请求的地址
      url: url,
      // 请求 中的查询参数
      params: params
    })
  }
}
