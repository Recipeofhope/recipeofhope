import Vue from 'vue';
import VueToast from 'vue-toast-notification';
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-sugar.css';

Vue.use(VueToast);
//Vue.$toast.open({/* options */});
let instance = Vue.$toast; //.open('You did it!');

// Force dismiss specific toast
// instance.dismiss();
// Dismiss all opened toast immediately
Vue.$toast.clear();
export default instance;