import SnowflakeId from 'snowflake-id';

/**
 *   获取ID
 */
const getId = num => {
  const snowflake = new SnowflakeId();
  let arr = [];
  for (let i = 0; i <= num; i++) {
    arr.push(snowflake.generate());
  }
  return num ? arr[num] : snowflake.generate();
};

/**
 * 发起人节点
 * @returns
 */
export function getStartNode() {
  return {
    nodeId: getId(),
    nodeName: '发起人',
    nodeType: 0,
    // 流程节点状态(用于只读模式, 0:未进行 1:进行中  2:已完成)
    nodeStatus: -1,
    // 表单权限
    privileges: [],
    // 子节点
    childNode: null,
    // 显示添加按钮
    addable: true,
    // 可删除提示
    deletable: false,
    // 是否修改
    update: false,
    // 是否有错误
    error: false,
    // 显示内容
    content: null,
    buttons: [
      {
        buttonName: '保存',
        checked: true,
        disabled: false,
        content: '发起节点保存操作，审批节点下无保存操作，可在草稿箱查看',
        buttonCode: 'save',
        color: 'default'
      },
      {
        buttonName: '提交',
        checked: true,
        disabled: false,
        content: '发起节点填写完申请单，,提交流程到下一步，可在我发起的查看',
        buttonCode: 'submit',
        color: 'primary'
      },
      {
        buttonName: '同意',
        checked: false,
        disabled: true,
        content: '审批节点同意该审核之操作，审批通过，可在我已办查看',
        buttonCode: 'agree',
        color: 'success'
      },
      {
        buttonName: '拒绝',
        checked: false,
        disabled: true,
        content: '节点负责人可以拒绝该流程（拒绝后流程直接结束，标记为已拒绝）',
        buttonCode: 'reject',
        color: 'error'
      },
      {
        buttonName: '转交',
        checked: false,
        disabled: true,
        content: '转交给他人办理，依然在当前节点',
        buttonCode: 'turn',
        color: 'cyan'
      },
      {
        buttonName: '退回',
        checked: false,
        disabled: true,
        content: '退回给申请人，申请人修改完成后，流程按节点开始走',
        buttonCode: 'back',
        color: 'default'
      },
      {
        buttonName: '撤回',
        checked: false,
        disabled: true,
        content: '允许申请人对未进入流程（第一个流程节点为待处理状态）的申请进行撤回',
        buttonCode: 'revoke',
        color: 'default'
      },
      {
        buttonName: '加签',
        checked: false,
        disabled: true,
        content: '这个事情我不能完全做主，需要某些人先处理，再右我处理',
        buttonCode: 'addSign',
        color: 'warning'
      }
    ]
  };
}

/**
 * 添加审批节点
 * @param {*} type
 * @returns
 */
