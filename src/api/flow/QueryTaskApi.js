import Request from '@/utils/request-util'

/**
 * 流程任务查询api
 *
 * @author luopeng
 * @date 2022/08/13 13:21
 */
export class QueryTaskApi {
  /**
   * 查询待办任务
   *
   * @author luopeng
   * @date 2022/08/13 13:21
   */
  static queryTodoTask(params) {
    return Request.getAndLoadData('/queryTask/todo', params)
  }

  /**
   * 查询待办任务数量
   *
   * @author luopeng
   * @date 2022/08/13 13:21
   */
  static queryTodoTaskCount(params) {
    return Request.getAndLoadData('/queryTask/todo/count', params)
  }

  /**
   * 查询已办任务
   *
   * @author luopeng
   * @date 2022/08/13 13:21
   */
  static queryDoneTask(params) {
    return Request.getAndLoadData('/queryTask/done', params)
  }

  /**
   *  查询我发起的任务
   *
   * @author luopeng
   * @date 2022/08/13 13:21
   */
  static queryInitTask(params) {
    return Request.getAndLoadData('/queryTask/init', params)
  }

  /**
   *  查询抄送到我的
   *
   * @author luopeng
   * @date 2022/08/13 13:21
   */
  static queryCopyTask(params) {
    return Request.getAndLoadData('/queryTask/copy', params)
  }

  /**
   * 查询征询我的任务
   *
   * @author luopeng
   * @date 2022/08/13 13:21
   */
  static queryConsultTask(params) {
    return Request.getAndLoadData('/queryTask/consult', params)
  }
}
