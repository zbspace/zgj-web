<!-- 详情部分内容 -->
<template>
  <div class="documentsDetails-portion">
    <div class="ap-cont-box">
      <div class="ap-cont-box-title">
        <span class="ap-cont-box-title-label">
          <slot name="title"></slot>
        </span>
        <div class="ap-cont-box-title-sub">
          <slot name="subTitle"></slot>
        </div>
      </div>
      <div class="ap-cont-box-details">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>
<script setup>
  import {
    reactive,
    defineProps,
    defineEmits,
    onBeforeMount,
    onMounted
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
    data: {
      type: Array,
      default: []
    },
    // 默认属性
    defaultAttribute: {
      type: Object,
      default: {}
    }
  })
  const emit = defineEmits([])
  const state = reactive({})

  onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
  })
  onMounted(() => {
    // console.log(`the component is now mounted.`)
  })
</script>
<style lang="scss" scoped>
  .documentsDetails-portion {
    margin: 0%;

    .ap-cont-box {
      .ap-cont-box-title {
        border-bottom: 1px solid var(--jy-color-border-2);
        padding: 0rem 0 0rem 0.8rem;
        box-sizing: border-box;
        background: url(../../../assets/svg/shuxian-after.svg) no-repeat left
          center;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 2.3rem;

        .ap-cont-box-title-label {
          font-size: var(--jy-font-size-title-1);
          font-weight: var(--jy-font-weight-600);
        }

        .ap-cont-box-title-sub {
          display: flex;
          align-items: center;

          .ap-cont-box-title-sub-icon {
            margin-right: 0.5rem;
          }

          .ap-cont-box-title-sub-text {
            color: var(--jy-color-text-2);
          }
        }

        .ap-cont-box-title-but {
          .ap-cont-box-title-but-box {
            display: flex;
            align-items: center;
          }

          .ap-cont-box-title-but-icon {
            width: 0.8rem;
            margin-right: 0.2rem;
          }
        }
      }

      .ap-cont-box-details {
        padding: 0.5rem 0;
        box-sizing: border-box;
      }
    }
  }
</style>
