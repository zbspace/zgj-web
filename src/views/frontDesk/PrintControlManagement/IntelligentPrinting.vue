<!-- 智能用印 -->
<template>
    <div class="PrintControlManagement-IntelligentPrinting">
        <componentsLayout Layout="title,tabs,searchForm,table,pagination,batch">
            <template #title>
                <div class="title">
                    <div>智能用印</div>
                    <div>
                        <el-button>
                            <img class="button-icon" src="../../../assets/svg/gengduo-caozuo.svg" alt="" srcset="">
                            <span>更多操作</span>
                        </el-button>
                    </div>
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
                    <el-button>批量操作</el-button>
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
import componentsTable from "../../components/table"
import componentsSearchForm from "../../components/searchForm"
import componentsPagination from "../../components/pagination.vue"
import componentsTabs from "../../components/tabs.vue"
import componentsLayout from "../../components/Layout.vue"
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
            label: '待智能用印',
            name: "1",
        }, {
            label: '智能用印中',
            name: "2",
        }, {
            label: '已完成用印',
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
                    placeholder: "盖章码/申请人员/文件名称",
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
            {
                id: 'derivable',
                label: "所属部门",
                type: "derivable",
                // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
                defaultAttribute: {
                    placeholder: "+选择部门",
                },
            },
            {
                id: 'shenqingr',
                label: "用印状态",
                type: "radioButton",
                data: [
                    {
                        name: "审批已完成",
                    },
                    {
                        name: "智能用印中",
                    }
                ]
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
            label: "使用印章",
            sortable: true,
            "min-width": 150,
        }, {
            prop: '4',
            label: "盖章码",
            sortable: true,
            "min-width": 150,
        }, {
            prop: '5',
            label: "申请盖章次数",
            sortable: true,
            "min-width": 150,
        }, {
            prop: '6',
            label: "实际盖章次数",
            sortable: true,
            "min-width": 150,
        }, {
            prop: '7',
            width: 100,
            label: "申请人",
            sortable: true,
            "min-width": 150,
        }, {
            prop: '8',
            label: "申请部门",
            sortable: true,
            "min-width": 150,
        }, {
            prop: '9',
            label: "申请时间",
            sortable: true,
            "min-width": 150,
        }, {
            prop: '10',
            label: "用印状态",
            sortable: true,
            "min-width": 150,
        }, {
            prop: 'caozuo',
            label: "操作",
            fixed: "right",
            "min-width": 150,
            width: 180,
            rankDisplayData: [{
                name: "申请转办"
            }, {
                name: "申请重置"
            },{
                name: "撤销转办"
            },{
                name: "撤销重置"
            },],
        }],
        data: [
            {
                1: 'XXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '',
                6: '',
                7: '往往',
                8: '',
                9: '2022/10/30  15:00:00',
                10: '',
            },
            {
                1: 'XXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '',
                6: '',
                7: '往往',
                8: '',
                9: '2022/10/30  15:00:00',
                10: '',
            },
            {
                1: 'XXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '',
                6: '',
                7: '往往',
                8: '',
                9: '2022/10/30  15:00:00',
                10: '',
            },
            {
                1: 'XXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '',
                6: '',
                7: '往往',
                8: '',
                9: '2022/10/30  15:00:00',
                10: '',
            },
            {
                1: 'XXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '',
                6: '',
                7: '往往',
                8: '',
                9: '2022/10/30  15:00:00',
                10: '',
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
                label: '领用记录',
                name: "Record-of-requisition",
            },
            {
                label: '操作记录',
                name: "operating-record",
            },
        ],
    }
});
const goInnerPage = (path) => {
  router.push({
    path: path
  })
}
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

//点击表格按钮
function customClick(row, column, cell, event) {
    console.log(cell);
    if (cell.name === '申请转办') {
        goInnerPage('/frontDesk/transferApplication')
    }
    if (cell.name == '查看历史记录') {
        ElMessageBox.confirm(
            '请问确定要催办吗？',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }
        )
            .then(() => {

            })
    }
}

