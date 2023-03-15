import Request from '@/utils/request-util';

/**
 * 流程分类api
 *
 * @author fengshuonan
 * @date 2022/08/13 13:21
 */
export class CategoryApi {
  /**
   * 获取列表
   *
   * @author fengshuonan
   * @date 2022/08/13 13:21
   */
  static list(params) {
    return Request.getAndLoadData('/category/list', params);
  }

  /**
   * 获取分页列表
   *
   * @author fengshuonan
   * @date 2022/08/13 13:21
   */
  static findPage(params) {
    return Request.getAndLoadData('/category/page', params);
  }

  /**
   * 新增
   *
   * @author fengshuonan
   * @date 2022/08/13 13:21
   */
  static add(params) {
    return Request.post('/category/add', params);
  }

  /**
   * 修改
   *
   * @author fengshuonan
   * @date 2022/08/13 13:21
   */
  static edit(params) {
    return Request.post('/category/edit', params);
  }

  /**
   * 删除
   *
   * @author fengshuonan
   * @date 2022/08/13 13:21
   */
  static delete(params) {
    return Request.post('/category/delete', params);
  }

  /**
   * 详情
   *
   * @author fengshuonan
   * @date 2022/08/13 13:21
   */
  static detail(params) {
    return Request.getAndLoadData('/category/detail', params);
  }
}
