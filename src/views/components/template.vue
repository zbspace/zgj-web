<template>
    <div class="components-template">
        <!-- 颜色 -->
        <div class="ap-box color">颜色</div>
        <!-- 表格搜索 -->
        <div class="ap-box">
            <componentsSearchForm :data="state.componentsSearchForm.data" :butData="state.componentsSearchForm.butData"
                :style="state.componentsSearchForm.style" @getCurrentValue="getCurrentValue"
                @getCurrentValueAll="getCurrentValueAll" @clickElement="clickElement">
            </componentsSearchForm>
        </div>
        <!-- 表格 -->
        <div class="ap-box">
            <componentsTable :data="state.componentsTable.data" :header="state.componentsTable.header"
                :isSelection="true" @row-click="rowClick" @select="select" @custom-click="customClick">
            </componentsTable>
        </div>
        <!-- 合并行表格 -->
        <div class="ap-box">
            <componentsTable :data="state.componentsTable.data" :header="state.componentsTable.header"
                :defaultAttribute="state.componentsTable.defaultAttribute" @row-click="rowClick" @select="select"
                @custom-click="customClick">
            </componentsTable>
        </div>
        <!-- 分页 -->
        <div class="ap-box">
            <componentsPagination :data="state.componentsPagination.data"
                :defaultAttribute="state.componentsPagination.defaultAttribute" @size-change="sizeChange"
                @current-change="currentChange">
                自定义内容
            </componentsPagination>
        </div>
        <!-- 树 -->
        <div class="ap-box">
            <componentsTree :data="state.componentsTree.data" :defaultAttribute="state.componentsTree.defaultAttribute"
                @node-click="nodeClick">
            </componentsTree>
        </div>
        <!-- 下拉菜单 -->
        <div class="ap-box">
            <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    Dropdown List
                </span>
                <template #dropdown>
                    <div style="width:300px;height:300px">

                    </div>
                </template>
            </el-dropdown>
        </div>
        <!-- 单据详情 -->
        <!-- <div class="ap-box">
            <componentsDocumentsDetails Layout="">
            </componentsDocumentsDetails>
        </div> -->

        <!-- 布局页面 -->
        <div class="ap-box">
            <componentsLayout Layout="tabs,searchForm,tree,table,pagination">
                <template #tabs>
                    <div>
                        <componentsTabs activeName="dfadfa" :data="state.componentsTabs.data" @tab-change="tabChange">
                        </componentsTabs>
                    </div>
                </template>
                <template #searchForm>
                    <div>
                        <componentsSearchForm :data="state.componentsSearchForm.data"
                            :butData="state.componentsSearchForm.butData" :style="state.componentsSearchForm.style"
                            @getCurrentValue="getCurrentValue" @getCurrentValueAll="getCurrentValueAll"
                            @clickElement="clickElement">
                        </componentsSearchForm>
                    </div>
                </template>
                <template #tree>
                    <div>
                        <componentsTree :data="state.componentsTree.data"
                            :defaultAttribute="state.componentsTree.defaultAttribute" @node-click="nodeClick">
                        </componentsTree>
                    </div>
                </template>
                <template #table>
                    <div>
                        <componentsTable :data="state.componentsTable.data" :header="state.componentsTable.header"
                            :isSelection="true" @row-click="rowClick" @select="select" @custom-click="customClick">
                        </componentsTable>
                    </div>
                </template>
                <template #pagination>
                    <componentsPagination :data="state.componentsPagination.data"
                        :defaultAttribute="state.componentsPagination.defaultAttribute" @size-change="sizeChange"
                        @current-change="currentChange">
                    </componentsPagination>
                </template>
            </componentsLayout>
        </div>
    </div>
