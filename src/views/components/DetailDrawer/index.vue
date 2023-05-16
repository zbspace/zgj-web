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
    <div v-if="updateActive">
      <keep-alive>
        <component
          v-for="item in state.TABS[indx].children"
          :key="item"
          :is="map[item]"
          :ref="item"
        ></component>
      </keep-alive>
    </div>
    <div v-if="!updateActive">
      <keep-alive>
        <component
          :is="map[state.componentName]"
          :ref="item"
          :requestObj="requestObj"
        />
      </keep-alive>
    </div>
  </JyDrawer>
</template>

<script setup>
  /**
   * props
   *  1、modelValue boolean 打开、关闭
   *  2、tabsLabl tabs
   *  3、modulesName 模块名称
   */
  import { ref, computed, watch, reactive } from 'vue'
  import VTabs from '@/components/common/JyTabs.vue'
  import BaseInfo from './components/BaseInfo.vue'
  import FlowDetail from './components/FlowDetail.vue'
  import VersionTable from './components/RecordTable.vue'
  import CONSTANTDATA from './constantData'
  // import API from './api/index'

  const map = {
    BaseInfo,
    FlowDetail,
    VersionTable
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
  console.log(CONSTANTDATA, 'CONSTANTDATA', params)

  const state = reactive({
    ...params,
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
    const res = state.TABS[indx.value]
    if (res.value === active.value) {
      if (res.children && res.children.length === 1) {
        state.componentName = res.children[0]
        state.updateActive = false
      } else if (res.children && res.children.length > 1) {
        state.updateActive = true
      }
    }
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
      }
    }
  )

  watch(
    () => active.value,
    () => {
      indx.value = state.TABS.findIndex(item => item.value === active.value)
      handleComponent()
      if (props.modelValue) {
        handleParams()
      }
    },
    {
      immediate: true
    }
  )
</script>
<script>
  // export default { name: 'FormManageDetail' }
</script>
<style lang="scss">
  .detail-drawer {
    .el-drawer__header {
      margin-bottom: 0;
    }
  }
</style>
