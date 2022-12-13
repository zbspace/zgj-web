<template>
  <!-- 应用入口 -->
  <div class="dropdown topbar-head-dropdown ms-1 header-item" ref="dropdownAppRef">
    <button type="button" class="btn btn-icon btn-topbar btn-ghost-secondary" id="page-header-notifications-dropdown"
      data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="showAppPop = !showAppPop">
      <img v-show="!showAppPop" src="../../assets/images/navbar/application_icon.svg" />
      <img v-show="showAppPop" src="../../assets/images/navbar/application_select_icon.svg" />
    </button>
    <div class="dropdown-menu dropdown-menu-xl dropdown-menu-end p-0 dropdown-menu-cart"
      aria-labelledby="page-header-cart-dropdown" style="width: 340px;" @click="showAppPop = !showAppPop">
      <div class="ap-moreDropdown">
        <div class="dropdown-list">
          <div class="dropdown-list-cont" v-for="( item, index ) in state.appEntrance" :key="index">
            <img class="dropdown-list-cont-img" :src="item.icon" alt="" srcset="">
            <div class="dropdown-list-cont-name">{{ $t(item.name) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, reactive } from 'vue';
import useClickQutside from "../../hooks/useClickQutside.js"
import icon1 from '@/assets/svg/more-Seal-Application.svg'
import icon2 from '@/assets/svg/more-my-Seal-Application.svg'
import icon3 from '@/assets/svg/more-file-document.svg'
import icon4 from '@/assets/svg/more-Application-Seal.svg'
import icon5 from '@/assets/svg/more-document-library.svg'
const state = reactive({
  appEntrance: [
    {
      icon: icon1,
      name: "t-zgj-F_SEAL_APPLY",
    }, {
      icon: icon2,
      name: "t-zgj-F_SEAL_APPLY_MY",
    }, {
      icon: icon3,
      name: "t-zgj-F_SEAL_FILE_UPLOAD",
    }, {
      icon: icon4,
      name: "t-zgj-F_SEAL_INFO_APPLY",
    }, {
      icon: icon3,
      name: "t-zgj-F_DOCUMENT_INFO",
    }, {
      icon: icon5,
      name: "t-zgj-F_SEAL_INFO",
    }
  ]
})

const dropdownAppRef = ref(null)
const showAppPop = ref(false)
const isClickOutsideApp = useClickQutside(dropdownAppRef)
watch(isClickOutsideApp, () => {
  // 应用弹框
  if (isClickOutsideApp.value && showAppPop.value) {
    showAppPop.value = false
  }
})
</script>

<style lang="scss" scoped>
.ap-moreDropdown {
  @include mixin-width(340);
  @include mixin-height(400);
  @include mixin-padding(20);

  .dropdown-list {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-content: space-between;
    flex-flow: wrap;

    .dropdown-list-cont {
      @include mixin-width(130);
      @include mixin-height(100);
      text-align: center;
      display: flex;
      flex-flow: wrap;
      align-content: center;
      justify-content: center;

      .dropdown-list-cont-name {
        width: 100%;
        @include mixin-margin-top(11);
      }
    }

    .dropdown-list-cont:hover {
      background-color: var(--color-fill--2);
      color: #D0963E;
    }
  }

}
</style>