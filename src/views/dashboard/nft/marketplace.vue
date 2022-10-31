<script>
function getChartColorsArray(colors) {
    colors = JSON.parse(colors);
    return colors.map(function (value) {
        var newValue = value.replace(" ", "");
        if (newValue.indexOf(",") === -1) {
            var color = getComputedStyle(document.documentElement).getPropertyValue(newValue);
            if (color) {
                color = color.replace(" ", "");
                return color;
            } else return newValue;
        } else {
            var val = value.split(',');
            if (val.length == 2) {
                var rgbaColor = getComputedStyle(document.documentElement).getPropertyValue(val[0]);
                rgbaColor = "rgba(" + rgbaColor + "," + val[1] + ")";
                return rgbaColor;
            } else {
                return newValue;
            }
        }
    });
}

import {
    CountTo
} from "vue3-count-to";
import { VueEcharts } from "vue3-echarts";
export default {
    components: {
        CountTo,
        VueEcharts
    },
    setup() {
        return {
            series: [{
                name: "智能用印",
                data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 35, 34, 78],
            },
            {
                name: "普通用印",
                color: "#00bd9d",
                data: [40, 120, 83, 45, 31, 74, 35, 34, 78, 35, 34, 78],
            },
            ],
            chartOptions: {
                chart: {
                    height: 100,
                    type: "area",
                    toolbar: "false",
                },
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    curve: "smooth",
                    width: 3,
                },
                xaxis: {
                    categories: [
                        "2022-01",
                        "2022-02",
                        "2022-03",
                        "2022-04",
                        "2022-05",
                        "2022-06",
                        "2022-07",
                        "2022-08",
                        "2022-09",
                        "2022-10",
                        "2022-11",
                        "2022-10",
                    ],
                },
                yaxis: {
                    labels: {
                        formatter: function (value) {
                            return value;
                        },
                    },
                    tickAmount: 5,
                    min: 0,
                    max: 150,
                },
                colors: getChartColorsArray('["--vz-primary", "--vz-success","--vz-gray-400"]'),
                fill: {
                    opacity: 0,
                    colors: ["#0AB39C", "#F06548"],
                    type: "solid",
                },
            },
            echartslineoption: {
                tooltip: {},
                // toolbox: {
                //     show: true,
                //     feature: {
                //         dataZoom: {
                //             yAxisIndex: 'none'
                //         },
                //         dataView: { readOnly: false },
                //         magicType: { type: ['line', 'bar'] },
                //         restore: {},
                //         saveAsImage: {}
                //     }
                // },
                xAxis: {
                    axisLabel: {
                        interval: 0,
                        rotate: 45,
                    },
                    data: [
                        "2022-01",
                        "2022-02",
                        "2022-03",
                        "2022-04",
                        "2022-05",
                        "2022-06",
                        "2022-07",
                        "2022-08",
                        "2022-09",
                        "2022-10",
                        "2022-11",
                        "2022-10",
                    ],
                },
                yAxis: {},
                series: [{
                    name: "智能用印",
                    type: "line",
                    data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 35, 34, 78],
                },
                {
                    name: "普通用印",
                    color: "#00bd9d",
                    type: "line",
                    data: [40, 120, 83, 45, 31, 74, 35, 34, 78, 35, 34, 78],
                },
                ],
            },
        };
    },
    mounted() {
        // Set the date we're counting down to
        var countDownDate = new Date("Jan 1, 2023").getTime();

        // Update the count down every 1 second
        var countDown = setInterval(function () {

            // Get today's date and time
            var currentTime = new Date().getTime();

            // Find the distance between currentTime and the count down date
            var distance = countDownDate - currentTime;

            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            var countDownBlock = '<div class="countdownlist-item">' +
                '<div class="count-title">Days</div>' + '<div class="count-num">' + days + '</div>' +
                '</div>' +
                '<div class="countdownlist-item">' +
                '<div class="count-title">Hours</div>' + '<div class="count-num">' + hours + '</div>' +
                '</div>' +
                '<div class="countdownlist-item">' +
                '<div class="count-title">Minutes</div>' + '<div class="count-num">' + minutes + '</div>' +
                '</div>' +
                '<div class="countdownlist-item">' +
                '<div class="count-title">Seconds</div>' + '<div class="count-num">' + seconds + '</div>' +
                '</div>';

            // Output the result in an element with id="countDownBlock"
            if (document.getElementById("countdown")) {
                document.getElementById("countdown").innerHTML = countDownBlock;
            }
            // If the count down is over, write some text 
            if (distance < 0) {
                clearInterval(countDown);
                document.getElementById("countdown").innerHTML = '<div class="countdown-endtxt">The countdown has ended!</div>';
            }
        }, 1000);

    }
}
</script>

