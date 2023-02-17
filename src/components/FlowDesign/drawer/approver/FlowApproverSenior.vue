<template>
  <FlowDrawerContent name="按钮配置">
    <FlowDrawerOption :node="props.node" :datas="buttons" />
  </FlowDrawerContent>
  <!-- <FlowDrawerContent name="超时配置">
    <FlowDrawerOption :node="props.node" :datas="timeouts" />
  </FlowDrawerContent>
  <FlowDrawerContent name="安全配置">
    <FlowDrawerOption :node="props.node" :datas="securities" />
  </FlowDrawerContent> -->
</template>

<script setup>
// import useCommon from '../../hooks/useCommon';
// import useIcon from '../../hooks/useIcon';
// import { useFlowStore } from '../../store/flow';
import loadApproverData from '../../data/load-approver-data';
// 公共
// 图标
// Store
// 数据
const { buttons, timeouts, securities } = loadApproverData();

// 接收属性
const props = defineProps({
  node: {
    type: Object,
    default: function () {
      return {};
    }
  }
});
</script>
