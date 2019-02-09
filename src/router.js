import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '404', component: () => import('@/views/404') },
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    { path: '*', redirect: '404' },
  ],
});
