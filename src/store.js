import Vue from 'vue';
import Vuex from 'vuex';
import app from '@/store/modules/app';
import user from '@/store/modules/user';
import getters from '@/store/getter';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    user,
  },
  getters,
});

export default store;
