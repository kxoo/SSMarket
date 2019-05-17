import Vue from 'vue';
import Router from 'vue-router';
import { homedir } from 'os';
import NotFound from './views/NotFound.vue';
import Home from './views/Home.vue';
import Goods from './views/Goodlist.vue';
import Cart from './views/Cart.vue';
import Register from './views/Register.vue';
import Item from './views/item.vue'
import Edit from './views/edit.vue'
import Address from './views/Address.vue';
import FinishOrder from './views/FinishOrder.vue';
import Wares from './views/wares.vue'
import Main from './views/main.vue'
import AddWare from './views/addWare.vue'
import Order from './views/order.vue'

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
      path: '/order',
      name: 'order',
      component: Order,
    },
    {
      path: '/main',
      name: 'main',
      component: Main,
    },
    {
      path: '/addWare',
      name: 'addWare',
      component: AddWare,
    },
    {
      path: '/item',
      name: 'item',
      component: Item,
    },
    {
      path: '/edit',
      name: 'edit',
      component: Edit,
    },
    {
      path: '/wares',
      name: 'wares',
      component: Wares,
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
      path: '/register',
      name: 'Register',
      component: Register,
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
    {
      path: '/address',
      name: 'Address',
      component: Address,
    },
    {
      path: '/finishOrder',
      name: 'FinishOrder',
      component: FinishOrder,
    },
  ],
});
