<template>
  <a-select
    v-model:value="currentValue"
    :size="props.size"
    mode="tags"
    allowClear
    class="w-fill"
    :placeholder="props.placeholder"
    @change="onChange"
  >
    <a-select-option :value="data[valueName]" v-for="(data, i) in props.datas" :key="i">
      {{ data[labelName] }}
    </a-select-option>
  </a-select>
</template>
<script setup>
import { ref, watch, onMounted } from 'vue';
import useCommon from '../hooks/useCommon';

const { toUgroup } = useCommon();
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

const emit = defineEmits(['update:modelValue', 'update:label', 'change']);
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
    const labels = props.datas.filter(data => data[props.valueName] == value).map(data => data[props.labelName]);
    if (labels && labels.length > 0) {
      emit('update:label', labels[0]);
    }
    emit('change', sum);
  }
};
</script>
