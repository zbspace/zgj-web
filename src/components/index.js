// 全局组件异步注册
import { defineAsyncComponent } from "vue";

export function requireComp(app) {
  app.component(
    "JyEcharts",
    defineAsyncComponent(() => import("./Echarts/index.vue"))
  );
  app.component(
    "JyVform",
    defineAsyncComponent(() => import("./Vform/index.vue"))
  );
}