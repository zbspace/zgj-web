<!--
* @Descripttion 流程设计-关联表单
* @FileName Association-form.vue
* @Author WalterXsk
* @LastEditTime 2023-03-15 16:47:11
!-->
<template>
  <div class="flowManage-Association-form">
    <div class="choice" v-show="state.currentState === '1'">
      <div class="info-box">
        <div class="info-title"> 选择表单进行关联 </div>
        <div class="info-remind">
          <div class="info-remind-title">
            <div class="info-remind-title-icon">
              <i class="icon">
                <svg class="iconpark-icon">
                  <use href="#Check-Circle"></use>
                </svg>
              </i>
            </div>
            <div class="info-remind-title-text"> 提示 </div>
          </div>
          <div class="info-remind-p">
            1: 如果关联表单，则该流程仅用于当前表单；
          </div>
          <div class="info-remind-p">
            2: 若当前业务类型/文件类型换绑新的表单，则新表单无法使用当前流程；
          </div>
          <div class="info-remind-p">
            3:
            如果不关联表单，无论当前业务类型/文件类型绑定的表单怎么变更，该流程都可使用。
          </div>
        </div>
        <div class="info-form">
          <el-form :model="form" label-width="80px" status-icon>
            <el-form-item label="业务类型" prop="applyTypeId" required>
              <el-select v-model="form.applyTypeId">
                <el-option-group
                  v-for="group in props.businessList"
                  :key="group.applyTypeName"
                  :label="group.applyTypeName"
                >
                  <el-option
                    v-for="item in group.children"
                    :key="item.applyTypeId"
                    :label="item.applyTypeName"
                    :value="item.applyTypeId"
                  />
                </el-option-group>
              </el-select>
            </el-form-item>
            <el-form-item
              label="用印类型"
              prop="sealUseTypeId"
              v-if="form.applyTypeId === '2'"
            >
              <el-radio-group v-model="form.sealUseTypeId">
                <el-radio :label="1" size="large">物理用印</el-radio>
                <el-radio :label="2" size="large">电子签章</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>
        <div
          class="info-noContent"
          v-if="state.list.data.length === 0 && flagStatus"
        >
          <div class="info-noContent-backcolor" @click="clickEdit">
            <img src="@/assets/svg/system/flow/vector.svg" />
            <div class="text">去创建</div>
          </div>
          <div class="info-noContent-desc">
            <img src="@/assets/svg/system/flow/info.svg" />
            暂无可关联的表单
          </div>
        </div>
        <div
          class="info-list"
          v-if="form.applyTypeId && state.list.data.length !== 0"
        >
          <div class="container-list">
            <div
              class="list"
              v-for="(item, index) in state.list.data"
              :key="index"
            >
              <div class="ap-cont-liebiao-list-desc">
                {{ item.formName }}
              </div>
              <el-button
                type="primary"
                class="btn"
                @click="clickEditForm(item)"
              >
                选择
              </el-button>
            </div>
            <i></i><i></i>
          </div>
        </div>
      </div>
    </div>
    <div class="exhibition" v-if="state.currentState === '2'">
      <div class="info-box">
        <JyVform
          mode="render"
          v-if="resetFlag"
          :formJson="formJson"
          :formData="state.SealformData"
          :optionData="state.SealoptionData"
          ref="refFillFormInformation"
          @on-loaded="refFillFormInformation.disableForm()"
        />
      </div>
      <div class="info-footer">
        <el-button type="primary" @click="clickEdit">编辑</el-button>
        <el-button @click="clickReselect">重新选择</el-button>
      </div>
    </div>
    <!-- 编辑表单 -->
    <div>
      <JyElMessageBox
        v-model="state.JyElMessageBox.show"
        :custom-content="true"
        :defaultAttribute="{
          fullscreen: true,
          height: '100%'
        }"
      >
        <AddFrom
          v-model="state.JyElMessageBox.show"
          v-if="state.JyElMessageBox.show"
          addTitle="编辑"
          :columnData="vformObj"
          @close="state.JyElMessageBox.show = false"
          :optionData="props.businessList"
          @reloadData="clickEditForm"
        />
      </JyElMessageBox>
    </div>
  </div>
