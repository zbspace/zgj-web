import Request from '@/utils/request-util';

/**
 * 流程任务加签api
 *
 * @author fengshuonan
 * @date 2022/08/27 12:04
 */
export class RuTaskSignApi {
  /**
   * 通过task获取列表
   *
   * @author fengshuonan
   * @date 2022/08/27 12:04
   */
  static findListByTaskId(params) {
    return Request.getAndLoadData('/ruTaskSign/list', params);
  }
}
