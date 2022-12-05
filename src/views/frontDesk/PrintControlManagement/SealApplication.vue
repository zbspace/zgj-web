<!-- 用印申请 -->
<template>
    <Layout>
        <div class="PrintControlManagement-SealApplication">
            <componentsLayout Layout="title,tabs,searchForm,table,pagination,batch">
                <template #title>
                    <div class="title">
                        用印申请
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
                        <div class="batch-desc">已选择 10 项</div>
                        <el-button>批量操作</el-button>
                        <el-button>...</el-button>
                    </div>
                </template>
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
            label: '智能用印',
            name: "1",
        }, {
            label: '领用印章',
            name: "2",
        }, {
            label: '流程规范',
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
                label: "风险分类",
                type: "input",
                inCommonUse: true,
                // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
                defaultAttribute: {
                    placeholder: "请输入",
                },
            },
            {
                id: 'select',
                label: "风险项",
                type: "select",
                // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
                defaultAttribute: {
                    placeholder: "请输入",
                },
            },
            {
                id: 'shenqingr',
                label: "风险项描述",
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
                label: "风险分类",
            }, {
                prop: '2',
                label: "风险项",
            }, {
                prop: '3',
                label: "风险项描述",
            }, {
                prop: '4',
                label: "开启状态",
                customDisplayType: "switch"
            }, {
                prop: '5',
                label: "提醒时间",
            },
            {
                prop: '6',
                label: "提醒人",
            },
            {
                prop: 'caozuo',
                label: "操作",
                rankDisplayData: [
                    {
                        name: "设置提醒人"
                    },
                ],
            }],
        data: [
            {
                1: '文件防篡改',
                2: '盖前文件OCR核验异常',
                3: '',
                4: '',
                5: '即时提醒',
                6: '',
            },
            {
                1: '文件防篡改',
                2: '盖前文件OCR核验异常',
                3: '',
                4: '',
                5: '即时提醒',
                6: '',
            },
            {
                1: '文件防篡改',
                2: '盖前文件OCR核验异常',
                3: '',
                4: '',
                5: '即时提醒',
                6: '',
            },
            {
                1: '文件防篡改',
                2: '盖前文件OCR核验异常',
                3: '',
                4: '',
                5: '即时提醒',
                6: '',
            },
            {
                1: '文件防篡改',
                2: '盖前文件OCR核验异常',
                3: '',
                4: '',
                5: '即时提醒',
                6: '',
            },
            {
                1: '文件防篡改',
                2: '盖前文件OCR核验异常',
                3: '',
                4: '',
                5: '即时提醒',
                6: '',
            },
            {
                1: '文件防篡改',
                2: '盖前文件OCR核验异常',
                3: '',
                4: '',
                5: '即时提醒',
                6: '',
            },
            {
                1: '文件防篡改',
                2: '盖前文件OCR核验异常',
                3: '',
                4: '',
                5: '即时提醒',
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
.PrintControlManagement-SealApplication {
    margin: 0%;

.batch{
    display: flex;
    align-items: center;
    .batch-desc{
        @include mixin-margin-right(12) 
    }
}
}
</style>