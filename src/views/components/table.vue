<template>
    <div class="components-table">
        <el-table v-bind="props.defaultAttribute" :refs="refs" :data="props.data" style="width: 100%" @select="select"
            @select-all="selectAll" @selection-change="selectionChange" @cell-click="cellClick" @row-click="rowClick"
            class="ap-table">
            <!-- 列表内容 -->
            <el-table-column v-bind="item" v-for="(item, index) in  props.header">
                <!-- 自定义内容显示 -->
                <template #default="scope" v-if="item.customDisplayType == 'switch'">
                    <div class="switch">
                        <el-switch v-model="scope.row.switchValue" />
                    </div>
                </template>
                <!-- 自定义内容显示 -->
                <template #default="scope" v-else-if="item.rankDisplayData && item.rankDisplayData.length > 0">
                    <div class="rankDisplayData">
                        <div class="rankDisplayData-node" v-for="(data, num) in item.rankDisplayData.slice(0, 3)"
                            @click="customClick(scope.$index, scope.row, data)">
                            <span>{{ data.name }}</span>
                        </div>
                        <img class="rankDisplayData-node" src="../../assets/svg/sangedian.svg" alt=""
                            v-if="item.rankDisplayData.length > 3"
                            @click="customClick(scope.$index, scope.row, { type: 'more' })">
                    </div>
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
const emit = defineEmits(['select', 'select-all', 'selection-change', 'cell-click', 'row-click', 'custom-click']);
const state = reactive({

});
// console.log(props.defaultAttribute);
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
//点击自定义元素
function customClick(index, row, item) {
    // console.log(index, row, item);
    emit("custom-click", index, row, item);
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

    .rankDisplayData {
        display: flex;
        // justify-content: space-around;
        // text-align: center;
        color: var(--Info-6);

        .rankDisplayData-node {
            cursor: pointer;
            margin-right: 0.5rem;
        }
    }

    :deep {
        .el-table thead {
            color: var(--color-text-1);
            font-size: var(--font-size-body-2);
            font-weight: var(--font-weight-400);
        }

        th {
            font-weight: var(--font-weight-400);
        }
    }

}
</style>