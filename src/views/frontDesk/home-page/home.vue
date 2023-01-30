<!-- 抄送给我 -->
<template>
  <div class="frontDesk-home-page-home">
    <componentsLayout :free="true">
      <div class="ap-box">
        <div class="ap-back">
          <img class="ap-back-img" src="@/assets/icon/home-back.png" alt="" />
        </div>
        <div class="ap-cont">
          <div class="ap-cont-info"> 123 </div>
        </div>
      </div>
    </componentsLayout>
  </div>
</template>
<script setup>
  import {
    ref,
    reactive,
    defineProps,
    defineEmits,
    onBeforeMount,
    onMounted
  } from 'vue'
  import componentsLayout from '../../components/Layout.vue'
  const props = defineProps({
    // 处理类型
    type: {
      type: String,
      default: '0'
    }
  })
  const emit = defineEmits([])
  const state = reactive({})
  const showDepPerDialog = ref(false)

  onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
  })
  onMounted(() => {
    // console.log(`the component is now mounted.`)
  })
</script>
<style lang="scss" scoped>
  .frontDesk-home-page-home {
    margin: 0%;
    .ap-box {
      width: 100%;
      height: 100%;
      position: relative;
    }
    .ap-back-img {
      width: 100%;
      position: absolute;
      top: 0%;
      left: 0%;
    }
    .ap-cont {
      position: absolute;
      top: 0%;
      left: 0%;
      width: 100%;
      .ap-cont-info {
        width: 100%;
      }
    }
  }
</style>
