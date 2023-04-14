<template>
  <div>
    <VFormRender
      v-if="props.mode === 'render'"
      :form-json="formJson"
      :form-data="formData"
      :option-data="optionData"
      ref="vFormRef"
      @formChange="formChange"
      @appendButtonClick="appendButtonClick"
      @buttonClick="buttonClick"
      :fileTypeList="fileTypeList"
      :prefabricationFieldList="props.prefabricationFieldList"
    />

    <VFormDesigner
      ref="vFormRef"
      v-else
      :bannedWidgets="bannedWidgets"
      :designer-config="designerConfig"
      :hideModuleList="hideModuleList"
      :prefabricationFieldList="props.prefabricationFieldList"
      :templateList="templateList"
      :fileTypeList="fileTypeList"
      :userType="userType"
      :key="key"
    />
  </div>
</template>

<script setup>
  import { ref, onMounted, computed, nextTick } from 'vue'
  import VFormRender from '@/lib/vform/components/form-render'
  import VFormDesigner from '@/lib/vform/components/form-designer'
  import { designerConfig } from './designerConfig'
  import { useVformInfoStore } from '@/store/vform'
  import { ElMessage } from 'element-plus'
  import formManageService from '@/api/system/formManagement'
  import {
    containers,
    advancedFields,
    basicFields,
    customFields
  } from '@/lib/vform/components/form-designer/widget-panel/widgetsConfig.js'

  const vformInfoStore = useVformInfoStore()
  const vFormRef = ref(null)
  const bannedWidgets = ref([]) // 设计器需要显示指定的组件
  const templateList = ref([])
  const key = ref(0)

  const props = defineProps({
    // 模式： 默认为设计模式  render渲染
    mode: {
      type: String,
      default: ''
    },

    // 配置设计器初始化界面显示设置
    designerConfig: {
      type: Object,
      default: () => designerConfig
    },

    // 表单对象JSON，异步获取的额数据使用setFormJson()赋值
    formJson: {
      type: Object,
      default: () => {}
    },

    // 表单数据对象 用于表单初始化时给表单传递回显数据
    formData: {
      type: Object,
      default: () => {}
    },

    // 表单radio、checkbox、select、cascader组件的选择项集合
    optionData: {
      type: Object,
      default: () => {}
    },

    // 隐藏自定义组件
    hideModuleList: {
      type: Array,
      default: () => []
    },

    // 指定 禁止删除、禁止修改唯一值 组件
    prefabricationFieldList: {
      type: Array,
      default: () => []
    },

    // 用户类型 root能看见所有功能
    userType: {
      type: String,
      default: ''
    }
  })

  const emit = defineEmits([
    'formChange',
    'appendButtonClick',
    'buttonClick',
    'on-loaded' // vform加载完成
  ])

  // 文件类型
  const fileTypeList = computed(() => {
    return vformInfoStore.fileTypeList || []
  })

  // ---------------------------------VFormDesigner api 通过组件实例调用---------------------------
  // 清空设计器画布
  const clearDesigner = () => {
    vFormRef.value.clearDesigner()
  }
  // 打开--预览表单--弹窗
  const previewForm = () => {
    vFormRef.value.previewForm()
  }
  // 打开--导入表单JSON--弹窗
  const importJson = json => {
    vFormRef.value.importJson(json)
  }
  // 打开--导出表单JSON--弹窗
  const exportJson = () => {
    vFormRef.value.exportJson()
  }
  // 获取表单JSON中的所有字段，返回对象数组
  const getFieldWidgets = () => {
    return vFormRef.value.getFieldWidgets()
  }

  // 构建并返回表单数据结构对象
  const buildFormDataSchema = () => {
    return vFormRef.value.buildFormDataSchema()
  }

  // ---------------------------------VFormRender api 通过组件实例调用---------------------------
  // 修改界面显示语言
  const changeLanguage = () => {
    vFormRef.value.changeLanguage()
  }

  // 表单数据是否验证通过 返回true/false
  const validateForm = async () => {
    let res = false
    await vFormRef.value.validateForm(valid => {
      res = valid
    })
    return res
  }
  // 获取表单数据对象
  const getFormData = async (needValidation = true) => {
    try {
      return vFormRef.value.getFormData(needValidation)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  /**
   * 获取表单单个字段值
   * @param {*} fieldName 字段名称
   */
  const getFieldValue = async fieldName => {
    try {
      return vFormRef.value.getFieldValue(fieldName)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  // 设置表单数据对象
  const setFormData = data => {
    vFormRef.value.setFormData(data)
  }
  // 设置表单单个字段值
  const setFieldValue = (key, value) => {
    vFormRef.value.setFieldValue(key, value)
  }
  // 重置表单数据，并清除校验状态
  const resetForm = () => {
    vFormRef.value.resetForm()
  }
  // 设置表单为只读查看状态
  const setReadMode = () => {
    vFormRef.value.setReadMode()
  }
  // 显示弹出窗口
  const showDialog = () => {
    vFormRef.value.showDialog()
  }
  // 禁用编辑
  const disableForm = () => {
    vFormRef.value.disableForm()
  }

  // ---------------------------------VFormRender+VFormDesigner api 通过组件实例调用-----------
  // 获取设计器组件实例
  const getWidgetRef = () => {
    return vFormRef.value.getWidgetRef()
  }

  // 动态加载表单JSON对象
  const setFormJson = json => {
    vFormRef.value.setFormJson(json)
  }

  // ---------------------------------VFormRender 原生事件 通过组件实例调用-----------------------
  // button组件被点击时触发 如果button组件的交互事件onClick属性不为空，则不会触发buttonClick原生事件，两者不会同时生效
  const buttonClick = buttonWidget => {
    emit('buttonClick', buttonWidget)
  }

  // input组件的附加按钮被点击时触发
  const appendButtonClick = widget => {
    emit('appendButtonClick', widget)
  }

  // 表单数据改变后触发
  // eslint-disable-next-line prettier/prettier
  const formChange = ( fieldName, newValue, oldValue, formModel, subFormName, subFormRowIndex ) => {
    // eslint-disable-next-line prettier/prettier
    emit('formChange', { fieldName, newValue, oldValue, formModel, subFormName, subFormRowIndex})
  }

  /**
   * 获取json数据
   */
  const getFormJson = () => {
    return vFormRef.value.getFormJson() || ''
  }

  // ---------------------------------business designer必须主动调用---------------------------------------------
  // 根据业务类型初始化设计器界面、模板、必须字段
  const initDesigner = applyTypeId => {
    setFormColumnBasic(applyTypeId)
    setFormTemplate(applyTypeId)
  }

  /**
   * 设置动态表单基础字段&业务字段
   * @param {*} applyTypeId 业务类型
   */
  const setFormColumnBasic = async applyTypeId => {
    try {
      const res = await formManageService.formColumnBasic({ applyTypeId })
      const arr = [
        ...containers,
        ...basicFields,
        ...advancedFields,
        ...customFields
      ]
        .map(v => v.type)
        .filter(v => ![...res.data.columSys, ...res.data.columBiz].includes(v))
      bannedWidgets.value = arr
      key.value++ // 跟新组件
    } catch (error) {
      ElMessage.error(error)
    }
  }

  /**
   * 查询设置动态表单模板
   * @param {*} applyTypeId 业务类型
   */
  const setFormTemplate = async applyTypeId => {
    try {
      const res = await formManageService.getFormTemplate({ applyTypeId })
      templateList.value = res.data.map(v => JSON.parse(v.formTemplateInfo))
      const widgetList = vFormRef.value.getFieldWidgets()
      // 如果是设计器，且内容为空，需要加载指定模板
      nextTick(() => {
        if (!props.mode && !widgetList.length) {
          vFormRef.value.setFormJson(templateList.value[0].jsonUrl)
        }
      })
    } catch (error) {
      ElMessage.error(error)
    }
  }
  // ---------------------------------business end-----------------------------------------

  onMounted(() => {
    console.log('--->', 'vform加载完成')
    emit('on-loaded')
    console.log('--->', vFormRef.value.getFieldWidgets())
  })

  defineExpose({
    getFormJson,
    clearDesigner,
    previewForm,
    getFieldWidgets,
    exportJson,
    importJson,
    getWidgetRef,
    buildFormDataSchema,
    changeLanguage,
    setFormJson,
    validateForm,
    getFormData,
    setFormData,
    setFieldValue,
    resetForm,
    setReadMode,
    showDialog,
    setFormColumnBasic,
    setFormTemplate,
    initDesigner,
    disableForm,
    getFieldValue
  })
</script>

<script>
  export default {
    name: 'JyVform'
  }
</script>

<style lang="scss">
  .drag-dialog {
    .el-dialog__header {
      display: block !important;
    }
    .el-dialog__body {
      padding: 25px !important;
    }
  }
</style>
