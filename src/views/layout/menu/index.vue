<template>
  <div class="menus" :class="layoutStore.isCollapse ? 'contraction-menus' : ''">
    <svg
      class="iconpark-icon contraction-icon"
      @click="layoutStore.changeCollapse(!layoutStore.isCollapse)"
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
      class="el-menu-vertical-demo"
    >
      <template v-for="item in menus[menusInfoStore.currentType]">
        <el-sub-menu
          :index="item.to"
          :key="item.to"
          v-if="item.children && item.children.length"
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
                layoutStore.changeCollapse(!layoutStore.isCollapse)
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
  import { ref, watch, reactive } from 'vue'
  import { useRoute } from 'vue-router'
  import { useLayoutStore } from '@/store/layout'
  import { business } from './business'
  import { system } from './system'
  import { useMenusInfoStore } from '@/store/menus'
  import { useLanguageStore } from '@/store/language'
  import { getItem } from '@/utils/storage.js'
  import { LANGUAGE } from '@/utils/constants'
  const route = useRoute()

  watch(reactive(route), o => {
    activeMenu.value = o.path
  })

  const languageStore = useLanguageStore()
  languageStore.setLanguage(getItem(LANGUAGE))

  const layoutStore = useLayoutStore()
  const menusInfoStore = useMenusInfoStore()
  const menus = { business, system }

  const activeMenu = ref('')

  const handleSelect = (index, indexPath) => {
    activeMenu.value = index
  }

  activeMenu.value = route.path
</script>

<script>
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'Menus'
  })
</script>

<script></script>

<style lang="scss" scoped>
  .menus {
    padding-top: 20px;
    padding-right: 10px;
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
        color: var(--primary-6);
      }
    }
    :deep(.el-menu) {
      // 侧边栏折叠动画速度
      border-right: none;
      .el-menu-item.is-active {
        background: rgba(208, 150, 62, 0.12);
        span,
        .iconpark-icon {
          color: var(--primary-6);
        }
        .name-front {
          background-color: var(--primary-6);
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
        border-top-right-radius: 22px;
        border-bottom-right-radius: 22px;
        margin-bottom: 4px;
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
          background: rgba(208, 150, 62, 0.12);
          span,
          .iconpark-icon {
            color: var(--primary-6) !important;
          }
          .name-front {
            background-color: var(--primary-6) !important;
          }
        }
      }

      .el-sub-menu {
        .el-sub-menu__title {
          height: 42px;
          border-top-right-radius: 22px;
          border-bottom-right-radius: 22px;
          .iconpark-icon {
            width: 22px;
            height: 22px;
            margin-right: 10px;
          }
          // transition: all 0.3s;
          &:hover {
            border-top-right-radius: 22px;
            border-bottom-right-radius: 22px;
            background: rgba(208, 150, 62, 0.12);
            span,
            .iconpark-icon {
              color: var(--primary-6) !important;
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
        span,
        .iconpark-icon {
          color: var(--primary-6);
        }
      }
      .el-menu-item {
        padding: 0;
        border-radius: 4px !important;
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
          span,
          .iconpark-icon {
            color: var(--primary-6);
          }
        }
      }
      .el-sub-menu {
        .el-sub-menu__title {
          margin-left: 0;
          border-radius: 4px !important;
          .iconpark-icon {
            margin-right: 0;
          }
          &:hover {
            background: rgba(0, 0, 0, 0.04);
            span,
            .iconpark-icon {
              color: var(--primary-6);
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
    width: 82px;
  }
</style>
