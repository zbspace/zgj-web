import { createWebHistory, createRouter } from 'vue-router'
import routes from './routes'
import { useAccountInfoStore } from '@/store/accountInfo'
import { useMenusInfoStore } from '@/store/menus'
import NProgress from 'nprogress'
import { setWaterMark, removeWatermark } from '@/utils/water'
import dayjs from 'dayjs'
import 'nprogress/nprogress.css'
import { ENV } from '@/utils/constants'
const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_PATH),
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

const platemMenuList = []
const whitelist = [
  { to: '/403' },
  { to: '/login/account' },
  { to: '/frontDesk/printControlManage/useSealManage/fillForm' },
  {
    to: '/frontDesk/printControlManage/equipmentManage/intelligentSealBoxManagement/sealBoxGridInfo'
  },
  {
    to: '/frontDesk/printControlManage/equipmentManage/IntelligentSealCabinetManagement/cabinetGridInfo'
  },
  {
    to: '/system/businessManage/editBusinessRule'
  },
  {
    to: '/system/companyManage/departmentStaff/config'
  },
  {
    to: '/system/companyManage/departmentStaff/person'
  },
  {
    to: '/personally'
  },
  {
    to: '/frontDesk/printControlManage/electronicSeal/eSelectionForm/accomplish'
  },
  {
    to: '/frontDesk/printControlManage/useSealManage/intelligentPrinting/transferApplication'
  },
  {
    to: '/frontDesk/printControlManage/useSealManage/archive/ArchiveReset'
  },
  {
    to: '/frontDesk/printControlManage/useSealManage/recordWithSeal/voidApply'
  },
  {
    to: '/frontDesk/printControlManage/useSealManage/sealApplication/accomplish'
  }
]
getAllMenu(routes)

if (ENV) {
  whitelist.push('/test')
}

function getAllMenu(list) {
  list.forEach(i => {
    if (i.children?.length) {
      getAllMenu(i.children)
    } else if (i.name) {
      platemMenuList.push(i.name)
    }
  })
}

NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
})

router.beforeEach((routeTo, routeFrom) => {
  console.log(routeTo)
  // 更具url判断是业务前台
  const menusInfoStore = useMenusInfoStore()
  if (routeTo.fullPath.includes('/frontDesk')) {
    menusInfoStore.setMenusInfo('business')
  } else if (routeTo.fullPath.includes('/system')) {
    menusInfoStore.setMenusInfo('system')
  }

  const accountInfoStore = useAccountInfoStore()
  // if (routeTo.meta.authRequired && !accountInfoStore.token) {
  //   // 此路由需要授权，请检查是否已登录
  //   // 如果没有，则重定向到登录页面
  //   return {
  //     path: '/login/account',
  //     // 保存我们所在的位置，以便以后再来
  //     query: { redirect: encodeURIComponent(routeTo.fullPath) }
  //   }
  // } else {
  //   const allMenuList = menusInfoStore.businessMenus
  //     .concat(menusInfoStore.systemMenus)
  //     .concat(whitelist)
  //   const menuIndex = JSON.stringify(allMenuList).indexOf(routeTo.path)
  //   if (routeTo.name && menuIndex === -1) {
  //     return {
  //       path: '/403'
  //     }
  //   }
  // }

  NProgress.start()
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
  next()
})

router.afterEach(routeTo => {
  removeWatermark()
  if (
    routeTo.path.indexOf('/login/') === -1 &&
    localStorage.getItem('watermark') === '1'
  ) {
    const text =
      JSON.parse(localStorage.getItem('accountInfo')).userInfo &&
      JSON.parse(localStorage.getItem('accountInfo')).userInfo.userName +
        ' ' +
        dayjs().format('YYYY-MM-DD HH:mm')
    setWaterMark(text)
  }
  NProgress.done()
})
export default router
