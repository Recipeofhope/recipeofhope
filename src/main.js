import Vue from 'vue';
import Fragment from 'vue-fragment';
import App from './App.vue';
import './assets/tailwind.css';
import './index.css';
import router from './router';
import { store } from './store';

Vue.config.productionTip = false;
Vue.use(Fragment.Plugin);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
