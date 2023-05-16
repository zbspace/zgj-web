<!--
* @Descripttion JyTabs.vue
* @FileName JyTabs.vue
* @Author WalterXsk
* @LastEditTime 2023-03-22 15:02:04
!-->
<template>
  <div class="custom-tabs" :class="border ? 'tabs-border' : ''">
    <div v-for="(item, index) in props.label" :key="index">
      <el-badge is-dot class="share-dot" :hidden="hiddenBadge">
        <div
          :class="props.active === item.value ? 'actived' : ''"
          class="item"
          @click="handleTab(item.value)"
          >{{ $t(item.name) }}
        </div>
      </el-badge>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    active: {
      type: String,
      default: 'first'
    },
    label: {
      type: Array,
      default() {
        return []
      }
    },
    border: {
      type: Boolean,
      default: true
    },
    hiddenBadge: {
      type: Boolean,
      default: true
    }
  })
  const emit = defineEmits(['update:active'])
  const handleTab = val => {
    emit('update:active', val)
  }
</script>

<style lang="scss" scoped>
  .custom-tabs {
    display: flex;
    // border-bottom: 1px solid rgba(0, 0, 0, 0.06);

    .item {
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.45);
      height: 30px;
      line-height: 24px;
      // margin: 0 14px;
      margin-right: 24px;
      cursor: pointer;
    }

    .actived {
      color: var(--jy-primary-6);
      border-bottom: 2px solid var(--jy-primary-6);
    }
  }
  .tabs-border {
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  }
  .share-dot {
    :deep(.is-dot) {
      margin-right: 20px;
      margin-top: 4px;
    }
  }
</style>
