<!-- 信息列表 -->
<template>
  <div class="documentsDetails-informationList">
    <div class="ap-cont">
      <div class="ap-cont-details">
        <div
          class="ap-cont-list"
          v-for="item in props.data"
          :style="item.lineStyle"
        >
          <div class="ap-cont-list-label" :style="[labelStyle, item.labelStyle]"
            >{{ item.label }}：
          </div>
          <div class="ap-cont-list-value" :style="item.valStyle">
            <img
              class="ap-cont-list-value-icon"
              :src="item.iconPath"
              :style="item.iconStyle"
              alt=""
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
    labelStyle: {
      type: Object,
      default: {}
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
            width: 5rem;
            display: flex;
            justify-content: flex-end;
            color: var(--jy-color-text-3);
          }

          .ap-cont-list-value {
            padding: 0rem 0 0rem 0.5rem;
            box-sizing: border-box;
          }
        }
      }
    }
  }
</style>