</template>
<script setup>
  import { reactive, ref, watch } from 'vue'
  import AddFrom from '@/views/system/businessManage/formManage/AddForm/index.vue'
  import FlowApi from '@/api/system/flowManagement'
  import { ModelApi } from '@/api/flow/ModelApi'
  const refFillFormInformation = ref(null)
  const formJson = ref('')
  const vformObj = ref(null)
  const state = reactive({
    currentState: '1', // 1选择表单  2 编辑表单
    list: {
      radio: '',
      data: []
    },
    JyElMessageBox: {
      show: false,
      header: {
        data: ''
      },
      content: {
        data: ''
      }
    },
    SealformData: {},
    SealoptionData: {}
  })
  const form = reactive({
    ProcessName: '',
    ProcessType: false,
    sealUseTypeId: 1,
    applyTypeId: '',
    formMessageId: ''
  })
  const flagStatus = ref(false)

  const props = defineProps({
    businessList: {
      type: Array,
      default: () => {
        return []
      }
    },
    modelValue: {
      type: String,
      default: ''
    }
  })

  const emits = defineEmits('update:modelValue')
  const resetFlag = ref(true)
  // 选中
  const clickEditForm = attr => {
    resetFlag.value = false
    FlowApi.getFormJsonById({ formMessageId: attr.formMessageId }).then(res => {
      form.formMessageId = res.data.formMessageId
      state.currentState = '2'
      formJson.value = (res.success && JSON.parse(res.data.formInfo)) || ''
      vformObj.value = attr
      resetFlag.value = true
    })
  }

  // 点击重新选择
  const clickReselect = () => {
    state.currentState = '1'
  }

  // 点击编辑
  const clickEdit = () => {
    state.JyElMessageBox.show = true
  }

  // 获取信息值
  const getAssociationValue = () => {
    if (!form.formMessageId) {
      return [
        {
          formMessageId: [
            {
              message: '请选择关联表单',
              fieldValue: '',
              field: 'formMessageId'
            }
          ]
        }
      ]
    }
    return form
  }

  // 获取表单列表
  const getFromList = async () => {
    try {
      const params = {
        applyTypeId: form.applyTypeId,
        sealUseTypeId: form.sealUseTypeId
      }
      const res = await FlowApi.flowSettingForm(params)
      state.list.data = res.data || []
      flagStatus.value = true
    } catch (error) {}
  }

  watch(
    () => form.applyTypeId,
    val => {
      if (!val) return (flagStatus.value = false)
      state.list.data = []
      getFromList()
      emits('update:modelValue', val)
    },
    {
      deep: true,
      immediate: true
    }
  )

  watch(
    () => props.modelValue,
    val => {
      form.applyTypeId = val
    },
    {
      deep: true,
      immediate: true
    }
  )

  watch(
    () => form.sealUseTypeId,
    val => {
      getFromList()
    },
    {
      deep: true,
      immediate: true
    }
  )

  const saveAddModel = () => {
    return new Promise((resolve, reject) => {
      if (!form.formMessageId) {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject('请选择表单')
        return
      }

      const random = Math.random()
      ModelApi.add({
        modelKey: random,
        formIdList: [form.formMessageId]
      }).then(() => {
        ModelApi.getModelKey({
          modelKey: random
        }).then(res => {
          resolve({
            modelId: res.modelId,
            definitionId: res.definitionId
          })
        })
      })
    })
  }
  // 提供方法
  defineExpose({
    getAssociationValue,
    saveAddModel
  })
