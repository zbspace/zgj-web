<template>
    <div class="components-searchForm">
        <div class="ap-box" v-for="(item, index) in props.data" :style="[props.style.lineStyle, item.style]"
            @click="clickElement(item, index)">
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
                    <el-button v-bind="data.defaultAttribute" v-model="data.value">{{ data.name }}</el-button>
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
        <!-- 分割 -->
        <div class="ap-division" :style="props.style.cutOffRuleStyle"></div>
        <div class="butData" :style="props.style.butLayoutStyle">
            <div class="ap-box" v-for="(item, index) in props.butData" @click="clickElement(item, index)"
                :style="item.style">
                <div class="ap-box-cont" v-if="item.type == 'click'">
                    <el-button v-bind="item.defaultAttribute">{{ item.name }}</el-button>
                </div>
                <div class="ap-box-cont unfold" v-if="item.type == 'unfold'">
                    <el-button v-bind="item.defaultAttribute">{{ item.name }}</el-button>
                </div>
                <div class="ap-box-cont" v-if="item.type == 'text'">
                    {{ item.name }}
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
                width: "50%",
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
        default: {}
    },
})
const emit = defineEmits(['getCurrentValue', 'getCurrentValueAll', 'clickElement']);
const state = reactive({
    cache: {
        //分割线样式
        cutOffRuleStyle: {
            width: "100%",
        }
    }
});
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
onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
})
onMounted(() => {
    // console.log(`the component is now mounted.`)
})
</script>
<style lang='scss' scoped>
.components-searchForm {
    padding: 0rem 0% 1rem 0%;
    display: flex;
    flex-flow: wrap;
    box-sizing: border-box;

    .ap-box {
        display: flex;
        align-items: center;
        margin: 10px 0;

        .ap-box-label {

            position: relative;

            .ap-box-label-necessary {
                color: red;
                left: 0%;
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
            padding: 0 10px;
            box-sizing: border-box;
        }

    }

    .ap-division {
        padding: 0%;
    }

    .butData {
        display: flex;
        flex-flow: wrap;

        .ap-box {
            margin-left: 10px;
        }
    }

    .width-100 {
        width: 100% !important;
    }
}
</style>