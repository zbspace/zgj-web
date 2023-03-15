<template>
  <div
    class="custom-dialog"
    :class="showDialog ? 'animation-open' : 'animation-close'"
    :style="{ display: props.show ? 'block' : 'none' }"
  >
    <!-- 蒙层 -->
    <div
      class="mask"
      @click.stop="handleShow(false, props.closeOnClickModal)"
      v-if="props.modal"
    ></div>

    <!-- 弹窗 -->
    <div
      class="dialog"
      :class="handelScreen ? 'fullscreen-dialog' : 'middle-dialog'"
      :style="{ width: props.width + 'px', height: props.height + 'px' }"
      ref="dialogEl"
    >
      <!-- header -->
      <div
        ref="header"
        class="header-custom"
        :style="{ cursor: handelScreen ? '' : 'move' }"
      >
        <div class="h-title" v-if="props.title">
          <div>{{ props.title }}</div>

          <div class="fullscreen-icon">
            <div
              @click="handleFullScreen"
              style="margin-right: 12px"
              v-if="props.fullscreen"
            >
              <svg
                width="22"
                height="18"
                viewBox="0 0 22 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                v-if="!handelScreen"
                style="width: 20px"
              >
                <path
                  d="M19 0L21.5 0V6H18.5L18.5 3H15.5L15.5 0L19 0ZM3.00002 0L6.5 0L6.5 3H3.5L3.5 6H0.5V0L3.00002 0ZM18.5 15V12H21.5V18H15.5V15H18.5ZM3.5 15H6.5V18H0.5V12H3.5V15Z"
                  fill="black"
                  fill-opacity="0.25"
                />
              </svg>

              <svg
                width="16"
                height="22"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style="width: 20px"
                v-else
              >
                <path
                  d="M12 4H15V6H10V2L12 2V4ZM6 6H1V4H4.00001V2H6V6ZM12 12V14H10V10H15V12H12ZM6 10V14H4.00001V12H1V10H6Z"
                  fill="black"
                  fill-opacity="0.25"
                />
              </svg>
            </div>
            <div @click="handleShow(false, true)">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style="width: 18px"
              >
                <path
                  d="M10 7.83365L17.5837 0.25L19.75 2.41632L12.1663 9.99998L19.75 17.5836L17.5837 19.75L10 12.1663L2.41633 19.75L0.25 17.5836L7.83367 9.99998L0.25 2.41632L2.41633 0.25L10 7.83365Z"
                  fill="black"
                  fill-opacity="0.25"
                />
              </svg>
            </div>
          </div>
        </div>
        <slot name="header" v-else></slot>
      </div>

      <!-- content -->
      <div class="content-custom">
        <!-- 默认插槽 -->
        <slot></slot>
      </div>

      <!-- footer -->
      <!-- 按钮插槽 -->
      <slot name="footer">
        <div class="footer-custom" v-if="footer">
          <!-- 两个按钮 -->
          <div
            v-if="!oneBtn"
            class="default-footer-btns"
            :class="props.centerBtn ? 'one-btn' : 'two-btn'"
          >
            <div
              class="confirm btn"
              @click.stop="handleShow(false, true, 'confrim')"
            >
              {{ props.confirmText }}
            </div>
            <div class="concel btn" @click.stop="handleShow(false, true)">
              {{ props.concelText }}
            </div>
          </div>

          <!-- 一个按钮 -->
          <div
            class="default-footer-btns"
            v-if="oneBtn"
            :class="!props.centerBtn ? 'one-btn' : 'two-btn'"
          >
            <div class="confirm btn" @click.stop="handleShow(false, true)">
              {{ props.confirmText }}
            </div>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup>
  /**
   * show 弹窗显示 （必填）
   * title 标题
   * modal 蒙层 true 、 false
   * draggable 拖拽 true 、 false
   * width 宽度 800（默认）
   * height 高度 500（默认）
   * fullscreen 是否显示全屏
   * confrimText 确定按钮 文字
   * concelText 取消按钮 文字
   * closeOnClickModal 点击蒙层是否 关闭 true
   * oneBtn 是否是一个按钮 - 同 确认按钮 交互
   * @close 关闭回调
   */
  // <KDialog @update:show="showDialog = $event" :show="showDialog" title="Demo标题"></KDialog>
  import { ref, onMounted, watch } from 'vue'
  import { fackClickOutSide } from '@/utils/fackClickOutSide.js'

  fackClickOutSide()

  const emit = defineEmits(['update:show', 'close', 'confirm'])
  const props = defineProps({
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: null
    },
    modal: {
      type: Boolean,
      default: true
    },
    draggable: {
      type: Boolean,
      default: true
    },
    width: {
      type: Number,
      default: 800
    },
    height: {
      type: Number,
      default: 500
    },
    fullscreen: {
      type: Boolean,
      default: true
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    concelText: {
      type: String,
      default: '取消'
    },
    closeOnClickModal: {
      type: Boolean,
      default: false
    },
    oneBtn: {
      type: Boolean,
      default: false
    },
    centerBtn: {
      type: Boolean,
      default: false
    },
    footer: {
      type: Boolean,
      default: true
    }
  })

  // 自定义拖拽指令
  // const vMove = {
  //   mounted(el, binding) {
  //     const moveEl = el.firstElementChild
  //     // 是否可拖拽
  //     if (!binding.value) return

  //     const mouseDown = e => {
  //       const X = e.clientX - el.offsetLeft
  //       const Y = e.clientY - el.offsetTop
  //       const move = e => {
  //         el.style.left = e.clientX - X + 'px'
  //         el.style.top = e.clientY - Y + 'px'
  //       }
  //       document.addEventListener('mousemove', move)
  //       document.addEventListener('mouseup', () => {
  //         document.removeEventListener('mousemove', move)
  //       })
  //     }
  //     moveEl.addEventListener('mousedown', mouseDown)
  //   }
  // }

  // 开启动画自定义类名
  const showDialog = ref(true)
  const handleShow = (val, modal, type) => {
    if (!modal) {
      return
    }
    if (type === 'confrim') {
      // showDialog.value = !val
      emit('confirm')
      // emit('update:show', false)
      return
    }

    showDialog.value = val
    emit('update:show', false)
    const timer = setTimeout(() => {
      clearTimeout(timer)
      // showDialog.value = val
      const t2 = setTimeout(() => {
        clearTimeout(t2)
        emit('close')
      }, 0)
    }, 300)
  }

  // 监听全屏事件
  const handelScreen = ref(false)
  const handleFullScreen = () => {
    handelScreen.value = !handelScreen.value
  }

  const dialogEl = ref(null)
  const header = ref(null)
  const commonEvent = e => {
    if (props.draggable) {
      const X = e.clientX - dialogEl.value.offsetLeft
      const Y = e.clientY - dialogEl.value.offsetTop
      const move = e => {
        dialogEl.value.style.left = e.clientX - X + 'px'
        dialogEl.value.style.top = e.clientY - Y + 'px'
      }
      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', move)
      })
    }
  }
  onMounted(() => {
    props.draggable && header.value.addEventListener('mousedown', commonEvent)
  })

  watch(
    () => handelScreen.value,
    val => {
      !val
        ? header.value.addEventListener('mousedown', commonEvent)
        : header.value.removeEventListener('mousedown', commonEvent)
    }
  )