// 切换分页
function tabChange(activeName) {
    // console.log(activeName);
    if (activeName == "1") {
        state.componentsTable.header = [{
            width: 50,
            type: "selection"
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
            label: "使用印章",
            sortable: true,
            "min-width": 150,
        }, {
            prop: '4',
            label: "盖章码",
            sortable: true,
            "min-width": 150,
        }, {
            prop: '5',
            label: "申请盖章次数",
            sortable: true,
            "min-width": 150,
        }, {
            prop: '6',
            label: "实际盖章次数",
            sortable: true,
            "min-width": 150,
        }, {
            prop: '7',
            width: 100,
            label: "申请人",
            sortable: true,
            "min-width": 150,
        }, {
            prop: '8',
            label: "申请部门",
            sortable: true,
            "min-width": 150,
        }, {
            prop: '9',
            label: "申请时间",
            sortable: true,
            "min-width": 150,
        }, {
            prop: '10',
            label: "用印状态",
            sortable: true,
            "min-width": 150,
        }, {
            prop: 'caozuo',
            label: "操作",
            fixed: "right",
            "min-width": 150,
            width: 180,
            rankDisplayData: [{
                name: "申请转办"
            }, {
                name: "申请重置"
            },],
        }]
        state.componentsTable.data = [
            {
                1: 'XXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '',
                6: '',
                7: '往往',
                8: '',
                9: '2022/10/30  15:00:00',
                10: '',
            },
            {
                1: 'XXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '',
                6: '',
                7: '往往',
                8: '',
                9: '2022/10/30  15:00:00',
                10: '',
            },
            {
                1: 'XXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '',
                6: '',
                7: '往往',
                8: '',
                9: '2022/10/30  15:00:00',
                10: '',
            },
            {
                1: 'XXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '',
                6: '',
                7: '往往',
                8: '',
                9: '2022/10/30  15:00:00',
                10: '',
            },
            {
                1: 'XXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '',
                6: '',
                7: '往往',
                8: '',
                9: '2022/10/30  15:00:00',
                10: '',
            },

        ];
    } else if (activeName == "2") {
        state.componentsTable.header = [{
            width: 50,
            type: "selection"
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
            label: "印章名称",
            sortable: true,
            "min-width": 150,
        }, {
            prop: '4',
            label: "盖章码",
            sortable: true,
            "min-width": 150,
        }, {
            prop: '5',
            label: "申请盖章次数",
            sortable: true,
            "min-width": 150,
        }, {
            prop: '6',
            label: "实际盖章次数",
            sortable: true,
            "min-width": 150,
        }, {
            prop: '7',
            width: 100,
            label: "申请人",
            sortable: true,
            "min-width": 150,
        }, {
            prop: '8',
            label: "申请部门",
            sortable: true,
            "min-width": 150,
        }, {
            prop: '9',
            label: "申请时间",
            sortable: true,
            "min-width": 150,
        }, {
            prop: '10',
            label: "用印状态",
            sortable: true,
            "min-width": 150,
        }, {
            prop: 'caozuo',
            label: "操作",
            fixed: "right",
            "min-width": 150,
            width: 180,
            rankDisplayData: [{
                name: "结束用印"
            }, {
                name: "申请重置"
            },],
        }]
        state.componentsTable.data = [
            {
                1: 'XXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '',
                6: '',
                7: '往往',
                8: '',
                9: '2022/10/30  15:00:00',
                10: '',
            },
            {
                1: 'XXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '',
                6: '',
                7: '往往',
                8: '',
                9: '2022/10/30  15:00:00',
                10: '',
            },
            {
                1: 'XXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '',
                6: '',
                7: '往往',
                8: '',
                9: '2022/10/30  15:00:00',
                10: '',
            },
            {
                1: 'XXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '',
                6: '',
                7: '往往',
                8: '',
                9: '2022/10/30  15:00:00',
                10: '',
            },
            {
                1: 'XXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '',
                6: '',
                7: '往往',
                8: '',
                9: '2022/10/30  15:00:00',
                10: '',
            },

        ];
    } else if (activeName == "3") {
        state.componentsTable.header = [{
            width: 50,
            type: "selection"
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
            label: "印章名称",
            sortable: true,
            "min-width": 150,
        }, {
            prop: '4',
            label: "盖章码",
            sortable: true,
            "min-width": 150,
        }, {
            prop: '5',
            label: "申请盖章次数",
            sortable: true,
            "min-width": 150,
        }, {
            prop: '6',
            label: "实际盖章次数",
            sortable: true,
            "min-width": 150,
        }, {
            prop: '7',
            width: 100,
            label: "申请人",
            sortable: true,
            "min-width": 150,
        }, {
            prop: '8',
            label: "申请部门",
            sortable: true,
            "min-width": 150,
        }, {
            prop: '9',
            label: "申请时间",
            sortable: true,
            "min-width": 150,
        }, {
            prop: '10',
            label: "用印状态",
            sortable: true,
            "min-width": 150,
        }, {
            prop: 'caozuo',
            label: "操作",
            fixed: "right",
            "min-width": 150,
            width: 180,
            rankDisplayData: [
                {
                    name: "申请重置"
                },
            ],
        }]
        state.componentsTable.data = [
            {
                1: 'XXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '',
                6: '',
                7: '往往',
                8: '',
                9: '2022/10/30  15:00:00',
                10: '',
            },
            {
                1: 'XXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '',
                6: '',
                7: '往往',
                8: '',
                9: '2022/10/30  15:00:00',
                10: '',
            },
            {
                1: 'XXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '',
                6: '',
                7: '往往',
                8: '',
                9: '2022/10/30  15:00:00',
                10: '',
            },
            {
                1: 'XXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '',
                6: '',
                7: '往往',
                8: '',
                9: '2022/10/30  15:00:00',
                10: '',
            },
            {
                1: 'XXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '',
                6: '',
                7: '往往',
                8: '',
                9: '2022/10/30  15:00:00',
                10: '',
            },

        ];
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
.PrintControlManagement-IntelligentPrinting {
    margin: 0%;

    .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

}
</style>