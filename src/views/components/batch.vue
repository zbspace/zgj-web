<template>
  <div class="components-batch">
    <div class="ap-box">
      <slot>
        <div class="ap-box-left" v-if="state.props.data.length > 0">
          <el-button
            v-bind="state.props.defaultAttribute"
            v-for="(item, index) in state.props.data"
            :key="index"
            @click="clickBatchButton(item, index)"
          >
            {{ item.name }}
          </el-button>
        </div>
      </slot>
      <div class="ap-box-right">
        <div class="ap-box-right-fill shuaxin">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="ap-box-right-icon"
          >
            <path
              d="M2.0778 1.4598C3.16654 0.516402 4.55939 -0.00200392 6 5.82159e-06C9.3138 5.82159e-06 12 2.6862 12 6C12 7.2816 11.598 8.4696 10.914 9.444L9 6H10.8C10.8001 5.05898 10.5235 4.13868 10.0048 3.35356C9.48605 2.56843 8.74796 1.9531 7.88231 1.58408C7.01666 1.21506 6.06163 1.10863 5.13597 1.27802C4.21032 1.4474 3.35487 1.88514 2.676 2.5368L2.0778 1.4598ZM9.9222 10.5402C8.83347 11.4836 7.44061 12.002 6 12C2.6862 12 0 9.3138 0 6C0 4.7184 0.402 3.5304 1.086 2.556L3 6H1.2C1.19992 6.94102 1.47645 7.86132 1.9952 8.64644C2.51395 9.43157 3.25204 10.0469 4.11769 10.4159C4.98334 10.7849 5.93837 10.8914 6.86403 10.722C7.78968 10.5526 8.64513 10.1149 9.324 9.4632L9.9222 10.5402Z"
              fill="black"
              fill-opacity="0.45"
            />
          </svg>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="ap-box-right-icon checked"
          >
            <path
              d="M2.0778 1.4598C3.16654 0.516402 4.55939 -0.00200392 6 5.82159e-06C9.3138 5.82159e-06 12 2.6862 12 6C12 7.2816 11.598 8.4696 10.914 9.444L9 6H10.8C10.8001 5.05898 10.5235 4.13868 10.0048 3.35356C9.48605 2.56843 8.74796 1.9531 7.88231 1.58408C7.01666 1.21506 6.06163 1.10863 5.13597 1.27802C4.21032 1.4474 3.35487 1.88514 2.676 2.5368L2.0778 1.4598ZM9.9222 10.5402C8.83347 11.4836 7.44061 12.002 6 12C2.6862 12 0 9.3138 0 6C0 4.7184 0.402 3.5304 1.086 2.556L3 6H1.2C1.19992 6.94102 1.47645 7.86132 1.9952 8.64644C2.51395 9.43157 3.25204 10.0469 4.11769 10.4159C4.98334 10.7849 5.93837 10.8914 6.86403 10.722C7.78968 10.5526 8.64513 10.1149 9.324 9.4632L9.9222 10.5402Z"
              fill="#d0963e"
              fill-opacity="1"
            />
          </svg>
        </div>
        <div class="ap-box-right-fill daochu">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="ap-box-right-icon"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.59998 8.3996V4.1996H9.59998L5.99998 0.599609L2.39999 4.1996H5.39998V8.3996H6.59998ZM10.8 10.1996H1.2V5.9996H0V10.7996C0 11.131 0.268629 11.3996 0.599999 11.3996H11.4C11.7314 11.3996 12 11.131 12 10.7996V5.9996H10.8V10.1996Z"
              fill="black"
              fill-opacity="0.45"
            />
          </svg>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="ap-box-right-icon checked"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.59998 8.3996V4.1996H9.59998L5.99998 0.599609L2.39999 4.1996H5.39998V8.3996H6.59998ZM10.8 10.1996H1.2V5.9996H0V10.7996C0 11.131 0.268629 11.3996 0.599999 11.3996H11.4C11.7314 11.3996 12 11.131 12 10.7996V5.9996H10.8V10.1996Z"
              fill="#d0963e"
              fill-opacity="1"
            />
          </svg>
        </div>
        <div class="ap-box-right-fill dayin">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="ap-box-right-icon"
          >
            <path
              d="M2.4 10.2H0.6C0.44087 10.2 0.288258 10.1368 0.175736 10.0243C0.0632141 9.91174 0 9.75913 0 9.6V3.6C0 3.44087 0.0632141 3.28826 0.175736 3.17574C0.288258 3.06321 0.44087 3 0.6 3H2.4V0.6C2.4 0.44087 2.46321 0.288258 2.57574 0.175736C2.68826 0.0632141 2.84087 0 3 0H9C9.15913 0 9.31174 0.0632141 9.42426 0.175736C9.53679 0.288258 9.6 0.44087 9.6 0.6V3H11.4C11.5591 3 11.7117 3.06321 11.8243 3.17574C11.9368 3.28826 12 3.44087 12 3.6V9.6C12 9.75913 11.9368 9.91174 11.8243 10.0243C11.7117 10.1368 11.5591 10.2 11.4 10.2H9.6V11.4C9.6 11.5591 9.53679 11.7117 9.42426 11.8243C9.31174 11.9368 9.15913 12 9 12H3C2.84087 12 2.68826 11.9368 2.57574 11.8243C2.46321 11.7117 2.4 11.5591 2.4 11.4V10.2ZM2.4 9V8.4C2.4 8.24087 2.46321 8.08826 2.57574 7.97574C2.68826 7.86321 2.84087 7.8 3 7.8H9C9.15913 7.8 9.31174 7.86321 9.42426 7.97574C9.53679 8.08826 9.6 8.24087 9.6 8.4V9H10.8V4.2H1.2V9H2.4ZM3.6 1.2V3H8.4V1.2H3.6ZM3.6 9V10.8H8.4V9H3.6ZM1.8 4.8H3.6V6H1.8V4.8Z"
              fill="black"
              fill-opacity="0.45"
            />
          </svg>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="ap-box-right-icon checked"
          >
            <path
              d="M2.4 10.2H0.6C0.44087 10.2 0.288258 10.1368 0.175736 10.0243C0.0632141 9.91174 0 9.75913 0 9.6V3.6C0 3.44087 0.0632141 3.28826 0.175736 3.17574C0.288258 3.06321 0.44087 3 0.6 3H2.4V0.6C2.4 0.44087 2.46321 0.288258 2.57574 0.175736C2.68826 0.0632141 2.84087 0 3 0H9C9.15913 0 9.31174 0.0632141 9.42426 0.175736C9.53679 0.288258 9.6 0.44087 9.6 0.6V3H11.4C11.5591 3 11.7117 3.06321 11.8243 3.17574C11.9368 3.28826 12 3.44087 12 3.6V9.6C12 9.75913 11.9368 9.91174 11.8243 10.0243C11.7117 10.1368 11.5591 10.2 11.4 10.2H9.6V11.4C9.6 11.5591 9.53679 11.7117 9.42426 11.8243C9.31174 11.9368 9.15913 12 9 12H3C2.84087 12 2.68826 11.9368 2.57574 11.8243C2.46321 11.7117 2.4 11.5591 2.4 11.4V10.2ZM2.4 9V8.4C2.4 8.24087 2.46321 8.08826 2.57574 7.97574C2.68826 7.86321 2.84087 7.8 3 7.8H9C9.15913 7.8 9.31174 7.86321 9.42426 7.97574C9.53679 8.08826 9.6 8.24087 9.6 8.4V9H10.8V4.2H1.2V9H2.4ZM3.6 1.2V3H8.4V1.2H3.6ZM3.6 9V10.8H8.4V9H3.6ZM1.8 4.8H3.6V6H1.8V4.8Z"
              fill="#d0963e"
              fill-opacity="1"
            />
          </svg>
        </div>
        <div class="ap-box-right-fill quanping">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="ap-box-right-icon"
          >
            <path
              d="M10.5714 0L12 0V4H10.5714V1.5H8.57143V0L10.5714 0ZM1.42858 0L3.42857 0V1.5H1.42858L1.42858 4H0V0L1.42858 0ZM10.5714 10.5V8H12V12H8.57143V10.5H10.5714ZM1.42858 10.5H3.42857V12H0V8H1.42858V10.5Z"
              fill="black"
              fill-opacity="0.45"
            />
          </svg>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="ap-box-right-icon checked"
          >
            <path
              d="M10.5714 0L12 0V4H10.5714V1.5H8.57143V0L10.5714 0ZM1.42858 0L3.42857 0V1.5H1.42858L1.42858 4H0V0L1.42858 0ZM10.5714 10.5V8H12V12H8.57143V10.5H10.5714ZM1.42858 10.5H3.42857V12H0V8H1.42858V10.5Z"
              fill="#d0963e"
              fill-opacity="1"
            />
          </svg>
        </div>
        <div class="ap-box-right-fill shezhi">
          <svg
            width="12"
            height="10"
            viewBox="0 0 12 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="ap-box-right-icon"
          >
            <path
              d="M0 8.08556H4.03265V9.24064H0V8.08556ZM0 4.04278H5.18483V5.19786H0V4.04278ZM0 0H11.5218V1.15508H0V0ZM10.7579 5.2123L11.4239 4.98648L12 5.98678L11.4723 6.4517C11.5387 6.76741 11.5387 7.09355 11.4723 7.40926L12 7.87418L11.4239 8.87448L10.7579 8.64866C10.5217 8.86235 10.2406 9.02695 9.93125 9.12802L9.79357 9.81818H8.64138L8.50312 9.12744C8.19737 9.02727 7.91595 8.86398 7.677 8.64809L7.01104 8.87448L6.43495 7.87418L6.96265 7.40926C6.89623 7.09355 6.89623 6.76741 6.96265 6.4517L6.43495 5.98678L7.01104 4.98648L7.677 5.2123C7.9132 4.99861 8.19433 4.83401 8.5037 4.73294L8.64138 4.04278H9.79357L9.93183 4.73352C10.2406 4.83401 10.5217 4.99919 10.7579 5.21288V5.2123ZM9.21747 8.08556C9.52305 8.08556 9.81612 7.96387 10.0322 7.74725C10.2483 7.53063 10.3697 7.23683 10.3697 6.93048C10.3697 6.62414 10.2483 6.33034 10.0322 6.11372C9.81612 5.8971 9.52305 5.7754 9.21747 5.7754C8.9119 5.7754 8.61883 5.8971 8.40276 6.11372C8.18668 6.33034 8.06529 6.62414 8.06529 6.93048C8.06529 7.23683 8.18668 7.53063 8.40276 7.74725C8.61883 7.96387 8.9119 8.08556 9.21747 8.08556Z"
              fill="black"
              fill-opacity="0.45"
            />
          </svg>
          <svg
            width="12"
            height="10"
            viewBox="0 0 12 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="ap-box-right-icon checked"
          >
            <path
              d="M0 8.08556H4.03265V9.24064H0V8.08556ZM0 4.04278H5.18483V5.19786H0V4.04278ZM0 0H11.5218V1.15508H0V0ZM10.7579 5.2123L11.4239 4.98648L12 5.98678L11.4723 6.4517C11.5387 6.76741 11.5387 7.09355 11.4723 7.40926L12 7.87418L11.4239 8.87448L10.7579 8.64866C10.5217 8.86235 10.2406 9.02695 9.93125 9.12802L9.79357 9.81818H8.64138L8.50312 9.12744C8.19737 9.02727 7.91595 8.86398 7.677 8.64809L7.01104 8.87448L6.43495 7.87418L6.96265 7.40926C6.89623 7.09355 6.89623 6.76741 6.96265 6.4517L6.43495 5.98678L7.01104 4.98648L7.677 5.2123C7.9132 4.99861 8.19433 4.83401 8.5037 4.73294L8.64138 4.04278H9.79357L9.93183 4.73352C10.2406 4.83401 10.5217 4.99919 10.7579 5.21288V5.2123ZM9.21747 8.08556C9.52305 8.08556 9.81612 7.96387 10.0322 7.74725C10.2483 7.53063 10.3697 7.23683 10.3697 6.93048C10.3697 6.62414 10.2483 6.33034 10.0322 6.11372C9.81612 5.8971 9.52305 5.7754 9.21747 5.7754C8.9119 5.7754 8.61883 5.8971 8.40276 6.11372C8.18668 6.33034 8.06529 6.62414 8.06529 6.93048C8.06529 7.23683 8.18668 7.53063 8.40276 7.74725C8.61883 7.96387 8.9119 8.08556 9.21747 8.08556Z"
              fill="#d0963e"
              fill-opacity="1"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  import {
    reactive,
    defineProps,
    // defineEmits,
    onBeforeMount,
    onMounted,
    watch
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
    // 布局
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 属性
    defaultAttribute: {
      type: Object,
      default: () => {
        return {}
      }
    }
  })
  const emit = defineEmits(['clickBatchButton'])
  const state = reactive({
    props: {
      data: []
    }
  })
  // console.log(props.data);

  // 初始化数据
  function initData() {
    state.props.data = props.data
    state.props.defaultAttribute = props.defaultAttribute
  }

  // 点击批量按钮
  function clickBatchButton(item, index) {
    emit('clickBatchButton', item, index)
  }

  watch(props, (newValue, oldValue) => {
    // console.log(newValue, oldValue);
    // 初始化数据
    initData()
  })
  onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
    // 初始化数据
    initData()
  })
  onMounted(() => {
    // console.log(`the component is now mounted.`)
  })
