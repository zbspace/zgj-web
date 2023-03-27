import Request from '@/utils/request-util';

/**
 * 流程按钮api
 *
 * @author fengshuonan
 * @date 2022/09/30 21:22
 */
export class NodeButtonApi {
  /**
   * 获取分页列表
   *
   * @author fengshuonan
   * @date 2022/09/30 21:22
   */
  static findPage(params) {
    return Request.getAndLoadData('/nodeButton/page', params);
  }

    /**
   * 获取列表
   *
   * @author fengshuonan
   * @date 2022/09/30 21:22
   */
     static findList(params) {
      return Request.getAndLoadData('/nodeButton/list', params);
    }

  /**
   * 新增
   *
   * @author fengshuonan
   * @date 2022/09/30 21:22
   */
  static add(params) {
    return Request.post('/nodeButton/add', params);
  }

  /**
   * 修改
   *
   * @author fengshuonan
   * @date 2022/09/30 21:22
   */
  static edit(params) {
    return Request.post('/nodeButton/edit', params);
  }

  /**
   * 删除
   *
   * @author fengshuonan
   * @date 2022/09/30 21:22
   */
  static delete(params) {
    return Request.post('/nodeButton/delete', params);
  }

  /**
   * 详情
   *
   * @author fengshuonan
   * @date 2022/09/30 21:22
   */
  static detail(params) {
    return Request.getAndLoadData('/nodeButton/detail', params);
  }
}
