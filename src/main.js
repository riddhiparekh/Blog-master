import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueResource from 'vue-resource'
import VuePaginate from 'vue-paginate'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import VeeValidate from 'vee-validate';

Vue.config.productionTip = false
Vue.use(VueResource);
Vue.use(VuePaginate);
Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(VeeValidate);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
