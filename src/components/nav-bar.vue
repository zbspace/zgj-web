<template>
  <header id="page-topbar">
    <div class="layout-width">
      <div class="navbar-header">
        <div class="d-flex">
          <!-- LOGO -->
          <div class="navbar-brand-box horizontal-logo">
            <router-link to="/" class="logo logo-dark">
              <span class="logo-sm">
                <img src="@/assets/icon/logo.png" alt="" height="22" />
              </span>
              <span class="logo-lg">
                <img src="@/assets/icon/logo.png" alt="" height="17" />
              </span>
            </router-link>

            <router-link to="/" class="logo logo-light">
              <span class="logo-sm">
                <img src="@/assets/icon/logo.png" alt="" height="22" />
              </span>
              <span class="logo-lg">
                <img src="@/assets/icon/logo.png" alt="" height="17" />
              </span>
            </router-link>
          </div>

          <button type="button" class="
                btn btn-sm
                px-3
                fs-16
                header-item
                vertical-menu-btn
                topnav-hamburger
              " id="topnav-hamburger-icon">
            <span class="hamburger-icon">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>

          <!-- App Search-->
          <form class="app-search d-none d-md-block">
            <div class="ap-dropdown">
              <el-dropdown trigger="click">
                <span class="ap-dropdown-text">
                  <span>上海建业科技股份有限公司</span>&nbsp;&nbsp;
                  <i class="ri-arrow-down-s-line"></i>
                </span>
                <template #dropdown>
                  <div class="ap-enterprise">
                    <div class="ap-enterprise-text">
                      <div class="ap-enterprise-text-list">
                        企业/组织/团队
                      </div>
                    </div>
                    <div class="ap-enterprise-cont">
                      <div class="ap-enterprise-cont-list">
                        上海建业科技股份有限公司
                      </div>
                      <div class="ap-enterprise-cont-list">
                        杭州好运科技股份有限公司
                      </div>
                    </div>
                  </div>
                </template>
              </el-dropdown>
            </div>
            <div class="dropdown-menu dropdown-menu-lg" id="search-dropdown">
              <SimpleBar data-simplebar style="max-height: 320px">
                <!-- item-->
                <div class="dropdown-header">
                  <h6 class="text-overflow text-muted mb-0 text-uppercase">
                    Recent Searches
                  </h6>
                </div>

                <div class="dropdown-item bg-transparent text-wrap">
                  <router-link to="/" class="btn btn-soft-secondary btn-sm btn-rounded">how to setup <i
                      class="mdi mdi-magnify ms-1"></i></router-link>
                  <router-link to="/" class="btn btn-soft-secondary btn-sm btn-rounded">buttons <i
                      class="mdi mdi-magnify ms-1"></i></router-link>
                </div>
                <!-- item-->
                <div class="dropdown-header mt-2">
                  <h6 class="text-overflow text-muted mb-1 text-uppercase">
                    Pages
                  </h6>
                </div>

                <!-- item-->
                <a href="javascript:void(0);" class="dropdown-item notify-item">
                  <i class="
                        ri-bubble-chart-line
                        align-middle
                        fs-18
                        text-muted
                        me-2
                      "></i>
                  <span>Analytics Dashboard</span>
                </a>

                <!-- item-->
                <a href="javascript:void(0);" class="dropdown-item notify-item">
                  <i class="ri-lifebuoy-line align-middle fs-18 text-muted me-2"></i>
                  <span>Help Center</span>
                </a>

                <!-- item-->
                <a href="javascript:void(0);" class="dropdown-item notify-item">
                  <i class="
                        ri-user-settings-line
                        align-middle
                        fs-18
                        text-muted
                        me-2
                      "></i>
                  <span>My account settings</span>
                </a>

                <!-- item-->
                <div class="dropdown-header mt-2">
                  <h6 class="text-overflow text-muted mb-2 text-uppercase">
                    Members
                  </h6>
                </div>

                <div class="notification-list">
                  <!-- item -->
                  <a href="javascript:void(0);" class="d-flex dropdown-item notify-item py-2">
                    <img src="@/assets/images/users/avatar-2.jpg" class="me-3 rounded-circle avatar-xs"
                      alt="user-pic" />
                    <div class="flex-1">
                      <h6 class="m-0">Angela Bernier</h6>
                      <span class="fs-11 mb-0 text-muted">Manager</span>
                    </div>
                  </a>
                  <!-- item -->
                  <a href="javascript:void(0);" class="d-flex dropdown-item notify-item py-2">
                    <img src="@/assets/images/users/avatar-3.jpg" class="me-3 rounded-circle avatar-xs"
                      alt="user-pic" />
                    <div class="flex-1">
                      <h6 class="m-0">David Grasso</h6>
                      <span class="fs-11 mb-0 text-muted">Web Designer</span>
                    </div>
                  </a>
                  <!-- item -->
                  <a href="javascript:void(0);" class="d-flex dropdown-item notify-item py-2">
                    <img src="@/assets/images/users/avatar-5.jpg" class="me-3 rounded-circle avatar-xs"
                      alt="user-pic" />
                    <div class="flex-1">
                      <h6 class="m-0">Mike Bunch</h6>
                      <span class="fs-11 mb-0 text-muted">React Developer</span>
                    </div>
                  </a>
                </div>
              </SimpleBar>

              <div class="text-center pt-3 pb-1">
                <router-link to="/pages/search-results" class="btn btn-primary btn-sm">View All Results <i
                    class="ri-arrow-right-line ms-1"></i></router-link>
              </div>
            </div>
          </form>
        </div>

        <div class="d-flex align-items-center">

          <div class="ap-sys">
            <div class="ap-sys-but" @click="mhs_clk_homePage">
              <img class="ap-sys-but-icon" src="../assets/icon/system-setup.png" alt="" srcset="">
              <span class="ap-sys-but-text">系统后台</span>
            </div>
          </div>

          <!-- <div class="dropdown ms-1 topbar-head-dropdown header-item">
            <button type="button" class="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
              data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <img id="header-lang-img" src="@/assets/images/flags/us.svg" alt="Header Language" height="20"
                class="rounded" />
            </button>
            <div class="dropdown-menu dropdown-menu-end">
              <a href="javascript:void(0);" v-for="(entry, i) in languages" :key="`Lang${i}`" :value="entry"
                @click="setLanguage(entry.language, entry.title, entry.flag)"
                :class="{ active: lan === entry.language }" class="dropdown-item notify-item language py-2"
                data-lang="en" title="English">
                <img :src="entry.flag" alt="user-image" class="me-2 rounded" height="18" />
                <span class="align-middle">{{ entry.title }}</span>
              </a>
            </div>
          </div> -->

          <div class="ms-1 header-item d-none d-sm-flex">
            <button type="button" class="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
              data-toggle="fullscreen" @click="initFullScreen">

              <el-tooltip class="box-item" effect="dark" content="帮助中心" placement="bottom">
                <i class="bx bx-help-circle fs-22"></i>
              </el-tooltip>
              <!-- <iconpark-icon class="nav-bar-iconpark" name="bangzhu"></iconpark-icon> -->
            </button>
          </div>

          <div class="dropdown topbar-head-dropdown ms-1 header-item">
            <button type="button" class="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
              id="page-header-cart-dropdown" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-haspopup="true"
              aria-expanded="false">
              <i class='bx bx-envelope fs-22'></i>
              <!-- <iconpark-icon class="nav-bar-iconpark" name="youjian"></iconpark-icon> -->
              <span
                class="position-absolute topbar-badge cartitem-badge fs-10 translate-middle badge rounded-pill bg-info">5</span>
            </button>
            <div class="dropdown-menu dropdown-menu-xl dropdown-menu-end p-0 dropdown-menu-cart"
              aria-labelledby="page-header-cart-dropdown">
              <div class="p-3 border-top-0 border-start-0 border-end-0 border-dashed border">
                <div class="row align-items-center">
                  <div class="col">
                    <h6 class="m-0 fs-16 fw-semibold"> My Cart</h6>
                  </div>
                  <div class="col-auto">
                    <span class="badge badge-soft-warning fs-13"><span class="cartitem-badge">7</span>
                      items</span>
                  </div>
                </div>
              </div>
              <SimpleBar data-simplebar style="max-height: 300px">
                <div class="p-2">
                  <div class="text-center empty-cart" id="empty-cart">
                    <div class="avatar-md mx-auto my-3">
                      <div class="avatar-title bg-soft-info text-info fs-36 rounded-circle">
                        <i class='bx bx-cart'></i>
                      </div>
                    </div>
                    <h5 class="mb-3">Your Cart is Empty!</h5>
                    <b-link href="/ecommerce/products" class="btn btn-success w-md mb-3">Shop Now</b-link>
                  </div>
                  <div class="d-block dropdown-item dropdown-item-cart text-wrap px-3 py-2">
                    <div class="d-flex align-items-center">
                      <img src="@/assets/images/products/img-1.png" class="me-3 rounded-circle avatar-sm p-2 bg-light"
                        alt="user-pic">
                      <div class="flex-1">
                        <h6 class="mt-0 mb-1 fs-14">
                          <b-link href="/ecommerce/product-details" class="text-reset">Branded
                            T-Shirts</b-link>
                        </h6>
                        <p class="mb-0 fs-12 text-muted">
                          Quantity: <span>10 x $32</span>
                        </p>
                      </div>
                      <div class="px-2">
                        <h5 class="m-0 fw-normal">$<span class="cart-item-price">320</span></h5>
                      </div>
                      <div class="ps-2">
                        <button type="button" class="btn btn-icon btn-sm btn-ghost-secondary remove-item-btn"><i
                            class="ri-close-fill fs-16"></i></button>
                      </div>
                    </div>
                  </div>

                  <div class="d-block dropdown-item dropdown-item-cart text-wrap px-3 py-2">
                    <div class="d-flex align-items-center">
                      <img src="@/assets/images/products/img-2.png" class="me-3 rounded-circle avatar-sm p-2 bg-light"
                        alt="user-pic">
                      <div class="flex-1">
                        <h6 class="mt-0 mb-1 fs-14">
                          <b-link href="/ecommerce/product-details" class="text-reset">Bentwood Chair</b-link>
                        </h6>
                        <p class="mb-0 fs-12 text-muted">
                          Quantity: <span>5 x $18</span>
                        </p>
                      </div>
                      <div class="px-2">
                        <h5 class="m-0 fw-normal">$<span class="cart-item-price">89</span></h5>
                      </div>
                      <div class="ps-2">
                        <button type="button" class="btn btn-icon btn-sm btn-ghost-secondary remove-item-btn"><i
                            class="ri-close-fill fs-16"></i></button>
                      </div>
                    </div>
                  </div>

                  <div class="d-block dropdown-item dropdown-item-cart text-wrap px-3 py-2">
                    <div class="d-flex align-items-center">
                      <img src="@/assets/images/products/img-3.png" class="me-3 rounded-circle avatar-sm p-2 bg-light"
                        alt="user-pic">
                      <div class="flex-1">
                        <h6 class="mt-0 mb-1 fs-14">
                          <b-link href="/ecommerce/product-details" class="text-reset">
                            Borosil Paper Cup</b-link>
                        </h6>
                        <p class="mb-0 fs-12 text-muted">
                          Quantity: <span>3 x $250</span>
                        </p>
                      </div>
                      <div class="px-2">
                        <h5 class="m-0 fw-normal">$<span class="cart-item-price">750</span></h5>
                      </div>
                      <div class="ps-2">
                        <button type="button" class="btn btn-icon btn-sm btn-ghost-secondary remove-item-btn"><i
                            class="ri-close-fill fs-16"></i></button>
                      </div>
                    </div>
                  </div>

                  <div class="d-block dropdown-item dropdown-item-cart text-wrap px-3 py-2">
                    <div class="d-flex align-items-center">
                      <img src="@/assets/images/products/img-6.png" class="me-3 rounded-circle avatar-sm p-2 bg-light"
                        alt="user-pic">
                      <div class="flex-1">
                        <h6 class="mt-0 mb-1 fs-14">
                          <b-link href="/ecommerce/product-details" class="text-reset">Gray
                            Styled T-Shirt</b-link>
                        </h6>
                        <p class="mb-0 fs-12 text-muted">
                          Quantity: <span>1 x $1250</span>
                        </p>
                      </div>
                      <div class="px-2">
                        <h5 class="m-0 fw-normal">$ <span class="cart-item-price">1250</span></h5>
                      </div>
                      <div class="ps-2">
                        <button type="button" class="btn btn-icon btn-sm btn-ghost-secondary remove-item-btn"><i
                            class="ri-close-fill fs-16"></i></button>
                      </div>
                    </div>
                  </div>

                  <div class="d-block dropdown-item dropdown-item-cart text-wrap px-3 py-2">
                    <div class="d-flex align-items-center">
                      <img src="@/assets/images/products/img-5.png" class="me-3 rounded-circle avatar-sm p-2 bg-light"
                        alt="user-pic">
                      <div class="flex-1">
                        <h6 class="mt-0 mb-1 fs-14">
                          <b-link href="/ecommerce/product-details" class="text-reset">Stillbird Helmet
                          </b-link>
                        </h6>
                        <p class="mb-0 fs-12 text-muted">
                          Quantity: <span>2 x $495</span>
                        </p>
                      </div>
                      <div class="px-2">
                        <h5 class="m-0 fw-normal">$<span class="cart-item-price">990</span></h5>
                      </div>
                      <div class="ps-2">
                        <button type="button" class="btn btn-icon btn-sm btn-ghost-secondary remove-item-btn"><i
                            class="ri-close-fill fs-16"></i></button>
                      </div>
                    </div>
                  </div>
                </div>
              </SimpleBar>
              <div class="p-3 border-bottom-0 border-start-0 border-end-0 border-dashed border" id="checkout-elem">
                <div class="d-flex justify-content-between align-items-center pb-3">
                  <h5 class="m-0 text-muted">Total:</h5>
                  <div class="px-2">
                    <h5 class="m-0" id="cart-item-total">$1258.58</h5>
                  </div>
                </div>

                <b-link href="/ecommerce/checkout" class="btn btn-success text-center w-100">
                  Checkout
                </b-link>
              </div>
            </div>
          </div>

          <div class="ap-hint">
            <el-dropdown trigger="click">
              <div class="ap-hint-text">
                <button type="button" class="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
                  id="page-header-notifications-dropdown" data-bs-toggle="dropdown" aria-haspopup="true"
                  aria-expanded="false">
                  <i class="bx bx-bell fs-22"></i>
                  <span class="position-absolute topbar-badge fs-10 translate-middle badge rounded-pill bg-danger">
                    3</span>
                </button>
              </div>
              <template #dropdown>
                <div class="ap-hint-dropdown ap-hintDropdown">
                  <div class="dropdown-list">
                    <div class="dropdown-list-cont" v-for="(item, index) in state.hint">
                      <img class="dropdown-list-cont-img" :src="item.icon" alt="" srcset="">
                      <div class="dropdown-list-cont-name">{{ item.name }}</div>
                    </div>
                  </div>
                </div>
              </template>
            </el-dropdown>
          </div>

          <div class="ap-more">
            <el-dropdown trigger="click">
              <div class="ap-more-text">
                <button type="button" class="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
                  id="page-header-notifications-dropdown" data-bs-toggle="dropdown" aria-haspopup="true"
                  aria-expanded="false">
                  <i class="bx bx-category-alt fs-22"></i>
                </button>
              </div>
              <template #dropdown>
                <div class="ap-more-dropdown ap-moreDropdown">
                  <div class="dropdown-list">
                    <div class="dropdown-list-cont" v-for="(item, index) in state.more">
                      <img class="dropdown-list-cont-img" :src="item.icon" alt="" srcset="">
                      <div class="dropdown-list-cont-name">{{ item.name }}</div>
                    </div>
                  </div>
                </div>
              </template>
            </el-dropdown>
          </div>

          <div class="ap-personalCenter">
            <el-dropdown trigger="click">
              <div class="ap-personalCenter-text">
                <span class="ap-personalCenter-name">春青</span>
                <span class="ap-personalCenter-icon">
                  <i class="ri-arrow-down-s-fill"></i>
                </span>
              </div>
              <template #dropdown>
                <div class="ap-personalCenter-dropdown ap-personalCenterDropdown">
                  <div class="dropdown-box">
                    <div class="dropdown-name">
                      <div class="dropdown-name-icon">春青</div>
                      <div class="dropdown-name-text">曹春青</div>
                    </div>
                  </div>
                  <div class="dropdown-list">
                    <div class="dropdown-list-li">
                      <span class="dropdown-list-li-text">个人中心</span>
                    </div>
                    <div class="dropdown-list-li">
                      <span class="dropdown-list-li-text">修改密码</span>
                    </div>
                    <div class="dropdown-list-li">
                      <span class="dropdown-list-li-text">下载章管家APP</span>
                    </div>
                    <div class="dropdown-list-li">
                      <el-popover trigger="click" placement="left-start">
                        <template #reference>
                          <div class="popover-text">
                            <span class="dropdown-list-li-text">语言切换</span>
                          </div>
                        </template>
                        <div class="popover-cont ap-personalCenterPopover">
                          <div class="popover-cont-list">简体中文</div>
                          <div class="popover-cont-list">English</div>
                        </div>
                      </el-popover>
                    </div>
                    <div class="dropdown-list-li">
                      <span class="dropdown-list-li-text">移动设备</span>
                    </div>
                    <div class="dropdown-list-li">
                      <span class="dropdown-list-li-text">退出登录</span>
                    </div>

                  </div>
                </div>
              </template>
            </el-dropdown>
          </div>

          <!-- <div class="dropdown ms-sm-3 header-item topbar-user">
            <button type="button" class="btn" id="page-header-user-dropdown" data-bs-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false">
              <span class="d-flex align-items-center">
                <img class="rounded-circle header-profile-user" src="@/assets/images/users/avatar-1.jpg"
                  alt="Header Avatar" />
                <span class="text-start ms-xl-2">
                  <span class=" d-none d-xl-inline-block ms-1 fw-medium user-name-text">马丽丽</span>
                  <span class="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">137****4176</span>
                </span>
              </span>
            </button>
            <div class="dropdown-menu dropdown-menu-end">
              <router-link class="dropdown-item" to="/pages/profile"><i
                  class="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
                <span class="align-middle">个人中心</span>
              </router-link>
              <router-link class="dropdown-item" to="/chat">
                <i class="ri-download-cloud-2-line"></i>
                <span class="align-middle">下载章管家APP</span>
              </router-link>
              <router-link class="dropdown-item" to="/apps/tasks-kanban">
                <i class="ri-smartphone-line"></i>
                <span class="align-middle">移动设备管理</span>
              </router-link>
              <router-link class="dropdown-item" to="/auth/lockscreen-basic"><i
                  class="mdi mdi-lock text-muted fs-16 align-middle me-1"></i>
                <span class="align-middle">修改密码</span>
              </router-link>
              <a class="dropdown-item" href="/login"><i class="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>
                <span class="align-middle" data-key="t-logout">退出登录</span></a>
            </div>
          </div> -->

        </div>
      </div>
    </div>
  </header>
