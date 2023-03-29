<!-- 用印轨迹 -->
<template>
  <div class="PrintControlManagement-Printed-track">
    <componentsLayout Layout="title,searchForm,custom">
      <template #title>
        <div class="title">
          <div>用印轨迹</div>
        </div>
      </template>
      <template #custom>
        <div class="content">
          <div>
            <el-input
              v-model="keyword"
              placeholder="请输入印章名称"
              clearable
              @keyup.enter="searchData"
              @clear="searchData"
              style="margin-bottom: 15px"
            >
              <template #append>
                <el-button :icon="Search" @click.stop="searchData" />
              </template>
            </el-input>
            <el-scrollbar height="100%">
              <div class="seal-list">
                <div
                  class="seal-item"
                  v-for="(item, index) in state.componentsSealList.data"
                  :key="index"
                >
                  <div
                    class="seal-item-wrap"
                    :class="{
                      'seal-item-wrap-select':
                        state.componentsSealList.curIndex === index
                    }"
                    @click="clickSeal(item, index)"
                  >
                    <span></span>
                    <div>
                      <h3>印章名称{{ index + 1 }}</h3>
                      <p>马丽丽</p>
                    </div>
                  </div>
                </div>
              </div>
            </el-scrollbar>
          </div>

          <div class="seal-map">
            <img src="../../../assets/svg/yongyin-guiji-ditu.svg" alt="" />
          </div>
        </div>
      </template>
    </componentsLayout>
  </div>
</template>
<script setup>
  import { reactive, onBeforeMount, onMounted, ref } from 'vue'
  import { Search } from '@element-plus/icons-vue'
  import componentsLayout from '../../components/Layout.vue'

  const state = reactive({
    componentsSealList: {
      curIndex: 0,
      data: 20
    }
  })
  const keyword = ref('')
  // 点击印章列表
  function clickSeal(item, index) {
    state.componentsSealList.curIndex = index
  }
  // 获取印章列表
  const searchData = () => {
    console.log(1)
  }
  onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
  })
  onMounted(() => {
    // console.log(`the component is now mounted.`)
  })
</script>
<style lang="scss" scoped>
  .PrintControlManagement-Printed-track {
    margin: 0%;
    height: 100%;
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .content {
      display: flex;
      justify-content: space-between;
      margin-top: 5px;
      box-sizing: border-box;
      height: calc(100vh - 170px);
      overflow: hidden;

      .seal-list {
        width: 260px;

        .seal-item {
          height: 76px;
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.15);
          border-radius: 4px;
          margin-bottom: 12px;

          .seal-item-wrap {
            display: flex;
            height: 76px;
            padding: 16px 0 0 16px;
            box-sizing: border-box;
            cursor: pointer;

            > span {
              width: 16px;
              height: 16px;
              background-image: url('../../../assets/svg/map-pin-fillweizhi.svg');
              background-repeat: no-repeat;
              background-size: 100% auto;
              background-position: center;
              margin-right: 15px;
            }

            > div {
              font-size: 12px;
              color: rgba(0, 0, 0, 0.65);

              > h3 {
                margin: 0 0 10px 0;
                font-size: 14px;
                color: rgba(0, 0, 0, 0.85);
                font-style: normal;
              }
            }
          }

          .seal-item-wrap-select {
            background: rgba(0, 0, 0, 0.04);

            > span {
              background-image: url('../../../assets/svg/map-pin-fillweizhi-select.svg');
            }

            > div {
              > h3 {
                color: #d0963e;
              }
            }
          }
        }
      }

      .seal-map {
        width: calc(100% - 276px);
        height: 100%;
        border: 1px solid #e9ebec;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;

        > img {
          width: 70%;
        }
      }
    }
  }
</style>
