import Request from '@/utils/request-util';

/**
 * 流程定义api
 *
 * @author fengshuon
 * @date 2022/08/27 11:48
 */
export class DefinitionApi {
  /**
   * 获取分页列表
   *
   * @author fengshuon
   * @date 2022/08/27 11:48
   */
  static findPage(params) {
    return Request.getAndLoadData('/definition/page', params);
  }

  /**
   * 新增
   *
   * @author fengshuon
   * @date 2022/08/27 11:48
   */
  static add(params) {
    return Request.post('/definition/add', params);
  }

  /**
   * 修改
   *
   * @author fengshuon
   * @date 2022/08/27 11:48
   */
  static edit(params) {
    return Request.post('/definition/edit', params);
  }

  /**
   * 删除
   *
   * @author fengshuon
   * @date 2022/08/27 11:48
   */
  static delete(params) {
    return Request.post('/definition/delete', params);
  }

  /**
   * 详情
   *
   * @author fengshuon
   * @date 2022/08/27 11:48
   */
  static detail(params) {
    return Request.getAndLoadData('/definition/detail', params);
  }
}
