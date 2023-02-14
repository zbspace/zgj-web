<template>
  <a-popover v-if="props.popovers && props.popovers.length > 0" placement="topLeft" trigger="click">
    <template #content>
      <div class="flow-approver-tip">
        <div v-for="(popover, k) in popovers" :key="k">
          <p class="tip-title">{{ popover.title }}</p>
          <slot name="content">
            <p class="tip-content">{{ popover.content }}</p>
          </slot>
        </div>
        <a v-if="props.href" :href="props.href" target="_blank">{{ props.hrefName }}</a>
      </div>
    </template>
    <question-circle-outlined style="margin-left: 5px" />
  </a-popover>
</template>

<script setup>
// 接收属性
const props = defineProps({
  popovers: {
    type: Array,
    default: function () {
      return [];
    }
  },
  href: {
    type: String,
    default: ''
  },
  hrefName: {
    type: String,
    default: ''
  }
});
</script>
