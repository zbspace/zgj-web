// 全局组件注册
import Echarts from './Echarts/index.vue'
export default {
  install (app) {
    app.component('jy-echarts', Echarts)
  }
}
