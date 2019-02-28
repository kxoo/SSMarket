import Vue from 'vue';
import Router from 'vue-router';
import { homedir } from 'os';
import NotFound from './views/NotFound.vue';
import Home from './views/Home.vue';
import Goods from './views/Goodlist.vue';
import Cart from './views/Cart.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/NotFound',
      name: 'NotFound',
      component: NotFound,
    },
    {
      path: '*',
      redirect: 'NotFound',
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/list',
      name: 'Goods',
      component: Goods,
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart,
    },

  ],
});