export function addApproverNode(type) {
  return {
    nodeId: getId(),
    nodeName: type == 1 ? '审批人' : '办理人',
    nodeType: type,
    // 流程节点状态(用于只读模式, 0:未进行 1:进行中  2:已完成)
    nodeStatus: -1,
    // 流程基础配置属性
    attr: {
      // 审批类型
      approvalMethod: 1,
      // 审批方式
      approvalMode: 1,
      // 审批人与发起人为同一人时
      starterAssignee: 1,
      // 相同审批人为同一人时
      adjacent: 2,
      // 审批人为空时
      emptyFlag: 5,
      // 允许退回人类型
      allowBackType: 1,
      // 退回审批形式
      backApprovalType: undefined
    },
    // 流程基础通知属性
    notice: {
      // 通知类型
      noticeType: 1,
      // 通知主题
      noticeTitle: '',
      // 通知内容
      noticeContext: ''
    },
    buttons: [
      {
        checked: false,
        disabled: true,
        buttonName: '保存',
        content: '发起节点保存操作，审批节点下无保存操作，可在草稿箱查看',
        buttonCode: 'save',
        color: 'default'
      },
      {
        buttonName: '提交',
        checked: false,
        disabled: true,
        content: '发起节点填写完申请单，,提交流程到下一步，可在我发起的查看',
        buttonCode: 'submit',
        color: 'primary'
      },
      {
        buttonName: '同意',
        checked: true,
        disabled: false,
        content: '审批节点同意该审核之操作，审批通过，可在我已办查看',
        buttonCode: 'agree',
        color: 'success'
      },
      {
        buttonName: '拒绝',
        checked: true,
        disabled: false,
        content: '节点负责人可以拒绝该流程（拒绝后流程直接结束，标记为已拒绝）',
        buttonCode: 'reject',
        color: 'error'
      },
      {
        buttonName: '转交',
        checked: true,
        disabled: false,
        content: '转交给他人办理，依然在当前节点',
        buttonCode: 'turn',
        color: 'cyan'
      },
      {
        buttonName: '退回',
        checked: false,
        disabled: false,
        content: '退回给申请人，申请人修改完成后，流程按节点开始走',
        buttonCode: 'back',
        color: 'default'
      },
      {
        buttonName: '撤回',
        checked: false,
        disabled: false,
        content: '允许申请人对未进入流程（第一个流程节点为待处理状态）的申请进行撤回',
        buttonCode: 'revoke',
        color: 'default'
      },
      {
        buttonName: '加签',
        checked: false,
        disabled: false,
        content: '这个事情我不能完全做主，需要某些人先处理，再右我处理',
        buttonCode: 'addSign',
        color: 'warning'
      },
      {
        buttonName: '征询',
        checked: false,
        disabled: false,
        content: '征询他人意见',
        buttonCode: 'consult',
        color: 'warning'
      }
    ],
    // 审批设置
    approverGroups: [
      {
        nodeId: getId(),
        // 审批人模式
        approverType: 1,
        // 层级模式
        levelMode: 1,
        // 控件ID(人员控件、部门控件)
        controlIds: null,
        // 控件名称(人员控件、部门控件)
        controlNames: null,
        // 人员类型
        assigneeType: 1,
        // 选择方式
        selectMode: 1,
        // 选择范围
        selectRange: 1,
        // 审批人ID
        approverIds: [],
        // 审批人名称
        approverNames: []
      }
    ],
    //
    // 限时设置
    timeLimit: {
      enable: false
    },
    // 拖拽样式
    dragClass: false,
    // 拖拽工具
    dragTool: false,
    // 表单权限
    privileges: [],
    // 高级配置
    configure: {},
    // 子节点
    childNode: null,
    // 显示添加按钮
    addable: true,
    // 可删除提示
    deletable: false,
    // 是否修改
    update: false,
    // 是否有错误
    error: false,
    // 显示内容
    content: null
  };
}

/**
 * 添加自由节点
 * @param {*} type
 * @returns
 */
export function addFreeNode() {
  return {
    nodeId: getId(),
    nodeName: '自由节点',
    nodeType: 30,
    // 流程节点状态(用于只读模式, 0:未进行 1:进行中  2:已完成)
    nodeStatus: -1,
    // 流程基础配置属性
    attr: {
      // 审批类型
      approvalMethod: 1,
      // 审批方式
      approvalMode: 1,
      // 审批人与发起人为同一人时
      starterAssignee: 1,
      // 相同审批人为同一人时
      adjacent: 2,
      // 审批人为空时
      emptyFlag: 5
    },
    // 流程基础通知属性
    notice: {
      // 通知类型
      noticeType: 1,
      // 通知主题
      noticeTitle: '',
      // 通知内容
      noticeContext: ''
    },
    buttons: [
      {
        checked: false,
        disabled: true,
        buttonName: '保存',
        content: '发起节点保存操作，审批节点下无保存操作，可在草稿箱查看',
        buttonCode: 'save',
        color: 'default'
      },
      {
        buttonName: '提交',
        checked: false,
        disabled: true,
        content: '发起节点填写完申请单，,提交流程到下一步，可在我发起的查看',
        buttonCode: 'submit',
        color: 'primary'
      },
      {
        buttonName: '同意',
        checked: true,
        disabled: false,
        content: '审批节点同意该审核之操作，审批通过，可在我已办查看',
        buttonCode: 'agree',
        color: 'success'
      },
      {
        buttonName: '拒绝',
        checked: true,
        disabled: false,
        content: '节点负责人可以拒绝该流程（拒绝后流程直接结束，标记为已拒绝）',
        buttonCode: 'reject',
        color: 'error'
      },
      {
        buttonName: '转交',
        checked: true,
        disabled: false,
        content: '转交给他人办理，依然在当前节点',
        buttonCode: 'turn',
        color: 'cyan'
      },
      {
        buttonName: '退回',
        checked: false,
        disabled: false,
        content: '退回给申请人，申请人修改完成后，流程按节点开始走',
        buttonCode: 'back',
        color: 'default'
      },
      {
        buttonName: '撤回',
        checked: false,
        disabled: false,
        content: '允许申请人对未进入流程（第一个流程节点为待处理状态）的申请进行撤回',
        buttonCode: 'revoke',
        color: 'default'
      },
      {
        buttonName: '加签',
        checked: false,
        disabled: false,
        content: '这个事情我不能完全做主，需要某些人先处理，再右我处理',
        buttonCode: 'addSign',
        color: 'warning'
      }
    ],
    // 审批设置
    approverGroups: [
      {
        nodeId: getId(),
        // 审批人模式
        approverType: 1,
        // 层级模式
        levelMode: 1,
        // 控件ID(人员控件、部门控件)
        controlIds: null,
        // 控件名称(人员控件、部门控件)
        controlNames: null,
        // 人员类型
        assigneeType: 1,
        // 选择方式
        selectMode: 1,
        // 选择范围
        selectRange: 1,
        // 审批人ID
        approverIds: [],
        // 审批人名称
        approverNames: []
      }
    ],
    //
    // 限时设置
    timeLimit: {
      enable: false
    },
    // 拖拽样式
    dragClass: false,
    // 拖拽工具
    dragTool: false,
    // 表单权限
    privileges: [],
    // 高级配置
    configure: {},
    // 子节点
    childNode: null,
    // 显示添加按钮
    addable: true,
    // 可删除提示
    deletable: false,
    // 是否修改
    update: false,
    // 是否有错误
    error: false,
    // 显示内容
    content: null
  };
}

