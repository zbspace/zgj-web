<template>
  <div
    class="menus"
    :class="[
      layoutStore.isCollapse && 'contraction-menus',
      layoutStore.menuColor
    ]"
  >
    <svg
      class="iconpark-icon contraction-icon"
      @click="layoutStore.isCollapse = !layoutStore.isCollapse"
      v-if="layoutStore.isCollapse"
    >
      <use href="#cebianshousuo"></use>
    </svg>
    <el-menu
      router
      :default-active="activeMenu"
      @select="handleSelect"
      :collapse="layoutStore.isCollapse"
      :unique-opened="true"
      :collapse-transition="false"
    >
      <template v-for="(item, j) in getMenus" :key="j">
        <el-sub-menu
          :index="item.to"
          :key="item.to"
          v-if="item.children && item.children.length"
          :popper-class="layoutStore.menuColor"
        >
          <template #title>
            <svg class="iconpark-icon"><use :href="item.icon"></use></svg>
            <span>{{ $t(item.label) }} </span>
          </template>

          <div v-for="child in item.children" :key="child.label">
            <el-sub-menu
              :index="child.to"
              :key="child.to"
              v-if="child.children && child.children.length"
            >
              <template #title>
                <span class="name-front"></span>
                <span>{{ $t(child.label) }} </span>
              </template>

              <div v-for="child1 in child.children" :key="child1.label">
                <el-menu-item
                  :index="child1.to"
                  :route="child1.to"
                  v-if="child1.to"
                >
                  <span class="name-front"></span>
                  <span>{{ $t(child1.label) }}</span>
                </el-menu-item>
                <p v-else>
                  {{ $t(child1.label) }}
                </p>
              </div>
            </el-sub-menu>

            <el-menu-item
              :index="child.to"
              :route="child.to"
              v-else-if="child.to"
            >
              <span class="name-front"></span>
              <span> {{ $t(child.label) }}</span>
            </el-menu-item>
            <p v-else>
              {{ $t(child.label) }}
            </p>
          </div>
        </el-sub-menu>

        <el-menu-item
          :key="item.label + 'a'"
          :index="item.to"
          :route="item.to"
          v-else-if="item.to"
        >
          <svg class="iconpark-icon"><use :href="item.icon"></use></svg>
          <template #title>
            <span>{{ $t(item.label) }}</span>
          </template>
          <template
            v-if="item.to === '/frontDesk/home' || item.to === '/system/home'"
          >
            <svg
              class="iconpark-icon contraction-icon"
              @click.stop.prevent="
                layoutStore.isCollapse = !layoutStore.isCollapse
              "
            >
              <use href="#cebianshousuo"></use>
            </svg>
          </template>
        </el-menu-item>

        <p class="disable-p" v-else-if="!item.to" :key="item.label + 'aa'">
          {{ $t(item.label) }}
        </p>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
  import { ref, watch, reactive, computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { useLayoutStore } from '@/store/layout'
  import { useMenusInfoStore } from '@/store/menus'
  import { useLanguageStore } from '@/store/language'
  import { getItem } from '@/utils/storage.js'
  import { LANGUAGE } from '@/utils/constants'

  const route = useRoute()
  const activeMenu = ref('')
  const currentIndex = ref('')
  const menusInfoStore = useMenusInfoStore()
  const layoutStore = useLayoutStore()
  const languageStore = useLanguageStore()

  watch(reactive(route), o => {
    currentIndex.value = ''
    activeMenu.value = route.path
    // setMenus()
    getLeftMenu()
  })

  const getMenus = computed(() => {
    return menusInfoStore.tempMenus || menusInfoStore.menus
  })

  const initData = () => {
    languageStore.setLanguage(getItem(LANGUAGE) ? getItem(LANGUAGE).lang : 'ch')
    getLeftMenu()
  }

  // 设置menus集合
  const getLeftMenu = () => {
    activeMenu.value = route.path
    if (layoutStore.sidebarType === '2') return // 直接在Aside组件中设置
    const menus =
      menusInfoStore.currentType === 'business'
        ? menusInfoStore.businessMenus
        : menusInfoStore.systemMenus
    menusInfoStore.menus = menus
  }

  // const handleSelect = url => {
  //   activeMenu.value = url
  // }

  initData()

  // /**
  //  * 设置激活menuitem
  //  * @param {*} route
  //  * @param {*} menus
  //  */
  // function setActiveMenu(route, menus) {
  //   menus.forEach(item => {
  //     if (item.children && item.children.length) {
  //       setActiveMenu(route, item.children)
  //     }
  //     if (route.indexOf(item.to) > -1 && item.to.length >= currentIndex.value) {
  //       currentIndex.value = item.to
  //       activeMenu.value = currentIndex
  //     }
  //   })
  // }
</script>

<script>
  import { defineComponent } from 'vue'
  import { messageError } from '@/hooks/useMessage'
  export default defineComponent({
    name: 'Menus'
  })
</script>

<script></script>

<style lang="scss" scoped>
  .menus.light {
    padding-top: 20px;
    // padding-right: 10px;
    padding-bottom: 15px;
    background-color: #fff;
    width: 216px;
    transition: all 0.3s;
    .menu-iconpark {
      @include mixin-width(26);
      margin-right: 10px;
    }
    .name-front {
      width: 8px;
      height: 1px;
      display: inline-block;
      background: rgba(0, 0, 0, 0.45);
      margin-right: 8px;
    }
    .disable-p {
      padding-left: 30px;
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      color: rgba(0, 0, 0, 0.45);
      margin-bottom: 10px;
      margin-top: 26px;
    }
    .contraction-icon {
      margin-left: 30px;
      width: 20px;
      height: 20px;
      margin-top: 20px;
      margin-bottom: 30px;
      transform: rotate(180deg);
      cursor: pointer;
      &:hover {
        color: var(--jy-primary-6);
      }
    }
    :deep(.el-menu) {
      // 侧边栏折叠动画速度
      border-right: none;
      .el-menu-item.is-active {
        background: rgba(208, 150, 62, 0.12);
        border-left: 4px solid #d0963e;
        span,
        .iconpark-icon {
          color: var(--jy-primary-6);
        }
        .name-front {
          background-color: var(--jy-primary-6);
        }
      }
      .el-menu-item:not(.is-active) {
        color: rgba(0, 0, 0, 0.85);
        span {
          color: rgba(0, 0, 0, 0.85);
        }
      }
      .el-menu-item {
        height: 44px;
        font-size: 14px;
        line-height: 22px;
        margin-bottom: 4px;
        border-left: 4px solid #fff;
        .el-menu-tooltip__trigger {
          padding: 0;
          left: auto;
        }
        .iconpark-icon {
          width: 22px;
          height: 22px;
          margin-right: 10px;
        }
        .contraction-icon {
          margin: 0;
          position: absolute;
          right: 0;
          margin-right: 16px;
          width: 20px;
          height: 20px;
          cursor: pointer;
          transform: rotate(0deg);
        }
        &:hover {
          border-left: 4px solid #d0963e;
          background: rgba(208, 150, 62, 0.12);
          transition: none;
          span,
          .iconpark-icon {
            color: var(--jy-primary-6) !important;
          }
          .name-front {
            background-color: var(--jy-primary-6) !important;
          }
        }
      }

      .el-sub-menu {
        .el-sub-menu__title {
          height: 42px;
          border-left: 4px solid #fff;
          .iconpark-icon {
            width: 22px;
            height: 22px;
            margin-right: 10px;
          }
          &:hover {
            border-left: 4px solid #d0963e;
            background: rgba(208, 150, 62, 0.12);
            transition: none;
            span,
            .iconpark-icon {
              color: var(--jy-primary-6) !important;
            }
          }
        }
        .el-tooltip__trigger {
          padding: 0;
          margin-left: 20px;
        }
        .el-menu-item:not(.is-active) {
          color: rgba(0, 0, 0, 0.85);
          span {
            color: rgba(0, 0, 0, 0.65);
          }
        }
        .el-sub-menu {
          .el-sub-menu__title {
            color: rgba(0, 0, 0, 0.85);
            span {
              color: rgba(0, 0, 0, 0.65);
            }
          }
        }
      }
    }
    :deep(.el-menu--collapse) {
      padding: 0 10px;
      width: 82px;
      .el-menu-item.is-active {
        background: rgba(0, 0, 0, 0.04);
        border-radius: 4px;
        border-left: 0;
        span,
        .iconpark-icon {
          color: var(--jy-primary-6);
        }
      }
      .el-menu-item {
        padding: 0;
        border-radius: 4px !important;
        border-left: 0;
        .el-tooltip__trigger {
          margin-left: 0;
          width: 62px;
          height: 42px;
          display: flex;
          justify-content: center;
          span {
            display: none;
          }
          .disable-p {
            padding-left: 0;
            width: 56px;
          }
          .iconpark-icon {
            margin-right: 0;
          }
          .contraction-icon {
            display: none;
            // top: -50px;
            // right: 20px;
          }
        }
        &:hover {
          background: rgba(0, 0, 0, 0.04);
          border-left: 0;
          span,
          .iconpark-icon {
            color: var(--jy-primary-6);
          }
        }
      }
      .el-sub-menu {
        .el-sub-menu__title {
          margin-left: 0;
          border-radius: 4px !important;
          border-left: 0;
          .iconpark-icon {
            margin-right: 0;
          }
          &:hover {
            background: rgba(0, 0, 0, 0.04);
            border-left: 0;
            span,
            .iconpark-icon {
              color: var(--jy-primary-6);
            }
          }
        }
        .el-tooltip__trigger {
          margin-left: 0;
          width: 62px;
          height: 42px;
          display: flex;
          justify-content: center;
          span {
            display: none;
          }
        }
      }
      .disable-p {
        padding-left: 0;
        width: 56px;
        margin: 32px auto 10px auto;
      }
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      min-height: 400px;
    }
  }
  .contraction-menus {
    width: 82px !important;
  }
  .menus.dark {
    padding-top: 20px;
    padding-bottom: 15px;
    background: linear-gradient(
      180.03deg,
      #2a313d 5.3%,
      #35394f 42.55%,
      #29303a 97.47%
    );
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.06);
    width: 216px;
    transition: all 0.3s;
    .menu-iconpark {
      @include mixin-width(26);
      margin-right: 10px;
    }
    .name-front {
      width: 8px;
      height: 1px;
      display: inline-block;
      background: #fff;
      margin-right: 8px;
    }
    .disable-p {
      padding-left: 30px;
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      color: #fff;
      margin-bottom: 10px;
      margin-top: 26px;
    }
    .contraction-icon {
      margin-left: 30px;
      width: 20px;
      height: 20px;
      margin-top: 20px;
      margin-bottom: 30px;
      transform: rotate(180deg);
      cursor: pointer;
      color: #fff;
      &:hover {
        color: var(--jy-primary-6);
      }
    }
    :deep(.el-menu) {
      // 侧边栏折叠动画速度
      border-right: none;
      background: linear-gradient(
        180.03deg,
        #2a313d 5.3%,
        #35394f 42.55%,
        #29303a 97.47%
      );
      box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.06);
      .el-menu-item.is-active {
        background: rgba(208, 150, 62, 0.12);
        border-left: 4px solid #d0963e;
        span,
        .iconpark-icon {
          color: var(--jy-primary-6);
        }
        .name-front {
          background-color: var(--jy-primary-6);
        }
      }
      .el-menu-item:not(.is-active) {
        color: #fff;
        span {
          color: #fff;
        }
      }
      .el-menu-item {
        height: 44px;
        font-size: 14px;
        line-height: 22px;
        margin-bottom: 4px;
        border-left: 4px solid transparent;
        .el-menu-tooltip__trigger {
          padding: 0;
          left: auto;
        }
        .iconpark-icon {
          width: 22px;
          height: 22px;
          margin-right: 10px;
        }
        .contraction-icon {
          margin: 0;
          position: absolute;
          right: 0;
          margin-right: 16px;
          width: 20px;
          height: 20px;
          cursor: pointer;
          transform: rotate(0deg);
        }
        &:hover {
          border-left: 4px solid #d0963e;
          background: rgba(208, 150, 62, 0.12);
          transition: none;
          span,
          .iconpark-icon {
            color: var(--jy-primary-6) !important;
          }
          .name-front {
            background-color: var(--jy-primary-6) !important;
          }
        }
      }

      .el-sub-menu {
        .el-sub-menu__title {
          height: 42px;
          border-left: 4px solid transparent;
          color: #fff;
          .iconpark-icon {
            width: 22px;
            height: 22px;
            margin-right: 10px;
          }
          &:hover {
            border-left: 4px solid #d0963e;
            background: rgba(208, 150, 62, 0.12);
            transition: none;
            span,
            .iconpark-icon {
              color: var(--jy-primary-6) !important;
            }
          }
        }
        .el-tooltip__trigger {
          padding: 0;
          margin-left: 20px;
        }
        .el-menu-item:not(.is-active) {
          color: #fff;
          span {
            color: #fff;
          }
        }
        .el-sub-menu {
          .el-sub-menu__title {
            color: #fff;
            span {
              color: #fff;
            }
          }
        }
      }
    }
    :deep(.el-menu--collapse) {
      padding: 0 10px;
      width: 82px;
      .el-menu-item.is-active {
        background: rgba(0, 0, 0, 0.04);
        border-radius: 4px;
        border-left: 0;
        span,
        .iconpark-icon {
          color: var(--jy-primary-6);
        }
      }
      .el-menu-item {
        padding: 0;
        border-radius: 4px !important;
        border-left: 0;
        .el-tooltip__trigger {
          margin-left: 0;
          width: 62px;
          height: 42px;
          display: flex;
          justify-content: center;
          span {
            display: none;
          }
          .disable-p {
            padding-left: 0;
            width: 56px;
          }
          .iconpark-icon {
            margin-right: 0;
          }
          .contraction-icon {
            display: none;
          }
        }
        &:hover {
          background: rgba(0, 0, 0, 0.04);
          border-left: 0;
          span,
          .iconpark-icon {
            color: var(--jy-primary-6);
          }
        }
      }
      .el-sub-menu {
        .el-sub-menu__title {
          margin-left: 0;
          border-radius: 4px !important;
          border-left: 0;
          .iconpark-icon {
            margin-right: 0;
          }
          &:hover {
            background: rgba(0, 0, 0, 0.04);
            border-left: 0;
            span,
            .iconpark-icon {
              color: var(--jy-primary-6);
            }
          }
        }
        .el-tooltip__trigger {
          margin-left: 0;
          width: 62px;
          height: 42px;
          display: flex;
          justify-content: center;
          span {
            display: none;
          }
        }
      }
      .disable-p {
        padding-left: 0;
        width: 56px;
        margin: 32px auto 10px auto;
      }
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      min-height: 400px;
    }
  }
