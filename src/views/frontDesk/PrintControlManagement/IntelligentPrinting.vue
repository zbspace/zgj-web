<!-- 智能用印 -->
<template>
    <Layout>
        <div class="PrintControlManagement-IntelligentPrinting">
            <componentsLayout Layout="breadcrumb,tabs,searchForm,table,pagination">
                <template #breadcrumb>
                    <div>
                        <componentsBreadcrumb :defaultAttribute="state.componentsBreadcrumb.defaultAttribute"
                            :data="state.componentsBreadcrumb.data">
                        </componentsBreadcrumb>
                    </div>
                </template>
                <template #tabs>
                    <div>
                        <componentsTabs activeName="dfadfa" :data="state.componentsTabs.data">
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
    componentsSearchForm: {
        style: {
            lineStyle: {
                width: "25rem",
            },
            labelStyle: {
                width: "100px"
            },
        },
        data: [
            {
                id: 'name',
                label: "name",
                type: "input",
                // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
                defaultAttribute: {
                    placeholder: "请输入",
                },
            },
            {
                id: 'name',
                label: "name",
                type: "input",
                // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
                defaultAttribute: {
                    placeholder: "请输入",
                },
            },
        ],
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
            sortable: true
        }, {
            prop: 'address',
            label: "address",
        }, {
            prop: 'caozuo',
            label: "操作",
            rankDisplayData: [{
                name: "1223"
            }, {
                name: "1223"
            }, {
                name: "1223"
            }, {
                name: "1223"
            }],
        }],
        data: [
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
        ],
        // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
        defaultAttribute: {
            border: true,
            stripe: true,
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