/**
 * 添加抄送节点
 * @param {*} type
 * @returns
 */
export function addCcNode(type) {
  return {
    nodeId: getId(),
    nodeName: '抄送人',
    nodeType: type,
    // 流程节点状态(用于只读模式, 0:未进行 1:进行中  2:已完成)
    nodeStatus: -1,
    // 子节点
    childNode: null,
    // 流程基础通知属性
    notice: {
      // 通知类型
      noticeType: 1,
      // 通知主题
      noticeTitle: '',
      // 通知内容
      noticeContext: ''
    },
    // 抄送人设置
    approverGroups: [
      {
        nodeId: getId(),
        // 审批人模式
        approverType: 1,
        // 层级模式
        levelMode: 1,
        // 控件ID(人员控件、部门控件)
        controlIds: null,
        // 控件名称(人员控件、部门控件)
        controlNames: null,
        // 人员类型
        assigneeType: 1,
        // 选择方式
        selectMode: 1,
        // 选择范围
        selectRange: 1,
        // 审批人ID
        approverIds: [],
        // 审批人名称
        approverNames: []
      }
    ],
    // 表单权限
    privileges: [],
    // 高级配置
    configure: {},
    // 显示添加按钮
    addable: true,
    // 可删除提示
    deletable: false,
    // 是否修改
    update: false,
    // 是否有错误
    error: false,
    // 显示内容
    content: null
  };
}

/**
 * 添加通知节点
 * @param {*} type
 * @returns
 */
export function addNoticeNode(type) {
  return {
    nodeId: getId(),
    nodeName: '通知',
    nodeType: type,
    // 流程节点状态(用于只读模式, 0:未进行 1:进行中  2:已完成)
    nodeStatus: -1,
    // 子节点
    childNode: null,
    // 流程基础通知属性
    notice: {
      // 通知类型
      noticeType: 1,
      // 通知主题
      noticeTitle: '',
      // 通知内容
      noticeContext: ''
    },
    // 审批设置
    approverGroups: [
      {
        nodeId: getId(),
        // 审批人模式
        approverType: 1,
        // 层级模式
        levelMode: 1,
        // 控件ID(人员控件、部门控件)
        controlIds: null,
        // 控件名称(人员控件、部门控件)
        controlNames: null,
        // 人员类型
        assigneeType: 1,
        // 选择方式
        selectMode: 1,
        // 选择范围
        selectRange: 1,
        // 审批人ID
        approverIds: [],
        // 审批人名称
        approverNames: []
      }
    ],
    // 显示添加按钮
    addable: true,
    // 可删除提示
    deletable: false,
    // 是否修改
    update: false,
    // 是否有错误
    error: false
  };
}

