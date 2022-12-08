<template>
    <div class="components-tabs">
        <div class="ap-box" :class="{ cancelBottomLine: props.cancelBottomLine }">
            <el-tabs v-model="state.activeName" class="demo-tabs" @tab-change="tabChange">
                <el-tab-pane :label="item.label" :name="item.name" v-for="item in props.data"> </el-tab-pane>
            </el-tabs>
        </div>
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
    //取消底部的线
    cancelBottomLine: {
        type: Boolean,
        default: false,
    },
    // 布局
    data: {
        type: Array,
        default: [],
    },
    //选中名字
    activeName: {
        type: String,
        default: "",
    },
})
const emit = defineEmits(["tab-change", "getActiveName"]);
const state = reactive({
    activeName: "",
});
// console.log(props.data);
function tabChange(pane, ev) {
    // console.log(pane, ev);
    emit("tab-change", state.activeName);
}
function getActiveName() {
    emit("getActiveName", state.activeName);
}
function initActiveName() {
    state.activeName = props.activeName
}
onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
    initActiveName();
})
onMounted(() => {
    // console.log(`the component is now mounted.`)
})
</script>
<style lang='scss' scoped>
.components-tabs {
    margin: 0%;

    :deep(.ap-box) {
        .el-tabs__nav-wrap::after {
            height: 1px;
        }

        .el-tabs__item.is-active {
            color: var(--primary-6);
        }

        .el-tabs__active-bar {
            background-color: var(--primary-6);
        }

        .el-tabs__item:hover {
            color: var(--primary-6);
        }
    }

    :deep(.cancelBottomLine) {
        .el-tabs__nav-wrap::after {
            height: 0;
        }
    }
}
</style>