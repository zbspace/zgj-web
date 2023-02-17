<template>
  <div class="flow-zoom-wrap" :style="wrapStyle">
    <div class="flow-zoom-container">
      <div class="flow-zoom-less" @click="onZoomOut"></div>
      <span>{{ zoomValue }}%</span>
      <div class="flow-zoom-more" @click="onZoomIn"></div>
    </div>
  </div>
</template>
<script setup>
  import { ref, reactive } from 'vue'

  const INIT_ZOOM_VALUE = 100
  const MIN_ZOOM_VALUE = 50
  const MAX_ZOOM_VALUE = 200

  const emit = defineEmits(['input'])

  const zoomValue = ref(INIT_ZOOM_VALUE)

  // 接收属性
  const props = defineProps({
    modelValue: {
      type: Number,
      required: false,
      default: 100
    },
    min: {
      type: Number,
      required: false,
      default: 50
    },
    max: {
      type: Number,
      required: false,
      default: 200
    },
    top: {
      type: [Number, String],
      default: 72
    }
  })

  // 样式
  const wrapStyle = reactive({
    // 存在自定义nav时候需要减去nav高度
    top: Number(props.top) + 'px'
  })

  const onZoomOut = () => {
    let value = zoomValue.value
    value -= 10
    if (value <= MIN_ZOOM_VALUE) {
      value = MIN_ZOOM_VALUE
    }
    zoomValue.value = value
    emit('update:modelValue', value)
  }
  const onZoomIn = () => {
    let value = zoomValue.value
    value += 10
    if (value >= MAX_ZOOM_VALUE) {
      value = MAX_ZOOM_VALUE
    }
    zoomValue.value = value
    emit('update:modelValue', value)
  }
</script>
