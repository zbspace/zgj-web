<template>
    <div class="components-table">
        <el-table :data="props.data" border style="width: 100%">
            <el-table-column type="selection" width="55" v-if="props.isSelection" />
            <el-table-column :prop="item.prop" :label="item.label" :width="item.width"
                v-for="(item, index) in  props.header" />
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
const state = {
    tableData: [
        {
            date: '2016-05-03',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-02',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-04',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-01',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
    ]
};
console.log(props.type);
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