<template>
    <div class="components-batch">
        <div class="ap-box">
            <slot></slot>
            <div class="ap-box-right">
                <img class="ap-box-right-icon" src="@/assets/svg/biaoge-piliang-shaxin.svg" alt="">
                <img class="ap-box-right-icon" src="@/assets/svg/biaoge-piliang-daochu.svg" alt="">
                <img class="ap-box-right-icon" src="@/assets/svg/biaoge-piliang-dayin.svg" alt="">
                <img class="ap-box-right-icon" src="@/assets/svg/biaoge-piliang-quanping.svg" alt="">
                <img class="ap-box-right-icon margin-0" src="@/assets/svg/biaoge-piliang-shezhi.svg" alt="">
            </div>
        </div>
    </div>
</template>
<script setup>
import { reactive, defineProps, defineEmits, onBeforeMount, onMounted, watch } from "vue"
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
    data: [],
    cancelBottomLine: false,
});
// console.log(props.data);
function tabChange(pane, ev) {
    // console.log(pane, ev);
    emit("tab-change", state.activeName);
}
function getActiveName() {
    emit("getActiveName", state.activeName);
}
//初始化数据
function initData() {

}
watch(props, (newValue, oldValue) => {
    // console.log(newValue, oldValue);
    //初始化数据
    initData()
})
onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
    //初始化数据
    initData()
})
onMounted(() => {
    // console.log(`the component is now mounted.`)
})
</script>
<style lang='scss' scoped>
.components-batch {
    margin: 0%;
    width: 100%;
    .ap-box {
        width: 100%;
        display: flex;
        flex-flow: wrap;
        justify-content: flex-start;
        align-items: flex-end;
        align-content: flex-end;

        .ap-box-right {
            margin-left: auto;

            .ap-box-right-icon {
                margin-right: 0.5rem;
            }
        }

    }

    .margin-0 {
        margin: 0% !important;
    }
}
</style>