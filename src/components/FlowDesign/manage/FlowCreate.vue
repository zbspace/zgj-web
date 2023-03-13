<template>
  <a-card class="flow-manage">
    <div class="create-panel" :style="createPanelStyle">
      <a-form ref="formRef" :layout="formLayout" :model="formState">
        <a-form-item label="图标">
          <FlowIcon :url="activeIconSrc" @click="visible = true" />
        </a-form-item>
        <a-form-item
          label="名称"
          name="modelName"
          :rules="[{ required: true, message: '请输入名称!' }]"
        >
          <a-input
            v-model:value="formState.modelName"
            :size="size"
            placeholder="请输入名称"
          />
        </a-form-item>
        <a-form-item
          label="编码"
          name="modelKey"
          :rules="[{ required: true, message: '请输入编码!' }]"
        >
          <a-input
            :disabled="formState.modelId"
            v-model:value="formState.modelKey"
            :size="size"
            placeholder="请输入编码"
          />
        </a-form-item>
        <a-form-item
          label="分组"
          name="categoryId"
          :rules="[{ required: true, message: '请选择分组!' }]"
        >
          <FlowSimpleSelect
            v-model="formState.categoryId"
            :datas="categoryDatas"
            :size="size"
            :labelName="labelName"
            :valueName="valueName"
            placeholder="请选择分组"
            @change="changeCategory"
          />
        </a-form-item>
        <a-form-item
          label="流程形式"
          name="modelModality"
          :rules="[{ required: true, message: '请选择表单!' }]"
        >
          <a-radio-group v-model:value="formState.modelModality">
            <a-radio
              v-for="(modelModalityOption, i) in modelModalityOptions"
              :key="i"
              :value="modelModalityOption.value"
              :disabled="formState.modelId"
            >
              <span>{{ modelModalityOption.name }}</span>
              <FlowPopoverTip :popovers="modelModalityOption.popovers" />
            </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          label="绑定表单"
          name="formIdList"
          :rules="[{ required: true, message: '请选择表单!' }]"
        >
          <FlowSelect
            v-model="formState.formIdList"
            :datas="formDatas"
            mode="multiple"
            :size="size"
            :disabled="formState.modelId"
            labelName="formModelName"
            valueName="formDefinitionId"
            placeholder="请选择表单"
            @change="changeBindForm"
          />
        </a-form-item>
        <a-form-item v-if="showType" label="多表单模式" name="formShowType">
          <a-radio-group
            v-model:value="formState.formShowType"
            :size="size"
            class="w-fill"
          >
            <a-radio value="1">
              <span>标签栏</span>
            </a-radio>
            <a-radio value="2">
              <span>步进式</span>
            </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          label="谁可以管理这个审批"
          name="assignees"
          :rules="[{ required: true, message: '请选择管理!' }]"
        >
          <!-- <GUser ref="guserRef" type="button" v-model="formState.assignees" v-model:label="formState.assigneeLabels" showButton /> -->
        </a-form-item>
        <a-form-item label="说明" name="remark">
          <a-textarea
            v-model:value="formState.remark"
            :size="size"
            :rows="4"
            placeholder="说明"
          />
        </a-form-item>
      </a-form>
    </div>
    <a-modal
      :visible="visible"
      width="620px"
      title="选择图标"
      @ok="iconOk"
      @cancel="iconClose"
    >
      <img
        v-for="(icon, index) in iconList"
        :key="index"
        :src="icon.url"
        class="flow-icon-item"
        :class="{ active: selectedIcon === icon.name_suffix }"
        @click="selectedIcon = icon.name_suffix"
      />
    </a-modal>
  </a-card>
