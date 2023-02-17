<template>
  <a-input v-model:value="currentValue" :size="props.size" :placeholder="props.placeholder" class="w-fill" @change="onChange" />
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
// 接收属性
const props = defineProps({
  modelValue: {
    type: Array,
    required: false,
    default: () => []
  },
  size: {
    type: String,
    required: false,
    default: 'large'
  },
  placeholder: {
    type: String,
    required: false,
    default: '数值'
  }
});

// 值
const currentValue = ref(null);

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
  if (value && value.length > 0) {
    currentValue.value = value[0];
  } else {
    currentValue.value = null;
  }
};

const emit = defineEmits(['update:modelValue', 'update:code', 'change']);
/**
 * 值发生改变
 * @param {*} value
 */
const onChange = () => {
  if (currentValue.value) {
    const result = [currentValue.value];
    emit('update:modelValue', result);
    emit('update:code', result);
    emit('change', result);
  }
};
</script>