</template>


<script lang="js">
import {
  SimpleBar
} from "simplebar-vue3";

import i18n from "../i18n";

/**
 * Nav-bar Component
 */
export default {
  data() {
    return {
      languages: [{
        flag: require("@/assets/images/flags/us.svg"),
        language: "en",
        title: "English",
      },
      {
        flag: require("@/assets/images/flags/spain.svg"),
        language: "sp",
        title: "Española",
      },
      {
        flag: require("@/assets/images/flags/germany.svg"),
        language: "gr",
        title: "Deutsche",
      },
      {
        flag: require("@/assets/images/flags/italy.svg"),
        language: "it",
        title: "italiana",
      },
      {
        flag: require("@/assets/images/flags/russia.svg"),
        language: "ru",
        title: "русский",
      },
      {
        flag: require("@/assets/images/flags/china.svg"),
        language: "ch",
        title: "中國人",
      },
      {
        flag: require("@/assets/images/flags/french.svg"),
        language: "fr",
        title: "Français",
      },
      ],
      lan: i18n.locale,
      text: null,
      flag: null,
      value: null,
      myVar: 1,

      state: {
        CurrentSystemType: "business" ,//business / system
        more: [{
          icon: require("../assets/svg/more-Seal-Application.svg"),
          name: "用印申请",
        }, {
          icon: require("../assets/svg/more-my-Seal-Application.svg"),
          name: "我的用印申请",
        }, {
          icon: require("../assets/svg/more-file-document.svg"),
          name: "文件归档",
        }, {
          icon: require("../assets/svg/more-Application-Seal.svg"),
          name: "印章申请",
        }, {
          icon: require("../assets/svg/more-file-document.svg"),
          name: "文件库",
        }, {
          icon: require("../assets/svg/more-document-library.svg"),
          name: "印章库",
        }],
        hint: [{

        }],
      },
    };
  },
  components: {
    SimpleBar
  },
  created() {
    let CurrentSystemType = sessionStorage.getItem("CurrentSystemType");
    if (CurrentSystemType) {
      this.state.CurrentSystemType = CurrentSystemType
    }
  },
  methods: {

    isCustomDropdown() {
      //Search bar
      var searchOptions = document.getElementById("search-close-options");
      var dropdown = document.getElementById("search-dropdown");
      var searchInput = document.getElementById("search-options");

      searchInput.addEventListener("focus", () => {
        var inputLength = searchInput.value.length;
        if (inputLength > 0) {
          dropdown.classList.add("show");
          searchOptions.classList.remove("d-none");
        } else {
          dropdown.classList.remove("show");
          searchOptions.classList.add("d-none");
        }
      });

      searchInput.addEventListener("keyup", () => {
        var inputLength = searchInput.value.length;
        if (inputLength > 0) {
          dropdown.classList.add("show");
          searchOptions.classList.remove("d-none");
        } else {
          dropdown.classList.remove("show");
          searchOptions.classList.add("d-none");
        }
      });

      searchOptions.addEventListener("click", () => {
        searchInput.value = "";
        dropdown.classList.remove("show");
        searchOptions.classList.add("d-none");
      });

      document.body.addEventListener("click", (e) => {
        if (e.target.getAttribute("id") !== "search-options") {
          dropdown.classList.remove("show");
          searchOptions.classList.add("d-none");
        }
      });
    },
    toggleHamburgerMenu() {
      var windowSize = document.documentElement.clientWidth;

      if (windowSize > 767)
        document.querySelector(".hamburger-icon").classList.toggle("open");

      //For collapse horizontal menu
      if (
        document.documentElement.getAttribute("data-layout") === "horizontal"
      ) {
        document.body.classList.contains("menu") ?
          document.body.classList.remove("menu") :
          document.body.classList.add("menu");
      }

      //For collapse vertical menu
      if (document.documentElement.getAttribute("data-layout") === "vertical") {
        if (windowSize < 1025 && windowSize > 767) {
          document.body.classList.remove("vertical-sidebar-enable");
          document.documentElement.getAttribute("data-sidebar-size") == "sm" ?
            document.documentElement.setAttribute("data-sidebar-size", "") :
            document.documentElement.setAttribute("data-sidebar-size", "sm");
        } else if (windowSize > 1025) {
          document.body.classList.remove("vertical-sidebar-enable");
          document.documentElement.getAttribute("data-sidebar-size") == "lg" ?
            document.documentElement.setAttribute("data-sidebar-size", "sm") :
            document.documentElement.setAttribute("data-sidebar-size", "lg");
        } else if (windowSize <= 767) {
          document.body.classList.add("vertical-sidebar-enable");
          document.documentElement.setAttribute("data-sidebar-size", "lg");
        }
      }

      //Two column menu
      if (document.documentElement.getAttribute("data-layout") == "twocolumn") {
        document.body.classList.contains("twocolumn-panel") ?
          document.body.classList.remove("twocolumn-panel") :
          document.body.classList.add("twocolumn-panel");
      }
    },
    toggleMenu() {
      this.$parent.toggleMenu();
    },
    toggleRightSidebar() {
      this.$parent.toggleRightSidebar();
    },
    initFullScreen() {
      document.body.classList.toggle("fullscreen-enable");
      if (
        !document.fullscreenElement &&
        /* alternative standard method */
        !document.mozFullScreenElement &&
        !document.webkitFullscreenElement
      ) {
        // current working methods
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(
            Element.ALLOW_KEYBOARD_INPUT
          );
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      }
    },
    setLanguage(locale, country, flag) {
      this.lan = locale;
      this.text = country;
      this.flag = flag;
      document.getElementById("header-lang-img").setAttribute("src", flag);
      i18n.global.locale = locale;
    },
    toggleDarkMode() {
      if (document.documentElement.getAttribute("data-layout-mode") == "dark") {
        document.documentElement.setAttribute("data-layout-mode", "light");
      } else {
        document.documentElement.setAttribute("data-layout-mode", "dark");
      }
    },
    initTopbarComponents() {
      function updateCartPrice() {
        var currencySign = "$";
        var subtotal = 0;
        Array.from(document.getElementsByClassName("cart-item-price")).forEach(function (e) {
          subtotal += parseFloat(e.innerHTML);
        });
        if (document.getElementById("cart-item-total")) {
          document.getElementById("cart-item-total").innerHTML = currencySign + subtotal.toFixed(2);
        }
      }
      if (document.getElementsByClassName("dropdown-item-cart")) {
        var dropdownItemCart = document.querySelectorAll(".dropdown-item-cart").length;
        Array.from(document.querySelectorAll("#page-topbar .dropdown-menu-cart .remove-item-btn")).forEach(function (item) {
          item.addEventListener("click", function () {
            dropdownItemCart--;
            this.closest(".dropdown-item-cart").remove();
            Array.from(document.getElementsByClassName("cartitem-badge")).forEach(function (e) {
              e.innerHTML = dropdownItemCart;
            });
            updateCartPrice();
            if (document.getElementById("empty-cart")) {
              document.getElementById("empty-cart").style.display = dropdownItemCart == 0 ? "block" : "none";
            }
            if (document.getElementById("checkout-elem")) {
              document.getElementById("checkout-elem").style.display = dropdownItemCart == 0 ? "none" : "block";
            }
          });
        });
        Array.from(document.getElementsByClassName("cartitem-badge")).forEach(function (e) {
          e.innerHTML = dropdownItemCart;
        });
        if (document.getElementById("empty-cart")) {
          document.getElementById("empty-cart").style.display = "none";
        }
        if (document.getElementById("checkout-elem")) {
          document.getElementById("checkout-elem").style.display = "block";
        }
        updateCartPrice();
      }

      // notification messages
      if (document.getElementsByClassName("notification-check")) {
        Array.from(document.querySelectorAll(".notification-check input")).forEach(function (element) {
          element.addEventListener("click", function (el) {
            el.target.closest(".notification-item").classList.toggle("active");
          });
        });
      }
    },

    // 跳转页面
    mhs_clk_redirect(path) {
      this.$router.push(path);
    },

    // 跳转业务首页或者系统首页
    mhs_clk_homePage() {
      //business / system
      // 跳转业务首页或者系统首页
      if (this.state.CurrentSystemType == "business") {
        this.mhs_clk_redirect("/system/home")
      } else if (this.state.CurrentSystemType == "system") {
        this.mhs_clk_redirect("/frontDesk/home")
      }
    }

  },
  computed: {},

  mounted() {
    document.addEventListener("scroll", function () {
      var pageTopbar = document.getElementById("page-topbar");
      if (pageTopbar) {
        document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50 ? pageTopbar.classList.add(
          "topbar-shadow") : pageTopbar.classList.remove("topbar-shadow");
      }
    });
    if (document.getElementById("topnav-hamburger-icon"))
      document
        .getElementById("topnav-hamburger-icon")
        .addEventListener("click", this.toggleHamburgerMenu);

    // this.isCustomDropdown();
    this.initTopbarComponents();
  },
};
</script>
<style lang='scss' scoped>
// @import "../style/index.scss";

