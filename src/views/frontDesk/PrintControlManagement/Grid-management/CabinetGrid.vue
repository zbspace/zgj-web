<!-- 智能印章盒格口管理 -->
<template>
    <div class="PrintControlManagement-IntelligentSealBoxManagement">
        <componentsLayout Layout="title,searchForm,custom">
            <template #title>
                <div class="title">
                    <div>格口管理</div>
                </div>

                <div class="search">
                    <div class="select-wrap">
                        <span class="search-label">终端名称</span>
                        <el-select v-model="state.terminalGrid" placeholder="请选择终端名称" size="small"
                            @change="changeSelect">
                            <el-option v-for="item in state.termialOptions" :key="item.id" :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="box-card">
                        <!-- status -->
                        <div class="status" v-if="state.mouthLists.length !== 0">
                            <div class="columns-check">
                                <u class="check-flex">
                                    <div class="check-last" @click="lastTimeCheck">
                                        查看最近一次盘点结果<span>({{ state.lastCheckTime }})</span>
                                    </div>
                                </u>
                                <div class="grid-btns">
                                    <div class="check-button" @click="checkAll">一键盘点</div>
                                    <div class="grid-type" @click="goGridType">格口类型</div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>


                <div class="columns-status">
                    <div class="device-tab">
                        <div class="device-item" :class="{ 'selected': state.sealBoxIndex == index }"
                            v-for="(item, index) in state.deviceList" :key="index" @click.stop="selectSealBox(index)">
                            {{ item.deviceName }}</div>
                    </div>
                    <MouthStatus></MouthStatus>
                </div>
            </template>
            <template #custom>
                <div class="tableData">
                    <div class="tableData-item" v-for="(it, io) in handleGrid()" v-bind:key="io">
                        <!-- :class="{ 'grid-item-pan': panIng && (panIndex[0] == io && panIndex[1] == index), 'grid-item-limit': panIng && !item.enable }" -->
                        <div class="grid-item" v-for="(item, index) in it" v-bind:key="index" @click="goDetail(item)">
                            <div class="err-ignore" v-if="item.state < 0">格口异常<span
                                    v-if="item.ignoreException">（已忽略）</span></div>
                            <div class="grid-left">
                                <h3>{{ item.boxCode }}</h3>
                                <p>{{ item.boxTypeName }}</p>
                            </div>
                            <div class="grid-right">
                                <div class="grid-seal" :class="{ 'grid-seal-column': item.positionList.length > 5 }"
                                    v-if="item.positionList && item.positionList.length > 1">
                                    <!-- && (item.positionList.length != 3 && item.positionList.length != 9) -->
                                    <div :class="[(item_n && item_n.state < 0) ? 'grid-seal-item-error' : '', 'grid-seal-item' + item.positionList.length, (item_n.bindState < 1 || (item_n.state == 0 && item_n.inBoxState == 0)) ? 'bindNo' : '']"
                                        class="grid-seal-item" v-for="(item_n, index_n) in item.positionList"
                                        v-bind:key="index_n">
                                        <div v-if="item_n.bindState > 0">
                                            <img v-if="item.positionList.length < 4 && (item_n.state == 0 && item_n.inBoxState > 0)"
                                                src="../../../../assets/svg/device/seal-zn-icon.svg" />
                                            <img v-if="item.positionList.length < 4 && (item_n.state == -2)"
                                                src="../../../../assets/svg/device/seal-zn-icon.svg" />
                                            <img v-if="item.positionList.length < 4 && (item_n.state == 0 && item_n.inBoxState == 0)"
                                                src="../../../../assets/svg/device/seal-zn-out-icon.svg" />
                                            <img v-if="item.positionList.length < 4 && item_n.state == -1"
                                                src="../../../../assets/svg/device/seal-zn-error-icon.svg" />
                                            <img v-if="item.positionList.length > 5 && item_n.state == -1"
                                                src="../../../../assets/svg/device/seal-pt-error-icon.svg" />
                                            <img v-if="item.positionList.length > 5 && (item_n.state == 0 && item_n.inBoxState == 0)"
                                                src="../../../../assets/svg/device/seal-pt-out-icon.svg" />
                                            <img v-if="item.positionList.length > 5 && (item_n.state == -2)"
                                                src="../../../../assets/svg/device/seal-pt-icon.svg" />
                                            <img v-if="item.positionList.length > 5 && (item_n.state == 0 && item_n.inBoxState == 1)"
                                                src="../../../../assets/svg/device/seal-pt-icon.svg" />
                                        </div>
                                    </div>
                                </div>
                                <div class="grid-seal grid-seal-noPosition"
                                    v-if="!item.positionList || item.positionList.length < 2">
                                    <!-- || item.positionList.length == 3 || item.positionList.length == 9 -->
                                    <div class="grid-seal-Text">
                                        <div>
                                            <div class="text-item">已绑定印章：</div><span>{{ item.bindCount }}</span>
                                        </div>
                                        <div>
                                            <div class="text-item">在柜印章：</div><span>{{ item.inCount }}</span>
                                        </div>
                                        <div>
                                            <div class="text-item">箱门状态：</div>
                                            <span style="color:#E2B062" v-if="item.hasPositionLock">
                                                <span v-if="item.positionIsClosed">
                                                    <span v-if="item.closed">关</span>
                                                    <span v-else style="color:green">开</span>
                                                </span>
                                                <span v-else style="color:green">开(内)</span>
                                            </span>
                                            <span style="color:#E2B062" v-else>
                                                <span v-if="item.closed">关</span>
                                                <span v-else style="color:green">开</span>
                                            </span>
                                        </div>
                                        <div>
                                            <div class="text-item">格口状态：</div>
                                            <span style="color:#E2B062" v-if="item.enable">
                                                <span v-if="item.state == 0">正常</span>
                                                <span v-else-if="item.state == -1" style="color: red"
                                                    @click="handleManage(item)">异常</span>
                                            </span>
                                            <span style="color:#E2B062" v-else>已禁用</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="grid-btn">
                                    <el-button class="openLock" @click.stop="handleOpen(item)">开锁</el-button>
                                    <el-button class="check-btn btn" @click.stop="handlePan(item)">盘点</el-button>
                                </div>
                                <div class="grid-btn" v-if="false">
                                    <div class="grid-pan-text" v-if="item.enable">
                                        <p v-if="(io > panIndex[0]) || (panIndex[0] == io && index > panIndex[1])">
                                            待盘点</p>
                                        <p v-if="panIndex[0] == io && panIndex[1] == index">盘点中...</p>
                                        <p class="pan-success"
                                            v-if="(io < panIndex[0]) || (panIndex[0] == io && index < panIndex[1])">
                                            盘点完成<i></i></p>
                                    </div>
                                    <div class="grid-pan-text" v-if="!item.enable">
                                        <p class="pan-limit">格口已禁用</p>
                                    </div>
                                </div>
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
import Layout from "../../../../layouts/main.vue";
import componentsTable from "../../../components/table"
import componentsSearchForm from "../../../components/searchForm"
import componentsTree from "../../../components/tree"
import componentsBreadcrumb from "../../../components/breadcrumb"
import componentsPagination from "../../../components/pagination.vue"
import componentsTabs from "../../../components/tabs.vue"
import componentsLayout from "../../../components/Layout.vue"
import KDialog from "@/views/components/modules/kdialog.vue"
import FormJson from '@/views/addDynamicFormJson/IntelligentSealBoxManagement.json'
import { ElMessage, ElMessageBox } from 'element-plus'
import componentsDocumentsDetails from "../../../components/documentsDetails.vue"
import MouthStatus from "@/views/frontDesk/PrintControlManagement/Grid-management/components/MouthStatus"
import MouthCard from "@/views/frontDesk/PrintControlManagement/Grid-management/components/mouthCard"
import { useRouter } from 'vue-router'

