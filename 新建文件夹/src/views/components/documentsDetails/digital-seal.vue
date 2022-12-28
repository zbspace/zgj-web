<!-- 电子签章 -->
<template>
    <div class="documentsDetails-digital-seal">
        <div class="ap-box printed" v-if="props.signatoryFileData && props.signatoryFileData.length > 0">
            <div class="ap-box-title">签署方信息</div>
            <div class="ap-box-table">
                <componentsTable :data="state.cache.signatoryData.data" :header="state.cache.signatoryData.header"
                    :defaultAttribute="state.cache.signatoryData.defaultAttribute">
                </componentsTable>
            </div>
        </div>
        <div class="ap-box printed" v-if="props.signatoryFileData && props.signatoryFileData.length > 0">
            <div class="ap-box-title">签署文件</div>
            <div class="ap-box-cont" v-for="(item, index) in props.signatoryFileData" :key="index">
                <div class="ap-box-cont-desc">
                    <span class="ap-box-cont-desc-name">{{ item.name }}</span>
                    <span class="ap-box-cont-desc-size">（{{ item.size }}）</span>
                </div>
                <div class="ap-box-cont-caozuo">
                    <span class="ap-box-cont-caozuo-yulan">预览</span>
                    <span class="ap-box-cont-caozuo-xiazai">下载</span>
                    <!-- <span class="ap-box-cont-caozuo-dayin">
                        <img class="ap-box-cont-caozuo-dayin-image" src="../../../assets/svg/fangwei-dayin.svg" alt="">
                        <span class="ap-box-cont-caozuo-dayin-span">防伪打印</span>
                    </span> -->
                </div>
            </div>
        </div>
        <div class="ap-box additional"
            v-if="props.alreadySignatoryFileData && props.alreadySignatoryFileData.length > 0">
            <div class="ap-box-title">已签署文件</div>
            <div class="ap-box-cont" v-for="(item, index) in props.alreadySignatoryFileData" :key="index">
                <div class="ap-box-cont-desc">
                    <span class="ap-box-cont-desc-name">{{ item.name }}</span>
                    <span class="ap-box-cont-desc-size">（{{ item.size }}）</span>
                </div>
                <div class="ap-box-cont-caozuo">
                    <span class="ap-box-cont-caozuo-yulan">预览</span>
                    <span class="ap-box-cont-caozuo-xiazai">下载</span>
                    <!-- <span class="ap-box-cont-caozuo-dayin">
                        <img class="ap-box-cont-caozuo-dayin-image" src="../../../assets/svg/fangwei-dayin.svg" alt="">
                        <span class="ap-box-cont-caozuo-dayin-span">防伪打印</span>
                    </span> -->
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { reactive, defineProps, defineEmits, onBeforeMount, onMounted } from "vue"
import componentsTable from "../table"
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
    //签署方信息
    signatoryData: {
        type: Object,
        default: {
            header: [],
            data: [],
        }
    },
    // 签署文件
    signatoryFileData: {
        type: Array,
        default: []
    },
    // 已签署文件
    alreadySignatoryFileData: {
        type: Array,
        default: []
    },
})
const emit = defineEmits([]);
const state = reactive({
    cache: {
        //
        signatoryData: {
            header: [
                {
                    prop: '0',
                    label: "序号",
                },
                {
                    prop: '1',
                    label: "操作人",
                    sortable: true,
                "min-width":150,
                },
                {
                    prop: '2',
                    label: "操作时间",
                    sortable: true,
                "min-width":150,
                },
                {
                    prop: '3',
                    label: "操作记录",
                    sortable: true,
                "min-width":150,
                },
                {
                    prop: '4',
                    label: "操作说明",
                    sortable: true,
                "min-width":150,
                },
            ],
            data: [
                {
                    0: 1,
                    1: "周俊毅",
                    2: "2022-11-12 19:00:12",
                    3: "新增用印申请",
                    4: "新增用印申请：用印申请-客户问题验证",
                },
                {
                    0: 2,
                    1: "王凡玄",
                    2: "2022-11-12 19:00:12",
                    3: "用印申请",
                    4: "发起申请",
                },
                {
                    0: 3,
                    1: "李豫卓",
                    2: "2022-11-12 19:00:12",
                    3: "审批",
                    4: "授权码自动失效，相关印章：[智]Kevin_预发测试2【简称_9290_2.3.1】",
                },
                {
                    0: 4,
                    1: "孙思达",
                    2: "2022-11-12 19:00:12",
                    3: "文件归档",
                    4: "同意",
                },
                {
                    0: 5,
                    1: "李梓发",
                    2: "2022-11-12 19:00:12",
                    3: "文件归档",
                    4: "同意",
                },
            ],
            // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
            defaultAttribute: {
                border: true,
                "header-cell-style": ({ row, column, rowIndex, columnIndex }) => {
                    // console.log({ row, column, rowIndex, columnIndex });
                    return {
                        "background": "var(--color-fill--1)"
                    }
                },
            }
        },
        signatoryFileData: [],
        alreadySignatoryFileData: [],
    }
});
// 初始化数据
function initData() {
    state.cache.signatoryData = props.signatoryData;
    state.cache.alreadySignatoryFileData = props.alreadySignatoryFileData;
    state.cache.signatoryFileData = props.signatoryFileData;
    // console.log(state.cache.more);
}
onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
    // 初始化数据
    initData();
})
onMounted(() => {
    // console.log(`the component is now mounted.`)
})
</script>
<style lang='scss' scoped>
.documentsDetails-digital-seal {
    margin: 0%;

    .ap-box {
        .ap-box-title {
            font-size: var(--font-size-body-2);
            color: var(--color-text-3);
        }

        .ap-box-cont {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: var(--color-fill--1);
            padding: 0.8rem 1.5rem;
            box-sizing: border-box;
            border-radius: var(--border-radius-4);
            margin: 0.8rem 0rem;

            .ap-box-cont-desc {
                width: calc(100% - 5rem);

                .ap-box-cont-desc-name {
                    margin-right: 0.5rem;
                }
            }

            .ap-box-cont-caozuo {
                width: 5rem;
                display: flex;
                justify-content: space-between;

                .ap-box-cont-caozuo-yulan {
                    color: var(--Warning-6);
                }

                .ap-box-cont-caozuo-xiazai {
                    margin-left: 0.5rem;
                    color: var(--Info-6);
                }

                .ap-box-cont-caozuo-dayin {
                    margin-left: 0.5rem;
                    color: var(--Info-6);

                    .ap-box-cont-caozuo-dayin-image {
                        margin-right: 0.3rem;
                    }
                }
            }
        }

        .ap-box-table {
            margin: 0.8rem 0rem;
        }
    }

}
</style>