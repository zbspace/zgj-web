<template>
    <div class="components-table">
        <el-table :data="props.data" border style="width: 100%" :cell-style="cellStyle">
            <!-- 多选 -->
            <el-table-column type="selection" width="55" v-if="props.isSelection" />
            <!-- 列表内容 -->
            <el-table-column :prop="item.prop" :label="item.label" :width="item.width"
                v-for="(item, index) in  props.header">
                <!-- 自定义内容显示 -->
                <template #default="scope" v-if="item.isCustom">
                    <slot :name="item.prop"></slot>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script setup>
import { defineProps, onBeforeMount, onMounted } from "vue"
const props = defineProps({
    // 处理类型
    type: String,
    // 表头数据
    header: Array,
    // 表格数据
    data: Array,
    //是否多选
    isSelection: Boolean,
})
const state = {};
// 单元格样式回调
function cellStyle({ row, column, rowIndex, columnIndex }) {
    // console.log({ row, column, rowIndex, columnIndex });
    console.log(props.header[columnIndex]);
    let style = {}
    if (props.header[columnIndex] && props.header[columnIndex].style) {
        style = props.header[columnIndex].style;
    }
    return style;
};
onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
})
onMounted(() => {
    // console.log(`the component is now mounted.`)
})
</script>
<style lang='scss' scoped>
.components-table {
    margin: 0%;
}
</style>