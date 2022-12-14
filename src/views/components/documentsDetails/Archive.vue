<template>
    <div class="archive-details">
        <div class="archive-result" v-for="(item, index) in data">
            <div class="archive-result-title" v-if="item.length > 0">
                <div v-if="index === 'currentResult'"><span></span>重置前归档文件</div>
                <div v-else><span class="history"></span>重置后归档文件</div>
            </div>
            <div class="archive-result-list">
                <div class="archive-result-item" v-for="(item_n, index_n) in item">
                    <div class="archive-item-base">
                        <div><span class="person"></span><text>归档人：{{ item_n[1] }}</text></div>
                        <div><span class="time"></span><text>归档时间：{{ item_n[2] }}</text></div>
                        <div><span class="file"></span><text>文件张数：{{ item_n[3] }}</text></div>
                        <div><span class="address"></span><text><a>归档地点：{{ item_n[4] }}</a></text></div>
                    </div>
                    <div class="archive-item-ocr" v-if="item_n[7]">
                        <span></span>
                        <a>归档文件核验结果</a>
                        <div class="ocr-num">
                            （新增文本<i>{{ item_n[8] }}</i>处、删除文本<i>{{ item_n[8] }}</i>处、修改文本<i>{{ item_n[8] }}</i>处）</div>
                    </div>
                    <div class="archive-item-pdf">
                        <div><span></span>{{ item_n[5] }}（{{ item_n[6] }}页）</div>
                        <div class="menu">
                            <a class="view">预览</a>
                            <a class="download">下载</a>
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
    // 归档列表
    data: {
        type: Object,
        default: {
            currentResult: [],//重置后列表
            historyResult: [],//重置前列表
        },
    }
})
onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
})
onMounted(() => {
    // console.log(`the component is now mounted.`)
})
</script>
<style lang='scss' scoped>
.archive-result-title {
    margin-bottom: 17px;

    >div {
        display: flex;
        align-items: center;

        >span {
            width: 24px;
            height: 24px;
            margin-right: 12px;
            border-radius: 50%;
            background-position: center;
            background-repeat: no-repeat;
            background-image: url('../../../assets/svg/archive/current-icon.svg');
            background-color: rgba(247, 165, 75, 0.1);
        }

        >.history {
            background-image: url('../../../assets/svg/archive/history-icon.svg');
            background-color: rgba(62, 120, 208, 0.1);
        }
    }
}

.archive-result-item {
    background: rgba(0, 0, 0, 0.02);
    margin-bottom: 12px;
    padding: 12px;
    box-sizing: border-box;

    .archive-item-base {
        display: flex;
        justify-content: flex-start;
        margin-bottom:12px;
        >div {
            margin-right: 26px;
            display: flex;
            align-items: center;

            >text {
                width: calc(100% - 22px);
                >a{
                    color: #3E78D0;
                    text-decoration-line: underline;
                }
            }

            >span {
                width: 12px;
                height: 15px;
                margin-right: 10px;
                background-position: center;
                background-repeat: no-repeat;
                background-image: url('../../../assets/svg/archive/person-icon.svg');
            }

            >.time {
                background-image: url('../../../assets/svg/archive/time-icon.svg');
            }

            >.file {
                background-image: url('../../../assets/svg/archive/file-icon.svg');
            }

            >.address {
                background-image: url('../../../assets/svg/archive/address-icon.svg');
            }
        }
    }

    .archive-item-ocr {
        display: flex;
        align-items: center;
        margin-bottom:12px;
        >span {
            width: 12px;
            height: 15px;
            margin-right: 10px;
            background-position: center;
            background-repeat: no-repeat;
            background-image: url('../../../assets/svg/archive/ocr-icon.svg');
        }

        >a {
            color: #3E78D0;
            text-decoration-line: underline;
        }

        .ocr-num {
            color: rgba(0, 0, 0, 0.45);

            >i {
                font-style: normal;
                color: #D04D3E;
            }
        }
    }

    .archive-item-pdf {
        display: flex;
        align-items: center;

        >div {
            display: flex;
            align-items: center;

            >span {
                width: 13px;
                height: 16px;
                margin-right: 10px;
                background-position: center;
                background-repeat: no-repeat;
                background-image: url('../../../assets/svg/archive/pdf-icon.svg');
            }
            >a{
                color: #F7A54B;
            }
            >.download{
                color: #3E78D0;
                margin-left:12px;
            }
        }

    }
}
</style>