import Request from '@/utils/request-util';

/**
 * 表单字段api
 *
 * @author fengshuonan
 * @date 2022/09/13 11:51
 */
export class FormFieldApi {
  /**
   * 获取分页列表
   *
   * @author fengshuonan
   * @date 2022/09/13 11:51
   */
  static findPage(params) {
    return Request.getAndLoadData('/formField/page', params);
  }

  /**
   * 获取列表
   *
   * @author fengshuonan
   * @date 2022/09/13 11:51
   */
  static list(params) {
    return Request.getAndLoadData('/formField/list', params);
  }

  /**
   * 新增
   *
   * @author fengshuonan
   * @date 2022/09/13 11:51
   */
  static add(params) {
    return Request.post('/formField/add', params);
  }

  /**
   * 批量新增
   *
   * @author fengshuonan
   * @date 2022/09/13 11:51
   */
  static batchAdd(params) {
    return Request.post('/formField/batchAdd', params);
  }

  /**
   * 修改
   *
   * @author fengshuonan
   * @date 2022/09/13 11:51
   */
  static edit(params) {
    return Request.post('/formField/edit', params);
  }

  /**
   * 删除
   *
   * @author fengshuonan
   * @date 2022/09/13 11:51
   */
  static delete(params) {
    return Request.post('/formField/delete', params);
  }

  /**
   * 详情
   *
   * @author fengshuonan
   * @date 2022/09/13 11:51
   */
  static detail(params) {
    return Request.getAndLoadData('/formField/detail', params);
  }
}
