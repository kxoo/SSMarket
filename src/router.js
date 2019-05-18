import Vue from 'vue';
import Router from 'vue-router';
import WebSocket from './views/WebSocket.vue';
import NotFound from './views/NotFound.vue';
import Home from './views/Home.vue';
import Goods from './views/Goodlist.vue';
import Cart from './views/Cart.vue';
import Register from './views/Register.vue';
import Address from './views/Address.vue';
import FinishOrder from './views/FinishOrder.vue';
import Order from './views/order.vue'
import Board from './views/Board.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/webSocket',
      name: 'webSocket',
      component: WebSocket,
    },
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
      path: '/board',
      name: 'board',
      component: Board
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
