<!-- 用印申请 选中表单 -->
<template>
    <div class="Seal-application-Selection-form">
        <componentsLayout Layout="title,custom">
            <template #title>
                <div class="title">
                    <div>用印申请</div>
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
                        <div class="ap-cont-liuc-buzou-tubiao">
                            <img class="ap-cont-liuc-buzou-tubiao-img"
                                src="../../../../assets/svg/yongyin-shenqing-xiayibu.svg" alt="">
                        </div>
                        <div class="ap-cont-liuc-buzou">
                            <div class="ap-cont-liuc-buzou-icon">
                                <img class="ap-cont-liuc-buzou-icon-img"
                                    src="../../../../assets/svg/yongyin-shenqing-liucheng.svg" alt="">
                            </div>
                            <div class="ap-cont-liuc-buzou-text">确认审批流程</div>
                        </div>
                        <div class="ap-cont-liuc-buzou-tubiao">
                            <img class="ap-cont-liuc-buzou-tubiao-img"
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
                        <div class="ap-cont-liebiao-list">
                            <div class="ap-cont-liebiao-list-back">
                                <img class="ap-cont-liebiao-list-back-img"
                                    src="../../../../assets/svg/yongyin-shenqing-biaodan-back.svg" alt="">
                            </div>
                            <div class="ap-cont-liebiao-list-desc">
                                上海科创招投标建筑制材专属项目合同
                            </div>
                            <div class="ap-cont-liebiao-list-but">
                                <el-button type="primary">去申请</el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </componentsLayout>
    </div>
</template>
<script setup>
import { reactive, defineProps, defineEmits, onBeforeMount, onMounted, ref } from "vue"
import componentsLayout from "../../../components/Layout.vue"
const props = defineProps({
    // 处理类型
    type: {
        type: String,
        default: "0",
    },
})

const emit = defineEmits([]);
const state = reactive({

});

onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)

})
onMounted(() => {
    // console.log(`the component is now mounted.`)
})
</script>
<style lang='scss' scoped>
.Seal-application-Selection-form {
    margin: 0%;

    .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

}
</style>