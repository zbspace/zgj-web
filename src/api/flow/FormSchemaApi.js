import Request from '@/utils/request-util';

/**
 * 工作流-表单设计api
 *
 * @author fengshuonan
 * @date 2022/03/21 21:35
 */
export class FormSchemaApi {
  /**
   * 新增
   *
   * @author fengshuonan
   * @date 2022/03/21 21:35
   */
  static add(params) {
    return Request.post('/formSchema/add', params);
  }

  /**
   * 修改
   *
   * @author fengshuonan
   * @date 2022/03/21 21:35
   */
  static edit(params) {
    return Request.post('/formSchema/edit', params);
  }

  /**
   * 删除
   *
   * @author fengshuonan
   * @date 2022/03/21 21:35
   */
  static delete(params) {
    return Request.post('/formSchema/delete', params);
  }

  /**
   * 详情
   *
   * @author fengshuonan
   * @date 2022/03/21 21:35
   */
  static detail(params) {
    return Request.getAndLoadData('/formSchema/detail', params);
  }

  /**
   * 更新状态
   *
   * @author fengshuonan
   * @date 2022/03/21 21:35
   */
  static changeStatus(params) {
    return Request.post('/formSchema/changeStatus', params);
  }
}