/**
 * 添加事件节点
 * @param {*} type
 * @returns
 */
export function addEventNode(type) {
  return {
    nodeId: getId(),
    nodeName: '事件',
    nodeType: type,
    // 流程节点状态(用于只读模式, 0:未进行 1:进行中  2:已完成)
    nodeStatus: -1,
    // 子节点
    childNode: null,
    // 显示添加按钮
    addable: true,
    // 可删除提示
    deletable: false,
    // 是否修改
    update: false,
    // 是否有错误
    error: false
  };
}

/**
 * 添加定时节点
 * @param {*} type
 * @returns
 */
export function addTimerNode(type) {
  return {
    nodeId: getId(),
    nodeName: '延时处理',
    nodeType: type,
    // 流程节点状态(用于只读模式, 0:未进行 1:进行中  2:已完成)
    nodeStatus: -1,
    // 子节点
    childNode: null,
    // 显示添加按钮
    addable: true,
    // 是否修改
    update: false,
    // 可删除提示
    deletable: false,
    // 是否有错误
    error: false
  };
}

/**
 * 添加办理节点
 * @param {*} type
 * @returns
 */
export function addWriteNode(type) {
  return {
    nodeId: getId(),
    nodeName: '办理',
    nodeType: type,
    // 流程节点状态(用于只读模式, 0:未进行 1:进行中  2:已完成)
    nodeStatus: -1,
    // 子节点
    childNode: null,
    // 表单权限
    privileges: [],
    // 显示添加按钮
    addable: true,
    // 可删除提示
    deletable: false,
    // 是否修改
    update: false,
    // 是否有错误
    error: false,
    // 显示内容
    content: null
  };
}

/**
 * 添加分支节点
 * @param {*} type
 * @returns
 */
export function addBranchNode(type) {
  const uid = getId();
  return {
    nodeId: uid,
    nodeName: '路由',
    nodeType: type,
    // 流程节点状态(用于只读模式, 0:未进行 1:进行中  2:已完成)
    nodeStatus: -1,
    // 子节点
    childNode: null,
    // 显示添加按钮
    addable: true,
    // 是否修改
    update: false,
    // 条件节点
    conditionNodes: [
      {
        nodeId: getId(6),
        nodePid: uid,
        nodeName: '条件1',
        nodeType: 3,
        // 流程节点状态(用于只读模式, 0:未进行 1:进行中  2:已完成)
        nodeStatus: -1,
        // 是否有错误
        error: false,
        // 子节点
        childNode: null,
        // 显示添加按钮
        addable: true,
        // 可删除提示
        deletable: false,
        // 是否修改
        update: false,
        // 条件组
        conditionGroup: [],
        // 流程基础配置属性
        attr: {
          // 分支类型
          branchType: 1,
          // 优先级
          priorityLevel: 1,
          // 显示优先级
          showPriorityLevel: true
        }
      },
      {
        nodeId: getId(10),
        nodePid: uid,
        nodeName: '默认条件',
        nodeType: 3,
        // 流程节点状态(用于只读模式, 0:未进行 1:进行中  2:已完成)
        nodeStatus: -1,
        // 子节点
        childNode: null,
        // 显示添加按钮
        addable: true,
        // 可删除提示
        deletable: false,
        // 是否修改
        update: false,
        // 条件组
        conditionGroup: [],
        // 流程基础配置属性
        attr: {
          // 分支类型
          branchType: 1,
          // 优先级
          priorityLevel: 2,
          // 显示优先级
          showPriorityLevel: true
        },
        // 是否有错误
        error: false,
        // 显示内容
        content: '不满足时，进入默认条件'
      }
    ]
  };
}

/**
 * 添加条件/并行节点
 * @param {*} node
 * @param {*} len
 * @returns
 */