</script>
<style lang="scss" scoped>
  .components-batch {
    margin: 0%;
    width: 100%;
    .ap-box {
      width: 100%;
      display: flex;
      flex-flow: wrap;
      justify-content: flex-start;
      align-items: flex-end;
      align-content: flex-end;
      .ap-box-left {
        .el-button {
          font-size: var(--jy-font-size-caption);
        }
      }
      .ap-box-right {
        margin-left: auto;
        display: flex;
        align-items: center;
        .ap-box-right-icon {
          cursor: pointer;
          @include mixin-width(16);
          @include mixin-height(16);
        }
        .checked {
          display: none;
        }
        .ap-box-right-fill {
          @include mixin-margin-right(16);
        }
        .shuaxin:hover {
          .ap-box-right-icon {
            display: none;
          }
          .checked {
            display: inline-block;
          }
        }
        .daochu:hover {
          .ap-box-right-icon {
            display: none;
          }
          .checked {
            display: inline-block;
          }
        }
        .dayin:hover {
          .ap-box-right-icon {
            display: none;
          }
          .checked {
            display: inline-block;
          }
        }
        .quanping:hover {
          .ap-box-right-icon {
            display: none;
          }
          .checked {
            display: inline-block;
          }
        }
        .shezhi:hover {
          .ap-box-right-icon {
            display: none;
          }
          .checked {
            display: inline-block;
          }
        }
      }
    }

    .margin-0 {
      margin: 0% !important;
    }
  }
</style>
