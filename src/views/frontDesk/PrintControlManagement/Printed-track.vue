<!-- 用印轨迹 -->
<template>
  <div class="PrintControlManagement-Printed-track">
    <componentsLayout Layout="title,searchForm,custom">
      <template #title>
        <div class="title">
          <div>用印轨迹</div>
          <!-- <div>
                        <el-button>
                            <img class="button-icon" src="../../../assets/svg/gengduo-caozuo.svg" alt="" srcset="">
                            <span>更多操作</span>
                        </el-button>
                    </div> -->
        </div>
      </template>
      <template #tabs>
        <div>
          <componentsTabs activeName="1" :data="state.componentsTabs.data">
          </componentsTabs>
        </div>
      </template>
      <template #searchForm>
        <div>
          <componentsSearchForm
            :data="state.componentsSearchForm.data"
            :butData="state.componentsSearchForm.butData"
            :style="state.componentsSearchForm.style"
            :defaultAttribute="state.componentsSearchForm.defaultAttribute"
          >
          </componentsSearchForm>
        </div>
      </template>
      <template #custom>
        <div class="content">
          <div class="seal-list">
            <div
              class="seal-item"
              v-for="(item, index) in state.componentsSealList.data"
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
                  <h3>{{ item[1] }}</h3>
                  <p>{{ item[2] }}</p>
                </div>
              </div>
            </div>
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
  import { reactive, onBeforeMount, onMounted } from 'vue'
  import componentsTable from '../../components/table'
  import componentsSearchForm from '../../components/searchForm'
  import componentsTree from '../../components/tree'
  import componentsBreadcrumb from '../../components/breadcrumb'
  import componentsPagination from '../../components/pagination.vue'
  import componentsTabs from '../../components/JyTabs.vue'
  import componentsLayout from '../../components/Layout.vue'
  import componentsDocumentsDetails from '../../components/documentsDetails.vue'
  const props = defineProps({
    // 处理类型
    type: {
      type: String,
      default: '0'
    }
  })
  const emit = defineEmits([])
  const state = reactive({
    componentsTabs: {
      data: [
        {
          label: '待归档',
          name: '1'
        },
        {
          label: '已归档',
          name: '2'
        }
      ]
    },
    componentsSearchForm: {
      style: {
        lineStyle: {
          width: 'calc(100% / 3)'
        },
        labelStyle: {
          width: '100px'
        }
      },
      data: [
        {
          id: 'name',
          label: '关键词',
          type: 'input',
          inCommonUse: true,
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '请输入'
          }
        }
        // {
        //     id: 'picker',
        //     label: "选择时间",
        //     type: "picker",
        //     inCommonUse: true,
        //     // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
        //     defaultAttribute: {
        //         type: "daterange",
        //         "start-placeholder": "开始时间",
        //         "end-placeholder": "结束时间"
        //     },
        //     style: {

        //     }
        // },
      ],
      butData: [
        {
          id: 'more',
          name: '展开',
          type: 'unfold',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            type: 'primary'
          },
          style: {}
        },
        {
          id: 'inquire',
          name: '查询',
          type: 'click',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            type: 'primary'
          },
          style: {}
        },
        {
          id: 'reset',
          name: '重置',
          type: 'click',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {},
          style: {}
        }
      ],
      // 默认属性
      defaultAttribute: {
        isUnfold: false,
        'scrollbar-max-height': 'auto',
        'border-bottom': false
      }
    },
    componentsSealList: {
      curIndex: 0,
      data: [
        {
          1: '印章名称1',
          2: '马丽丽'
        },
        {
          1: '印章名称2',
          2: '马丽丽'
        },
        {
          1: '印章名称3',
          2: '马丽丽'
        },
        {
          1: '印章名称4',
          2: '马丽丽'
        },
        {
          1: '印章名称4',
          2: '马丽丽'
        },
        {
          1: '印章名称4',
          2: '马丽丽'
        }
      ]
    }
  })
  // 点击印章列表
  function clickSeal(item, index) {
    state.componentsSealList.curIndex = index
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
      // padding-right: 20px;
      box-sizing: border-box;

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
        height: 626px;
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
