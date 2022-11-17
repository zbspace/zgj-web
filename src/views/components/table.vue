<template>
    <div class="components-table">
        <el-table v-bind="props.defaultAttribute" :refs="refs" :data="props.data" border style="width: 100%"
            :cell-style="cellStyle" @select="select" @select-all="selectAll" @selection-change="selectionChange"
            @cell-click="cellClick" @row-click="rowClick">
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
    // 表头数据
    header: {
        type: Array,
        default: [],
    },
    // 表格数据
    data: {
        type: Array,
        default: [],
    },
    //是否多选
    isSelection: {
        type: Boolean,
        default: false,
    },
    // 默认属性
    defaultAttribute: {
        type: Object,
        default: {}
    },
})
const emit = defineEmits(['select', 'select-all', 'selection-change', 'cell-click', 'row-click']);
const state = reactive({

});
// 单元格样式回调
function cellStyle({ row, column, rowIndex, columnIndex }) {
    // console.log({ row, column, rowIndex, columnIndex });
    // console.log(props.header[columnIndex]);
    let style = {}
    if (props.header[columnIndex] && props.header[columnIndex].style) {
        style = props.header[columnIndex].style;
    }
    if (props.data[rowIndex] && props.data[rowIndex].style) {
        style = props.data[rowIndex].style;
    }
    return style;
};
// 	当用户手动勾选数据行的 Checkbox 时触发的事件
function select(selection, row) {
    emit("select", selection, row);
}
//当用户手动勾选全选 Checkbox 时触发的事件
function selectAll(selection) {
    emit("select-all", selection);
}
//当选择项发生变化时会触发该事件
function selectionChange(selection) {
    emit("selection-change", selection);
}
//	当某个单元格被点击时会触发该事件
function cellClick(row, column, cell, event) {
    emit("cell-click", row, column, cell, event);
}
//	当某个单元格被点击时会触发该事件
function rowClick(row, column, event) {
    emit("row-click", row, column, event);
}
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