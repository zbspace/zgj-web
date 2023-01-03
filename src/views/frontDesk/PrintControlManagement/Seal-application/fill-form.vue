<!-- 用印申请 选中表单 -->
<template>
    <div class="Seal-application-fill-form">
        <componentsLayout Layout="breadcrumb,title,custom,fixed">
            <template #breadcrumb>
                <div class="breadcrumb">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item>用印申请 </el-breadcrumb-item>
                        <el-breadcrumb-item>新建用印申请</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </template>
            <template #title>
                <div class="title">
                    <div class="title-desc">
                        <img class="title-desc-img" src="../../../../assets/svg/jiantou-zuo.svg" alt=""
                            @click="clickBackPage">
                        新建用印申请
                    </div>
                    <div>

                    </div>
                </div>
            </template>
            <template #custom>
                <div class="custom">
                    <div class="custom-buzhou">
                        <SealApplicationStep :data="state.cache.flowList"></SealApplicationStep>
                    </div>
                    <div>
                        <documentsDetailsPortion>
                            <template #title>
                                <div>基本信息</div>
                            </template>
                            <template #content>
                                <div>
                                    <v-form-render :form-json="FillFormInformation" :form-data="state.cache.formData"
                                        :option-data="state.cache.optionData" ref="refFillFormInformation">
                                    </v-form-render>
                                </div>
                            </template>
                        </documentsDetailsPortion>

                    </div>
                    <div>
                        <documentsDetailsPortion>
                            <template #title>
                                <div>用印信息</div>
                            </template>
                            <template #content>
                                <div>
                                    <v-form-render :form-json="FillFormInformationSeal"
                                        :form-data="state.cache.SealformData" :option-data="state.cache.SealoptionData"
                                        ref="refFillFormInformation">
                                    </v-form-render>
                                </div>
                            </template>
                        </documentsDetailsPortion>

                    </div>
                </div>
            </template>
            <template #fixed>
                <div class="fixed">
                    <div class="ap-fixed">
                        <el-button type="primary" @click="clickNextStep">下一步</el-button>
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
import documentsDetailsPortion from "../../../components/documentsDetails/portion.vue"
import SealApplicationStep from "@/views/components/Seal-application/step.vue"
import FillFormInformation from "@/views/addDynamicFormJson/Fill-form-information.json"
import FillFormInformationSeal from "@/views/addDynamicFormJson/Fill-form-information-seal.json"
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
    cache: {
        flowList: [
            {
                name: "填写表单信息",
                active: true,
            },
            {
                name: "确认审批流程",
            },
            {
                name: "完成",
            },
        ],
        formData: {},
        optionData: {},
        SealformData: {},
        SealoptionData: {}
    }
});
const refFillFormInformation = ref(null);


//点击返回上一页
function clickBackPage() {
    commonFun.routerPage(router, -1)
}

//点击下一步
function clickNextStep() {
    commonFun.routerPage(router, {
        path: "/frontDesk/PrintControlManagement/Seal-application/Confirm-approval-process"
    })
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

        .custom-buzhou {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 1rem 0;
            box-sizing: border-box;

            .custom-buzhou-list {
                display: flex;
                justify-content: center;
                align-items: center;

                .custom-buzhou-list-desc {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 10rem;

                    .custom-buzhou-list-desc-index {
                        width: 1.5rem;
                        height: 1.5rem;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background-color: var(--color-fill--3);
                        color: var(--color-text-3);
                        border-radius: var(--border-radius-2);
                        margin-right: 0.5rem;
                    }

                    .custom-buzhou-list-desc-text {
                        font-size: var(--font-size-title-1);
                        color: var(--color-text-3);
                    }
                }

                .custom-buzhou-list-jiantou {
                    width: 7rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }

            .indexActive {
                background-color: var(--primary-6) !important;
                color: var(--in-common-use-1) !important;
            }

            .textActive {
                color: var(--color-text-1) !important;
            }

            .font-color-45 {
                color: var(--color-text-3) !important;
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