<template>
  <div id="layout-wrapper">
    <NavBar />
    <div>
      <!-- ========== Left Sidebar Start ========== -->
      <!-- ========== App Menu ========== -->
      <!-- <el-scrollbar height="calc(100vh - 64px)">
        <Menus />
      </el-scrollbar> -->

      <!-- Left Sidebar End -->
      <!-- Vertical Overlay-->
      <div class="vertical-overlay" id="overlay" />
    </div>
    <!-- ============================================================== -->
    <!-- Start Page Content here -->
    <!-- ============================================================== -->

    <div class="main-content">
      <div class="page-content">
        <!-- Start Content-->
        <div class="container-fluid">
          <slot />
        </div>
      </div>
      <!-- <Footer /> -->
    </div>
    <RightBar />
  </div>
</template>

<script>
  import router from '@/router'
  import { SimpleBar } from 'simplebar-vue3'
  // import { layoutComputed } from "@/state/helpers";

  import NavBar from '@/components/nav-bar'
  // import Menus from '@/layouts/menu'
  import Menus from '@/components/menu.vue'
  import RightBar from '@/components/right-bar'
  localStorage.setItem('hoverd', false)

  /**
   * Vertical layout
   */
  export default {
    components: { NavBar, RightBar, SimpleBar, Menus },
    data() {
      return {
        isMenuCondensed: false
      }
    },
    computed: {
      // ...layoutComputed,
    },
    created: () => {
      document.body.removeAttribute('data-layout', 'horizontal')
      document.body.removeAttribute('data-topbar', 'dark')
      document.body.removeAttribute('data-layout-size', 'boxed')
    },
    methods: {
      initActiveMenu() {
        if (
          document.documentElement.getAttribute('data-sidebar-size') ===
          'sm-hover'
        ) {
          localStorage.setItem('hoverd', true)
          document.documentElement.setAttribute(
            'data-sidebar-size',
            'sm-hover-active'
          )
        } else if (
          document.documentElement.getAttribute('data-sidebar-size') ===
          'sm-hover-active'
        ) {
          localStorage.setItem('hoverd', false)
          document.documentElement.setAttribute('data-sidebar-size', 'sm-hover')
        } else {
          document.documentElement.setAttribute('data-sidebar-size', 'sm-hover')
        }
      },
      toggleMenu() {
        document.body.classList.toggle('sidebar-enable')

        if (window.screen.width >= 992) {
          // eslint-disable-next-line no-unused-vars
          router.afterEach((routeTo, routeFrom) => {
            document.body.classList.remove('sidebar-enable')
            document.body.classList.remove('vertical-collpsed')
          })
          document.body.classList.toggle('vertical-collpsed')
        } else {
          // eslint-disable-next-line no-unused-vars
          router.afterEach((routeTo, routeFrom) => {
            document.body.classList.remove('sidebar-enable')
          })
          document.body.classList.remove('vertical-collpsed')
        }
        this.isMenuCondensed = !this.isMenuCondensed
      },
      toggleRightSidebar() {
        document.body.classList.toggle('right-bar-enabled')
      },
      hideRightSidebar() {
        document.body.classList.remove('right-bar-enabled')
      }
    },
    mounted() {
      if (localStorage.getItem('hoverd') === 'true') {
        document.documentElement.setAttribute(
          'data-sidebar-size',
          'sm-hover-active'
        )
      }
      document.getElementById('overlay').addEventListener('click', () => {
        document.body.classList.remove('vertical-sidebar-enable')
      })
    }
  }
</script>
<style lang="scss" scoped>
  #layout-wrapper {
    :deep(.el-scrollbar) {
      display: inline-block;
      margin-top: 64px;
      background-color: #fff;
    }
  }
</style>
