import { createWebHistory, createRouter } from 'vue-router'
// import axios from 'axios';
import routes from './routes'
// import appConfig from "../../app.config";
import { useAccountInfoStore } from '@/store/accountInfo'
import { useMenusInfoStore } from '@/store/menus'

const router = createRouter({
  history: createWebHistory(),
  routes,
  mode: 'history',

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, left: 0 }
    }
  }
})

router.beforeEach((routeTo, routeFrom) => {
  // 更具url判断是业务前台
  const menusInfoStore = useMenusInfoStore()
  if (routeTo.fullPath.includes('/frontDesk')) {
    menusInfoStore.setMenusInfo('business')
  } else if (routeTo.fullPath.includes('/system')) {
    menusInfoStore.setMenusInfo('system')
  }

  const accountInfoStore = useAccountInfoStore()
  if (routeTo.meta.authRequired && !accountInfoStore.name) {
    // 此路由需要授权，请检查是否已登录
    // 如果没有，则重定向到登录页面
    return {
      path: '/login/account',
      // 保存我们所在的位置，以便以后再来
      query: { redirect: routeTo.fullPath }
    }
  }
})

router.beforeResolve(async (routeTo, routeFrom, next) => {
  try {
    for (const route of routeTo.matched) {
      await new Promise((resolve, reject) => {
        if (route.meta && route.meta.beforeResolve) {
          route.meta.beforeResolve(routeTo, routeFrom, (...args) => {
            if (args.length) {
              next(...args)
              reject(new Error('Redirected'))
            } else {
              resolve()
            }
          })
        } else {
          resolve()
        }
      })
    }
  } catch (error) {
    return
  }
  // document.title = routeTo.meta.title + ' | ' + appConfig.title;
  next()
})

export default router
