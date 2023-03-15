import Request from '@/utils/request-util';

/**
 * 流程节点配置api
 *
 * @author fengshuonan
 * @date 2022/09/30 21:22
 */
export class NodeAttrApi {
  /**
   * 通过任务ID查看详情
   *
   * @author fengshuonan
   * @date 2022/09/30 21:22
   */
  static detailByTaskId(params) {
    return Request.getAndLoadData('/nodeAttr/detailByTaskId', params);
  }
}
