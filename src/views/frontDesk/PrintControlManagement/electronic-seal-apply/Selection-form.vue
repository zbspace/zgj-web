<!-- 用印申请 选中表单 -->
<template>
  <div class="electronic-seal-apply-Selection-form">
    <componentsLayout Layout="title,custom">
      <template #title>
        <div class="title">
          <div>电子签章申请</div>
          <div> </div>
        </div>
      </template>
      <template #custom>
        <div class="custom">
          <!-- <div class="ap-cont-info">
            <div class="ap-cont-info-icon">
              <img
                class="ap-cont-info-icon-img"
                src="../../../../assets/svg/gantanhao-lan.svg"
                alt=""
              />
            </div>
            <div class="ap-cont-info-desc"
              >有已发起意外退出的用印申请【上海科创招投标建筑制材专属项目合同】</div
            >
            <div class="ap-cont-info-caozuo">继续完成用印申请</div>
          </div> -->
          <div class="ap-cont-title"> 请选择所需表单 </div>
          <div class="ap-cont-desc">
            请根据以下步骤完善表单内容及确认审批流程
          </div>
          <div class="ap-cont-liuc">
            <div class="ap-cont-liuc-buzou">
              <div class="ap-cont-liuc-buzou-icon">
                <img
                  class="ap-cont-liuc-buzou-icon-img"
                  src="@/assets/svg/front/sealApply/step_icon1.svg"
                  alt=""
                />
              </div>
              <div class="ap-cont-liuc-buzou-text">填写表单信息</div>
            </div>
            <div class="ap-cont-liuc-tubiao">
              <img
                class="ap-cont-liuc-tubiao-img"
                src="@/assets/svg/front/sealApply/step_next.svg"
                alt=""
              />
            </div>
            <div class="ap-cont-liuc-buzou">
              <div class="ap-cont-liuc-buzou-icon">
                <img
                  class="ap-cont-liuc-buzou-icon-img"
                  src="@/assets/svg/front/sealApply/step_icon2.svg"
                  alt=""
                />
              </div>
              <div class="ap-cont-liuc-buzou-text">确认审批流程</div>
            </div>
            <div class="ap-cont-liuc-tubiao">
              <img
                class="ap-cont-liuc-tubiao-img"
                src="@/assets/svg/front/sealApply/step_next.svg"
                alt=""
              />
            </div>
            <div class="ap-cont-liuc-buzou">
              <div class="ap-cont-liuc-buzou-icon">
                <img
                  class="ap-cont-liuc-buzou-icon-img"
                  src="@/assets/svg/front/sealApply/step_icon3.svg"
                  alt=""
                />
              </div>
              <div class="ap-cont-liuc-buzou-text">完成用印申请</div>
            </div>
          </div>
          <div class="ap-cont-liebiao">
            <div class="ap-cont-liebiao-list" v-for="n in 15" :key="n">
              <div class="ap-cont-liebiao-list-back">
                <img
                  class="ap-cont-liebiao-list-back-img"
                  src="@/assets/svg/front/sealApply/form_icon.svg"
                  alt=""
                />
              </div>
              <div class="ap-cont-liebiao-list-desc">
                上海科创招投标建筑制材专属项目合同
              </div>
              <div class="ap-cont-liebiao-list-but">
                <el-button type="primary" @click="clickListBut"
                  >去申请</el-button
                >
              </div>
            </div>
          </div>
        </div>
      </template>
    </componentsLayout>
  </div>
</template>
<script setup>
  import { reactive, onBeforeMount, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import componentsLayout from '../../../components/Layout.vue'
  const props = defineProps({
    // 处理类型
    type: {
      type: String,
      default: '0'
    }
  })
  const router = useRouter()
  const emit = defineEmits([])
  const state = reactive({})

  // 点击列表按钮
  function clickListBut() {
    router.push({ name: 'ESelectionFillForm' })
  }

  onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
  })
  onMounted(() => {
    // console.log(`the component is now mounted.`)
  })
</script>
<style lang="scss" scoped>
  .electronic-seal-apply-Selection-form {
    margin: 0%;

    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .custom {
      // padding-right: 1.25rem;
      box-sizing: border-box;
      text-align: center;

      .ap-cont-info {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 0.5rem;
        box-sizing: border-box;
        background-color: var(--jy-info-1);
        border: 1px solid var(--jy-info-3);
        border-radius: var(--jy-border-radius-2);
        position: relative;
        margin-bottom: 1rem;

        .ap-cont-info-icon {
          margin-right: 0.5rem;
        }

        .ap-cont-info-caozuo {
          position: absolute;
          right: 0.5rem;
          color: var(--jy-info-6);
        }
      }

      .ap-cont-title {
        display: flex;
        justify-content: center;
        font-size: var(--jy-font-size-title-1);
        font-weight: var(--jy-font-weight-600);
        margin-bottom: 1rem;
      }

      .ap-cont-desc {
        display: flex;
        justify-content: center;
        margin-bottom: 1rem;
        color: var(--jy-color-text-2);
      }

      .ap-cont-liuc {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 1rem;

        .ap-cont-liuc-buzou {
          padding: 1rem;
          box-sizing: border-box;

          .ap-cont-liuc-buzou-icon {
            margin-bottom: 0.5rem;
          }
        }

        .ap-cont-liuc-tubiao {
          padding: 1rem;
          box-sizing: border-box;
        }
      }

      .ap-cont-liebiao {
        display: flex;
        flex-flow: wrap;

        @media screen and (max-width: 900px) {
          .ap-cont-liebiao-list {
            width: 100%;
            margin: 0;
          }
        }

        @media screen and (min-width: 900px) and (max-width: 1200px) {
          .ap-cont-liebiao-list {
            width: calc((100% - 15px) / 2);
          }

          .ap-cont-liebiao-list:nth-of-type(2n) {
            margin: 0 0 15px 0;
          }
        }

        @media screen and (min-width: 1200px) and (max-width: 1500px) {
          .ap-cont-liebiao-list {
            width: calc((100% - 30px) / 3);
          }

          .ap-cont-liebiao-list:nth-of-type(3n) {
            margin: 0 0 15px 0;
          }
        }

        @media screen and (min-width: 1500px) and (max-width: 1750px) {
          .ap-cont-liebiao-list {
            width: calc((100% - 45px) / 4);
          }

          .ap-cont-liebiao-list:nth-of-type(4n) {
            margin: 0 0 15px 0;
          }
        }

        @media screen and (min-width: 1750px) {
          .ap-cont-liebiao-list {
            width: calc((100% - 60px) / 5);
          }

          .ap-cont-liebiao-list:nth-of-type(5n) {
            margin: 0 0 15px 0;
          }
        }
        .ap-cont-liebiao-list {
          margin: 0 15px 15px 0;
          padding: 10px;
          box-sizing: border-box;
          display: flex;
          flex-flow: wrap;
          justify-content: center;
          border: 1px solid var(--jy-color-border-1);
          border-radius: var(--jy-border-radius-4);
          background-color: var(--jy-color-fill--1);
          overflow: hidden;
          .ap-cont-liebiao-list-back {
            width: 10rem;
            height: 10rem;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .ap-cont-liebiao-list-desc {
            width: 100%;
            margin-bottom: 0.5rem;
            color: var(--jy-color-text-1);
          }

          .ap-cont-liebiao-list-but {
            margin-bottom: 0.5rem;
          }
        }
      }
    }
  }
</style>
