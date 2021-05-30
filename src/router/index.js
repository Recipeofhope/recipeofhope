import Vue from 'vue';
import VueRouter from 'vue-router';
// import authRequired from '../utils/authRequired'
import adminAccess from '../utils/adminAccess';
import cookAccess from '../utils/cookAccess';
import recipientAccess from '../utils/recipientAccess';
import Home from '../views/Home.vue';
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/cook',
    name: 'Cook',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Cook.vue'),
    beforeEnter: cookAccess,
  },
  {
    path: '/recipient',
    name: 'Recipient',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Recipient.vue'),
    beforeEnter: recipientAccess,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Admin.vue'),
    beforeEnter: adminAccess,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
