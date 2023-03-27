import Vue from 'vue'
import App from './App.vue'
import './assets/style.css';
import router from "./router/index.js";
import VueRouter from "vue-router";
Vue.use(VueRouter)
Vue.config.productionTip = false
new Vue({
  router:router,
  render: h => h(App),
}).$mount('#app')