</template>
<script setup>
  import { ref, reactive, computed, onMounted } from 'vue'
  import useCommon from '../hooks/useCommon'
  // import GUser from '@/components/GUser/index.vue';
  import FlowPopoverTip from '../drawer/FlowPopoverTip.vue'
  // 公共方法
  const { getflowIcon, isMobile, size, visible } = useCommon()

  const emit = defineEmits(['done'])

  // 接收属性
  const props = defineProps({
    modelSource: {
      type: [Array, Function],
      required: true
    },
    categorySource: {
      type: [Array, Function],
      required: true
    },
    userSource: {
      type: [Array, Function],
      required: true
    },
    formSource: {
      type: [Array, Function],
      required: true
    },
    valueName: {
      type: String,
      required: false,
      default: 'categoryId'
    },
    labelName: {
      type: String,
      required: false,
      default: 'categoryName'
    },
    width: {
      type: Number,
      required: false,
      default: 100
    }
  })

  // 表单
  const formRef = ref()

  const guserRef = ref()

  // 表单布局
  const formLayout = ref('vertical')
  // 多表时显示多表单显示模式
  const showType = ref(false)
  // 图标
  const iconList = ref([])
  // 图标
  const activeIcon = ref(null)
  // 图标
  const selectedIcon = ref(null)

  //  分类数据
  const categoryDatas = ref([])

  // 流程形式
  const modelModalityOptions = ref([
    {
      name: '预设流程',
      value: 1,
      popovers: [
        {
          title: '什么是预设流程？',
          content: '管理员定义好流程节点流转和审批人'
        }
      ]
    },
    {
      name: '自由流程',
      value: 2,
      popovers: [
        {
          title: '什么是自由流程？',
          content: '发起人指定审批人依次审批'
        }
      ]
    }
  ])

  //  表单数据
  const formDatas = ref([])

  // 表单数据
  const formState = reactive({
    modelId: null,
    modelIcon: null,
    modelName: null,
    modelKey: null,
    categoryId: null,
    modelModality: 1,
    formIdList: [],
    formShowType: 1,
    assignees: [],
    assigneeLabels: [],
    remark: null
  })

  /**
   * 表单面板样式
   */
  const createPanelStyle = computed(() => {
    const width = isMobile() ? +'100%' : props.width + '%'
    const padding = isMobile() ? '20px 20px' : '20px 200px'
    return {
      width,
      padding
    }
  })

  /**
   * 表单面板样式
   */
  const activeIconSrc = computed(() => {
    const icon = iconList.value.find(t => t.name_suffix == activeIcon.value)
    return icon ? icon.url : ''
  })

  onMounted(() => {
    reloadIcon()
    categoryReload()
    formReload()
    // reload();
  })

  const reloadIcon = () => {
    iconList.value = getflowIcon()
    activeIcon.value = iconList.value[0].name_suffix
    selectedIcon.value = iconList.value[0].name_suffix
    formState.modelIcon = iconList.value[0].name_suffix
  }

  const reload = () => {
    if (Array.isArray(props.modelSource)) {
      formState.modelId = props.modelSource.modelId
      formState.modelIcon = props.modelSource.modelIcon
      activeIcon.value = props.modelSource.modelIcon
      formState.modelName = props.modelSource.modelName
      formState.modelKey = props.modelSource.modelKey
      formState.categoryId = props.modelSource.categoryId
      formState.formIdList = props.modelSource.formIdList
      formState.assignees = props.modelSource.assignees
      formState.formShowType = props.modelSource.formShowType
      formState.remark = props.modelSource.remark
      emit('done', props.modelSource)
    } else if (typeof props.modelSource === 'function') {
      props
        .modelSource()
        .then(result => {
          formState.modelId = result.modelId
          formState.modelIcon = result.modelIcon
          activeIcon.value = result.modelIcon
          formState.modelName = result.modelName
          formState.modelKey = result.modelKey
          formState.categoryId = result.categoryId
          formState.formIdList = result.formIdList
          formState.assignees = []
          if (result.assignees && result.assignees.length > 0) {
            result.assignees.forEach(item => {
              formState.assignees.push(item)
            })
          }
          // guserRef.value.reload(result.assignees);
          formState.formShowType = result.formShowType
          formState.remark = result.remark
          emit('done', result)
        })
        .catch(e => {
          console.error(
            'modelSource \u8FD4\u56DE\u7684\u6570\u636E\u9519\u8BEF: ',
            e == null ? void 0 : e.message
          )
        })
    }
  }

  const categoryReload = () => {
    if (Array.isArray(props.modelSource)) {
      categoryDatas.value = props.categorySource
      emit('done', props.categorySource)
    } else if (typeof props.categorySource === 'function') {
      props
        .categorySource(formState)
        .then(result => {
          categoryDatas.value = result
          emit('done', result)
        })
        .catch(e => {
          console.error(
            'categorySource \u8FD4\u56DE\u7684\u6570\u636E\u9519\u8BEF: ',
            e == null ? void 0 : e.message
          )
        })
    }
  }

  const formReload = () => {
    if (Array.isArray(props.formSource)) {
      formDatas.value = props.formSource
      emit('done', props.formSource)
    } else if (typeof props.formSource === 'function') {
      props
        .formSource(formState)
        .then(result => {
          formDatas.value = result
          emit('done', result)
        })
        .catch(e => {
          console.error(
            'formSource \u8FD4\u56DE\u7684\u6570\u636E\u9519\u8BEF: ',
            e == null ? void 0 : e.message
          )
        })
    }
  }

  const iconOk = () => {
    visible.value = false
    activeIcon.value = selectedIcon.value
    formState.modelIcon = selectedIcon.value
  }
  const iconClose = () => {
    visible.value = false
  }

  /**
   * 多表时显示多表单显示模式
   * @param {*} values
   */
  const changeBindForm = values => {
    if (values.length > 1) {
      showType.value = true
    } else {
      showType.value = false
    }
  }

  /**
   * 分组改变
   * @param {*} values
   */
  const changeCategory = value => {
    formReload()
  }

  const valid = async () => {
    try {
      const values = await formRef.value.validateFields()
      console.log('Success:', values)
      return true
    } catch (errorInfo) {
      console.log('Failed:', errorInfo)
      return false
    }
  }

  /**
   * 获取表单数据
   * @param {*} values
   */
  const getForm = callback => {
    formRef.value.validateFields().then(() => {
      callback(formState)
    })
  }

  defineExpose({
    reload,
    valid,
    getForm
  })
</script>
