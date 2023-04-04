import { defineStore } from 'pinia'
import { TinyColor } from '@ctrl/tinycolor'
export const useLayoutStore = defineStore({
  id: 'layout',
  state: () => {
    return {
      layoutType: 'vertical',
      layoutWidth: 'fluid',
      sidebarSize: 'lg',
      mode: 'light',
      position: 'fixed',
      sidebarView: 'detached',
      sidebarColor: 'light',
      sidebarImage: 'none',
      preloader: 'disable',

      isCollapse: false, // 菜单栏是否折叠
      topbar: 'light', // 顶栏颜色
      themeType: 'light', // 配色方案
      sidebarType: '1', // 菜单侧边栏模式
      rightBarVisible: false, // 右侧菜单显隐
      globStyle: 'light', // 整体风格
      menuColor: 'light', // 侧边栏颜色
      customColor: '#D0963E' // 主题色
    }
  },
  getters: {},
  actions: {
    reset() {
      this.isCollapse = false
      this.themeType = 'light'
      this.topbar = 'light'
      this.sidebarType = '1'
      this.menuColor = 'light'
      this.customColor = '#D0963E'
      const value = '#D0963E'
      const color = new TinyColor(value)
      const activeBgColor = color.mix(color, 20).toString()
      const hoverBgColor = color.tint(30).toString()
      const hoverBgColor1 = color.tint(90).toString()
      const node = document.getElementsByTagName('body')[0]
      node.style.setProperty('--jy-primary-6', value)
      node.style.setProperty('--jy-primary-5', hoverBgColor)
      node.style.setProperty('--jy-primary-1', hoverBgColor)
      node.style.setProperty('--jy-primary-9', hoverBgColor1)
      node.style.setProperty('--jy-primary-4', activeBgColor)
      node.style.setProperty('--jy-primary-2', hoverBgColor1)
      node.style.setProperty(
        '--jy-primary-11',
        color.isDark() || value === '#efb041' || value === '#D0963E'
          ? '#fff'
          : '#000'
      )
      node.style.setProperty('--jy-primary-3', value)
    },
    changeLayoutType(layoutType) {
      this.layoutType = layoutType
      document.body.removeAttribute('style')
    },

    changeLayoutWidth(layoutWidth) {
      this.layoutWidth = layoutWidth
    },

    changeSidebarSize(sidebarSize) {
      this.sidebarSize = sidebarSize
    },

    changeTopbar(topbar) {
      this.topbar = topbar || 'light'
    },

    changeMode(mode) {
      this.mode = mode
    },

    changePosition(position) {
      this.position = position
    },

    changeSidebarView(sidebarView) {
      this.sidebarView = sidebarView
    },

    changeSidebarColor(sidebarColor) {
      this.sidebarColor = sidebarColor
    },

    changeSidebarImage(sidebarImage) {
      this.sidebarImage = sidebarImage
    },

    changePreloader(preloader) {
      this.preloader = preloader
    },

    changeCollapse(isCollapse) {
      this.isCollapse = isCollapse
    },

    setThemeType(themeType) {
      this.themeType = themeType || 'light'
    },

    setSidebarType(sidebarType) {
      this.sidebarType = sidebarType || '1'
    },

    setRightBarVisible(bool) {
      this.rightBarVisible = bool
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
