<template>
    <div class="components-tree">
        <el-tree v-bind="props.defaultAttribute" :refs="refs" :data="props.data" :props="props.defaultProps"
            @node-click="nodeClick" @check-change="checkChange" @check="check" @current-change="currentChange" />
    </div>
</template>
<script setup>
import { reactive, defineProps, defineEmits, onBeforeMount, onMounted } from "vue"
const props = defineProps({
    //标识
    refs: {
        type: String,
        default: "",
    },
    // 处理类型
    type: {
        type: String,
        default: "0",
    },
    // 表单数据
    data: {
        type: Array,
        default: [],
    },
    //
    defaultProps: {
        type: Object,
        default: {
            children: 'children',
            label: 'label',
        }
    },
    // 默认属性
    defaultAttribute: {
        type: Object,
        default: {}
    },
})
const emit = defineEmits(['node-click', 'check-change', 'check', 'current-change']);
const state = reactive({

});
//	当节点被点击的时候触发   	四个参数：对应于节点点击的节点对象，TreeNode 的 node 属性, TreeNode和事件对象
function nodeClick(NodeObjects, node, TreeNode, event) {
    emit("node-click", NodeObjects, node, TreeNode, event);
}
//当表单输入的时候返回所有表单的值  	共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点本身是否被选中、节点的子树中是否有被选中的节点
function checkChange(NodeObjects, isCheck, isChildrenCheck) {
    emit("check-change", NodeObjects, isCheck, isChildrenCheck);
}
// 点击节点复选框之后触发  共两个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、树目前的选中状态对象，包含 checkedNodes、checkedKeys、halfCheckedNodes、halfCheckedKeys 四个属性
function check(NodeObjects, checkedObjects) {
    emit("check", NodeObjects, checkedObjects);
}
// 当前选中节点变化时触发的事件  	共两个参数，依次为：当前节点的数据，当前节点的 Node 对象
function currentChange(node, TreeNode) {
    emit("current-change", node, TreeNode);
}
onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
})
onMounted(() => {
    // console.log(`the component is now mounted.`)
})
</script>
<style lang='scss' scoped>
.components-tree {
    margin: 0%;

    :deep{
        label {
            margin-bottom: 0%;
        }
    } 
}
</style>