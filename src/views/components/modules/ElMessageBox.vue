<template>
  <div class="container-box">
    <el-dialog
      v-model="state.props.modelValue"
      v-bind="state.props.defaultAttribute"
      @close="closeCallBack"
      append-to-body
      class="components-ElMessageBox"
    >
      <div
        class="dialog"
        :style="{ height: state.props.defaultAttribute.height }"
        v-if="state.props['customContent']"
      >
        <slot> </slot>
      </div>
      <div
        class="dialog"
        :style="{ height: state.props.defaultAttribute.height }"
        v-else
      >
        <div
          class="dialog-header"
          v-if="
            state.props['showHeader'] &&
            (state.props['showIcon'] ||
              state.props['showTitle'] ||
              state.props['showCutOffRule'])
          "
        >
          <div class="dialog-header-icon" v-if="state.props['showIcon']">
            <svg class="iconpark-icon"><use href="#icon4"></use></svg>
          </div>
          <div class="dialog-header-cont" v-if="state.props['showTitle']">
            <slot name="header"> </slot>
          </div>
          <div
            class="dialog-header-remove"
            @click="clickClose"
            v-if="state.props['showClose']"
          >
            <svg class="iconpark-icon"><use href="#Vector"></use></svg>
          </div>
        </div>
        <div class="cut-off-rule" v-if="state.props['showCutOffRule']"></div>
        <div
          class="dialog-content"
          :class="{
            'center-content': state.props.defaultAttribute.center ? true : false
          }"
        >
          <slot name="content"> </slot>
        </div>
        <div class="cut-off-rule" v-if="state.props['showCutOffRule']"></div>
        <div
          class="dialog-footer"
          :class="{
            'center-footer': state.props.defaultAttribute.center ? true : false
          }"
          v-if="state.props['showFooter']"
        >
          <slot name="footer">
            <el-button type="primary" @click="clickSure">确定</el-button>
            <el-button @click="clickClose">取消</el-button>
          </slot>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
  /*
      modelValue 是否显示 默认 false
      show-cut-off-rule 是否显示分割线 默认 false
      show-close 是否显示关闭图标 默认 true
      show-icon 是否显示icon 默认 false   一般警告弹框会显示
      show-title 是否显示title 默认 true
      show-footer 是否显示footer 默认 true
      show-header 是否显示header 默认 true
      custom-content 是否内容全部自定义 默认 false
      defaultAttribute  默认属性   element的对话框属性
  */
  import {
    // ref,
    reactive,
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
    // v-model
    modelValue: {
      type: Boolean,
      default: false
    },
    'show-cut-off-rule': {
      type: Boolean,
      default: false
    },
    'show-close': {
      type: Boolean,
      default: true
    },
    'show-icon': {
      type: Boolean,
      default: false
    },
    'show-title': {
      type: Boolean,
      default: true
    },
    'show-footer': {
      type: Boolean,
      default: true
    },
    'show-header': {
      type: Boolean,
      default: true
    },
    'custom-content': {
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
        'show-close': false,
        width: '500px',
        center: false
      }
    }
  })
  const emit = defineEmits(['close', 'confirmClick', 'update:modelValue'])
  // 初始化 props
  function initProps() {
    // console.log('--->', 'initProps')
    const dispose = state.props
    for (const key in props) {
      if (Object.hasOwnProperty.call(dispose, key)) {
        // console.log('--->', key)
        if (key !== 'defaultAttribute') {
          dispose[key] = props[key]
        }
      } else {
        dispose[key] = props[key]
      }
    }
    for (const key in props.defaultAttribute) {
      if (Object.hasOwnProperty.call(props.defaultAttribute, key)) {
        dispose.defaultAttribute[key] = props.defaultAttribute[key]
      }
    }
    // console.log('--->', props, dispose)
  }

  // 点击关闭弹框
  function clickClose() {
    state.props.modelValue = false
  }
  function clickSure() {
    emit('confirmClick', state.props.modelValue)
  }
  // 点击关闭后回调
  function closeCallBack() {
    state.props.modelValue = false
    // console.log('--->modelValue', state.props.modelValue)
    emit('update:modelValue', state.props.modelValue)
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

<style lang="scss">
  .components-ElMessageBox {
    .dialog {
      display: flex;
      flex-direction: column;
      .dialog-header {
        display: flex;
        position: relative;
        // padding: 0 2.5rem 1rem 2.5rem;
        padding: 24px 0rem 16px 24px;
        box-sizing: border-box;
        align-items: center;
        .dialog-header-icon {
          position: absolute;
          left: 1rem;
          height: 1.5rem;
          display: flex;
          align-items: center;
          .iconpark-icon {
            width: 1.2rem;
            height: 1.2rem;
          }
        }
        .dialog-header-cont {
          color: var(--jy-color-text-1);
          font-size: var(--jy-font-size-title-1);
        }
        .dialog-header-remove {
          position: absolute;
          right: 1rem;
          cursor: pointer;
          height: 1.5rem;
          display: flex;
          align-items: center;
          .iconpark-icon {
            width: 1rem;
            height: 1rem;
          }
        }
      }
      .dialog-content {
        padding: 0rem 2.5rem;
        box-sizing: border-box;
        flex-grow: 1;
        color: var(--jy-color-text-2);
      }
      .dialog-footer {
        padding: 16px 24px 16px;
        box-sizing: border-box;
        display: flex;
        justify-content: flex-end;
      }
      .cut-off-rule {
        width: 100%;
        border-bottom: 1px solid var(--jy-color-border-2);
      }
      .center-content {
        text-align: center;
      }
      .center-footer {
        justify-content: center;
      }
    }
  }
  .components-ElMessageBox.el-dialog {
    .el-dialog__header {
      display: none;
    }
    .el-dialog__body {
      padding: 0;
      overflow: unset;
    }
  }
</style>
