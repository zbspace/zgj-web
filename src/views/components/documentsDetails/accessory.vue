<!-- 附件 -->
<template>
  <div class="documentsDetails-accessory">
    <div
      class="ap-box printed"
      v-if="props.printedData && props.printedData.length > 0"
    >
      <div class="ap-box-title">用印文件</div>
      <div
        class="ap-box-cont"
        v-for="(item, index) in props.printedData"
        :key="index"
      >
        <div class="ap-box-cont-desc">
          <span class="ap-box-cont-desc-name">{{ item.fileOriginName }}</span>
          <span class="ap-box-cont-desc-size"
            >（{{ item.fileSizeByte }}KB）</span
          >
        </div>
        <div class="ap-box-cont-caozuo">
          <span class="ap-box-cont-caozuo-yulan">预览</span>
          <span class="ap-box-cont-caozuo-xiazai">下载</span>
          <span class="ap-box-cont-caozuo-dayin">
            <img
              class="ap-box-cont-caozuo-dayin-image"
              src="../../../assets/svg/fangwei-dayin.svg"
              alt=""
            />
            <span class="ap-box-cont-caozuo-dayin-span">防伪打印</span>
          </span>
        </div>
      </div>
    </div>
    <div
      class="ap-box additional"
      v-if="props.additionalData && props.additionalData.length > 0"
    >
      <div class="ap-box-title">补充文件</div>
      <div
        class="ap-box-cont"
        v-for="(item, index) in props.additionalData"
        :key="index"
      >
        <div class="ap-box-cont-desc">
          <span class="ap-box-cont-desc-name">{{ item.fileOriginName }}</span>
          <span class="ap-box-cont-desc-size"
            >（{{ item.fileSizeByte }}KB）</span
          >
        </div>
        <div class="ap-box-cont-caozuo">
          <span class="ap-box-cont-caozuo-yulan">预览</span>
          <span class="ap-box-cont-caozuo-xiazai">下载</span>
          <span class="ap-box-cont-caozuo-dayin">
            <img
              class="ap-box-cont-caozuo-dayin-image"
              src="../../../assets/svg/fangwei-dayin.svg"
              alt=""
            />
            <span class="ap-box-cont-caozuo-dayin-span">防伪打印</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { onBeforeMount, onMounted } from 'vue'
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
    // 用印文件
    printedData: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 补充文件
    additionalData: {
      type: Array,
      default: () => {
        return []
      }
    }
  })

  onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
  })
  onMounted(() => {
    // console.log(`the component is now mounted.`)
  })
</script>
<style lang="scss" scoped>
  .documentsDetails-accessory {
    margin: 0%;

    .ap-box {
      .ap-box-title {
        font-size: var(--jy-font-size-body-2);
        color: var(--jy-color-text-3);
      }

      .ap-box-cont {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: var(--jy-color-fill--1);
        padding: 0.8rem 1.5rem;
        box-sizing: border-box;
        border-radius: var(--jy-border-radius-4);
        margin: 0.8rem 0rem;

        .ap-box-cont-desc {
          width: calc(100% - 12rem);

          .ap-box-cont-desc-name {
            margin-right: 0.5rem;
          }
        }

        .ap-box-cont-caozuo {
          width: 12rem;
          display: flex;
          justify-content: space-between;

          .ap-box-cont-caozuo-yulan {
            color: var(--jy-warning-6);
            cursor: pointer;
          }

          .ap-box-cont-caozuo-xiazai {
            margin-left: 0.5rem;
            color: var(--jy-info-6);
            cursor: pointer;
          }

          .ap-box-cont-caozuo-dayin {
            margin-left: 0.5rem;
            color: var(--jy-info-6);
            cursor: pointer;

            .ap-box-cont-caozuo-dayin-image {
              margin-right: 0.3rem;
            }
          }
        }
      }
    }
  }
</style>
