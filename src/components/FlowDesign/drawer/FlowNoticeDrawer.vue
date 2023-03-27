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
        <img :src="noticeIcon" class="anticon" />
        <span class="flow-drawer-title">
          <EditName v-model="props.node.nodeName" />
        </span>
      </div>
    </template>
    <div class="flow-drawer-module">
      <a-tabs v-model:activeKey="tabsActiveKey">
        <a-tab-pane forceRender key="1" tab="通知设置">
          <!-- 发送通知人 -->
          <FlowDrawerContent name="发送通知人">
            <FlowApproverGroup ref="flowApproverGroup" :node="props.node" title="通知人" />
          </FlowDrawerContent>
        </a-tab-pane>
        <a-tab-pane forceRender key="2" tab="选项设置">
          <!-- 通知类型-->
          <FlowDrawerContent name="通知类型">
            <FlowNoticeSelect v-model="props.node.notice.noticeType" />
          </FlowDrawerContent>
          <!-- <FlowDrawerContent v-if="noticeTypeComputed(props.node.notice.noticeType).includes(2)" name="外部邮箱账号">
            <AddButton title="添加邮箱" />
          </FlowDrawerContent>
          <FlowDrawerContent v-if="noticeTypeComputed(props.node.notice.noticeType).includes(4)" name="外部手机号">
            <AddButton title="添加手机号" />
          </FlowDrawerContent> -->
        </a-tab-pane>
        <a-tab-pane forceRender key="3" tab="内容设置">
          <!-- <FlowDrawerContent name="选择已审核模板">
            <AddButton title="创建新模板" />
            <a-select :size="size" placeholder="请选择模板" class="w-fill" />
          </FlowDrawerContent> -->
          <FlowDrawerContent name="主题">
            <a-input v-model="props.node.notice.noticeTitle" :size="size" :rows="4" placeholder="主题" />
          </FlowDrawerContent>
          <FlowDrawerContent name="通知内容">
            <a-textarea v-model="props.node.notice.noticeContext" :size="size" :rows="4" placeholder="通知内容" />
          </FlowDrawerContent>
        </a-tab-pane>
        <!-- <a-tab-pane forceRender key="4" tab="高级设置"> </a-tab-pane> -->
      </a-tabs>
    </div>
    <FlowDrawerFooter @close="onClose" @save="onSave" />
  </a-drawer>
</template>
<script setup>
import { ref, reactive } from 'vue';
import useCommon from '../hooks/useCommon';
import useIcon from '../hooks/useIcon';
import loadApproverData from '../data/load-approver-data';
import EditName from '../common/EditName.vue';
import FlowAuthForm from './FlowAuthForm.vue';
import FlowNoticeSelect from '../common/FlowNoticeSelect.vue';
import FlowCopyerSenior from './copyer/FlowCopyerSenior.vue';
import FlowDrawerFooter from './FlowDrawerFooter.vue';
// 图标
const { noticeIcon } = useIcon();
// 公共
const { size, drawerWidth, drawerBodyStyle, visible, noticeTypeComputed } = useCommon();
// 数据
const { notices } = loadApproverData();
// Store
// const flowStore = useFlowStore();
// 事件
const emit = defineEmits(['close']);
// 子组件
let flowAuthForm = ref();
let flowApproverGroup = ref();
// 变量
// tabs
let tabsActiveKey = ref('1');
// 数据

// 侧边头样式
const headerStyle = reactive({
  background: 'linear-gradient(89.96deg,#fa6f32 .05%,#fb9337 79.83%)',
  'border-radius': '0px 0px 0 0'
});

// 接收属性
const props = defineProps({
  node: {
    type: Object,
    default: function () {
      return {};
    }
  }
});

// 显示侧边
const show = () => {
  visible.value = props.node.approverGroups.length > 0;
};

// 关闭侧边
const onClose = () => {
  visible.value = false;
  emit('close');
};

// 关闭侧边
const onSave = () => {
  const valid = flowApproverGroup.value.valid();
  // 更新节点显示信息
  let content = '';
  props.node.approverGroups.forEach(group => {
    if (group.approverNames.length > 0) {
      content += group.approverNames.join(',');
    }
    if (content) {
      content += ',';
    }
  });
  // 更新节点显示信息
  if (content && valid) {
    props.node['error'] = false;
    props.node['content'] = content;
    onClose();
  } else {
    props.node['error'] = false;
    props.node['content'] = null;
    // 回到审批人设置tabs页签
    tabsActiveKey.value = '1';
  }
  /*  if (content && valid) {
    flowStore.updateNode({ currNode: props.node, field: 'content', value: content });
    flowStore.updateNode({ currNode: props.node, field: 'error', value: false });
    onClose();
  } else {
    flowStore.updateNode({ currNode: props.node, field: 'content', value: null });
    flowStore.updateNode({ currNode: props.node, field: 'error', value: false });
    // 回到审批人设置tabs页签
    tabsActiveKey.value = '1';
  } */
};

defineExpose({
  show,
  onSave
});
</script>
Template
