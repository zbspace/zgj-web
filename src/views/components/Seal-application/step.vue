<template>
  <div class="Seal-application-step">
    <div class="ap-box">
      <div class="ap-box-list" v-for="(item, index) in state.cache.data">
        <div class="ap-box-list-desc">
          <div
            class="ap-box-list-desc-index"
            :class="{
              indexActive: item.active ? true : false,
              indexPast: item.past ? true : false
            }"
          >
            <img
              class="ap-box-list-desc-index-img"
              src="@/assets/svg/duihao-cheng.svg"
              alt=""
              v-if="item.past"
            />
            <span class="ap-box-list-desc-index-span" v-else>{{
              index + 1
            }}</span>
          </div>
          <div
            class="ap-box-list-desc-text"
            :class="{ textActive: item.active ? true : false }"
            >{{ item.name }}</div
          >
        </div>
        <div
          class="ap-box-list-jiantou"
          v-if="index < state.cache.data.length - 1"
        >
          <img src="@/assets/svg/buzhou-jiantou-you.svg" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { reactive, onBeforeMount, onMounted } from 'vue'
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
  const state = reactive({
    cache: {
      data: []
    }
  })

  // 初始化步骤
  function initData() {
    let activeIndex = null
    props.data.forEach((item, index) => {
      if (item.active) {
        activeIndex = index
      }
    })
    props.data.forEach((item, index) => {
      if (activeIndex !== null && index < activeIndex) {
        item.past = true
      }
    })
    state.cache.data = props.data
    // console.log(state.cache.data);
  }

  onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
    // console.log(props.data);
    // 初始化步骤
    initData()
  })
  onMounted(() => {
    // console.log(`the component is now mounted.`)
  })
</script>
<style lang="scss" scoped>
  .Seal-application-step {
    margin: 0%;

    .ap-box {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1rem 0;
      box-sizing: border-box;

      .ap-box-list {
        display: flex;
        justify-content: center;
        align-items: center;

        .ap-box-list-desc {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 10rem;

          .ap-box-list-desc-index {
            width: 1.5rem;
            height: 1.5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: var(--jy-color-fill--3);
            color: var(--jy-color-text-3);
            border-radius: var(--jy-border-radius-2);
            margin-right: 0.5rem;
          }

          .ap-box-list-desc-text {
            font-size: var(--jy-font-size-title-1);
            color: var(--jy-color-text-3);
          }
        }

        .ap-box-list-jiantou {
          width: 7rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }

      .indexActive {
        background-color: var(--jy-primary-6) !important;
        color: var(--jy-in-common-use-1) !important;
      }

      .indexPast {
        background-color: var(--jy-primary-2) !important;
      }

      .textActive {
        color: var(--jy-color-text-1) !important;
      }

      .font-color-45 {
        color: var(--jy-color-text-3) !important;
      }
    }
  }
</style>
