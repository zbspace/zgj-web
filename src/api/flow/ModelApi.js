import Request from '@/utils/request-util'

/**
 * 流程模型api
 *
 * @author fengshuonan
 * @date 2022/08/13 13:21
 */
export class ModelApi {
  /**
   * 获取流程分类下的模型列表=
   *
   * @author fengshuonan
   * @date 2022/08/13 13:21
   */
  static getCategoryDetailList(params) {
    return Request.getAndLoadData('/model/getCategoryDetailList', params)
  }

  // 指定的模型信息
  static getModelKey(params) {
    return Request.getAndLoadData('/model/key', params)
  }

  /**
   * 获取分页列表
   *
   * @author fengshuonan
   * @date 2022/08/13 13:21
   */
  static findPage(params) {
    return Request.getAndLoadData('/model/page', params)
  }

  /**
   * 获取分页列表
   *
   * @author fengshuonan
   * @date 2022/08/13 13:21
   */
  static findList(params) {
    return Request.getAndLoadData('/model/list', params)
  }

  /**
   * 新增
   *
   * @author fengshuonan
   * @date 2022/08/13 13:21
   */
  static add(params) {
    return Request.post('/model/add', params)
  }

  /**
   * 修改
   *
   * @author fengshuonan
   * @date 2022/08/13 13:21
   */
  static edit(params) {
    return Request.post('/model/edit', params)
  }

  /**
   * 删除
   *
   * @author fengshuonan
   * @date 2022/08/13 13:21
   */
  static delete(params) {
    return Request.post('/model/delete', params)
  }

  /**
   * 详情
   *
   * @author fengshuonan
   * @date 2022/08/13 13:21
   */
  static detail(params) {
    return Request.getAndLoadData('/model/detail', params)
  }

  /**
   * 获取ID
   *
   * @author fengshuonan
   * @date 2022/08/13 13:21
   */
  static getId(params) {
    return Request.getAndLoadData('/model/getId', params)
  }

  /**
   * 移动模型的分类
   *
   * @author fengshuonan
   * @date 2022/08/13 13:21
   */
  static moveCategory(params) {
    return Request.post('/model/moveCategory', params)
  }

  /**
   * 移动模型的分类
   *
   * @author fengshuonan
   * @date 2022/08/13 13:21
   */
  static updateStatus(params) {
    return Request.post('/model/updateStatus', params)
  }

  /**
   * 模型(流程)设计保存
   *
   * @author luopeng
   * @date 2022/08/23 15:27
   */
  static saveDesign(params) {
    return Request.post('/model/design', params)
  }

  /**
   * 获取模型(流程)设计
   *
   * @author luopeng
   * @date 2022/08/23 15:27
   */
  static getDesign(params) {
    return Request.getAndLoadData('/model/design', params)
  }

  /**
   * 模型(流程)设计节点修改
   *
   * @author luopeng
   * @date 2022/08/23 15:27
   */
  static updateDesignNode(params) {
    return Request.post('/model/design/node', params)
  }

  /**
   * 模型(流程)设计升级版本
   *
   * @author luopeng
   * @date 2022/08/23 15:27
   */
  static updateDesignUpgrade(params) {
    return Request.post('/model/design/upgrade', params)
  }
}
