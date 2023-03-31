import { defineStore } from 'pinia'
import { systemService } from '@/api/common/system'
import { business, businessAside } from '@/views/layout/Menu/business'
import { system, systemAside } from '@/views/layout/Menu/system'
import { getArrFromTree } from '@/utils/tools'

/**
 * menus信息
 */
export const useMenusInfoStore = defineStore({
  id: 'menusInfo',
  state: () => {
    return {
      currentType: 'business',
      menus: [], // 菜单集合
      tempMenus: null, // 临时菜单集合
      asides: [], // 外层模块栏集合
      modelRoute: '', // 外层模块栏选中（hover）的模块url
      businessMenus: [],
      systemMenus: [],
      businessAside: [],
      systemAside: []
    }
  },
  actions: {
    setMenusInfo(menusInfo) {
      this.currentType = menusInfo
    },

    async setMenus() {
      const res1 = await systemService.getLeftMenu({
        systemTypeId: 'public',
        functionGroupId: 'business'
      })
      const res2 = await systemService.getLeftMenu({
        systemTypeId: 'public',
        functionGroupId: 'system'
      })
      // 用户前台
      const menus1 = getArrFromTree(res1.data || [], 'children', 'label')
      this.businessMenus = business.filter(v => {
        return v.must || menus1.includes(v.label)
      })
      this.businessAside = businessAside.filter(v => {
        return v.must || menus1.includes(v.label)
      })
      // 系统后台
      const menus2 = getArrFromTree(res2.data || [], 'children', 'label')
      this.systemMenus = system.filter(v => {
        return v.must || menus2.includes(v.label)
      })
      this.systemAside = systemAside.filter(v => {
        return v.must || menus2.includes(v.label)
      })
    },

    setTempMenus(menus) {
      this.tempMenus = menus || null
    },

    setAsides(asides) {
      this.asides = asides
    },

    setModelRoute(route) {
      this.modelRoute = route
    }
  },
  // 开启数据缓存
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage
      }
    ]
  }
})
