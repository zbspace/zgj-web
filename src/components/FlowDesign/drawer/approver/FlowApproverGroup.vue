<template>
  <!-- 审批人 -->

  <a-form ref="formRef" :model="props.node">
    <a-space direction="vertical" class="w-fill">
      <a-card
        v-for="(group, k) in props.node.approverGroups"
        :key="k"
        :headStyle="headStyle"
        class="w-fill"
      >
        <template #title>
          <span class="flow-approver-group-title">
            <span>{{ props.title }}</span>
            <delete-outlined
              v-if="props.node.approverGroups.length > 1"
              class="flow-approver-group-del"
              @click="delApproval(group)"
            />
          </span>
        </template>
        <!-- 审批人类型 -->
        <FlowDrawerContent :name="props.title" prefix="选择">
          <a-radio-group
            v-model:value="group.approverType"
            class="w-fill"
            :size="size"
            @change="changeApproverType(group)"
          >
            <a-radio
              v-for="(approval, i) in approvals"
              :key="i"
              :style="approvalRadioStyle()"
              :value="approval.value"
              :disabled="
                approval.disabled && props.node.approverGroups.length > 1
              "
            >
              <span>{{ approval.name }}</span>
              <FlowPopoverTip
                :popovers="approval.popovers"
                :href="approval.href"
                :hrefName="approval.hrefName"
              />
            </a-radio>
          </a-radio-group>
        </FlowDrawerContent>
        <!-- 上级 -->
        <FlowDrawerContent v-if="group.approverType == 1" name="指定层级">
          <a-radio-group
            :size="size"
            v-model:value="group.levelMode"
            class="w-fill"
          >
            <a-radio
              v-for="(higherLevel, i) in higherLevelModes"
              :key="i"
              :value="higherLevel.value"
              :style="radioStyle()"
            >
              <span>{{ higherLevel.name }}</span>
              <FlowPopoverTip
                :popovers="higherLevel.popovers"
                :href="higherLevel.href"
                :hrefName="higherLevel.hrefName"
              />
            </a-radio>
          </a-radio-group>
          <a-form-item
            :name="['approverGroups', k, 'approverIds']"
            :rules="[{ required: true, message: '不能为空' }]"
          >
            <FlowSelect
              v-model="group.approverIds"
              v-model:label="group.approverNames"
              :datas="group.levelMode == 1 ? higherLevels : reverseHigherLevels"
            />
          </a-form-item>
        </FlowDrawerContent>
        <!-- 部门负责人 -->
        <FlowDrawerContent v-if="group.approverType == 2" name="指定层级">
          <a-radio-group
            v-model:value="group.levelMode"
            :size="size"
            class="w-fill"
          >
            <a-radio
              v-for="(departmentHead, i) in departmentHeadModes"
              :key="i"
              :value="departmentHead.value"
              :style="radioStyle()"
            >
              <span>{{ departmentHead.name }}</span>
              <FlowPopoverTip
                :popovers="departmentHead.popovers"
                :href="departmentHead.href"
                :hrefName="departmentHead.hrefName"
              />
            </a-radio>
          </a-radio-group>
          <a-form-item
            :name="['approverGroups', k, 'approverIds']"
            :rules="[{ required: true, message: '不能为空' }]"
          >
            <FlowSelect
              v-model="group.approverIds"
              v-model:label="group.approverNames"
              :datas="
                group.levelMode == 1 ? departmentHeads : reverseDepartmentHeads
              "
            />
          </a-form-item>
        </FlowDrawerContent>
        <!-- 部门审批人 -->
        <FlowDrawerContent v-if="group.approverType == 3" name="选择部门">
          <GDept
            v-model="group.orgId"
            v-model:label="group.orgName"
            :showButton="false"
            :size="size"
            :radioModel="true"
            call-back-type="string"
          />
        </FlowDrawerContent>
        <FlowDrawerContent v-if="group.approverType == 3" name="部门审批人">
          <a-form-item
            :name="['approverGroups', k, 'approverIds']"
            :rules="[{ required: true, message: '不能为空' }]"
          >
            <FlowSelect
              v-model="group.approverIds"
              v-model:label="group.approverNames"
              valueName="code"
              labelName="name"
              :datas="flowStore.approverTypes"
            />
          </a-form-item>
        </FlowDrawerContent>
        <!-- 编码审批人 -->
        <FlowDrawerContent
          v-if="group.approverType == 4"
          name="编码对应部门审批人"
        >
          <a-form-item
            :name="['approverGroups', k, 'approverIds']"
            :rules="[{ required: true, message: '不能为空' }]"
          >
            <FlowSelect
              v-model="group.approverIds"
              v-model:label="group.approverNames"
              :datas="departmentApprovals"
            />
          </a-form-item>
        </FlowDrawerContent>
        <!-- 角色 -->
        <FlowDrawerContent v-if="group.approverType == 5" name="选择系统角色">
          <a-form-item
            :name="['approverGroups', k, 'approverIds']"
            :rules="[{ required: true, message: '不能为空' }]"
          >
            <FlowSelect
              v-model="group.approverIds"
              v-model:label="group.approverNames"
              valueName="roleId"
              labelName="roleName"
              :datas="flowStore.roles"
            />
          </a-form-item>
        </FlowDrawerContent>
        <!-- 岗位 -->
        <FlowDrawerContent v-if="group.approverType == 6" name="选择岗位">
          <a-form-item
            :name="['approverGroups', k, 'approverIds']"
            :rules="[{ required: true, message: '不能为空' }]"
          >
            <FlowSelect
              v-model="group.approverIds"
              v-model:label="group.approverNames"
              valueName="positionId"
              labelName="positionName"
              :datas="flowStore.positions"
            />
          </a-form-item>
        </FlowDrawerContent>
        <!-- 用户组 -->
        <FlowDrawerContent v-if="group.approverType == 7" name="选择用户组">
          <a-form-item
            :name="['approverGroups', k, 'approverIds']"
            :rules="[{ required: true, message: '不能为空' }]"
          >
            <FlowSelect
              v-model="group.approverIds"
              v-model:label="group.approverNames"
              :datas="userGroups"
            />
          </a-form-item>
        </FlowDrawerContent>
        <!-- 指定成员 -->
        <FlowDrawerContent
          v-if="group.approverType == 8"
          name="指定成员"
          text="(不能超过 25 人)"
        >
          <a-form-item
            :name="['approverGroups', k, 'approverIds']"
            :rules="[{ required: true, message: '不能为空' }]"
          >
            <GUser
              type="button"
              :max="25"
              v-model="group.approverIds"
              v-model:label="group.approverNames"
              :dataSource="userSource"
              showButton
              @change="changeUser"
            />
          </a-form-item>
        </FlowDrawerContent>

        <!-- 发起人自选 -->
        <FlowDrawerContent v-if="group.approverType == 9" name="选择方式">
          <a-radio-group
            :size="size"
            v-model:value="group.selectMode"
            class="w-fill"
            @change="changeSelectMode(group.selectMode)"
          >
            <a-radio :value="1">
              <span>多选</span>
            </a-radio>
            <a-radio :value="2">
              <span>单选</span>
            </a-radio>
          </a-radio-group>
        </FlowDrawerContent>
        <FlowDrawerContent v-if="group.approverType == 9" name="选择范围">
          <a-radio-group
            v-model:value="group.selectRange"
            :size="size"
            class="w-fill"
          >
            <a-radio
              v-for="(assigneeScope, i) in assigneeScopes"
              :key="i"
              :value="assigneeScope.value"
            >
              <span>{{ assigneeScope.name }}</span>
            </a-radio>
          </a-radio-group>
        </FlowDrawerContent>
        <FlowDrawerContent
          v-if="group.approverType == 9"
          name="候选成员"
          text="(不能超过 25 人, 如配置候选成员将覆盖选择范围！)"
        >
          <a-form-item :name="['approverGroups', k, 'approverIds']">
            <GUser
              type="button"
              :max="25"
              v-model="group.approverIds"
              v-model:label="group.approverNames"
              :dataSource="userSource"
              showButton
              @change="changeUser"
            />
          </a-form-item>
        </FlowDrawerContent>
        <!-- 节点审批人 -->
        <FlowDrawerContent
          v-if="group.approverType == 11"
          name="选择节点"
          text="(你可以选择前序节点名称，如果名称重复建议先修改审批节点的节点名称)"
        >
          <a-form-item
            :name="['approverGroups', k, 'approverIds']"
            :rules="[{ required: true, message: '不能为空' }]"
          >
            <FlowSelect
              v-model="group.approverIds"
              v-model:label="group.approverNames"
              :datas="approveNodes"
              valueName="id"
              labelName="name"
            />
          </a-form-item>
        </FlowDrawerContent>
        <!-- 连续多级上级审批 -->
        <FlowDrawerContent v-if="group.approverType == 12" name="审批终点">
          <a-form-item
            :name="['approverGroups', k, 'approverIds']"
            :rules="[{ required: true, message: '不能为空' }]"
          >
            <FlowSelect
              v-model="group.approverIds"
              v-model:label="group.approverNames"
              :datas="higherLevels"
            />
          </a-form-item>
        </FlowDrawerContent>
        <!-- =============表单内人员 START-->
        <FlowDrawerContent v-if="group.approverType == 13" name="人员控件">
          <a-form-item
            :name="['approverGroups', k, 'controlIds']"
            :rules="[{ required: true, message: '不能为空' }]"
          >
            <FlowSelect
              :datas="userControl"
              v-model="group.controlIds"
              v-model:label="group.controlNames"
              labelName="fieldName"
              valueName="fieldId"
            />
          </a-form-item>
        </FlowDrawerContent>
        <FlowDrawerContent v-if="group.approverType == 13" name="人员类型">
          <a-radio-group
            v-model:value="group.assigneeType"
            :size="size"
            class="w-fill"
          >
            <a-radio
              v-for="(assigneeType, i) in assigneeTypes"
              :key="i"
              :value="assigneeType.value"
            >
              <span>{{ assigneeType.name }}</span>
            </a-radio>
          </a-radio-group>
        </FlowDrawerContent>
        <!-- 人员上级 -->
        <FlowDrawerContent
          v-if="group.approverType == 13 && group.assigneeType == 2"
          name="指定层级"
        >
          <a-radio-group
            :size="size"
            v-model:value="group.levelMode"
            class="w-fill"
          >
            <a-radio
              v-for="(higherLevel, i) in higherLevelModes"
              :key="i"
              :value="higherLevel.value"
              :style="radioStyle()"
            >
              <span>{{ higherLevel.name }}</span>
              <FlowPopoverTip
                :popovers="higherLevel.popovers"
                :href="higherLevel.href"
                :hrefName="higherLevel.hrefName"
              />
            </a-radio>
          </a-radio-group>
          <a-form-item
            :name="['approverGroups', k, 'approverIds']"
            :rules="[{ required: true, message: '不能为空' }]"
          >
            <FlowSelect
              v-model="group.approverIds"
              v-model:label="group.approverNames"
              :datas="group.levelMode == 1 ? higherLevels : reverseHigherLevels"
            />
          </a-form-item>
        </FlowDrawerContent>
        <!-- 人员部门负责人-->
        <FlowDrawerContent
          v-if="group.approverType == 13 && group.assigneeType == 3"
          name="指定层级"
        >
          <a-radio-group
            v-model:value="group.levelMode"
            :size="size"
            class="w-fill"
          >
            <a-radio
              v-for="(departmentHead, i) in departmentHeadModes"
              :key="i"
              :value="departmentHead.value"
              :style="radioStyle()"
            >
              <span>{{ departmentHead.name }}</span>
              <FlowPopoverTip
                :popovers="departmentHead.popovers"
                :href="departmentHead.href"
                :hrefName="departmentHead.hrefName"
              />
            </a-radio>
          </a-radio-group>
          <a-form-item
            :name="['approverGroups', k, 'approverIds']"
            :rules="[{ required: true, message: '不能为空' }]"
          >
            <FlowSelect
              v-model="group.approverIds"
              v-model:label="group.approverNames"
              :datas="departmentHeads"
            />
          </a-form-item>
        </FlowDrawerContent>
        <!-- =============表单内人员 END-->

        <!-- =============表单内部门 START-->
        <FlowDrawerContent v-if="group.approverType == 14" name="部门控件">
          <a-form-item
            :name="['approverGroups', k, 'controlIds']"
            :rules="[{ required: true, message: '不能为空' }]"
          >
            <FlowSelect
              :datas="deptControl"
              v-model="group.controlIds"
              v-model:label="group.controlNames"
              labelName="fieldName"
              valueName="fieldId"
            />
          </a-form-item>
        </FlowDrawerContent>
        <FlowDrawerContent v-if="group.approverType == 14" name="指定层级">
          <a-radio-group
            v-model:value="group.levelMode"
            :size="size"
            class="w-fill"
          >
            <a-radio
              v-for="(departmentHead, i) in departmentHeadModes"
              :key="i"
              :value="departmentHead.value"
              :style="radioStyle()"
            >
              <span>{{ departmentHead.name }}</span>
              <FlowPopoverTip
                :popovers="departmentHead.popovers"
                :href="departmentHead.href"
                :hrefName="departmentHead.hrefName"
              />
            </a-radio>
          </a-radio-group>
          <a-form-item
            :name="['approverGroups', k, 'approverIds']"
            :rules="[{ required: true, message: '不能为空' }]"
          >
            <FlowSelect
              v-model="group.approverIds"
              v-model:label="group.approverNames"
              :datas="
                group.levelMode == 1 ? departmentHeads : reverseDepartmentHeads
              "
            />
          </a-form-item>
        </FlowDrawerContent>
        <!-- =============表单内部门 END-->

        <!-- =============部门负责人交叉审批 START-->
        <FlowDrawerContent v-if="group.approverType == 15" name="选择两个部门">
          <a-form-item
            :name="['approverGroups', k, 'approverIds']"
            :rules="[{ required: true, message: '不能为空' }]"
          >
            <GDept
              size="large"
              :max="2"
              :min="2"
              mode="multiple"
              v-model="group.approverIds"
              v-model:label="group.approverNames"
            />
          </a-form-item>
        </FlowDrawerContent>
        <!-- =============部门负责人交叉审批 END-->

        <!-- 项目角色 -->
        <FlowDrawerContent v-if="group.approverType == 16" name="选择项目角色">
          <a-form-item
            :name="['approverGroups', k, 'approverIds']"
            :rules="[{ required: true, message: '不能为空' }]"
          >
            <FlowSelect
              v-model="group.approverIds"
              v-model:label="group.approverNames"
              valueName="roleId"
              labelName="roleName"
              :datas="flowStore.roles"
            />
          </a-form-item>
        </FlowDrawerContent>

        <!-- 项目成员 -->
        <!-- <FlowDrawerContent v-if="group.approverType == 17" name="选择项目角色">
          <a-form-item :name="['approverGroups', k, 'approverIds']" :rules="[{ required: true, message: '不能为空' }]">
            <FlowSelect
              v-model="group.approverIds"
              v-model:label="group.approverNames"
              valueName="roleId"
              labelName="roleName"
              :datas="flowStore.roles"
            />
          </a-form-item>
        </FlowDrawerContent> -->

        <!-- 部门成员-->
        <FlowDrawerContent v-if="group.approverType == 18" name="选择部门">
          <a-form-item
            :name="['approverGroups', k, 'approverIds']"
            :rules="[{ required: true, message: '不能为空' }]"
          >
            <GDept
              size="large"
              :radioModel="true"
              v-model="group.approverIds"
              v-model:label="group.approverNames"
            />
          </a-form-item>
        </FlowDrawerContent>
        <!-- 项目部门角色-->
        <FlowDrawerContent v-if="group.approverType == 19" name="选择部门">
          <a-form-item
            :name="['approverGroups', k, 'orgId']"
            :rules="[{ required: true, message: '不能为空' }]"
          >
            <GDept
              v-model="group.orgId"
              v-model:label="group.orgName"
              :showButton="false"
              :size="size"
              :radioModel="true"
              call-back-type="string"
            />
          </a-form-item>
        </FlowDrawerContent>
        <FlowDrawerContent v-if="group.approverType == 19" name="选择角色">
          <a-form-item
            :name="['approverGroups', k, 'approverIds']"
            :rules="[{ required: true, message: '不能为空' }]"
          >
            <FlowSelect
              v-model="group.approverIds"
              v-model:label="group.approverNames"
              valueName="roleId"
              labelName="roleName"
              :datas="flowStore.roles"
            />
          </a-form-item>
        </FlowDrawerContent>

        <!-- 选择审批 -->
        <FlowDrawerContent
          v-if="group.approverType == 20"
          name="候选成员"
          text="(不能超过 25 人)"
        >
          <a-form-item
            :name="['approverGroups', k, 'approverIds']"
            :rules="[{ required: true, message: '不能为空' }]"
          >
            <GUser
              type="button"
              :max="25"
              v-model="group.approverIds"
              v-model:label="group.approverNames"
              :dataSource="userSource"
              showButton
              @change="changeUser"
            />
          </a-form-item>
        </FlowDrawerContent>
      </a-card>
      <AddButton
        v-if="show"
        prefix="添加"
        :title="title"
        @click="addApproval"
      />
    </a-space>
  </a-form>
  <!-- {{props.node}} -->