const router = useRouter();
const props = defineProps({
    // 处理类型
    type: {
        type: String,
        default: "0",
    },
})
const state = reactive({
    lastCheckTime: '2022-12-26 12:00:00',
    terminalGrid: '243印章盒001',
    termialOptions: [
        {
            id: 1,
            name: '243印章盒001',
            label: 1
        },
        {
            id: 2,
            name: '243印章盒002',
            label: 2
        },
        {
            id: 3,
            name: '243印章盒003',
            label: 3
        },
    ],
    sealBoxIndex: 0,
    deviceList: [
        {
            deviceName: 'A-1',
            id: ''
        },
        {
            deviceName: 'A-2',
            id: ''
        },
        {
            deviceName: 'A-3',
            id: ''
        }
    ],
    mouthLists: [
        {
            state: 0,
            inBoxState: 1,
            bindState: 1,
            link: '',
            ignoreException: false,
            boxCode: 'A-1-1',
            productName: '243测试章',
            boxTypeName: '普通印章',
            positionList: [
                {
                    //未绑定
                    state: 0,
                    inBoxState: 0,
                    bindState: 0,
                },
                {
                    //正常在柜
                    state: 0,
                    inBoxState: 1,
                    bindState: 1,
                },
                {
                    //正常取出
                    state: 0,
                    inBoxState: 0,
                    bindState: 1,
                },
                {
                    //异常取出
                    state: -1,
                    inBoxState: 0,
                    bindState: 1,
                },
                {
                    //异常放入
                    state: -2,
                    inBoxState: 0,
                    bindState: 1,
                },
                {
                    //正常在柜
                    state: 0,
                    inBoxState: 1,
                    bindState: 1,
                }
            ]
        },
        {
            state: -1,
            inBoxState: 1,
            bindState: 1,
            link: '',
            ignoreException: false,
            boxCode: 'A-1-2',
            productName: '243测试章',
            boxTypeName: '普通印章',
            positionList: [
                {
                    //未绑定
                    state: 0,
                    inBoxState: 0,
                    bindState: 0,
                },
                {
                    //正常在柜
                    state: 0,
                    inBoxState: 1,
                    bindState: 1,
                },
            ]
        },
        {
            state: -2,
            inBoxState: 1,
            bindState: 1,
            link: '',
            ignoreException: false,
            boxCode: 'A-1-3',
            productName: '243测试章',
            boxTypeName: '普通印章',
            positionList: [
                {},
                {},
                {},
                {},
                {},
                {}
            ]
        },
        {
            state: 0,
            inBoxState: 0,
            bindState: 0,
            link: '',
            ignoreException: false,
            boxCode: 'A-1-4',
            productName: '243测试章',
            boxTypeName: '普通印章',
            positionList: [
                {},
                {},
            ]
        },
        {
            state: 0,
            inBoxState: 0,
            bindState: 1,
            link: '',
            ignoreException: false,
            boxCode: 'A-1-5',
            productName: '243测试章',
            boxTypeName: '智能印章（锁）',
            positionList: [
                {
                    //未绑定
                    state: 0,
                    inBoxState: 0,
                    bindState: 0,
                },
                {
                    //正常在柜
                    state: 0,
                    inBoxState: 1,
                    bindState: 1,
                },
                {
                    //正常取出
                    state: 0,
                    inBoxState: 0,
                    bindState: 1,
                },
                {
                    //异常取出
                    state: -1,
                    inBoxState: 0,
                    bindState: 1,
                },
                {
                    //异常放入
                    state: -2,
                    inBoxState: 0,
                    bindState: 1,
                },
                {
                    //正常在柜
                    state: 0,
                    inBoxState: 1,
                    bindState: 1,
                },
                {
                    //未绑定
                    state: 0,
                    inBoxState: 0,
                    bindState: 0,
                },
                {
                    //未绑定
                    state: 0,
                    inBoxState: 0,
                    bindState: 0,
                },
                {
                    //未绑定
                    state: 0,
                    inBoxState: 0,
                    bindState: 0,
                }
            ]
        },
        {
            state: -2,
            inBoxState: 0,
            bindState: 1,
            link: '',
            ignoreException: true,
            boxCode: 'A-1-6',
            productName: '243测试章',
            boxTypeName: '智能印章（锁）',
            positionList: [
                {
                    //正常取出
                    state: 0,
                    inBoxState: 0,
                    bindState: 1,
                },
                {
                    //异常取出
                    state: -1,
                    inBoxState: 0,
                    bindState: 1,
                },
                {
                    //异常放入
                    state: -2,
                    inBoxState: 0,
                    bindState: 1,
                },
            ]
        },
        {
            state: 1,
            inBoxState: 1,
            bindState: 1,
            link: false,
            ignoreException: false,
            boxCode: 'A-1-7',
            productName: '243测试章',
            boxTypeName: '智能印章（锁）',
            positionList: [
                {},
                {},
                {},
                {},
                {},
                {}
            ]
        },
        {
            state: 1,
            inBoxState: 1,
            bindState: 1,
            bindCount: 3,
            inCount: 2,
            link: '',
            ignoreException: false,
            boxCode: 'A-1-8',
            productName: '243测试章',
            boxTypeName: '智能印章（锁）',
            positionList: []
        }
    ]
})

