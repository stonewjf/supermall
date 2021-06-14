import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast/'

import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

Vue.use(VueLazyLoad, {
  //懒加载占位图片
  loading: require('./assets/img/common/placeholder.png')
})
Vue.use(toast)

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