</style>

<style lang="scss">
  .el-popper.dark {
    border: 0;
    .el-menu--vertical.dark {
      .el-menu {
        background: linear-gradient(
          180.03deg,
          #2a313d 5.3%,
          #35394f 42.55%,
          #29303a 97.47%
        );
        box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.06);
        .el-menu-item {
          span {
            color: #fff;
          }
          &:hover {
            background: rgba(208, 150, 62, 0.12);
            transition: none;
            span,
            .iconpark-icon {
              color: var(--jy-primary-6) !important;
            }
            .name-front {
              background-color: var(--jy-primary-6) !important;
            }
          }
        }

        .el-sub-menu {
          .el-sub-menu__title {
            color: #fff;
            .iconpark-icon {
              width: 22px;
              height: 22px;
              margin-right: 10px;
            }
            &:hover {
              background: rgba(208, 150, 62, 0.12);
              transition: none;
              span,
              .iconpark-icon {
                color: var(--jy-primary-6) !important;
              }
            }
          }
          .el-tooltip__trigger {
            padding: 0;
            padding-left: 20px;
          }
          .el-menu-item:not(.is-active) {
            color: #fff;
            span {
              color: #fff;
            }
          }
          .el-sub-menu {
            .el-sub-menu__title {
              color: #fff;
              span {
                color: #fff;
              }
            }
          }
        }
      }
    }
  }
</style>
