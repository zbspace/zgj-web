<template>
  <div>
    <el-dialog
      v-model="isVisible"
      title="add form"
      fullscreen
      class="add-form-dialog"
      @opened="opened"
    >
      <layout
        @clickCutTabs="clickCutTabs"
        :tabsData="state.processTabs.data"
        @close="clickClose"
      >
        <template #backTitle>
          <span class="process-back-text">{{ props.addTitle }}</span>
        </template>
        <template #subTitle>
          <div class="process-save">
            <el-button
              class="process-save-but"
              type="primary"
              @click="clickSave"
            >
              保存
            </el-button>
          </div>
        </template>
        <template #content>
          <div
            class="formBase"
            v-show="state.processTabs.checkedNode.index == 1"
          >
            <div class="formBase-bg">
              <div class="form-title">请填写如下基础信息</div>
              <el-form
                ref="formRef"
                :model="formData"
                label-width="120px"
                :rules="rules"
              >
                <el-form-item prop="formName" label="表单名称">
                  <el-input v-model="formData.formName" />
                </el-form-item>

                <el-form-item label="业务类型" prop="applyTypeId">
                  <el-select
                    v-model="formData.applyTypeId"
                    style="width: 430px"
                    @change="onChange"
                  >
                    <el-option-group
                      v-for="group in optionData"
                      :key="group.applyTypeName"
                      :label="group.applyTypeName"
                    >
                      <el-option
                        v-for="item in group.options"
                        :key="item.applyTypeId"
                        :label="item.applyTypeName"
                        :value="item.applyTypeId"
                      />
                    </el-option-group>
                  </el-select>
                </el-form-item>

                <el-form-item
                  label="用印类型"
                  v-if="formData.applyTypeId === '2'"
                >
                  <el-radio-group v-model="formData.sealUseTypeId">
                    <el-radio label="1">物理用印</el-radio>
                    <el-radio label="2">电子签章</el-radio>
                  </el-radio-group>
                </el-form-item>

                <el-form-item label="表单说明">
                  <el-input
                    v-model="formData.readme"
                    type="textarea"
                    maxlength="100"
                    show-word-limit
                    placeholder="请输入"
                  />
                </el-form-item>
              </el-form>
            </div>
          </div>

          <!-- 表单设计 -->
          <JyVform
            ref="vformRef"
            v-if="state.processTabs.checkedNode.index === '2'"
            style="margin-top: 0; width: 100%"
            :prefabricationFieldList="prefabricationFieldList"
            @on-loaded="loaded"
          />
        </template>
      </layout>
    </el-dialog>
  </div>
</template>

