<template>
    <div class="components-Layout">
        <div class="ap-box-title" v-if="state.Layout.title">
            <slot name="title"></slot>
        </div>
        <div class="ap-box-breadcrumb" v-if="state.Layout.breadcrumb">
            <slot name="breadcrumb"></slot>
        </div>
        <div class="ap-box-tabs" v-if="state.Layout.tabs">
            <slot name="tabs"></slot>
        </div>
        <div class="ap-box-cont">
            <div class="ap-box-tree" v-if="state.Layout.tree">
                <slot name="tree"></slot>
            </div>
            <div class="ap-box-cutOffRule" v-if="state.Layout.tree && (state.Layout.searchForm || state.Layout.table)">
            </div>
            <div class="ap-box-cent" :style="state.centStyle" v-if="state.Layout.searchForm || state.Layout.table">
                <div class="ap-box-searchForm" v-if="state.Layout.searchForm">
                    <slot name="searchForm"></slot>
                </div>
                <div class="ap-box-table" v-if="state.Layout.table">
                    <slot name="table"></slot>
                </div>
            </div>
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
    centStyle: {}
});
// 初始化布局
function initLayout() {
    if (props.Layout) {
        props.Layout.split(",").map((item) => {
            state.Layout[item] = true;
        })
    };
    if (!state.Layout.tree) {
        state.centStyle.width = "100%"
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
    align-content: flex-start;
    justify-content: flex-start;
    align-items: flex-start;

    .ap-box-title {
        padding: 0rem 0 0.5rem 0;
        box-sizing: border-box;
        font-size: var(--font-size-title-2);
    }

    .ap-box-breadcrumb {
        width: 100%;
    }

    .ap-box-tabs {
        width: 100%;

    }

    .ap-box-cont {
        display: flex;
        width: 100%;
    }

    .ap-box-searchForm {
        width: 100%;

    }

    .ap-box-tree {
        width: 15%;
    }

    .ap-box-cutOffRule {
        border-left: 1px solid var(--primary-2);
        margin: 0 0.5rem;
    }

    .ap-box-cent {
        width: calc(85% - 1rem - 1px);
    }

    .ap-box-pagination {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        padding: 1.5rem 0;
        box-sizing: border-box;
    }
}
</style>