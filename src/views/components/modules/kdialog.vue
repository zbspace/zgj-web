<template>
  <div class="custom-dialog" :class="showDialog ? 'animation-open' : 'animation-close' " :style="{ display: props.show ? 'block' : 'none'}">

    <!-- 蒙层 -->
    <div class="mask" @click.stop="handleShow(false, props.closeOnClickModal)" v-if="props.modal"></div>

    <!-- 弹窗 -->
    <div class="dialog" v-move="props.draggable ? true : false"  :class="handelScreen ? 'fullscreen-dialog' : 'middle-dialog'" :style="{ width: props.width + 'px', height: props.height + 'px' }">
      
      <!-- header -->
      <div class="header-custom" :style="{ cursor: handelScreen ? '' : 'move'}">

        <div class="h-title" v-if="props.title">
          <div>{{ props.title }}</div>

          <div class="fullscreen-icon">
            <div @click="handleFullScreen" style="margin-right: 4px;" v-if="props.fullscreen">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" v-if="!handelScreen" >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M20 3h2v6h-2V5h-4V3h4zM4 3h4v2H4v4H2V3h2zm16 16v-4h2v6h-6v-2h4zM4 19h4v2H2v-6h2v4z"
                  fill="rgba(0,0,0,0.25)" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" v-else>
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M18 7h4v2h-6V3h2v4zM8 9H2V7h4V3h2v6zm10 8v4h-2v-6h6v2h-4zM8 15v6H6v-4H2v-2h6z" fill="rgba(0,0,0,0.25)" />
              </svg>
            </div>
            <div @click="handleShow(false, true)">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26">
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"
                fill="rgba(0,0,0,0.25)" />
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
      <div class="footer-custom">
        <!-- 两个按钮 -->
        <div v-if="!oneBtn" class="default-footer-btns" :class="props.centerBtn ? 'one-btn' : 'two-btn'">
          <div class="confirm btn" @click.stop="handleShow(false, true, 'confrim')">{{ props.confirmText }}</div>
          <div class="concel btn" @click.stop="handleShow(false, true)">{{ props.concelText }}</div>
        </div>

        <!-- 一个按钮 -->
        <div class="default-footer-btns" v-if="oneBtn" :class="!props.centerBtn ? 'one-btn' : 'two-btn'">
          <div class="confirm btn" @click.stop="handleShow(false, true)">{{ props.confirmText }}</div>
        </div>
        <!-- <slot name="footer" v-else></slot> -->
      </div>
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
import { defineProps, defineEmits, ref } from 'vue';
import { fackClickOutSide } from '@/hooks/fackClickOutSide.js'

fackClickOutSide()

const emit = defineEmits(['update:show', 'close'])
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
  }
})

// 自定义拖拽指令
const vMove = {
  mounted(el, binding) {
    let moveEl = el.firstElementChild;

    // 是否可拖拽
    if (!binding.value) return

    const mouseDown = (e) => {
      let X = e.clientX - el.offsetLeft;
      let Y = e.clientY - el.offsetTop;
      const move = (e) => {
        el.style.left = e.clientX - X + "px";
        el.style.top = e.clientY - Y + "px";
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", () => {
        document.removeEventListener("mousemove", move);
      });
    };
    moveEl.addEventListener("mousedown", mouseDown);
  },
};

// 开启动画自定义类名
let showDialog = ref(true)
const handleShow = (val, modal, type) => {
  if (!modal) {
    return
  }
  if (type === 'confrim') {
    emit('close', true)
    return
  }
  showDialog.value = val
  let timer = setTimeout(() => {
    clearTimeout(timer)
    emit('update:show', val)
    emit('close')
    showDialog.value = !val
  }, 300)
}

// 监听全屏事件
let handelScreen = ref(false)
const handleFullScreen = () => {
  handelScreen.value = !handelScreen.value
}
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
    background: #FFFFFF;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    .header-custom {
      // cursor: move;

      .h-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 55px;
        font-size: 16px;
        color: rgba(0, 0, 0, 0.85);
        border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        padding: 0 12px 0 24px;
      }

      .fullscreen-icon {
        display: flex;
        cursor: pointer;
      }
    }

    .content-custom {
      flex: 1;
      padding: 20px;
      overflow-y: auto;
    }

    .footer-custom {
      .default-footer-btns {
        display: flex;
        // justify-content: flex-end;
        align-items: center;
        height: 55px;
        border-top: 1px solid rgba(0, 0, 0, 0.06);

        .btn {
          min-width: 60px;
          height: 32px;
          margin: 0 8px;
          text-align: center;
          line-height: 16px;
          font-size: 14px;
          border-radius: 4px;
        }

        .confirm {
          color: #FFFFFF;
          background: #d0963e;
        }

        .confirm:hover {
          background: #D9AB5B;
        }

        .confirm:active {
          background: #AF7427;
        }

        .concel {
          color: rgba(0, 0, 0, 0.65);
          background: #FFFFFF;
          border: 1px solid rgba(0, 0, 0, 0.15);
        }

        .concel:hover {
          background: rgba(#D9AB5B, 0.15);
          border: 1px solid rgba(#D9AB5B, 0.15);
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
    height: 100vh!important;
    width: 100vw!important;
    top: 0!important;
    left: 0!important;
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
  animation: open .3s;

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
  animation: close .3s;

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