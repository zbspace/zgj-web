// 全局组件注册
import Echarts from './Echarts/index.vue'
import Vform from './Vform/index.vue'
export default {
  install (app) {
    app.component('jy-echarts', Echarts),
    app.component('jy-vform', Vform)
  }
}
