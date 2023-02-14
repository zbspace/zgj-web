<template>
  <a-select
    v-model:value="currentValue"
    :size="props.size"
    :mode="props.mode"
    allowClear
    :placeholder="props.placeholder"
    class="w-fill"
    @change="onChange"
  >
    <a-select-option :value="data[valueName]" v-for="(data, i) in datas" :key="i">
      {{ data[labelName] }}
    </a-select-option>
  </a-select>
</template>
<script setup>
import { ref, watch, onMounted } from 'vue';
// 接收属性
const props = defineProps({
  modelValue: {
    type: [Array, Number, String],
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
  size: {
    type: String,
    required: false,
    default: 'large'
  },
  mode: {
    type: String,
    required: false,
    default: 'default'
  },
  placeholder: {
    type: String,
    required: false,
    default: '请选择'
  }
});

// 值
const currentValue = ref(props.mode == 'multiple' ? [] : null);

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
  if (value && value.length > 0 && props.mode == 'default') {
    currentValue.value = value[0];
  } else if (value && value.length > 0 && props.mode == 'multiple') {
    currentValue.value = value;
  } else {
    currentValue.value = props.mode == 'multiple' ? [] : null;
  }
};

const emit = defineEmits(['update:modelValue', 'update:label', 'change']);
/**
 * 值发生改变
 * @param {*} value
 */
const onChange = value => {
  if (value) {
    emit('update:modelValue', props.mode == 'multiple' ? value : [value]);
    let name = props.datas
      .filter(data => (props.mode == 'multiple' ? value.includes(data[props.valueName]) : data[props.valueName] == value))
      .map(data => data[props.labelName]);
    emit('update:label', name);
    emit('change', value);
  }
};
</script>
