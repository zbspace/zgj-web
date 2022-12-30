<!-- 用印前核验 -->
<template>
    <div class="PrintControlManagement-UsePrepressVerification">
        <componentsLayout Layout="title,tabs,searchForm,table,pagination,batch">
            <template #title>
                <div class="title">
                    用印前核验
                </div>
            </template>
            <template #tabs>
                <div>
                    <componentsTabs activeName="1" :data="state.componentsTabs.data" @tab-change="tabChange">
                    </componentsTabs>
                </div>
            </template>
            <template #searchForm>
                <div>
                    <componentsSearchForm :data="state.componentsSearchForm.data"
                        :butData="state.componentsSearchForm.butData" :style="state.componentsSearchForm.style">
                    </componentsSearchForm>
                </div>
            </template>
            <template #batch>
                <div class="batch">
                    <componentsBatch>
                     
                    </componentsBatch>
                </div>
            </template>
            <template #table>
                <div>
                    <componentsTable :defaultAttribute="state.componentsTable.defaultAttribute"
                        :data="state.componentsTable.data" :header="state.componentsTable.header"
                        @cellClick="cellClick" @custom-click="customClick">
                    </componentsTable>
                </div>
            </template>
            <template #pagination>
                <componentsPagination :data="state.componentsPagination.data"
                    :defaultAttribute="state.componentsPagination.defaultAttribute">
                </componentsPagination>
            </template>
        </componentsLayout>
        <!-- 单据详情 -->
        <div class="ap-box">
            <componentsDocumentsDetails :show="state.componentsDocumentsDetails.show"
                :visible="state.componentsDocumentsDetails.visible" @clickClose="clickClose">
            </componentsDocumentsDetails>
        </div>
    </div>
