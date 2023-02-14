<template>
  <a-select v-model:value="currentValue" :size="props.size" allowClear class="w-fill" :placeholder="props.placeholder" @change="onChange">
    <a-select-option :value="data[valueName]" v-for="(data, i) in props.datas" :key="i">
      {{ data[labelName] }}
    </a-select-option>
  </a-select>
</template>
<script setup>
import { ref, watch, onMounted } from 'vue';
// 接收属性
const props = defineProps({
  modelValue: {
    type: [Number, String],
    required: false
  },
  datas: {
    type: Array,
    required: false,
    default: () => []
  },
  valueName: {
    type: String,
    required: false,
    default: 'value'
  },
  labelName: {
    type: String,
    required: false,
    default: 'name'
  },
  codeName: {
    type: String,
    required: false,
    default: 'code'
  },
  size: {
    type: String,
    required: false,
    default: 'large'
  },
  placeholder: {
    type: String,
    required: false,
    default: '请选择'
  }
});

// 值
const currentValue = ref(undefined);

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
    currentValue.value = value.toString();
  } else {
    currentValue.value = null;
  }
};

const emit = defineEmits(['update:modelValue', 'update:label', 'update:code', 'change']);
/**
 * 值发生改变
 * @param {*} value
 */
const onChange = value => {
  if (value) {
    emit('update:modelValue', value);
    const labels = props.datas.filter(data => data[props.valueName] == value).map(data => data[props.labelName]);
    if (labels && labels.length > 0) {
      emit('update:label', labels[0]);
    }
    const codes = props.datas.filter(data => data[props.valueName] == value).map(data => data[props.codeName])
    if (codes && codes.length > 0) {
      emit('update:code', codes[0]);
    }
    emit('change', value);
  }
};
</script>
