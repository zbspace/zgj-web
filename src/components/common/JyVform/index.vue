<template>
  <div>
    <v-form-render
      v-if="props.mode === 'render'"
      :form-json="formJson"
      :form-data="formData"
      :option-data="optionData"
      ref="vFormRef"
      @formChange="formChange"
      @appendButtonClick="appendButtonClick"
      @buttonClick="buttonClick"
    />
    <v-form-designer
      ref="vFormRef"
      v-else
      :bannedWidgets="getBannedWidgets"
      :designer-config="designerConfig"
      :hideModuleList="hideModuleList"
      :prefabricationFieldList="prefabricationFieldList"
      :templateList="templateList"
    />
  </div>
</template>

<script setup>
  import { ref, onMounted, getCurrentInstance, computed } from 'vue'
  import { designerConfig } from './designerConfig'
  const vFormRef = ref(null)

  const props = defineProps({
    // 模式： 默认为设计模式  render渲染
    mode: {
      type: String,
      default: ''
    },

    // 业务类型  默认用印申请 、其他
    businessType: {
      type: String,
      default: ''
    },

    // 禁止设计器显示指定的组件
    bannedWidgets: {
      type: Array,
      default: () => {
        return [] // ['table', 'rate', 'switch'] 自定义组件的type
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
    },

    // 模板list
    templateList: {
      type: Array,
      default: () => [
        // {
        //   title: '单列表单',
        //   imgUrl:
        //     'https://ks3-cn-beijing.ksyuncs.com/vform-static/form-samples/t1.png',
        //   jsonUrl:
        //     'https://ks3-cn-beijing.ksyuncs.com/vform-static/form-samples/json1.txt',
        //   description: '表单模板详细说明...'
        // }
      ]
    }
  })

  const emit = defineEmits([
    'formChange',
    'appendButtonClick',
    'buttonClick',
    'on-loaded' // vform加载完成
  ])

  // 类型
  const getBannedWidgets = computed(() => {
    return props.bannedWidgets.length
      ? props.bannedWidgets
      : props.businessType !== '1'
      ? []
      : [
          'sealName',
          'contactUnit',
          'usesealBesides',
          'normalSealNum',
          'remoteSeal',
          'videoSeal',
          'sealFile',
          'seamingSeal',
          'limitTimeSeal',
          'limitAddressSeal',
          'uploadFile'
        ]
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
  const getFormData = async () => {
    return await vFormRef.value.getFormData()
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
    console.log('--->', 'vform加载完成')
    vFormRef.value.addEC('JyVform', getCurrentInstance())
    emit('on-loaded')
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
