import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import AOS from 'aos'
// import 'aos/dist/aos.css'
import i18n from "./i18n";
import store from "./state/store";

/* 引入自定义全局变量 */
// import './style/index.scss'

import BootstrapVue3 from "bootstrap-vue-3";
// import vClickOutside from 'click-outside-vue3'
// import VueApexCharts from 'vue3-apexcharts'
// import Maska from 'maska'

// import VueFeather from 'vue-feather'
// import Particles from 'particles.vue3'
import "@/assets/fonts/font.css";
import "@/assets/scss/config/minimal/app.scss";
// import '@vueform/slider/themes/default.css'

import ElementPlus from "element-plus";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import "element-plus/dist/index.css";

import VForm3 from "vform-jy";
import "vform-jy/dist/designer.style.css";

import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
// 全局自定义组件
// import components from "@/views/components/modules/index";
import { requireComp } from "@/components/index";

// 全局自定义公共方法
import commonFun from "@/unit/common";

(async () => {
  const app = createApp(App);
  app
    .use(store)
    .use(router)
    .use(BootstrapVue3)
    .use(i18n)
    .use(ElementPlus, { locale: zhCn })
    .use(VForm3)
    .use(ArcoVue)
    .mount("#app");
  app.provide("commonFun", commonFun);
  requireComp(app);
})();
