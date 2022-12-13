<!-- 智能用印 -->
<template>
    <div class="documentsDetails-IntelligentPrinting">
        <div class="ap-seal" v-for="(item, index) in props.data" :key="index">
            <div class="ap-seal-box">
                <div class="ap-seal-box-icon">
                    <img class="ap-seal-box-icon-img" src="../../../assets/svg/yongyin-mingcheng.svg" alt="">
                </div>
                <div class="ap-seal-box-desc">
                    <span class="ap-seal-box-desc-name">用印名称：</span>
                    <span class="ap-seal-box-desc-desc">{{ item.sealName }}</span>
                </div>
            </div>
            <div class="ap-seal-box">
                <div class="ap-seal-box-icon">
                    <img class="ap-seal-box-icon-img" src="../../../assets/svg/yongyin-renyuan.svg" alt="">
                </div>
                <div class="ap-seal-box-desc">
                    <span class="ap-seal-box-desc-name">用印人员：</span>
                    <span class="ap-seal-box-desc-desc">{{ item.personName }}</span>
                </div>
            </div>
            <div class="ap-seal-box">
                <div class="ap-seal-box-icon">
                    <img class="ap-seal-box-icon-img" src="../../../assets/svg/yongyin-shijian.svg" alt="">
                </div>
                <div class="ap-seal-box-desc">
                    <span class="ap-seal-box-desc-name">用印时间：</span>
                    <span class="ap-seal-box-desc-desc">{{ item.time }}</span>
                </div>
            </div>
            <div class="ap-seal-box">
                <div class="ap-seal-box-icon">
                    <img class="ap-seal-box-icon-img" src="../../../assets/svg/yongyin-didian.svg" alt="">
                </div>
                <div class="ap-seal-box-desc">
                    <span class="ap-seal-box-desc-name">用印地点：</span>
                    <span class="ap-seal-box-desc-desc">{{ item.adress }}</span>
                </div>
            </div>
            <div class="ap-seal-box">
                <div class="ap-seal-box-icon">
                    <img class="ap-seal-box-icon-img" src="../../../assets/svg/gaizhang-yingxiang.svg" alt="">
                </div>
                <div class="ap-seal-box-desc">
                    <span class="ap-seal-box-desc-name">盖章影像（{{ item.imageNum }}）：</span>
                    <span class="ap-seal-box-desc-desc"></span>
                </div>
            </div>
            <div class="ap-seal-image imageData">
                <div class="imageData-list" v-for="(node, num) in item.imageData">
                    <img class="imageData-list-imgPath" :src="node.imgPath" alt="">
                    <img class="imageData-list-iconPath" :src="node.iconPath" alt="">
                    <div class="imageData-list-desc">
                        <span class="imageData-list-desc-name">{{ node.personName }}</span>
                        <span class="imageData-list-desc-time">{{ node.time }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { reactive, defineProps, defineEmits, onBeforeMount, onMounted } from "vue"
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
    data: {
        type: Array,
        default: []
    },
    //查看更多
    more: {
        type: Boolean,
        default: false,
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
.documentsDetails-IntelligentPrinting {
    margin: 0%;

    .ap-seal {
        .ap-seal-box {
            display: flex;
            align-items: center;
            padding: 0.5rem 0;
            box-sizing: border-box;

            .ap-seal-box-icon {
                display: flex;
                align-items: center;

                .ap-seal-box-icon-img {
                    width: 1rem;
                    margin-right: 0.5rem;
                }
            }

            .ap-seal-box-desc {
                .ap-seal-box-desc-name {
                    color: var(--color-text-3);
                }
            }
        }
    }

    .imageData {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        align-content: flex-start;

        .imageData-list {
            padding: 0.2rem;
            box-sizing: border-box;
            position: relative;

            .imageData-list-imgPath {
                width: 100%;

            }

            .imageData-list-iconPath {
                position: absolute;
                z-index: 1;
                right: 0.2rem;
                top: 0.2rem;
                width: 40%;
            }
            .imageData-list-desc{
                position: absolute;
                bottom: 0%;
                left: 0%;
                text-align: center;
                width: 100%;
                padding: 0.2rem 0;
                box-sizing: border-box;
                background-color: var();
            }
        }
    }
}
</style>