<template>
  <a-row class="flow-header" :style="headerStyle" :bordered="false">
    <a-col :span="4">
      <div class="back">
        <a-button @click="back" size="medium" shape="circle">
          <template #icon><left-outlined /></template>
        </a-button>
      </div>
    </a-col>
    <a-col :span="16">
      <div v-if="title" class="title" :style="titleStyle">
        <slot name="title">
          <span>{{ title }}</span>
        </slot>
      </div>
      <a-menu
        v-if="isMenu"
        :selectedKeys="selectedKeys"
        mode="horizontal"
        :style="menuStyle"
        @select="handleSelect"
      >
        <!-- <a-menu-item key="1" @click="to('1')">① 基础信息</a-menu-item>
        <a-menu-item key="2" @click="to('2')">② 审批表单</a-menu-item>
        <a-menu-item key="3" @click="to('3')">③ 审批流程 </a-menu-item>
        <a-menu-item key="4" @click="to('4')">④ 扩展设置</a-menu-item> -->
        <!-- <a-menu-item key="2" @click="to('2')">① 审批表单</a-menu-item> -->
        <a-menu-item key="3" @click="to('3')">② 审批流程 </a-menu-item>
        <!-- <a-menu-item key="4" @click="to('4')">③ 扩展设置</a-menu-item> -->
      </a-menu>
    </a-col>
    <a-col :span="4">
      <div class="publish">
        <a-space>
          <slot name="button">
            <!-- <a-button v-if="props.update" size="mini" @click="exports">
              <i class="el-icon-view"></i>
              <span>导出</span>
            </a-button>
            <a-upload
              v-if="props.update"
              :showUploadList="false"
              name="file"
              accept=".flow"
              :multiple="false"
              :action="null"
              :transform-file="imports">
              <a-button size="mini">
                <i class="el-icon-view"></i>
                <span>导入</span>
              </a-button>
            </a-upload> -->
            <a-button v-if="props.update" size="mini" @click="refresh">
              <i class="el-icon-view"></i>
              <span>刷新</span>
            </a-button>
            <a-button
              v-if="props.update && flowStore.isUpgrade"
              size="mini"
              type="primary"
              @click="upgrade"
            >
              <i class="el-icon-s-promotion"></i>
              <span>升版</span>
            </a-button>
            <a-button
              v-if="!props.update"
              size="mini"
              type="primary"
              @click="save"
            >
              <i class="el-icon-s-promotion"></i>
              <span>{{ props.buttonName }}</span>
            </a-button>
          </slot>
        </a-space>
      </div>
    </a-col>
    <FlowConfigDrawer ref="flowConfigDrawer" />
  </a-row>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import { useFlowStore } from '../store/flow'

  // Store
  const flowStore = useFlowStore()

  const flowConfigDrawer = ref()

  // 接收属性
  const props = defineProps({
    modelValue: {
      type: Array,
      required: false,
      default: () => ['3']
    },
    isMenu: {
      type: Boolean,
      required: false,
      default: true
    },
    update: {
      type: Boolean,
      required: false,
      default: false
    },
    title: {
      type: String,
      required: false,
      default: ''
    },
    buttonName: {
      type: String,
      required: false,
      default: '保存'
    },
    height: {
      type: Number,
      required: false,
      default: 58
    }
  })

  const selectedKeys = ref(['3'])

  const headerStyle = computed(() => {
    const height = props.height + 'px'
    return {
      height,
      borderBottom: '1px solid #f4f4f4'
    }
  })

  const titleStyle = computed(() => {
    const height = Number(props.height) - 25 + 'px'
    return {
      'line-height': height,
      'font-size': '18px',
      'text-align': 'center',
      width: '100%',
      left: '0'
    }
  })

  const menuStyle = computed(() => {
    const height = props.height + 'px'
    return {
      'line-height': height,
      height: '100%',
      width: '100%',
      'z-index': 999,
      top: 0,
      display: 'flex',
      'justify-content': 'center',
      'border-width': 0
    }
  })

  const emit = defineEmits([
    'update:modelValue',
    'to',
    'refresh',
    'upgrade',
    'save',
    'back',
    'export',
    'import'
  ])

  const handleSelect = value => {
    selectedKeys.value = value.selectedKeys
    emit('update:modelValue', value.selectedKeys)
  }

  const to = path => {
    emit('to', path)
  }
  // eslint-disable-next-line no-unused-vars
  const exports = () => {
    emit('export')
  }
  // eslint-disable-next-line no-unused-vars
  const imports = file => {
    const reader = new FileReader()
    reader.readAsText(file)
    reader.onload = () => {
      if (reader.result) {
        const res = reader.result
        emit('import', res)
      }
    }
  }

  const refresh = () => {
    // 清空临时添加节点
    flowStore.tempNodes = []
    emit('refresh')
  }

  const upgrade = () => {
    emit('upgrade')
  }
  const save = () => {
    emit('save')
    // 清空临时添加节点
    flowStore.tempNodes = []
  }
  const back = () => {
    emit('back')
  }
</script>
