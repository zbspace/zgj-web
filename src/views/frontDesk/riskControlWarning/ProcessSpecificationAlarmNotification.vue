<!-- 流程规范告警提醒 -->
<template>
    <div class="PrintControlManagement-ProcessSpecificationAlarmNotification">
        <componentsLayout Layout="title,searchForm,table,pagination">
            <template #title>
                <div class="title">
                    <div>流程规范告警提醒</div>
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
                    <el-button>批量操作</el-button>
                    <el-button>批量操作</el-button>
                    <el-button>批量操作</el-button>
                    <el-button>批量操作</el-button>
                </div>
            </template>
            <template #tree>
                <div>
                    <componentsTree :data="state.componentsTree.data"
                        :defaultAttribute="state.componentsTree.defaultAttribute">
                    </componentsTree>
                </div>
            </template>
            <template #table>
                <div>
                    <componentsTable :defaultAttribute="state.componentsTable.defaultAttribute"
                        :data="state.componentsTable.data" :header="state.componentsTable.header" :isSelection="true">
                    </componentsTable>
                </div>
            </template>
            <template #pagination>
                <componentsPagination :data="state.componentsPagination.data"
                    :defaultAttribute="state.componentsPagination.defaultAttribute">
                </componentsPagination>
            </template>
        </componentsLayout>
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
                label: "用印单据名称",
                type: "input",
                inCommonUse: true,
                // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
                defaultAttribute: {
                    placeholder: "请输入",
                },
            },
            {
                id: 'picker',
                label: "关键词",
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
                id: 'select',
                label: "文件类型",
                type: "select",
                // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
                defaultAttribute: {
                    placeholder: "请输入",
                },
            },
            {
                id: 'shenqingr',
                label: "申请人",
                type: "input",
                // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
                defaultAttribute: {
                    placeholder: "请输入",
                },
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
                label: "用印单据名称",
                sortable: true,
                "min-width":150,
            }, {
                prop: '2',
                label: "文件类型",
                sortable: true,
                "min-width":150,
            }, {
                prop: '3',
                label: "申请人",
                sortable: true,
                "min-width":150,
            }, {
                prop: '4',
                label: "申请部门",
                sortable: true,
                "min-width":150,
            }, {
                prop: '5',
                label: "申请时间",
                sortable: true,
                "min-width":150,
            }, {
                prop: '6',
                label: "操作时间",
                sortable: true,
                "min-width":150,
            }, {
                prop: '7',
                label: "未用印时长",
                sortable: true,
                "min-width":150,
            }, {
                prop: '8',
                label: "处理状态",
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
                        name: "处理"
                    },

                ],
            }],
        data: [
            {
                1: '',
                2: '',
                3: '往往',
                4: '',
                5: '2022/10/30  15:00:00',
                6: '2022/10/30  15:00:00',
                7: '',
                8: '',
            },
            {
                1: '',
                2: '',
                3: '往往',
                4: '',
                5: '2022/10/30  15:00:00',
                6: '2022/10/30  15:00:00',
                7: '',
                8: '',
            },
            {
                1: '',
                2: '',
                3: '往往',
                4: '',
                5: '2022/10/30  15:00:00',
                6: '2022/10/30  15:00:00',
                7: '',
                8: '',
            },
            {
                1: '',
                2: '',
                3: '往往',
                4: '',
                5: '2022/10/30  15:00:00',
                6: '2022/10/30  15:00:00',
                7: '',
                8: '',
            },
            {
                1: '',
                2: '',
                3: '往往',
                4: '',
                5: '2022/10/30  15:00:00',
                6: '2022/10/30  15:00:00',
                7: '',
                8: '',
            },
            {
                1: '',
                2: '',
                3: '往往',
                4: '',
                5: '2022/10/30  15:00:00',
                6: '2022/10/30  15:00:00',
                7: '',
                8: '',
            },
        ],
        // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
        defaultAttribute: {
            stripe: true,
            "header-cell-style": {
                background: "var(--color-fill--3)",
            }
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
    }
});

onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)

})
onMounted(() => {
    // console.log(`the component is now mounted.`)
})
</script>
<style lang='scss' scoped>
.PrintControlManagement-ProcessSpecificationAlarmNotification {
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