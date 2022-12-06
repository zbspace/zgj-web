<template>
    <div class="components-documentsDetails">
        <div class="ap-box">
            <el-drawer v-model="state.drawer.show" :with-header="false" direction="rtl" :size="state.drawer.size">
                <div class="ap-cont">
                    <div class="ap-cont-box ap-title">
                        <div class="title-name">
                            <span class="title-name-span">用印详情</span>
                        </div>
                        <div class="title-cion">
                            <img class="title-cion-img quanping" src="../../assets/svg/quanping.svg" alt=""
                                @click="ClickOnFullScreen">
                            <img class="title-cion-img shanchu" src="../../assets/svg/cha-kong.svg" alt="" srcset="">
                        </div>
                    </div>
                    <div class="ap-cont-box ap-Tabs">
                        <componentsTabs activeName="dfadfa" :data="state.componentsTabs.data" @tab-change="tabChange">
                        </componentsTabs>
                    </div>
                    <div class="ap-cont-Details">
                        <a-scrollbar style="height:100%;overflow: auto;">
                            <div class="scrollbar-div">
                                <div class="ap-cont-box ap-table">
                                    <componentsTable :data="state.componentsTable.data"
                                        :header="state.componentsTable.header"
                                        :defaultAttribute="state.componentsTable.defaultAttribute" @row-click="rowClick"
                                        @select="select" @custom-click="customClick">
                                    </componentsTable>
                                </div>
                                <div class="ap-cont-box ap-table">
                                    <componentsTable :data="state.componentsTable.data"
                                        :header="state.componentsTable.header"
                                        :defaultAttribute="state.componentsTable.defaultAttribute" @row-click="rowClick"
                                        @select="select" @custom-click="customClick">
                                    </componentsTable>
                                </div>
                                <div class="ap-cont-box ap-table">
                                    <componentsTable :data="state.componentsTable.data"
                                        :header="state.componentsTable.header"
                                        :defaultAttribute="state.componentsTable.defaultAttribute" @row-click="rowClick"
                                        @select="select" @custom-click="customClick">
                                    </componentsTable>
                                </div>
                                <div class="ap-cont-box ap-table">
                                    <componentsTable :data="state.componentsTable.data"
                                        :header="state.componentsTable.header"
                                        :defaultAttribute="state.componentsTable.defaultAttribute" @row-click="rowClick"
                                        @select="select" @custom-click="customClick">
                                    </componentsTable>
                                </div>
                                <div class="ap-cont-box ap-table">
                                    <componentsTable :data="state.componentsTable.data"
                                        :header="state.componentsTable.header"
                                        :defaultAttribute="state.componentsTable.defaultAttribute" @row-click="rowClick"
                                        @select="select" @custom-click="customClick">
                                    </componentsTable>
                                </div>
                                <div class="ap-cont-box ap-table">
                                    <componentsTable :data="state.componentsTable.data"
                                        :header="state.componentsTable.header"
                                        :defaultAttribute="state.componentsTable.defaultAttribute" @row-click="rowClick"
                                        @select="select" @custom-click="customClick">
                                    </componentsTable>
                                </div>
                            </div>
                        </a-scrollbar>
                    </div>
                </div>
            </el-drawer>
        </div>
    </div>
</template>
<script setup>
import { reactive, defineProps, defineEmits, onBeforeMount, onMounted } from "vue"
import componentsTabs from "./tabs.vue"
import componentsTable from "./table"
const props = defineProps({
    //标识
    refs: {
        type: String,
        default: "",
    },
    // 处理类型
    type: {
        type: String,
        default: "0",
    },
    // 布局
    Layout: {
        type: Array,
        default: [],
    },
    show: {
        type: Boolean,
        default: true,
    },
    //数据
    data: {
        type: Object,
        default: {},
    }
})
const emit = defineEmits([]);
const state = reactive({
    drawer: {
        show: true,
        size: "50%",
    },
    componentsTabs: {
        data: [
            {
                label: '用印申请详情',
                name: "dfadfa",
            },
            {
                label: '流程记录',
                name: "ffff",
            },
            {
                label: '印章领用记录',
                name: "dfadaf",
            }
        ]
    },
    componentsTable: {
        header: [
            {
                prop: 'name',
                label: "name",
            }, {
                prop: 'date',
                label: "date",
            }, {
                prop: 'address',
                label: "address",
            },
        ],
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
            "show-header": false,
            "span-method": ({ row, column, rowIndex, columnIndex }) => {
                // console.log({ row, column, rowIndex, columnIndex });
                if (rowIndex === 0 && columnIndex === 1) {    //用于设置要合并的列
                    return {
                        rowspan: 1,　　　　　//合并的行数
                        colspan: 2          //合并的列数，设为０则直接不显示
                    };
                }
                if (rowIndex === 0 && columnIndex === 2) {    //用于设置要合并的列
                    return {
                        rowspan: 1,　　　　　//合并的行数
                        colspan: 0          //合并的列数，设为０则直接不显示
                    };
                }
            },
            "cell-style": ({ row, column, rowIndex, columnIndex }) => {
                console.log({ row, column, rowIndex, columnIndex });
                if (columnIndex === 0) {
                    return {
                        "background": "#f1f1f1"
                    }
                }
            },
        }
    },
});
//初始化数据
function initData() {
    state.drawer.show = props.show;
}
//点击全屏
function ClickOnFullScreen() {
    state.drawer.size = "100%";
}
//点击关闭
function ClickClose() {
    state.drawer.show = false;
}
onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
    //初始化数据
    initData()
})
onMounted(() => {
    // console.log(`the component is now mounted.`)
})
</script>
<style lang='scss' scoped>
.components-documentsDetails {
    margin: 0%;

    .ap-cont {
        height: 100%;
    }

    .ap-title {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .title-name-span {
            font-size: var(--font-size-title-2);
        }

        .title-cion-img {
            width: 1rem;
            margin-right: 1rem;
        }

        .quanping {
            width: 1.2rem;
        }
    }

    .ap-cont-Details {
        width: calc(100% + 18px);
        height: calc(100% - 80px);

        .arco-scrollbar {
            height: 100%;
        }

        .scrollbar-div {
            padding-right: 18px;
            box-sizing: border-box;
        }
    }
}
</style>