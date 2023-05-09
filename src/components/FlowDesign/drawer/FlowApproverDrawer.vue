<template>
  <a-drawer
    :width="drawerWidth()"
    :headerStyle="headerStyle(node.nodeType)"
    :drawerStyle="drawerBodyStyle"
    placement="right"
    :closable="true"
    :visible="visible"
    @close="onClose"
  >
    <template #title>
      <div class="flow-drawer-title-context">
        <img
          :src="props.node.nodeType == 1 ? approverIcon : writeIcon"
          class="anticon"
        />
        <span class="flow-drawer-title">
          <EditName v-model="props.node.nodeName" />
        </span>
      </div>
    </template>
    <div class="flow-drawer-module">
      <!-- 审批类型 -->
      <FlowDrawerContent v-if="props.node.nodeType == 1" name="审批类型">
        <a-radio-group
          v-model:value="props.node.attr.approvalMethod"
          button-style="solid"
          class="w-full"
          @change="change"
        >
          <a-radio
            :value="approvalMethod.value"
            v-for="(approvalMethod, i) in approvalMethods"
            :key="i"
          >
            {{ approvalMethod.name }}
          </a-radio>
        </a-radio-group>
        <FlowDrawerItem :prefix="methodName" name="设置" top="10" />
      </FlowDrawerContent>
      <!-- 办理人设置 -->
      <FlowDrawerContent v-if="props.node.nodeType == 6" name="办理人设置">
        <a-alert
          message="当流程中某个节点不需要审批，但需要对审批单进行业务办理时，可设置办理人节点，场景如财务打款、处理盖章等"
          type="info"
        />
      </FlowDrawerContent>
      <!-- 人工审批   -->
      <a-tabs
        v-if="props.node.attr.approvalMethod == 1"
        v-model:activeKey="tabsActiveKey"
      >
        <a-tab-pane forceRender key="1" tab="审批人">
          <FlowApproverGroup
            ref="flowApproverGroup"
            v-model:multiple="multiple"
            :node="props.node"
            :title="props.node.nodeType == 1 ? '审批人' : '办理人'"
          />
          <FlowApproverNodeAttr
            :node="props.node"
            :multiple="multiple"
            style="margin-top: 16px"
          />
        </a-tab-pane>
        <a-tab-pane forceRender key="2" tab="选项设置" v-if="false">
          <FlowApproverNodeAttr :node="props.node" :multiple="multiple" />
        </a-tab-pane>
        <a-tab-pane forceRender key="3" tab="表单权限">
          <FlowDrawerContent name="表单权限">
            <FlowAuthForm :node="props.node" readable />
          </FlowDrawerContent>
        </a-tab-pane>
        <a-tab-pane forceRender key="4" tab="操作权限">
          <FlowApproverSenior :node="props.node" />
        </a-tab-pane>
        <a-tab-pane forceRender key="5" tab="通知设置">
          <FlowDrawerContent name="通知类型">
            <FlowNoticeSelect v-model="props.node.notice.noticeType" />
          </FlowDrawerContent>
          <!--<FlowDrawerContent v-if="noticeTypeComputed(props.node.notice.noticeType).includes(2)" name="外部邮箱账号">
            <AddButton title="添加邮箱" />
          </FlowDrawerContent>
          <FlowDrawerContent v-if="noticeTypeComputed(props.node.notice.noticeType).includes(4)" name="外部手机号">
            <AddButton title="添加手机号" />
          </FlowDrawerContent>
            <FlowDrawerContent name="选择已审核模板">
            <AddButton title="创建新模板" />
            <a-select :size="size" placeholder="请选择模板" class="w-fill" />
          </FlowDrawerContent> -->
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
        <a-tab-pane forceRender key="6" tab="限时设置">
          <FlowApproverTimeLimit />
        </a-tab-pane>
      </a-tabs>
      <!-- 自动审批 -->
    </div>
    <!-- {{ props.node.notice }} -->
    <FlowDrawerFooter @close="onClose" @save="onSave" />
  </a-drawer>
</template>
<script setup>
  import { ref, reactive, computed } from 'vue'
  import useCommon from '../hooks/useCommon'
  import useIcon from '../hooks/useIcon'
  // import { useFlowStore } from '../store/flow';
  import loadApproverData from '../data/load-approver-data'
  import EditName from '../common/EditName.vue'
  import FlowAuthForm from './FlowAuthForm.vue'
  import FlowApproverNodeAttr from './approver/FlowApproverNodeAttr.vue'
  import FlowApproverSenior from './approver/FlowApproverSenior.vue'
  import FlowApproverTimeLimit from './approver/FlowApproverTimeLimit.vue'
  import FlowNoticeSelect from '../common/FlowNoticeSelect.vue'
  import FlowDrawerFooter from './FlowDrawerFooter.vue'
  // 图标
  const { approverIcon, writeIcon } = useIcon()
  // 公共
  const { drawerWidth, drawerBodyStyle, visible, noticeTypeComputed } =
    useCommon()
  // 审批人是否多个
  const multiple = ref(false)
  // 子组件
  const flowApproverGroup = ref()
  // 变量
  // 审批方式
  const methodName = ref('人工审批')
  // tabs
  const tabsActiveKey = ref('1')
  // 数据
  const { approvalMethods } = loadApproverData()

  // 侧边头样式
  const headerStyle = computed(() => nodeType => {
    if (nodeType == 6) {
      return {
        background: 'linear-gradient(90.04deg,#ccd053 -16.37%,#dcf306 137.34%)',
        'border-radius': '0px 0px 0 0'
      }
    } else {
      return {
        background: 'linear-gradient(89.96deg,#fa6f32 .05%,#fb9337 79.83%)',
        'border-radius': '0px 0px 0 0'
      }
    }
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

  // 改变审批类型
  const change = e => {
    methodName.value = approvalMethods.filter(
      a => a.value == e.target.value
    )[0].name
  }

  // 事件
  const emit = defineEmits(['close', 'nodeUpdate'])
  // 关闭侧边
  const onClose = async () => {
    // try {
    //   const valid = await flowApproverGroup.value.valid()
    //   if (valid) {
    //     // 更新节点显示信息
    //     let content = ''
    //     props.node.approverGroups.forEach(group => {
    //       if (group.approverNames.length > 0) {
    //         content +=
    //           group.approverTypeName + ':' + group.approverNames.join(',')
    //       }
    //       if (content) {
    //         content += '\n'
    //       }
    //     })
    //     // 更新节点显示信息
    //     if (content && valid) {
    //       props.node.error = false
    //       props.node.content = content
    //       // 修改事件
    //       if (props.node.update) {
    //         emit('nodeUpdate', props.node)
    //       }
    //       // onClose()
    //       visible.value = false
    //       emit('close')
    //     } else {
    //       props.node.error = false
    //       props.node.content = null
    //       // 回到审批人设置tabs页签
    //       tabsActiveKey.value = '1'
    //     }
    //   }
    // } catch (e) {}
    visible.value = false
    emit('close')
  }

  // 关闭侧边
  const onSave = async () => {
    try {
      const valid = await flowApproverGroup.value.valid()
      if (valid) {
        // 更新节点显示信息
        let content = ''
        props.node.approverGroups.forEach(group => {
          if (group.approverNames.length > 0) {
            content +=
              group.approverTypeName + ':' + group.approverNames.join(',')
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
          // onClose()
          visible.value = false
          emit('close')
        } else {
          props.node.error = false
          props.node.content = null
          // 回到审批人设置tabs页签
          tabsActiveKey.value = '1'
        }
      }
    } catch (e) {}
  }

  defineExpose({
    show,
    onSave
  })
</script>
