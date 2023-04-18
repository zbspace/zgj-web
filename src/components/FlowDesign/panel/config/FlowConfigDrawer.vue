<template>
  <a-drawer :width="drawerWidth()" title="流程配置" placement="right" :closable="true" :visible="visible" @close="onClose">
    <div class="flow-drawer-module">
      <a-tabs v-model:activeKey="tabsActiveKey">
        <!-- <a-tab-pane forceRender key="1" tab="人员设置">
          <FlowDrawerContent name="机构">
          </FlowDrawerContent>
          <FlowDrawerContent name="角色">
          </FlowDrawerContent>
          <FlowDrawerContent name="职位">
          </FlowDrawerContent>
          <FlowDrawerContent name="用户">
          </FlowDrawerContent>
        </a-tab-pane> -->
        <a-tab-pane forceRender key="2" tab="基础设置">
          <FlowDrawerContent>
            <FlowDrawerOption :datas="items" />
          </FlowDrawerContent>
        </a-tab-pane>
        <a-tab-pane forceRender key="3" tab="展示设置">
          <FlowDrawerContent name="流水号" desc="通过设置单据的流水号，快速识别分类和增量" footer="示例：陈德言的业绩上报、陆宜的请假" />
          <FlowDrawerContent name="标题设置" desc="通过设置数据的显示标题，快速识别一条数据" footer="示例：陈德言的业绩上报、陆宜的请假">
            <a-radio-group :size="size" v-model:value="exhibition.title">
              <a-radio :value="1">
                <span>默认</span>
              </a-radio>
              <a-radio :value="2">
                <span>自定义模式</span>
              </a-radio>
            </a-radio-group>
            <p v-if="exhibition.title == 2"></p>
            <TemplateGenerator v-if="exhibition.title == 2" :fieldInfoLis="fieldInfoLis" />
          </FlowDrawerContent>
          <FlowDrawerContent
            name="摘要设置"
            desc="自定义表单摘要展示信息，灵活设置提升工作效率"
            footer="默认设置（展示表单中前3个字段，必填字段优先）"
          >
            <a-radio-group :size="size" v-model:value="exhibition.summary">
              <a-radio :value="1">
                <span>默认</span>
              </a-radio>
              <a-radio :value="2">
                <span>自定义模式</span>
              </a-radio>
            </a-radio-group>
            <p v-if="exhibition.summary == 2"></p>
            <TemplateGenerator v-if="exhibition.summary == 2" :fieldInfoLis="fieldInfoLis" />
          </FlowDrawerContent>
        </a-tab-pane>
        <a-tab-pane forceRender key="4" tab="通知设置">
          <FlowDrawerContent name="通知类型">
            <FlowNoticeSelect v-model="notice.noticeType" />
          </FlowDrawerContent>
          <FlowDrawerContent name="主题">
            <a-input v-model:value="notice.noticeTitle" :size="size" :rows="4" placeholder="主题" />
          </FlowDrawerContent>
          <FlowDrawerContent name="通知内容">
            <TemplateGenerator v-model="notice.noticeContext" :fieldInfoLis="fieldInfoLis" />
            <!-- <a-textarea v-model:value="notice.noticeContext" :size="size" :rows="4" placeholder="通知内容" /> -->
          </FlowDrawerContent>
        </a-tab-pane>
        <a-tab-pane forceRender key="5" tab="打印设置">
          <FlowNoticeSelect />
        </a-tab-pane>
      </a-tabs>
    </div>
    <FlowDrawerFooter @close="onClose" @save="onSave" />
  </a-drawer>
</template>

<script setup>
import { ref, reactive } from 'vue';
import useCommon from '../../hooks/useCommon';
import { useFlowStore } from '../../store/flow';
import TemplateGenerator from '../../common/TemplateGenerator.vue';
import FlowNoticeSelect from '../../common/FlowNoticeSelect.vue';

// 公共
const { drawerWidth, visible, size } = useCommon();
// Store
const flowStore = useFlowStore();

// 展示
const exhibition = reactive({
  title: 1,
  summary: 1
});

const notice = ref({});

const fieldInfoLis = ref([]);

