<template>
  <a-select
    v-model:value="currentValue"
    :size="size"
    style="width: 40%"
    :placeholder="props.placeholder"
    @change="onChange"
  >
    <a-select-opt-group label="基础字段">
      <a-select-option
        :value="column.fieldId"
        v-for="column in flowStore.baseColumns"
        :key="column.fieldId"
      >
        {{ column.fieldName }}
      </a-select-option>
    </a-select-opt-group>
    <a-select-opt-group label="表单字段">
      <a-select-option
        :value="column.fieldId"
        v-for="column in flowStore.formColumns"
        :key="column.fieldId"
      >
        {{ column.fieldName }}
      </a-select-option>
    </a-select-opt-group>
  </a-select>
</template>
<script setup>
  import { ref, watch, onMounted } from 'vue'
  import { useFlowStore } from '../store/flow'
  // Store
  const flowStore = useFlowStore()
  const size = ref('default')
  // 接收属性
  const props = defineProps({
    modelValue: {
      type: [Number, String],
      required: false
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
      default: '字段'
    }
  })

  // 值
  const currentValue = ref(undefined)

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
    if (value) {
      currentValue.value = value.toString()
    } else {
      currentValue.value = null
    }
  }

  const emit = defineEmits([
    'update:modelValue',
    'update:name',
    'update:form',
    'update:code',
    'change'
  ])
  /**
   * 值发生改变
   * @param {*} value
   */
  const onChange = value => {
    if (value) {
      emit('update:modelValue', value)
      let fieldForm = '1'
      let fieldName = flowStore.baseColumns
        .filter(data => data.fieldId == value)
        .map(data => data.fieldName)
      if (!fieldName) {
        fieldName = flowStore.formColumns
          .filter(data => data.fieldId == value)
          .map(data => data.fieldName)
        fieldForm = '2'
      }
      const columns = [...flowStore.baseColumns, ...flowStore.formColumns]
      const fieldType = columns
        .filter(data => data.fieldId == value)
        .map(data => data.fieldType)
      emit('update:name', fieldName)
      emit('update:form', fieldForm)
      emit('update:code', fieldType)
      emit('change', value)
    }
  }
</script>
