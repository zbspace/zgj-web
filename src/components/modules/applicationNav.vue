<template>
  <!-- 应用入口 -->
  <div class="application-drown">
    <el-popover
      placement="bottom"
      :width="340"
      trigger="hover"
      :show-arrow="false"
      @before-enter="showPop"
      @after-leave="hidePop"
    >
      <template #reference>
        <el-button class="btn-drown">
          <img
            src="../../assets/images/navbar/application_icon.svg"
            :class="actived ? 'image' : ''"
          />
        </el-button>
      </template>
      <div class="ap-moreDropdown">
        <div class="dropdown-list">
          <div
            class="dropdown-list-cont"
            v-for="(item, index) in state.appEntrance"
            :key="index"
            @click="goMenu(item)"
          >
            <img
              class="dropdown-list-cont-img"
              :src="item.icon"
              alt=""
              srcset=""
            />
            <div class="dropdown-list-cont-name">{{ $t(item.name) }}</div>
          </div>
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script setup>
  import { reactive, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import icon1 from '@/assets/svg/more-Seal-Application.svg'
  import icon2 from '@/assets/svg/more-my-Seal-Application.svg'
  import icon3 from '@/assets/svg/more-file-document.svg'
  import icon4 from '@/assets/svg/more-Application-Seal.svg'
  import icon5 from '@/assets/svg/more-document-library.svg'
  const state = reactive({
    appEntrance: [
      {
        icon: icon1,
        name: 't-zgj-F_SEAL_APPLY'
      },
      {
        icon: icon2,
        name: 't-zgj-F_SEAL_APPLY_MY'
      },
      {
        icon: icon3,
        name: 't-zgj-F_SEAL_FILE_UPLOAD'
      },
      {
        icon: icon4,
        name: 't-zgj-F_SEAL_INFO_APPLY'
      },
      {
        icon: icon3,
        name: 't-zgj-F_DOCUMENT_INFO'
      },
      {
        icon: icon5,
        name: 't-zgj-F_SEAL_INFO'
      }
    ]
  })
  const actived = ref(false)
  const showPop = () => {
    actived.value = true
  }
  const hidePop = () => {
    actived.value = false
  }

  const router = useRouter()

  const goMenu = attr => {
    console.log(attr.name)
    // 用印申请
    attr.name === 't-zgj-F_SEAL_APPLY' && router.push({ name: 'SelectionForm' })

    // 文件归档
    attr.name === 't-zgj-F_SEAL_FILE_UPLOAD' && router.push({ name: 'Archive' })

    // 印章申请
    attr.name === 't-zgj-F_SEAL_INFO_APPLY' &&
      router.push({ name: 'ApplicationForSeal' })

    // 印章库
    attr.name === 't-zgj-F_SEAL_INFO' && router.push({ name: 'LibraryOfSeals' })

    // 文件库
    attr.name === 't-zgj-F_DOCUMENT_INFO' &&
      router.push({ name: 'DocumentLibrary' })
  }
</script>

<style lang="scss" scoped>
  .application-drown {
    overflow: hidden;
    margin: 0 10px;

    .btn-drown {
      width: 28px;
      height: 28px;
      border: none;
      overflow: hidden;
      .image {
        position: relative;
        left: -80px;
        filter: drop-shadow(#d0963e 80px 0);
      }
    }
    // &:hover {
    //   img {
    //     position: relative;
    //     left: -80px;
    //     filter: drop-shadow(#d0963e 80px 0);
    //   }
    // }
  }
  .ap-moreDropdown {
    padding: 18px;
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
        color: #d0963e;
      }
    }
  }
</style>
