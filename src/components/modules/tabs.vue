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
  import { defineProps, defineEmits } from 'vue'
  const emit = defineEmits(['update:active'])
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
      color: #d0963e;
      border-bottom: 2px solid #d0963e;
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
