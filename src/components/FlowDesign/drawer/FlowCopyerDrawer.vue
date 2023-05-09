<template>
  <a-drawer
    :width="drawerWidth()"
    :headerStyle="headerStyle"
    :drawerStyle="drawerBodyStyle"
    placement="right"
    :closable="true"
    :visible="visible"
    @close="onClose"
  >
    <template #title>
      <div class="flow-drawer-title-context">
        <img :src="ccIcon" class="anticon" />
        <span class="flow-drawer-title">
          <EditName v-model="props.node.nodeName" />
        </span>
      </div>
    </template>
    <div class="flow-drawer-module">
      <!-- 人工审批   -->
      <a-tabs v-model:activeKey="tabsActiveKey">
        <a-tab-pane forceRender key="1" tab="审批设置">
          <FlowApproverGroup
            ref="flowApproverGroup"
            :node="props.node"
            title="抄送人"
          />
        </a-tab-pane>
        <a-tab-pane forceRender key="3" tab="表单权限">
          <FlowDrawerContent name="表单权限">
            <FlowAuthForm ref="flowAuthForm" :node="props.node" />
          </FlowDrawerContent>
        </a-tab-pane>
        <!--<a-tab-pane forceRender key="4" tab="高级设置">
          <FlowCopyerSenior :node="props.node" /> 
        </a-tab-pane>-->
        <a-tab-pane forceRender key="5" tab="通知设置">
          <FlowDrawerContent name="通知类型">
            <FlowNoticeSelect v-model="props.node.notice.noticeType" />
          </FlowDrawerContent>
          <FlowDrawerContent name="主题">
            <a-input
              v-model:value="props.node.notice.noticeTitle"
              :size="size"
              :rows="4"
              placeholder="主题"
            />
          </FlowDrawerContent>
          <FlowDrawerContent name="通知内容">
            <a-textarea
              v-model:value="props.node.notice.noticeContext"
              :size="size"
              :rows="4"
              placeholder="通知内容"
            />
          </FlowDrawerContent>
        </a-tab-pane>
      </a-tabs>
      <!-- 自动审批 -->
    </div>
    <!-- {{ props.node.approverGroups }}  -->
    <FlowDrawerFooter @close="onClose" @save="onSave" />
  </a-drawer>
</template>
<script setup>
  import { ref, reactive } from 'vue'
  import useCommon from '../hooks/useCommon'
  import useIcon from '../hooks/useIcon'
  // import { useFlowStore } from '../store/flow';
  import EditName from '../common/EditName.vue'
  import FlowAuthForm from './FlowAuthForm.vue'
  import FlowCopyerSenior from './copyer/FlowCopyerSenior.vue'
  import FlowDrawerFooter from './FlowDrawerFooter.vue'
  // 图标
  const { ccIcon } = useIcon()
  // 公共
  const { drawerWidth, drawerBodyStyle, visible } = useCommon()
  // Store
  // const flowStore = useFlowStore();
  // 子组件
  const flowAuthForm = ref()
  const flowApproverGroup = ref()
  // 变量
  // tabs
  const tabsActiveKey = ref('1')
  // 数据

  // 侧边头样式
  const headerStyle = reactive({
    background: 'linear-gradient(90.04deg,#268bfb -16.37%,#33e1ae 137.34%)',
    'border-radius': '0px 0px 0 0'
  })

  // 接收属性
  const props = defineProps({
    node: {
      type: Object,
      default: function () {
        return {}
      }
    }
  })

  // 显示侧边
  const show = () => {
    visible.value = props.node.approverGroups.length > 0
  }

  // 事件
  const emit = defineEmits(['close', 'nodeUpdate'])
  // 关闭侧边
  const onClose = () => {
    visible.value = false
    emit('close')
  }

  // 关闭侧边
  const onSave = () => {
    const valid = flowApproverGroup.value.valid()
    // 更新节点显示信息
    let content = ''
    props.node.approverGroups.forEach(group => {
      if (group.approverNames.length > 0) {
        content += group.approverTypeName + ':' + group.approverNames.join(',')
      }
      if (content) {
        content += '\n'
      }
    })
    // 更新节点显示信息
    if (content && valid) {
      props.node.error = false
      props.node.content = content
      // 修改事件
      if (props.node.update) {
        emit('nodeUpdate', props.node)
      }
      onClose()
    } else {
      props.node.error = false
      props.node.content = null
      // 回到审批人设置tabs页签
      tabsActiveKey.value = '1'
    }
  }

  defineExpose({
    show,
    onSave
  })
</script>
Template
