import Request from '@/utils/request-util';

/**
 * 流程表单定义api
 *
 * @author fengshuonan
 * @date 2022/09/13 11:51
 */
export class FormDefinitionApi {
  /**
   * 获取分页列表
   *
   * @author fengshuonan
   * @date 2022/09/13 11:51
   */
  static findPage(params) {
    return Request.getAndLoadData('/formDefinition/page', params);
  }

  /**
   * 新增
   *
   * @author fengshuonan
   * @date 2022/09/13 11:51
   */
  static add(params) {
    return Request.post('/formDefinition/add', params);
  }

  /**
   * 修改
   *
   * @author fengshuonan
   * @date 2022/09/13 11:51
   */
  static edit(params) {
    return Request.post('/formDefinition/edit', params);
  }

  /**
   * 删除
   *
   * @author fengshuonan
   * @date 2022/09/13 11:51
   */
  static delete(params) {
    return Request.post('/formDefinition/delete', params);
  }

  /**
   * 详情
   *
   * @author fengshuonan
   * @date 2022/09/13 11:51
   */
  static detail(params) {
    return Request.getAndLoadData('/formDefinition/detail', params);
  }
}
