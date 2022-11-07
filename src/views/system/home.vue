<template>
    <Layout>
        <div class="system-home">
            <div class="row ap-row">
                <div class="col-xxl-3 panel-box">
                    <div class="panel-cent">
                        <div class="panel-box-o">
                            <span class="panel-box-o-big">720</span>
                            <span class="panel-box-o-text">人</span>
                        </div>
                        <div class="panel-box-t">
                            员工总数
                        </div>
                        <div class="panel-box-th"></div>
                    </div>
                </div>
                <div class="col-xxl-3 panel-box">
                    <div class="panel-cent">

                        <div class="panel-box-o">
                            <span class="panel-box-o-big">15</span>
                            <span class="panel-box-o-text">人</span>
                        </div>
                        <div class="panel-box-t">
                            今日员工登录数
                        </div>
                        <div class="panel-box-th"></div>
                    </div>
                </div>
                <div class="col-xxl-3 panel-box">
                    <div class="panel-cent">

                        <div class="panel-box-o">
                            <span class="panel-box-o-big">74</span>
                            <span class="panel-box-o-num">/391</span>
                            <span class="panel-box-o-text">枚</span>
                        </div>
                        <div class="panel-box-t">
                            绑定数/印章总数
                        </div>
                        <div class="panel-box-th"></div>
                    </div>
                </div>
                <div class="col-xxl-3 panel-box">
                    <div class="panel-cent">

                        <div class="panel-box-o">
                            <span class="panel-box-o-big">2979</span>
                            <span class="panel-box-o-text">天</span>
                        </div>
                        <div class="panel-box-t">
                            倒计时间
                        </div>
                        <div class="panel-box-th">
                            2030-12-24（到期）
                        </div>
                    </div>
                </div>
            </div>
            <div class="row ap-row">
                <div class="col-xxl-12">
                    <div class="charts">
                        <div class="charts-title">每日用印情况统计图</div>
                        <!-- <apexchart class="apex-charts" height="350" dir="ltr" type="line"
                            :series="dashedLineChartseries" :options="dashedLineChartoptions"></apexchart> -->
                        <vue-echarts :option="echartslineoption" style="height: 350px" />
                    </div>
                </div>
            </div>
            <div class="row ap-row">
                <div class="col-xxl-12">
                    <div class="charts">
                        <div class="charts-title">印章使用情况统计图</div>
                        <!-- <apexchart class="apex-charts" height="350" dir="ltr" type="bar"
                            :series="basicColumnChartseries" :options="basicColumnChartoptions"></apexchart> -->
                        <vue-echarts :option="echartsbaroption" style="height: 350px" />
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>
<script>
import { VueEcharts } from "vue3-echarts";
import Layout from "../../layouts/main.vue";
export default {
    name: "system-home",
    data() {
        return {
            dashedLineChartoptions: {
                xaxis: {
                    categories: [
                        "2022-10-01",
                        "2022-10-02",
                        "2022-10-03",
                        "2022-10-04",
                        "2022-10-05",
                        "2022-10-06",
                        "2022-10-07",
                        "2022-10-08",
                        "2022-10-09",
                        "2022-10-10",
                        "2022-10-11",
                        "2022-10-12",
                        "2022-10-13",
                        "2022-10-14",
                        "2022-10-15",
                        "2022-10-16",
                        "2022-10-17",
                        "2022-10-18",
                        "2022-10-19",
                        "2022-10-20",
                        "2022-10-21",
                        "2022-10-22",
                        "2022-10-23",
                        "2022-10-24",
                        "2022-10-25",
                        "2022-10-26",
                        "2022-10-27",
                        "2022-10-28"
                    ]
                }
            },
            dashedLineChartseries: [{
                name: '远程盖章',
                data: [
                    "0",
                    "0",
                    "0",
                    "0",
                    "0",
                    "0",
                    "0",
                    "0",
                    "7",
                    "9",
                    "2",
                    "0",
                    "0",
                    "0",
                    "0",
                    "0",
                    "0",
                    "2",
                    "1",
                    "0",
                    "6",
                    "0",
                    "0",
                    "0",
                    "0",
                    "4",
                    "1",
                    "1"
                ]
            }, {
                name: '智能用印',
                data: [
                    "0",
                    "0",
                    "0",
                    "0",
                    "0",
                    "0",
                    "0",
                    "0",
                    "0",
                    "0",
                    "0",
                    "0",
                    "0",
                    "0",
                    "0",
                    "0",
                    "0",
                    "0",
                    "0",
                    "0",
                    "0",
                    "0",
                    "0",
                    "0",
                    "2",
                    "0",
                    "0",
                    "0"
                ]
            }, {
                name: '普通用印',
                data: [
                    "0",
                    "0",
                    "0",
                    "0",
                    "0",
                    "0",
                    "0",
                    "0",
                    "7",
                    "10",
                    "19",
                    "2",
                    "3",
                    "9",
                    "0",
                    "0",
                    "11",
                    "11",
                    "18",
                    "13",
                    "16",
                    "0",
                    "0",
                    "2",
                    "26",
                    "31",
                    "17",
                    "6"
                ]
            }],
            basicColumnChartoptions: {
                chart: {
                    stacked: true,
                },
                xaxis: {
                    categories: [
                        "印章09",
                        "江燕_测试章（三楼印章柜）",
                        "测试章-Joel-简称",
                        "赵亚龙测试章_243_22aaaaaaaaaaaaaaaaa",
                        "智能柜演示0",
                        "旭东-3.7.0测试章",
                        "李慧斌测试专用章",
                        "3楼243环境_普通章003",
                        "手动版测试章江燕",
                        "内测手动版印章3（简称 - 岳海涛）",
                        "研发-易简称",
                        "易一代",
                        "王锡春测试章",
                        "测试专用章-自动版-Joel-243（简称）",
                        "公司公章1不行的比较好",
                        "江燕手动版印章",
                        "Joel-手动版测试章",
                        "joel-(简称)-291",
                        "新固件江燕测试智能章",
                        "【QW】手动版_MS1.0.0_简称",
                        "WDY06",
                        "柜子测试章004",
                        "柜子测试章005",
                        "柜子测试章006",
                        "柜子测试章008",
                        "新固件自动版测试章章章章章章章章章章章-亚龙-243（简称）",
                        "柜子测试章010",
                        "QW_二代章_新结构_简称",
                        "测试专用章-手动版-Joel-243（简称）",
                        "1112",
                        "吴文凯的新测试章243环境（简称）"
                    ]
                }
            },
            basicColumnChartseries: [{
                name: '远程盖章',
                data: [
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "1",
                    "",
                    "1",
                    "",
                    "",
                    "",
                    "",
                    "1",
                    "",
                    "1",
                    "3",
                    "",
                    "",
                    "",
                    "3",
                    "1",
                    "18",
                    "2",
                    "",
                    "1",
                    "",
                    "",
                    "1",
                    ""
                ]
            }, {
                name: '智能用印',
                data: [
                    "",
                    "",
                    "",
                    "",
                    "",
                    "1",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "1",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    ""
                ]
            }, {
                name: '普通用印',
                data: [
                    "1",
                    "10",
                    "2",
                    "2",
                    "5",
                    "12",
                    "3",
                    "",
                    "32",
                    "",
                    "2",
                    "2",
                    "10",
                    "52",
                    "",
                    "7",
                    "",
                    "",
                    "22",
                    "4",
                    "21",
                    "",
                    "",
                    "",
                    "",
                    "3",
                    "",
                    "1",
                    "2",
                    "",
                    "8"
                ]
            }],
            echartslineoption: {
                tooltip: {},
                legend: {
                    data: ['远程盖章', '智能用印', '普通用印']
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        dataView: { readOnly: false },
                        magicType: { type: ['line', 'bar'] },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    axisLabel: {
                        interval: 0,
                        rotate: 45,
                    },
                    data: [
                        "2022-10-01",
                        "2022-10-02",
                        "2022-10-03",
                        "2022-10-04",
                        "2022-10-05",
                        "2022-10-06",
                        "2022-10-07",
                        "2022-10-08",
                        "2022-10-09",
                        "2022-10-10",
                        "2022-10-11",
                        "2022-10-12",
                        "2022-10-13",
                        "2022-10-14",
                        "2022-10-15",
                        "2022-10-16",
                        "2022-10-17",
                        "2022-10-18",
                        "2022-10-19",
                        "2022-10-20",
                        "2022-10-21",
                        "2022-10-22",
                        "2022-10-23",
                        "2022-10-24",
                        "2022-10-25",
                        "2022-10-26",
                        "2022-10-27",
                        "2022-10-28"
                    ],
                },
                yAxis: {},
                series: [{
                    name: '远程盖章',
                    type: "line",
                    data: [
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "7",
                        "9",
                        "2",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "2",
                        "1",
                        "0",
                        "6",
                        "0",
                        "0",
                        "0",
                        "0",
                        "4",
                        "1",
                        "1"
                    ]
                }, {
                    name: '智能用印',
                    type: "line",
                    data: [
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "2",
                        "0",
                        "0",
                        "0"
                    ]
                }, {
                    name: '普通用印',
                    type: "line",
                    data: [
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "0",
                        "7",
                        "10",
                        "19",
                        "2",
                        "3",
                        "9",
                        "0",
                        "0",
                        "11",
                        "11",
                        "18",
                        "13",
                        "16",
                        "0",
                        "0",
                        "2",
                        "26",
                        "31",
                        "17",
                        "6"
                    ]
                }],
            },
            echartsbaroption: {
                tooltip: {},
                legend: {
                    data: ['远程盖章', '智能用印', '普通用印']
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        dataView: { readOnly: false },
                        magicType: { type: ['line', 'bar'] },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    axisLabel: {
                        interval: 0,
                        rotate: 45,
                    },
                    data: [
                        "印章09",
                        "江燕_测试章（三楼印章柜）",
                        "测试章-Joel-简称",
                        "赵亚龙测试章_243_22aaaaaaaaaaaaaaaaa",
                        "智能柜演示0",
                        "旭东-3.7.0测试章",
                        "李慧斌测试专用章",
                        "3楼243环境_普通章003",
                        "手动版测试章江燕",
                        "内测手动版印章3（简称 - 岳海涛）",
                        "研发-易简称",
                        "易一代",
                        "王锡春测试章",
                        "测试专用章-自动版-Joel-243（简称）",
                        "公司公章1不行的比较好",
                        "江燕手动版印章",
                        "Joel-手动版测试章",
                        "joel-(简称)-291",
                        "新固件江燕测试智能章",
                        "【QW】手动版_MS1.0.0_简称",
                        "WDY06",
                        "柜子测试章004",
                        "柜子测试章005",
                        "柜子测试章006",
                        "柜子测试章008",
                        "新固件自动版测试章章章章章章章章章章章-亚龙-243（简称）",
                        "柜子测试章010",
                        "QW_二代章_新结构_简称",
                        "测试专用章-手动版-Joel-243（简称）",
                        "1112",
                        "吴文凯的新测试章243环境（简称）"
                    ],
                },
                yAxis: {},
                series: [{
                    name: '远程盖章',
                    type: "bar",
                    stack: true,
                    data: [
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "1",
                        "",
                        "1",
                        "",
                        "",
                        "",
                        "",
                        "1",
                        "",
                        "1",
                        "3",
                        "",
                        "",
                        "",
                        "3",
                        "1",
                        "18",
                        "2",
                        "",
                        "1",
                        "",
                        "",
                        "1",
                        ""
                    ]
                }, {
                    name: '智能用印',
                    type: "bar",
                    stack: true,
                    data: [
                        "",
                        "",
                        "",
                        "",
                        "",
                        "1",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "1",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        ""
                    ]
                }, {
                    name: '普通用印',
                    type: "bar",
                    stack: true,
                    data: [
                        "1",
                        "10",
                        "2",
                        "2",
                        "5",
                        "12",
                        "3",
                        "",
                        "32",
                        "",
                        "2",
                        "2",
                        "10",
                        "52",
                        "",
                        "7",
                        "",
                        "",
                        "22",
                        "4",
                        "21",
                        "",
                        "",
                        "",
                        "",
                        "3",
                        "",
                        "1",
                        "2",
                        "",
                        "8"
                    ]
                }],
            }
        }
    },
    created() {
        sessionStorage.setItem("CurrentSystemType", "system")
    },
    computed: {

    },
    components: {
        Layout,
        VueEcharts
    },
};
</script>
<style lang='scss' scoped>
.system-home {
    .ap-row {
        margin: 1rem 0 0 0;
    }

    .panel-box {
        text-align: center;
        box-sizing: border-box;

        .panel-cent {
            background-color: #fff;
            border: 1px solid #fff;
            border-radius: 4px;
            box-shadow: 0 0 2px 2px rgba(224, 227, 234, 0.7);
            box-sizing: border-box;
            margin-bottom: 15px;
            transition: all 0.3s ease 0s;
            padding: 0.4rem 0rem;
            height: 100%;
        }

        .panel-box-o-big {
            font-size: 2rem;
            color: #D0963E;
        }

        .panel-box-o-text {
            color: #999;
        }

        .panel-box-t {
            font-weight: bold;
        }

        .panel-box-th {
            color: #999;
        }
    }

    .charts {
        background-color: #fff;
        border: 1px solid #fff;
        border-radius: 4px;
        box-shadow: 0 0 2px 2px rgba(224, 227, 234, 0.7);
        box-sizing: border-box;
        margin-bottom: 15px;
        transition: all 0.3s ease 0s;

        .charts-title {
            border-bottom: 1px solid #f1f1f1;
            height: 44px;
            line-height: 44px;
            padding-left: 15px;
        }
    }
}
</style>