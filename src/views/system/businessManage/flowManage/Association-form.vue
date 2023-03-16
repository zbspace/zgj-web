<!--
* @Descripttion 流程设计-关联表单
* @FileName Association-form.vue
* @Author WalterXsk
* @LastEditTime 2023-03-15 16:47:11
!-->
<template>
  <div class="flowManage-Association-form">
    <div class="choice" v-if="state.currentState === '1'">
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
          <el-form
            :model="form"
            label-width="80px"
            :rules="form.rules"
            ref="ruleFormRef"
            status-icon
          >
            <el-form-item label="业务类型" prop="applyTypeId" required>
              <el-tree-select
                clearable
                v-model="form.applyTypeId"
                :data="props.businessList"
                :render-after-expand="false"
                highlight-current
                accordion
                node-key="applyTypeId"
                :props="{
                  label: 'applyTypeName',
                  children: 'children'
                }"
              />
            </el-form-item>

            <el-form-item
              label="文件类型"
              prop="fileType"
              required
              v-if="form.applyTypeId === '2'"
            >
              <el-select v-model="form.fileType" placeholder="请选择">
                <el-option
                  :label="item.fileTypeName"
                  :value="item.fileTypeId"
                  v-for="item in fileTypeList"
                  :key="item.fileTypeId"
                />
              </el-select>
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
          <div
            class="info-list-box"
            v-for="(item, index) in state.list.data"
            :key="index"
          >
            <div class="info-list-box-redio">
              <el-radio-group
                v-model="state.list.radio"
                class="ml-4"
                @change="redioChange"
              >
                <el-radio :label="item.formMessageId" size="large">
                  <div class="info-list-box-text">
                    {{ item.formName }}
                  </div>
                </el-radio>
              </el-radio-group>
            </div>
            <div class="info-list-box-but">
              <div class="Have-been-enabled">已启用</div>
              <div
                @click.stop.prevent="clickEditForm"
                class="look-detail"
                v-if="false"
              >
                查看
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="info-footer">
        <el-button
          type="primary"
          @click="clickEdit"
          v-if="form.applyTypeId && state.list.data.length === 0"
        >
          去创建
        </el-button>
        <el-button
          type="primary"
          v-else
          @click="
            () => {
              state.currentState = '2'
            }
          "
          >确定</el-button
        >
      </div>
    </div>
    <div class="exhibition" v-if="state.currentState === '2'">
      <div class="info-box">
        <JyVform
          mode="render"
          :formJson="formJson"
          :formData="state.SealformData"
          :optionData="state.SealoptionData"
          :businessType="form.applyTypeId"
          ref="refFillFormInformation"
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
        <!-- <AddFrom
          v-model="state.JyElMessageBox.show"
          @close="state.JyElMessageBox.show = false"
        /> -->
        <AddFrom
          v-model="state.JyElMessageBox.show"
          v-if="state.JyElMessageBox.show"
          addTitle="编辑"
          :columnData="vformObj"
          @close="state.JyElMessageBox.show = false"
          :optionData="optionData"
        />
      </JyElMessageBox>
    </div>
  </div>
</template>
<script setup>
  import { reactive, ref, watch } from 'vue'
  import AddFrom from '@/views/system/businessManage/formManage/AddForm/index.vue'
  import { FetchFormListInfo } from '@/utils/domain/formManage'
  import FormManageService from '@/api/system/formManagement'
  import { fileManageService } from '@/api/frontDesk/fileManage'
  import { ModelApi } from '@/api/flow/ModelApi'
  const refFillFormInformation = ref(null)
  const fileTypeList = ref([])
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
    businessType: '',
    fileType: '',
    rangeApplication: '',
    applyTypeId: '',
    desc: '',
    rules: {
      applyTypeId: [
        {
          required: true,
          message: '请选择业务类型',
          trigger: ['blur', 'change']
        }
      ],
      fileType: [
        {
          required: true,
          message: '请选择文件类型',
          trigger: ['blur', 'change']
        }
      ]
    }
  })
  const flagStatus = ref(false)

  const props = defineProps({
    businessList: {
      type: Array,
      default: () => {
        return [] // ['table', 'rate', 'switch'] 自定义组件的type
      }
    },
    getModelValue: {
      type: Object,
      default: null
    }
  })

  const emits = defineEmits('update:getModelValue')

  // 点击去创建
  const clickEditForm = () => {
    state.currentState = '2'
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
  const getInfoValue = () => {
    let SelectionForm = null
    if (state.list.radio) {
      state.list.data.map(item => {
        if (item.label === state.list.radio) {
          SelectionForm = item
        }
        return true
      })
    }
    return {
      SelectionForm
    }
  }

  // 单选框发生变化
  const redioChange = value => {
    const obj = state.list.data.find(v => v.formMessageId === state.list.radio)
    formJson.value = (obj && JSON.parse(obj.formInfo)) || ''
    vformObj.value = obj
  }

  // 获取表单列表
  const getFromList = async () => {
    try {
      const params = new FetchFormListInfo()
      params.applyTypeId = form.applyTypeId
      const res = await FormManageService.formPage(new FetchFormListInfo())
      state.list.data = res.data.records || []
      flagStatus.value = true
    } catch (error) {}
  }

  // 获取文件类型列表
  const setFileTypeList = async () => {
    try {
      const res = await fileManageService.getFileTypeList({
        formMessageId: '',
        relationRule: ''
      })
      fileTypeList.value = res.data || []
    } catch (error) {}
  }

  watch(
    () => form.applyTypeId,
    val => {
      if (!val) return (flagStatus.value = false)
      if (form.applyTypeId === '2') {
        setFileTypeList()
      } else {
        getFromList()
      }
    }
  )
  watch(
    () => form.fileType,
    val => {
      getFromList()
      flagStatus.value = true
    }
  )
  const ruleFormRef = ref(null)
  const saveAddModel = () => {
    ruleFormRef.value.validate(validate => {
      if (validate && state.list.radio) {
        const random = Math.random()
        ModelApi.add({ modelKey: random, formIdList: [state.list.radio] }).then(
          () => {
            ModelApi.getModelKey({
              modelKey: random
            }).then(res => {
              emits('update:getModelValue', {
                modelId: res.modelId,
                definitionId: res.definitionId
              })
            })
          }
        )
      }
    })
  }
  // 提供方法
  defineExpose({
    getInfoValue
  })
</script>
<style lang="scss" scoped>
  .flowManage-Association-form {
    margin: 0%;
    width: 90%;
    height: calc(95% - 1rem);
    margin-top: 1rem;
    background-color: var(--jy-color-fill--5);
    position: relative;
    color: var(--jy-color-text-1);

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
      width: 60%;
      margin: 0% auto;
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
      margin-top: 1rem;
      padding: 0% 10%;
      box-sizing: border-box;
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
          width: 16pxl;
        }
      }
    }

    .info-list {
      margin-top: 16px;
      height: 400px;
      overflow-y: auto;
      .info-list-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        text-align: left;
        padding: 8px 14px;
        box-sizing: border-box;
        background: var(--jy-color-fill--2);
        border-radius: var(--jy-border-radius-2);
        box-sizing: border-box;
        margin: 0.5rem 0rem;
        cursor: pointer;

        .info-list-box-redio {
          // width: 1rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .info-list-box-but {
          display: flex;

          .look-detail {
            margin-left: 8px;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.6);
          }
        }
        .info-list-box-text {
          width: calc(100% - 5rem);
        }

        .info-list-box-sub {
          width: 4rem;
        }
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
</style>
