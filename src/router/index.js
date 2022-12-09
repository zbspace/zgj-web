import { createWebHistory, createRouter } from "vue-router";
// import axios from 'axios';
import routes from './routes';
import appConfig from "../../app.config";
// import store from '@/state/store';

const router = createRouter({
  history: createWebHistory(),
  routes,
  mode: 'history',

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, left: 0 };
    }
  },
});

router.beforeEach((routeTo, routeFrom, next) => {
  // 更具url判断是业务前台
  if(routeTo.fullPath.includes('/frontDesk')){
    sessionStorage.setItem("CurrentSystemType", "business")
  }else if(routeTo.fullPath.includes('/system')){
    sessionStorage.setItem("CurrentSystemType", "system")
  }
  next()
});

router.beforeResolve(async (routeTo, routeFrom, next) => {
  try {
    for (const route of routeTo.matched) {
      await new Promise((resolve, reject) => {
        if (route.meta && route.meta.beforeResolve) {
          route.meta.beforeResolve(routeTo, routeFrom, (...args) => {
            if (args.length) {
              next(...args);
              reject(new Error('Redirected'));
            } else {
              resolve();
            }
          });
        } else {
          resolve();
        }
      });
    }
  } catch (error) {
    return;
  }
  document.title = routeTo.meta.title + ' | ' + appConfig.title;
  next();
});

export default router;
