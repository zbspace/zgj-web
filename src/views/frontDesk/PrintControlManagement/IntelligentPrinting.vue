<!-- 智能用印 -->
<template>
    <Layout>
        <div class="PrintControlManagement-IntelligentPrinting">
            <componentsLayout Layout="title,tabs,searchForm,table,pagination">
                <template #title>
                    <div class="title">
                        智能用印
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
    </Layout>
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
                label: "单据名称",
                type: "input",
                inCommonUse: true,
                // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
                defaultAttribute: {
                    placeholder: "请输入",
                },
            },
            {
                id: 'select',
                label: "使用印章",
                type: "select",
                // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
                defaultAttribute: {
                    placeholder: "请输入",
                },
            },
            {
                id: 'shenqingr',
                label: "盖章码",
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
        header: [{
            width: 50,
            type: "selection"
        }, {
            prop: '1',
            label: "单据编号",
            width: 100,
        }, {
            prop: '2',
            label: "单据名称",
            sortable: true
        }, {
            prop: '3',
            label: "使用印章",
        }, {
            prop: '4',
            label: "盖章码",
        }, {
            prop: '5',
            label: "申请盖章次数",
        }, {
            prop: '6',
            label: "实际盖章次数",
        }, {
            prop: '7',
            label: "申请人",
        }, {
            prop: '8',
            label: "申请部门",
        }, {
            prop: '9',
            label: "申请时间",
        }, {
            prop: '10',
            label: "用印状态",
        }, {
            prop: 'caozuo',
            label: "操作",
            rankDisplayData: [{
                name: "转办"
            }, {
                name: "申请重置"
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
                8: '2022/10/30',
                9: '',
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
                8: '2022/10/30',
                9: '',
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
                8: '2022/10/30',
                9: '',
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
                8: '2022/10/30',
                9: '',
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
                8: '2022/10/30',
                9: '',
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
                8: '2022/10/30',
                9: '',
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
                8: '2022/10/30',
                9: '',
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
                8: '2022/10/30',
                9: '',
                10: '',
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
.PrintControlManagement-IntelligentPrinting {
    margin: 0%;


}
</style>