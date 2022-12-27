<!-- 用印申请 选中表单 -->
<template>
    <div class="electronic-seal-apply-Selection-form">
        <componentsLayout Layout="title,custom">
            <template #title>
                <div class="title">
                    <div>电子签章申请</div>
                    <div>

                    </div>
                </div>
            </template>
            <template #custom>
                <div class="custom">
                    <div class="ap-cont-info">
                        <div class="ap-cont-info-icon">
                            <img class="ap-cont-info-icon-img" src="../../../../assets/svg/gantanhao-lan.svg" alt="">
                        </div>
                        <div class="ap-cont-info-desc">有已发起意外退出的用印申请【上海科创招投标建筑制材专属项目合同】</div>
                        <div class="ap-cont-info-caozuo">继续完成用印申请</div>
                    </div>
                    <div class="ap-cont-title">
                        请选择所需表单
                    </div>
                    <div class="ap-cont-desc">
                        请根据以下步骤完善表单内容及确认审批流程
                    </div>
                    <div class="ap-cont-liuc">
                        <div class="ap-cont-liuc-buzou">
                            <div class="ap-cont-liuc-buzou-icon">
                                <img class="ap-cont-liuc-buzou-icon-img"
                                    src="../../../../assets/svg/yongyin-shenqing-kaishi.svg" alt="">
                            </div>
                            <div class="ap-cont-liuc-buzou-text">填写表单信息</div>
                        </div>
                        <div class="ap-cont-liuc-tubiao">
                            <img class="ap-cont-liuc-tubiao-img"
                                src="../../../../assets/svg/yongyin-shenqing-xiayibu.svg" alt="">
                        </div>
                        <div class="ap-cont-liuc-buzou">
                            <div class="ap-cont-liuc-buzou-icon">
                                <img class="ap-cont-liuc-buzou-icon-img"
                                    src="../../../../assets/svg/yongyin-shenqing-liucheng.svg" alt="">
                            </div>
                            <div class="ap-cont-liuc-buzou-text">确认审批流程</div>
                        </div>
                        <div class="ap-cont-liuc-tubiao">
                            <img class="ap-cont-liuc-tubiao-img"
                                src="../../../../assets/svg/yongyin-shenqing-xiayibu.svg" alt="">
                        </div>
                        <div class="ap-cont-liuc-buzou">
                            <div class="ap-cont-liuc-buzou-icon">
                                <img class="ap-cont-liuc-buzou-icon-img"
                                    src="../../../../assets/svg/yongyin-shenqing-wancheng.svg" alt="">
                            </div>
                            <div class="ap-cont-liuc-buzou-text">完成用印申请</div>
                        </div>
                    </div>
                    <div class="ap-cont-liebiao">
                        <div class="ap-cont-liebiao-list" v-for="n in 5" :key="n">
                            <div class="ap-cont-liebiao-list-back">
                                <img class="ap-cont-liebiao-list-back-img"
                                    src="../../../../assets/svg/yongyin-shenqing-biaodan-back.svg" alt="">
                            </div>
                            <div class="ap-cont-liebiao-list-desc">
                                上海科创招投标建筑制材专属项目合同
                            </div>
                            <div class="ap-cont-liebiao-list-but">
                                <el-button type="primary" @click="clickListBut">去申请</el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </componentsLayout>
    </div>
</template>
<script setup>
import { reactive, defineProps, defineEmits, onBeforeMount, onMounted, inject } from "vue"
import { useRouter } from 'vue-router';
import componentsLayout from "../../../components/Layout.vue"
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

});

//点击列表按钮
function clickListBut() {
    commonFun.routerPage(router, {
        path: "/frontDesk/PrintControlManagement/electronic-seal-apply/fill-form"
    })
}

onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)

})
onMounted(() => {
    // console.log(`the component is now mounted.`)
})
</script>
<style lang='scss' scoped>
.electronic-seal-apply-Selection-form {
    margin: 0%;

    .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .custom {
        padding-right: 1.25rem;
        box-sizing: border-box;
        text-align: center;

        .ap-cont-info {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 0.5rem;
            box-sizing: border-box;
            background-color: var(--Info-1);
            border: 1px solid var(--Info-3);
            border-radius: var(--border-radius-2);
            position: relative;
            margin-bottom: 1rem;

            .ap-cont-info-icon {
                margin-right: 0.5rem;
            }

            .ap-cont-info-caozuo {
                position: absolute;
                right: 0.5rem;
                color: var(--Info-6);
            }
        }

        .ap-cont-title {
            display: flex;
            justify-content: center;
            font-size: var(--font-size-title-1);
            font-weight: var(--font-weight-600);
            margin-bottom: 1rem;
        }

        .ap-cont-desc {
            display: flex;
            justify-content: center;
            margin-bottom: 1rem;
            color: var(--color-text-2);
        }

        .ap-cont-liuc {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 1rem;

            .ap-cont-liuc-buzou {
                padding: 1rem;
                box-sizing: border-box;

                .ap-cont-liuc-buzou-icon {
                    margin-bottom: 0.5rem;
                }
            }

            .ap-cont-liuc-tubiao {
                padding: 1rem;
                box-sizing: border-box;
            }
        }

        .ap-cont-liebiao {
            display: flex;
            flex-flow: wrap;

            .ap-cont-liebiao-list {
                width: 20rem;
                margin: 0rem 1rem 1rem 0rem;
                padding: 0.5rem;
                box-sizing: border-box;
                display: flex;
                flex-flow: wrap;
                justify-content: center;
                border: 1px solid var(--color-border-1);
                border-radius: var(--border-radius-4);
                background-color: var(--color-fill--1);

                .ap-cont-liebiao-list-back {
                    width: 10rem;
                    height: 10rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .ap-cont-liebiao-list-desc {
                    width: 100%;
                    margin-bottom: 0.5rem;
                    color: var(--color-text-1);
                }

                .ap-cont-liebiao-list-but {
                    margin-bottom: 0.5rem;
                }
            }
        }
    }
}
</style>