.nav-bar-iconpark {
  font-size: 22px;
}

.dropdown-item {
  display: flex;
  align-items: center;
}

.ap-dropdown {
  height: 100%;
  display: flex;
  align-items: center;

  .ap-dropdown-text {
    font-size: var(--font-size-title-1);
    font-weight: var(--font-weight-700);
    display: flex;
    align-items: center;
  }
}

.ap-sys {
  margin-right: 1rem;

  .ap-sys-but {
    border-radius: var(--border-radius-4);
    opacity: 1;
    border: 1px solid var(--primary-6);
    color: var(--primary-6);
    padding: 0.3rem 0.8rem;
    box-sizing: border-box;
    cursor: pointer;

    .ap-sys-but-icon {
      width: 1.5rem;
      margin-right: 0.3rem;
    }
  }
}

.ap-personalCenter {
  .ap-personalCenter-text {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-left: 1.5rem;

    .ap-personalCenter-name {
      @include mixin-width(34);
      @include mixin-height(34);
      border-radius: var(--border-radius-4);
      background-color: var(--primary-6);
      color: var(--in-common-use-1);
      // padding: 0.5rem 0.4rem;
      box-sizing: border-box;
      margin-right: 0.3rem;
      display: flex;
      align-items: center;
      align-content: center;
      justify-content: center;
      font-size: var(--font-size-body-1);
    }

    .ap-personalCenter-icon {
      font-size: 1.5rem;
    }
  }

}

