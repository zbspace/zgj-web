<!--
* @Descripttion 用印申请 选中表单
* @FileName SelectionForm.vue
* @Author WalterXsk
* @LastEditTime 2023-04-12 16:23:36
!-->
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
          <el-input
            v-model="keyword"
            placeholder="请输入表单名称"
            clearable
            class="formInput"
            @input="change"
            @keyup.enter="applyList"
            :prefix-icon="Search"
          >
          </el-input>
          <div class="cont-title"> 请选择所需表单 </div>
          <div class="cont-desc">
            请根据以下步骤完善表单内容及确认审批流程
          </div>
          <div class="cont-liuc">
            <div class="step">
              <div class="step-icon">
                <img
                  class="step-icon-img"
                  src="@/assets/svg/front/sealApply/step_icon1.svg"
                  alt=""
                />
              </div>
              <div class="step-text"> 填写表单信息 </div>
            </div>
            <div class="cont-liuc-tubiao">
              <img
                class="cont-liuc-tubiao-img"
                src="@/assets/svg/front/sealApply/step_next.svg"
                alt=""
              />
            </div>
            <div class="step">
              <div class="step-icon">
                <img
                  class="step-icon-img"
                  src="@/assets/svg/front/sealApply/step_icon2.svg"
                  alt=""
                />
              </div>
              <div class="step-text"> 确认审批流程 </div>
            </div>
            <div class="cont-liuc-tubiao">
              <img
                class="cont-liuc-tubiao-img"
                src="@/assets/svg/front/sealApply/step_next.svg"
                alt=""
              />
            </div>
            <div class="step">
              <div class="step-icon">
                <img
                  class="step-icon-img"
                  src="@/assets/svg/front/sealApply/step_icon3.svg"
                  alt=""
                />
              </div>
              <div class="step-text"> 完成用印申请 </div>
            </div>
          </div>
          <div class="cont-liebiao">
            <div
              class="column-list"
              v-for="(item, index) in applyLists"
              :key="index"
            >
              <div class="column-list-back">
                <img
                  class="column-list-back-img active"
                  :src="item.imageUrl"
                  alt=""
                  v-if="item.imageUrl"
                />
                <img
                  class="column-list-back-img"
                  v-else
                  src="@/assets/svg/front/sealApply/form_icon.svg"
                  alt=""
                />
              </div>
              <div class="column-list-desc">
                {{ item.formName }}
              </div>
              <div class="column-list-but">
                <el-button
                  type="primary"
                  @click="clickListBut(item.formMessageId, item.formVersionId)"
                >
                  去申请
                </el-button>
              </div>
              <div
                class="column-list-template"
                @click="
                  clickSavedTemplate(item.formMessageId, item.formVersionId)
                "
              >
                <span class="text">保存的模板</span>
                <i class="icon">
                  <svg class="iconpark-icon"><use href="#icon3"></use></svg>
                </i>
              </div>
            </div>
            <div class="empty">
              <el-empty
                description="您暂无可用的申请表单"
                v-if="!applyLists.length && !loading"
              />
            </div>
          </div>
        </div>
      </template>
    </componentsLayout>
    <!-- 动态表单 -->
    <JyDialog
      @update:show="showFormDialog = $event"
      :show="showFormDialog"
      title="选择模板"
      :centerBtn="true"
      :width="1000"
      :height="600"
      @close="submitForm"
    >
      <div class="optional">
        <div
          class="optional-list"
          v-for="(item, index) in templateList"
          :key="index"
        >
          <div class="list-title">
            <div class="list-title-desc"> {{ item.fileTypeName }} </div>
            <div class="list-title-time"> {{ item.createDatetime }}</div>
          </div>
          <div class="optional-list-desc">
            <div class="optional-list-desc-text">
              {{ item.templateName }}
            </div>
            <div class="optional-list-desc-but">
              <div
                class="button shiyong"
                @click="useTemplate(item.useSealApplyTemplateId)"
              >
                使用
              </div>
              <div
                class="button shanchu"
                @click="deleteTemplate(item.useSealApplyTemplateId)"
                >删除</div
              >
            </div>
          </div>
        </div>
        <JyLabel
          label="失效模版"
          btn1="一键清除"
          v-show="validTemplates.length !== 0"
        >
          <template #tip>
            <span class="tip"> 表单已更新，历史表单对应的模板会自动失效 </span>
          </template>
        </JyLabel>
        <div
          class="optional-list1"
          v-for="(item, index) in validTemplates"
          :key="index"
          v-show="validTemplates.length !== 0"
        >
          <div class="list-title">
            <div class="list-title-desc"> {{ item.fileTypeName }} </div>
            <div class="list-title-time"> {{ item.createDatetime }} </div>
          </div>
          <div class="optional-list-desc">
            <div class="optional-list-desc-text">
              {{ item.templateName }}
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="templateList.length + validTemplates.length === 0"
        class="data-null"
      >
        <img src="@/assets/svg/common/data_null.svg" />
      </div>
      <template #footer><span></span></template>
    </JyDialog>

    <JyMessageBox
      v-model="tipVisible"
      :mode="1"
      @on-confirm="confirmTip"
      @on-cancel="cancelTip"
      title="删除模版"
    >
      请问确定要删除吗？
    </JyMessageBox>
  </div>
