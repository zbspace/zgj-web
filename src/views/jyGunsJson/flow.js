const flow = {
  createTime: '2022-11-27 12: 31: 00',
  createUser: '1339550467939639299',
  updateTime: null,
  updateUser: null,
  nodeId: '1596723224647921665',
  modelId: '1596550552731209730',
  definitionId: '1596550552739598338',
  nodePid: null,
  nodeName: '发起人',
  nodeType: 0,
  addable: true,
  deletable: false,
  error: false,
  content: '已设置',
  remark: null,
  nodeStatus: -1,
  delFlag: 'N',
  versionFlag: '0',
  tenantId: null,
  attr: null,
  childNode: {
    createTime: '2022-11-27 12: 31: 00',
    createUser: '1339550467939639299',
    updateTime: null,
    updateUser: null,
    nodeId: '1596723224647921666',
    modelId: '1596550552731209730',
    definitionId: '1596550552739598338',
    nodePid: '1596723224647921665',
    nodeName: '审批人',
    nodeType: 1,
    addable: true,
    deletable: false,
    error: false,
    content: '指定成员:张三\n',
    remark: null,
    nodeStatus: -1,
    delFlag: 'N',
    versionFlag: '0',
    tenantId: null,
    attr: {
      createTime: '2022-11-27 12: 31: 00',
      createUser: '1339550467939639299',
      updateTime: null,
      updateUser: null,
      approvalAttrId: '1596723224715030537',
      modelId: '1596550552731209730',
      definitionId: '1596550552739598338',
      nodeId: '1596723224647921666',
      approvalMethod: 1,
      approvalMode: 1,
      starterAssignee: 1,
      adjacent: 2,
      emptyFlag: null,
      branchType: null,
      showPriorityLevel: null,
      priorityLevel: null,
      versionFlag: '0',
      tenantId: null
    },
    childNode: null,
    conditionNodes: [],
    privileges: [
      {
        createTime: '2022-11-27 12: 31: 00',
        createUser: '1339550467939639299',
        updateTime: null,
        updateUser: null,
        nodePrivilegesId: '1596723235200790529',
        modelId: '1596550552731209730',
        definitionId: '1596550552739598338',
        nodeId: '1596723224647921666',
        formId: '1589976128312606721',
        fieldId: '1589976917521235970',
        fieldName: null,
        fieldKey: null,
        fieldModel: null,
        name: '合同名称',
        writable: true,
        readable: false,
        displayable: false,
        required: false,
        tenantId: null
      },
      {
        createTime: '2022-11-27 12: 31: 00',
        createUser: '1339550467939639299',
        updateTime: null,
        updateUser: null,
        nodePrivilegesId: '1596723235200790530',
        modelId: '1596550552731209730',
        definitionId: '1596550552739598338',
        nodeId: '1596723224647921666',
        formId: '1589976128312606721',
        fieldId: '1589976917521235972',
        fieldName: null,
        fieldKey: null,
        fieldModel: null,
        name: '公司主体',
        writable: true,
        readable: false,
        displayable: false,
        required: false,
        tenantId: null
      },
      {
        createTime: '2022-11-27 12: 31: 00',
        createUser: '1339550467939639299',
        updateTime: null,
        updateUser: null,
        nodePrivilegesId: '1596723235200790531',
        modelId: '1596550552731209730',
        definitionId: '1596550552739598338',
        nodeId: '1596723224647921666',
        formId: '1589976128312606721',
        fieldId: '1589976917521235974',
        fieldName: null,
        fieldKey: null,
        fieldModel: null,
        name: '项目名称',
        writable: true,
        readable: false,
        displayable: false,
        required: false,
        tenantId: null
      }
    ],
    approverGroups: [
      {
        createTime: '2022-11-27 12: 31: 00',
        createUser: '1339550467939639299',
        updateTime: null,
        updateUser: null,
        nodeApproverId: '1596723235259510786',
        modelId: '1596550552731209730',
        definitionId: '1596550552739598338',
        nodeId: '1596723224647921666',
        approverType: 8,
        approverTypeName: '指定成员',
        levelMode: 1,
        selectMode: null,
        selectRange: null,
        orgId: '1339554696976781407',
        orgName: null,
        approverIds: ['1596710445991956482'],
        approverNames: ['张三'],
        versionFlag: '0',
        tenantId: null
      }
    ],
    conditionGroup: [],
    buttons: [
      {
        createTime: '2022-11-27 12: 31: 00',
        createUser: '1339550467939639299',
        updateTime: null,
        updateUser: null,
        buttonId: '1596723235209179137',
        modelId: '1596550552731209730',
        definitionId: '1596550552739598338',
        nodeId: '1596723224647921666',
        buttonType: 1,
        buttonName: '保存',
        buttonCode: 'save',
        checked: false,
        disabled: true,
        color: 'default',
        content: '发起节点保存操作，审批节点下无保存操作，可在草稿箱查看',
        statusFlag: 1,
        versionFlag: '0',
        delFlag: 'N',
        tenantId: null
      },
      {
        createTime: '2022-11-27 12: 31: 00',
        createUser: '1339550467939639299',
        updateTime: null,
        updateUser: null,
        buttonId: '1596723235209179138',
        modelId: '1596550552731209730',
        definitionId: '1596550552739598338',
        nodeId: '1596723224647921666',
        buttonType: 1,
        buttonName: '提交',
        buttonCode: 'submit',
        checked: false,
        disabled: true,
        color: 'primary',
        content: '发起节点填写完申请单，,提交流程到下一步，可在我发起的查看',
        statusFlag: 1,
        versionFlag: '0',
        delFlag: 'N',
        tenantId: null
      },
      {
        createTime: '2022-11-27 12: 31: 00',
        createUser: '1339550467939639299',
        updateTime: null,
        updateUser: null,
        buttonId: '1596723235209179139',
        modelId: '1596550552731209730',
        definitionId: '1596550552739598338',
        nodeId: '1596723224647921666',
        buttonType: 1,
        buttonName: '同意',
        buttonCode: 'agree',
        checked: true,
        disabled: false,
        color: 'success',
        content: '审批节点同意该审核之操作，审批通过，可在我已办查看',
        statusFlag: 1,
        versionFlag: '0',
        delFlag: 'N',
        tenantId: null
      },
      {
        createTime: '2022-11-27 12: 31: 00',
        createUser: '1339550467939639299',
        updateTime: null,
        updateUser: null,
        buttonId: '1596723235209179140',
        modelId: '1596550552731209730',
        definitionId: '1596550552739598338',
        nodeId: '1596723224647921666',
        buttonType: 1,
        buttonName: '拒绝',
        buttonCode: 'reject',
        checked: true,
        disabled: false,
        color: 'error',
        content: '节点负责人可以拒绝该流程（拒绝后流程直接结束，标记为已拒绝）',
        statusFlag: 1,
        versionFlag: '0',
        delFlag: 'N',
        tenantId: null
      },
      {
        createTime: '2022-11-27 12: 31: 00',
        createUser: '1339550467939639299',
        updateTime: null,
        updateUser: null,
        buttonId: '1596723235209179141',
        modelId: '1596550552731209730',
        definitionId: '1596550552739598338',
        nodeId: '1596723224647921666',
        buttonType: 1,
        buttonName: '转交',
        buttonCode: 'turn',
        checked: true,
        disabled: false,
        color: 'cyan',
        content: '转交给他人办理，依然在当前节点',
        statusFlag: 1,
        versionFlag: '0',
        delFlag: 'N',
        tenantId: null
      },
      {
        createTime: '2022-11-27 12: 31: 00',
        createUser: '1339550467939639299',
        updateTime: null,
        updateUser: null,
        buttonId: '1596723235209179142',
        modelId: '1596550552731209730',
        definitionId: '1596550552739598338',
        nodeId: '1596723224647921666',
        buttonType: 1,
        buttonName: '退回',
        buttonCode: 'back',
        checked: false,
        disabled: false,
        color: 'default',
        content: '退回给申请人，申请人修改完成后，流程按节点开始走',
        statusFlag: 1,
        versionFlag: '0',
        delFlag: 'N',
        tenantId: null
      },
      {
        createTime: '2022-11-27 12: 31: 00',
        createUser: '1339550467939639299',
        updateTime: null,
        updateUser: null,
        buttonId: '1596723235209179143',
        modelId: '1596550552731209730',
        definitionId: '1596550552739598338',
        nodeId: '1596723224647921666',
        buttonType: 1,
        buttonName: '撤回',
        buttonCode: 'revoke',
        checked: false,
        disabled: false,
        color: 'default',
        content:
          '允许申请人对未进入流程（第一个流程节点为待处理状态）的申请进行撤回',
        statusFlag: 1,
        versionFlag: '0',
        delFlag: 'N',
        tenantId: null
      },
      {
        createTime: '2022-11-27 12: 31: 00',
        createUser: '1339550467939639299',
        updateTime: null,
        updateUser: null,
        buttonId: '1596723235209179144',
        modelId: '1596550552731209730',
        definitionId: '1596550552739598338',
        nodeId: '1596723224647921666',
        buttonType: 1,
        buttonName: '加签',
        buttonCode: 'addSign',
        checked: false,
        disabled: false,
        color: 'warning',
        content: '这个事情我不能完全做主，需要某些人先处理，再右我处理',
        statusFlag: 1,
        versionFlag: '0',
        delFlag: 'N',
        tenantId: null
      }
    ],
    notice: {
      createTime: '2022-11-27 12: 31: 00',
      createUser: '1339550467939639299',
      updateTime: null,
      updateUser: null,
      noticeId: '1596723235230150657',
      modelId: '1596550552731209730',
      definitionId: '1596550552739598338',
      nodeId: '1596723224647921666',
      noticeTemplet: null,
      noticeType: 1,
      noticeTitle: '',
      noticeContext: '',
      phones: null,
      mails: null,
      tenantId: null
    },
    update: true
  },
  conditionNodes: [],
  privileges: [
    {
      createTime: '2022-11-27 12: 30: 57',
      createUser: '1339550467939639299',
      updateTime: null,
      updateUser: null,
      nodePrivilegesId: '1596723224647921667',
      modelId: '1596550552731209730',
      definitionId: '1596550552739598338',
      nodeId: '1596723224647921665',
      formId: '1589976128312606721',
      fieldId: '1589976917521235970',
      fieldName: null,
      fieldKey: null,
      fieldModel: null,
      name: '合同名称',
      writable: true,
      readable: false,
      displayable: false,
      required: false,
      tenantId: null
    },
    {
      createTime: '2022-11-27 12: 30: 57',
      createUser: '1339550467939639299',
      updateTime: null,
      updateUser: null,
      nodePrivilegesId: '1596723224647921668',
      modelId: '1596550552731209730',
      definitionId: '1596550552739598338',
      nodeId: '1596723224647921665',
      formId: '1589976128312606721',
      fieldId: '1589976917521235972',
      fieldName: null,
      fieldKey: null,
      fieldModel: null,
      name: '公司主体',
      writable: true,
      readable: false,
      displayable: false,
      required: false,
      tenantId: null
    },
    {
      createTime: '2022-11-27 12: 30: 57',
      createUser: '1339550467939639299',
      updateTime: null,
      updateUser: null,
      nodePrivilegesId: '1596723224647921669',
      modelId: '1596550552731209730',
      definitionId: '1596550552739598338',
      nodeId: '1596723224647921665',
      formId: '1589976128312606721',
      fieldId: '1589976917521235974',
      fieldName: null,
      fieldKey: null,
      fieldModel: null,
      name: '项目名称',
      writable: true,
      readable: false,
      displayable: false,
      required: false,
      tenantId: null
    }
  ],
  approverGroups: [],
  conditionGroup: [],
  buttons: [
    {
      createTime: '2022-11-27 12: 30: 57',
      createUser: '1339550467939639299',
      updateTime: null,
      updateUser: null,
      buttonId: '1596723224647921670',
      modelId: '1596550552731209730',
      definitionId: '1596550552739598338',
      nodeId: '1596723224647921665',
      buttonType: 1,
      buttonName: '保存',
      buttonCode: 'save',
      checked: true,
      disabled: false,
      color: 'default',
      content: '发起节点保存操作，审批节点下无保存操作，可在草稿箱查看',
      statusFlag: 1,
      versionFlag: '0',
      delFlag: 'N',
      tenantId: null
    },
    {
      createTime: '2022-11-27 12: 30: 57',
      createUser: '1339550467939639299',
      updateTime: null,
      updateUser: null,
      buttonId: '1596723224715030530',
      modelId: '1596550552731209730',
      definitionId: '1596550552739598338',
      nodeId: '1596723224647921665',
      buttonType: 1,
      buttonName: '提交',
      buttonCode: 'submit',
      checked: true,
      disabled: false,
      color: 'primary',
      content: '发起节点填写完申请单，,提交流程到下一步，可在我发起的查看',
      statusFlag: 1,
      versionFlag: '0',
      delFlag: 'N',
      tenantId: null
    },
    {
      createTime: '2022-11-27 12: 30: 57',
      createUser: '1339550467939639299',
      updateTime: null,
      updateUser: null,
      buttonId: '1596723224715030531',
      modelId: '1596550552731209730',
      definitionId: '1596550552739598338',
      nodeId: '1596723224647921665',
      buttonType: 1,
      buttonName: '同意',
      buttonCode: 'agree',
      checked: false,
      disabled: true,
      color: 'success',
      content: '审批节点同意该审核之操作，审批通过，可在我已办查看',
      statusFlag: 1,
      versionFlag: '0',
      delFlag: 'N',
      tenantId: null
    },
    {
      createTime: '2022-11-27 12: 30: 57',
      createUser: '1339550467939639299',
      updateTime: null,
      updateUser: null,
      buttonId: '1596723224715030532',
      modelId: '1596550552731209730',
      definitionId: '1596550552739598338',
      nodeId: '1596723224647921665',
      buttonType: 1,
      buttonName: '拒绝',
      buttonCode: 'reject',
      checked: false,
      disabled: true,
      color: 'error',
      content: '节点负责人可以拒绝该流程（拒绝后流程直接结束，标记为已拒绝）',
      statusFlag: 1,
      versionFlag: '0',
      delFlag: 'N',
      tenantId: null
    },
    {
      createTime: '2022-11-27 12: 30: 57',
      createUser: '1339550467939639299',
      updateTime: null,
      updateUser: null,
      buttonId: '1596723224715030533',
      modelId: '1596550552731209730',
      definitionId: '1596550552739598338',
      nodeId: '1596723224647921665',
      buttonType: 1,
      buttonName: '转交',
      buttonCode: 'turn',
      checked: false,
      disabled: true,
      color: 'cyan',
      content: '转交给他人办理，依然在当前节点',
      statusFlag: 1,
      versionFlag: '0',
      delFlag: 'N',
      tenantId: null
    },
    {
      createTime: '2022-11-27 12: 30: 57',
      createUser: '1339550467939639299',
      updateTime: null,
      updateUser: null,
      buttonId: '1596723224715030534',
      modelId: '1596550552731209730',
      definitionId: '1596550552739598338',
      nodeId: '1596723224647921665',
      buttonType: 1,
      buttonName: '退回',
      buttonCode: 'back',
      checked: false,
      disabled: true,
      color: 'default',
      content: '退回给申请人，申请人修改完成后，流程按节点开始走',
      statusFlag: 1,
      versionFlag: '0',
      delFlag: 'N',
      tenantId: null
    },
    {
      createTime: '2022-11-27 12: 30: 57',
      createUser: '1339550467939639299',
      updateTime: null,
      updateUser: null,
      buttonId: '1596723224715030535',
      modelId: '1596550552731209730',
      definitionId: '1596550552739598338',
      nodeId: '1596723224647921665',
      buttonType: 1,
      buttonName: '撤回',
      buttonCode: 'revoke',
      checked: false,
      disabled: true,
      color: 'default',
      content:
        '允许申请人对未进入流程（第一个流程节点为待处理状态）的申请进行撤回',
      statusFlag: 1,
      versionFlag: '0',
      delFlag: 'N',
      tenantId: null
    },
    {
      createTime: '2022-11-27 12: 30: 57',
      createUser: '1339550467939639299',
      updateTime: null,
      updateUser: null,
      buttonId: '1596723224715030536',
      modelId: '1596550552731209730',
      definitionId: '1596550552739598338',
      nodeId: '1596723224647921665',
      buttonType: 1,
      buttonName: '加签',
      buttonCode: 'addSign',
      checked: false,
      disabled: true,
      color: 'warning',
      content: '这个事情我不能完全做主，需要某些人先处理，再右我处理',
      statusFlag: 1,
      versionFlag: '0',
      delFlag: 'N',
      tenantId: null
    }
  ],
  notice: {
    createTime: null,
    createUser: null,
    updateTime: null,
    updateUser: null,
    noticeId: null,
    modelId: null,
    definitionId: null,
    nodeId: null,
    noticeTemplet: null,
    noticeType: 1,
    noticeTitle: null,
    noticeContext: null,
    phones: null,
    mails: null,
    tenantId: null
  },
  update: true
}
export default flow
