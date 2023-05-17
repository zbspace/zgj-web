<!--
* @Descripttion 列表详情 抽屉入口
* @FileName index.vue
* @Author walterXsk
* @module 
* @LastEditTime 2023-04-10 10:12:12
!-->
<template>
  <JyDrawer
    v-model="isVisible"
    direction="rtl"
    @close="clickClose"
    title="详情"
    class="detail-drawer"
    size="800px"
  >
    <!-- tabs -->
    <VTabs
      :active="active"
      :label="state.TABS"
      @update:active="active = $event"
      :border="true"
    ></VTabs>

    <!-- 缓存 -->
    <div v-if="state.updateActive">
      <div v-for="(item, index) in state.componentList" :key="index">
        <component
          :is="map[item.copName]"
          :requestObj="requestObj"
          :importParams="importParams"
          :style="{ display: item.value === active ? 'block' : 'none' }"
        ></component>
      </div>
    </div>
  </JyDrawer>
</template>

<script setup>
  /**
   * props
   *  1、modelValue boolean 打开、关闭
   *  2、tabsLabl tabs
   *  3、modulesName 模块名称
   *  4、detailParams tabs对应的参数
   *  5、importParams 从表格传递参数
   */
  import { ref, computed, watch, reactive } from 'vue'
  import VTabs from '@/components/common/JyTabs.vue'
  import BaseInfo from './components/BaseInfo.vue'
  import FlowDetail from './components/FlowDetail.vue'
  import RecordTable from './components/RecordTable.vue'
  import VersionTable from './components/VersionTable.vue'
  import CONSTANTDATA from './constantData'
  // import API from './api/index'

  const map = {
    BaseInfo,
    FlowDetail,
    VersionTable,
    RecordTable
  }

  const props = defineProps({
    modelValue: {
      type: Boolean,
      defult: false
    },
    modulesName: {
      type: String,
      default: ''
    },
    detailParams: {
      type: Array,
      default: () => {
        return []
      }
    },
    importParams: {
      type: Object,
      default: () => {
        return {}
      }
    }
  })

  const requestObj = ref({
    urlName: '',
    params: '',
    modulesName: ''
  })

  // 获取模块信息
  const index = CONSTANTDATA.findIndex(item => item[props.modulesName])
  const params = CONSTANTDATA[index][props.modulesName]

  const state = reactive({
    ...params,
    componentList: [],
    componentName: '',
    updateActive: false
  })
  const emit = defineEmits(['update:modelValue'])

  const active = ref(state.TABS.length > 0 && state.TABS[0].value)

  const isVisible = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      emit('update:modelValue', value)
    }
  })

  const indx = ref(0)
  // 切换 tab下 组件
  const handleComponent = () => {
    indx.value = state.TABS.findIndex(item => item.value === active.value)
    const res = state.TABS[indx.value]
    if (res.value === active.value) {
      if (state.componentList.length === 0 || !isReload()) {
        state.componentList = handleRepeat(res)
      }
      state.updateActive = true
    }
  }

  // 打开状态 是否已 加载
  const isReload = () => {
    if (state.componentList.length === 0) return false
    const i = state.componentList.findIndex(item => item.value === active.value)
    if (i === -1) {
      return false
    } else {
      return true
    }
  }

  // 组件去重
  const handleRepeat = attr => {
    const arr = state.componentList
    if (!attr || !Array.isArray(attr.children)) return []
    if (state.componentList.length === 0) {
      attr.children.forEach(copName => {
        arr.push({
          value: attr.value,
          copName
        })
      })
    } else {
      // 是否重复
      attr.children.forEach(copName => {
        const i = arr.findIndex(val => val.copName === copName)
        if (i === -1) {
          arr.push({
            value: attr.value,
            copName
          })
        }
      })
    }
    return arr
  }

  // 获取不同tab的参数
  const handleParams = () => {
    const { urlName, value } = state.URLS.find(
      item => item.value === active.value
    )
    const res = props.detailParams.find(item => item.value === active.value)
    requestObj.value = {
      value,
      urlName,
      params: res.params,
      modulesName: props.modulesName,
      info: state.INFO,
      tableHeaders: state.TABLEHEADERS
    }
  }

  watch(
    () => props.modelValue,
    val => {
      if (val) {
        active.value = state.TABS.length > 0 && state.TABS[0].value
        handleParams()
      } else {
        state.componentList = []
        state.updateActive = false
        active.value = null
      }
    }
  )

  watch(
    () => active.value,
    () => {
      // 缓存
      if (isReload() || !active.value) {
        return
      }
      if (props.modelValue) {
        handleParams()
      }
      handleComponent()
    },
    {
      immediate: true
    }
  )
</script>
<script>
  export default { name: 'DetailDrawer' }
</script>
<style lang="scss">
  .detail-drawer {
    .el-drawer__header {
      margin-bottom: 0;
    }
  }
</style>
