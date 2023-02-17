<template>
  <a-checkbox-group v-model:value="currentValue" @change="onChange">
    <a-row :gutter="[12, 12]">
      <a-col :span="8" v-for="(notice, i) in notices" :key="i">
        <a-checkbox :value="notice.value">{{ notice.name }}</a-checkbox>
      </a-col>
    </a-row>
  </a-checkbox-group>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import loadApproverData from '../data/load-approver-data';
import useCommon from '../hooks/useCommon';
// 数据
const { notices } = loadApproverData();
const { toUgroup } = useCommon();

// 接收属性
const props = defineProps({
  modelValue: {
    type: [Number, String],
    required: true
  }
});

// 值
const currentValue = ref([]);

/**
 * 监听值变化
 */
watch(
  () => props.modelValue,
  newVal => {
    initData(newVal);
  }
);

/**
 * 挂载后
 */
onMounted(() => {
  initData(props.modelValue);
});

/**
 * 初始数据
 * @param {*} value
 */
const initData = value => {
  if (value) {
    currentValue.value = toUgroup(value);
  } else {
    currentValue.value = [];
  }
};

const emit = defineEmits(['update:modelValue']);

/**
 * 值发生改变
 * @param {*} value
 */
const onChange = value => {
  if (value) {
    let sum = value.reduce((prev, cur) => {
      return prev + cur;
    });
    emit('update:modelValue', sum);
  }
};
</script>
