<template>
  <div class="home-appreciation">
    <p class="title">增值服务</p>
    <div class="list">
      <div v-for="(v, i) in data" :key="i">
        <img :src="v.img" alt="" />
        <p>{{ v.text }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import appreciation1 from '@/assets/svg/system/home/appreciation1.svg'
  import appreciation2 from '@/assets/svg/system/home/appreciation2.svg'
  import appreciation3 from '@/assets/svg/system/home/appreciation3.svg'
  import appreciation4 from '@/assets/svg/system/home/appreciation4.svg'
  import appreciation5 from '@/assets/svg/system/home/appreciation5.svg'
  const data = ref([
    { img: appreciation1, text: '电子签章' },
    { img: appreciation2, text: '远程视频盖章' },
    { img: appreciation3, text: 'OCR智能比对' },
    { img: appreciation4, text: '防伪水印' },
    { img: appreciation5, text: '扫描仪服务' }
  ])
</script>

<style lang="scss" scoped>
  .home-appreciation {
    width: 100%;
    height: 158px;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.06);
    border-radius: 4px;
    padding: 24px;
    margin-bottom: 16px;
    .title {
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      color: rgba(0, 0, 0, 0.85);
    }
    .list {
      display: flex;
      justify-content: space-between;
      padding: 0 16px;
      div {
        text-align: center;
        img {
          width: 40px;
          margin-bottom: 8px;
        }
      }
    }
  }
</style>
