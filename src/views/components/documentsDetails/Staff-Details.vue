<!-- 员工详情 -->
<template>
    <div class="documentsDetails-informationList">
        <div class="ap-desc">
            <div class="ap-desc-img">
                <img class="ap-desc-img-back" src="../../../assets/svg/yuangong-xingqing-back.svg" alt="">
            </div>
            <div class="ap-desc-cont">
                <div class="ap-desc-jianc">
                    <div class="ap-desc-jianc-text">{{ state.props.data.name.slice(-2) }}</div>
                </div>
                <div class="ap-desc-name">
                    <div class="ap-desc-name-text">{{ state.props.data.name }}</div>
                    <div class="ap-desc-name-xinxi">
                        <div class="ap-desc-name-xinxi-cellPhone">手机号：{{ state.props.data.cellPhone }}</div>
                        <div class="ap-desc-name-xinxi-fenge"></div>
                        <div class="ap-desc-name-xinxi-account">账号：{{ state.props.data.account }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="ap-detail">
            <div class="ap-detail-label">所属部门：</div>
            <div class="ap-detail-cont">
                <div class="ap-detail-cont-val" v-for="item in state.props.data.departmentList">
                    {{ item.name }}
                </div>
            </div>
        </div>
        <div class="ap-detail">
            <div class="ap-detail-label">角色：</div>
            <div class="ap-detail-cont">
                <div class="ap-detail-cont-val">
                    {{ state.props.data.role }}
                </div>
            </div>
        </div>
        <div class="ap-detail">
            <div class="ap-detail-label">职位：</div>
            <div class="ap-detail-cont">
                <div class="ap-detail-cont-val">
                    {{ state.props.data.jobTitle }}
                </div>
            </div>
        </div>

        <div class="ap-detail">
            <div class="ap-detail-label">邮箱：</div>
            <div class="ap-detail-cont">
                <div class="ap-detail-cont-val">
                    {{ state.props.data.mailbox }}
                </div>
            </div>
        </div>
        <div class="ap-detail">
            <div class="ap-detail-label">企业微信ID：</div>
            <div class="ap-detail-cont">
                <div class="ap-detail-cont-val">
                    {{ state.props.data.EnterpriseWechatID }}
                </div>
            </div>
        </div>
        <div class="ap-detail">
            <div class="ap-detail-label">钉钉ID：</div>
            <div class="ap-detail-cont">
                <div class="ap-detail-cont-val">
                    {{ state.props.data.NailID }}
                </div>
            </div>
        </div>
        <div class="ap-detail">
            <div class="ap-detail-label">备注：</div>
            <div class="ap-detail-cont">
                <div class="ap-detail-cont-val">
                    {{ state.props.data.remark }}
                </div>
            </div>
        </div>
        <div class="ap-detail imageData">
            <div class="ap-detail-label">人脸图片：</div>
            <div class="ap-detail-cont">
                <div class="ap-detail-cont-val">
                    <img class="imageData-back" :src="state.props.data.FacePicturePath" alt="">
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { reactive, defineProps, defineEmits, onBeforeMount, onMounted, watch } from "vue"
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
        type: Object,
        default: {}
    },
})
const emit = defineEmits([]);
const state = reactive({
    props: {
        data: {},
    },
});
// 初始化数据
function initData() {
    state.props = props;
}
watch(props, (newValue, oldValue) => {
    // console.log(newValue, oldValue);
    //初始化数据
    initData();
})
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
.documentsDetails-informationList {
    margin: 0%;

    .ap-desc {
        display: flex;
        align-items: center;
        position: relative;
        margin: 1rem 0;

        .ap-desc-img {
            width: 100%;
            height: 8rem;
            display: flex;
            justify-content: flex-end;
            background-color: #F2F2F2;
            padding-right: 1rem;

            .ap-desc-img-back {
                height: 100%;
            }
        }

        .ap-desc-cont {
            position: absolute;
            left: 0%;
            top: 0%;
            width: 100%;
            height: 100%;
            padding: 1rem;
            box-sizing: border-box;
            display: flex;
            align-items: center;
        }

        .ap-desc-jianc {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0rem 2rem;
            box-sizing: border-box;

            .ap-desc-jianc-text {
                width: 4rem;
                height: 4rem;
                border-radius: 50%;
                background-color: var(--primary-6);
                color: var(--in-common-use-1);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1;
            }
        }

        .ap-desc-name {
            .ap-desc-name-text {
                font-size: var(--font-size-title-2);
                margin-bottom: 1rem;
            }

            .ap-desc-name-xinxi {
                display: flex;
                align-items: center;
                width: 20rem;
                justify-content: space-between;

                .ap-desc-name-xinxi-fenge {
                    height: 1rem;
                    border-left: 1px solid var(--color-border-2);
                }
            }
        }
    }

    .ap-detail {
        margin: 1rem 0;
        display: flex;
        .ap-detail-label{
            color: var(--color-text-3);
            display: flex;
            justify-content: flex-end;
            width: 6rem;
            margin-right: 0.5rem;
        }
.ap-detail-cont-val{
    margin-bottom: 0.5rem;
    box-sizing: border-box;
}
    }
}
</style>