</template>
<script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import componentsLayout from '@/views/components/Layout.vue'
  import sealApply from '@/api/frontDesk/printControl/sealApply'
  import { Search } from '@element-plus/icons-vue'
  import { debounce } from '@/utils/tools'
  import { ElMessage } from 'element-plus'

  const router = useRouter()
  const showFormDialog = ref(false)
  const applyLists = ref([])
  const keyword = ref('')
  const loading = ref(false)
  const tipVisible = ref(false)

  const deleteUseId = ref('')
  const confirmTip = () => {
    sealApply
      .deleteTem(deleteUseId.value)
      .then(res => {
        tipVisible.value = false
        ElMessage.success('删除成功')
        loadTemList()
      })
      .catch(() => {
        tipVisible.value = false
      })
  }

  const cancelTip = () => {
    tipVisible.value = false
  }
  // 点击列表按钮
  function clickListBut(formMessageId, formVersionId) {
    router.push({
      name: 'selectionForms',
      params: { id: formMessageId },
      query: { formVersionId }
    })
  }

  const templateList = ref([])
  const validTemplates = ref([])
  const chooseTemMessageId = ref('')
  const reloadVersionId = ref('')
  // 选择模版
  function clickSavedTemplate(formMessageId, formVersionId) {
    templateList.value = []
    validTemplates.value = []
    chooseTemMessageId.value = formMessageId
    reloadVersionId.value = formVersionId

    loadTemList()
  }

  const useTemplate = id => {
    router.push({
      name: 'selectionForms',
      params: { id: chooseTemMessageId.value },
      query: { formVersionId: null, useId: id }
    })
  }

  const deleteTemplate = id => {
    tipVisible.value = true
    deleteUseId.value = id
  }

  const loadTemList = () => {
    sealApply
      .templateList({ formVersionId: reloadVersionId.value })
      .then(res => {
        if (res.data) {
          templateList.value = res.data.templates ? res.data.templates : []
          validTemplates.value = res.data.validTemplates
            ? res.data.validTemplates
            : []
          showFormDialog.value = true
        } else {
          templateList.value = []
          validTemplates.value = []
          showFormDialog.value = true
        }
      })
  }

  // 提交 保存的模板
  function submitForm() {
    showFormDialog.value = false
  }

  const change = debounce(() => {
    applyList()
  }, 500)

  const applyList = () => {
    loading.value = true
    applyLists.value = []
    sealApply
      .list({ keyword: keyword.value.trim() })
      .then(res => {
        applyLists.value = res.data || []
      })
      .finally(() => {
        loading.value = false
      })
  }

  onMounted(() => {
    applyList()
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

    .empty {
      width: 100%;
    }

    .custom {
      // padding-right: 1.25rem;
      box-sizing: border-box;
      text-align: center;
      position: relative;

      .formInput {
        position: absolute;
        top: 0;
        left: 0;
        width: 30%;
      }

      .cont-info {
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

        .cont-info-icon {
          margin-right: 0.5rem;
        }

        .cont-info-caozuo {
          position: absolute;
          right: 0.5rem;
          color: var(--jy-info-6);
        }
      }

      .cont-title {
        display: flex;
        justify-content: center;
        font-size: var(--jy-font-size-title-1);
        font-weight: var(--jy-font-weight-600);
        margin-bottom: 1rem;
      }

      .cont-desc {
        display: flex;
        justify-content: center;
        margin-bottom: 1rem;
        color: var(--jy-color-text-2);
      }

      .cont-liuc {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 1rem;

        .step {
          padding: 1rem;
          box-sizing: border-box;

          .step-icon {
            margin-bottom: 0.5rem;
          }
        }

        .cont-liuc-tubiao {
          padding: 1rem;
          box-sizing: border-box;
        }
      }

      .cont-liebiao {
        display: flex;
        flex-flow: wrap;

        @media screen and (max-width: 900px) {
          .column-list {
            width: 100%;
            margin: 0;
          }
        }

        @media screen and (min-width: 900px) and (max-width: 1200px) {
          .column-list {
            width: calc((100% - 15px) / 2);
          }

          .column-list:nth-of-type(2n) {
            margin: 0 0 15px 0;
          }
        }

        @media screen and (min-width: 1200px) and (max-width: 1500px) {
          .column-list {
            width: calc((100% - 30px) / 3);
          }

          .column-list:nth-of-type(3n) {
            margin: 0 0 15px 0;
          }
        }

        @media screen and (min-width: 1500px) and (max-width: 1750px) {
          .column-list {
            width: calc((100% - 45px) / 4);
          }

          .column-list:nth-of-type(4n) {
            margin: 0 0 15px 0;
          }
        }

        @media screen and (min-width: 1750px) {
          .column-list {
            width: calc((100% - 60px) / 5);
          }

          .column-list:nth-of-type(5n) {
            margin: 0 0 15px 0;
          }
        }

        .column-list {
          // width: 20rem;
          margin: 0 15px 15px 0;
          padding: 10px;
          box-sizing: border-box;
          display: flex;
          flex-flow: wrap;
          justify-content: center;
          border: 1px solid var(--jy-color-border-1);
          border-radius: var(--jy-border-radius-4);
          background-color: var(--jy-color-fill--1);
          position: relative;
          overflow: hidden;
          .column-list-back {
            width: 10rem;
            height: 10rem;
            display: flex;
            justify-content: center;
            align-items: center;
            .column-list-back-img {
              width: 100%;
            }
            .active {
              cursor: pointer;
            }
          }

          .column-list-desc {
            width: 100%;
            margin-bottom: 0.5rem;
            color: var(--jy-color-text-1);
          }

          // .column-list-but {
          //   margin-bottom: 0.5rem;
          // }
          .column-list-template {
            position: absolute;
            top: 1rem;
            right: 0%;
            color: var(--jy-info-6);
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
    .optional {
      .tip {
        font-size: 14px;
        color: rgba($color: #000000, $alpha: 0.45);
        margin-left: 8px;
      }
      .optional-list {
        display: flex;
        border: 1px solid var(--jy-color-border-1);
        border-radius: var(--jy-border-radius-4);
        margin: 1rem 0rem;
        padding: 1rem;
        box-sizing: border-box;
        flex-flow: wrap;
      }

      .optional-list1 {
        display: flex;
        // border: 1px solid var(--jy-color-border-1);
        background: rgba(0, 0, 0, 0.04);
        border-radius: var(--jy-border-radius-4);
        margin: 1rem 0rem;
        padding: 1rem;
        box-sizing: border-box;
        flex-flow: wrap;
      }

      .list-title {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5rem;
        .list-title-desc {
          width: calc(100% - 10rem);
          color: var(--jy-color-text-1);
        }
        .list-title-time {
          width: 10rem;
          text-align: right;
          color: var(--jy-color-text-3);
          font-size: var(--jy-font-size-body-1);
        }
      }
      .optional-list-desc {
        width: 100%;
        display: flex;
        justify-content: space-between;
        .optional-list-desc-text {
          width: calc(100% - 10rem);
          color: var(--jy-color-text-3);
        }
        .optional-list-desc-but {
          display: flex;
          .button {
            padding: 0.2rem 1rem;
            border-radius: var(--jy-border-radius-2);
            border: 1px solid var(--jy-color-border-1);
            font-size: var(--jy-font-size-body-1);
            margin-left: 0.5rem;
            color: var(--jy-color-text-2);
            cursor: pointer;
          }
          .shiyong {
            color: var(--jy-info-6);
            background-color: var(--jy-info-1);
            border-color: var(--jy-info-1);
          }
        }
      }
    }
  }
  .data-null {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 460px;
  }
</style>
