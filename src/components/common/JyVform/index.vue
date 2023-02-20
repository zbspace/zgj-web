<template>
  <div>
    <v-form-designer
      ref="vFormRef"
      v-if="!props.mode"
      :banned-widgets="bannedWidgets"
      :designer-config="designerConfig"
      :hideModuleList="hideModuleList"
      :prefabricationFieldList="prefabricationFieldList"
    />

    <v-form-render
      v-if="props.mode === 'render'"
      :form-json="formJson"
      :form-data="formData"
      :option-data="optionData"
      ref="vFormRef"
      @changeSelectForm="changeSelectForm"
      @formChange="formChange"
      @appendButtonClick="appendButtonClick"
      @buttonClick="buttonClick"
    />
  </div>
</template>

<script setup>
  import { ref, onMounted, getCurrentInstance } from 'vue'
  import { designerConfig } from './designerConfig'
  const vFormRef = ref(null)

  const props = defineProps({
    // 模式： 默认为设计模式  render渲染
    mode: {
      type: String,
      default: ''
    },

    // 禁止设计器显示指定的组件
    bannedWidgets: {
      type: Object,
      default: () => {
        return [] // ['table', 'rate', 'switch']
      }
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
    }
  })

  const emit = defineEmits(['formChange', 'appendButtonClick', 'buttonClick'])

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
  const getFormData = () => {
    return vFormRef.value.getFormData()
  }
  // 设置表单数据对象
  const setFormData = data => {
    vFormRef.value.setFormData(data)
  }
  // 设置表单单个字段值
  const setFieldValue = value => {
    vFormRef.value.setFieldValue(value)
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

  onMounted(() => {
    vFormRef.value.addEC('JyVform', getCurrentInstance())
    setFormJson({
      widgetList: [
        {
          key: 78019,
          type: 'input',
          alias: '',
          icon: 'text-field',
          formItemFlag: true,
          options: {
            name: 'input64992',
            label: '表单名称',
            labelAlign: '',
            type: 'text',
            defaultValue: '',
            placeholder: '请输入',
            columnWidth: '200px',
            size: '',
            labelWidth: null,
            labelHidden: false,
            readonly: false,
            disabled: false,
            hidden: false,
            clearable: true,
            showPassword: false,
            required: true,
            requiredHint: '',
            validation: '',
            validationHint: '',
            customClass: [],
            labelIconClass: null,
            labelIconPosition: 'rear',
            labelTooltip: null,
            minLength: null,
            maxLength: null,
            showWordLimit: false,
            prefixIcon: '',
            suffixIcon: '',
            appendButton: false,
            appendButtonDisabled: false,
            buttonIcon: 'custom-search',
            onCreated: '',
            onMounted: '',
            onInput: '',
            onChange: '',
            onFocus: '',
            onBlur: '',
            onValidate: '',
            onAppendButtonClick: ''
          },
          id: 'input64992'
        },
        {
          key: 81928,
          type: 'select',
          icon: 'select-field',
          formItemFlag: true,
          options: {
            name: 'select89032',
            label: '业务类型',
            labelAlign: '',
            defaultValue: 1,
            placeholder: '请选择',
            columnWidth: '200px',
            size: '',
            labelWidth: null,
            labelHidden: false,
            disabled: false,
            hidden: false,
            clearable: true,
            filterable: false,
            allowCreate: false,
            remote: false,
            automaticDropdown: false,
            multiple: false,
            multipleLimit: 0,
            dsEnabled: false,
            dsName: '',
            dataSetName: '',
            labelKey: 'label',
            valueKey: 'value',
            optionItems: [
              {
                label: '用印申请',
                value: 1
              },
              {
                label: '转办申请',
                value: 2
              },
              {
                label: '重置用印申请',
                value: 3
              },
              {
                value: 4,
                label: '刻章申请'
              },
              {
                value: 5,
                label: '停用申请'
              },
              {
                value: '6',
                label: '启用申请'
              },
              {
                value: 7,
                label: '变更申请'
              },
              {
                value: 8,
                label: '换章申请'
              },
              {
                value: 9,
                label: '销毁申请'
              }
            ],
            required: true,
            requiredHint: '',
            validation: '',
            validationHint: '',
            fieldLinkage: [
              {
                value: '1',
                linkages: [
                  {
                    fieldName: '',
                    show: false
                  }
                ]
              },
              {
                value: '2',
                linkages: [
                  {
                    fieldName: 'input64992',
                    show: false
                  }
                ]
              }
            ],
            customClass: [],
            labelIconClass: null,
            labelIconPosition: 'rear',
            labelTooltip: null,
            onCreated: '',
            onMounted: '',
            onRemoteQuery: '',
            onChange:
              "var electronicSealWidget = this.getWidgetRef('radio104093')\nif (value === 1) {\n  electronicSealWidget.setHidden(false)\n} else {\n  electronicSealWidget.setHidden(true)\n}\nconsole.log(electronicSealWidget);\nelectronicSealWidget.$emit('changeSelectForm',value)",
            onFocus: '',
            onBlur: '',
            onValidate: ''
          },
          id: 'select89032'
        },
        {
          key: 13931,
          type: 'radio',
          icon: 'radio-field',
          formItemFlag: true,
          options: {
            name: 'radio104093',
            label: '用印类型',
            labelAlign: '',
            defaultValue: 1,
            columnWidth: '200px',
            size: '',
            displayStyle: 'inline',
            buttonStyle: false,
            border: false,
            labelWidth: null,
            labelHidden: false,
            disabled: false,
            hidden: false,
            dsEnabled: false,
            dsName: '',
            dataSetName: '',
            labelKey: 'label',
            valueKey: 'value',
            optionItems: [
              {
                label: '物理用印',
                value: 1
              },
              {
                label: '电子签章',
                value: 2
              }
            ],
            fieldLinkage: [
              {
                value: '',
                linkages: [
                  {
                    fieldName: 'input64992',
                    show: true
                  }
                ]
              }
            ],
            required: true,
            requiredHint: '',
            validation: '',
            validationHint: '',
            customClass: '',
            labelIconClass: null,
            labelIconPosition: 'rear',
            labelTooltip: null,
            onCreated: '',
            onMounted: '',
            onChange: '',
            onValidate: ''
          },
          id: 'radio104093'
        },
        {
          key: 52593,
          type: 'textarea',
          icon: 'textarea-field',
          formItemFlag: true,
          options: {
            name: 'textarea82127',
            label: '表单说明',
            labelAlign: 'label-right-align',
            rows: 3,
            defaultValue: '',
            placeholder: '',
            columnWidth: '200px',
            size: '',
            labelWidth: null,
            labelHidden: false,
            readonly: false,
            disabled: false,
            hidden: false,
            required: false,
            requiredHint: '',
            validation: '',
            validationHint: '',
            customClass: '',
            labelIconClass: null,
            labelIconPosition: 'rear',
            labelTooltip: null,
            minLength: null,
            maxLength: null,
            showWordLimit: false,
            onCreated: '',
            onMounted: '',
            onInput: '',
            onChange: '',
            onFocus: '',
            onBlur: '',
            onValidate: ''
          },
          id: 'textarea82127'
        }
      ],
      formConfig: {
        modelName: 'formData',
        refName: 'vForm',
        rulesName: 'rules',
        labelWidth: 80,
        labelPosition: 'left',
        size: '',
        labelAlign: 'label-left-align',
        cssCode: '',
        customClass: [],
        functions: '',
        layoutType: 'PC',
        jsonVersion: 3,
        dataSources: [],
        onFormCreated: '',
        onFormMounted: '',
        onFormDataChange: '',
        onFormValidate: ''
      }
    })
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
    showDialog
  })
</script>

<script>
  export default {
    name: 'JyVform'
  }
</script>

<style lang="scss">
  @import 'vform-jy/dist/designer.style.css';
</style>
