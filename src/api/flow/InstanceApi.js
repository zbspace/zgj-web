import Request from '@/utils/request-util';

/**
 * 流程实例api
 *
 * @author fengshuonan
 * @date 2022/08/27 11:56
 */
export class InstanceApi {
  /**
   * 获取分页列表
   *
   * @author fengshuonan
   * @date 2022/08/27 11:56
   */
  static findPage(params) {
    return Request.getAndLoadData('/ruInstance/page', params);
  }

  /**
   * 新增
   *
   * @author fengshuonan
   * @date 2022/08/27 11:56
   */
  static add(params) {
    return Request.post('/ruInstance/add', params);
  }

  /**
   * 修改
   *
   * @author fengshuonan
   * @date 2022/08/27 11:56
   */
  static edit(params) {
    return Request.post('/ruInstance/edit', params);
  }

  /**
   * 删除
   *
   * @author fengshuonan
   * @date 2022/08/27 11:56
   */
  static delete(params) {
    return Request.post('/ruInstance/delete', params);
  }

  /**
   * 详情
   *
   * @author fengshuonan
   * @date 2022/08/27 11:56
   */
  static detail(params) {
    return Request.getAndLoadData('/ruInstance/detail', params);
  }
}