const items = reactive([
  {
    id: '',
    buttonName: '自动去重',
    content: '审批流程中审批人重复出现时，只需审批一次其余自动通过',
    checked: true,
    code: 'duplicateVisible',
    icon: ''
  },
   /*{
    id: '',
    buttonName: '秒批设置',
    content: '若审批人浏览单据小于3秒或通过快捷审批处理，系统会在审批记录中进行标记',
    checked: true,
    code: 'duplicateVisible',
    icon: ''
  },
  {
    id: '',
    buttonName: '快捷审批',
    content: '可在审批bot的消息卡片、移动端列表卡片上进行快捷操作，无需进入具体详情页操作',
    checked: true,
    code: 'duplicateVisible',
    icon: ''
  },
  {
            id: '',
            name: '批量审批',
            des: '可在审批bot的消息卡片、移动端列表卡片上进行快捷操作，无需进入具体详情页操作',
            checked: true,
            code: 'duplicateVisible',
            icon: '',
          }, 
  {
    id: '',
    buttonName: '允许加签',
    content: '开启后审批单可以新增临时审批人',
    checked: true,
    code: 'appendVisible',
    icon: ''
  },
  {
    id: '',
    buttonName: '允许抄送',
    content: '审批流程中审批人可以添加抄送人(传阅人)',
    checked: true,
    icon: ''
  },
  {
    id: '',
    buttonName: '允许催办',
    content: '审批流程中允许发起人催办',
    checked: true,
    icon: ''
  },
  {
    id: '',
    buttonName: '允许分享',
    content: '开启后流程中人员可以将流程分享给流程外的其他人员',
    checked: false,
    icon: ''
  },
  {
    id: '',
    buttonName: '指定审批人',
    content: '审批流程中审批人可以允许指定下一步审批人,不设置就使用默认审批人',
    checked: false,
    icon: ''
  },
  {
    id: '',
    buttonName: '审批撤销',
    content: '开启后下一步未办理的任务，可进行取回撤销重做任务',
    checked: true,
    code: 'revokeVisible',
    icon: ''
  },
  {
    id: '',
    buttonName: '审批转交',
    content: '开启后发起人可以将审批单转交指定人处理',
    checked: true,
    icon: ''
  },
  {
    id: '',
    buttonName: '代他人提交',
    content: '开启后指定人员可代他人提交审批',
    checked: false,
    icon: ''
  },
  {
    id: '',
    buttonName: '审批退回',
    content: '退回到指定环节，退回到上一步，退回到发起人',
    checked: false,
    icon: ''
  },
  {
    id: '',
    buttonName: '委托任务',
    content: '将任务委托给他人，他人办理完成后再回到委托人',
    checked: false,
    icon: ''
  },
  {
    id: '',
    buttonName: '自由流程',
    content: '根据环节选择，自由跳转到指定环节，特事特办',
    checked: false,
    icon: ''
  },
  {
    id: '',
    buttonName: '作废流程',
    content: '允许发起人快速终止流程，管理员维护终止流程',
    checked: false,
    icon: ''
  },
  {
    id: '',
    buttonName: '审批意见',
    content: '设置审批功能是否必填、评语可见范围、是否允许他们代提交',
    checked: true,
    icon: ''
  },
  {
    id: '',
    buttonName: '任务节点',
    content: '开启后处理人员可以查看任务节点过程',
    checked: true,
    icon: ''
  },
  {
    id: '',
    buttonName: '限时审批',
    content: '设置审批时间限制，自动提醒、转交、同意',
    checked: false,
    icon: ''
  },
  {
    id: '',
    buttonName: '效率诊断',
    content: '该流程数据不纳入效率统计,在效率诊断中排除该流程的审批耗时数据',
    checked: false,
    icon: ''
  },
  {
    id: '',
    buttonName: '手写签名',
    content: '开启后审批人必须手写签名方可同意审批',
    checked: false,
    icon: ''
  }*/
]);

// 显示侧边
const show = () => {
  visible.value = true;
  fieldInfoLis.value = [];
  const formColumns = flowStore.formColumns;
  for (let index = 0; index < formColumns.length; index++) {
    fieldInfoLis.value.push({
      label: formColumns[index].fieldName,
      value: formColumns[index].fieldModel
    });
  }
};

// 事件
const emit = defineEmits(['close', 'nodeUpdate']);
// 关闭侧边
const onClose = () => {
  visible.value = false;
  emit('close');
};

// 侧边保存
const onSave = () => {};

defineExpose({
  show,
  onSave
});
</script>
