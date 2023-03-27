<template>
  <div class="flow-drawer-option" v-for="(button, i) in props.node.buttons || datas" :key="i">
    <div class="flow-drawer-option-item">
      <div class="flow-drawer-option-item-left">
        <img :src="optionIcon" />
        <div class="flow-drawer-option-desc">
          <p class="drawer-option-title">{{ button.buttonName }}</p>
          <p class="drawer-option-desc">{{ button.content }}</p>
        </div>
      </div>
      <div class="flow-drawer-option-item-switch">
        <a-switch v-model:checked="button.checked" :disabled="button.disabled" checked-children="开" un-checked-children="关" />
      </div>
    </div>
  </div>
</template>

<script setup>
// import { ref, computed } from 'vue';
// import useCommon from '../hooks/useCommon';
import useIcon from '../hooks/useIcon';
// 公共
// const { size } = useCommon();
// 图标
const { optionIcon } = useIcon();

// 接收属性
const props = defineProps({
  node: {
    type: Object,
    default: function () {
      return {};
    }
  },
  datas: {
    type: Array,
    required: false,
    default: () => []
  }
});
</script>
