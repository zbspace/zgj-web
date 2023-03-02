<template>
  <div>
    <el-dialog v-model="isVisible" title="add form" fullscreen class="add-form-dialog">
      <layout @clickCutTabs="clickCutTabs" :tabsData="state.processTabs.data" @close="clickClose"
        :beforeCutTabs="beforeCutTabs">
        <template #backTitle>
          <span class="process-back-text">{{ addTitle }}</span>
        </template>
        <template #subTitle>
          <div class="process-save">
            <el-button class="process-save-but" type="primary" @click="clickSave">
              保存
            </el-button>
          </div>
        </template>
        <template #content>
          <div class="formBase" v-if="state.processTabs.checkedNode.index == 1">
            <div class="formBase-bg">
              <div class="form-title">请填写如下基础信息</div>
              <JyVform ref="vFormRef" mode="render" :formJson="formJson" :formData="formData" :optionData="optionData"
                @buttonClick="clickSelect" @on-loaded="onLoaded" />
            </div>
          </div>
          <!-- 表单设计 -->
          <JyVform ref="vformRef" v-if="state.processTabs.checkedNode.index == 2" style="margin-top: 0; width: 100%" />
        </template>
      </layout>
    </el-dialog>
  </div>
</template>

<script setup>
import {
  ref,
  reactive,
  computed,
  onMounted,
  onBeforeMount,
  nextTick
} from 'vue'
import { ElMessage } from 'element-plus'
import layout from '@/views/system/businessManage/flowManage/layout.vue'
import formStepJson from '@/views/addDynamicFormJson/formStep'

const vformRef = ref(null)
const formJson = reactive(formStepJson)
const formData = reactive({})
const optionData = reactive({})
const vFormRef = ref(null)
const props = defineProps({
  addTitle: {
    type: String,
    default: ''
  },
  columnData: {
    type: Object,
    default: {}
  },
  formId: {
    type: String,
    default: ''
  },
  modelValue: {
    type: Boolean,
    default: false
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
        label: '表单设计'
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
const submitForm = type => {
  console.log(type)
  if (!type) {
    vFormRef.value.resetForm()
    return
  }
  vFormRef.value
    .getFormData()
    .then(formData => {
      console.log('formData', formData)
      // Form Validation OK
      alert(JSON.stringify(formData))
      // if (state.isShowFrom) {
      // } else {
      //   state.isShowFrom = true
      // }
    })
    .catch(error => {
      // Form Validation failed

      ElMessage.error(error)
    })
}
// 点击切换选项
const clickCutTabs = (data, item) => {
  data.forEach(element => {
    element.checked = false
  })
  item.checked = true
  console.log(data)
  // 处理选项
  disCutTabs()
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
const clickSave = () => {
  submitForm(true)
}
const onLoaded = () => {
  console.log('onLoaded')
  vFormRef.value.setFormJson(formJson)
}
const clickSelect = (data) => { console.log(data) }
onBeforeMount(() => {
  console.log('onBeforeMount', props.columnData)
  // console.log(`the component is now onBeforeMount.`)
  // 处理选项
  if (props.columnData.formMessageId > 0) {
    formStepJson.widgetList[1].options.disabled = true
    formStepJson.widgetList[2].options.disabled = true
    formStepJson.widgetList[0].options.defaultValue = props.columnData.formName
    // formStepJson.widgetList[1].options.defaultValue = 2
    try {
      formStepJson.widgetList[1].options.optionItems.forEach((v) => {
        if (v.label == props.columnData.applyTypeName) {
          formStepJson.widgetList[1].options.defaultValue = v.value;
        }
      });
    } catch (error) {

    }
    try {
      formStepJson.widgetList[2].options.optionItems.forEach((v) => {
        if (v.label == props.columnData.sealUseTypeName) {
          formStepJson.widgetList[2].options.defaultValue = v.value;
        }
      });
    } catch (error) {

    }
  } else {
    formStepJson.widgetList[1].options.disabled = false
    formStepJson.widgetList[2].options.disabled = false
    formStepJson.widgetList[1].options.defaultValue = 1
    formStepJson.widgetList[2].options.defaultValue = 1
    formStepJson.widgetList[0].options.defaultValue = ''
  }
  disCutTabs()
})
onMounted(() => {
  console.log('onMounted', props.columnData)
  console.log(`the component is now mounted.`)
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
