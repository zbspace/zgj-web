<template>
  <div class="components-breadcrumb">
    <div class="ap-box">
      <el-breadcrumb v-bind="props.defaultAttribute">
        <el-breadcrumb-item :to="item.to" v-for="item in props.data">{{
          item.name
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>
<script setup>
  import {
    reactive,
    defineProps,
    defineEmits,
    onBeforeMount,
    onMounted
  } from 'vue'
  const props = defineProps({
    // 标识
    refs: {
      type: String,
      default: ''
    },
    // 处理类型
    type: {
      type: String,
      default: '0'
    },
    data: {
      type: Array,
      default: []
    },
    // 默认属性
    defaultAttribute: {
      type: Object,
      default: {}
    }
  })
  const emit = defineEmits([])
  const state = reactive({})

  onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
  })
  onMounted(() => {
    // console.log(`the component is now mounted.`)
  })
</script>
<style lang="scss" scoped>
  .components-breadcrumb {
    margin: 0%;

    :deep(.ap-box) {
      .el-breadcrumb__inner {
        color: var(--jy-secondary-5);
      }
    }
  }
</style>
