<template>
    <div class="components-Layout">
        <div class="ap-box-tabs" v-if="state.Layout.tabs">
            <slot name="tabs"></slot>
        </div>
        <div class="ap-box-searchForm" v-if="state.Layout.searchForm">
            <slot name="searchForm"></slot>
        </div>
        <div class="ap-box-tree" v-if="state.Layout.tree">
            <slot name="tree"></slot>
        </div>
        <div class="ap-box-table" :style="state.tableStyle" v-if="state.Layout.table">
            <slot name="table"></slot>
        </div>
        <div class="ap-box-pagination" v-if="state.Layout.pagination">
            <slot name="pagination"></slot>
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
    // 布局
    Layout: {
        type: String,
        default: "",
    },
})
const emit = defineEmits([]);
const state = reactive({
    Layout: {},
    tableStyle: {}
});
// 初始化布局
function initLayout() {
    if (props.Layout) {
        props.Layout.split(",").map((item) => {
            state.Layout[item] = true;
        })
    };
    if (!state.Layout.tree) {
        state.tableStyle.width = "100%"
    }
    // console.log(state.Layout);
};
onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
    // 初始化布局
    initLayout();
})
onMounted(() => {
    // console.log(`the component is now mounted.`)
})
</script>
<style lang='scss' scoped>
.components-Layout {
    margin: 0%;
    width: 100%;
    height: 100%;
    overflow: auto;

    display: flex;
    flex-flow: wrap;

    .ap-box-tabs {
        width: 100%;

    }

    .ap-box-searchForm {
        width: 100%;

    }

    .ap-box-tree {
        width: 20%;
    }

    .ap-box-table {
        width: 80%;
    }

    .ap-box-pagination {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        padding: 1rem 0;
        box-sizing: border-box;
    }
}
</style>