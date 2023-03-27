<template>
  <div class="flow-condition-box">
    <div v-for="(group, i) in props.node.conditionGroup" :key="i">
      <div class="flow-condition-group">
        <div class="flow-condition-item" v-for="(condition, k) in group.conditions" :key="k">
          <FlowBranchSelect
            v-model="condition.columnValue"
            :size="size"
            style="width: 40%"
            @change="handleChange($event, condition)"
          />
          <div class="flow-condition-option">
            <!-- 比较(操作)符 -->
            <FlowSimpleSelect
              v-model="condition.optType"
              v-model:label="condition.optName"
              v-model:code="condition.optCode"
              :datas="optTypes"
              labelName="label"
              style="width: 26%"
            />
            <!-- 值类型 -->
            <FlowSimpleSelect
              v-model="condition.valueType"
              :datas="valueTypes"
              labelName="label"
              style="width: 26%"
              @change="condition.conditionValue = []"
            />
            <!-- 值 -->
            <div class="flow-condition-value">
              <!-- 动态值 -->
              <FlowSelect
                v-if="condition.valueType == 2"
                v-model="condition.conditionValue"
                v-model:label="condition.conditionValueName"
                :datas="dynamicValueTypes"
                labelName="label"
              />
              <!-- 流程值 -->
              <FlowSelect
                v-else-if="condition.valueType == 3"
                v-model="condition.conditionValue"
                v-model:label="condition.conditionValueName"
                :datas="flowValueTypes"
                labelName="label"
              />
              <!-- 数据源 -->
              <!-- <FlowSelect
                v-else-if="condition.valueType == 4"
                v-model="condition.conditionValue"
                v-model:label="condition.conditionValueName"
                :datas="columns"
                labelName="label"
              /> -->
              <!-- 固定 -->
              <FlowComponent
                v-else
                :is="condition.columnCode"
                v-model="condition.conditionValue"
                v-model:code="condition.conditionValueName"
                :size="size"
              />
            </div>
          </div>
          <div class="flow-condition-del" @click="delCondition(1, group, condition)">
            <delete-outlined />
          </div>
        </div>
        <div class="flow-condition-add" @click="addCondition(1, group)">
          <plus-circle-outlined />
          <span style="margin-left: 5px">且条件</span>
        </div>
      </div>
      <div v-if="node.conditionGroup.length > 1 && i != node.conditionGroup.length - 1" class="flow-condition-group-connector">或</div>
    </div>
    <div class="flow-condition-add" @click="addGroup(1)">
      <plus-circle-outlined />
      <span style="margin-left: 5px">或条件</span>
    </div>
  </div>
</template>

<script setup>
// import { ref, onMounted } from 'vue';
import useCommon from '../../hooks/useCommon';
// import useIcon from '../../hooks/useIcon';
import { useFlowStore } from '../../store/flow';
import loadApproverData from '../../data/load-approver-data';
// import FlowInput from '../../common/FlowInput.vue';
import FlowSimpleSelect from '../../common/FlowSimpleSelect.vue';
import FlowComponent from '../../common/FlowComponent.vue';
import FlowBranchSelect from '../../common/FlowBranchSelect.vue';
// 图标
// const { approverIcon } = useIcon();
// 公共
const { getId, size } = useCommon();
// Store
const flowStore = useFlowStore();
// 事件
// const emit = defineEmits(['close']);
// 基础字段
// const baseColumns = ref([]);
// 表单字段
// const formColumns = ref([]);

// 数据
const { optTypes, valueTypes, dynamicValueTypes, flowValueTypes } = loadApproverData();

// 接收属性
const props = defineProps({
  node: {
    type: Object,
    default: function () {
      return {};
    }
  }
});

// 页面挂载后执行
/* onMounted(async () => {
  // 初始化基础字段
  baseColumns.value = await flowStore.getBaseColumns();
  // 初始化表单字段
  formColumns.value = await flowStore.getFormColumns();
}); */

const handleChange = (value, condition) => {
  const columns = [...flowStore.baseColumns, ...flowStore.formColumns];
  const column = columns.filter(column => column.fieldId == value).map(data => data)[0];
  condition.columnType = column.fieldFrom;
  condition.columnCode = column.fieldType;
  condition.columnId = column.fieldId;
  condition.columnName = column.fieldName;
  condition.conditionValue = [];
  condition.conditionValueName = [];
};

const addGroup = type => {
  if (type == 1) {
    props.node.conditionGroup.push({
      id: getId(),
      connect: 'OR',
      conditions: [
        {
          id: getId(),
          // 位置编码，用户后台easyrules特殊判断
          code: 'NAME',
          columnId: '姓名',
          columnName: '姓名',
          columnValue: '姓名',
          columnType: 1,
          columnCode: 'input',
          optType: 'eq',
          optCode: '==',
          optName: '等于',
          valueType: '1',
          conditionValue: [],
          conditionValueName: []
        }
      ]
    });
  }
};

const addCondition = (type, currGroup) => {
  if (type == 1) {
    props.node.conditionGroup.forEach(group => {
      if (currGroup.id == group.id) {
        group.conditions.push({
          id: getId(),
          columnId: undefined,
          columnName: undefined,
          columnValue: undefined,
          columnType: undefined,
          columnCode: undefined,
          optType: undefined,
          optCode: undefined,
          optName: undefined,
          valueType: undefined,
          conditionValue: [],
          conditionValueName: []
        });
      }
    });
  }
};

const delCondition = (type, currGroup, CurrCondition) => {
  if (type == 1) {
    props.node.conditionGroup.forEach((group, k) => {
      if (currGroup.id == group.id) {
        group.conditions.forEach((condition, index) => {
          if (CurrCondition.id == condition.id) {
            group.conditions.splice(index, 1);
            // 当前组没有条件了，当前组也需要删除
            if (group.conditions.length == 0) {
              props.node.conditionGroup.splice(k, 1);
            }
          }
        });
      }
    });
  }
};
</script>
Template
