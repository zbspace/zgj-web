<template>
    <div class="components-searchForm">
        <div class="ap-dis" :class="{ lineShow: state.cache.isUnfold == 0 }">
            <el-scrollbar :max-height="props.defaultAttribute['scrollbar-max-height']" class="fromData-scrollbar">
                <div class="fromData">
                    <div class="ap-box" v-for="(item, index) in state.cache.formData"
                        :style="[props.style.lineStyle, item.style]" @click="clickElement(item, index)">
                        <div class="ap-box-cont" v-if="item.type == 'input'">
                            <div class="ap-box-label" :style="props.style.labelStyle">
                                <span class="ap-box-label-necessary" v-if="item.isNecessary">*</span>
                                {{ item.label }}
                            </div>
                            <div class="ap-box-contBox">
                                <el-input class="width-100" v-bind="item.defaultAttribute" v-model="item.value"
                                    @input="getCurrentValue(item, index)" />
                            </div>
                        </div>
                        <div class="ap-box-cont" v-else-if="item.type == 'select'">
                            <div class="ap-box-label" :style="props.style.labelStyle">
                                <span class="ap-box-label-necessary" v-if="item.isNecessary">*</span>
                                {{ item.label }}
                            </div>
                            <div class="ap-box-contBox">
                                <el-select class="width-100" v-bind="item.defaultAttribute" v-model="item.value"
                                    @change="getCurrentValue(item, index)">
                                    <el-option v-for="data in item.options" :key="data.value" :label="data.label"
                                        :value="data.value" />
                                </el-select>
                            </div>
                        </div>
                        <div class="ap-box-cont" v-else-if="item.type == 'picker'">
                            <div class="ap-box-label" :style="props.style.labelStyle">
                                <span class="ap-box-label-necessary" v-if="item.isNecessary">*</span>
                                {{ item.label }}
                            </div>
                            <div class="ap-box-contBox">
                                <el-date-picker class="width-100" v-bind="item.defaultAttribute" v-model="item.value"
                                    @change="getCurrentValue(item, index)" />
                            </div>
                        </div>
                        <div class="ap-box-cont" v-else-if="item.type == 'checkbox'">
                            <div class="ap-box-label" :style="props.style.labelStyle">
                                <span class="ap-box-label-necessary" v-if="item.isNecessary">*</span>
                                {{ item.label }}
                            </div>
                            <div class="ap-box-autoBox checkbox" v-for="data in item.checkbox">
                                <el-checkbox v-bind="data.defaultAttribute" :style="data.style" v-model="data.value"
                                    @change="getCurrentValue(item, index)" />
                            </div>
                        </div>
                        <div class="ap-box-cont" v-else-if="item.type == 'radio'">
                            <div class="ap-box-label" :style="props.style.labelStyle">{{ item.label }}</div>
                            <div class="ap-box-autoBox">
                                <el-radio-group v-bind="item.defaultAttribute" v-model="item.value"
                                    @change="getCurrentValue(item, index)">
                                    <el-radio v-for="data in item.radio" :label="data.label">{{ data.name }}</el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                        <div class="ap-box-cont" v-else-if="item.type == 'cascader'">
                            <div class="ap-box-label" :style="props.style.labelStyle">
                                <span class="ap-box-label-necessary" v-if="item.isNecessary">*</span>
                                {{ item.label }}
                            </div>
                            <div class="ap-box-contBox">
                                <el-cascader class="width-100" style="width: 100%;" v-bind="item.defaultAttribute"
                                    v-model="item.value" @change="getCurrentValue(item, index)" />
                            </div>
                        </div>
                        <div class="ap-box-cont" v-else-if="item.type == 'switch'">
                            <div class="ap-box-label" :style="props.style.labelStyle">
                                <span class="ap-box-label-necessary" v-if="item.isNecessary">*</span>
                                {{ item.label }}
                            </div>
                            <div class="ap-box-contBox">
                                <el-switch v-bind="item.defaultAttribute" v-model="item.value" />
                            </div>
                        </div>
                        <div class="ap-box-cont" v-else-if="item.type == 'button'">
                            <div class="ap-box-label" :style="props.style.labelStyle">
                                <span class="ap-box-label-necessary" v-if="item.isNecessary">*</span>
                                {{ item.label }}
                            </div>
                            <div class="ap-box-contBox" v-for="data in item.data">
                                <el-button v-bind="data.defaultAttribute" v-model="data.value">{{ data.name
                                }}</el-button>
                            </div>
                        </div>
                        <div class="ap-box-cont" v-else-if="item.type == 'checkButton'">
                            <div class="ap-box-label" :style="props.style.labelStyle">
                                <span class="ap-box-label-necessary" v-if="item.isNecessary">*</span>
                                {{ item.label }}
                            </div>
                            <div class="ap-box-contBox" v-for="data in item.data">
                                <el-button v-bind="data.defaultAttribute" v-model="data.value">{{ data.name
                                }}</el-button>
                            </div>
                        </div>
                        <div class="ap-box-cont" v-else-if="item.type == 'custom'">
                            <div class="ap-box-label" :style="props.style.labelStyle">
                                <span class="ap-box-label-necessary" v-if="item.isNecessary">*</span>
                                {{ item.label }}
                            </div>
                            <div class="ap-box-contBox" v-for="data in item.data">
                                <slot :name="data.id"></slot>
                            </div>
                        </div>
                    </div>
                </div>
            </el-scrollbar>
            <!-- 分割 -->
            <div class="ap-division" :style="props.style.cutOffRuleStyle" v-if="state.cache.isUnfold == 1"></div>
            <div class="butData" :style="props.style.butLayoutStyle">
                <div class="ap-box" v-for="(item, index) in props.butData" @click="clickElement(item, index)"
                    :style="item.style">
                    <div class="ap-box-cont" v-if="item.type == 'click'">
                        <el-button v-bind="item.defaultAttribute">{{ item.name }}</el-button>
                    </div>
                    <div class="ap-box-cont unfold" v-if="item.type == 'unfold'" @click="clickCutUnfoldstatus">
                        <div class="unfold-" v-if="state.cache.isUnfold == 0">
                            展开
                            <img class="unfold-icon" src="../../assets/svg/xiangxia-lan.svg" alt="" srcset="">
                        </div>
                        <div v-else-if="state.cache.isUnfold == 1">
                            收起
                            <img class="unfold-icon" src="../../assets/svg/xiangshang-lan.svg" alt="" srcset="">
                        </div>
                    </div>
                    <div class="ap-box-cont" v-if="item.type == 'text'">
                        {{ item.name }}
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
    // 表单数据
    data: {
        type: Array,
        default: [],
    },
    // 按钮数据
    butData: {
        type: Array,
        default: [],
    },
    // 样式
    style: {
        type: Object,
        default: {
            lineStyle: {
                width: "calc(100% / 3)",
            },
            cutOffRuleStyle: {
                width: "100%",
            },
            labelStyle: {
                width: "100px"
            },
            butLayoutStyle: {
                width: "100%",
                "justify-content": "center",
            },
        },
    },
    // 默认属性
    defaultAttribute: {
        type: Object,
        default: {
            isUnfold: false,
            "scrollbar-max-height": "auto",
        }
    },
})
// console.log(props.defaultAttribute['scrollbar-max-height']);
const emit = defineEmits(['getCurrentValue', 'getCurrentValueAll', 'clickElement']);
const state = reactive({
    cache: {
        //分割线样式
        cutOffRuleStyle: {
            width: "100%",
        },
        //是否展开
        isUnfold: 0,
        //表单数据
        formData: [],
    }
});
//初始化表单单数据
function initFormData() {
    if (props.defaultAttribute.isUnfold) {
        state.cache.isUnfold = props.defaultAttribute.isUnfold
    }
    // 设置表单显示数据
    setFormData()
}
// 设置表单显示数据
function setFormData() {
    let formData = [];
    if (state.cache.isUnfold == 0) {
        props.data.map((item) => {
            if (item.inCommonUse) {
                formData.push(item);
            }
        })
    } else if (state.cache.isUnfold == 1) {
        formData = props.data
    }
    state.cache.formData = formData;
}
//获取当前表单的值
function getCurrentValue(item, index) {
    emit("getCurrentValue", item, index);
    getCurrentValueAll();
}
//获取全部表单的值
function getCurrentValueAll() {
    emit("getCurrentValueAll", props.data);
}
//点击按钮
function clickElement(item, index) {
    emit("clickElement", item, index);
}
//点击切换展开状态
function clickCutUnfoldstatus() {
    if (state.cache.isUnfold == 0) {
        state.cache.isUnfold = 1;
    } else if (state.cache.isUnfold == 1) {
        state.cache.isUnfold = 0;
    }
    // 设置表单显示数据
    setFormData()
}
onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
})
onMounted(() => {
    // console.log(`the component is now mounted.`)
    //初始化表单单数据
    initFormData()
})
</script>
<style lang='scss' scoped>
.components-searchForm {
    .ap-dis {
        padding: 0rem 0% 0rem 0%;
        display: flex;
        flex-flow: wrap;
        box-sizing: border-box;
    }

    .lineShow {
        flex-flow: nowrap;

        .fromData-scrollbar {
            width: auto;
            flex-grow: 1;
        }

        .butData {
            flex-grow: 0;
        }
    }

    .fromData-scrollbar {
        width: 100%;
    }

    .fromData {
        width: 100%;
        display: flex;
        flex-flow: wrap;
        box-sizing: border-box;
    }

    .ap-box {
        display: flex;
        align-items: center;
        @include mixin-padding-top(10);
        @include mixin-padding-bottom(10);
        @include mixin-padding-right(10);
        box-sizing: border-box;

        .ap-box-label {

            position: relative;

            .ap-box-label-necessary {
                color: red;
                left: -0.5rem;
                position: absolute;
            }
        }

        .ap-box-cont {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            width: 100%;

            .ap-box-contBox {
                flex-grow: 1;
            }

            .ap-box-autoBox {
                width: auto;
            }

            .checkbox {
                display: flex;
                align-items: center;
                margin-right: 10px;
            }
        }

        .ap-box-label {
            @include mixin-padding-right(10);
            box-sizing: border-box;
        }

    }

    .ap-division {
        padding: 0%;
    }

    .butData {
        display: flex;
        flex-flow: wrap;
        justify-content: flex-end;
        flex-grow: 1;

        .ap-box {
            margin-left: 10px;
            padding-right: 0%;
        }

        .unfold {
            display: flex;
            align-items: center;
            color: var(--Info-6);
            cursor: pointer;
            margin-right: 0.5rem;

            .unfold-icon {
                margin-left: 0.3rem;
            }
        }
    }

    .width-100 {
        width: 100% !important;
    }

    :deep {
        .el-button {
            border-style: dashed;
        }
    }

}
</style>