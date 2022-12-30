import { defineStore } from 'pinia'
export const useLayoutStore = defineStore({
  id: 'layout',
  state: () => {
    return {
      layoutType: 'vertical',
      layoutWidth: 'fluid',
      sidebarSize: 'lg',
      topbar: 'light',
      mode: 'light',
      position: 'fixed',
      sidebarView: 'detached',
      sidebarColor: 'light',
      sidebarImage: 'none',
      preloader: 'disable'
    }
  },
  getters: {

  },
  actions: {
    changeLayoutType (layoutType) {
      this.layoutType = layoutType
      document.body.removeAttribute('style')
    },

    changeLayoutWidth (layoutWidth) {
      this.layoutWidth = layoutWidth
    },

    changeSidebarSize (sidebarSize) {
      this.sidebarSize = sidebarSize
    },

    changeTopbar (topbar) {
      this.topbar = topbar
    },

    changeMode (mode) {
      this.mode = mode
    },

    changePosition (position) {
      this.position = position
    },

    changeSidebarView (sidebarView) {
      this.sidebarView = sidebarView
    },

    changeSidebarColor (sidebarColor) {
      this.sidebarColor = sidebarColor
    },

    changeSidebarImage (sidebarImage) {
      this.sidebarImage = sidebarImage
    },

    changePreloader (preloader) {
      this.preloader = preloader
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