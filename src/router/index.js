import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import { USER_TYPES, ROUTES, PROTECTED_ROUTES, USER_TYPE_ROUTE_MAP } from '../constants/app.constants';
import _includes from 'lodash/includes';
import _get from 'lodash/get';
import { getStoredUser, isAuthenticated } from '../utils/app.utils';

Vue.use(VueRouter);

const routes = [
  {
    path: ROUTES.HOME,
    name: 'Home',
    component: Home,
    meta: {
      condition: {
        loggedIn: false
      }
    }
  },
  {
    path: ROUTES.ABOUT,
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      condition: {
        loggedIn: false
      }
    }
  },
  {
    path: ROUTES.COOK,
    name: 'Cook',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Cook.vue'),
    meta: {
      condition: {
        loggedIn: true,
        type: USER_TYPES.COOK
      }
    }
  },
  {
    path: ROUTES.RECIPIENT,
    name: 'Recipient',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Recipient.vue'),
    meta: {
      condition: {
        loggedIn: true,
        type: USER_TYPES.PATIENT
      }
    }
  },
  {
    path: ROUTES.RECIPIENT,
    name: 'Admin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Admin.vue'),
    meta: {
      condition: {
        loggedIn: true,
        type: USER_TYPES.ADMIN
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const path = _get(to, 'path');
  if(_includes(PROTECTED_ROUTES, path)) {
    if(isAuthenticated()) {
      const userType = _get(getStoredUser(), 'user_type', '');
      const validPath = _get(USER_TYPE_ROUTE_MAP, userType);
      if(path !== validPath) {
        next({path: validPath});
      } else {
        next();
      }
    } else {
      next({ path: ROUTES.HOME })
    }
  } else {
    next();
  }
});

export default router
