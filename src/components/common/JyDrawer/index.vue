<!-- eslint-disable vue/no-mutating-props -->
<!--
* @Descripttion index.vue
* @FileName index.vue
* @Author zb
* @module 
* @LastEditTime 2023-04-07 09:26:29
!-->
<template>
  <div>
    <el-drawer
      v-model="modelValue"
      :direction="direction"
      :size="size"
      fullscreen
      class="jy-drawer"
      :show-close="false"
      :before-close="beforeClose"
      @open="open"
      @opened="opened"
      @close="close"
      @closed="closed"
      v-bind="props.attributes"
      :destroy-on-close="true"
    >
      <template #header>
        <slot name="header">
          <div class="ap-cont">
            <div class="ap-cont-box ap-title">
              <div class="title-name">
                <span class="title-name-span">{{ props.title }}</span>
              </div>
              <div class="title-cion">
                <img
                  class="title-cion-img quanping"
                  src="@/assets/svg/quanping.svg"
                  alt=""
                  @click="ClickOnFullScreen"
                  v-if="fullScreenStatus == 0"
                />
                <img
                  class="title-cion-img quanping"
                  src="@/assets/svg/quanping-close.svg"
                  alt=""
                  @click="ClickCloseFullScreen"
                  v-if="fullScreenStatus == 1"
                />
                <img
                  class="title-cion-img shanchu"
                  src="@/assets/svg/cha-kong.svg"
                  alt=""
                  srcset=""
                  @click="beforeClose"
                />
              </div>
            </div>
          </div>
        </slot>
      </template>

      <slot></slot>

      <template #footer>
        <slot name="footer"></slot>
      </template>
    </el-drawer>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'

  const fullScreenStatus = ref(0)
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    direction: {
      type: String,
      default: 'rtl'
    },
    size: {
      type: String,
      default: '800px'
    },
    title: {
      type: String,
      default: '详情'
    },
    // 属性集合，优先级比上面的props高
    attributes: {
      type: Object,
      default: () => {
        return {}
      }
    }
  })
  const size = ref(props.size)

  const emit = defineEmits([
    'update:modelValue',
    'beforeClose',
    'open',
    'opened',
    'close',
    'closed'
  ])

  const beforeClose = () => {
    emit('update:modelValue', false)
  }

  const ClickOnFullScreen = () => {
    size.value = '100%'
    fullScreenStatus.value = 1
  }
  const ClickCloseFullScreen = () => {
    size.value = props.size
    fullScreenStatus.value = 0
  }

  const open = () => {
    emit('open')
  }
  const opened = () => {
    emit('opened')
  }
  const close = () => {
    emit('close')
  }
  const closed = () => {
    emit('closed')
  }

  onMounted(() => {})
</script>

<script>
  export default { name: 'JyDrawer' }
</script>
<style lang="scss" scoped>
  :deep(.jy-drawer) {
    .ap-cont {
      height: 100%;
      padding: 16px 24px;
    }
    .el-drawer__header {
      padding: 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    }

    .ap-title {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title-name-span {
        font-size: var(--jy-font-size-title-2);
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        color: rgba(0, 0, 0, 0.85);
      }

      .title-cion-img {
        width: 12px;
        height: 12px;
        margin-left: 16px;
        cursor: pointer;
      }

      .quanping {
        width: 1.2rem;
      }
    }
  }
</style>