</template>
<script setup>
  import { ref, reactive, computed } from 'vue'
  import useCommon from '../../hooks/useCommon'
  import { useFlowStore } from '../../store/flow'
  import loadApproverData from '../../data/load-approver-data'
  import FlowSelect from '../../common/FlowSelect.vue'
  import FlowDrawerContent from '../FlowDrawerContent.vue'
  import GDept from '@/components/GDept/index.vue'
  // import GDeptApprover from '@/components/GDeptApprover/index.vue'
  import FlowPopoverTip from '../FlowPopoverTip.vue'
  // import { UserApi } from '@/api/system/user/UserApi';
  // 公共
  const { size, radioStyle, approvalRadioStyle, getId } = useCommon()
  // Store
  const flowStore = useFlowStore()
  // 表单
  const formRef = ref()
  // 数据
  const {
    approvals,
    higherLevelModes,
    higherLevels,
    reverseHigherLevels,
    departmentHeadModes,
    departmentHeads,
    reverseDepartmentHeads,
    departmentApprovals,
    userGroups,
    assigneeScopes,
    assigneeTypes
  } = loadApproverData()

  // 人员控件
  const userControl = ref([])
  // 部门控件
  const deptControl = ref([])

  // 侧边头样式
  const headStyle = reactive({
    /*  background: '#f5f6f7', */
    'min-height': '40px'
  })

  // 接收属性
  const props = defineProps({
    node: {
      type: Object,
      default: function () {
        return {}
      }
    },
    title: {
      type: String,
      default: '审批人'
    }
  })

  /**
   * 显示添加按钮
   */
  const show = computed(() => {
    return (
      props.node.approverGroups.filter(group =>
        [9, 10].includes(group.approverType)
      ).length == 0
    )
  })

  /**
   * 用户数据
   */
  const userSource = ({ page, limit, where, orders }) => {
    // return UserApi.getUserPages({
    //   ...where,
    //   ...orders,
    //   pageNo: page,
    //   pageSize: limit
    // })
  }

  /**
   * 节点审批人
   */
  const approveNodes = computed(() => {
    // 审批人节点
    const approveNodes = []
    // getApproveNodes(this.$store.state.flow.node, approveNodes);
    // 过滤自己
    return approveNodes.filter(approveNode => approveNode.id != props.node.id)
  })

  /**
   * 改变审批人类型
   */
  const changeApproverType = group => {
    debugger
    group.approverIds = []
    group.approverNames = []
    group.controlIds = []
    group.controlNames = []
    // 是否多个人
    changeMultiple(group)
    // ApproverType名称
    group.approverTypeName = approvals
      .filter(approval => approval.value == group.approverType)
      .map(approval => approval.name)[0]
    // 如果是表单内人员
    if (group.approverType == 13) {
      const columns = [...flowStore.baseColumns, ...flowStore.formColumns]
      userControl.value = columns.filter(column => column.fieldType == 'user')
    }
    // 如果是表单内人员 TODO
    if (group.approverType == 13) {
      // const columns = [...flowStore.baseColumns, ...flowStore.formColumns];
      const columns = [...flowStore.formColumns]
      userControl.value = columns.filter(column => column.fieldType == 'user')
    }
    // 如果是表单内部门
    if (group.approverType == 14) {
      // const columns = [...flowStore.baseColumns, ...flowStore.formColumns];
      const columns = [...flowStore.formColumns]
      deptControl.value = columns.filter(column => column.fieldType == 'dept')
      console.log('deptControl', deptControl)
    }

    // 如果项目成员
    if (group.approverType == 17) {
      group.approverIds.push(group.approverType)
      group.approverNames.push('所有成员')
    }
  }

  /**
   * 改变审批人类型
   */
  const changeUser = users => {
    // 是否多个人
    if (users.length > 1) {
      emit('update:multiple', true)
    }
  }

  /**
   * 改变选择方式 1:多选 2:单选
   */
  const changeSelectMode = selectMode => {
    // 是否多选
    if (selectMode == 1) {
      emit('update:multiple', true)
    } else {
      emit('update:multiple', false)
    }
  }

  /**
   * 添加审批人
   */
  const addApproval = () => {
    props.node.approverGroups.push({
      id: getId(),
      // 审批人模式
      approverType: 1,
      // 层级模式
      levelMode: 1,
      // 控件ID(人员控件、部门控件)
      controlIds: null,
      // 控件名称(人员控件、部门控件)
      controlNames: null,
      // 人员类型
      assigneeType: 1,
      // 选择方式
      selectMode: 1,
      // 选择范围
      selectRange: 1,
      // 审批人ID
      approverIds: [],
      // 审批人名称
      approverNames: []
    })

    // 是否多个人
    // changeMultiple();
  }

  /**
   * 删除审批人
   */
  const delApproval = group => {
    props.node.approverGroups.forEach((element, i) => {
      if (element.id == group.id) {
        props.node.approverGroups.splice(i, 1)
      }
    })
    // 是否多个人
    changeMultiple()
  }

  const emit = defineEmits(['update:multiple'])
  const changeMultiple = group => {
    // 是否多个人
    let multiple = false
    if (props.node.approverGroups.length > 1) {
      multiple = true
    } else if (props.node.approverGroups.length == 1) {
      group = props.node.approverGroups[0]
      multiple = approvals.filter(
        approval => approval.value == group.approverType
      )[0].multiple
      // 指定成员、发起人自选、节点审批人、表单内人员
      // TODO: 需要根据选择判断是否多个人
    } else if (group) {
      multiple = approvals.filter(
        approval => approval.value == group.approverType
      )[0].multiple
      // 指定成员、发起人自选、节点审批人、表单内人员
      // TODO: 需要根据选择判断是否多个人
    }
    emit('update:multiple', multiple)
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

  defineExpose({
    valid
  })
</script>