.ap-personalCenterDropdown {
  @include mixin-width(240);

  .dropdown-box {
    @include mixin-padding(10);
    box-sizing: border-box;
  }

  .dropdown-name {
    @include mixin-height(120);
    border-radius: var(--border-radius-4);
    background-color: #F4F5F7;
    text-align: center;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    flex-flow: wrap;

    .dropdown-name-icon {
      @include mixin-width(50);
      @include mixin-height(50);
      display: flex;
      align-items: center;
      align-content: center;
      justify-content: center;
      border-radius: var(--border-radius-4);
      background-color: #E2B062;
      color: var(--in-common-use-1);
      margin-bottom: 0.5rem;
    }

    .dropdown-name-text {
      width: 100%;
      font-weight: var(--font-weight-500)
    }
  }

  .dropdown-list {

    .dropdown-list-li {
      @include mixin-height(30);
      @include mixin-padding-left(10);
      @include mixin-padding-right(10);
      box-sizing: border-box;
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    .dropdown-list-li:hover {
      background: rgba(192, 196, 204, 0.19829);
    }
  }
}

.ap-personalCenterPopover {
  .popover-cont-list {
    @include mixin-height(30);
    @include mixin-padding-left(10);
    @include mixin-padding-right(10);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .popover-cont-list:hover {
    background: rgba(192, 196, 204, 0.19829);
  }
}

.ap-moreDropdown {
  @include mixin-width(340);
  @include mixin-height(400);
  @include mixin-padding(30);

  .dropdown-list {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-content: space-between;
    flex-flow: wrap;

    .dropdown-list-cont {
      @include mixin-width(130);
      @include mixin-height(100);
      text-align: center;
      display: flex;
      flex-flow: wrap;
      align-content: center;
      justify-content: center;

      .dropdown-list-cont-name {
        width: 100%;
        @include mixin-margin-top(11);
      }
    }

    .dropdown-list-cont:hover {
      background-color: var(--color-fill--2)
    }
  }

}


.ap-enterprise {
  @include mixin-width(290);
  padding: 1rem;

  .ap-enterprise-text {
    display: flex;
    flex-flow: wrap;
    justify-content: center;

    .ap-enterprise-text-list {
      @include mixin-width(258);
      padding: 0.4rem 0.5rem;
      cursor: pointer;
      margin: 0.2rem;
      border-radius: var(--border-radius-4);
      font-weight: var(--font-weight-600);
      font-size: var(--font-size-body-2);
    }
  }

  .ap-enterprise-cont {
    display: flex;
    flex-flow: wrap;
    justify-content: center;

    .ap-enterprise-cont-list {
      @include mixin-width(258);
      padding: 0.4rem 1rem;
      cursor: pointer;
      margin: 0.2rem;
      border-radius: var(--border-radius-4);
    }

    .ap-enterprise-cont-list:hover {
      background-color: var(--color-fill--2);
      color: var(--primary-6);
    }
  }
}
</style>