<template>
    <div class="card">
        <div class="card-body p-0">
            <div class="row g-0">

                <div class="col-xxl-8">
                    <div class="border-end p-4 h-100 d-flex flex-column">

                        <div class="w-100">
                            <ul class="nav nav-tabs nav-tabs-custom nav-success nav-justified mb-3" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" data-bs-toggle="tab" href="#home1" role="tab">
                                        待我审批
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" data-bs-toggle="tab" href="#profile1" role="tab">
                                        待我处理
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" data-bs-toggle="tab" href="#messages1" role="tab">
                                        已审批
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" data-bs-toggle="tab" href="#settings1" role="tab">
                                        已处理
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" data-bs-toggle="tab" href="#settings1" role="tab">
                                        抄送给我
                                    </a>
                                </li>
                            </ul>

                            <div class="table-responsive table-card">
                                <div style="max-height: 380px;">
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item list-group-item-action">
                                            <div class="d-flex align-items-center list-li">
                                                <div class="ms-3 flex-grow-1 list-li-t">
                                                    <div class="list-li-t-text">10月智能印章采购合同盖章</div>
                                                    <div class="list-li-t-but">审批</div>
                                                </div>
                                                <div class="ms-3 flex-grow-1 list-li-t-b">
                                                    <div class="list-li-t-b-span list-li-t-b-but">用印申请</div>
                                                    <div class="list-li-t-b-span">王丹阳</div>
                                                    <div class="list-li-t-b-span">2022-10-25 10:21</div>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="list-group-item list-group-item-action">
                                            <div class="d-flex align-items-center list-li">
                                                <div class="ms-3 flex-grow-1 list-li-t">
                                                    <div class="list-li-t-text">10月智能印章盒采购合同盖章</div>
                                                    <div class="list-li-t-but">审批</div>
                                                </div>
                                                <div class="ms-3 flex-grow-1 list-li-t-b">
                                                    <div class="list-li-t-b-span list-li-t-b-but">用印申请</div>
                                                    <div class="list-li-t-b-span">王丹阳</div>
                                                    <div class="list-li-t-b-span">2022-10-24 12:00</div>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="list-group-item list-group-item-action">
                                            <div class="d-flex align-items-center list-li">
                                                <div class="ms-3 flex-grow-1 list-li-t">
                                                    <div class="list-li-t-text">因公章年久损坏所以申请重新刻章</div>
                                                    <div class="list-li-t-but">审批</div>
                                                </div>
                                                <div class="ms-3 flex-grow-1 list-li-t-b">
                                                    <div class="list-li-t-b-span list-li-t-b-but">刻章申请</div>
                                                    <div class="list-li-t-b-span">李峰</div>
                                                    <div class="list-li-t-b-span">2022-10-24 10:30</div>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="list-group-item list-group-item-action">
                                            <div class="d-flex align-items-center list-li">
                                                <div class="ms-3 flex-grow-1 list-li-t">
                                                    <div class="list-li-t-text">10月智能印章采购合同盖章</div>
                                                    <div class="list-li-t-but">审批</div>
                                                </div>
                                                <div class="ms-3 flex-grow-1 list-li-t-b">
                                                    <div class="list-li-t-b-span list-li-t-b-but">刻章申请</div>
                                                    <div class="list-li-t-b-span">汪洋</div>
                                                    <div class="list-li-t-b-span">2022-10-22 16:19</div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>



                        </div>
                    </div>
                </div>
                <div class="col-xxl-4">
                    <div class="">
                        <div class="card-header border-0 align-items-center d-flex">
                            <h4 class="card-title mb-0 flex-grow-1">用印统计</h4>
                            <div>
                                <button type="button" class="btn btn-soft-secondary btn-sm">
                                    全部
                                </button>
                                <button type="button" class="btn btn-soft-secondary btn-sm">
                                    一个月
                                </button>
                                <button type="button" class="btn btn-soft-secondary btn-sm">
                                    六个月
                                </button>
                                <button type="button" class="btn btn-soft-primary btn-sm">
                                    一年
                                </button>
                            </div>
                        </div><!-- end card header -->

                        <!-- <apexchart class="apex-charts" height="350" dir="ltr" :series="series" :options="chartOptions">
                        </apexchart> -->
                        <vue-echarts :option="echartslineoption" style="height: 350px" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang='scss' scoped>
.list-li {
    flex-flow: wrap;

    .list-li-t {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.2rem;

        .list-li-t-text {
            font-weight: bold;
        }

        .list-li-t-but {
            padding: 0.2rem 0.8rem;
            border: 1px solid #D0963E;
            border-radius: 4px;
            color: #D0963E;
        }
    }

    .list-li-t-b {
        width: 100%;
        display: flex;
        justify-content: space-between;

        .list-li-t-b-but {
            padding: 0.2rem 0.3rem;
            background-color: #f0f0f0;
            border-radius: 4px;
            font-size: 0.7rem;
        }
    }
}
</style>