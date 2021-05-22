import Vue from 'vue'
import App from './App.vue'
import './index.css'
import './assets/tailwind.css'
import router from './router'
import store from './store/index';

Vue.config.productionTip = false
// App.use(store);
new Vue({
  router,
  render: h => h(App)
}).use(store).$mount('#app')
// const app = createApp(App)
// app.use(router);
// app.use(store)
// app.mount('#app')