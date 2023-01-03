<!-- 用印申请 选中表单 -->
<template>
    <div class="Seal-application-fill-form">
        <componentsLayout Layout="breadcrumb,title,custom,tabs">
            <template #breadcrumb>
                <div class="breadcrumb">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item>格口管理 </el-breadcrumb-item>
                        <el-breadcrumb-item>格口详情</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </template>
            <template #title>
                <div class="title">
                    <div class="title-desc">
                        <img class="title-desc-img" src="../../../../assets/svg/jiantou-zuo.svg" alt=""
                            @click="clickBackPage">
                        格口详情
                    </div>
                    <div>

                    </div>
                </div>
            </template>

            <template #custom>
                <div class="custom">
                    <div class="grid-base">
                        <div class="grid-base-item">
                            <span>格口编号</span>
                            <div>A-1-1</div>
                        </div>
                        <div class="grid-base-item">
                            <span>锁控状态</span>
                            <div>关</div>
                        </div>
                        <div class="grid-base-item">
                            <span>格口状态</span>
                            <div class="error">异常</div>
                        </div>
                    </div>
                </div>
                <div class="tab-wrap">
                    <div class="tab-content">
                        <componentsTabs activeName="1" :data="state.componentsTabs.data" @tab-change="tabChange">
                        </componentsTabs>
                        <div class="btn-list">
                            <button>忽略异常</button>
                            <button>停用</button>
                            <button class="pan">盘点</button>
                        </div>
                    </div>
                    <div v-if="state.componentsDetails.activeName == 1">
                        <div class="seal-item" v-for="(item, index) in state.componentsDetails.bindData">
                            <div class="seal-name">{{ item.name }}<span>（{{ item.mac }}）</span></div>
                            <div class="seal-error">
                                <div v-if="item.state == -2" class="error-tag">异常放入</div>
                                <div class="operate-name">操作人：{{ item.operateName }}</div>
                                <div class="operate-time">操作人：{{ item.operateTime }}</div>
                                <div class="in-box" v-if="!item.isbind">不属于该印章盒</div>
                            </div>
                            <div class="open-btn">开锁</div>
                        </div>
                    </div>
                    <div v-if="state.componentsDetails.activeName == 2">
                        <componentsTable :defaultAttribute="state.componentsDetails.processData.defaultAttribute"
                            :data="state.componentsDetails.processData.data"
                            :header="state.componentsDetails.processData.header" @cellClick="cellClick"
                            @custom-click="customClick" @selection-change="selectionChange">
                        </componentsTable>
                    </div>
                </div>
            </template>
        </componentsLayout>
    </div>
</template>
<script setup>
import { reactive, defineProps, defineEmits, onBeforeMount, onMounted, inject, ref } from "vue"
import { useRouter } from 'vue-router';
import componentsLayout from "../../../components/Layout.vue"
import componentsTabs from "../../../components/tabs.vue"
import componentsTable from "../../../components/table"
const props = defineProps({
    // 处理类型
    type: {
        type: String,
        default: "0",
    },
})
const router = useRouter();
const commonFun = inject("commonFun");
const emit = defineEmits([]);
const state = reactive({
    componentsTabs: {
        data: [{
            label: '绑定印章',
            name: "1",
        }, {
            label: '流程记录',
            name: "2",
        }]
    },
    componentsDetails: {
        activeName: 1,
        bindData: [
            {
                name: '普通印章(锁)普通印章(锁) 普通印章(锁) 普通印章(锁)  ',
                mac: 'E28554700000',
                state: -2,
                operateName: '马丽丽',
                operateTime: '2022-12-26 18:00:00',
                isbind: false
            },
        ],
        processData: {
            header: [{
                width: 50,
                // type: "selection"
            }, {
                prop: '0',
                label: "序号",
                width: 100,
            }, {
                prop: '1',
                label: "操作人",
                sortable: true,
                "min-width": 150,
            }, {
                prop: '2',
                label: "操作时间",
                sortable: true,
                "min-width": 150,
            }, {
                prop: '3',
                label: "操作记录",
                sortable: true,
                "min-width": 150,
            }, {
                prop: '4',
                label: "备注",
                sortable: true,
                "min-width": 150,
            },  ],
            data: [
            {
                    0:'1',
                    1: '马丽丽',
                    2: '2022-12-27 15:00:00',
                    3: '领取',
                    4: '领取印章',
                },
                {
                    0:'2',
                    1: '马丽丽',
                    2: '2022-12-27 15:00:00',
                    3: '领取',
                    4: '领取印章',
                },
                {
                    0:'3',
                    1: '马丽丽',
                    2: '2022-12-27 15:00:00',
                    3: '领取',
                    4: '领取印章',
                },
                {
                    0:'4',
                    1: '马丽丽',
                    2: '2022-12-27 15:00:00',
                    3: '领取',
                    4: '领取印章',
                },
                {
                    0:'5',
                    1: '马丽丽',
                    2: '2022-12-27 15:00:00',
                    3: '领取',
                    4: '领取印章',
                },
                {
                    0:'6',
                    1: '马丽丽',
                    2: '2022-12-27 15:00:00',
                    3: '领取',
                    4: '领取印章',
                },
                {
                    0:'7',
                    1: '马丽丽',
                    2: '2022-12-27 15:00:00',
                    3: '领取',
                    4: '领取印章',
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
                    // if (column.property == "2") {
                    //     return {
                    //         "color": "var(--Info-6)",
                    //         "cursor": "pointer",
                    //     }
                    // }
                },
            }
        }
    }
});
const refFillFormInformation = ref(null);


