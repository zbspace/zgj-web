import Request from '@/utils/request-util';

/**
 * 流程实例api
 *
 * @author fengshuonan
 * @date 2022/08/27 11:56
 */
export class RuNodeApi {
  /**
   * 获取分页列表
   *
   * @author fengshuonan
   * @date 2022/08/27 11:56
   */
  static findPage(params) {
    return Request.getAndLoadData('/ruNode/page', params);
  }

  

  /**
   * 详情
   *
   * @author fengshuonan
   * @date 2022/08/27 11:56
   */
  static detail(params) {
    return Request.getAndLoadData('/ruNode/detail', params);
  }
}