</template>
<script setup>
import { reactive, defineProps, onBeforeMount, onMounted } from "vue"
import componentsTable from "./table"
import componentsSearchForm from "./searchForm"
import componentsTree from "./tree"
import componentsPagination from "./pagination.vue"
import componentsDocumentsDetails from "./documentsDetails.vue"
import componentsTabs from "./tabs.vue"
import componentsLayout from "./Layout.vue"
const props = defineProps({
    type: String,
})
const state = reactive({
    componentsSearchForm: {
        style: {
            lineStyle: {
                width: "50%",
            },
            cutOffRuleStyle: {
                width: "100%",
            },
            labelStyle: {
                width: "100px"
            },
            butLayoutStyle: {
                width: "100%",
                "justify-content": "center",
            },
        },
        data: [{
            id: 'name',
            label: "name",
            type: "input",
            isNecessary: true,
            // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
            defaultAttribute: {
                placeholder: "请输入name",
            },
            style: {
                width: "100%",
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
        }, {
            id: 'picker',
            label: "picker",
            type: "picker",
            // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
            defaultAttribute: {
                type: "daterange",
                "start-placeholder": "Start date",
                "end-placeholder": "End date"
            },
            style: {

            }
        }, {
            id: 'checkbox',
            label: "checkbox",
            type: "checkbox",
            checkbox: [{
                // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
                defaultAttribute: {
                    label: "Option 1"
                },
                style: {

                }
            }, {
                // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
                defaultAttribute: {
                    label: "Option 2"
                },
                style: {

                }
            }]
        }, {
            id: 'radio',
            label: "radio",
            type: "radio",
            // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
            defaultAttribute: {
                label: "Option 1"
            },
            style: {

            },
            radio: [{
                label: '1',
                name: "op1"
            }, {
                label: '2',
                name: "op2"
            }]
        }, {
            id: 'cascader',
            label: "cascader",
            type: "cascader",
            // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
            defaultAttribute: {
                props: {
                    expandTrigger: 'hover',
                },
                options: [
                    {
                        value: 'guide',
                        label: 'Guide',
                        children: [
                            {
                                value: 'disciplines',
                                label: 'Disciplines',
                                children: [
                                    {
                                        value: 'consistency',
                                        label: 'Consistency',
                                    },
                                    {
                                        value: 'feedback',
                                        label: 'Feedback',
                                    },
                                    {
                                        value: 'efficiency',
                                        label: 'Efficiency',
                                    },
                                    {
                                        value: 'controllability',
                                        label: 'Controllability',
                                    },
                                ],
                            },
                            {
                                value: 'navigation',
                                label: 'Navigation',
                                children: [
                                    {
                                        value: 'side nav',
                                        label: 'Side Navigation',
                                    },
                                    {
                                        value: 'top nav',
                                        label: 'Top Navigation',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        value: 'component',
                        label: 'Component',
                        children: [
                            {
                                value: 'basic',
                                label: 'Basic',
                                children: [
                                    {
                                        value: 'layout',
                                        label: 'Layout',
                                    },
                                    {
                                        value: 'color',
                                        label: 'Color',
                                    },
                                    {
                                        value: 'typography',
                                        label: 'Typography',
                                    },
                                    {
                                        value: 'icon',
                                        label: 'Icon',
                                    },
                                    {
                                        value: 'button',
                                        label: 'Button',
                                    },
                                ],
                            },
                            {
                                value: 'form',
                                label: 'Form',
                                children: [
                                    {
                                        value: 'radio',
                                        label: 'Radio',
                                    },
                                    {
                                        value: 'checkbox',
                                        label: 'Checkbox',
                                    },
                                    {
                                        value: 'input',
                                        label: 'Input',
                                    },
                                    {
                                        value: 'input-number',
                                        label: 'InputNumber',
                                    },
                                    {
                                        value: 'select',
                                        label: 'Select',
                                    },
                                    {
                                        value: 'cascader',
                                        label: 'Cascader',
                                    },
                                    {
                                        value: 'switch',
                                        label: 'Switch',
                                    },
                                    {
                                        value: 'slider',
                                        label: 'Slider',
                                    },
                                    {
                                        value: 'time-picker',
                                        label: 'TimePicker',
                                    },
                                    {
                                        value: 'date-picker',
                                        label: 'DatePicker',
                                    },
                                    {
                                        value: 'datetime-picker',
                                        label: 'DateTimePicker',
                                    },
                                    {
                                        value: 'upload',
                                        label: 'Upload',
                                    },
                                    {
                                        value: 'rate',
                                        label: 'Rate',
                                    },
                                    {
                                        value: 'form',
                                        label: 'Form',
                                    },
                                ],
                            },
                            {
                                value: 'data',
                                label: 'Data',
                                children: [
                                    {
                                        value: 'table',
                                        label: 'Table',
                                    },
                                    {
                                        value: 'tag',
                                        label: 'Tag',
                                    },
                                    {
                                        value: 'progress',
                                        label: 'Progress',
                                    },
                                    {
                                        value: 'tree',
                                        label: 'Tree',
                                    },
                                    {
                                        value: 'pagination',
                                        label: 'Pagination',
                                    },
                                    {
                                        value: 'badge',
                                        label: 'Badge',
                                    },
                                ],
                            },
                            {
                                value: 'notice',
                                label: 'Notice',
                                children: [
                                    {
                                        value: 'alert',
                                        label: 'Alert',
                                    },
                                    {
                                        value: 'loading',
                                        label: 'Loading',
                                    },
                                    {
                                        value: 'message',
                                        label: 'Message',
                                    },
                                    {
                                        value: 'message-box',
                                        label: 'MessageBox',
                                    },
                                    {
                                        value: 'notification',
                                        label: 'Notification',
                                    },
                                ],
                            },
                            {
                                value: 'navigation',
                                label: 'Navigation',
                                children: [
                                    {
                                        value: 'menu',
                                        label: 'Menu',
                                    },
                                    {
                                        value: 'tabs',
                                        label: 'Tabs',
                                    },
                                    {
                                        value: 'breadcrumb',
                                        label: 'Breadcrumb',
                                    },
                                    {
                                        value: 'dropdown',
                                        label: 'Dropdown',
                                    },
                                    {
                                        value: 'steps',
                                        label: 'Steps',
                                    },
                                ],
                            },
                            {
                                value: 'others',
                                label: 'Others',
                                children: [
                                    {
                                        value: 'dialog',
                                        label: 'Dialog',
                                    },
                                    {
                                        value: 'tooltip',
                                        label: 'Tooltip',
                                    },
                                    {
                                        value: 'popover',
                                        label: 'Popover',
                                    },
                                    {
                                        value: 'card',
                                        label: 'Card',
                                    },
                                    {
                                        value: 'carousel',
                                        label: 'Carousel',
                                    },
                                    {
                                        value: 'collapse',
                                        label: 'Collapse',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        value: 'resource',
                        label: 'Resource',
                        children: [
                            {
                                value: 'axure',
                                label: 'Axure Components',
                            },
                            {
                                value: 'sketch',
                                label: 'Sketch Templates',
                            },
                            {
                                value: 'docs',
                                label: 'Design Documentation',
                            },
                        ],
                    },
                ]
            },
            style: {

            },
        }, {
            id: 'textarea',
            label: "textarea",
            type: "input",
            // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
            defaultAttribute: {
                placeholder: "请输入name",
                type: "textarea",
            },
            style: {
                width: "100%",
            }
        }, {
            id: 'switch',
            label: "switch",
            type: "switch",
            // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
            defaultAttribute: {

            },
            style: {

            }
        }, {
            id: 'button',
            label: "button",
            type: "button",
            data: [{
                name: "but",
                // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
                defaultAttribute: {
                    style: {

                    }
                },
            }]
        },],
        butData: [{
            id: "submit",
            name: "提交",
            type: "click",
            // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
            defaultAttribute: {
                type: "primary"
            },
            style: {

            }
        }, {
            id: "more",
            name: "更多",
            type: "unfold",
            // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
            defaultAttribute: {
                type: "primary"
            },
            style: {

            }
        }, {
            id: "add",
            name: "添加",
            type: "text",
            // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
            defaultAttribute: {

            },
            style: {
                color: "var(--primary-6)"
            }
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
            style: { "font-size": "20px", "color": "red" },
            sortable: true
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
                style: { "font-size": "20px", "color": "green" }
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
            border: true,
            "show-header": false,
            "span-method": ({ row, column, rowIndex, columnIndex }) => {
                // console.log({ row, column, rowIndex, columnIndex });
                if (rowIndex === 0 && columnIndex === 0) {    //用于设置要合并的列
                    return {
                        rowspan: 1,　　　　　//合并的行数
                        colspan: 2          //合并的列数，设为０则直接不显示
                    };
                }
                if (rowIndex === 0 && columnIndex === 1) {    //用于设置要合并的列
                    return {
                        rowspan: 1,　　　　　//合并的行数
                        colspan: 0          //合并的列数，设为０则直接不显示
                    };
                }
            },
            "cell-style": ({ row, column, rowIndex, columnIndex }) => {
                console.log({ row, column, rowIndex, columnIndex });
                if (rowIndex === 0 && columnIndex === 0) {
                    return {
                        "background": "red"
                    }
                }
                if (columnIndex === 0) {
                    return {
                        "background": "yellow"
                    }
                }
            },
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
            "check-strictly": true,
        }
    },
    componentsPagination: {
        data: {
            amount: 500,
            index: 1,
            pageNumber: 10,
        },
        // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
        defaultAttribute: {
            layout: "sizes, prev, pager, next, slot",
            total: 500,
            'page-sizes': [10, 100, 200, 300, 400],
            background: true,
        }
    },
    componentsTabs: {
        data: [{
            label: 'dfad',
            name: "dfadfa",
        }, {
            label: 'fff',
            name: "ffff",
        }]
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
function customClick(index, item) {
    console.log(index, item);
}

/* 
componentsSearchForm
*/
function getCurrentValue(item, index) {
    console.log(item, index);
}
function getCurrentValueAll(data) {
    console.log(data);
}
function clickElement(item, index) {
    console.log(item, index);
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
componentsPagination
*/


// page-size 改变时触发
function sizeChange(val) {
    console.log(val);
}
// current-page 改变时触发
function currentChange(val) {
    console.log(val);
}

/* 
componentsDocumentsDetails
*/

/* 

*/
function tabChange(name) {
    console.log(name);
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