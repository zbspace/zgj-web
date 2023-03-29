import Request from '@/utils/request-util'

/**
 * 流程审批api
 *
 * @author luopeng
 * @date 2022/08/13 13:21
 */
export class ApproverApi {
  /**
   * 新流程审批_启动
   *
   * @author luopeng
   * @date 2022/08/13 13:21
   */
  static start(params) {
    return Request.post('/approver/start', params)
  }

  /**
   * 新流程审批_退回重新提交
   *
   * @author luopeng
   * @date 2022/08/13 13:21
   */
  static startByBack(params) {
    return Request.post('/approver/startByBack', params)
  }

  /**
   * 新流程审批_同意
   *
   * @author luopeng
   * @date 2022/08/13 13:21
   */
  static agree(params) {
    return Request.post('/approver/agree', params)
  }

  /**
   * 新流程审批_拒绝
   *
   * @author luopeng
   * @date 2022/08/13 13:21
   */
  static reject(params) {
    return Request.post('/approver/reject', params)
  }

  /**
   * 新流程审批_转办
   *
   * @author luopeng
   * @date 2022/08/13 13:21
   */
  static turn(params) {
    return Request.post('/approver/turn', params)
  }

  /**
   * 新流程审批_加签
   *
   * @author luopeng
   * @date 2022/08/13 13:21
   */
  static addSign(params) {
    return Request.post('/approver/addSign', params)
  }

  /**
   * 新流程审批_添加征询
   *
   * @author luopeng
   * @date 2022/08/13 13:21
   */
  static consult(params) {
    return Request.post('/approver/consult', params)
  }

  /**
   * 新流程审批_提交征询
   *
   * @author luopeng
   * @date 2022/08/13 13:21
   */
  static consultSubmit(params) {
    return Request.post('/approver/consultSubmit', params)
  }

  /**
   * 新流程审批_撤回
   *
   * @author luopeng
   * @date 2022/08/13 13:21
   */
  static withdraw(params) {
    return Request.post('/approver/withdraw', params)
  }

  /**
   * 新流程审批_退回
   *
   * @author luopeng
   * @date 2022/08/13 13:21
   */
  static returned(params) {
    return Request.post('/approver/returned', params)
  }

  /**
   * 新流程审批_挂起
   *
   * @author luopeng
   * @date 2022/08/13 13:21
   */
  static suspend(params) {
    return Request.post('/approver/suspend', params)
  }

  /**
   * 新流程审批_批量挂起
   *
   * @author luopeng
   * @date 2022/08/13 13:21
   */
  static suspends(params) {
    return Request.post('/approver/suspends', params)
  }

  /**
   * 新流程审批_激活
   *
   * @author luopeng
   * @date 2022/08/13 13:21
   */
  static active(params) {
    return Request.post('/approver/active', params)
  }

  /**
   * 新流程审批_批量激活
   *
   * @author luopeng
   * @date 2022/08/13 13:21
   */
  static actives(params) {
    return Request.post('/approver/actives', params)
  }

  /**
   * 新流程审批_终止
   *
   * @author luopeng
   * @date 2022/08/13 13:21
   */
  static close(params) {
    return Request.post('/approver/close', params)
  }

  /**
   * 获取模型信息,传入
   */
  static getModel(modelKey) {
    return Request.get('/workflow/model/getByKey', { modelKey })
  }
}
