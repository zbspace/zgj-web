<template>
    <div class="components-documentsDetails">
        <div class="ap-box">
            <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                <el-tab-pane label="User" name="first"></el-tab-pane>
                <el-tab-pane label="Config" name="second"></el-tab-pane>
                <el-tab-pane label="Role" name="third"></el-tab-pane>
                <el-tab-pane label="Task" name="fourth"></el-tab-pane>
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
    // 布局
    Layout: {
        type: Array,
        default: [],
    },
})
const emit = defineEmits([]);
const state = reactive({

});

onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)

})
onMounted(() => {
    // console.log(`the component is now mounted.`)
})
</script>
<style lang='scss' scoped>
.components-documentsDetails {
    margin: 0%;
}
</style>