<template>
    <div class="components-approvalSteps">
        <div class="ap-box">
            <div class="ap-box-list" v-for="(item, index) in props.data" :key="index">
                <div class="ap-box-list-yindao">
                    <img class="ap-box-list-yindao-img" :src="item.iconPath" alt="">
                    <div class="ap-box-list-yindao-line" v-if="(index < props.data.length - 1)"></div>
                </div>
                <div class="ap-box-list-cont">
                    <div class="ap-box-list-cont-title">
                        <span class="ap-box-list-cont-title-text">{{ item.title }}</span>
                        <span class="ap-box-list-cont-title-subText" :style="item.subTitleStyle">{{ item.subTitle
                        }}</span>
                    </div>
                    <div class="ap-box-list-cont-person">
                        <div class="ap-box-list-cont-person-box flowing" v-if="item.type == 'flowing'">
                            <div class="flowing-cont" v-for="(data, num) in item.personList" :key="num">
                                <div class="flowing-cont-person">
                                    <div class="flowing-cont-person-cont">
                                        <div class="person-cell">
                                            <div class="person-cell-jian" :class="{
                                                dengdai: data.status == '1'
                                            }">
                                                <span class="person-cell-jian-name">
                                                    {{ data.name.slice(-2) }}
                                                </span>
                                                <img class="person-cell-jian-icon" :src="data.iconPath" alt="">
                                            </div>
                                            <div class="person-cell-name">
                                                {{ data.name }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flowing-cont-person-time">
                                        {{ data.time }}
                                    </div>
                                </div>
                                <div class="flowing-cont-desc" v-if="data.desc">
                                    {{ data.desc }}
                                </div>
                                <div class="flowing-cont-image" v-if="(num < item.personList.length - 1)">
                                    <img src="../../assets/svg/xiangxia-hui.svg" alt="">
                                </div>
                            </div>
                        </div>
                        <div class="ap-box-list-cont-person-box after" v-else>
                            <div class="after-cont">
                                <div class="after-cont-list person-cell" v-for="data in item.personList">
                                    <div class="person-cell-jian">
                                        <span class="person-cell-jian-name"> {{ data.name.slice(-2) }}</span>
                                    </div>
                                    <div class="person-cell-name">
                                        {{ data.name }}
                                    </div>
                                </div>
                            </div>
                            <div class="after-time">
                                {{ item.time }}
                            </div>
                        </div>
                        <div class="statusIcon" v-if="item.statusIconPath">
                            <img class="statusIcon-img" :src="item.statusIconPath" alt="">
                        </div>
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
    // 默认属性
    defaultAttribute: {
        type: Object,
        default: {}
    },
})
const emit = defineEmits([]);
const state = reactive({

});

onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
    console.log(props.data);
})
onMounted(() => {
    // console.log(`the component is now mounted.`)
})
</script>
<style lang='scss' scoped>
.components-approvalSteps {
    margin: 0%;

    .ap-box {
        .ap-box-list {
            min-height: 10rem;
            display: flex;
            padding: 1rem 0rem;
            box-sizing: border-box;

            .ap-box-list-yindao {
                width: 2rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;

                .ap-box-list-yindao-img {
                    width: 2rem;
                    height: 2rem;
                }

                .ap-box-list-yindao-line {
                    border-left: 1px solid var(--color-Add-1);
                    height: calc(100% - 3rem);
                }
            }

            .ap-box-list-cont {
                width: 100%;
                padding-left: 1rem;
                box-sizing: border-box;

                .ap-box-list-cont-title {
                    display: flex;
                    align-items: center;
                    padding-top: 0.3rem;
                    box-sizing: border-box;

                    .ap-box-list-cont-title-text {
                        font-size: var(--font-size-title-1);
                    }

                    .ap-box-list-cont-title-subText {
                        font-size: var(--font-size-body-1);
                    }
                }

                .ap-box-list-cont-person {
                    padding: 1rem 0;
                    box-sizing: border-box;
                }
            }
        }

        .after {
            display: flex;
            justify-content: space-between;

            .after-cont {
                flex-grow: 1;
                display: flex;
                justify-content: flex-start;
                flex-flow: wrap;
                width: calc(100% - 10rem);
            }

            .after-time {
                width: 10rem;
                display: flex;
                justify-content: flex-end;
                color: var(--color-text-3);
            }
        }

        .flowing {
            .flowing-cont-person {
                display: flex;
                justify-content: space-between;
                margin-bottom: 0.5rem;

                .flowing-cont-person-cont {
                    flex-grow: 1;
                    display: flex;
                    justify-content: flex-start;
                    flex-flow: wrap;
                    width: calc(100% - 10rem);
                }

                .flowing-cont-person-time {
                    width: 10rem;
                    display: flex;
                    justify-content: flex-end;
                    color: var(--color-text-3);
                }
            }

            .flowing-cont-desc {
                padding: 1rem 1rem;
                box-sizing: border-box;
                background-color: var(--color-fill--2);
                border-radius: var(--border-radius-4);
                color: var(--color-text-3);
                line-height: 150%;
                margin-bottom: 1rem;
            }

            .flowing-cont-image {
                padding: 0rem 1rem;
                box-sizing: border-box;
                margin-bottom: 1rem;
            }
        }


        .person-cell {
            width: auto;
            display: flex;
            align-items: center;
            padding: 0.5rem 0.5rem;
            box-sizing: border-box;
            background-color: var(--color-fill--2);
            border-radius: var(--border-radius-4);
            margin-right: 0.5rem;
            margin-bottom: 0.5rem;

            .person-cell-jian {
                width: 2rem;
                height: 2rem;
                background-color: var(--primary-6);
                border-radius: var(--border-radius-4);
                color: var(--in-common-use-1);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: var(--font-size-body-1);
                position: relative;
                margin-right: 0.5rem;

                .person-cell-jian-icon {
                    width: 1rem;
                    height: 1rem;
                    position: absolute;
                    bottom: -0.5rem;
                    right: -0.5rem;
                }
            }

            .person-cell-name {
                min-width: 3rem;
                color: var(--color-text-2);
            }
        }

        .statusIcon {
            position: absolute;
            top: 0%;
            right: 0%;

            .statusIcon-img {
                width: 9rem;
            }
        }

        .dengdai {
            background-color: var(--color-fill-25) !important;
        }
    }
}
</style>