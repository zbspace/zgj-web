<!-- 用印申请 选中表单 -->
<template>
  <div class="Seal-application-Selection-form">
    <componentsLayout Layout="title,custom">
      <template #title>
        <div class="title">
          <div>用印申请</div>
          <div />
        </div>
      </template>
      <template #custom>
        <div class="custom">
          <div class="ap-cont-info">
            <div class="ap-cont-info-icon">
              <img
                class="ap-cont-info-icon-img"
                src="../../../../assets/svg/gantanhao-lan.svg"
                alt=""
              />
            </div>
            <div class="ap-cont-info-desc">
              有已发起意外退出的用印申请【上海科创招投标建筑制材专属项目合同】
            </div>
            <div class="ap-cont-info-caozuo"> 继续完成用印申请 </div>
          </div>
          <div class="ap-cont-title"> 请选择所需表单 </div>
          <div class="ap-cont-desc">
            请根据以下步骤完善表单内容及确认审批流程
          </div>
          <div class="ap-cont-liuc">
            <div class="ap-cont-liuc-buzou">
              <div class="ap-cont-liuc-buzou-icon">
                <img
                  class="ap-cont-liuc-buzou-icon-img"
                  src="../../../../assets/svg/yongyin-shenqing-kaishi.svg"
                  alt=""
                />
              </div>
              <div class="ap-cont-liuc-buzou-text"> 填写表单信息 </div>
            </div>
            <div class="ap-cont-liuc-tubiao">
              <img
                class="ap-cont-liuc-tubiao-img"
                src="../../../../assets/svg/yongyin-shenqing-xiayibu.svg"
                alt=""
              />
            </div>
            <div class="ap-cont-liuc-buzou">
              <div class="ap-cont-liuc-buzou-icon">
                <img
                  class="ap-cont-liuc-buzou-icon-img"
                  src="../../../../assets/svg/yongyin-shenqing-liucheng.svg"
                  alt=""
                />
              </div>
              <div class="ap-cont-liuc-buzou-text"> 确认审批流程 </div>
            </div>
            <div class="ap-cont-liuc-tubiao">
              <img
                class="ap-cont-liuc-tubiao-img"
                src="../../../../assets/svg/yongyin-shenqing-xiayibu.svg"
                alt=""
              />
            </div>
            <div class="ap-cont-liuc-buzou">
              <div class="ap-cont-liuc-buzou-icon">
                <img
                  class="ap-cont-liuc-buzou-icon-img"
                  src="../../../../assets/svg/yongyin-shenqing-wancheng.svg"
                  alt=""
                />
              </div>
              <div class="ap-cont-liuc-buzou-text"> 完成用印申请 </div>
            </div>
          </div>
          <div class="ap-cont-liebiao">
            <div class="ap-cont-liebiao-list" v-for="n in 5" :key="n">
              <div class="ap-cont-liebiao-list-back">
                <img
                  class="ap-cont-liebiao-list-back-img"
                  src="../../../../assets/svg/yongyin-shenqing-biaodan-back.svg"
                  alt=""
                />
              </div>
              <div class="ap-cont-liebiao-list-desc">
                上海科创招投标建筑制材专属项目合同
              </div>
              <div class="ap-cont-liebiao-list-but">
                <el-button type="primary" @click="clickListBut(n)">
                  去申请
                </el-button>
              </div>
              <div
                class="ap-cont-liebiao-list-template"
                @click="clickSavedTemplate"
              >
                <span class="text">保存的模板</span>
                <i class="icon">
                  <svg class="iconpark-icon"><use href="#icon3"></use></svg>
                </i>
              </div>
            </div>
          </div>
        </div>
      </template>
    </componentsLayout>
    <!-- 动态表单 -->
    <KDialog
      @update:show="showFormDialog = $event"
      :show="showFormDialog"
      title="选择模板"
      :centerBtn="true"
      :confirmText="$t('t-zgj-operation.submit')"
      :concelText="$t('t-zgj-operation.cancel')"
      :width="1000"
      :height="600"
      @close="submitForm"
    >
      <div class="optional-module">
        <div class="optional-module-list" v-for="n in 6" :key="n">
          <div class="optional-module-list-title">
            <div class="optional-module-list-title-desc">
              文件类型文件类型文件类型文件类型
            </div>
            <div class="optional-module-list-title-time">
              2022-09-11 10:21:55
            </div>
          </div>
          <div class="optional-module-list-desc">
            <div class="optional-module-list-desc-text">
              单据名称单据名称单据名称单据名称单据名称单据名称
            </div>
            <div class="optional-module-list-desc-but">
              <div class="button shiyong">使用</div>
              <div class="button shanchu">删除</div>
            </div>
          </div>
        </div>
      </div>
    </KDialog>
  </div>
