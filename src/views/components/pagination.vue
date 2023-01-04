<template>
    <div class="components-pagination">
        <div class="ap-desc">
            共 {{ props.data.amount }} 条记录 第 {{ props.data.index }} / {{ props.data.pageNumber }} 页
        </div>
        <div class="ap-box">
            <el-pagination v-bind="props.defaultAttribute" @size-change="sizeChange" @current-change="currentChange">
                <slot></slot>
            </el-pagination>
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
    // 分页数据
    data: {
        type: Object,
        default: {}
    },
    // 默认属性
    defaultAttribute: {
        type: Object,
        default: {}
    },
})
const emit = defineEmits(["size-change", "current-change"]);
const state = reactive({

});
//处理默认设置
function disDefaultAttribute() {
    let AttributeName = ["page-size", "default-page-size", "total", "page-count", "pager-count", "current-page", "default-current-page",]
    for (const key in props.defaultAttribute) {
        if (Object.prototype.toString.call(props.defaultAttribute[key]) === "[object String]") {
            if (AttributeName.indexOf(key) > -1) {
                props.defaultAttribute[key] = parseFloat(props.defaultAttribute[key]);
            }
        } else if (Object.prototype.toString.call(props.defaultAttribute[key]) === "[object Array]") {

        }
    }
}
// 
function sizeChange(val) {
    // console.log(val);
    emit("size-change", val);
}
// 
function currentChange(val) {
    // console.log(val);
    emit("current-change", val);
}
onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
    //处理默认设置
    disDefaultAttribute();
})
onMounted(() => {
    // console.log(`the component is now mounted.`)
})
</script>
<style lang='scss' scoped>
.components-pagination {
    margin: 0%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;



    /* 分页 */
    :deep(.ap-box) {
        .el-pagination.is-background .el-pager li:not(.is-disabled).is-active {
            background-color: var(--primary-6);
            color: var(--in-common-use-1);
        }

        .el-pagination.is-background .el-pager li {
            background-color: rgba($color: #000000, $alpha: 0);
        }

        .el-pagination.is-background .el-pager li:hover {
            background-color: var(--color-fill--2);
        }

        .el-pagination.is-background .btn-prev:disabled {
            background-color: rgba($color: #000000, $alpha: 0);
        }

        .el-pagination.is-background .btn-next {
            background-color: rgba($color: #000000, $alpha: 0);
        }

        .el-pagination.is-background .btn-prev {
            background-color: rgba($color: #000000, $alpha: 0);
        }

        .components-pagination[data-v-26def509] .ap-box .el-pagination.is-background .btn-prev {
            background-color: rgba($color: #000000, $alpha: 0);
        }
    }
}
</style>