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
      @click="onClick(item.route, item.to)"
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
  import { useLayoutStore } from '@/store/layout'
  import { debounce } from '@/utils/tools.js'
  import { business, businessAside } from '../Menu/business'
  import { system, systemAside } from '../Menu/system'

  const menusInfoStore = useMenusInfoStore()
  const layoutStore = useLayoutStore()
  const route = useRoute()
  const router = useRouter()
  const modelRoute = ref('')
  const useDebounce = debounce(setTempMenus, 50)

  watch(reactive(route), o => {
    initData()
  })

  initData()
  function initData() {
    // 设置当前激活的model
    modelRoute.value = route.path
    // 根据当前model设置menus集合
    setMenus(modelRoute.value.split('/').slice(0, 3).join('/'))
    // 顺带设置Collapse模式
    layoutStore.changeCollapse(false)
    // 设置model集合
    menusInfoStore.setAsides(
      menusInfoStore.currentType === 'business' ? businessAside : systemAside
    )
    menusInfoStore.setTempMenus()
  }

  /**
   * 点击menu model 需要跳转到对应model的首个页面的url
   * 并设置此model对应的menus集合
   * @param {*} path
   */
  function onClick(model, path) {
    modelRoute.value = model
    router.push({ path })
    setMenus(model)
  }

  /**
   * hove model的时候触发，需要根据当前menu模块设置临时menus集合
   * @param {*} model
   */
  function onOver(model) {
    useDebounce(model)
  }

  /**
   * 鼠标移除model的时候，需要将tempMenus清空，显示真实menus集合
   */
  function onLeave() {
    setTimeout(() => {
      menusInfoStore.setTempMenus()
    }, 50)
  }

  /**
   * 设置临时menus集合,用于显示
   * @param {*} model
   */
  function setTempMenus(model) {
    let menus = menusInfoStore.currentType === 'business' ? business : system
    menus = menus.filter(v => {
      return v.to && v.to.indexOf(model) > -1 && v.to !== model
    })
    menusInfoStore.setTempMenus(menus)
  }

  /**
   * 根据当前model，设置对应的额menus集合
   * @param {\} model
   */
  function setMenus(model) {
    let menus = menusInfoStore.currentType === 'business' ? business : system
    menus = menus.filter(v => {
      return v.to && v.to.indexOf(model) > -1 && v.to !== model
    })
    menusInfoStore.setMenus(menus)
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
