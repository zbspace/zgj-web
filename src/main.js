import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import AOS from "aos";
import "aos/dist/aos.css";
import i18n from "./i18n";
import store from "./state/store";

import BootstrapVue3 from "bootstrap-vue-3";
import vClickOutside from "click-outside-vue3";
import VueApexCharts from "vue3-apexcharts";
import Maska from "maska";

import VueFeather from "vue-feather";
import Particles from "particles.vue3";

import "@/assets/scss/config/minimal/app.scss";
import "@vueform/slider/themes/default.css";

// FakeBackend authentication
// import { configureFakeBackend } from './helpers/fake-backend';
// configureFakeBackend();

// Firebase authentication
// import { initFirebaseBackend } from './authUtils';

// const firebaseConfig = {
//     apiKey: process.env.VUE_APP_APIKEY,
//     authDomain: process.env.VUE_APP_AUTHDOMAIN,
//     databaseURL: process.env.VUE_APP_VUE_APP_DATABASEURL,
//     projectId: process.env.VUE_APP_PROJECTId,
//     storageBucket: process.env.VUE_APP_STORAGEBUCKET,
//     messagingSenderId: process.env.VUE_APP_MEASUREMENTID
// };

// initFirebaseBackend(firebaseConfig);

AOS.init({
  easing: "ease-out-back",
  duration: 1000,
});

createApp(App)
  .use(store)
  .use(router)
  .use(VueApexCharts)
  .use(BootstrapVue3)
  .component(VueFeather.type, VueFeather)
  .use(Maska)
  .use(Particles)
  .use(i18n)
  .use(vClickOutside)
  .mount("#app");
