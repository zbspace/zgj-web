<template>
  <div class="left-aside">
    <div
      v-for="(item, i) in menusInfoStore.asides"
      :key="i"
      class="item"
      :class="modelRoute.indexOf(item.to) > -1 ? 'isActive' : ''"
    >
      <svg class="iconpark-icon contraction-icon">
        <use :href="item.icon"></use>
      </svg>
      <span>{{ item.name }}</span>
    </div>
  </div>
</template>

<script setup>
  import { ref, watch, reactive } from 'vue'
  import { useRoute } from 'vue-router'
  import { useMenusInfoStore } from '@/store/menus'
  const menusInfoStore = useMenusInfoStore()
  const route = useRoute()
  const modelRoute = ref('')

  watch(reactive(route), o => {
    modelRoute.value = o.path
  })
  modelRoute.value = route.path
</script>

<style lang="scss" scoped>
  .left-aside {
    display: flex;
    flex-direction: column;
    padding-top: 25px;
    .item {
      width: 60px;
      height: 58px;
      opacity: 0.9;
      border-radius: 4px;
      margin: 0 auto;
      margin-bottom: 24px;
      display: flex;
      flex-direction: column;
      padding-top: 10px;
      cursor: pointer;
      .iconpark-icon {
        width: 22px;
        height: 22px;
        margin: 0 auto;
        margin-bottom: 8px;
        color: #fff;
      }
      span {
        margin: 0 auto;
        font-weight: 400;
        font-size: 12px;
        line-height: 20px;
        text-align: center;
        color: #ffffff;
      }

      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }
    }
    .isActive {
      background: #d0963e;
    }
  }
</style>