const showFormDialog = ref(false)
const formJson = reactive(FormJson)
const formData = reactive({})
const optionData = reactive({})
const dialogVisible = ref(false)
const vFormRef = ref(null)
const submitForm = (type) => {
    if (!type) {
        vFormRef.value.resetForm()
        return
    }
    vFormRef.value.getFormData().then(formData => {
        // Form Validation OK
        alert(JSON.stringify(formData))
        showFormDialog.value = false
    }).catch(error => {
        // Form Validation failed

        ElMessage.error(error)
    })
}

const emit = defineEmits([]);

// 点击表格单元格
function cellClick(row, column, cell, event) {
    console.log(row, column, cell, event);
    if (column.property == "3") {
        state.componentsDocumentsDetails.show = true;
    }
}
//点击关闭
function clickClose() {
    state.componentsDocumentsDetails.show = false;
}
//点击表格按钮
function customClick(row, column, cell, event) {
    console.log(cell.name);
    if (cell.name === '修改') {
        showFormDialog.value = true;
    }
    if (cell.name == '删除') {
        ElMessageBox.confirm(
            '您确定要删除该记录吗？',
            {
                confirmButtonText: '确认',
                cancelButtonText: '关闭',
                type: 'warning',
            }
        )
            .then(() => {

            })
    }
}
function goDetail(item) {
    router.push({
        path: "/frontDesk/equipmentManage/IntelligentSealCabinetManagement/cabinetGridInfo"
    })
}
function goGridType() {
    router.push({
        // path: "/frontDesk/PrintControlManagement/Grid-management/GridType"
        name: 'GridType'
    })
}
function selectSealBox(index) {
    state.sealBoxIndex = index;
}
function handleGrid() {
    let gridData1 = [];
    let gridData2 = [];
    let columnNum = state.mouthLists.length / 2;
    state.mouthLists.map((item, index) => {
        if (index < columnNum) {
            gridData1.push(item);
        } else {
            gridData2.push(item);
        }
    })
    return [gridData1, gridData2]
}
function lastTimeCheck() {
    router.push({
        // path: "/frontDesk/PrintControlManagement/Grid-management/ViewCheckInfo"
        name: 'ViewCheckInfo'
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
.PrintControlManagement-IntelligentSealBoxManagement {
    margin: 0%;

    .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .batch {
        display: flex;
        align-items: center;

        .batch-desc {
            @include mixin-margin-right(12)
        }
    }
}

.container-mouth {
    min-width: 1100px;
}

.box-card {
    margin: 10px;

    .header-title {
        position: relative;
        line-height: 25px;
        font-size: 16px;
        font-weight: 500;

        &::before {
            content: "";
            height: 26px;
            width: 4px;
            background: #e2b062;
            position: absolute;
            top: 0px;
            left: -15px;
        }
    }

    .emtype-list {
        display: flex;
        height: 500px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        font-size: 24px;
        color: #666666;
        text-align: center;

        img {
            width: 540px;
            height: 234px;
        }
    }

    .status {
        display: flex;

        .columns-check {
            display: flex;
            margin: 15px 0;

            .check-button {
                width: 118px;
                height: 36px;
                color: #ffffff;
                background: #D0963E;
                border-radius: 4px;
                text-align: center;
                line-height: 36px;
                cursor: pointer;
                font-size: 14px;
            }

            .check-flex {
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                color: #3E78D0;
                margin-right: 12px;
            }

            .check-last {
                font-weight: 400;
                font-size: 12px;
                color: #3E78D0;
                text-align: center;
                cursor: pointer;

                >span {
                    margin-left: 10px;
                }
            }

            .grid-btns {
                display: flex;

                .grid-type {
                    width: 118px;
                    height: 36px;
                    background: #FFFFFF;
                    mix-blend-mode: normal;
                    /* 线条 border/描边 */
                    border: 1px solid rgba(0, 0, 0, 0.15);
                    border-radius: 2px;
                    text-align: center;
                    line-height: 36px;
                    margin-left: 16px;
                    font-size: 14px;
                    color: rgba(0, 0, 0, 0.65);
                    cursor: pointer;
                }

                .check-button {}
            }
        }

        .columns-status {
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex: 1;
        }
    }
}

.columns-status {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 16px 0;

    .device-tab {
        display: flex;
        padding: 0;
        background: rgba(0, 0, 0, 0.04);
        /* 线条 border/描边 */

        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 2px;

        .device-item {
            width: 84px;
            height: 24px;
            background: #EAEAEA;
            border-radius: 4px;
            list-style: none;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: PingFang-SC-Bold;
            font-size: 12px;
            color: rgba(0, 0, 0, 0.85);
            text-align: center;
            cursor: pointer;
        }

        .selected {
            background: #FFFFFF;
            color: #D0963E;
        }
    }
}

.search {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .search-label {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.85);
        margin-right: 16px;
    }

}

.tableData {
    display: flex;
    justify-content: space-between;
    // height:640px;
    // overflow-y:auto;
    padding-right: 20px;
    min-width: 900px;

    >.tableData-item {
        width: calc(50% - 15px);
    }

    div {
        padding: 0;
        margin: 0;

    }

    span {
        padding: 0;
        margin: 0;

    }

    .grid-item {
        width: 100%;
        height: 160px;
        background: #FFFFFF;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 2px;
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        // justify-content:center;
        position: relative;
        padding: 20px 0;

        .err-ignore {
            position: absolute;
            top: 0;
            left: 0;
            width: 120px;
            height: 24px;
            // background: #E2B062;
            background: #F57777;
            border-radius: 4px 0px 72px;
            font-family: PingFangSC-Medium;
            font-size: 12px;
            color: #FAFAFA;
            text-align: center;
            font-weight: 500;
            line-height: 24px;
            text-align: center;
        }

        .grid-left {
            display: flex;
            flex-direction: column;
            width: 34%;
            height: 120px;
            align-items: center;
            justify-content: center;
            border-right: 1px dashed rgba(0, 0, 0, 0.15);
            margin-right: 10%;

            >h3 {
                font-size: 22px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 400;
                font-style: normal;
                color: rgba(0, 0, 0, 0.85);
                margin-bottom: 12px;
            }

            >p {
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: rgba(0, 0, 0, 0.45);
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                padding: 0 10px;
            }
        }

        .grid-right {
            width: 66%;
            display: flex;
            align-items: center;

            .grid-seal {
                width: 160px;
                height: 120px;
                background: #ECECEC;
                box-shadow: inset 1px 2px 5px rgba(0, 0, 0, 0.194247);
                border-radius: 4px;
                border: 1px solid #DFDFDF;
                padding: 8px;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                justify-content: space-between;

                .grid-seal-item {
                    background: #fff;
                    border-radius: 3px;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    >span {
                        width: 8px;
                        height: 8px;
                        position: absolute;
                        right: -3px;
                        bottom: -3px;
                        background-image: url('../../assets/image/bind-no-icon.png');
                        background-size: 100% auto;
                        background-repeat: no-repeat;
                    }

                    >.bind {
                        background-image: url('../../assets/image/bind-icon.png');
                    }
                }

                .bindNo {
                    background: rgba(0, 0, 0, 0.09);
                }

                .grid-seal-item-error {
                    background: rgba(255, 0, 0, 0.49);
                }

                .grid-seal-item2 {
                    width: 69px;
                    height: 104px;

                }

                .grid-seal-item6 {
                    width: 69px;
                    height: 32px;
                }

                .grid-seal-item3 {
                    width: 44px;
                    height: 104px;
                }

                .grid-seal-item9 {
                    width: 44px;
                    height: 32px;
                }
            }

            .grid-seal-column {
                flex-direction: column;
            }

            .grid-seal-noPosition {
                .grid-seal-Text {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: center;
                    width: 100%;
                    height: 100%;
                    background: rgba(255, 255, 255, 0.8);
                    border-radius: 2.8px;

                    >div {
                        display: flex;
                        font-size: 13px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: #333333;
                        margin-bottom: 4px;
                        // line-height: 0;
                        margin: 0;
                        padding: 0;
                        align-items: center;
                        margin-bottom: 3px;

                        >div {
                            text-align: right;
                            width: 80px;
                            margin-right: 16px;
                            color: rgba(0, 0, 0, 0.45);
                            font-size: 12px;
                        }

                        >span {
                            font-size: 12px;
                        }
                    }
                }

            }

            .grid-btn {
                width: calc(100% - 160px);
                display: flex;
                flex-direction: column;
                align-items: center;

                >button {
                    width: 74px;
                    height: 32px;
                    border: none;
                    background: #fff;
                    font-size: 14px;
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: normal;
                    color: #D0963E;
                    border: 1px solid #D0963E;
                    // background-image: url('../../assets/image/bindseal-bg.png');
                    background-size: 100% auto;
                    background-repeat: no-repeat;
                    border-radius: 2px;
                }

                .check-btn {
                    margin-left: 0;
                }

                >.openLock {
                    background: #D0963E;
                    color: #FFFFFF;
                    font-size: 14px;
                    margin-bottom: 16px;
                    border: none;
                }

                >.grid-pan-text {
                    >p {
                        font-family: PingFangSC-Medium;
                        font-size: 16px;
                        color: #E2B062;
                        text-align: center;
                        font-weight: 500;
                    }

                    >.pan-success {
                        font-family: PingFangSC-Medium;
                        font-size: 16px;
                        color: #7BCF8C;
                        text-align: center;
                        font-weight: 500;
                        display: flex;
                        align-items: center;

                        >i {
                            margin-left: 10px;
                            width: 14px;
                            height: 14px;
                            background-image: url('../../assets/image/pan_success.png');
                            background-size: 100% auto;
                            background-repeat: no-repeat;
                        }
                    }

                    >.pan-limit {
                        color: #BABABA;
                    }
                }
            }
        }
    }

    .grid-item:hover {
        box-shadow: 0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05);
    }
}

.el-row-wrap {
    padding-right: 16px;
    box-sizing: border-box;
}

:deep(.el-input__inner) {
    height: 32px;
}

:deep.el-card .el-card__header {
    padding: 14px 15px 7px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both;
}
</style>