<script setup>
  import { ref, reactive, computed, onMounted, nextTick } from 'vue'
  import { ElMessage } from 'element-plus'
  import layout from '@/views/system/businessManage/flowManage/layout'
  import formManageService from '@/api/system/formManagement'
  import { AddFormInfo } from '@/utils/domain/formManage'
  import { messageError, messageSuccess } from '@/hooks/useMessage'

  const vformRef = ref(null)
  const formData = ref(new AddFormInfo())
  const formRef = ref(null)
  const mustProps = ref([])
  const props = defineProps({
    addTitle: {
      type: String,
      default: ''
    },

    columnData: {
      type: Object,
      default: () => {}
    },

    formId: {
      type: String,
      default: ''
    },

    modelValue: {
      type: Boolean,
      default: false
    },

    optionData: {
      type: Array,
      default: () => []
    }
  })
  const emit = defineEmits(['update:modelValue', 'close'])
  const state = reactive({
    processTabs: {
      checkedNode: {},
      data: [
        {
          index: '1',
          label: '基础信息',
          checked: true
        },
        {
          index: '2',
          label: '表单设计',
          checked: false
        }
      ]
    },
    isShowFrom: false
  })

  const isVisible = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      emit('update:modelValue', value)
    }
  })

  const optionData = computed(() => {
    const arr = []
    props.optionData.forEach(v => {
      if (!v.applyTypePid) {
        arr.push({
          applyTypeName: v.applyTypeName,
          applyTypeId: v.applyTypeId,
          options: []
        })
      }
    })
    props.optionData
      .filter(v => v.applyTypePid)
      .forEach(v => {
        arr.forEach(x => {
          if (v.applyTypePid === x.applyTypeId) {
            x.options.push(v)
          }
        })
      })
    return arr
  })

  const prefabricationFieldList = ref([])

  const rules = {
    formName: [
      {
        required: true,
        message: '请输入',
        trigger: 'blur'
      }
    ],
    applyTypeId: [
      {
        required: true,
        message: '请选择',
        trigger: 'change'
      }
    ]
  }

  const onChange = () => {}

  // 点击切换选项
  const clickCutTabs = async (data, item) => {
    try {
      if (item.index === '2') {
        await formRef.value.validate()
      }
      data.forEach(element => {
        element.checked = false
      })
      item.checked = true
      // 处理选项
      disCutTabs()
    } catch (error) {
      messageError(error)
      state.processTabs.data[1].checked = false
      state.processTabs.data[0].checked = true
    }
  }

  const loaded = async () => {
    if (props.columnData.formMessageId) {
      await vformRef.value.setFormJson(props.columnData.formInfo)
    } else {
      await vformRef.value.setFormColumnBasic(formData.value.applyTypeId)
    }
    nextTick(() => {
      vformRef.value.setFormTemplate(formData.value.applyTypeId)
    })
    getFormColumnMust()
  }

  // 处理选项
  const disCutTabs = () => {
    state.processTabs.data.forEach(item => {
      if (item.checked) {
        state.processTabs.checkedNode = item
      }
    })
    if (state.processTabs.checkedNode.index === '3') {
      nextTick(() => {
        // 设置表单模板默认数据
        console.log('nextTick')
      })
    }
  }

  // 点击关闭弹框
  const clickClose = () => {
    emit('close')
  }

  // 点击保存
  const clickSave = async () => {
    if (!vformRef.value) {
      messageError('请先完善表单设计')
    }
    formData.value.formInfo = JSON.stringify(vformRef.value.getFormJson())
    const fieldWidgets = vformRef.value.getFieldWidgets()
    const arr = mustProps.value.filter(
      v => !fieldWidgets.map(v => v.name).includes(v)
    )
    if (arr.length) {
      return messageError('请勿删除必要字段，请重新加载模板进行编辑')
    }
    formData.value.formColumnInfos = vformRef.value.getFieldWidgets()
    try {
      if (props.columnData.formMessageId) {
        await formManageService.formEdit({
          ...formData.value,
          formMessageId: props.columnData.formMessageId
        })
        messageSuccess('表单修改成功')
      } else {
        await formManageService.formAdd(formData.value)
        messageSuccess('表单添加成功')
      }
      vformRef.value.setFormJson('')
      isVisible.value = false
    } catch (error) {
      messageError(error)
    }
  }

  // 查询表单必有字段
  const getFormColumnMust = async applyTypeId => {
    try {
      const res = await formManageService.getFormColumnMust({
        applyTypeId: formData.value.applyTypeId
      })
      mustProps.value = res.data || []
      prefabricationFieldList.value = res.data || []
    } catch (error) {
      ElMessage.error(error)
    }
  }

  const opened = () => {
    if (props.columnData.formName) {
      formData.value = { ...formData.value, ...props.columnData }
    }
  }

  onMounted(() => {
    disCutTabs()
  })
</script>

<style lang="scss" scoped>
  :deep(.add-form-dialog) {
    background: #f2f2f2;

    .el-dialog__header {
      display: none;
    }

    .el-dialog__body {
      padding: 0;
      height: 100%;
      overflow: auto;
    }

    .el-dialog__footer {
      border-top: 1px solid #e9ebec;
    }

    .custom-tabs-label {
      display: flex;
      align-items: center;
      color: rgba(0, 0, 0, 0.45);

      .order {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 1px solid rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 14px;
        color: rgba(0, 0, 0, 0.45);
      }
    }

    .el-tabs__item.is-active {
      .custom-tabs-label {
        color: #d0963e;
      }

      .order {
        color: #fff;
        background: #d0963e;
        border: none;
      }
    }

    .el-tabs__item:hover {
      .custom-tabs-label {
        color: #d0963e;
      }

      .order {
        color: #fff;
        background: #d0963e;
        border: none;
      }
    }
  }

  .form-header {
    width: 100%;
    height: 64px;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 100;
    background: #ffffff;
    padding: 0 24px;
    /* 投影/默认 */

    box-shadow: 0px 3px 6px -4px rgba(0, 0, 0, 0.12),
      0px 6px 16px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05);

    .backPrev {
      font-size: 22px;
      color: rgba(0, 0, 0, 0.85);
      cursor: pointer;

      .iconpark-icon {
        width: 18px;
        height: 18px;
        margin-right: 8px;
      }
    }

    .save-btn {
      background: #d0963e;
      border-radius: 2px;
      color: #ffffff;
    }
  }

  .formBase {
    width: 80%;
    height: 85%;
    background: #fff;
    margin: 72px auto 0 auto;
    min-width: 600px;

    .formBase-bg {
      width: 495px;
      margin: 0 auto;
      padding-top: 52px;
    }

    .form-title {
      color: rgba(0, 0, 0, 0.85);
      font-size: 22px;
      margin-bottom: 24px;
      text-align: center;
    }
  }
</style>
