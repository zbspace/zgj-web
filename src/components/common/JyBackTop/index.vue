<template>
  <div class="back-top">
    <div class="back-top-item" @click.stop="scrollToTop">
      <div class="back-top-item-curtain">
        <svg class="iconpark-icon"><use href="#toTop"></use></svg>
      </div>
      <div class="back-top-item-mask"></div>
      <div class="back-top-item-content">TT</div>
    </div>

    <div @click.stop="" class="back-top-item">
      <div class="back-top-item-curtain">
        <svg class="iconpark-icon"><use href="#kf"></use></svg>
      </div>
      <div class="back-top-item-mask"></div>
      <div class="back-top-item-content">KF</div>
    </div>

    <div @click.stop="showRightBar" class="back-top-item">
      <div class="back-top-item-curtain back-top-item-curtain-bg">
        <svg class="iconpark-icon"><use href="#setting"></use></svg>
      </div>
      <div class="back-top-item-mask"></div>
      <div class="back-top-item-content">RB</div>
    </div>
  </div>
</template>

<script setup>
  import { useLayoutStore } from '@/store/layout'

  const layoutStore = useLayoutStore()
  const emit = defineEmits(['on-scrollToTop'])

  const scrollToTop = () => {
    emit('on-scrollToTop')
  }

  const showRightBar = () => {
    layoutStore.setRightBarVisible(true)
  }
</script>

<style lang="scss" scoped>
  .back-top {
    width: 48px;
    height: 96px;
    padding: 8px 4px;
    position: fixed;
    bottom: 220px;
    right: 48px;
    z-index: 10;
    .iconpark-icon {
      width: 20px;
      height: 20px;
    }
    .back-top-item {
      position: relative;
      line-height: 44px;
      width: 44px;
      height: 44px;
      background: #ffffff;
      box-shadow: 0px 6px 16px -8px rgba(0, 0, 0, 0.08),
        0px 9px 28px rgba(0, 0, 0, 0.05), 0px 12px 48px 16px rgba(0, 0, 0, 0.03);
      border-radius: 4px;
      margin-bottom: 14px;
      cursor: pointer;
      line-height: 50px;
      .back-top-item-curtain {
        height: inherit;
        width: inherit;
        border-radius: 50%;
        text-align: center;
      }
      .back-top-item-mask {
        visibility: hidden;
        height: 8px;
        width: 8px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -4px;
        margin-top: -4px;
        background-color: #ff5a2c;
        transform-origin: center center;
        transition: all 0.2s linear;
        border-radius: 50%;
        z-index: 0;
      }
      .back-top-item-content {
        opacity: 0;
        height: inherit;
        width: inherit;
        position: absolute;
        left: 0;
        top: 0;
        font-size: 13px;
        overflow: hidden;
        color: #fff;
        font-weight: 500;
        border-radius: 50%;
        text-align: center;
        z-index: 99;
      }
      .back-top-item-curtain-bg {
        background: #d0963e;
        box-shadow: 0px 3px 6px -4px rgba(208, 150, 62, 0.7),
          0px 6px 16px rgba(208, 150, 62, 0.08),
          0px 9px 28px 8px rgba(208, 150, 62, 0.05);
        border-radius: 4px;
      }
      &:hover {
        .back-top-item-content {
          opacity: 1;
        }
        .back-top-item-mask {
          visibility: visible;
          transform: scale(5);
        }
      }
    }
  }
</style>
