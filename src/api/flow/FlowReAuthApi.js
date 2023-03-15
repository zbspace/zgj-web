import Request from '@/utils/request-util';

/**
 * 流程权限api
 *
 * @author fengshuonan
 * @date 2022/11/08 15:34
 */
export class FlowReAuthApi {
  /**
   * 新增
   *
   * @author fengshuonan
   * @date 2022/11/08 15:34
   */
  static add(params) {
    return Request.post('/flowReAuth/add', params);
  }

  /**
   * 新增
   *
   * @author fengshuonan
   * @date 2022/11/08 15:34
   */
  static batchAdd(params) {
    return Request.post('/flowReAuth/batchAdd', params);
  }

  /**
   * 修改
   *
   * @author fengshuonan
   * @date 2022/11/08 15:34
   */
  static edit(params) {
    return Request.post('/flowReAuth/edit', params);
  }

  /**
   * 删除
   *
   * @author fengshuonan
   * @date 2022/11/08 15:34
   */
  static delete(params) {
    return Request.post('/flowReAuth/delete', params);
  }

  /**
   * 详情
   *
   * @author fengshuonan
   * @date 2022/11/08 15:34
   */
  static detail(params) {
    return Request.getAndLoadData('/flowReAuth/detail', params);
  }

  /**
   * 分页详情
   *
   * @author fengshuonan
   * @date 2022/5/20 17:18
   */
  static findPage(params) {
    return Request.getAndLoadData('/flowReAuth/page', params);
  }

  /**
   * 流程模型权限key
   *
   * @author luopeng
   * @date 2022/5/20 17:18
   */
  static permissions(params) {
    return Request.getAndLoadData('/flowReAuth/permissions', params);
  }
}
