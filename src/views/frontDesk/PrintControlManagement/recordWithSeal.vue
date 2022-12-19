<!-- 用印记录 -->
<template>
    <div class="PrintControlManagement-recordWithSeal">
        <componentsLayout Layout="title,tabs,searchForm,table,pagination,batch">
            <template #title>
                <div class="title">
                    <div>用印记录</div>
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
import Layout from "../../../layouts/main.vue";
import componentsTable from "../../components/table"
import componentsSearchForm from "../../components/searchForm"
import componentsTree from "../../components/tree"
import componentsBreadcrumb from "../../components/breadcrumb"
import componentsPagination from "../../components/pagination.vue"
import componentsTabs from "../../components/tabs.vue"
import componentsLayout from "../../components/Layout.vue"
import componentsDocumentsDetails from "../../components/documentsDetails.vue"
import { ElMessage,ElMessageBox } from 'element-plus'
// import { ConsoleWriter } from "istanbul-lib-report";
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
            label: '待审批',
            name: "1",
        }, {
            label: '待文件核验',
            name: "2",
        }, {
            label: '待智能用印',
            name: "3",
        }, {
            label: '智能用印中',
            name: "4",
        }, {
            label: '已完成用印',
            name: "5",
        }, {
            label: '待上传文件归档',
            name: "6",
        }, {
            label: '已完成归档',
            name: "7",
        }, {
            label: '不可用',
            name: "8",
        },]
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
                    placeholder: "文件名称/申请人/用印编码",
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
                id: 'wjlx',
                label: "文件类型",
                type: "select",
                options: [
                    {
                        label: "归档强制",
                        value: "1",
                    },
                    {
                        label: "审批测试",
                        value: "2",
                    },
                    {
                        label: "测试审批",
                        value: "3",
                    },
                    {
                        label: "中安全+移动侦测",
                        value: "4",
                    },
                    {
                        label: "中安全+骑缝",
                        value: "4",
                    },
                    {
                        label: "白板",
                        value: "4",
                    },
                    {
                        label: "中安全+远程+视频+盖后+限次",
                        value: "4",
                    },
                    {
                        label: "中安全-多组合",
                        value: "4",
                    },
                    {
                        label: "中安全--",
                        value: "4",
                    },
                    {
                        label: "中安全-盖后",
                        value: "4",
                    },

                ]
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
                id: 'derivable',
                label: "当前审批人",
                type: "derivable",
                // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
                defaultAttribute: {
                    placeholder: "+请选择",
                },
            },
            {
                id: 'derivable',
                label: "往来单位",
                type: "derivable",
                // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
                defaultAttribute: {
                    placeholder: "+往来单位",
                },
            },
            {
                id: 'derivable',
                label: "选择印章",
                type: "derivable",
                // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
                defaultAttribute: {
                    placeholder: "+选择印章",
                },
            },
            {
                id: 'shenqingr',
                label: "门户推送状态",
                type: "radioButton",
                data: [
                    {
                        name: "推送异常",
                    },
                    {
                        name: "推送正常",
                    }
                ]
            },
            {
                id: 'shenqingr',
                label: "审批状态",
                type: "radioButton",
                data: [
                    {
                        name: "未送审",
                    },
                    {
                        name: "审批中",
                    },
                    {
                        name: "已退回",
                    },
                    {
                        name: "已撤销",
                    },
                    {
                        name: "已通过",
                    }
                ]
            },
            {
                id: 'shenqingr',
                label: "盖章状态",
                type: "checkButton",
                data: [
                    {
                        name: "不可用      ",
                    },
                    {
                        name: "未用印自动退回",
                    },
                    {
                        name: "待智能用印",
                    },
                    {
                        name: "智能用印中",
                    },
                    {
                        name: "待上传文件归档",
                    },
                    {
                        name: "已上传智能用印",
                    },
                    {
                        name: "已上传文件归档",
                    }
                ]
            },
            {
                id: 'shenqingr',
                label: "用印状态",
                type: "radioButton",
                data: [
                    {
                        name: "正常",
                    },
                    {
                        name: "异常",
                    }
                ]
            },
            {
                id: 'wdyy',
                label: "我的用印",
                type: "checkbox",
                checkbox: [{
                    // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
                    defaultAttribute: {
                        label: "只显示我的用印"
                    },
                    style: {

                    }
                }]
            },
            {
                id: 'wdyy',
                label: "印章外带",
                type: "checkbox",
                checkbox: [{
                    // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
                    defaultAttribute: {
                        label: "是"
                    },
                    style: {

                    }
                }]
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
        header: [
            {
                width: 50,
                type: "selection"
            },
            {
                prop: '0',
                label: "序号",
                width: 100,
            }, {
                prop: '1',
                label: "单据编号",
                sortable: true,
                "min-width":150,
            }, {
                prop: '2',
                label: "文件名称",
                sortable: true,
                "min-width":150,
            }, {
                prop: '3',
                label: "文件类型",
                sortable: true,
                "min-width":150,
            }, {
                prop: '4',
                label: "印章名称",
                sortable: true,
                "min-width":150,
            }, {
                prop: '5',
                label: "申请人",
                sortable: true,
                "min-width":150,
            },
            {
                prop: '6',
                label: "申请部门",
                sortable: true,
                "min-width":150,
            },
            {
                prop: '7',
                label: "申请时间",
                sortable: true,
                "min-width":150,
            },
            {
                prop: '6',
                label: "审批状态",
                sortable: true,
                "min-width":150,
            },
            {
                prop: 'caozuo',
                label: "操作",
                fixed:"right",
                "min-width":150,
                rankDisplayData: [
                    {
                        name: "撤销"
                    },
                    {
                        name: "作废"
                    },
                ],
            }],
        data: [
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "",
            },
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "",
            },
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "",
            },
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "",
            },
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "",
            },
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "",
            },
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "",
            },
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "",
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
// 点击表格单元格
function cellClick(row, column, cell, event) {
    // console.log(row, column, cell, event);
    if (column.property == "2") {
        state.componentsDocumentsDetails.show = true;
    }
}
//点击表格按钮
function customClick(row, column, cell, event) {
    if (cell.name === '撤销') {
        ElMessageBox.confirm(
            '撤销后本次申请送审将被取消，请问确定要撤销吗？',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }
        )
            .then(() => {
                
            })
    }
    if (cell.name == '作废') {
        ElMessageBox.confirm(
            '作废后当前记录将从当前表格中消失，请问确定要作废吗？',
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
//点击关闭详情
function clickClose() {
    state.componentsDocumentsDetails.show = false;
}

// 切换分页
function tabChange(activeName) {
    // console.log(activeName);
    if (activeName == "1") {
        state.componentsTable.header = [
            {
                width: 50,
                type: "selection"
            },
            {
                prop: '0',
                label: "序号",
                width: 100,
            }, {
                prop: '1',
                label: "单据编号",
                sortable: true,
                "min-width":150,
            }, {
                prop: '2',
                label: "文件名称",
                sortable: true,
                "min-width":150,
            }, {
                prop: '3',
                label: "文件类型",
                sortable: true,
                "min-width":150,
            }, {
                prop: '4',
                label: "印章名称",
                sortable: true,
                "min-width":150,
            }, {
                prop: '5',
                label: "申请人",
                sortable: true,
                "min-width":150,
            },
            {
                prop: '6',
                label: "申请部门",
                sortable: true,
                "min-width":150,
            },
            {
                prop: '7',
                label: "申请时间",
                sortable: true,
                "min-width":150,
            },
            {
                prop: '6',
                label: "审批状态",
                sortable: true,
                "min-width":150,
            },
            {
                prop: 'caozuo',
                label: "操作",
                fixed:"right",
                "min-width":150,
                rankDisplayData: [
                    {
                        name: "撤销"
                    },
                    {
                        name: "作废"
                    },
                ],
            }
        ]
        state.componentsTable.data = [
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "",
            },
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "",
            },
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "",
            },
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "",
            },
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "",
            },
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "",
            },
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "",
            },
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "",
            },
        ];
    } else if (activeName == "2" || activeName == "3") {
        state.componentsTable.header = [
            {
                width: 50,
                type: "selection"
            },
            {
                prop: '0',
                label: "序号",
                width: 100,
            }, {
                prop: '1',
                label: "单据编号",
                sortable: true,
                "min-width":150,
            }, {
                prop: '2',
                label: "文件名称",
                sortable: true,
                "min-width":150,
            }, {
                prop: '3',
                label: "文件类型",
                sortable: true,
                "min-width":150,
            }, {
                prop: '4',
                label: "印章名称",
                sortable: true,
                "min-width":150,
            }, {
                prop: '5',
                label: "申请人",
                sortable: true,
                "min-width":150,
            },
            {
                prop: '6',
                label: "申请部门",
                sortable: true,
                "min-width":150,
            },
            {
                prop: '7',
                label: "申请时间",
                sortable: true,
                "min-width":150,
            },
            {
                prop: '6',
                label: "审批状态",
                sortable: true,
                "min-width":150,
            },
            {
                prop: '8',
                label: "用印状态",
                sortable: true,
                "min-width":150,
            },
            {
                prop: 'caozuo',
                label: "操作",
                fixed:"right",
                "min-width":250,
                rankDisplayData: [
                    {
                        name: "流程终止"
                    },
                    {
                        name: "解除用印限制"
                    },
                    {
                        name: "作废"
                    },
                ],
            }
        ]
        state.componentsTable.data = [
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "",
            },
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "",
            },
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "",
            },
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "",
            },
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "",
            },
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "",
            },
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "",
            },
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "",
            },
        ];
    } else if (activeName == "4") {
        state.componentsTable.header = [
            {
                width: 50,
                type: "selection"
            },
            {
                prop: '0',
                label: "序号",
                width: 100,
            }, {
                prop: '1',
                label: "单据编号",
                sortable: true,
                "min-width":150,
            }, {
                prop: '2',
                label: "文件名称",
                sortable: true,
                "min-width":150,
            }, {
                prop: '3',
                label: "文件类型",
                sortable: true,
                "min-width":150,
            }, {
                prop: '4',
                label: "印章名称",
                sortable: true,
                "min-width":150,
            }, {
                prop: '5',
                label: "申请人",
                sortable: true,
                "min-width":150,
            },
            {
                prop: '6',
                label: "申请部门",
                sortable: true,
                "min-width":150,
            },
            {
                prop: '7',
                label: "申请时间",
                sortable: true,
                "min-width":150,
            },
            {
                prop: '8',
                label: "用印状态",
                sortable: true,
                "min-width":150,
            },
            {
                prop: 'caozuo',
                label: "操作",
                fixed:"right",
                "min-width":250,
                rankDisplayData: [
                    {
                        name: "流程终止"
                    },
                    {
                        name: "解除用印限制"
                    },
                    {
                        name: "作废"
                    },
                ],
            }
        ]
        state.componentsTable.data = [
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "",
            },
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "",
            },
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "",
            },
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "",
            },
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "",
            },
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "",
            },
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "",
            },
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "",
            },
        ];
    } else if (activeName == "5") {
        state.componentsTable.header = [
            {
                width: 50,
                type: "selection"
            },
            {
                prop: '0',
                label: "序号",
                width: 100,
            }, {
                prop: '1',
                label: "单据编号",
                sortable: true,
                "min-width":150,
            }, {
                prop: '2',
                label: "文件名称",
                sortable: true,
                "min-width":150,
            }, {
                prop: '3',
                label: "文件类型",
                sortable: true,
                "min-width":150,
            }, {
                prop: '4',
                label: "印章名称",
                sortable: true,
                "min-width":150,
            }, {
                prop: '5',
                label: "申请人",
                sortable: true,
                "min-width":150,
            },
            {
                prop: '6',
                label: "申请部门",
                sortable: true,
                "min-width":150,
            },
            {
                prop: '7',
                label: "申请时间",
                sortable: true,
                "min-width":150,
            },
            {
                prop: '8',
                label: "用印状态",
                sortable: true,
                "min-width":150,
            },
            {
                prop: '9',
                label: "用印情况",
                sortable: true,
                "min-width":150,
            },
            {
                prop: 'caozuo',
                label: "操作",
                fixed:"right",
                "min-width":150,
                rankDisplayData: [
                    {
                        name: "复核"
                    },
                    {
                        name: "作废"
                    },
                ],
            }
        ]
        state.componentsTable.data = [
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "已完成用印",
                9: "正常",
            },
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "待上传文件归档",
                9: "正常",
            },
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "",
            },
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "",
            },
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "",
            },
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "",
            },
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "",
            },
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "",
            },
        ];
    } else if (activeName == "6") {
        state.componentsTable.header = [
            {
                width: 50,
                type: "selection"
            },
            {
                prop: '0',
                label: "序号",
                width: 100,
            }, {
                prop: '1',
                label: "单据编号",
                sortable: true,
                "min-width":150,
            }, {
                prop: '2',
                label: "文件名称",
                sortable: true,
                "min-width":150,
            }, {
                prop: '3',
                label: "文件类型",
                sortable: true,
                "min-width":150,
            }, {
                prop: '4',
                label: "印章名称",
                sortable: true,
                "min-width":150,
            }, {
                prop: '5',
                label: "申请人",
                sortable: true,
                "min-width":150,
            },
            {
                prop: '6',
                label: "申请部门",
                sortable: true,
                "min-width":150,
            },
            {
                prop: '7',
                label: "申请时间",
                sortable: true,
                "min-width":150,
            },
            {
                prop: '8',
                label: "用印状态",
                sortable: true,
                "min-width":150,
            },
            {
                prop: '9',
                label: "用印情况",
                sortable: true,
                "min-width":150,
            },
            {
                prop: 'caozuo',
                label: "操作",
                fixed:"right",
                "min-width":200,
                rankDisplayData: [
                    {
                        name: "流程终止"
                    },
                    {
                        name: "复核"
                    },
                    {
                        name: "作废"
                    },
                ],
            }
        ]
        state.componentsTable.data = [
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "已完成用印",
                9: "正常",
            },
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "待上传文件归档",
                9: "正常",
            },
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "",
            },
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "",
            },
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "",
            },
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "",
            },
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "",
            },
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "",
            },
        ];
    } else if (activeName == "7") {
        state.componentsTable.header = [
            {
                width: 50,
                type: "selection"
            },
            {
                prop: '0',
                label: "序号",
                width: 100,
            }, {
                prop: '1',
                label: "单据编号",
                sortable: true,
                "min-width":150,
            }, {
                prop: '2',
                label: "文件名称",
                sortable: true,
                "min-width":150,
            }, {
                prop: '3',
                label: "文件类型",
                sortable: true,
                "min-width":150,
            }, {
                prop: '4',
                label: "印章名称",
                sortable: true,
                "min-width":150,
            }, {
                prop: '5',
                label: "申请人",
                sortable: true,
                "min-width":150,
            },
            {
                prop: '6',
                label: "申请部门",
                sortable: true,
                "min-width":150,
            },
            {
                prop: '7',
                label: "申请时间",
                sortable: true,
                "min-width":150,
            },
            {
                prop: '8',
                label: "用印状态",
                sortable: true,
                "min-width":150,
            },
            {
                prop: '9',
                label: "用印情况",
                sortable: true,
                "min-width":150,
            },
            {
                prop: 'caozuo',
                label: "操作",
                fixed:"right",
                "min-width":150,
                rankDisplayData: [
                    {
                        name: "复核"
                    },
                    {
                        name: "作废"
                    },
                ],
            }
        ]
        state.componentsTable.data = [
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "",
                9: "正常",
            },
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "",
                9: "正常",
            },
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "",
            },
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "",
            },
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "",
            },
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "",
            },
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "",
            },
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "",
            },
        ];
    }  else if (activeName == "8") {
        state.componentsTable.header = [
            {
                width: 50,
                type: "selection"
            },
            {
                prop: '0',
                label: "序号",
                width: 100,
            }, {
                prop: '1',
                label: "单据编号",
                sortable: true,
                "min-width":150,
            }, {
                prop: '2',
                label: "文件名称",
                sortable: true,
                "min-width":150,
            }, {
                prop: '3',
                label: "文件类型",
                sortable: true,
                "min-width":150,
            }, {
                prop: '4',
                label: "印章名称",
                sortable: true,
                "min-width":150,
            }, {
                prop: '5',
                label: "申请人",
                sortable: true,
                "min-width":150,
            },
            {
                prop: '6',
                label: "申请部门",
                sortable: true,
                "min-width":150,
            },
            {
                prop: '7',
                label: "申请时间",
                sortable: true,
                "min-width":150,
            },
            {
                prop: '8',
                label: "审批状态",
                sortable: true,
                "min-width":150,
            },
            {
                prop: '9',
                label: "用印状态",
                sortable: true,
                "min-width":150,
            },
            {
                prop: 'caozuo',
                label: "操作",
                fixed:"right",
                "min-width":150,
                rankDisplayData: [
                    {
                        name: "去送审"
                    },
                    {
                        name: "作废"
                    },
                ],
            }
        ]
        state.componentsTable.data = [
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "已通过",
                9: "已失效",
            },
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "已退回",
                9: "未用印自动退回",
            },
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "未送审",
                9: "草稿",
            },
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "",
            },
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "",
            },
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "",
            },
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "",
            },
            {
                1: 'XXXXXXXXXX',
                2: '用印申请',
                3: '',
                4: '',
                5: '往往',
                6: '',
                7: '2022/10/30  15:00:00',
                8: "",
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
.PrintControlManagement-recordWithSeal {
    margin: 0%;

    .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .batch {
        display: flex;
        align-items: center;

        .batch-desc {
            @include mixin-margin-right(12)
        }
    }
}
</style>