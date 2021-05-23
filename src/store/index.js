import Vue from 'vue';
import Vuex from 'vuex';
import { authentication } from './auth.store';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        authentication
    }
});