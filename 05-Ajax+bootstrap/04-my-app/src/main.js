import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import './assets/css/base.css';
import wx from 'weixin-js-sdk'

Vue.use(Vant);
Vue.config.productionTip = false
// 将微信的函数绑定在Vue原型链上以后可直接调用$wx
Vue.prototype.$wx = wx;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
