<template>
  <div class="flow-row">
    <div class="flow-box">
      <div
        class="flow-item"
        :class="{ 'flow-item-active': isActive }"
        @click="!props.readable && open(drawer, props.node)"
      >
        <div class="flow-node-box" :class="{ 'has-error': props.node.error }">
          <div class="node-name" :class="nameClass(props.node, 'node-tz')">
            <EditName v-model="props.node.nodeName" />
            <img :src="noticeIcon" alt="" style="margin-left: 10px" />
          </div>
          <!-- 节点内容 -->
          <FlowNodeContent :content="props.node.content" />
          <!-- 错误提示 -->
          <exclamation-circle-outlined
            v-if="props.node.error"
            class="node-error"
          />
          <div
            v-if="!props.readable && !props.node.deletable"
            class="close-icon"
          >
            <close-circle-outlined @click.stop="props.node.deletable = true" />
          </div>
          <!-- 删除提示 -->
          <DeleteConfirm :node="props.node" />
        </div>
      </div>
      <FlowAddNode
        :node="props.node"
        :nodeType="5"
        :readable="props.readable"
      />
    </div>
    <FlowNoticeDrawer
      ref="drawer"
      :node="props.node"
      @close="isActive = false"
    />
  </div>
</template>
<script setup>
  import { ref } from 'vue'
  import useCommon from '../hooks/useCommon'
  import useIcon from '../hooks/useIcon'
  import FlowAddNode from '../node/FlowAddNode.vue'
  import FlowNodeContent from '../common/FlowNodeContent.vue'
  import FlowNoticeDrawer from '../drawer/FlowNoticeDrawer.vue'
  import DeleteConfirm from '../common/DeleteConfirm.vue'

  // 公共方法
  const { isActive, nameClass, open } = useCommon()
  // 图标
  const { noticeIcon } = useIcon()

  const drawer = ref()

  // 接收属性
  const props = defineProps({
    node: {
      type: Object,
      default: function () {
        return {}
      }
    },
    readable: {
      type: Boolean,
      default: false
    }
  })
</script>
