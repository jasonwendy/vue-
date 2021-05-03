import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store'
import axios from 'axios'
import {currency} from './util/currency.js'
import Vuex from 'vuex'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Vuex)
Vue.use(ElementUI)
Vue.config.productionTip = false
axios.defaults.withCredentials=true
Vue.prototype.$axios = axios;
Vue.filter("currency",currency);

const store = new Vuex.Store({
  state:{
    nickName:'',
    cartCount:0
  },
  mutations:{
    updateUserInfo(state,nickName){
      state.nickName=nickName
    },
    updateCartCount(state,cartCount){
      state.cartCount+=cartCount
    },
    initCartCount(state,cartCount){
      state.cartCount = cartCount;
  }
  }
})
new Vue({
  router,
  store,
  store,
  render: h => h(App)
}).$mount('#app')
