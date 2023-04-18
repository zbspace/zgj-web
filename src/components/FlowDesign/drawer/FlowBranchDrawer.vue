<template>
  <a-drawer
    v-if="node.attr"
    :width="drawerWidth()"
    :headerStyle="headerStyle(node.nodeType)"
    :drawerStyle="drawerBodyStyle"
    placement="right"
    :closable="true"
    :visible="visible"
    @close="onClose"
  >
    <template #title>
      <div class="flow-drawer-title-context">
        <img :src="branchIcon" class="anticon" />
        <span class="flow-drawer-title">
          <EditName v-model="node.nodeName" />
        </span>
      </div>
    </template>
    <div class="flow-drawer-module">
      <!-- 分支等级 -->
      <FlowDrawerContent v-if="node.attr.showPriorityLevel" name="分支等级">
        <a-select v-model:value="node.attr.priorityLevel" :size="size" placeholder="请选择等级" :options="levelOptions" class="w-fill" />
      </FlowDrawerContent>
      <!-- 分支类型-->
      <FlowDrawerContent name="分支类型">
        <a-radio-group v-model:value="node.attr.branchType">
          <a-radio :value="branchType.value" v-for="(branchType, i) in branchTypesComputed(node.nodeType)" :key="i">
            {{ branchType.label }}
          </a-radio>
        </a-radio-group>
      </FlowDrawerContent>
      <FlowDrawerContent v-if="node.attr.branchType == 1" name="条件规则">
        <FlowBranchCondition :node="node" />
      </FlowDrawerContent>
      <!-- <FlowDrawerContent v-if="node.attr.branchType == 2" name="条件公式" />
      <FlowDrawerContent v-if="node.attr.branchType == 3" name="其他规则" /> -->
    </div>
    <!-- {{ node.conditionGroup }} -->
    <FlowDrawerFooter @close="onClose" @save="onSave" />
  </a-drawer>
</template>
<script setup>
import { ref, computed } from 'vue';
import useCommon from '../hooks/useCommon';
import useIcon from '../hooks/useIcon';
// import { useFlowStore } from '../store/flow';
import loadApproverData from '../data/load-approver-data';
import EditName from '../common/EditName.vue';
import FlowBranchCondition from './branch/FlowBranchCondition.vue';
import FlowDrawerFooter from './FlowDrawerFooter.vue';
// 图标
const { branchIcon } = useIcon();
// 公共
const { drawerWidth, drawerBodyStyle, size, visible } = useCommon();
// Store
// const flowStore = useFlowStore();
// 子组件
// 变量
let node = ref({});
// tabs
let levelOptions = ref([]);
// 数据
const { branchTypes } = loadApproverData();

// 分支类型
const branchTypesComputed = computed(() => nodeType => {
  if (nodeType == 10) {
    return branchTypes;
  } else {
    return branchTypes.filter(f => f.value == 1);
  }
});

// 侧边头样式
const headerStyle = computed(() => nodeType => {
  if (nodeType == 10) {
    // 并行
    return {
      background: 'linear-gradient(90.04deg,#ef8080 -16.37%,#f14343 137.34%)',
      'border-radius': '0px 0px 0 0'
    };
  } else {
    return {
      background: 'linear-gradient(90deg, #e2d9f1, #f65ac2), linear-gradient(#e2d9f1, #e2d9f1)',
      'border-radius': '0px 0px 0 0'
    };
  }
});

// 显示侧边
const show = (conditionNode, routeNode) => {
  // node.attr
  visible.value = conditionNode.attr ? true : false;
  node.value = conditionNode;
  // 等级
  if (conditionNode.attr.showPriorityLevel) {
    levelOptions.value = [];
    routeNode.conditionNodes.forEach((item, index) => {
      let priorityLevel = index + 1;
      // 其他情况节点,顺序只能是最后,不能修改
      if (priorityLevel < routeNode.conditionNodes.length) {
        levelOptions.value.push({ label: '优先' + priorityLevel, value: priorityLevel });
      }
    });
  }
};

// 事件
const emit = defineEmits(['close', 'nodeUpdate']);
// 关闭侧边
const onClose = () => {
  visible.value = false;
  emit('close');
};

// 关闭侧边
const onSave = () => {
  // 更新节点显示信息
  let content = '';
  if (node.value.attr.branchType == 1) {
    node.value.conditionGroup.forEach((group, j) => {
      if (j != 0) {
        content += ' 或 \n';
      }
      if (group.conditions.length > 0) {
        group.conditions.forEach((condition, i) => {
          const conditionValueName = condition.conditionValueName[0];
          if (conditionValueName) {
            if (i != 0) {
              content += ' 且 \n';
            }
            content += '[' + condition.columnName + ' ' + condition.optName + ' ' + conditionValueName + ']';
          }
        });
      }
    });
  } else {
    content += '任意(其他)';
  }

  node.value['error'] = true;
  node.value['content'] = null;
  if (content) {
    node.value['error'] = false;
    node.value['content'] = content;
    // 修改事件
    if (node.value.update) {
      emit('nodeUpdate', node.value);
    }
    onClose();
  }
  return node;
};

defineExpose({
  show,
  onSave
});
</script>
Template
