<!-- 信息列表 -->
<template>
  <div class="documentsDetails-informationList">
    <div class="ap-cont">
      <div class="ap-cont-details">
        <div
          class="ap-cont-list"
          :class="{ 'ap-cont-list-add': item.label === '骑缝盖章' }"
          v-for="item in props.data"
          :style="item.lineStyle"
          :key="item.label"
        >
          <div class="ap-cont-list-label" :style="[labelStyle, item.labelStyle]"
            >{{ $t(item.label) }}：
          </div>
          <div class="ap-cont-list-value" :style="item.valStyle">
            <img
              class="ap-cont-list-value-icon"
              :src="icon[item.iconPath]"
              :style="item.iconStyle"
              v-if="item.iconPath"
            />
            {{ item.value }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  import yuanLv from '@/assets/svg/common/yuan-lv.svg'
  import { ref } from 'vue'

  const icon = ref({
    yuanLv
  })
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
    data: {
      type: Array,
      default() {
        return []
      }
    },
    labelStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    // 默认属性
    defaultAttribute: {
      type: Object,
      default() {
        return {}
      }
    }
  })
</script>
<style lang="scss" scoped>
  .documentsDetails-informationList {
    margin: 0%;

    .ap-cont {
      .ap-cont-details {
        display: flex;
        flex-flow: wrap;
        padding: 0.5rem 0;
        box-sizing: border-box;

        .ap-cont-list {
          display: flex;
          align-items: center;
          width: 50%;
          padding: 0.5rem 0;
          box-sizing: border-box;

          .ap-cont-list-label {
            width: 90px;
            display: flex;
            justify-content: flex-end;
            color: var(--jy-color-text-3);
            flex-shrink: 0;
          }

          .ap-cont-list-value {
            padding: 0rem 0 0rem 0.5rem;
            box-sizing: border-box;
          }
        }
        .ap-cont-list-add {
          width: 100%;
        }
      }
    }
  }
</style>
