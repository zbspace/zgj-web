<template>
  <div class="flowManage-newly-increased">
    <layout
      @clickCutTabs="clickCutTabs"
      :tabsData="state.processTabs.data"
      @close="clickClose"
    >
      <template #backTitle>
        <span class="process-back-text">新增</span>
      </template>
      <template #subTitle>
        <div class="process-save">
          <div class="process-save-down">
            <el-popover placement="bottom" :width="400" trigger="click">
              <template #reference>
                <div class="process-save-down-text"> 5项不完善 </div>
              </template>
              <div class="popover-cont">
                <div class="popover-cont-title">内容不完善，当前无法发布</div>
                <div class="popover-cont-subTitle">
                  以下内容不完善，请修改后发布
                </div>
                <div class="popover-cont-list">
                  <div class="popover-cont-list-li" v-for="n in 6" :key="n">
                    <div class="popover-cont-list-li-name">基础信息</div>
                    <div class="popover-cont-list-li-desc">
                      流程名称不能为空
                    </div>
                    <div class="popover-cont-list-li-but">去修改 </div>
                  </div>
                </div>
              </div>
            </el-popover>
          </div>
          <el-button class="process-save-but" type="primary" @click="clickSave">
            保存
          </el-button>
        </div>
      </template>
      <template #content>
        <basicsInfo
          v-show="state.processTabs.checkedNode.index == '1'"
        ></basicsInfo>
        <AssociationForm
          v-show="state.processTabs.checkedNode.index == '2'"
        ></AssociationForm>
        <VFlowDesign
          v-show="state.processTabs.checkedNode.index == '3'"
          ref="refVFlowDesign"
        ></VFlowDesign>
        <advancedSetup
          v-show="state.processTabs.checkedNode.index == '4'"
        ></advancedSetup>
      </template>
    </layout>
  </div>
</template>
<script setup>
  import { ref, reactive, onBeforeMount, onMounted, nextTick } from 'vue'
  import layout from './layout.vue'
  import basicsInfo from './basics-info.vue'
  import AssociationForm from './Association-form.vue'
  import VFlowDesign from './flow-design.vue'
  import advancedSetup from './advanced-setup.vue'
  const emit = defineEmits(['close', 'update:modelValue', 'clickCutTabs'])
  const state = reactive({
    processTabs: {
      checkedNode: {},
      data: [
        {
          index: '1',
          label: '基础信息',
          checked: true
        },
        {
          index: '2',
          label: '关联表单'
        },
        {
          index: '3',
          label: '流程设计'
        },
        {
          index: '4',
          label: '高级设置'
        }
      ]
    }
  })
  const refVFlowDesign = ref(null)
  // 点击切换选项
  const clickCutTabs = (data, item) => {
    data.forEach(element => {
      element.checked = false
    })
    item.checked = true
    // 处理选项
    disCutTabs()
  }
  // 处理选项
  const disCutTabs = () => {
    state.processTabs.data.forEach(item => {
      if (item.checked) {
        state.processTabs.checkedNode = item
      }
    })
    if (state.processTabs.checkedNode.index === '3') {
      nextTick(() => {
        // 设置流程模板默认数据
        handleSetData()
      })
    }
  }
  // 点击关闭弹框
  const clickClose = () => {
    emit('close')
  }
  // 点击保存
  const clickSave = () => {
    // console.log('--->', 123)
    console.log('--->', refVFlowDesign.value.getValue())
  }
  // 设置流程模板默认数据
  const handleSetData = () => {
    refVFlowDesign.value.handleSetData({
      createTime: '2022-11-27 12:31:00',
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
        createTime: '2022-11-27 12:31:00',
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
          createTime: '2022-11-27 12:31:00',
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
            createTime: '2022-11-27 12:31:00',
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
            createTime: '2022-11-27 12:31:00',
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
            createTime: '2022-11-27 12:31:00',
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
            createTime: '2022-11-27 12:31:00',
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
            createTime: '2022-11-27 12:31:00',
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
            createTime: '2022-11-27 12:31:00',
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
            content:
              '发起节点填写完申请单，,提交流程到下一步，可在我发起的查看',
            statusFlag: 1,
            versionFlag: '0',
            delFlag: 'N',
            tenantId: null
          },
          {
            createTime: '2022-11-27 12:31:00',
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
            createTime: '2022-11-27 12:31:00',
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
            content:
              '节点负责人可以拒绝该流程（拒绝后流程直接结束，标记为已拒绝）',
            statusFlag: 1,
            versionFlag: '0',
            delFlag: 'N',
            tenantId: null
          },
          {
            createTime: '2022-11-27 12:31:00',
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
            createTime: '2022-11-27 12:31:00',
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
            createTime: '2022-11-27 12:31:00',
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
            createTime: '2022-11-27 12:31:00',
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
          createTime: '2022-11-27 12:31:00',
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
          createTime: '2022-11-27 12:30:57',
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
          createTime: '2022-11-27 12:30:57',
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
          createTime: '2022-11-27 12:30:57',
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
          createTime: '2022-11-27 12:30:57',
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
          createTime: '2022-11-27 12:30:57',
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
          createTime: '2022-11-27 12:30:57',
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
          createTime: '2022-11-27 12:30:57',
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
          content:
            '节点负责人可以拒绝该流程（拒绝后流程直接结束，标记为已拒绝）',
          statusFlag: 1,
          versionFlag: '0',
          delFlag: 'N',
          tenantId: null
        },
        {
          createTime: '2022-11-27 12:30:57',
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
          createTime: '2022-11-27 12:30:57',
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
          createTime: '2022-11-27 12:30:57',
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
          createTime: '2022-11-27 12:30:57',
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
    })
  }
  onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
    // 处理选项
    disCutTabs()
  })
  onMounted(() => {
    // console.log(`the component is now mounted.`)
  })
</script>
<style lang="scss" scoped>
  .flowManage-newly-increased {
    margin: 0%;
    width: 100%;
    height: 100%;
    .process-save {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .process-save-down {
        margin-right: 0.5rem;
        .process-save-down-text {
          color: var(--danger-6);
          cursor: pointer;
        }
      }
    }
  }
  .popover-cont {
    padding: 0.5rem;
    color: var(--color-text-1);
    .popover-cont-title {
      font-size: var(--font-size-title-1);
    }
    .popover-cont-subTitle {
      color: var(--color-text-3);
      margin-top: 0.8rem;
    }
    .popover-cont-list {
      margin-top: 0.2rem;
      .popover-cont-list-li {
        display: flex;
        align-items: center;
        background: rgba(0, 0, 0, 0.04);
        justify-content: space-between;
        padding: 0.8rem 1rem;
        margin: 0rem 0rem 0.5rem 0rem;
        .popover-cont-list-li-name {
          width: 4rem;
        }
        .popover-cont-list-li-desc {
          color: var(--color-text-3);
          width: calc(100% - 7rem);
          padding: 0% 0.5rem;
        }
        .popover-cont-list-li-but {
          color: var(--Info-6);
          width: 3rem;
          cursor: pointer;
        }
      }
    }
  }
</style>