export function addCondition(node, len) {
  return {
    nodePid: node.nodeId,
    nodeId: getId(),
    nodeName: (node.nodeType == 4 ? '条件' : '并行') + len,
    nodeType: node.nodeType == 4 ? 3 : 10,
    // 显示添加按钮
    addable: true,
    // 可删除提示
    deletable: false,
    // 是否修改
    update: false,
    attr: {
      // 显示优先级
      showPriorityLevel: node.nodeType == 4 ? true : false,
      // 优先级
      priorityLevel: len,
      // 分支类型
      branchType: node.nodeType == 4 ? 1 : 3
    },
    // 是否有错误
    error: false,
    // 显示内容
    content: node.nodeType == 4 ? null : '任意(默认)',
    // 子节点
    childNode: null,
    // 条件组
    conditionGroup: []
  };
}

/**
 * 添加意见分支节点
 * @param {*} type
 * @returns
 */
export function addSuggestNode(type) {
  const uid = getId();
  return {
    nodeId: uid,
    nodeName: '意见',
    nodeType: type,
    // 流程节点状态(用于只读模式, 0:未进行 1:进行中  2:已完成)
    nodeStatus: -1,
    // 子节点
    childNode: null,
    // 显示添加按钮
    addable: true,
    // 是否修改
    update: false,
    // 是否有错误
    error: false,
    conditionNodes: [
      {
        nodeId: getId(6),
        nodePid: uid,
        nodeName: '同意',
        nodeType: 8,
        // 流程基础配置属性
        attr: {
          // 优先级
          priorityLevel: 2
        },
        // 流程节点状态(用于只读模式, 0:未进行 1:进行中  2:已完成)
        nodeStatus: -1,
        // 子节点
        childNode: null,
        // 显示添加按钮
        addable: true,
        // 可删除提示
        deletable: false,
        // 是否修改
        update: false,
        // 表示同意
        suggest: 1,
        // 是否有错误
        error: false
      },
      {
        nodeId: getId(10),
        nodePid: uid,
        nodeName: '不同意',
        nodeType: 8,
        // 流程基础配置属性
        attr: {
          // 优先级
          priorityLevel: 2
        },
        // 流程节点状态(用于只读模式, 0:未进行 1:进行中  2:已完成)
        nodeStatus: -1,
        // 子节点
        childNode: null,
        // 显示添加按钮
        addable: true,
        // 可删除提示
        deletable: false,
        // 是否修改
        update: false,
        // 表示不同意
        suggest: 1,
        // 是否有错误
        error: false
      }
    ]
  };
}

/**
 * 添加并行节点
 * @param {*} type
 * @returns
 */
export function addParallelNode(type) {
  const uid = getId();
  return {
    nodeId: uid,
    nodeName: '并行',
    nodeType: type,
    // 流程节点状态(用于只读模式, 0:未进行 1:进行中  2:已完成)
    nodeStatus: -1,
    // 显示添加按钮
    addable: true,
    // 是否修改
    update: false,
    // 聚合节点
    childNode: {
      nodeId: getId(6),
      nodePid: uid,
      nodeName: '聚合',
      nodeType: 11,
      nodeStatus: -1,
      childNode: null,
      // 显示添加按钮
      addable: true,
      // 可删除提示
      deletable: false,
      // 是否修改
      update: false
    },
    conditionNodes: [
      {
        nodeId: getId(10),
        nodePid: uid,
        nodeName: '并行1',
        nodeType: 10,
        // 流程节点状态(用于只读模式, 0:未进行 1:进行中  2:已完成)
        nodeStatus: -1,
        // 是否有错误
        error: false,
        // 显示内容
        content: '任意(其他)',
        // 子节点
        childNode: null,
        // 显示添加按钮
        addable: true,
        // 可删除提示
        deletable: false,
        // 是否修改
        update: false,
        // 流程基础配置属性
        attr: {
          // 分支类型
          branchType: 3
        },
        // 条件组
        conditionGroup: []
      },
      {
        nodeId: getId(),
        nodePid: uid,
        nodeName: '并行2',
        nodeType: 10,
        // 流程节点状态(用于只读模式, 0:未进行 1:进行中  2:已完成)
        nodeStatus: -1,
        // 是否有错误
        error: false,
        // 显示内容
        content: '任意(其他)',
        // 子节点
        childNode: null,
        // 显示添加按钮
        addable: true,
        // 可删除提示
        deletable: false,
        // 是否修改
        update: false,
        // 流程基础配置属性
        attr: {
          // 分支类型
          branchType: 3
        },
        // 条件组
        conditionGroup: []
      }
    ]
  };
}
