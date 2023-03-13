<template>
  <span>
    <a-input
      v-if="props.is == 'input'"
      v-model:value="currentValue"
      :size="props.size"
      :placeholder="props.placeholder"
      class="w-fill"
      @change="onChange"
    />
    <a-select
      v-if="props.is == 'select' || props.is == 'radio'"
      v-model:value="currentValue"
      :options="props.options"
      :size="props.size"
      :placeholder="props.placeholder"
      class="w-fill"
      @change="onChange"
    />
    <a-date-picker
      v-else-if="props.is == 'datetime'"
      v-model:value="currentValue"
      :size="props.size"
      format="YYYY-MM-DD"
      valueFormat="YYYY-MM-DD"
      :placeholder="props.placeholder"
      class="w-fill"
      @change="onChange"
    />
    <a-time-picker
      v-else-if="props.is == 'time'"
      v-model:value="currentValue"
      :size="props.size"
      valueFormat="HH:mm:ss"
      :placeholder="props.placeholder"
      class="w-fill"
      @change="onChange"
    />
  </span>
</template>

<script setup name="FlowComponent">
  import { ref, watch, onMounted } from 'vue'
  // import GDept from '../../GDept/index.vue';
  // import GRole from '../../GRole/index.vue';
  // import GUser from '../../GUser/index.vue';
  // import GPos from '../../GPos/index.vue';

  // 接收属性
  const props = defineProps({
    modelValue: {
      type: Array,
      required: false,
      default: () => []
    },
    is: {
      type: String,
      required: false,
      default: 'input'
    },
    options: {
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
  })

  // 值
  const currentValue = ref(null)
  const currentValueName = ref(null)

  /**
   * 监听值变化
   */
  watch(
    () => props.modelValue,
    newVal => {
      initData(newVal)
    }
  )
  /**
   * 挂载后
   */
  onMounted(() => {
    initData(props.modelValue)
  })

  /**
   * 初始数据
   * @param {*} value
   */
  const initData = value => {
    if (value && value.length > 0) {
      currentValue.value = value[0]
    } else {
      currentValue.value = null
    }
  }

  const emit = defineEmits(['update:modelValue', 'update:code', 'change'])
  /**
   * 值发生改变
   * @param {*} value
   */
  const onChange = () => {
    if (currentValue.value) {
      let result = [currentValue.value]
      let code = [currentValue.value]
      if (['dept', 'role', 'pos'].includes(props.is)) {
        result = currentValue.value
        code = currentValueName.value
      }
      emit('update:modelValue', result)
      emit('update:code', code)
      emit('change', result)
    }
  }
</script>
