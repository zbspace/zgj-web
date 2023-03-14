import Request from '@/utils/request-util';

/**
 * 流程表单模型api
 *
 * @author fengshuon
 * @date 2022/09/07 23:08
 */
export class FormModelApi {
  /**
   * 获取列表
   *
   * @author fengshuonan
   * @date 2022/08/13 13:21
   */
   static list(params) {
    return Request.getAndLoadData('/formModel/list', params);
  }

  /**
   * 获取分页列表
   *
   * @author fengshuon
   * @date 2022/08/27 11:48
   */
   static findPage(params) {
    return Request.getAndLoadData('/formModel/page', params);
  }


  /**
   * 新增
   *
   * @author fengshuon
   * @date 2022/09/07 23:08
   */
  static add(params) {
    return Request.post('/formModel/add', params);
  }

  /**
   * 修改
   *
   * @author fengshuon
   * @date 2022/09/07 23:08
   */
  static edit(params) {
    return Request.post('/formModel/edit', params);
  }

  /**
   * 删除
   *
   * @author fengshuon
   * @date 2022/09/07 23:08
   */
  static delete(params) {
    return Request.post('/formModel/delete', params);
  }

  /**
   * 详情
   *
   * @author fengshuon
   * @date 2022/09/07 23:08
   */
  static detail(params) {
    return Request.getAndLoadData('/formModel/detail', params);
  }
}