</script>

<style lang="scss" scoped>
  .custom-dialog {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    z-index: 1003;
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      height: 100vh;
      width: 100vw;
      background: rgba(0, 0, 0, 0.25);
      z-index: 9996;
    }

    .dialog {
      // position: absolute;
      // left: 50%;
      // right: 0;
      // bottom: 0;
      // top: 50%;
      // transform: translate(-50%, -50%);
      background: #ffffff;
      border: 1px solid rgba(0, 0, 0, 0.15);
      border-radius: 4px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      .header-custom {
        // cursor: move;
        height: 55px;
        .h-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 55px;
          font-size: 16px;
          color: rgba(0, 0, 0, 0.85);
          // border-bottom: 1px solid rgba(0, 0, 0, 0.06);
          padding: 0 12px 0 24px;
        }

        .fullscreen-icon {
          display: flex;
          cursor: pointer;
        }
      }

      .content-custom {
        flex: 1;
        flex-shrink: 0;
        padding: 12px 24px;
        overflow-y: auto;
        border-top: 1px solid rgba(0, 0, 0, 0.06);
        // border-bottom: 1px solid rgba(0, 0, 0, 0.06);
      }

      .footer-custom {
        height: 55px;
        border-top: 1px solid rgba(0, 0, 0, 0.06);
        .default-footer-btns {
          display: flex;
          // justify-content: flex-end;
          align-items: center;
          height: 55px;
          // border-top: 1px solid rgba(0, 0, 0, 0.06);

          .btn {
            min-width: 60px;
            padding: 0 10px;
            height: 32px;
            margin: 0 8px;
            text-align: center;
            line-height: 32px;
            font-size: 14px;
            border-radius: 4px;
            cursor: pointer;
          }

          .confirm {
            color: #ffffff;
            background: #d0963e;
          }

          .confirm:hover {
            background: #d9ab5b;
          }

          .confirm:active {
            background: #af7427;
          }

          .concel {
            color: rgba(0, 0, 0, 0.65);
            background: #ffffff;
            border: 1px solid rgba(0, 0, 0, 0.15);
          }

          .concel:hover {
            background: rgba(#d9ab5b, 0.15);
            border: 1px solid rgba(#d9ab5b, 0.15);
          }
        }

        .two-btn {
          justify-content: flex-end;
        }

        .one-btn {
          justify-content: center;
        }
      }
    }

    .fullscreen-dialog {
      position: absolute;
      height: 100vh !important;
      width: 100vw !important;
      top: 0 !important;
      left: 0 !important;
    }

    .middle-dialog {
      position: absolute;
      left: 50%;
      right: 0;
      bottom: 0;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .animation-open {
    animation: open 0.3s;

    @keyframes open {
      0% {
        opacity: 0;
      }

      100% {
        opacity: 1;
      }
    }
  }

  .animation-close {
    animation: close 0.3s;

    @keyframes close {
      0% {
        opacity: 1;
      }

      100% {
        opacity: 0;
      }
    }
  }
</style>
