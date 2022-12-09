<!-- 处理任务 -->
<template>
    <div class="PrintControlManagement-handleTask">
        <componentsLayout Layout="title,tabs,searchForm,table,pagination">
            <template #title>
                <div class="title">
                    处理任务
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
            <!-- <template #tree>
                <div>
                    <componentsTree :data="state.componentsTree.data"
                        :defaultAttribute="state.componentsTree.defaultAttribute">
                    </componentsTree>
                </div>
            </template> -->
            <template #table>
                <div>
                    <componentsTable :defaultAttribute="state.componentsTable.defaultAttribute"
                        :data="state.componentsTable.data" :header="state.componentsTable.header"
                        :isSelection="true">
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
            label: '待处理',
            name: "1",
        }, {
            label: '已处理',
            name: "2",
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
                label: "任务单据名称",
                type: "input",
                inCommonUse: true,
                // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
                defaultAttribute: {
                    placeholder: "请输入",
                },
            },
            {
                id: 'select',
                label: "任务类型",
                type: "select",
                // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
                defaultAttribute: {
                    placeholder: "请输入",
                },
            },
            {
                id: 'shenqingr',
                label: "单据申请人",
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
                prop: '0',
                label: "序号",
                width: 100,
                sortable: true
            }, {
                prop: '1',
                label: "任务单据名称",
            }, {
                prop: '2',
                label: "任务类型",
            }, {
                prop: '3',
                label: "单据申请人",
            }, {
                prop: '4',
                label: "单据申请部门",
            }, {
                prop: '5',
                label: "任务生成时间",
            },
            {
                prop: 'caozuo',
                label: "操作",
                rankDisplayData: [
                    {
                        name: "处理"
                    },
                ],
            }],
        data: [
            {
                1: 'TradeCode21',
                2: '用印复核',
                3: '往往',
                4: '',
                5: '2022/10/30',
                6: '',
            },
            {
                1: 'TradeCode21',
                2: '远程盖章',
                3: '往往',
                4: '',
                5: '2022/10/30',
                6: '',
            },
            {
                1: 'TradeCode21',
                2: '远程盖章',
                3: '往往',
                4: '',
                5: '2022/10/30',
                6: '',
            },
            {
                1: 'TradeCode21',
                2: '远程盖章',
                3: '往往',
                4: '',
                5: '2022/10/30',
                6: '',
            },
            {
                1: 'TradeCode21',
                2: '远程盖章',
                3: '往往',
                4: '',
                5: '2022/10/30',
                6: '',
            },
            {
                1: 'TradeCode21',
                2: '远程盖章',
                3: '往往',
                4: '',
                5: '2022/10/30',
                6: '',
            },
        ],
        // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
        defaultAttribute: {
            stripe: true,
            "header-cell-style": {
                background: "var(--color-fill--1)",
            }
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
.PrintControlManagement-handleTask {
    margin: 0%;

    .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}
</style>