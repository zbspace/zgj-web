<!-- 印章申请 -->
<template>
    <div class="PrintControlManagement-ApplicationForSeal">
        <componentsLayout Layout="title,searchForm,table,pagination,batch">
            <template #title>
                <div class="title">
                    <div>印章申请</div>
                    <div class="operate-menu">
                        <el-dropdown @command="handleCommand">
                            <el-button type="primary">+ 增加</el-button>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item command="刻章申请">刻章申请</el-dropdown-item>
                                    <el-dropdown-item command="变更申请">变更申请</el-dropdown-item>
                                    <el-dropdown-item command="停用申请">停用申请</el-dropdown-item>
                                    <el-dropdown-item command="启用申请">启用申请</el-dropdown-item>
                                    <el-dropdown-item command="销毁申请">销毁申请</el-dropdown-item>
                                    <el-dropdown-item command="换章申请">换章申请</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>

                        <el-button>
                            <img class="button-icon" src="../../../assets/svg/gengduo-caozuo.svg" alt="" srcset="">
                            <span>更多操作</span>
                        </el-button>
                    </div>
                </div>
            </template>
            <template #tabs>
                <div>
                    <componentsTabs activeName="1" :data="state.componentsTabs.data">
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
                    <el-button>批量撤销</el-button>
                    <el-button>批量催办</el-button>
                </div>
            </template>
            <template #table>
                <div>
                    <componentsTable :defaultAttribute="state.componentsTable.defaultAttribute"
                        :data="state.componentsTable.data" :header="state.componentsTable.header" @cellClick="cellClick"
                        @custom-click="customClick">
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
        <!-- 动态表单 - 印章申请 -->
        <KDialog @update:show="fromState.showDialog = $event" :show="fromState.showDialog" :title="fromState.title"
            :centerBtn="true" :confirmText="$t('t-zgj-operation.submit')" :concelText="$t('t-zgj-operation.cancel')"
            :width="1000" :height="600" @close="submitLibraryForm" :key="fromState.title">
            <v-form-render :form-json="fromState.formJson" :form-data="fromState.formJson"
                :option-data="fromState.optionData" :ref="fromState.vFormLibraryRef">
            </v-form-render>
        </KDialog>
    </div>
</template>
<script setup>
import { ref, reactive, defineProps, defineEmits, onBeforeMount, onMounted } from "vue"
import Layout from "../../../layouts/main.vue";
import componentsTable from "../../components/table"
import componentsSearchForm from "../../components/searchForm"
import componentsTree from "../../components/tree"
import componentsBreadcrumb from "../../components/breadcrumb"
import componentsPagination from "../../components/pagination.vue"
import componentsTabs from "../../components/tabs.vue"
import componentsLayout from "../../components/Layout.vue"
import componentsDocumentsDetails from "../../components/documentsDetails.vue"
import { ElMessage, ElMessageBox } from 'element-plus'
import StampApplicationJson from '@/views/addDynamicFormJson/StampApplication.json'
import StampChangeJson from '@/views/addDynamicFormJson/StampChange.json'

import KDialog from "@/views/components/modules/kdialog.vue"
const props = defineProps({
    // 处理类型
    type: {
        type: String,
        default: "0",
    },
})
// 印章申请 新增弹框
const fromState = reactive({
    title: '',
    formJson: StampApplicationJson,//动态表单内容
    optionData: null,
    vFormLibraryRef: "vFormLibraryRef",
    showDialog: false,
})
const vFormLibraryRef = ref(null)

