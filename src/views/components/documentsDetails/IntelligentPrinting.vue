<!-- 智能用印 -->
<template>
  <div class="documentsDetails-IntelligentPrinting">
    <div class="ap-seal" v-for="(item, index) in state.cache.data" :key="index">
      <div class="ap-seal-box">
        <div class="ap-seal-box-icon">
          <img
            class="ap-seal-box-icon-img"
            src="@/assets/svg/yongyin-mingcheng.svg"
            alt=""
          />
        </div>
        <div class="ap-seal-box-desc">
          <span class="ap-seal-box-desc-name">用印名称：</span>
          <span class="ap-seal-box-desc-desc">{{ item.sealName }}</span>
        </div>
      </div>
      <div class="ap-seal-box">
        <div class="ap-seal-box-icon">
          <img
            class="ap-seal-box-icon-img"
            src="@/assets/svg/yongyin-renyuan.svg"
            alt=""
          />
        </div>
        <div class="ap-seal-box-desc">
          <span class="ap-seal-box-desc-name">用印人员：</span>
          <span class="ap-seal-box-desc-desc">{{ item.createName }}</span>
        </div>
      </div>
      <div class="ap-seal-box">
        <div class="ap-seal-box-icon">
          <img
            class="ap-seal-box-icon-img"
            src="@/assets/svg/yongyin-shijian.svg"
            alt=""
          />
        </div>
        <div class="ap-seal-box-desc">
          <span class="ap-seal-box-desc-name">用印时间：</span>
          <span class="ap-seal-box-desc-desc">{{ item.createTime }}</span>
        </div>
      </div>
      <div class="ap-seal-box">
        <div class="ap-seal-box-icon">
          <img
            class="ap-seal-box-icon-img"
            src="@/assets/svg/yongyin-didian.svg"
            alt=""
          />
        </div>
        <div class="ap-seal-box-desc">
          <span class="ap-seal-box-desc-name">用印地点：</span>
          <span class="ap-seal-box-desc-desc">{{ item.address }}</span>
        </div>
      </div>
      <div class="ap-seal-box">
        <div class="ap-seal-box-icon">
          <img
            class="ap-seal-box-icon-img"
            src="@/assets/svg/gaizhang-yingxiang.svg"
            alt=""
          />
        </div>
        <div class="ap-seal-box-desc">
          <span class="ap-seal-box-desc-name"
            >盖章影像（{{ item.allImgCount }}）</span
          >
          <span class="ap-seal-box-desc-desc"></span>
        </div>
      </div>
      <div class="ap-seal-image imageData">
        <div
          class="imageData-list"
          v-for="(node, num) in item.showImgs"
          :key="num"
        >
          <el-image
            style="width: 100%; height: 100%"
            loading="lazy"
            lazy
            :src="node.fileObjectNameThumb"
            fit="cover"
            :preview-src-list="item.imgs.map(i => i.fileUrl)"
          />
          <el-image
            class="imageData-list-iconPath"
            :src="gaizhangIcon"
            v-if="node.filePhotoType === '1'"
          ></el-image>
          <div class="imageData-list-desc">
            <span class="imageData-list-desc-name">{{
              node.createUserName + ' '
            }}</span>
            <span class="imageData-list-desc-time">{{
              dayjs(node.createDatetime).format('mm:ss')
            }}</span>
          </div>
        </div>
      </div>
      <div class="ap-seal-more" v-if="item.showMore">
        <div class="ap-seal-more-line"></div>
        <div class="ap-seal-more-desc" @click="viewMore(index)">
          {{ item.openMore ? '收起' : '展开' }}
          <img
            class="ap-seal-more-desc-img"
            src="@/assets/svg/chakan-gengduo-xia.svg"
            :class="item.openMore ? 'rotate' : ''"
          />
        </div>
        <div class="ap-seal-more-line"></div>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { reactive, onBeforeMount, onMounted, watch } from 'vue'
  import dayjs from 'dayjs'
  import gaizhangIcon from '@/assets/svg/gaizhang-icon.svg'
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
      default: () => {
        return []
      }
    }
  })
  const state = reactive({
    cache: {
      data: []
    }
  })
  // 初始化数据
  function initData() {
    state.cache.data = props.data
    state.cache.data.forEach(i => {
      if (i.imgs?.length > 6) {
        i.showMore = true
        i.openMore = false
        i.showImgs = i.imgs.slice(0, 6)
      } else {
        i.showMore = false
        i.showImgs = i.imgs
      }
    })
  }
  function viewMore(index) {
    if (!state.cache.data[index].openMore) {
      state.cache.data[index].showImgs = state.cache.data[index].imgs
    } else {
      state.cache.data[index].showImgs = state.cache.data[index].imgs.slice(
        0,
        6
      )
    }
    state.cache.data[index].openMore = !state.cache.data[index].openMore
  }
  watch(
    () => props.data,
    () => {
      // 初始化数据
      initData()
    }
  )
  onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
    // 初始化数据
    initData()
  })
  onMounted(() => {
    // console.log(`the component is now mounted.`)
  })
</script>
<style lang="scss" scoped>
  .documentsDetails-IntelligentPrinting {
    margin: 0%;

    .ap-seal {
      .ap-seal-box {
        display: flex;
        align-items: center;
        padding: 0.5rem 0;
        box-sizing: border-box;

        .ap-seal-box-icon {
          display: flex;
          align-items: center;

          .ap-seal-box-icon-img {
            width: 1rem;
            margin-right: 0.5rem;
          }
        }

        .ap-seal-box-desc {
          .ap-seal-box-desc-name {
            color: var(--jy-color-text-3);
          }
        }
      }

      .ap-seal-more {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.5rem 0;
        box-sizing: border-box;

        .ap-seal-more-line {
          width: calc(50% - 5rem);
          border-bottom: 1px solid var(--jy-color-border-2);
        }

        .ap-seal-more-desc {
          display: flex;
          align-items: center;
          color: var(--jy-color-text-3);
          cursor: pointer;

          .ap-seal-more-desc-img {
            margin-left: 0.5rem;
          }

          .rotate {
            transform: rotate(180deg);
          }
        }
      }
    }

    .imageData {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      align-content: flex-start;
      flex-flow: wrap;

      .imageData-list {
        margin: 0.2rem;
        box-sizing: border-box;
        position: relative;
        width: 8rem;
        height: 8rem;

        .imageData-list-imgPath {
          width: 100%;
        }

        .imageData-list-iconPath {
          position: absolute;
          z-index: 1;
          right: 0rem;
          top: 0rem;
          width: 40%;
        }

        .imageData-list-desc {
          position: absolute;
          bottom: 0%;
          left: 0%;
          text-align: center;
          width: 100%;
          padding: 2px 0;
          box-sizing: border-box;
          background-color: var(--jy-color-fill-65);
          color: var(--jy-in-common-use-1);
          font-size: 12px;
        }
      }
    }
  }
</style>
