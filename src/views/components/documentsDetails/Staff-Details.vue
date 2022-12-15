<!-- 员工详情 -->
<template>
    <div class="documentsDetails-informationList">
        <div class="ap-desc">
            <div class="ap-desc-jianc">{{ state.props.data.name.slice(-2) }}</div>
            <div class="ap-desc-name">
                <div class="ap-desc-name-text">{{ state.props.data.name }}</div>
                <div class="ap-desc-name-xinxi">
                    <div class="ap-desc-name-xinxi-cellPhone">手机号：{{ state.props.data.cellPhone }}</div>
                    <div class="ap-desc-name-xinxi-account">账号：{{ state.props.data.account }}</div>
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


}
</style>