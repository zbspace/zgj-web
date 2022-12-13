<!-- 智能印章柜管理 -->
<template>
    <div class="PrintControlManagement-IntelligentSealCabinetManagement">
        <componentsLayout Layout="title,searchForm,table,pagination,batch">
            <template #title>
                <div class="title">
                    <div>智能印章柜管理</div>
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
                    <el-button type="primary">+ 增加</el-button>
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
                label: "关键词",
                type: "input",
                inCommonUse: true,
                // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
                defaultAttribute: {
                    placeholder: "请输入",
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
                id: 'select',
                label: "智能印章柜名称",
                type: "input",
                // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
                defaultAttribute: {
                    placeholder: "请输入",
                },
            },
            {
                id: 'shenqingr',
                label: "智能印章柜编码",
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
                sortable: true
            }, {
                prop: '1',
                label: "设备串号",
            }, {
                prop: '2',
                label: "智能印章柜名称",
            }, {
                prop: '3',
                label: "智能印章柜编码",
            }, {
                prop: '4',
                label: "设备状态",
            }, {
                prop: '5',
                label: "保管人",
            }, {
                prop: '6',
                label: "保管部门",
            }, {
                prop: '7',
                label: "更新时间",
            },
            {
                prop: 'caozuo',
                label: "操作",
                rankDisplayData: [
                    {
                        name: "修改"
                    },
                    {
                        name: " 删除 "
                    },
                ],
            }],
        data: [
            {
                1: 'TradeCode21',
                2: 'TradeCode21',
                3: '这是一段描述，关于这个应用的描述',
                4: '',
                5: '',
                6: '',
                7: '',
                8: '',
            },
            {
                1: 'TradeCode21',
                2: 'TradeCode21',
                3: '这是一段描述，关于这个应用的描述',
                4: '',
                5: '',
                6: '',
                7: '',
                8: '',
            },
            {
                1: 'TradeCode21',
                2: 'TradeCode21',
                3: '这是一段描述，关于这个应用的描述',
                4: '',
                5: '',
                6: '',
                7: '',
                8: '',
            },
            {
                1: 'TradeCode21',
                2: 'TradeCode21',
                3: '这是一段描述，关于这个应用的描述',
                4: '',
                5: '',
                6: '',
                7: '',
                8: '',
            },
            {
                1: 'TradeCode21',
                2: 'TradeCode21',
                3: '这是一段描述，关于这个应用的描述',
                4: '',
                5: '',
                6: '',
                7: '',
                8: '',
            },
            {
                1: 'TradeCode21',
                2: 'TradeCode21',
                3: '这是一段描述，关于这个应用的描述',
                4: '',
                5: '',
                6: '',
                7: '',
                8: '',
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
.PrintControlManagement-IntelligentSealCabinetManagement {
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