</template>
<script setup>
import { reactive, defineProps, defineEmits, onBeforeMount, onMounted } from "vue"
import Layout from "../../../layouts/main.vue";
import componentsTable from "../../components/table"
import componentsSearchForm from "../../components/searchForm"
import componentsTree from "../../components/tree"
import componentsBreadcrumb from "../../components/breadcrumb"
import componentsPagination from "../../components/pagination.vue"
import componentsTabs from "../../components/tabs.vue"
import componentsLayout from "../../components/Layout.vue"
import componentsBatch from "@/views/components/batch.vue"
import componentsDocumentsDetails from "../../components/documentsDetails.vue"
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps({
    // 处理类型
    type: {
        type: String,
        default: "0",
    },
})
const emit = defineEmits([]);
const state = reactive({
    componentsTabs: {
        data: [{
            label: '未核验',
            name: "1",
        }, {
            label: '核验中',
            name: "2",
        }, {
            label: '核验完成',
            name: "3",
        }]
    },
    componentsSearchForm: {
        style: {
            lineStyle: {
                width: "calc(100% / 3)",
            },
            labelStyle: {
                width: "100px"
            },
        },
        data: [
            {
                id: 'name',
                label: "关键词",
                type: "input",
                inCommonUse: true,
                // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
                defaultAttribute: {
                    placeholder: "请输入文件名称搜索",
                },
            },
            {
                id: 'picker',
                label: "选择时间",
                type: "picker",
                inCommonUse: true,
                // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
                defaultAttribute: {
                    type: "daterange",
                    "start-placeholder": "开始时间",
                    "end-placeholder": "结束时间"
                },
                style: {

                }
            },
        ],
        butData: [{
            id: "more",
            name: "展开",
            type: "unfold",
            // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
            defaultAttribute: {
                type: "primary"
            },
            style: {

            }
        }, {
            id: "inquire",
            name: "查询",
            type: "click",
            // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
            defaultAttribute: {
                type: "primary"
            },
            style: {

            }
        }, {
            id: "reset",
            name: "重置",
            type: "click",
            // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
            defaultAttribute: {

            },
            style: {

            }
        },],
    },
    componentsTable: {
        header: [{
            width: 50,
            type: "selection"
        }, {
            prop: '0',
            label: "序号",
            width: 100,
        }, {
            prop: '1',
            label: "单据编号",
            sortable: true,
            "min-width": 150,
        }, {
            prop: '2',
            label: "单据名称",
            sortable: true,
            "min-width": 150,
        }, {
            prop: '3',
            label: "用印文件类型",
            sortable: true,
            "min-width": 150,
        }, {
            prop: '4',
            label: "申请人",
            sortable: true,
            "min-width": 150,
        }, {
            prop: '5',
            label: "申请部门",
            sortable: true,
            "min-width": 150,
        }, {
            prop: '6',
            label: "申请时间",
            sortable: true,
            "min-width": 150,
        }, {
            prop: 'caozuo',
            label: "操作",
            fixed: "right",
            "min-width": 150,
            rankDisplayData: [{
                name: "上传文件核验"
            },],
        }],
        data: [
            {
                1: 'XXXXXXX',
                2: '用印申请',
                3: '',
                4: '往往',
                5: '',
                6: '2022/10/30  15:00:00',
                7: "",
            },
            {
                1: 'XXXXXXX',
                2: '用印申请',
                3: '',
                4: '往往',
                5: '',
                6: '2022/10/30  15:00:00',
                7: "",
            },
            {
                1: 'XXXXXXX',
                2: '用印申请',
                3: '',
                4: '往往',
                5: '',
                6: '2022/10/30  15:00:00',
                7: "",
            },
            {
                1: 'XXXXXXX',
                2: '用印申请',
                3: '',
                4: '往往',
                5: '',
                6: '2022/10/30  15:00:00',
                7: "",
            },
            {
                1: 'XXXXXXX',
                2: '用印申请',
                3: '',
                4: '往往',
                5: '',
                6: '2022/10/30  15:00:00',
                7: "",
            },
            {
                1: 'XXXXXXX',
                2: '用印申请',
                3: '',
                4: '往往',
                5: '',
                6: '2022/10/30  15:00:00',
                7: "",
            },
            {
                1: 'XXXXXXX',
                2: '用印申请',
                3: '',
                4: '往往',
                5: '',
                6: '2022/10/30  15:00:00',
                7: "",
            },
        ],
        // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
        defaultAttribute: {
            stripe: true,
            "header-cell-style": {
                background: "var(--color-fill--3)",
            },
            "cell-style": ({ row, column, rowIndex, columnIndex }) => {
                // console.log({ row, column, rowIndex, columnIndex });
                if (column.property == "2") {
                    return {
                        "color": "var(--Info-6)",
                        "cursor": "pointer",
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
            amount: 400,
            index: 1,
            pageNumber: 80,
        },
        // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
        defaultAttribute: {
            layout: "sizes, prev, pager, next, jumper",
            total: 500,
            'page-sizes': [10, 100, 200, 300, 400],
            background: true,
        }
    },
    componentsBreadcrumb: {
        data: [
            {
                name: "ceshi",
            },
            {
                name: "ceshi",
            }
        ],
        // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
        defaultAttribute: {
            separator: "/",
        }
    },
    componentsDocumentsDetails: {
        show: false,
        visible: [
            {
                label: '用印详情',
                name: "Details-of-Printing",
            },
            {
                label: '审批流程',
                name: "approval-process",
            },
            {
                label: '操作记录',
                name: "operating-record",
            },
            {
                label: '领用记录',
                name: "Record-of-requisition",
            },
        ],
    },
    activeName:1,
});
// 点击表格单元格
function cellClick(row, column, cell, event) {
    // console.log(row, column, cell, event);
    if (column.property == "2") {
        state.componentsDocumentsDetails.show = true;
    }
}
//点击关闭详情
function clickClose() {
    state.componentsDocumentsDetails.show = false;
}

// 切换分页
function tabChange(activeName) {
    state.activeName = activeName;
    // console.log(activeName);
    if (activeName == "1") {
        state.componentsTable.header = [{
            width: 50,
            type: "selection"
        }, {
            prop: '0',
            label: "序号",
            width: 100,
        }, {
            prop: '1',
            label: "单据编号",
            sortable: true,
            "min-width": 150,
        }, {
            prop: '2',
            label: "单据名称",
            sortable: true,
            "min-width": 150,
        }, {
            prop: '3',
            label: "用印文件类型",
            sortable: true,
            "min-width": 150,
        }, {
            prop: '4',
            label: "申请人",
            sortable: true,
            "min-width": 150,
        }, {
            prop: '5',
            label: "申请部门",
            sortable: true,
            "min-width": 150,
        }, {
            prop: '6',
            label: "申请时间",
            sortable: true,
            "min-width": 150,
        }, {
            prop: 'caozuo',
            label: "操作",
            fixed: "right",
            "min-width": 150,
            rankDisplayData: [{
                name: "上传文件核验"
            },],
        }]
        state.componentsTable.data = [
            {
                1: 'XXXXXXX',
                2: '用印申请',
                3: '',
                4: '往往',
                5: '',
                6: '2022/10/30  15:00:00',
                7: "",
            },
            {
                1: 'XXXXXXX',
                2: '用印申请',
                3: '',
                4: '往往',
                5: '',
                6: '2022/10/30  15:00:00',
                7: "",
            },
            {
                1: 'XXXXXXX',
                2: '用印申请',
                3: '',
                4: '往往',
                5: '',
                6: '2022/10/30  15:00:00',
                7: "",
            },
            {
                1: 'XXXXXXX',
                2: '用印申请',
                3: '',
                4: '往往',
                5: '',
                6: '2022/10/30  15:00:00',
                7: "",
            },
            {
                1: 'XXXXXXX',
                2: '用印申请',
                3: '',
                4: '往往',
                5: '',
                6: '2022/10/30  15:00:00',
                7: "",
            },
            {
                1: 'XXXXXXX',
                2: '用印申请',
                3: '',
                4: '往往',
                5: '',
                6: '2022/10/30  15:00:00',
                7: "",
            },
            {
                1: 'XXXXXXX',
                2: '用印申请',
                3: '',
                4: '往往',
                5: '',
                6: '2022/10/30  15:00:00',
                7: "",
            },
        ];
    } else if (activeName == "2") {
        state.componentsTable.header = [{
            width: 50,
            type: "selection"
        }, {
            prop: '0',
            label: "序号",
            width: 100,
        }, {
            prop: '1',
            label: "单据编号",
            sortable: true,
            "min-width": 150,
        }, {
            prop: '2',
            label: "单据名称",
            sortable: true,
            "min-width": 150,
        }, {
            prop: '3',
            label: "用印文件类型",
            sortable: true,
            "min-width": 150,
        },
        {
            prop: '3',
            label: "用印文件类型",
            sortable: true,
            "min-width": 150,
        },
        {
            prop: '7',
            label: "用印文件份数",
            sortable: true,
            "min-width": 150,
        },
        {
            prop: '8',
            label: "已核验文件数",
            sortable: true,
            "min-width": 150,
        },
        {
            prop: '9',
            label: "最新一次核验时间",
            sortable: true,
            "min-width": 200,
        }, {
            prop: '5',
            label: "申请部门",
            sortable: true,
            "min-width": 150,
        }, {
            prop: '6',
            label: "申请时间",
            sortable: true,
            "min-width": 150,
        }, {
            prop: 'caozuo',
            label: "操作",
            fixed: "right",
            "min-width": 250,
            rankDisplayData: [
                {
                    name: "上传文件核验"
                },
                {
                    name: "查看核验记录"
                },
            ],
        }]
        state.componentsTable.data = [
            {
                1: 'XXXXXXX',
                2: '用印申请',
                3: '',
                4: '往往',
                5: '',
                6: '2022/10/30  15:00:00',
                7: "",
            },
            {
                1: 'XXXXXXX',
                2: '用印申请',
                3: '',
                4: '往往',
                5: '',
                6: '2022/10/30  15:00:00',
                7: "",
            },
            {
                1: 'XXXXXXX',
                2: '用印申请',
                3: '',
                4: '往往',
                5: '',
                6: '2022/10/30  15:00:00',
                7: "",
            },
            {
                1: 'XXXXXXX',
                2: '用印申请',
                3: '',
                4: '往往',
                5: '',
                6: '2022/10/30  15:00:00',
                7: "",
            },
            {
                1: 'XXXXXXX',
                2: '用印申请',
                3: '',
                4: '往往',
                5: '',
                6: '2022/10/30  15:00:00',
                7: "",
            },
            {
                1: 'XXXXXXX',
                2: '用印申请',
                3: '',
                4: '往往',
                5: '',
                6: '2022/10/30  15:00:00',
                7: "",
            },
            {
                1: 'XXXXXXX',
                2: '用印申请',
                3: '',
                4: '往往',
                5: '',
                6: '2022/10/30  15:00:00',
                7: "",
            },
        ];
    } else if (activeName == "3") {
        state.componentsTable.header = [{
            width: 50,
            type: "selection"
        }, {
            prop: '0',
            label: "序号",
            width: 100,
        }, {
            prop: '1',
            label: "单据编号",
            sortable: true,
            "min-width": 150,
        }, {
            prop: '2',
            label: "单据名称",
            sortable: true,
            "min-width": 150,
        },
        {
            prop: '3',
            label: "用印文件类型",
            sortable: true,
            "min-width": 150,
        },
        {
            prop: '7',
            label: "最新一次核验时间",
            sortable: true,
            "min-width": 200,
        },
        {
            prop: '8',
            label: "核验结果",
            sortable: true,
            "min-width": 150,
        },
        {
            prop: '4',
            label: "申请人",
            sortable: true,
            "min-width": 150,
        }, {
            prop: '5',
            label: "申请部门",
            sortable: true,
            "min-width": 150,
        }, {
            prop: '6',
            label: "申请时间",
            sortable: true,
            "min-width": 150,
        }, {
            prop: 'caozuo',
            label: "操作",
            fixed: "right",
            "min-width": 250,
            rankDisplayData: [
                {
                    name: "重传文件核验"
                },
                {
                    name: "查看核验记录"
                },
            ],
        }]
        state.componentsTable.data = [
            {
                1: 'XXXXXXX',
                2: '用印申请',
                3: '',
                4: '往往',
                5: '',
                6: '2022/10/30  15:00:00',
                7: "",
                8: "有差异",
            },
            {
                1: 'XXXXXXX',
                2: '用印申请',
                3: '',
                4: '往往',
                5: '',
                6: '2022/10/30  15:00:00',
                7: "",
            },
            {
                1: 'XXXXXXX',
                2: '用印申请',
                3: '',
                4: '往往',
                5: '',
                6: '2022/10/30  15:00:00',
                7: "",
            },
            {
                1: 'XXXXXXX',
                2: '用印申请',
                3: '',
                4: '往往',
                5: '',
                6: '2022/10/30  15:00:00',
                7: "",
            },
            {
                1: 'XXXXXXX',
                2: '用印申请',
                3: '',
                4: '往往',
                5: '',
                6: '2022/10/30  15:00:00',
                7: "",
            },
            {
                1: 'XXXXXXX',
                2: '用印申请',
                3: '',
                4: '往往',
                5: '',
                6: '2022/10/30  15:00:00',
                7: "",
            },
            {
                1: 'XXXXXXX',
                2: '用印申请',
                3: '',
                4: '往往',
                5: '',
                6: '2022/10/30  15:00:00',
                7: "",
            },
        ];
    }
}
//点击表格按钮
function customClick(row, column, cell, event) {
    if (cell.name === '上传文件核验') {
        // ElMessageBox.confirm(
        //     '请问确认要取消水印验证吗？',
        //     '取消水印验证',
        //     {
        //         confirmButtonText: '确定',
        //         cancelButtonText: '取消',
        //         type: 'warning',
        //     }
        // )
        //     .then(() => {
                
        //     })
    }
    if(cell.name === '查看核验记录'){
        router.push({
            path: "/frontDesk/PrintControlManagement/File-checkRecord/OcrCheckRecord",
            query:{
                record:`pre${state.activeName}`
            }
        })
    }
}
onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)

})
onMounted(() => {
    // console.log(`the component is now mounted.`)
})
</script>
<style lang='scss' scoped>
.PrintControlManagement-UsePrepressVerification {
    margin: 0%;

    .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

}
</style>