</template>
<script setup>
  import { ref, defineProps, onBeforeMount, onMounted, inject } from 'vue'
  import { useRouter } from 'vue-router'
  import componentsLayout from '@/views/components/Layout.vue'
  import KDialog from '@/views/components/modules/kdialog.vue'
  // eslint-disable-next-line no-unused-vars
  const props = defineProps({
    // 处理类型
    type: {
      type: String,
      default: '0'
    }
  })
  const router = useRouter()
  const commonFun = inject('commonFun')
  const showFormDialog = ref(false)
  // 点击列表按钮
  function clickListBut(n) {
    commonFun.routerPage(router, {
      name: 'selectionForms',
      params: { id: n }
    })
  }

  // 点击 保存的模板
  function clickSavedTemplate() {
    showFormDialog.value = true
  }

  // 提交 保存的模板
  function submitForm() {
    showFormDialog.value = false
  }

  onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
  })
  onMounted(() => {
    // console.log(`the component is now mounted.`)
  })
</script>
<style lang="scss" scoped>
  .Seal-application-Selection-form {
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
        background-color: var(--jy-Info-1);
        border: 1px solid var(--jy-Info-3);
        border-radius: var(--jy-border-radius-2);
        position: relative;
        margin-bottom: 1rem;

        .ap-cont-info-icon {
          margin-right: 0.5rem;
        }

        .ap-cont-info-caozuo {
          position: absolute;
          right: 0.5rem;
          color: var(--jy-Info-6);
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

        .ap-cont-liebiao-list {
          width: 20rem;
          margin: 0rem 1rem 1rem 0rem;
          padding: 0.5rem;
          box-sizing: border-box;
          display: flex;
          flex-flow: wrap;
          justify-content: center;
          border: 1px solid var(--jy-color-border-1);
          border-radius: var(--jy-border-radius-4);
          background-color: var(--jy-color-fill--1);
          position: relative;

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
          .ap-cont-liebiao-list-template {
            position: absolute;
            top: 1rem;
            right: 0%;
            color: var(--jy-Info-6);
            display: flex;
            cursor: pointer;
            .text {
              height: 1.5rem;
              display: flex;
              align-items: center;
              margin-right: 0.2rem;
            }
            .icon {
              width: 1.5rem;
              height: 1.5rem;
              display: flex;
              align-items: center;
              .iconpark-icon {
                width: 1rem;
                height: 1rem;
              }
            }
          }
        }
      }
    }
    .optional-module {
      .optional-module-list {
        display: flex;
        border: 1px solid var(--jy-color-border-1);
        border-radius: var(--jy-border-radius-4);
        margin: 1rem 0rem;
        padding: 1rem;
        box-sizing: border-box;
        flex-flow: wrap;
        .optional-module-list-title {
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          .optional-module-list-title-desc {
            width: calc(100% - 10rem);
            color: var(--jy-color-text-1);
          }
          .optional-module-list-title-time {
            width: 10rem;
            text-align: right;
            color: var(--jy-color-text-3);
            font-size: var(--jy-font-size-body-1);
          }
        }
        .optional-module-list-desc {
          width: 100%;
          display: flex;
          justify-content: space-between;
          .optional-module-list-desc-text {
            width: calc(100% - 10rem);
            color: var(--jy-color-text-3);
          }
          .optional-module-list-desc-but {
            display: flex;
            .button {
              padding: 0.2rem 1rem;
              border-radius: var(--jy-border-radius-2);
              border: 1px solid var(--jy-color-border-1);
              font-size: var(--jy-font-size-body-1);
              margin-left: 0.5rem;
              color: var(--jy-color-text-2);
            }
            .shiyong {
              color: var(--jy-Info-6);
              background-color: var(--jy-Info-1);
              border-color: var(--jy-Info-1);
            }
          }
        }
      }
    }
  }
</style>
