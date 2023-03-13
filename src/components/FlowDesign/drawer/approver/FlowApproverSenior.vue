<template>
  <FlowDrawerContent name="按钮配置">
    <FlowDrawerOption :node="props.node" :datas="buttons" />
  </FlowDrawerContent>
  <a-form layout="vertical">
    <FlowDrawerContent name="退回配置" v-if="backDisabled">
      <a-form-item label="允许退回">
        <a-radio-group
          v-model:value="props.node.attr.allowBackType"
          button-style="solid"
          class="w-full"
          @change="change"
        >
          <a-radio
            :value="allowBackData.value"
            v-for="(allowBackData, i) in allowBackDatas"
            :key="i"
          >
            {{ allowBackData.name }}
          </a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="审批形式">
        <FlowMultiSelect
          v-model="props.node.attr.backApprovalType"
          :datas="backApprovalTypeDatas"
          :size="size"
          labelName="label"
          placeholder="请选择"
        />
      </a-form-item>
    </FlowDrawerContent>
  </a-form>
</template>

<script setup>
  import { computed } from 'vue'
  import useCommon from '../../hooks/useCommon'
  // import useIcon from '../../hooks/useIcon';
  // import { useFlowStore } from '../../store/flow';
  import FlowMultiSelect from '../../common/FlowMultiSelect.vue'
  import loadApproverData from '../../data/load-approver-data'
  // 公共
  const { size, radioStyle } = useCommon()
  // 图标
  // Store
  // 数据
  const { buttons, allowBackDatas, backApprovalTypeDatas } = loadApproverData()

  // 接收属性
  const props = defineProps({
    node: {
      type: Object,
      default: function () {
        return {}
      }
    }
  })

  // 退回
  const backDisabled = computed(() => {
    const backbutton = props.node.buttons.filter(
      a => a.buttonCode == 'back' && a.checked
    )
    return backbutton.length > 0
  })
</script>
