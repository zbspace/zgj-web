<template>
  <div class="left-aside">
    <div
      v-for="(item, i) in menusInfoStore.asides"
      :key="i"
      class="item"
      :class="
        modelRoute.split('/').slice(0, 3).join('/') === item.route
          ? 'isActive'
          : ''
      "
      @mouseover="onOver(item.route)"
      @mouseleave="onLeave(item.route)"
      @click="router.push({ path: item.to })"
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
  import { useRoute, useRouter } from 'vue-router'
  import { useMenusInfoStore } from '@/store/menus'
  import { debounce } from '@/utils/tools.js'
  import { business, businessAside } from '../Menu/business'
  import { system, systemAside } from '../menu/system'

  const menusInfoStore = useMenusInfoStore()
  const route = useRoute()
  const router = useRouter()
  const modelRoute = ref('')
  const useDebounce = debounce(setMenus, 1)
  const hover = ref('')
  let tempHover = ''
  let tempMenus = menusInfoStore.menus

  watch(reactive(route), o => {
    modelRoute.value = o.path
  })

  modelRoute.value = route.path
  getRoutesInModel(modelRoute.value)

  function onOver(model) {
    hover.value = model
    tempHover = model
    useDebounce(model)
  }

  // 动态设置menus集合
  function setMenus(model) {
    getRoutesInModel(model)
  }

  function getRoutesInModel(model) {
    if (!tempHover || tempHover !== hover.value) {
      menusInfoStore.setMenus(tempMenus)
    } else {
      getPresentMenus(model)
    }
  }

  const getPresentMenus = model => {
    tempMenus = menusInfoStore.menus
    menusInfoStore.setMenus(
      menusInfoStore.currentType === 'business' ? business : system
    )
    menusInfoStore.setAsides(
      menusInfoStore.currentType === 'business' ? businessAside : systemAside
    )
    const menus = menusInfoStore.menus.filter(v => {
      return v.to && v.to.indexOf(model) > -1 && v.to !== model
    })
    menusInfoStore.setMenus(menus)
  }

  function onLeave() {
    tempHover = ''
    menusInfoStore.setMenus(tempMenus)
  }
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
    .item.isActive {
      background: #d0963e;
    }
  }
</style>
