import Request from '@/utils/request-util';

/**
 * 工作流-表单分类api
 *
 * @author fengshuonan
 * @date 2022/03/21 21:35
 */
export class FormCategoryApi {
  /**
   * 新增
   *
   * @author fengshuonan
   * @date 2022/03/21 21:35
   */
  static add(params) {
    return Request.post('/formCategory/add', params);
  }

  /**
   * 修改
   *
   * @author fengshuonan
   * @date 2022/03/21 21:35
   */
  static edit(params) {
    return Request.post('/formCategory/edit', params);
  }

  /**
   * 删除
   *
   * @author fengshuonan
   * @date 2022/03/21 21:35
   */
  static delete(params) {
    return Request.post('/formCategory/delete', params);
  }

  /**
   * 详情
   *
   * @author fengshuonan
   * @date 2022/03/21 21:35
   */
  static detail(params) {
    return Request.getAndLoadData('/formCategory/detail', params);
  }

  /**
   * 修改状态
   *
   * @author fengshuonan
   * @date 2022/03/21 21:35
   */
  static changeStatus(params) {
    return Request.post('/formCategory/changeStatus', params);
  }

  /**
   * 获取表单分类列表
   *
   * @author fengshuonan
   * @date 2022/03/21 21:35
   */
  static getList(params) {
    return Request.getAndLoadData('/formCategory/list', params);
  }
}
