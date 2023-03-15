import Request from '@/utils/request-util';

/**
 * 流程任务api
 *
 * @author fengshuonan
 * @date 2022/08/27 12:04
 */
export class TaskApi {
  /**
   * 获取分页列表
   *
   * @author fengshuonan
   * @date 2022/08/27 12:04
   */
  static findPage(params) {
    return Request.getAndLoadData('/ruTask/page', params);
  }

  /**
   * 获取列表
   *
   * @author fengshuonan
   * @date 2022/08/27 12:04
   */
  static findList(params) {
    return Request.getAndLoadData('/ruTask/list', params);
  }

  /**
   * 新增
   *
   * @author fengshuonan
   * @date 2022/08/27 12:04
   */
  static add(params) {
    return Request.post('/ruTask/add', params);
  }

  /**
   * 修改
   *
   * @author fengshuonan
   * @date 2022/08/27 12:04
   */
  static edit(params) {
    return Request.post('/ruTask/edit', params);
  }

  /**
   * 删除
   *
   * @author fengshuonan
   * @date 2022/08/27 12:04
   */
  static delete(params) {
    return Request.post('/ruTask/delete', params);
  }

  /**
   * 详情
   *
   * @author fengshuonan
   * @date 2022/08/27 12:04
   */
  static detail(params) {
    return Request.getAndLoadData('/ruTask/detail', params);
  }

    /**
   * 当前当前任务前面的任务
   *
   * @author fengshuonan
   * @date 2022/08/27 12:04
   */
    static preList(params) {
      return Request.getAndLoadData('/ruTask/pre', params);
    }
}
