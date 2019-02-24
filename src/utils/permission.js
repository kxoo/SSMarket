import router from '@/router';
import store from '@/store';
import { getToken } from './auth';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Message } from 'element-ui';

const whiteList = ['/login'];
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (getToken()) {
    if (to.path === '/login') {
      next({
        path: '/',
      });
      NProgress.done();
    } else { // 实时拉取用户
      store.dispatch('GetUserInfo').then(() => {
        next();
      }).catch((err) => {
        store.dispatch('FedLogOut').then(() => {
          Message.error(`获取用户失败，重新登录${err}`);
          next({
            path: '/',
          });
        });
      });
    }
  } else if (whiteList.includes(to.path)) {
    next();
  } else {
    next('/login');
    NProgress.done();
  }
});

router.afterEach(() => {
  NProgress.done();
});
