<template>
  <div class="components-tree">
    <el-tree
      ref="tree"
      v-bind="props.defaultAttribute"
      :refs="refs"
      :data="props.data"
      :props="props.defaultProps"
      :load="loadFn"
      @node-click="nodeClick"
      @check-change="checkChange"
      @check="check"
      @current-change="currentChange"
      :current-node-key="props.modelValue"
    >
      <template #default="{ node, data }">
        <span class="custom-tree-node" @click="clickTreeNode(node, data)">
          <img
            class="custom-tree-node-icon"
            src="../../assets/svg/tree-wenjian.svg"
            alt=""
            v-if="!data.children || data.children.length === 0"
          />
          <span>{{ data[props.defaultProps.label] }}</span>
        </span>
      </template>
    </el-tree>
  </div>
</template>
<script setup>
  import { ref, onBeforeMount, onMounted } from 'vue'
  const tree = ref(null)
  const props = defineProps({
    // 标识
    refs: {
      type: String,
      default: ''
    },
    loadFn: {
      type: Function
    },
    // 处理类型
    type: {
      type: String,
      default: '0'
    },
    // 表单数据
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    //
    defaultProps: {
      type: Object,
      default: () => {
        return {
          children: 'children',
          label: 'label'
        }
      }
    },
    // 默认属性
    defaultAttribute: {
      type: Object,
      default: () => {
        return {}
      }
    },
    modelValue: {
      type: String,
      default: ''
    }
  })
  const emit = defineEmits([
    'node-click',
    'check-change',
    'check',
    'current-change',
    'load'
  ])
  defineExpose({
    setCurrentKey
  })
  function setCurrentKey(id) {
    tree.value.setCurrentKey(id)
  }
  //   const state = reactive({})
  //	当节点被点击的时候触发   	四个参数：对应于节点点击的节点对象，TreeNode 的 node 属性, TreeNode和事件对象
  function nodeClick(NodeObjects, node, TreeNode, event) {
    emit('node-click', NodeObjects, node, TreeNode, event)
  }
  // 当表单输入的时候返回所有表单的值  	共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点本身是否被选中、节点的子树中是否有被选中的节点
  function checkChange(NodeObjects, isCheck, isChildrenCheck) {
    emit('check-change', NodeObjects, isCheck, isChildrenCheck)
  }
  // 点击节点复选框之后触发  共两个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、树目前的选中状态对象，包含 checkedNodes、checkedKeys、halfCheckedNodes、halfCheckedKeys 四个属性
  function check(NodeObjects, checkedObjects) {
    emit('check', NodeObjects, checkedObjects)
  }
  // 当前选中节点变化时触发的事件  	共两个参数，依次为：当前节点的数据，当前节点的 Node 对象
  function currentChange(node, TreeNode) {
    emit('current-change', node, TreeNode)
  }

  // 点击自定义节点
  function clickTreeNode(node, data) {
    // console.log(node, data)
    // emit('node-click', data)
  }

  // function load(node, resolve) {
  //   console.log(node)
  //   emit('load', node)
  //   resolve()
  // }

  onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
  })
  onMounted(() => {
    // console.log(`the component is now mounted.`)
  })
</script>
<style lang="scss" scoped>
  .components-tree {
    margin: 0%;
    .custom-tree-node {
      display: flex;
      align-items: center;
      .custom-tree-node-icon {
        margin-right: 0.4rem;
      }
    }
    :deep {
      margin-bottom: 0%;
      .el-tree-node__content {
        @include mixin-height(32);
      }
      .el-tree .el-icon svg {
        //原有的箭头 去掉
        display: none !important;
        height: 0;
        width: 0;
      }
      .el-tree-node__expand-icon {
        //引入的图标（图片）size大小 => 树节点前的预留空间大小
        font-size: 16px;
      }

      //图标是否旋转，如果是箭头类型的，可以设置旋转90度。如果是两张图片，则设为0
      .el-tree .el-tree-node__expand-icon.expanded {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }

      .el-tree .el-tree-node__expand-icon:before {
        // 未展开的节点
        background: url('~@/assets/svg/tree-fangxiang-zuo.svg') no-repeat 0;
        content: '';
        display: block;
        width: 18px;
        height: 18px;
      }

      .el-tree .el-tree-node__expand-icon.expanded:before {
        //展开的节点
        background: url('~@/assets/svg/tree-fangxiang-xia.svg') no-repeat 0 0;
        content: '';
        display: block;
        width: 18px;
        height: 18px;
        margin-top: 4px;
      }

      .el-tree .is-leaf.el-tree-node__expand-icon::before {
        //叶子节点（不显示图标）
        display: block;
        background: none !important;
        content: '';
        width: 18px;
        height: 18px;
      }

      .el-tree-node__expand-icon.is-leaf {
        width: 0px;
      }
    }
  }
</style>
