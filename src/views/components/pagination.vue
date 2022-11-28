<template>
    <div class="components-pagination">
        <el-pagination v-bind="props.defaultAttribute" @size-change="sizeChange" @current-change="currentChange">
            <slot></slot>
        </el-pagination>
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
}
</style>