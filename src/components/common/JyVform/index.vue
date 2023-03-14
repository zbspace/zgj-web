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
      :fileTypeList="fileTypeList"
      :businessType="businessType"
    />
    <v-form-designer
      ref="vFormRef"
      v-else
      :bannedWidgets="getBannedWidgets"
      :designer-config="designerConfig"
      :hideModuleList="hideModuleList"
      :prefabricationFieldList="prefabricationFieldList"
      :templateList="templateList"
      :fileTypeList="fileTypeList"
      :userType="userType"
    />

    <!-- 印章选择 -->
    <JySelectSeal
      v-model="sealSelectVisible"
      v-if="sealSelectVisible"
      @on-submit="submit"
    />

    <!-- 往来单位 -->
    <JyRelatedCompany
      v-model="relatedCompanyVisible"
      v-if="relatedCompanyVisible"
      @on-submit="submit"
    />

    <!-- 人员选择 -->
    <kDepartOrPersonVue
      :show="agentManVisible"
      @update:show="agentManVisible = $event"
      :searchSelected="[]"
      @update:searchSelected="submit"
      :tabsShow="tabsShow"
      apiModule="systemOrganOrPerson"
      :queryParams="queryParams"
      v-if="agentManVisible"
    />
  </div>
</template>

<script setup>
  import { ref, onMounted, getCurrentInstance, computed } from 'vue'
  import { designerConfig } from './designerConfig'
  import { useVformInfoStore } from '@/store/vform'
  import kDepartOrPersonVue from '@/views/components/modules/KDepartOrPersonDialog'
  import { ElMessage } from 'element-plus'
  import typeOfSealService from '@/api/frontDesk/sealManage/typeOfSeal'
  import yysq from './yongyinshenqing'
  import zbsq from './zhuanbanshenqing'
  import kzsq from './kezhangshenqing'
  import bgsq from './biangengshenqing'
  import czsq from './chongzhiyongyinshenqing'

  const { proxy } = getCurrentInstance()
  const vformInfoStore = useVformInfoStore()
  const vFormRef = ref(null)
  const sealSelectVisible = ref(false)
  const relatedCompanyVisible = ref(false)
  const agentManVisible = ref(false)
  const curInstance = ref(null)
  const queryParams = { roleId: 'r1' }
  const prefabricationFieldList = ref([])
  const tabsShow = ref([]) // 'organ', 'user'

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

  // 类型
  const getBannedWidgets = computed(() => {
    return props.bannedWidgets.length
      ? props.bannedWidgets
      : props.businessType === '2'
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

  // 模板list
  const templateList = computed(() => {
    let list = []
    switch (props.businessType) {
      case '2': // 用印申请
        list = [
          {
            title: '用印申请',
            imgUrl:
              'https://ks3-cn-beijing.ksyuncs.com/vform-static/form-samples/t1.png',
            jsonUrl: JSON.stringify(yysq),
            description: '用印申请'
          }
        ]
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        prefabricationFieldList.value = ['sealName']
        break
      case '3': // 转办申请
        list = [
          {
            title: '转办申请',
            imgUrl:
              'https://ks3-cn-beijing.ksyuncs.com/vform-static/form-samples/t1.png',
            jsonUrl: JSON.stringify(zbsq),
            description: '转办申请'
          }
        ]
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        prefabricationFieldList.value = ['applicantInfo']
        break
      case '4': // 重置申请
        list = [
          {
            title: '重置申请',
            imgUrl:
              'https://ks3-cn-beijing.ksyuncs.com/vform-static/form-samples/t1.png',
            jsonUrl: JSON.stringify(czsq),
            description: '转办申请'
          }
        ]
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        prefabricationFieldList.value = ['sealName']
        break
      case '7': // 变更申请
        list = [
          {
            title: '变更申请',
            imgUrl:
              'https://ks3-cn-beijing.ksyuncs.com/vform-static/form-samples/t1.png',
            jsonUrl: JSON.stringify(bgsq),
            description: '变更申请'
          }
        ]
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        prefabricationFieldList.value = ['sealName', 'applicantInfo']
        break
      default: // 6刻章申请 停用申请 启用申请
        list = [
          {
            title: '刻章申请',
            imgUrl:
              'https://ks3-cn-beijing.ksyuncs.com/vform-static/form-samples/t1.png',
            jsonUrl: JSON.stringify(kzsq),
            description: '转办申请'
          }
        ]
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        prefabricationFieldList.value = ['sealName']
        break
    }
    return list
  })

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
  const getFormData = async () => {
    try {
      return vFormRef.value.getFormData()
    } catch (error) {
      return Promise.reject(error)
    }
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

  // ---------------------------------business---------------------------------------------
  // 给全局属性vform添加 属性和方法
  const provideProperties = () => {
    // 显示印章选择
    proxy.$jyVform.showSelectSeal = instance => {
      sealSelectVisible.value = true
      curInstance.value = instance
    }
    // 显示往来单位选择
    proxy.$jyVform.showRelatedCompany = instance => {
      relatedCompanyVisible.value = true
      curInstance.value = instance
    }

    // 员工选择
    proxy.$jyVform.showAgentMan = (instance, str) => {
      tabsShow.value = []
      tabsShow.value.push(str)
      agentManVisible.value = true
      curInstance.value = instance
    }

    // 获取印章类型
    proxy.$jyVform.getSealTypes = async instance => {
      try {
        curInstance.value = instance
        const res = await typeOfSealService.list({ searchKey: '' })
        submit(
          res.data || [
            {
              sealTypeId: '1602494337040568321',
              sealTypeName: '印章类型A'
            }
          ]
        )
      } catch (error) {
        ElMessage.error(error)
      }
    }
  }

  // 通过vform中的实例调用方法 - 传值
  const submit = value => {
    sealSelectVisible.value = false
    relatedCompanyVisible.value = false
    agentManVisible.value = false
    curInstance.value.callBackFn(value)
  }
  // ---------------------------------business end-----------------------------------------

  onMounted(() => {
    console.log('--->', 'vform加载完成')
    emit('on-loaded')
    vformInfoStore.setFileTypeList()
    provideProperties()
    // 如果是设计器，需要加载指定模板
    vFormRef.value.setFormJson(templateList.value[0].jsonUrl)
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
  .drag-dialog {
    .el-dialog__header {
      display: block !important;
    }
    .el-dialog__body {
      padding: 25px !important;
    }
  }
</style>