</script>
<style lang="scss" scoped>
  .flowManage-Association-form {
    width: 1194px;
    min-height: calc(95% - 1rem);
    margin-top: 1rem;
    background-color: var(--jy-color-fill--5);
    position: relative;
    color: var(--jy-color-text-1);
    padding-bottom: 24px;
    .choice {
      width: 100%;
      height: 100%;
    }
    .exhibition {
      width: 100%;
      height: 100%;
      .info-box {
        width: 100%;
        padding: 20px;
      }
    }

    .info-box {
      margin: auto;
      text-align: center;
      .info-title {
        padding-top: 3rem;
        font-size: var(--jy-font-size-title-2);
        color: var(--jy-color-text-1);
      }

      .info-from {
        margin-top: 1.5rem;
      }
    }

    .info-footer {
      width: 100%;
      position: absolute;
      bottom: 0%;
      height: 4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-top: 1px solid var(--jy-color-border-2);
    }

    .info-remind {
      width: 654px;
      margin: auto;
      background: var(--jy-warning-1);
      /* 警告 Warning/禁用 */

      border: 1px solid var(--jy-warning-3);
      border-radius: var(--jy-border-radius-2);
      padding: 1rem;
      margin-top: 1rem;
      text-align: left;

      .info-remind-title {
        display: flex;
        align-items: center;
        font-size: var(--jy-font-size-title-1);

        .info-remind-title-icon {
          margin-right: 0.5rem;
          width: 1.3rem;
          height: 1.3rem;

          .icon {
            width: 100%;
            height: 100%;
          }
        }
      }

      .info-remind-p {
        padding: 0.2rem 1.8rem;
        box-sizing: border-box;
        color: var(--jy-color-text-3);
      }
    }

    .info-form {
      margin-top: 24px;
      box-sizing: border-box;
      padding: 0 357px;
    }

    .info-noContent {
      margin-top: 1rem;
      display: flex;
      justify-content: center;
      flex-flow: wrap;

      .info-noContent-backcolor {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 258px;
        height: 110px;
        background: rgba(0, 0, 0, 0.02);
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 4px;
        margin-top: 24px;
        cursor: pointer;
        .text {
          margin-top: 20px;
          color: rgba(0, 0, 0, 0.85);
          font-size: 14px;
        }
      }

      .info-noContent-desc {
        width: 100%;
        margin-top: 16px;

        img {
          width: 16px;
        }
      }
    }

    .info-list {
      margin-top: 16px;
      padding: 0 54px;

      .container-list {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-right: -15px;
      }
      .list {
        width: 258px;
        height: 110px;
        margin: 15px 10px 0 0;
        padding: 12px 24px;
        border: 1px solid var(--jy-color-border-1);
        border-radius: var(--jy-border-radius-4);
        background-color: var(--jy-color-fill--1);
      }
      /* 和列表一样的宽度和margin值 */
      .container-list > i {
        width: 258px;
        margin-right: 15px;
      }

      .btn {
        width: 60px;
        height: 32px;
        margin-top: 16px;
        font-size: 14px;
      }
    }

    .icon {
      width: 1rem;
      height: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;

      .iconpark-icon {
        width: 100%;
        height: 100%;
      }
    }

    // 已启用
    .Have-been-enabled {
      background: var(--jy-success-1);
      /* 成功 Success/常规 */
      border: 1px solid var(--jy-success-6);
      border-radius: var(--jy-border-radius-2);
      font-size: var(--jy-font-size-caption);
      color: var(--jy-success-6);
      padding: 0.1rem 0.2rem;
      box-sizing: border-box;
    }

    // 禁用
    .disabled {
      background: var(--jy-color-fill--2);
      /* 成功 Success/常规 */
      border: 1px solid var(--jy-color-border-1);
      border-radius: var(--jy-border-radius-2);
      font-size: var(--jy-font-size-caption);
      color: var(--jy-color-text-2);
      padding: 0.1rem 0.2rem;
      box-sizing: border-box;
    }

    :deep(.el-form) {
      .el-form-item__label {
        margin-bottom: 0%;
      }

      .el-select {
        width: 100%;
      }
    }
  }
  .el-form-item {
    margin-bottom: 24px !important;
  }
</style>
