<!-- 附件 -->
<template>
  <div class="Record-of-requisition-Seal-Information">
    <div class="SealInformation-details SealInformation">
      <div class="SealInformation-details-list" v-for="item in props.data">
        <div class="SealInformation-details-list-cont">
          <div class="SealInformation-details-list-cont-icon">
            <img
              class="SealInformation-details-list-cont-icon-img"
              :src="item.iconPath"
              alt=""
            />
          </div>
          <div class="SealInformation-details-list-cont-label">
            {{ item.label }}：
          </div>
          <div
            class="SealInformation-details-list-cont-val"
            :style="item.style"
          >
            <img
              v-if="item.iconPathValue"
              :src="item.iconPathValue"
              alt=""
              class="iconPathValue"
            />
            {{ item.value }}
          </div>
        </div>
        <div class="SealInformation-details-list-sub">
          <div
            class="SealInformation-details-list-sub-Text"
            :style="item.subStyle"
          >
            {{ item.subText }}
          </div>
        </div>
      </div>
      <div class="SealInformation-details-image">
        <div class="SealInformation-details-image-title">
          <img
            class="SealInformation-details-image-title-icon"
            :src="props.imageData.iconPath"
            alt=""
          />
          <span class="SealInformation-details-image-title-text">
            {{ props.imageData.label }}
          </span>
        </div>
        <div class="SealInformation-details-image-cont">
          <div
            class="SealInformation-details-image-cont-list"
            v-for="item in props.imageData.data"
          >
            <div class="SealInformation-details-image-cont-list-img">
              <img
                class="SealInformation-details-image-cont-list-img-icon"
                :src="item.iconPath"
                alt=""
              />
              <img
                class="SealInformation-details-image-cont-list-img-back"
                :src="item.imgPath"
                alt=""
              />
              <div class="SealInformation-details-image-cont-list-img-time">
                {{ item.time }}</div
              >
            </div>
            <div class="SealInformation-details-image-cont-list-cont">
              <div
                class="SealInformation-details-image-cont-list-cont-list"
                v-for="data in item.list"
              >
                <div
                  class="SealInformation-details-image-cont-list-cont-list-label"
                >
                  {{ data.label }}：</div
                >
                <div
                  class="SealInformation-details-image-cont-list-cont-list-value"
                >
                  {{ data.value }}</div
                >
                <div
                  class="SealInformation-details-image-cont-list-cont-list-subValue"
                >
                  <img
                    class="SealInformation-details-image-cont-list-cont-list-subValue-icon"
                    :src="data.subValueIconPath"
                    alt=""
                  />
                  <span
                    class="SealInformation-details-image-cont-list-cont-list-subValue-text"
                  >
                    {{ data.subValue }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
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
    // 用印文件
    data: {
      type: Array,
      default: []
    },
    // 补充文件
    imageData: {
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
  .Record-of-requisition-Seal-Information {
    margin: 0%;

    .SealInformation {
      .SealInformation-details-list {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 2.5rem;

        .SealInformation-details-list-cont {
          display: flex;
          align-items: center;

          .SealInformation-details-list-cont-icon {
            display: flex;
            align-items: center;
            margin-right: 0.5rem;
          }

          .SealInformation-details-list-cont-val {
            display: flex;
            align-items: center;

            .iconPathValue {
              margin-right: 0.5rem;
            }
          }
        }
      }

      .SealInformation-details-image {
        .SealInformation-details-image-title {
          display: flex;
          align-items: center;
          height: 2.5rem;

          .SealInformation-details-image-title-icon {
            display: flex;
            align-items: center;
            margin-right: 0.5rem;
          }
        }

        .SealInformation-details-image-cont {
          display: flex;
          flex-flow: wrap;

          .SealInformation-details-image-cont-list {
            width: 50%;
            display: flex;
            min-width: 25rem;
            padding: 0.5rem 0;
            box-sizing: border-box;

            .SealInformation-details-image-cont-list-img {
              position: relative;
              width: auto;

              .SealInformation-details-image-cont-list-img-icon {
                position: absolute;
                right: 0%;
                top: 0%;
                width: 40%;
              }

              .SealInformation-details-image-cont-list-img-time {
                position: absolute;
                bottom: 0%;
                text-align: center;
                width: 100%;
                background-color: var(--jy-color-fill-65);
                color: var(--jy-in-common-use-1);
                height: 2rem;
                display: flex;
                align-items: center;
                justify-content: center;
              }
            }

            .SealInformation-details-image-cont-list-cont {
              flex-grow: 1;
              padding: 0 0.5rem;
              box-sizing: border-box;
              display: flex;
              align-content: space-between;
              flex-flow: wrap;

              .SealInformation-details-image-cont-list-cont-list {
                width: 100%;
                display: flex;

                .SealInformation-details-image-cont-list-cont-list-label {
                  width: 5rem;
                  display: flex;
                  justify-content: flex-end;
                  color: var(--jy-color-text-3);
                }

                .SealInformation-details-image-cont-list-cont-list-subValue {
                  display: flex;
                  align-items: center;
                  padding-left: 0.5rem;
                  box-sizing: border-box;

                  .SealInformation-details-image-cont-list-cont-list-subValue-icon {
                    margin-right: 0.2rem;
                  }

                  .SealInformation-details-image-cont-list-cont-list-subValue-text {
                    color: var(--jy-danger-6);
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
