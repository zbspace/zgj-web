import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import i18n from './i18n'
// import { createPinia } from 'pinia'
import store from './store'

/* 引入自定义全局变量 */
// import './style/index.scss'

import BootstrapVue3 from 'bootstrap-vue-3'

import '@/assets/fonts/font.css'
import '@/assets/scss/config/minimal/app.scss'

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'

import VForm3 from 'vform-jy'
import 'vform-jy/dist/designer.style.css'

// 全局自定义组件
// import components from "@/views/components/modules/index";
import { requireComp } from '@/components/index'

// 全局自定义公共方法
import commonFun from '@/utils/common';

(async () => {
  const app = createApp(App)
  app
    .use(store)
    .use(router)
    .use(BootstrapVue3)
    .use(i18n)
    .use(ElementPlus, { locale: zhCn })
    .use(VForm3)
    .mount('#app')
  app.provide('commonFun', commonFun)
  requireComp(app)
})()
