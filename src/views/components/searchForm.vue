<template>
    <div class="components-searchForm">
        <div class="ap-box" v-for="(item, index) in props.data">
            <label class="ap-box-label" :style="props.labelStyle" :for="item.id">{{ item.label }}</label>
            <el-input v-bind="props.defaultAttribute" :refs="refs" :style="props.inputStyle" :id="item.id" v-model="item.value"
                :placeholder="item.placeholder" @input="input(item, index)" />
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
    // 表单数据
    data: {
        type: Array,
        default: [],
    },
    //label 样式
    labelStyle: {
        type: Object,
        default: {},
    },
    //input 样式
    inputStyle: {
        type: Object,
        default: {},
    },
    // 默认属性
    defaultAttribute: {
        type: Object,
        default: {}
    },
})
const emit = defineEmits(['input', 'input-all']);
const state = reactive({

});
//当表单输入的时候返回当前表单的值
function input(item, index) {
    emit("input", item, index);
    inputAll();
}
//当表单输入的时候返回所有表单的值
function inputAll() {
    emit("input-all", props.data);
}
onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
})
onMounted(() => {
    // console.log(`the component is now mounted.`)
})
</script>
<style lang='scss' scoped>
.components-searchForm {
    margin: 0%;
    display: flex;
    flex-flow: wrap;

    .ap-box {
        display: flex;
        align-items: center;
        margin: 10px 0;

        .ap-box-label {
            margin: 0 10px;
        }
    }
}
</style>