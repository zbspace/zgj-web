<!-- eslint-disable vue/no-mutating-props -->
<template>
  <el-dialog
    v-model="props.show"
    :show-close="false"
    :close-on-click-modal="false"
    :width="props.width"
    :draggable="draggable"
    :fullscreen="handelScreen"
    :destroy-on-close="destroyOnClose"
    class="jyDialog"
    @closed="closed"
  >
    <template #header>
      <div
        slots="header"
        class="header-custom"
        :style="{ cursor: handelScreen ? '' : 'move' }"
      >
        <div class="h-title" v-if="props.title">
          <div>{{ $t(props.title) }}</div>

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
    </template>
    <div class="content-custom" :style="{ height: props.height + 'px' }">
      <!-- 默认插槽 -->
      <slot></slot>
    </div>
    <template #footer>
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
    </template>
  </el-dialog>
</template>

<script setup>
  import { ref } from 'vue'
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
    destroyOnClose: {
      type: Boolean,
      default: false
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

  const handelScreen = ref(false)

  const handleFullScreen = () => {
    handelScreen.value = !handelScreen.value
  }

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

    emit('update:show', false)
    emit('close')
  }

  const closed = () => {
    emit('update:show', false)
    emit('close')
  }
</script>
<style lang="scss">
  .jyDialog {
    .el-dialog__header {
      padding: 0;
      margin: 0;
    }

    .el-dialog__body {
      padding: 0;
    }

    .el-dialog__footer {
      padding: 0;
    }
  }
</style>
<style lang="scss" scoped>
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
</style>
