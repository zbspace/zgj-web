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
// import SwiperCore from "swiper";
// import {
//   Swiper,
//   SwiperSlide
// } from "swiper/vue";
// import "swiper/swiper-bundle.css";

// SwiperCore.use([]);
// import flatPickr from "vue-flatpickr-component";
// import {
//   SimpleBar
// } from "simplebar-vue3";
// import "flatpickr/dist/flatpickr.css";
import {
    CountTo
} from "vue3-count-to";

import Layout from "../../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import Marketplace from "./marketplace.vue";
import Popularity from "./popularity.vue";
import Historyofbids from "./historyofbids.vue";
import Featurednft from "./featurednft.vue";
import Topartworks from "./topartworks.vue";
import Recentnfts from "./recentnfts.vue";
import Topcollaction from "./topcollaction.vue";
import Worldwidetopcrearor from "./worldwidetopcrearor.vue";

// import Revenue from "./revenue";
// import SalesLocation from "./sales-location";

export default {
    components: {
        CountTo,
        Layout,
        // Swiper,
        // SwiperSlide,
        PageHeader,
        Marketplace,
        Popularity,
        Historyofbids,
        Featurednft,
        Topartworks,
        Recentnfts,
        Topcollaction,
        Worldwidetopcrearor
    },
    data() {
        return {
            title: "章管家",
            items: [{
                text: "Dashboards",
                href: "/",
            },
            {
                text: "章管家",
                active: true,
            },
            ],
            date: null,
            config: {
                mode: "range",
            },
            series: [44, 55, 41, 17, 15],
            chartOptions: {
                labels: ["Direct", "Social", "Email", "Other", "Referrals"],
                chart: {
                    height: 333,
                    type: "donut",
                },
                legend: {
                    position: "bottom",
                },
                stroke: {
                    show: false,
                },
                dataLabels: {
                    dropShadow: {
                        enabled: false,
                    },
                },
                colors: getChartColorsArray('["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]'),
            },
        };
    },
    created() {
        sessionStorage.setItem("CurrentSystemType", "business")
    },
    methods: {
    }

};
</script>
  
<template>
    <Layout>
        <!-- <PageHeader :title="title" :items="items" /> -->
        <div class="row dash-nft">
            <div class="col-xxl-12">
                <div class="row">
                    <div class="col-xl-12">
                        <div class="card overflow-hidden">
                            <div class="card-body bg-marketplace d-flex">
                                <div class="flex-grow-1 info">
                                    <div class="info-l col-xl-8">
                                        <div class="info-l-t">
                                            <div class="info-l-t-text">
                                                <span class="info-l-t-text-text">下午好！马丽丽</span>
                                                <span class="info-l-t-text-but">印章管理员</span>
                                            </div>
                                            <div class="info-l-t-num">134****4125</div>
                                        </div>
                                        <div class="info-l-b row">
                                            <div class="info-l-b-cent col-xl-2">
                                                <div class="info-l-b-cent-title">待智能用印
                                                    <div class="info-l-b-cent-desc">6</div>
                                                </div>
                                                <div class="info-l-b-v"></div>
                                            </div>
                                            <div class="info-l-b-cent col-xl-2">
                                                <div class="info-l-b-cent-title">待归档文件
                                                    <div class="info-l-b-cent-desc">10</div>
                                                </div>
                                                <div class="info-l-b-v"></div>
                                            </div>
                                            <div class="info-l-b-cent col-xl-2">
                                                <div class="info-l-b-cent-title">我的印章
                                                    <div class="info-l-b-cent-desc">2</div>
                                                </div>
                                                <div class="info-l-b-v"></div>
                                            </div>
                                            <div class="info-l-b-cent col-xl-2">
                                                <div class="info-l-b-cent-title">
                                                    印章外借
                                                    <div class="info-l-b-cent-desc">2</div>
                                                </div>
                                                <div class="info-l-b-v"></div>
                                            </div>
                                            <div class="info-l-b-cent col-xl-2">
                                                <div class="info-l-b-cent-title">印章申请
                                                    <div class="info-l-b-cent-desc">2</div>
                                                </div>
                                                <div class="info-l-b-v"></div>
                                            </div>
                                            <div class="info-l-b-cent col-xl-2">
                                                <div class="info-l-b-cent-title">用印风险行为
                                                    <div class="info-l-b-cent-desc">4</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="info-r col-xl-3">
                                        <div class="info-r-cent">
                                            <div class="info-r-cent-but">申请用印</div>
                                            <div class="info-r-cent-text">点击按钮快捷申请用印</div>
                                        </div>
                                    </div>
                                </div>
                                <!-- <img src="@/assets/images/bg-d.png" alt="" class="img-fluid" /> -->
                            </div>
                        </div>
                    </div>
                </div>
                <!--end row-->

                <div class="row">
                    <div class="col-xxl-12">
                        <Marketplace />
                    </div>
                    <!--end col-->
                </div>
                <!--end row-->
            </div>
            <!--end col-->

            <div class="col-xxl-12">
                <Historyofbids />
            </div>
            <!--end col-->
        </div>
        <!--end row-->



        <!--end row-->

        <!--end row-->
    </Layout>
</template>

<style lang='scss' scoped>
.info {
    display: flex;
    justify-content: space-between;

    .info-l-t {
        .info-l-t-text-text {
            font-weight: bold;
            font-size: 1.2rem;
            margin-right: 0.5rem;
        }

        .info-l-t-text-but {
            background: #F0F0F0;
            padding: 0.2rem 0.4rem;
            font-size: 0.7rem;
            color: #878A99;
        }

        .info-l-t-num {
            font-size: 0.7rem;
            color: #878A99;
            padding: 0.5rem 0;
        }
    }


    .info-l-b {
        position: relative;

        .info-l-b-cent {
            display: flex;
            justify-content: center;

            .info-l-b-cent-desc {
                font-weight: bold;
            }

        }

        .info-l-b-v {
            position: absolute;
            right: 0;
            top: 0%;
            border-left: 1px solid #D8D8D8;
            width: 0;
            height: 20px;
            padding: 0%;
        }
    }

    .info-r {
        display: flex;
        justify-content: center;
        align-content: center;
        align-items: center;

        .info-r-cent {
            width: 80%;
            // height: 80%;
            display: flex;
            justify-content: center;
            align-content: center;
            flex-flow: wrap;
            // opacity: 0.21;
            background: rgba(208, 150, 62, 0.21);
            border: 1px solid #E9EBEC;
            padding: 1rem 0rem 1rem 0rem;
            border-radius: 5px;
            backdrop-filter: blur(5px);

            .info-r-cent-but {
                padding: 0.4rem 1rem;
                background: #D0963E;
                color: #ffffff;
                display: flex;
                justify-content: center;
                align-content: center;
                align-items: center;
                border-radius: 5px;
            }

            .info-r-cent-text {
                width: 100%;
                text-align: center;
                font-size: 0.7rem;
                color: #495057;
                padding: 0.4rem 0rem 0rem 0rem;
            }
        }
    }
}
</style>