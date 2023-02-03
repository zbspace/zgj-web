<template>
  <div class="components-ElMessageBox">
    <el-dialog v-model="state.props.show" v-bind="state.props.defaultAttribute">
      <div class="dialog">
        <div>
          <div>
            <svg class="iconpark-icon"><use href="#icon4"></use></svg>
          </div>
          <div>
            <slot name="header"></slot>
          </div>
          <div>
            <svg class="iconpark-icon"><use href="#Vector"></use></svg>
          </div>
        </div>
        <div>
          <slot name="content"></slot>
        </div>
        <div>
          <slot name="footer"></slot>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
  /* 
    show 是否显示 默认 false
    defaultAttribute  默认属性   element的对话框属性 
*/
  import {
    // ref,
    reactive,
    defineProps,
    // defineEmits,
    onBeforeMount,
    onMounted,
    watch
  } from 'vue'
  const props = defineProps({
    // 处理类型
    type: {
      type: String,
      default: '0'
    },
    show: {
      type: Boolean,
      default: false
    },
    defaultAttribute: {
      type: Object,
      default: () => {
        return {}
      }
    }
  })
  const state = reactive({
    props: {
      defaultAttribute: {
        'align-center': true,
        'show-close': false
      }
    }
  })
  // 初始化 props
  function initProps() {
    const dispose = state.props
    for (const key in props) {
      if (Object.hasOwnProperty.call(dispose, key)) {
        // console.log('--->', key)
      } else {
        dispose[key] = props[key]
      }
    }
    for (const key in props.defaultAttribute) {
      if (Object.hasOwnProperty.call(props.defaultAttribute, key)) {
        dispose.defaultAttribute[key] = props.defaultAttribute[key]
      }
    }
    console.log('--->', dispose)
  }
  watch(props, (newValue, oldValue) => {
    // console.log(newValue, oldValue);
    // 初始化 props
    initProps()
  })
  onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
    // 初始化 props
    initProps()
  })
  onMounted(() => {
    // console.log(`the component is now mounted.`)
  })
</script>

<style lang="scss" scoped>
  .components-ElMessageBox {
    :deep(.el-dialog) {
      .el-dialog__header {
        display: none;
      }
      .el-dialog__body {
        padding: 0%;
      }
    }
  }
</style>
