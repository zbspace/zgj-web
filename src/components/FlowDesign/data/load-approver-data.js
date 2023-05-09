import { reactive } from 'vue'
import useCommon from '../hooks/useCommon'
// 公共
const { getId } = useCommon()

export default function () {
  // 审批类型
  const approvalMethods = reactive([
    {
      name: '人工审批',
      value: 1
    }
    /*  {
      name: '自动通过',
      value: 2
    },
    {
      name: '自动拒绝',
      value: 3
    } */
  ])

  // 审批方式
  const approvalModes = reactive([
    // {
    //   name: '单人审批(只能选一个人)',
    //   value: 1
    // },
    {
      name: '会签(所有人都通过才到下一个环节)',
      value: 2
    },
    // {
    //   name: '多人会签(通过只需一人,拒绝需全员)',
    //   value: 3
    // },
    {
      name: '或签(一人通过或拒绝)',
      value: 4
    },
    {
      name: '依次审批(一人通过再到下一个人处理)',
      value: 5
    }
  ])

  // 审批人与发起人为同一人时
  const sameApprovals = reactive([
    {
      name: '自动跳过',
      value: 1,
      popovers: [
        {
          title: '什么是自动跳过？',
          content: '如果审批人与发起人为同一人时,直接跳过，无需审批'
        }
      ]
    },
    {
      name: '转交给直属上级审批',
      value: 2,
      popovers: [
        {
          title: '什么是转交给直属上级审批？',
          content: '若直属上级为空，则自动通过'
        }
      ]
    },
    {
      name: '转交给部门负责人审批',
      value: 3,
      popovers: [
        {
          title: '什么是转交给部门负责人审批？',
          content: '若部门负责人为空，则自动通过'
        }
      ]
    }
    /* {
      name: '由发起人对自己审批',
      value: 4
    } */
  ])

  // 相邻审批节点为同一人时
  const adjacentApprovals = reactive([
    {
      name: '自动跳过',
      value: 1,
      popovers: [
        {
          title: '什么是自动跳过？',
          content: '如果相邻审批节点为同一人时,只需要审批一次即可'
        }
      ]
    },
    {
      name: '不自动跳过',
      value: 2,
      popovers: [
        {
          title: '不自动跳过？',
          content:
            '如果相邻审批节点为同一人时,每个节点都需要手动审批，需要审批多次'
        }
      ]
    }
  ])

  // 审批人为空时
  const approvalWithNulls = reactive([
    {
      name: '自动跳过',
      value: 1,
      popovers: [
        {
          title: '什么是自动跳过？',
          content:
            '当该审批节点没有审批人的时候，审批单将自动跳过，最后节点除外'
        }
      ]
    },
    {
      name: '指定人员审批',
      value: 2
    },
    // {
    //   name: '找不到主管时，由上级主管代审批',
    //   value: 3,
    //   popovers: [
    //     {
    //       title: '什么是由上级主管代审批？',
    //       content: '当该角色或主管没有人的时候，审批单将自动通过'
    //     }
    //   ]
    // },
    {
      name: '转交给审批管理员',
      value: 4,
      popovers: [
        {
          title: '什么是转交给审批管理员？',
          content: '若审批人为空，则自动转交给该审批流程的管理员'
        },
        {
          content:
            '提示：可在“基础信息 - 谁可以管理这个审批”中，查看和编辑该审批流程的管理员'
        }
      ]
    }
    // {
    //   name: '给出异常提示,待管理员指定',
    //   value: 5,
    //   popovers: [
    //     {
    //       title: '什么是给出异常提示,待管理员指定？',
    //       content:
    //         '若审批人为空，则在页面给出反馈,并且纳入到异常流程中,管理员处理'
    //     },
    //     {
    //       content:
    //         '提示：可在“基础信息 - 谁可以管理这个审批”中，查看和编辑该审批流程的管理员'
    //     }
    //   ]
    // }
  ])
  // --------------------------------------------------------------------
  // 审批人项
  const approvals = reactive([
    {
      name: '指定审批人',
      value: 8,
      disabled: false,
      // 是否可以多个组
      addable: true,
      // 是否多个
      multiple: true
    },
    {
      name: '指定角色',
      value: 5,
      disabled: false,
      // 是否可以多个组
      addable: true,
      // 是否多个
      multiple: true,
      popovers: [
        {
          title: '什么是角色？',
          content:
            '系統角色指团队成员的专业分工类别，如人事、行政、财务等，每类角色可由 1 位或多位成员组成'
        },
        {
          title: '如何使用？',
          content:
            '用角色作为审批人，当有成员离职变动时，该角色中的其他成员可继续完成审批，从而避免审批流程失效的情况'
        },
        {
          content:
            '提示：若选择的角色中包含多名成员，则按照设置“多人审批时采用的审批方式”来处理'
        }
      ],
      href: '',
      hrefName: ''
    },
    {
      name: '直接主管',
      code: 'higherLevel',
      value: 1,
      // 多个组时需要disabled
      disabled: false,
      // 是否可以多个组
      addable: true,
      // 是否多个
      multiple: false
    },
    {
      name: '部门负责人',
      value: 2,
      disabled: false,
      // 是否可以多个组
      addable: true,
      // 是否多个
      multiple: false,
      popovers: [
        {
          title: '什么是部门负责人审批？',
          content: '这里指在管理后台 - 组织架构中所设置的部门负责人'
        },
        {
          title: '什么是部门负责人审批？',
          content:
            '部门负责人审批与上级审批的区别？一个部门内可能存在多层的上下级关系，但通常有指定的部门负责人。由部门负责人审批 ，则不涉及上下级关系，直接由该固定人员进行审批'
        }
      ],
      href: '',
      hrefName: ''
    },
    {
      name: '发起人自选',
      value: 9,
      // 多个组时需要disabled
      disabled: true,
      // 是否可以多个组
      addable: false,
      // 是否多个
      multiple: true
    }
    // {
    //   name: '部门审批人',
    //   value: 3,
    //   disabled: false,
    //   // 是否可以多个组
    //   addable: true,
    //   // 是否多个
    //   multiple: false,
    //   popovers: [
    //     {
    //       title: '什么是部门负责人审批？',
    //       content: '这里指在管理后台 - 组织架构中所设置的部门负责人'
    //     },
    //     {
    //       title: '什么是部门负责人审批？',
    //       content:
    //         '部门负责人审批与上级审批的区别？一个部门内可能存在多层的上下级关系，但通常有指定的部门负责人。由部门负责人审批 ，则不涉及上下级关系，直接由该固定人员进行审批'
    //     }
    //   ],
    //   href: 'https://www.feishu.cn/hc/zh-CN/articles/360044810913',
    //   hrefName: '如何配置部门负责人？'
    // },
    /*  {
      name: '编码审批人',
      value: 4,
      // 是否多个
      multiple: false,
      popovers: [
        {
          title: '什么是部门负责人审批？',
          content: '这里指在管理后台 - 组织架构中所设置的部门负责人'
        },
        {
          title: '什么是部门负责人审批？',
          content:
            '部门负责人审批与上级审批的区别？一个部门内可能存在多层的上下级关系，但通常有指定的部门负责人。由部门负责人审批 ，则不涉及上下级关系，直接由该固定人员进行审批'
        }
      ],
      href: 'https://www.feishu.cn/hc/zh-CN/articles/360044810913',
      hrefName: '如何配置部门负责人？'
    }, */
    // {
    //   name: '系統岗位',
    //   value: 6,
    //   disabled: false,
    //   // 是否可以多个组
    //   addable: true,
    //   // 是否多个
    //   multiple: true,
    //   popovers: [
    //     {
    //       title: '什么是岗位？',
    //       content:
    //         '岗位指团队成员的所处工作职务，一般指的是行政职务，如总监、经理、人事专员、行政助理、财务专员等，每类岗位可由 1 位或多位成员组成'
    //     },
    //     {
    //       title: '如何使用？',
    //       content: '用岗位作为审批人，当有成员离职变动时，该岗位中的其他成员可继续完成审批，从而避免审批流程失效的情况'
    //     },
    //     {
    //       content: '提示：若选择的岗位中包含多名成员，则按照设置“多人审批时采用的审批方式”来处理'
    //     }
    //   ],
    //   href: 'https://www.feishu.cn/hc/zh-CN/articles/360044810913',
    //   hrefName: '如何配置岗位？'
    // },
    /* {
      name: '用户组',
      value: 7,
      disabled: false,
      // 是否可以多个组
      addable: true,
      // 是否多个
      multiple: true,
      popovers: [
        {
          title: '什么是用户组？',
          content: '用户组主要用于权限管控，设置某个用户组作为审批人，则只有该用户组中的成员可进行审批。'
        },
        {
          title: '如何使用？',
          content: '用户组主要用于权限管控，设置某个用户组作为审批人，则只有该用户组中的成员可进行审批。'
        },
        {
          content: '提示：若选择的用户组中包含多名成员，则按照设置“多人审批时采用的审批方式”来处理'
        }
      ],
      href: 'https://www.feishu.cn/hc/zh-CN/articles/360044810913',
      hrefName: '如何配置用户组？'
    } , */
    // {
    //   name: '发起人自己',
    //   value: 10,
    //   disabled: true,
    //   // 是否可以多个组
    //   addable: true,
    //   // 是否多个
    //   multiple: false,
    //   popovers: [
    //     {
    //       title: '什么是发起人审批？',
    //       content: '将发起人自己设置为审批人，可用于需要发起人进行信息复核的场景'
    //     }
    //   ]
    // },
    // {
    //   name: '节点审批人',
    //   value: 11,
    //   disabled: true,
    //   // 是否可以多个组
    //   addable: true,
    //   // 是否多个
    //   multiple: false,
    //   popovers: [
    //     {
    //       title: '什么是节点审批人？',
    //       content:
    //         '通过选择前面已经配置的节点进行关联，流程执行时自动获取所有关联审批节点中的实际审批人作为当前节点的审批人'
    //     },
    //     {
    //       content:
    //         '节点审批人默认为多人审批，不会从关联的审批节点继承，需单独设置审批方式'
    //     },
    //     {
    //       content:
    //         '当前节点为节点审批人时，同一审批人重复审批将不会触发自动通过'
    //     },
    //     {
    //       title: '如何关联节点？',
    //       content: '可以选择前序节点的名称进行关联'
    //     }
    //   ]
    // },
    /* {
      name: '交叉审批',
      value: 15,
      disabled: true,
      // 是否可以多个组
      addable: true,
      // 是否多个
      multiple: false,
      popovers: [
        {
          title: '什么是部门负责人交叉审批？',
          content: '工程部、技术部互审，如:工程部发起的，则需要技术部负责人审批'
        }
      ]
    },
    {
      name: '项目角色',
      value: 16,
      disabled: false,
      // 是否可以多个组
      addable: true,
      // 是否多个
      multiple: true,
      popovers: [
        {
          title: '什么是项目角色？',
          content: '项目角色指团队成员的专业分工类别，如人事、行政、财务等，每类角色可由 1 位或多位成员组成,只在项目中存在的'
        },
        {
          title: '如何使用？',
          content: '用项目角色作为审批人，会根据所选择的项目角色进行审批，当有成员离职变动时，该角色中的其他成员可继续完成审批，从而避免审批流程失效的情况'
        },
        {
          content: '提示：若选择的角色中包含多名成员，则按照设置“多人审批时采用的审批方式”来处理'
        }
      ],
      href: 'system/user',
      hrefName: '如何配置角色？'
    },
    {
      name: '项目成员',
      value: 17,
      disabled: true,
      // 是否可以多个组
      addable: true,
      // 是否多个
      multiple: true,
      popovers: [
        {
          title: '什么是项目成员审批？',
          content: '当前项目所有成员审批'
        }
      ]
    },
    {
      name: '部门成员',
      value: 18,
      disabled: false,
      // 是否可以多个组
      addable: true,
      // 是否多个
      multiple: true,
      popovers: [
        {
          title: '什么是部门成员审批？',
          content: '当前项目对应的部门所有成员审批'
        }
      ]
    },
    {
      name: '部门及角色',
      value: 19,
      disabled: false,
      // 是否可以多个组
      addable: true,
      // 是否多个
      multiple: false,
      popovers: [
        {
          title: '什么是部门及角色审批？',
          content: ''
        },
        {
          title: '选择部门是什么意思？',
          content: '这里指没有选择部门为当前项目的部门'
        },
        {
          title: '选择角色是什么意思？',
          content: '这里指没有选择角色为当前项目的角色的审批人'
        }
      ],
      href: 'system/user',
      hrefName: '如何配置项目部门？'
    }, */
    // {
    //   name: '选择审批',
    //   value: 20,
    //   disabled: false,
    //   // 是否可以多个组
    //   addable: true,
    //   // 是否多个
    //   multiple: false,
    //   popovers: [
    //     {
    //       title: '什么是选择审批？',
    //       content:
    //         '在当前节点配置候选人,当前一个节点审批时,可以指定一个或多个候选人作为当前节点的审批人'
    //     }
    //   ]
    // },
    // {
    //   name: '连续多级上级审批',
    //   value: 12,
    //   disabled: true,
    //   // 是否可以多个组
    //   addable: true,
    //   // 是否多个
    //   multiple: false,
    //   popovers: [
    //     {
    //       title: '什么是连续多级上级审批？',
    //       content:
    //         '从发起人的直属上级开始，依次逐级向上审批，直到所设置的审批终点为止。是手动逐个添加多级上级审批的一种便捷设置'
    //     }
    //   ],
    //   href: 'https://www.feishu.cn/hc/zh-CN/articles/360044810913',
    //   hrefName: '查看和设置上级信息'
    // },
    // {
    //   name: '表单内人员',
    //   value: 13,
    //   disabled: true,
    //   // 是否可以多个组
    //   addable: true,
    //   // 是否多个
    //   multiple: false,
    //   popovers: [
    //     {
    //       title: '如何配置表单内人员？',
    //       content:
    //         '在表单设计中添加人员控件后，该人员/其上级/部门负责人将可以配置为本节点的审批人。'
    //     }
    //   ]
    // },
    // {
    //   name: '表单内部门',
    //   value: 14,
    //   disabled: true,
    //   // 是否可以多个组
    //   addable: true,
    //   // 是否多个
    //   multiple: false,
    //   popovers: [
    //     {
    //       title: '何配置表单内部门？',
    //       content:
    //         '在表单设计中添加部门控件后，其部门负责人可以配置为本节点的审批人。'
    //     }
    //   ]
    // }
  ])

  // 上级方式
  const higherLevelModes = reactive([
    {
      name: '自下而上（以发起人的直属上级为第一级）',
      value: 1,
      popovers: [
        {
          title: '什么是上级 - 自下而上？',
          content: '以发起人的直属上级为第一级，向更高管理层级递增'
        },
        {
          content:
            '图示：若小王为发起人，则小张是小王的“直属上级”，小李是小王的“第二级上级”'
        }
      ],
      href: 'https://www.feishu.cn/hc/zh-CN/articles/360044810913',
      hrefName: '查看和设置上级信息'
    },
    {
      name: '自上而下（以公司的最高上级为第一级）',
      code: 'higherLevel',
      value: 2,
      popovers: [
        {
          title: '什么是上级 - 自上而下？',
          content: '以公司组织架构中的最高上级为第一级，向更低管理层级递增'
        },
        {
          content:
            '图示：若小王为发起人，则小赵是小王的“最高上级”，小周是小王的“第二级上级”'
        }
      ],
      href: 'https://www.feishu.cn/hc/zh-CN/articles/360044810913',
      hrefName: '查看和设置上级信息'
    }
  ])
  // 上级层级
  const higherLevels = reactive([
    {
      name: '直属上级',
      value: '1'
    },
    {
      name: '直属上级加1级',
      value: '2'
    },
    {
      name: '直属上级加2级',
      value: '3'
    },
    {
      name: '直属上级加3级',
      value: '4'
    },
    {
      name: '直属上级加4级',
      value: '5'
    },
    {
      name: '直属上级加5级',
      value: '6'
    },
    {
      name: '直属上级加6级',
      value: '7'
    },
    {
      name: '直属上级加7级',
      value: '8'
    },
    {
      name: '直属上级加8级',
      value: '9'
    },
    {
      name: '直属上级加9级',
      value: '10'
    },
    {
      name: '直属上级加10级',
      value: '11'
    },
    {
      name: '直属上级加11级',
      value: '12'
    },
    {
      name: '直属上级加12级',
      value: '13'
    },
    {
      name: '直属上级加13级',
      value: '14'
    },
    {
      name: '直属上级加14级',
      value: '15'
    },
    {
      name: '直属上级加15级',
      value: '16'
    },
    {
      name: '直属上级加16级',
      value: '17'
    },
    {
      name: '直属上级加17级',
      value: '18'
    },
    {
      name: '直属上级加18级',
      value: '19'
    },
    {
      name: '直属上级加19级',
      value: '20'
    }
  ])

  const reverseHigherLevels = reactive([
    {
      name: '最高上级',
      value: '1'
    },
    {
      name: '最高上级减1级',
      value: '2'
    },
    {
      name: '最高上级减2级',
      value: '3'
    },
    {
      name: '最高上级减3级',
      value: '4'
    },
    {
      name: '最高上级减4级',
      value: '5'
    },
    {
      name: '最高上级减5级',
      value: '6'
    },
    {
      name: '最高上级减6级',
      value: '7'
    },
    {
      name: '最高上级减7级',
      value: '8'
    },
    {
      name: '最高上级减8级',
      value: '9'
    },
    {
      name: '最高上级减9级',
      value: '10'
    },
    {
      name: '最高上级减10级',
      value: '11'
    },
    {
      name: '最高上级减11级',
      value: '12'
    }
  ])

  // 部门负责人方式
  const departmentHeadModes = reactive([
    {
      name: '自下而上（以发起人的直接部门负责人为第一级）',
      value: 1,
      popovers: [
        {
          title: '什么是部门负责人 - 自下而上？',
          content: '以发起人的直接部门负责人为第一级，向更高管理层级递增'
        },
        {
          content:
            '图示：若小王为发起人，则小张是小王的“直接部门负责人”，小李是小王的“第二级部门负责人”'
        }
      ],
      href: 'https://www.feishu.cn/hc/zh-CN/articles/360044810913',
      hrefName: '如何配置部门负责人？'
    },
    {
      name: '自上而下（以公司的最高部门负责人为第一级）',
      code: 'higherLevel',
      value: 2,
      popovers: [
        {
          title: '什么是部门负责人 - 自上而下？',
          content:
            '以公司组织架构中的最高部门负责人为第一级，向更低管理层级递增'
        },
        {
          content:
            '图示：若小王为发起人，则小赵是小王的“最高部门负责人”，小周是小王的“第二级部门负责人”'
        }
      ],
      href: 'https://www.feishu.cn/hc/zh-CN/articles/360044810913',
      hrefName: '查看和设置上级信息'
    }
  ])
  // 部门负责人层级
  const departmentHeads = reactive([
    {
      name: '直属部门负责人',
      value: '1'
    },
    {
      name: '直属部门负责人加1级',
      value: '2'
    },
    {
      name: '直属部门负责人加2级',
      value: '3'
    },
    {
      name: '直属部门负责人加3级',
      value: '4'
    },
    {
      name: '直属部门负责人加4级',
      value: '5'
    },
    {
      name: '直属部门负责人加5级',
      value: '6'
    },
    {
      name: '直属部门负责人加6级',
      value: '7'
    },
    {
      name: '直属部门负责人加7级',
      value: '8'
    },
    {
      name: '直属部门负责人加8级',
      value: '9'
    },
    {
      name: '直属部门负责人加9级',
      value: '10'
    },
    {
      name: '直属部门负责人加10级',
      value: '11'
    },
    {
      name: '直属部门负责人加11级',
      value: '12'
    },
    {
      name: '直属部门负责人加12级',
      value: '13'
    },
    {
      name: '直属部门负责人加13级',
      value: '14'
    },
    {
      name: '直属部门负责人加14级',
      value: '15'
    },
    {
      name: '直属部门负责人加15级',
      value: '16'
    },
    {
      name: '直属部门负责人加16级',
      value: '17'
    },
    {
      name: '直属部门负责人加17级',
      value: '18'
    },
    {
      name: '直属部门负责人加18级',
      value: '19'
    },
    {
      name: '直属部门负责人加19级',
      value: '20'
    }
  ])
  const reverseDepartmentHeads = reactive([
    {
      name: '最高部门负责人',
      value: '1'
    },
    {
      name: '最高部门负责人减1级',
      value: '2'
    },
    {
      name: '最高部门负责人减2级',
      value: '3'
    },
    {
      name: '最高部门负责人减3级',
      value: '4'
    },
    {
      name: '最高部门负责人减4级',
      value: '5'
    },
    {
      name: '最高部门负责人减5级',
      value: '6'
    },
    {
      name: '最高部门负责人减6级',
      value: '7'
    },
    {
      name: '最高部门负责人减7级',
      value: '8'
    },
    {
      name: '最高部门负责人减8级',
      value: '9'
    },
    {
      name: '最高部门负责人减9级',
      value: '10'
    },
    {
      name: '最高部门负责人减10级',
      value: '11'
    },
    {
      name: '最高部门负责人减11级',
      value: '12'
    }
  ])
  // 部门审批人
  const departmentApprovals = reactive([
    {
      name: '部长',
      value: '101'
    },
    {
      name: '体系负责人',
      value: '102'
    },
    {
      name: 'HRBP',
      value: '103'
    },
    {
      name: '部门助理',
      value: '104'
    },
    {
      name: '资产助理',
      value: '105'
    },
    {
      name: '办公账号员',
      value: '106'
    },
    {
      name: '门禁员',
      value: '107'
    },
    {
      name: '转岗须知员',
      value: '108'
    },
    {
      name: '编码责任人',
      value: '109'
    },
    {
      name: '项目负责人',
      value: '110'
    }
  ])
  // 角色
  const roles = reactive([
    {
      name: '人事',
      value: '1'
    },
    {
      name: '行政',
      value: '2'
    },
    {
      name: '招聘',
      value: '3'
    },
    {
      name: '财务',
      value: '4'
    },
    {
      name: '法务',
      value: '5'
    },
    {
      name: '经理',
      value: '6'
    }
  ])
  // 岗位
  const posts = reactive([
    {
      name: '技术顾问',
      value: '1'
    },
    {
      name: 'HRBP',
      value: '2'
    },
    {
      name: '部门助理',
      value: '3'
    },
    {
      name: '行政专员',
      value: '4'
    },
    {
      name: '商务专员',
      value: '5'
    },
    {
      name: '现场助理',
      value: '6'
    },
    {
      name: '项目经理',
      value: '7'
    },
    {
      name: '薪酬专员',
      value: '8'
    },
    {
      name: '招聘专员',
      value: '9'
    },
    {
      name: '考勤专员',
      value: '10'
    },
    {
      name: '副总经理',
      value: '11'
    }
  ])
  // 用户组
  const userGroups = reactive([
    {
      name: '采购组',
      value: '1'
    },
    {
      name: '报销组',
      value: '2'
    },
    {
      name: '资产组',
      value: '3'
    }
  ])
  // 人员类型
  const assigneeTypes = reactive([
    {
      name: '人员自己',
      value: 1
    },
    {
      name: '人员上级',
      value: 2
    },
    {
      name: '人员部门负责人',
      value: 3
    }
  ])

  // 人员范围
  const assigneeScopes = reactive([
    {
      name: '全公司',
      value: 1
    },
    {
      name: '指定成员',
      value: 2
    },
    {
      name: '角色成员',
      value: 3
    }
  ])
  // --------------------------------------------------------------------
  // 操作配置
  const buttons = reactive([
    {
      id: getId(),
      name: '保存',
      value: '1',
      content: '保存流程,可在草稿箱查看',
      code: 'save'
    },
    {
      id: getId(),
      name: '提交',
      value: '22',
      content: '提交流程,可在我发起的查看',
      code: 'submit'
    },
    {
      id: getId(),
      name: '同意',
      value: '3',
      content: '审批通过，可在我已办查看',
      code: 'agree'
    },
    {
      id: getId(),
      name: '拒绝',
      value: '4',
      content: '节点负责人可以拒绝该流程（拒绝后流程直接结束，标记为已拒绝）',
      code: 'end'
    },
    {
      id: getId(),
      name: '转交',
      value: '5',
      content: '转交给他人办理，依然在当前节点',
      code: 'turn'
    },
    {
      id: getId(),
      name: '退回',
      value: '6',
      content: '退回给申请人，申请人修改完成后，流程按节点开始走',
      code: 'back'
    },
    {
      id: getId(),
      name: '撤回',
      value: '7',
      content:
        '允许申请人对未进入流程（第一个流程节点为待处理状态）的申请进行撤回',
      code: 'revoke'
    },
    {
      id: getId(),
      name: '加签',
      value: '8',
      content: '这个事情我不能完全做主，需要某些人先处理，再右我处理',
      code: 'addSign'
    },
    {
      id: getId(),
      name: '征询',
      value: '9',
      content: '征询他人意见',
      code: 'consult'
    }
  ])
  // 超时配置
  const timeouts = reactive([
    {
      id: getId(),
      name: '审批限时处理',
      value: '1',
      content: '支持自动提醒、转交等，为每条审批流设一个智能闹钟',
      code: 'timeout'
    }
  ])
  // 安全配置
  const securities = reactive([
    {
      id: getId(),
      name: '审批同意是否需要手写签名',
      value: '1',
      content: '如果全局设置了需要签字，则此处不生效',
      code: 'sign'
    },
    {
      id: getId(),
      name: '填写密码',
      value: '1',
      content: '凭密码才能填写表单',
      code: 'password'
    }
  ])
  // 抄送操作配置
  const copyerOperations = reactive([
    {
      id: getId(),
      name: '发起人填写',
      value: '1',
      content: '允许发起人添加抄送人',
      code: 'customCc'
    }
  ])

  // 允许退回人
  const allowBackDatas = reactive([
    {
      name: '仅提交人',
      value: 1
    },
    {
      name: '任意节点',
      value: 2
    }
  ])
  // 退回后审批形式
  const backApprovalTypeDatas = [
    {
      value: 1,
      label: '直接从当前发起退回人审批'
    },
    {
      value: 2,
      label: '从头开始审批'
    },
    {
      value: 4,
      label: '从被退回人的下一个节点开始审批'
    }
  ]

  // --------------------------------------------------------------------
  // 分支类型
  const branchTypes = reactive([
    { label: '规则', value: 1 },
    /* { label: '公式', value: 2 }, */
    { label: '其他', value: 3 }
  ])
  // 基础字段
  const baseColumns = reactive([
    { label: '姓名', value: '姓名', code: 'NAME' },
    { label: '工号', value: '工号', code: 'JOB_NUMBER' },
    { label: '部门', value: '部门', code: 'DEPT' },
    { label: 'Base地', value: 'Base地', code: 'BASE' },
    { label: '所属体系', value: '所属体系', code: '' },
    { label: '归属地', value: '归属地', code: 'LOCATION' }
  ])
  // 表单字段，必填
  const formColumns = reactive([{ label: '加班类型', value: '加班类型' }])
  // 比较(操作)符
  const optTypes = reactive([
    { label: '等于', value: 'eq', code: '==' },
    { label: '不等于', value: 'ne', code: '!=' },
    { label: '大于', value: 'gt', code: '>' },
    { label: '大于等于', value: 'ge', code: '>=' },
    { label: '小于', value: 'lt', code: '<' },
    { label: '小于等于', value: 'le', code: '<=' }
  ])
  // 值类型
  const valueTypes = reactive([
    { label: '固定', value: '1' }
    /* { label: '动态值', value: '2' },
    { label: '流程值', value: '3' } */
    /* { label: '数据源', value: '4' }, */
  ])
  // 动态值类型
  const dynamicValueTypes = reactive([
    { label: '当前员工', value: '1' },
    { label: '当前员工工号', value: '2' },
    { label: '当前部门', value: '3' },
    { label: '当前组织', value: '4' },
    { label: '下级部门', value: '5' },
    { label: '上级部门', value: '6' },
    { label: '当前日期', value: '7' },
    { label: '当前时间', value: '8' }
  ])

  // 流程值类型
  const flowValueTypes = reactive([
    { label: '流程状态', value: '1' },
    { label: '流程创建人', value: '2' }
  ])

  // 表单数据
  const dataSourceOptions = reactive([
    {
      value: '1',
      label: '本表单',
      children: [
        { label: '姓名', value: '姓名' },
        { label: '工号', value: '工号' },
        { label: '部门', value: '部门' },
        { label: 'Base地', value: 'Base地' },
        { label: '所属体系', value: '所属体系' },
        { label: '归属地', value: '归属地' }
      ]
    }
  ])

  // -------------------------------------------------------------------------------
  // 通知类型
  const notices = reactive([
    {
      name: '站内',
      value: 1
    },
    {
      name: '邮件',
      value: 2
    },
    {
      name: '短信',
      value: 4
    },
    {
      name: '微信',
      value: 8
    },
    {
      name: '钉钉',
      value: 16
    },
    {
      name: '飞书',
      value: 32
    }
  ])

  return {
    approvalMethods,
    approvalModes,
    adjacentApprovals,
    approvalWithNulls,
    sameApprovals,
    approvals,
    higherLevelModes,
    higherLevels,
    reverseHigherLevels,
    departmentHeadModes,
    departmentHeads,
    reverseDepartmentHeads,
    departmentApprovals,
    roles,
    posts,
    userGroups,
    assigneeTypes,
    assigneeScopes,
    buttons,
    timeouts,
    securities,
    copyerOperations,
    allowBackDatas,
    backApprovalTypeDatas,
    branchTypes,
    baseColumns,
    formColumns,
    optTypes,
    valueTypes,
    dynamicValueTypes,
    flowValueTypes,
    dataSourceOptions,
    notices
  }
}