const submitLibraryForm = (type) => {
    if (!type) {
        vFormLibraryRef.value.resetForm();
        return
    }
    vFormLibraryRef.value.getFormData().then(formData => {
        alert(JSON.stringify(formData))
        fromState.showDialog = false
    }).catch(error => {
        // Form Validation failed
        ElMessage.error(error)
    })
}
const emit = defineEmits([]);
const state = reactive({
    componentsTabs: {
        data: [{
            label: '待签章',
            name: "1",
        }, {
            label: '已签章',
            name: "2",
        }, {
            label: '不可用',
            name: "3",
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
                    placeholder: "编码/印章名称/申请人员",
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
                    "start-placeholder": "Start date",
                    "end-placeholder": "End date"
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
                    },
                    {
                        name: "已办理",
                    }
                ]
            },
            {
                id: 'shenqingr',
                label: "单据类型",
                type: "radioButton",
                data: [
                    {
                        name: "刻章申请",
                    },
                    {
                        name: "停用申请",
                    },
                    {
                        name: "销毁申请",
                    },
                    {
                        name: "启用申请",
                    },
                    {
                        name: "变更申请",
                    },
                    {
                        name: "换章申请",
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
                label: "单据编码",
                sortable: true,
            }, {
                prop: '2',
                label: "单据类型",
                sortable: true,
            }, {
                prop: '3',
                label: "印章名称",
                sortable: true,
            }, {
                prop: '4',
                label: "印章类型",
                sortable: true,
            }, {
                prop: '5',
                label: "审批状态",
                sortable: true,
            }, {
                prop: '6',
                label: "申请人",
                sortable: true,
            }, {
                prop: '7',
                label: "申请部门",
                sortable: true,
            }, {
                prop: '8',
                label: "申请时间",
                sortable: true,
            },
            {
                prop: 'caozuo',
                label: "操作",
                rankDisplayData: [
                    {
                        name: "撤销"
                    },
                    {
                        name: "催办"
                    },
                    {
                        name: "办理"
                    },
                    {
                        name: "修改"
                    },
                ],
            }],
        data: [
            {
                1: '',
                2: '',
                3: '印章',
                4: '',
                5: '审批中',
                6: '往往',
                7: '',
                8: '2022/10/30',
            },
            {
                1: '',
                2: '',
                3: '印章',
                4: '',
                5: '审批中',
                6: '往往',
                7: '',
                8: '2022/10/30',
            },
        ],
        // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
        defaultAttribute: {
            stripe: true,
            "header-cell-style": {
                background: "var(--color-fill--1)",
            },
            "cell-style": ({ row, column, rowIndex, columnIndex }) => {
                // console.log({ row, column, rowIndex, columnIndex });
                if (column.property == "3") {
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
                label: 'A层级菜单1',
                children: [
                    {
                        label: 'B层级菜单1',
                        children: [
                            {
                                label: 'C层级菜单1',
                            },
                        ],
                    },
                ],
            },
            {
                label: 'A层级菜单2',
                children: [
                    {
                        label: 'B层级菜单1',
                        children: [
                            {
                                label: 'C层级菜单1',
                            },
                        ],
                    },
                    {
                        label: 'B层级菜单2',
                        children: [
                            {
                                label: 'C层级菜单1',
                            },
                        ],
                    },
                ],
            },
            {
                label: 'A层级菜单3',
                children: [
                    {
                        label: 'B层级菜单1',
                        children: [
                            {
                                label: 'C层级菜单1',
                            },
                        ],
                    },
                    {
                        label: 'B层级菜单2',
                        children: [
                            {
                                label: 'C层级菜单1',
                            },
                        ],
                    },
                ],
            },
        ],
        // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
        defaultAttribute: {
            "check-on-click-node": true,
            "show-checkbox": false,
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
                label: '印章申请详情',
                name: "Seal-Application-Details",
            },
            {
                label: '审批流程',
                name: "approval-process",
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
    if (column.property == "3") {
        state.componentsDocumentsDetails.show = true;
    }
}
//点击关闭详情
function clickClose() {
    state.componentsDocumentsDetails.show = false;
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
    if (cell.name == '催办') {
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
function handleCommand(command) {
    console.log(command);
    fromState.title = command;
    fromState.showDialog = true;
    switch (command) {
        case '刻章申请':
            fromState.formJson = StampApplicationJson;
            break;
        case '变更申请':
            fromState.formJson = StampChangeJson;
            break;
        // case '停用申请':
        //     break;
        // case '启用申请':
        //     break;
        // case '销毁申请':
        //     break;
        // case '换章申请':
        //     break;
        default:
            fromState.formJson = StampApplicationJson;
            break;
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
.PrintControlManagement-ApplicationForSeal {
    margin: 0%;

    .title {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .operate-menu {
            display: flex;
            align-items: center;

            .el-dropdown {
                margin-right: 10px;
            }
        }
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