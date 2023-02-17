<template>
  <div class="flow-drawer-footer" :style="footerStyle">
    <a-button type="primary" :size="size" :style="{ marginRight: '8px' }" @click="onSave"> 保存 </a-button>
    <a-button :size="size" @click="onClose"> 取消 </a-button>
  </div>
</template>
<script setup>
import { computed } from 'vue';
import useCommon from '../hooks/useCommon';
import useDevice from '../hooks/useDevice';
// 公共方法
const { size } = useCommon();
// 是否手机设备
const { isMobile } = useDevice();
// 自定义样式
const footerStyle = computed(() => {
  return {
    'text-align': isMobile() ? 'center' : 'left'
  };
});

const emit = defineEmits(['save', 'close']);

const onSave = () => {
  emit('save');
};

const onClose = () => {
  emit('close');
};
</script>
