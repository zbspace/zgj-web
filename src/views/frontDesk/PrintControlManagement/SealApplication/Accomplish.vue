<!-- 用印申请 选中表单 -->
<template>
  <div class="Seal-application-accomplish">
    <componentsLayout Layout="breadcrumb,title,custom,fixed">
      <template #breadcrumb>
        <div class="breadcrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item
              style="--el-text-color-regular: rgba(0, 0, 0, 0.65)"
            >
              用印申请
            </el-breadcrumb-item>
            <el-breadcrumb-item
              style="--el-text-color-regular: rgba(0, 0, 0, 0.25)"
            >
              新建用印申请
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </template>
      <template #title>
        <div class="title">
          <div class="title-desc">
            <img
              class="title-desc-img"
              src="@/assets/svg/front/sealApply/back.svg"
              alt=""
              @click="clickBackPage"
            />
            新建用印申请
          </div>
          <div> </div>
        </div>
      </template>
      <template #custom>
        <div class="custom">
          <div class="custom-buzhou">
            <SealApplicationStep
              :data="state.cache.flowList"
            ></SealApplicationStep>
          </div>
          <div class="custom-cont">
            <div class="custom-cont-icon">
              <img
                class="custom-cont-icon-img"
                src="@/assets/svg/front/sealApply/success_icon.svg"
                alt=""
              />
            </div>
            <div class="custom-cont-title"> 操作成功 </div>
            <div class="custom-cont-p"> 请等待单据审批完成 </div>
            <div class="custom-cont-p"> 单据编号：{{ applyNo }} </div>
            <!-- <div class="custom-cont-p">
              用印文件名称：单据名称单据名称单据名称单据名称
            </div> -->
            <div class="custom-cont-but">
              <el-button type="primary" @click="getDetail">
                查看单据详情
              </el-button>
              <el-button @click="clickBackPage">返回</el-button>
            </div>
          </div>
        </div>
      </template>
    </componentsLayout>
  </div>
</template>
<script setup>
  import { reactive, onBeforeMount, onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import componentsLayout from '../../../components/Layout.vue'
  import SealApplicationStep from '@/views/components/sealApplication/JyStep.vue'
  const router = useRouter()
  const state = reactive({
    cache: {
      flowList: [
        {
          name: '填写表单信息'
        },
        {
          name: '确认审批流程'
        },
        {
          name: '完成',
          active: true
        }
      ]
    }
  })
  const applyNo = ref(router.currentRoute.value.query.applyNo)

  // 点击返回上一页
  function clickBackPage() {
    router.go(-1)
  }

  const getDetail = () => {
    router.replace({ name: 'RecordWithSeal' })
  }

  onBeforeMount(() => {})
  onMounted(() => {
    // console.log(`the component is now mounted.`)
  })
</script>
<style lang="scss" scoped>
  .Seal-application-accomplish {
    margin: 0%;
    position: relative;

    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .title-desc {
        display: flex;
        align-items: center;

        .title-desc-img {
          margin-right: 0.5rem;
          cursor: pointer;
        }
      }
    }

    .custom {
      // padding-right: 1.25rem;
      box-sizing: border-box;
      text-align: center;
      padding-bottom: 4rem;

      .custom-buzhou {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem 0;
        box-sizing: border-box;

        .custom-buzhou-list {
          display: flex;
          justify-content: center;
          align-items: center;

          .custom-buzhou-list-desc {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 10rem;

            .custom-buzhou-list-desc-index {
              width: 1.5rem;
              height: 1.5rem;
              display: flex;
              justify-content: center;
              align-items: center;
              background-color: var(--jy-color-fill--3);
              color: var(--jy-color-text-3);
              border-radius: var(--jy-border-radius-2);
              margin-right: 0.5rem;
            }

            .custom-buzhou-list-desc-text {
              font-size: var(--jy-font-size-title-1);
              color: var(--jy-color-text-3);
            }
          }

          .custom-buzhou-list-jiantou {
            width: 7rem;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }

        .indexActive {
          background-color: var(--jy-primary-6) !important;
          color: var(--jy-in-common-use-1) !important;
        }

        .textActive {
          color: var(--jy-color-text-1) !important;
        }

        .font-color-45 {
          color: var(--jy-color-text-3) !important;
        }
      }

      .custom-cont {
        .custom-cont-icon {
          margin-top: 2rem;
          margin-bottom: 1rem;
        }

        .custom-cont-title {
          font-size: var(--jy-font-size-title-3);
          color: var(--jy-color-text-1);
          margin-bottom: 1rem;
        }

        .custom-cont-p {
          color: var(--jy-color-text-3);
          margin-bottom: 0.5rem;
        }

        .custom-cont-but {
          margin-top: 3rem;
        }
      }
    }

    .ap-fixed {
      width: calc(100%);
      position: absolute;
      bottom: 0%;
      height: 4rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-top: 1px solid var(--jy-color-border-2);
      background-color: var(--jy-in-common-use-1);
      z-index: 999;
    }
  }
</style>
