/** * 审批流程节点属性设置 */
<template>
  <div class="flow-drawer-content">
    <!-- 审批方式 -->
    <FlowDrawerItem name="审批方式">
      <a-radio-group v-model:value="props.node.attr.approvalMode" :size="size">
        <a-radio
          v-for="(approvalMode, i) in approvalModes"
          :key="i"
          :value="approvalMode.value"
          :disabled="multiple && approvalMode.value == 1"
          :style="radioStyle()"
        >
          <span>{{ approvalMode.name }}</span>
        </a-radio>
      </a-radio-group>
    </FlowDrawerItem>
    <!-- 审批人与发起人为同一人时 -->
    <FlowDrawerItem v-if="props.node.nodeType == 1" name="审批人与发起人为同一人时">
      <a-radio-group v-model:value="props.node.attr.starterAssignee" :size="size">
        <a-radio v-for="(sameApproval, i) in sameApprovals" :key="i" :value="sameApproval.value" :style="radioStyle()">
          <span>{{ sameApproval.name }}</span>
          <FlowPopoverTip :popovers="sameApproval.popovers" :href="sameApproval.href" :hrefName="sameApproval.hrefName" />
        </a-radio>
      </a-radio-group>
    </FlowDrawerItem>
    <!-- 相邻审批节点为同一人时 -->
    <FlowDrawerItem v-if="props.node.nodeType == 1" name="相邻审批节点为同一人时">
      <a-radio-group v-model:value="props.node.attr.adjacent" :size="size">
        <a-radio v-for="(adjacentApproval, i) in adjacentApprovals" :key="i" :value="adjacentApproval.value" :style="radioStyle()">
          <span>{{ adjacentApproval.name }}</span>
          <FlowPopoverTip :popovers="adjacentApproval.popovers" :href="adjacentApproval.href" :hrefName="adjacentApproval.hrefName" />
        </a-radio>
      </a-radio-group>
    </FlowDrawerItem>
    <!-- 审批人为空时 -->
    <FlowDrawerItem  name="审批人为空时">
      <template #title>
        <span>{{ props.node.nodeType == 1 ? '审批人' : '办理人' }}为空时</span>
        <a-popover placement="topLeft" trigger="click">
          <template #content>
            <div class="flow-approver-tip">
              <p class="tip-title">什么情况下会出现{{ node.nodeType == 1 ? '审批人' : '办理人' }}为空？</p>
              <p class="tip-content">设置了“上级”审批，但申请人在管理后台 - 组织架构中没有上级</p>
              <p class="tip-content">设置了“部门负责人”审批，但申请人在管理后台 - 组织架构中没有部门负责人</p>
              <p class="tip-content">设置了“角色”审批，但该角色在管理后台 - 组织架构中没有任何成员</p>
              <p class="tip-content">设置了“用户组”审批，但该用户组在管理后台 - 组织架构中没有任何成员</p>
            </div>
          </template>
          <question-circle-outlined style="margin-left: 5px" />
        </a-popover>
      </template>
      <a-radio-group v-model:value="props.node.attr.emptyFlag" :size="size">
        <a-radio v-for="(approvalWithNull, i) in approvalWithNulls" :key="i" :value="approvalWithNull.value" :style="radioStyle()">
          <span>{{ approvalWithNull.name }}</span>
          <FlowPopoverTip :popovers="approvalWithNull.popovers" :href="approvalWithNull.href" :hrefName="approvalWithNull.hrefName" />
        </a-radio>
      </a-radio-group>
    </FlowDrawerItem>

    <!-- 提示 -->
    <FlowDrawerItem name="提示">
      <div class="hint-info">
        <p v-if="node.nodeType == 6">办理人不涉及审批人去重设置，不同节点相同的办理人仍需要执行。</p>
        <p>若审批人离职，会自动转交给审批人的上级代为处理</p>
        <p>抄送的人数最多支持100人以内</p>
      </div>
    </FlowDrawerItem>
  </div>
</template>

<script setup>
import { watch } from 'vue';
import useCommon from '../../hooks/useCommon';
// import { useFlowStore } from '../../store/flow';
import loadApproverData from '../../data/load-approver-data';
// 公共
const { size, radioStyle } = useCommon();
// Store
// const flowStore = useFlowStore();
// 数据
const { approvalModes, adjacentApprovals, sameApprovals, approvalWithNulls } = loadApproverData();

// 接收属性
const props = defineProps({
  node: {
    type: Object,
    default: function () {
      return {};
    }
  },
  multiple: {
    type: Boolean,
    default: false
  }
});

/**
 * 监听值变化
 */
watch(
  () => props.multiple,
  newVal => {
    if (newVal) {
      props.node.attr.approvalMode = 2;
    } else {
      props.node.attr.approvalMode = 1;
    }
  }
);
</script>