//点击返回上一页
function clickBackPage() {
    commonFun.routerPage(router, -1)
}

function tabChange(activeName) {
    state.componentsDetails.activeName = activeName;
    if (activeName == 1) {

    } else if (activeName == 2) {

    }
}


onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
    // vFormLibraryRef.value.resetForm()
    // vFormLibraryRef.value.getFormData().then()
})
onMounted(() => {
    // console.log(`the component is now mounted.`)
})
</script>
<style lang='scss' scoped>
.Seal-application-fill-form {
    margin: 0%;
    position: relative;

    .title {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .title-desc {
            display: flex;
            align-items: center;

            .title-desc-img {
                margin-right: 0.5rem;
                cursor: pointer;
            }
        }
    }

    .custom {
        // padding-right: 1.25rem;
        box-sizing: border-box;
        text-align: center;
        padding-bottom: 4rem;

        .grid-base {
            display: flex;
            margin-top: 10px;
            justify-content: space-evenly;

            .grid-base-item {
                width: 30%;
                height: 106px;
                background: #FFFFFF;
                /* 线条 border/描边 */

                border: 1px solid rgba(0, 0, 0, 0.15);
                border-radius: 4px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;

                >span {
                    margin-bottom: 16px;
                    font-size: 14px;
                    color: rgba(0, 0, 0, 0.65);
                }

                >div {
                    font-size: 28px;
                    color: rgba(0, 0, 0, 0.85);
                }

                >.error {
                    color: #D04D3E;
                }
            }
        }
    }

    .tab-wrap {
        padding-right: 24px;

        .tab-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #D0963E;

            .btn-list {
                >button {
                    border: none;
                    padding: 5px 16px;
                    background: #FFFFFF;
                    border: 1px solid #D0963E;
                    border-radius: 2px;
                    margin-left: 16px;
                    color: #D0963E;
                    font-size: 14px;
                }

                >.pan {
                    color: #fff;
                    background: #D0963E;
                }
            }
        }

        .seal-item {
            height: 124px;
            background: #FFFFFF;
            padding: 16px;
            /* 线条 border/描边 */

            border: 1px solid rgba(0, 0, 0, 0.15);
            border-radius: 2px;
            position: relative;

            .seal-name {
                color: rgba(0, 0, 0, 0.85);

                >span {
                    color: rgba(0, 0, 0, 0.45);
                }
            }

            .seal-error {
                display: flex;
                align-items: center;
                color: #D04D3E;
                margin-top: 12px;
                font-size: 12px;

                >div {
                    margin-right: 12px;
                }

                .error-tag {
                    background: #FFEEE8;
                    border: 1px solid #ECAD9D;
                    border-radius: 2px;
                    padding: 1px 8px;
                }

                .operate-name,
                .operate-time {
                    border-right: 1px solid #D04D3E;
                    padding-right: 12px;
                }
            }

            .open-btn {
                position: absolute;
                bottom: 16px;
                right: 16px;
                background: #D0963E;
                border-radius: 2px;
                border: none;
                padding: 5px 16px;
                color: #FFFFFF;
                cursor: pointer;
            }
        }

    }

    .ap-fixed {
        width: calc(100%);
        position: absolute;
        bottom: 0%;
        height: 4rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-top: 1px solid var(--color-border-2);
        background-color: var(--in-common-use-1);
        z-index: 999;
    }
}
</style>