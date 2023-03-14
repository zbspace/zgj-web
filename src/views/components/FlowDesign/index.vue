<template>
  <div class="contanier-flow">
    <FlowHeader
      :update="isUpdate"
      @back="back"
      @refresh="getDesign"
      @save="designSave"
      @upgrade="designUpgrade"
    />
    <FlowDesign ref="flowDesign" top="100" v-bind="props.defaultAttribute" />
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import FlowDesign from '@/components/FlowDesign/index.vue'
  import FlowHeader from '@/components/FlowDesign/manage/FlowHeader.vue'
  import { ModelApi } from '@/api/flow/ModelApi'
  import { useRouter } from 'vue-router'
  const router = useRouter()
  // 子组件
  const flowDesign = ref(null)
  const emit = defineEmits(['onMountedCallBack'])
  const props = defineProps({
    // 处理类型
    type: {
      type: String,
      default: '0'
    },
    // 默认属性
    defaultAttribute: {
      type: Object,
      default: () => {
        return {}
      }
    }
  })
  // 触发保存
  const handleSave = () => {
    return flowDesign.value.handleSave()
  }
  // 设置默认数据
  const handleSetData = json => {
    return flowDesign.value.handleSetData(json)
  }
  // 获取 模板json
  const getValue = () => {
    // console.log('--->', 456)
    return flowDesign.value.getValue()
  }
  // 加载完成后回调
  const onMountedCallBack = () => {
    emit('onMountedCallBack')
  }
  onMounted(() => {
    // 加载完成后回调
    onMountedCallBack()
    flowDesign.value.handleSetData({
      nodeId: '7041330559301193728',
      nodeName: '发起人',
      nodeType: 0,
      nodeStatus: -1,
      privileges: [],
      childNode: null,
      addable: true,
      deletable: false,
      update: false,
      error: false,
      content: null,
      buttons: [
        {
          buttonName: '保存',
          checked: true,
          disabled: false,
          content: '发起节点保存操作，审批节点下无保存操作，可在草稿箱查看',
          buttonCode: 'save',
          color: 'default'
        },
        {
          buttonName: '提交',
          checked: true,
          disabled: false,
          content: '发起节点填写完申请单，,提交流程到下一步，可在我发起的查看',
          buttonCode: 'submit',
          color: 'primary'
        },
        {
          buttonName: '同意',
          checked: false,
          disabled: true,
          content: '审批节点同意该审核之操作，审批通过，可在我已办查看',
          buttonCode: 'agree',
          color: 'success'
        },
        {
          buttonName: '拒绝',
          checked: false,
          disabled: true,
          content:
            '节点负责人可以拒绝该流程（拒绝后流程直接结束，标记为已拒绝）',
          buttonCode: 'reject',
          color: 'error'
        },
        {
          buttonName: '转交',
          checked: false,
          disabled: true,
          content: '转交给他人办理，依然在当前节点',
          buttonCode: 'turn',
          color: 'cyan'
        },
        {
          buttonName: '退回',
          checked: false,
          disabled: true,
          content: '退回给申请人，申请人修改完成后，流程按节点开始走',
          buttonCode: 'back',
          color: 'default'
        },
        {
          buttonName: '撤回',
          checked: false,
          disabled: true,
          content:
            '允许申请人对未进入流程（第一个流程节点为待处理状态）的申请进行撤回',
          buttonCode: 'revoke',
          color: 'default'
        },
        {
          buttonName: '加签',
          checked: false,
          disabled: true,
          content: '这个事情我不能完全做主，需要某些人先处理，再右我处理',
          buttonCode: 'addSign',
          color: 'warning'
        }
      ]
    })
  })
  // Loading
  const loading = ref(false)
  // 最近定义ID
  const definitionId = ref(null)
  // isUpdate
  const isUpdate = ref(false)
  // 模型id
  const modelId = ref(null)
  /**
   * 流程设计升级版本
   */
  const designUpgrade = () => {
    loading.value = true
    const node = flowDesign.value.handleSave()

    if (node && modelId.value) {
      const params = {
        modelId: modelId.value,
        definitionId: definitionId.value,
        node
      }
      if (isUpdate.value) {
        // 修改
        ModelApi.updateDesignUpgrade(params).then(() => {
          loading.value = false
          back()
        })
      }
    } else {
      loading.value = false
    }
  }

  /**
   * 流程设计保存
   */
  const designSave = () => {
    loading.value = true
    const node = flowDesign.value.handleSave()

    if (node && modelId.value) {
      const params = {
        modelId: modelId.value,
        definitionId: definitionId.value,
        node
      }
      if (isUpdate.value) {
        // 修改
        loading.value = false
      } else {
        // 新增
        ModelApi.saveDesign(params).then(() => {
          loading.value = false

          back()
        })
      }
    } else {
      loading.value = false
    }
  }
  const back = () => {
    router.go(-1)
  }
  defineExpose({
    handleSave,
    handleSetData,
    getValue
  })
</script>

<style scoped lang="scss">
  .contanier-flow {
    width: 100%;
    height: 100%;
    .flow-designer .flow-designer-wrap {
      background-color: rgba($color: #000000, $alpha: 0);
    }
  }
</style>
