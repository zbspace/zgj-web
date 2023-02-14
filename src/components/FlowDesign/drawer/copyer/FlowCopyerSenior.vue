<template>
  <FlowDrawerContent name="操作配置">
    <FlowDrawerOption :node="props.node" :datas="copyerOperations" />
  </FlowDrawerContent>
</template>

<script setup>
import loadApproverData from '../../data/load-approver-data';
// 公共
// 图标
// Store
// 数据
const { copyerOperations } = loadApproverData();

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
