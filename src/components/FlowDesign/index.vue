<template>
  <div class="flow-designer" :style="wrapStyle">
    <div id="flow-designer-wrap" class="flow-designer-wrap">
      <div class="flow-designer-container" v-drag="drag" :style="zoomStyle">
        <div class="flow-designer-box">
          <FlowStartNode :node="nodeData" />
          <FlowNode
            :node="nodeData"
            :readable="readable"
            @nodeUpdate="nodeUpdate"
          />
          <FlowEndNode :node="nodeData" :readable="readable" />
        </div>
      </div>
      <!-- <FlowZoom v-if="!readable" v-model="zoomValue" :top="top" /> -->
      <!-- <FlowStatus v-if="readable" :navable="navable" :top="top" /> -->
    </div>
    <FlowHelper
      v-if="!readable"
      @import="handleImport"
      @export="handleExport"
    />
    <!-- 节点运行状态 -->
    <!-- <FlowMinMap v-if="mapable && !isMobile()" /> -->
  </div>
</template>

<script setup>
  import { ref, reactive, computed, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { downloadFile } from '@/utils/common-util'
  import { useFlowStore } from './store/flow'
  import { validate } from './hooks/useNodeHelper'

  // 获取路由参数
  const route = useRoute()
  // flowStore
  const flowStore = useFlowStore()

  // zoom初始值
  const zoomValue = ref(100)

  // 接收属性
  const props = defineProps({
    node: {
      type: Object,
      default: null
    },
    navable: {
      type: Boolean,
      default: false
    },
    top: {
      type: [Number, String],
      default: 72
    },
    readable: {
      type: Boolean,
      default: false
    },
    mapable: {
      type: Boolean,
      default: true
    },
    // 是否需要滚动条
    scroll: {
      type: Boolean,
      default: true
    },
    // 是否需要滚动条
    scrollY: {
      type: Boolean,
      default: true
    },
    // 是否需要滚动条
    drag: {
      type: Boolean,
      default: false
    }
  })

  // 样式
  const wrapStyle = reactive({
    // 存在自定义nav时候需要减去nav高度
    height: props.navable
      ? 'calc(100vh - ' + Number(props.top) + 'px)'
      : '80vh',
    overflow: 'hidden'
    // 'overflow-y': props.scrollY ? 'auto' : 'hidden',
    // 'overflow-x': props.scroll ? 'auto' : 'hidden'
  })

  // 模型id
  const modelId = ref(null)
  // 最近定义ID
  const definitionId = ref(null)
  // 默认初始数据
  // 通知数据
  const nodeData = computed(() => flowStore.node)
  // console.log('nodeData', nodeData);

  // zoom样式
  const zoomStyle = computed(() => {
    flowStore.updateZoomValue(zoomValue.value)
    const zoom = zoomValue.value / 100
    return {
      zoom: zoomValue.value < 100 ? zoom : 0,
      transform: zoomValue.value >= 100 ? `scale(${zoom},${zoom})` : 0,
      transformOrigin: '0 0',
      paddingBottom: '30px'
      // paddingTop: '30px',
      // left: `${left}px`,
      // top: `${top}px`
    }
  })
  // 页面挂载后执行
  onMounted(async () => {
    if (!route.query.modelId) {
      // back();
    }
    if (!route.query.definitionId) {
      // back();
    }
    modelId.value = route.query.modelId
    definitionId.value = route.query.definitionId
    // 当默认初始化时
    if (!props.node) {
      // 当前模型是否为自由流程,则添加自由流程
      flowStore.initFreeFlow(modelId.value, definitionId.value)
    } else {
      // 初始化
      handleSetData(props.node)
    }
  })

  // 保存，触发save事件
  const handleSave = () => {
    // 校验
    const data = flowStore.node
    if (validate(data)) {
      return data
    }
    return null
  }

  // 导入json数据，继续编辑
  const handleSetData = json => {
    // console.log('result=======================',json)
    // flowStore.node = json
    if (json && JSON.stringify(json) !== '{}') {
      flowStore.node = json
    }
  }

  // 获取json数据
  const getValue = () => {
    return nodeData.value
  }

  /**
   * 导入流程设计
   * @param value
   */
  const handleImport = value => {
    const data = JSON.parse(value)
    if (data) {
      const columns = flowStore.$state.formColumns
      // console.log(columns)
      const modelIdOld = data.modelId
      const definitionIdOld = data.definitionId
      const node = data.node
      const nodeStr = JSON.stringify(node)
        .replaceAll(modelIdOld, modelId.value)
        .replaceAll(definitionIdOld, definitionId.value)
      const newNode = JSON.parse(nodeStr)
      filterData(newNode, columns)
      handleSetData(newNode)
    }
  }
  /**
   * 导出流程设计
   */
  const handleExport = () => {
    const node = handleSave()
    const data = {
      modelId: modelId.value,
      definitionId: definitionId.value,
      node
    }
    downloadFile('design.flow', data)
  }

  /**
   * 导入过滤里面表单配置项
   * @param jsonObj
   * @param columns
   */
  const filterData = (jsonObj, columns) => {
    if (jsonObj !== null && typeof jsonObj === 'object') {
      Object.entries(jsonObj).forEach(([key, value]) => {
        if (key === 'privileges') {
          const privileges = []
          columns.forEach(item => {
            const config = {
              // "nodePrivilegesId": "1589910861106753536",
              modelId: item.formModelId,
              definitionId: item.formDefinitionId,
              // "nodeId": "1589910861102559232",
              formId: item.formDefinitionId,
              fieldId: item.fieldId,
              name: item.fieldName,
              writable: true,
              readable: false,
              displayable: false,
              required: false,
              tenantId: null
            }
            privileges.push(config)
          })
          jsonObj[key] = privileges
        }
        // key is either an array index or object key
        filterData(value, columns)
      })
    } else {
      // jsonObj is a number or string
    }
  }

  // 事件
  const emit = defineEmits(['nodeUpdate'])

  // 节点修改
  const nodeUpdate = node => {
    emit('nodeUpdate', node)
  }

  defineExpose({
    handleSave,
    handleSetData,
    getValue
  })
</script>
