<template>
    <div class="components-template">
        <!-- 颜色 -->
        <div class="ap-box color">颜色</div>
        <!-- 表格搜索 -->
        <div class="ap-box">
            <componentsSearchForm :data="state.componentsSearchForm.data"
                :inputStyle="state.componentsSearchForm.inputStyle" :labelStyle="state.componentsSearchForm.labelStyle"
                @input="input" @input-all="inputAll">
            </componentsSearchForm>
        </div>
        <!-- 表格 -->
        <div class="ap-box">
            <componentsTable type="1" :data="state.componentsTable.data" :header="state.componentsTable.header"
                :isSelection="true" @row-click="rowClick" @select="select">
                <!-- #Tom   Tom 就是表头header里的 prop 值 代表当前列 -->
                <template #Tom>
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                    <span>remove</span>
                </template>
            </componentsTable>
        </div>
        <!-- 分页 -->
        <div class="ap-box">
            <componentsTable type="1" :data="state.componentsTable.data" :header="state.componentsTable.header"
                :isSelection="true" @row-click="rowClick" @select="select">
                <!-- #Tom   Tom 就是表头header里的 prop 值 代表当前列 -->
                <template #Tom>
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                    <span>remove</span>
                </template>
            </componentsTable>
        </div>
        <!-- 树 -->
        <div class="ap-box">
            <componentsTree :data="state.componentsTree.data" :defaultAttribute="state.componentsTree.defaultAttribute"
                @node-click="nodeClick">

            </componentsTree>
        </div>
    </div>
</template>
<script setup>
import { reactive, defineProps, onBeforeMount, onMounted } from "vue"
import componentsTable from "./table"
import componentsSearchForm from "./searchForm"
import componentsTree from "./tree"
const props = defineProps({
    type: String,
})
const state = reactive({
    componentsSearchForm: {
        labelStyle: {
            width: "50px"
        },
        inputStyle: {
            width: "150px"
        },
        data: [{
            id: 'name',
            label: "name",
            type: "input",
            // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
            defaultAttribute: {
                placeholder: "请输入name",
            },
            style: {

            }
        }, {
            id: 'select',
            label: "select",
            type: "select",
            // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
            defaultAttribute: {
                placeholder: "请输入label",
            },
            options: [{
                value: 'Option1',
                label: 'Option1',
            },
            {
                value: 'Option2',
                label: 'Option2',
            },
            {
                value: 'Option3',
                label: 'Option3',
            },
            {
                value: 'Option4',
                label: 'Option4',
            },
            {
                value: 'Option5',
                label: 'Option5',
            },]
        }],
    },
    componentsTable: {
        header: [{
            prop: 'name',
            label: "name",
            width: 100,
        }, {
            prop: 'date',
            label: "date",
            style: { "font-size": "2px", "color": "red" }
        }, {
            prop: 'address',
            label: "address",
        }, {
            prop: 'Tom',
            label: "Tom",
            // 是否自定义  自定义时  插槽名为  prop名
            isCustom: true
        }],
        data: [
            {
                date: '2016-05-03',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
                style: { "font-size": "2px", "color": "green" }
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
        ],
        // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
        defaultAttribute: {

        }
    },
    componentsTree: {
        data: [
            {
                label: 'Level one 1',
                children: [
                    {
                        label: 'Level two 1-1',
                        children: [
                            {
                                label: 'Level three 1-1-1',
                            },
                        ],
                    },
                ],
            },
            {
                label: 'Level one 2',
                children: [
                    {
                        label: 'Level two 2-1',
                        children: [
                            {
                                label: 'Level three 2-1-1',
                            },
                        ],
                    },
                    {
                        label: 'Level two 2-2',
                        children: [
                            {
                                label: 'Level three 2-2-1',
                            },
                        ],
                    },
                ],
            },
            {
                label: 'Level one 3',
                children: [
                    {
                        label: 'Level two 3-1',
                        children: [
                            {
                                label: 'Level three 3-1-1',
                            },
                        ],
                    },
                    {
                        label: 'Level two 3-2',
                        children: [
                            {
                                label: 'Level three 3-2-1',
                            },
                        ],
                    },
                ],
            },
        ],
        // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
        defaultAttribute: {
            "check-on-click-node": true,
            "show-checkbox": true,
            "default-expand-all": true,
            "expand-on-click-node": false,
        }
    },
});

/* 
componentsTable
*/
//	当某个单元格被点击时会触发该事件
function rowClick(row, column, event) {
    // ['select', 'select-all', 'selection-change', 'cell-click', 'row-click']  仅支持这些方法
    console.log(row, column, event);
}
// 	当用户手动勾选数据行的 Checkbox 时触发的事件
function select(selection, row) {
    // ['select', 'select-all', 'selection-change', 'cell-click', 'row-click']  仅支持这些方法
    console.log(selection, row);
}

/* 
componentsSearchForm
*/
function input(item, index) {
    console.log(item, index);
}
function inputAll(data) {
    console.log(data);
}

/* 
componentsTree
*/

//	当节点被点击的时候触发   	四个参数：对应于节点点击的节点对象，TreeNode 的 node 属性, TreeNode和事件对象
function nodeClick(NodeObjects, node, TreeNode, event) {
    // ['node-click', 'check-change', 'check', 'current-change']  仅支持这些方法
    console.log(NodeObjects, node, TreeNode, event);
}

/* 
开始调用
*/
onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
})
onMounted(() => {
    // console.log(`the component is now mounted.`)
})
</script>
<style lang='scss' scoped>
.components-template {
    margin: 0%;

    .color {
        color: var(--primary-6);
    }

    .ap-box {
        padding: 10px;
    }
}
</style>