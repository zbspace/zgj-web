import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import AOS from 'aos'
// import 'aos/dist/aos.css'
import i18n from './i18n'
import store from './state/store'

/* 引入自定义全局变量 */
// import './style/index.scss'

import BootstrapVue3 from 'bootstrap-vue-3'
// import vClickOutside from 'click-outside-vue3'
// import VueApexCharts from 'vue3-apexcharts'
// import Maska from 'maska'

// import VueFeather from 'vue-feather'
// import Particles from 'particles.vue3'

import '@/assets/scss/config/minimal/app.scss'
// import '@vueform/slider/themes/default.css'

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'

// import ArcoVue from '@arco-design/web-vue'
// import '@arco-design/web-vue/dist/arco.css'
// 全局自定义组件
import components from "@/views/components/modules/index"

/* 引入自定义全局变量 */
// import "./style/index.scss";

// AOS.init({
//   easing: 'ease-out-back',
//   duration: 1000
// })

createApp(App)
  .use(store)
  .use(components)
  .use(router)
  // .use(VueApexCharts)
  .use(BootstrapVue3)
  // .component(VueFeather.type, VueFeather)
  // .use(Maska)
  // .use(Particles)
  .use(i18n)
  // .use(vClickOutside)
  .use(ElementPlus, { locale: zhCn })
  // .use(ArcoVue)
  .mount("#app")
