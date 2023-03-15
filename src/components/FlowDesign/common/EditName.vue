<template>
  <span class="node-name-title">
    <span class="clickTitle" v-if="!isInput" @click.stop="clickEvent()">{{ props.modelValue }}</span>
    <span v-if="!isInput">{{ approvalMethod(props.node) }}</span>
    <edit-outlined v-if="!isInput"/>
    <a-input
      v-if="isInput"
      v-focus
      type="text"
      @blur="blurEvent()"
      @focus="$event.currentTarget.select()"
      v-model:value="currentValue"
      :style="{ width: props.width }"
      @change="onChange"
    />
  </span>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
// import useCommon from '../hooks/useCommon';
// 接收属性
const props = defineProps({
  modelValue: {
    type: String,
    required: false
  },
  node: {
    type: Object,
    default: function () {
      return {};
    }
  },
  width: {
    type: String,
    required: false,
    default: '85%'
  }
});

const currentValue = ref('');

// 是否输入
const isInput = ref(false);

const approvalMethod = computed(() => {
  return node => {
    const attr = node.attr;
    if (attr) {
      if (attr.approvalMode == 2 || attr.approvalMode == 3) {
        return '(会签)';
      }
      if (attr.approvalMode == 4) {
        return '(或签)';
      }
      if (attr.approvalMode == 5) {
        return '(依次审批)';
      }
      if (attr.approvalMode == 1) {
        return '(单人审批)';
      }
    }
    return '';
  };
});

watch(
  () => props.modelValue,
  newValue => {
    currentValue.value = newValue;
  }
);

onMounted(() => {
  if (props.modelValue) {
    currentValue.value = props.modelValue;
  }
});

const emit = defineEmits(['edit', 'update:modelValue']);

//
const onChange = () => {
  emit('update:modelValue', currentValue.value);
};

// 删除确定回调
const clickEvent = () => {
  isInput.value = true;
  emit('edit', false);
};

const blurEvent = () => {
  isInput.value = false;
  emit('update:modelValue', currentValue.value);
  emit('edit', true);
};
</script>
<style lang="less" scoped>
.clickTitle {
  display: inline-block;
  min-width: 50px;
  min-height: 1em;
}
</style>
