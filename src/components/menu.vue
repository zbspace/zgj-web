
<template>
  <div class="container-fluid components-menu">
    <div id="two-column-menu" />

    <template v-if="layoutType === 'twocolumn'">
      <SimpleBar
        class="navbar-nav"
        id="navbar-nav"
      >
        <li class="menu-title">
          <span data-key="t-menu"> {{ $t("t-menu") }}</span>
        </li>
        <li class="nav-item">
          <a
            class="nav-link menu-link"
            href="#sidebarDashboards"
            data-bs-toggle="collapse"
            role="button"
            aria-expanded="false"
            aria-controls="sidebarDashboards"
          >
            <i class="ri-dashboard-2-line" />
            <span data-key="t-dashboards"> {{ $t("t-dashboards") }}</span>
          </a>
          <div
            class="collapse menu-dropdown"
            id="sidebarDashboards"
          >
            <ul class="nav nav-sm flex-column">
              <li class="nav-item">
                <router-link
                  to="/dashboard/analytics"
                  class="nav-link custom-abc"
                  data-key="t-analytics"
                >
                  {{ $t("t-analytics") }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="/dashboard/crm"
                  class="nav-link"
                  data-key="t-crm"
                >
                  {{ $t("t-crm") }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="/"
                  class="nav-link"
                  data-key="t-ecommerce"
                >
                  {{ $t("t-ecommerce") }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="/dashboard/crypto"
                  class="nav-link"
                  data-key="t-crypto"
                >
                  {{ $t("t-crypto") }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="/dashboard/projects"
                  class="nav-link"
                  data-key="t-projects"
                >
                  {{ $t("t-projects") }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="/dashboard/nft"
                  class="nav-link"
                  data-key="t-nft"
                >
                  {{ $t("t-nft") }}
                </router-link>
              </li>
            </ul>
          </div>
        </li>
        <!-- end Dashboard Menu -->
        <li class="nav-item">
          <a
            class="nav-link menu-link"
            href="#sidebarApps"
            data-bs-toggle="collapse"
            role="button"
            aria-expanded="false"
            aria-controls="sidebarApps"
          >
            <i class="ri-apps-2-line" />
            <span data-key="t-apps"> {{ $t("t-apps") }}</span>
          </a>
          <div
            class="collapse menu-dropdown"
            id="sidebarApps"
          >
            <ul class="nav nav-sm flex-column">
              <li class="nav-item">
                <router-link
                  to="/calendar"
                  class="nav-link"
                  data-key="t-calendar"
                >
                  {{ $t("t-calendar") }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="/chat"
                  class="nav-link"
                  data-key="t-chat"
                >
                  {{ $t("t-chat") }}
                </router-link>
              </li>
              <li class="nav-item">
                <a
                  href="#sidebaremail"
                  class="nav-link"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebaremail"
                  data-key="t-projects"
                >
                  {{ $t("t-email") }}
                </a>
                <div
                  class="collapse menu-dropdown"
                  id="sidebaremail"
                >
                  <ul class="nav nav-sm flex-column">
                    <li class="nav-item">
                      <router-link
                        to="/mailbox"
                        class="nav-link"
                        data-key="t-mailbox"
                      >
                        {{ $t("t-mailbox") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <a
                        href="#sidebarsubemail"
                        class="nav-link"
                        data-bs-toggle="collapse"
                        role="button"
                        aria-expanded="false"
                        aria-controls="sidebarsubemail"
                        data-key="t-projects"
                      >
                        {{ $t("t-email-templates") }}
                        <span
                          class="badge badge-pill bg-danger"
                          data-key="t-new"
                        >{{ $t("t-new") }}</span>
                      </a>
                      <div
                        class="collapse menu-dropdown"
                        id="sidebarsubemail"
                      >
                        <ul class="nav nav-sm flex-column">
                          <li class="nav-item">
                            <router-link
                              to="/email/email-basic"
                              class="nav-link"
                              data-key="t-products"
                            >
                              {{ $t("t-basic-action") }}
                            </router-link>
                          </li>
                          <li class="nav-item">
                            <router-link
                              to="/email/email-ecommerce"
                              class="nav-link"
                              data-key="t-products"
                            >
                              {{ $t("t-ecommerce-action") }}
                            </router-link>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
              <li class="nav-item">
                <a
                  href="#sidebarEcommerce"
                  class="nav-link"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarEcommerce"
                  data-key="t-ecommerce"
                >
                  {{ $t("t-ecommerce") }}
                </a>
                <div
                  class="collapse menu-dropdown"
                  id="sidebarEcommerce"
                >
                  <ul class="nav nav-sm flex-column">
                    <li class="nav-item">
                      <router-link
                        to="/ecommerce/products"
                        class="nav-link"
                        data-key="t-products"
                      >
                        {{ $t("t-products") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        to="/ecommerce/product-details"
                        class="nav-link"
                        data-key="t-product-Details"
                      >
                        {{ $t("t-product-Details") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        to="/ecommerce/add-product"
                        class="nav-link"
                        data-key="t-create-product"
                      >
                        {{ $t("t-create-product") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        to="/ecommerce/orders"
                        class="nav-link"
                        data-key="t-orders"
                      >
                        {{ $t("t-orders") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        to="/ecommerce/order-details"
                        class="nav-link"
                        data-key="t-order-details"
                      >
                        {{ $t("t-order-details") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        to="/ecommerce/customers"
                        class="nav-link"
                        data-key="t-customers"
                      >
                        {{ $t("t-customers") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        to="/ecommerce/shopping-cart"
                        class="nav-link"
                        data-key="t-shopping-cart"
                      >
                        {{ $t("t-shopping-cart") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        to="/ecommerce/checkout"
                        class="nav-link"
                        data-key="t-checkout"
                      >
                        {{ $t("t-checkout") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        to="/ecommerce/sellers"
                        class="nav-link"
                        data-key="t-sellers"
                      >
                        {{ $t("t-sellers") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        to="/ecommerce/seller-details"
                        class="nav-link"
                        data-key="t-sellers-details"
                      >
                        {{ $t("t-sellers-details") }}
                      </router-link>
                    </li>
                  </ul>
                </div>
              </li>
              <li class="nav-item">
                <a
                  href="#sidebarProjects"
                  class="nav-link"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarProjects"
                  data-key="t-projects"
                >
                  {{ $t("t-projects") }}
                </a>
                <div
                  class="collapse menu-dropdown"
                  id="sidebarProjects"
                >
                  <ul class="nav nav-sm flex-column">
                    <li class="nav-item">
                      <router-link
                        to="/apps/projects-list"
                        class="nav-link"
                        data-key="t-list"
                      >
                        {{ $t("t-list") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        to="/apps/projects-overview"
                        class="nav-link"
                        data-key="t-overview"
                      >
                        {{ $t("t-overview") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        to="/apps/projects-create"
                        class="nav-link"
                        data-key="t-create-project"
                      >
                        {{ $t("t-create-project") }}
                      </router-link>
                    </li>
                  </ul>
                </div>
              </li>
              <li class="nav-item">
                <a
                  href="#sidebarTasks"
                  class="nav-link"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarTasks"
                  data-key="t-tasks"
                >
                  {{ $t("t-tasks") }}
                </a>
                <div
                  class="collapse menu-dropdown"
                  id="sidebarTasks"
                >
                  <ul class="nav nav-sm flex-column">
                    <li class="nav-item">
                      <router-link
                        to="/apps/tasks-kanban"
                        class="nav-link"
                        data-key="t-kanbanboard"
                      >
                        {{ $t("t-kanbanboard") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        to="/apps/tasks-list-view"
                        class="nav-link"
                        data-key="t-list-view"
                      >
                        {{ $t("t-list-view") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        to="/apps/tasks-details"
                        class="nav-link"
                        data-key="t-task-details"
                      >
                        {{ $t("t-task-details") }}
                      </router-link>
                    </li>
                  </ul>
                </div>
              </li>
              <li class="nav-item">
                <a
                  href="#sidebarCRM"
                  class="nav-link"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarCRM"
                  data-key="t-crm"
                >
                  {{ $t("t-crm") }}
                </a>
                <div
                  class="collapse menu-dropdown"
                  id="sidebarCRM"
                >
                  <ul class="nav nav-sm flex-column">
                    <li class="nav-item">
                      <router-link
                        to="/apps/crm-contacts"
                        class="nav-link"
                        data-key="t-contacts"
                      >
                        {{ $t("t-contacts") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        to="/apps/crm-companies"
                        class="nav-link"
                        data-key="t-companies"
                      >
                        {{ $t("t-companies") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        to="/apps/crm-deals"
                        class="nav-link"
                        data-key="t-deals"
                      >
                        {{ $t("t-deals") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        to="/apps/crm-leads"
                        class="nav-link"
                        data-key="t-leads"
                      >
                        {{ $t("t-leads") }}
                      </router-link>
                    </li>
                  </ul>
                </div>
              </li>
              <li class="nav-item">
                <a
                  href="#sidebarCrypto"
                  class="nav-link"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarCrypto"
                  data-key="t-crypto"
                >
                  {{ $t("t-crypto") }}
                </a>
                <div
                  class="collapse menu-dropdown"
                  id="sidebarCrypto"
                >
                  <ul class="nav nav-sm flex-column">
                    <li class="nav-item">
                      <router-link
                        to="/crypto/transactions"
                        class="nav-link"
                        data-key="t-transactions"
                      >
                        {{ $t("t-transactions") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        to="/crypto/buy-sell"
                        class="nav-link"
                        data-key="t-buy-sell"
                      >
                        {{ $t("t-buy-sell") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        to="/crypto/orders"
                        class="nav-link"
                        data-key="t-orders"
                      >
                        {{ $t("t-orders") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        to="/crypto/wallet"
                        class="nav-link"
                        data-key="t-my-wallet"
                      >
                        {{ $t("t-my-wallet") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        to="/crypto/ico"
                        class="nav-link"
                        data-key="t-ico-list"
                      >
                        {{ $t("t-ico-list") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        to="/crypto/kyc"
                        class="nav-link"
                        data-key="t-kyc-application"
                      >
                        {{ $t("t-kyc-application") }}
                      </router-link>
                    </li>
                  </ul>
                </div>
              </li>
              <li class="nav-item">
                <a
                  href="#sidebarInvoices"
                  class="nav-link"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarInvoices"
                  data-key="t-invoices"
                >
                  {{ $t("t-invoices") }}
                </a>
                <div
                  class="collapse menu-dropdown"
                  id="sidebarInvoices"
                >
                  <ul class="nav nav-sm flex-column">
                    <li class="nav-item">
                      <router-link
                        to="/invoices/list"
                        class="nav-link"
                        data-key="t-list-view"
                      >
                        {{ $t("t-list-view") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        to="/invoices/detail"
                        class="nav-link"
                        data-key="t-details"
                      >
                        {{ $t("t-details") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        to="/invoices/create"
                        class="nav-link"
                        data-key="t-create-invoice"
                      >
                        {{ $t("t-create-invoice") }}
                      </router-link>
                    </li>
                  </ul>
                </div>
              </li>
              <li class="nav-item">
                <a
                  href="#sidebarTickets"
                  class="nav-link"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarTickets"
                  data-key="t-supprt-tickets"
                >
                  {{ $t("t-supprt-tickets") }}
                </a>
                <div
                  class="collapse menu-dropdown"
                  id="sidebarTickets"
                >
                  <ul class="nav nav-sm flex-column">
                    <li class="nav-item">
                      <router-link
                        to="/apps/tickets-list"
                        class="nav-link"
                        data-key="t-list-view"
                      >
                        {{ $t("t-list-view") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        to="/apps/tickets-details"
                        class="nav-link"
                        data-key="t-ticket-details"
                      >
                        {{ $t("t-ticket-details") }}
                      </router-link>
                    </li>
                  </ul>
                </div>
              </li>
              <li class="nav-item">
                <a
                  href="#nftmarketplace"
                  class="nav-link"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="nftmarketplace"
                  data-key="t-supprt-tickets"
                >
                  {{ $t("t-nft-marketplace") }}
                </a>
                <div
                  class="collapse menu-dropdown"
                  id="nftmarketplace"
                >
                  <ul class="nav nav-sm flex-column">
                    <li class="nav-item">
                      <router-link
                        to="/apps/nft-marketplace"
                        class="nav-link"
                        data-key="t-list-view"
                      >
                        {{ $t("t-marketplace") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        to="/apps/nft-explore"
                        class="nav-link"
                        data-key="t-ticket-details"
                      >
                        {{ $t("t-explore-now") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        to="/apps/nft-auction"
                        class="nav-link"
                        data-key="t-ticket-details"
                      >
                        {{ $t("t-live-auction") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        to="/apps/nft-item-detail"
                        class="nav-link"
                        data-key="t-ticket-details"
                      >
                        {{ $t("t-item-details") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        to="/apps/nft-collection"
                        class="nav-link"
                        data-key="t-ticket-details"
                      >
                        {{ $t("t-collections") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        to="/apps/nft-creators"
                        class="nav-link"
                        data-key="t-ticket-details"
                      >
                        {{ $t("t-creators") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        to="/apps/nft-ranking"
                        class="nav-link"
                        data-key="t-ticket-details"
                      >
                        {{ $t("t-ranking") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        to="/apps/nft-wallet"
                        class="nav-link"
                        data-key="t-ticket-details"
                      >
                        {{ $t("t-wallet-connect") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        to="/apps/nft-create"
                        class="nav-link"
                        data-key="t-ticket-details"
                      >
                        {{ $t("t-create-nft") }}
                      </router-link>
                    </li>
                  </ul>
                </div>
              </li>
              <li class="nav-item">
                <router-link
                  to="/apps-file-manager"
                  class="nav-link"
                  data-key="t-file-manager"
                >
                  {{ $t("t-file-manager") }}
                  <span
                    class="badge badge-pill bg-danger"
                    data-key="t-new"
                  >{{
                    $t("t-new")
                  }}</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="/apps-todo"
                  class="nav-link"
                  data-key="t-to-do"
                >
                  {{ $t("t-to-do") }}
                  <span
                    class="badge badge-pill bg-danger"
                    data-key="t-new"
                  >{{
                    $t("t-new")
                  }}</span>
                </router-link>
              </li>
            </ul>
          </div>
        </li>

        <li class="menu-title">
          <i class="ri-more-fill" />
          <span data-key="t-pages">{{ $t("t-pages") }}</span>
        </li>

        <li class="nav-item">
          <a
            class="nav-link menu-link"
            href="#sidebarAuth"
            data-bs-toggle="collapse"
            role="button"
            aria-expanded="false"
            aria-controls="sidebarAuth"
          >
            <i class="ri-account-circle-line" />
            <span data-key="t-authentication">{{
              $t("t-authentication")
            }}</span>
          </a>
          <div
            class="collapse menu-dropdown"
            id="sidebarAuth"
          >
            <ul class="nav nav-sm flex-column">
              <li class="nav-item">
                <a
                  href="#sidebarSignIn"
                  class="nav-link"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarSignIn"
                  data-key="t-signin"
                >{{ $t("t-signin") }}
                </a>
                <div
                  class="collapse menu-dropdown"
                  id="sidebarSignIn"
                >
                  <ul class="nav nav-sm flex-column">
                    <li class="nav-item">
                      <router-link
                        to="/auth/signin-basic"
                        class="nav-link"
                        data-key="t-basic"
                      >
                        {{ $t("t-basic") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        to="/auth/signin-cover"
                        class="nav-link"
                        data-key="t-cover"
                      >
                        {{ $t("t-cover") }}
                      </router-link>
                    </li>
                  </ul>
                </div>
              </li>
              <li class="nav-item">
                <a
                  href="#sidebarSignUp"
                  class="nav-link"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarSignUp"
                  data-key="t-signup"
                >{{ $t("t-signup") }}
                </a>
                <div
                  class="collapse menu-dropdown"
                  id="sidebarSignUp"
                >
                  <ul class="nav nav-sm flex-column">
                    <li class="nav-item">
                      <router-link
                        to="/auth/signup-basic"
                        class="nav-link"
                        data-key="t-basic"
                      >
                        {{ $t("t-basic") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        to="/auth/signup-cover"
                        class="nav-link"
                        data-key="t-cover"
                      >
                        {{ $t("t-cover") }}
                      </router-link>
                    </li>
                  </ul>
                </div>
              </li>

              <li class="nav-item">
                <a
                  href="#sidebarResetPass"
                  class="nav-link"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarResetPass"
                  data-key="t-password-reset"
                >
                  {{ $t("t-password-reset") }}
                </a>
                <div
                  class="collapse menu-dropdown"
                  id="sidebarResetPass"
                >
                  <ul class="nav nav-sm flex-column">
                    <li class="nav-item">
                      <router-link
                        to="/auth/reset-pwd-basic"
                        class="nav-link"
                        data-key="t-basic"
                      >
                        {{ $t("t-basic") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        to="/auth/reset-pwd-cover"
                        class="nav-link"
                        data-key="t-cover"
                      >
                        {{ $t("t-cover") }}
                      </router-link>
                    </li>
                  </ul>
                </div>
              </li>

              <li class="nav-item">
                <a
                  href="#sidebarLockScreen"
                  class="nav-link"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarLockScreen"
                  data-key="t-lock-screen"
                >
                  {{ $t("t-lock-screen") }}
                </a>
                <div
                  class="collapse menu-dropdown"
                  id="sidebarLockScreen"
                >
                  <ul class="nav nav-sm flex-column">
                    <li class="nav-item">
                      <router-link
                        to="/auth/lockscreen-basic"
                        class="nav-link"
                        data-key="t-basic"
                      >
                        {{ $t("t-basic") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        to="/auth/lockscreen-cover"
                        class="nav-link"
                        data-key="t-cover"
                      >
                        {{ $t("t-cover") }}
                      </router-link>
                    </li>
                  </ul>
                </div>
              </li>

              <li class="nav-item">
                <a
                  href="#sidebarLogout"
                  class="nav-link"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarLogout"
                  data-key="t-logout"
                >
                  {{ $t("t-logout") }}
                </a>
                <div
                  class="collapse menu-dropdown"
                  id="sidebarLogout"
                >
                  <ul class="nav nav-sm flex-column">
                    <li class="nav-item">
                      <router-link
                        to="/auth/logout-basic"
                        class="nav-link"
                        data-key="t-basic"
                      >
                        {{ $t("t-basic") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        to="/auth/logout-cover"
                        class="nav-link"
                        data-key="t-cover"
                      >
                        {{ $t("t-cover") }}
                      </router-link>
                    </li>
                  </ul>
                </div>
              </li>
              <li class="nav-item">
                <a
                  href="#sidebarSuccessMsg"
                  class="nav-link"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarSuccessMsg"
                  data-key="t-success-message"
                >
                  {{ $t("t-success-message") }}
                </a>
                <div
                  class="collapse menu-dropdown"
                  id="sidebarSuccessMsg"
                >
                  <ul class="nav nav-sm flex-column">
                    <li class="nav-item">
                      <router-link
                        to="/auth/success-msg-basic"
                        class="nav-link"
                        data-key="t-basic"
                      >
                        {{ $t("t-basic") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        to="/auth/success-msg-cover"
                        class="nav-link"
                        data-key="t-cover"
                      >
                        {{ $t("t-cover") }}
                      </router-link>
                    </li>
                  </ul>
                </div>
              </li>
              <li class="nav-item">
                <a
                  href="#sidebarTwoStep"
                  class="nav-link"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarTwoStep"
                  data-key="t-two-step-verification"
                >
                  {{ $t("t-two-step-verification") }}
                </a>
                <div
                  class="collapse menu-dropdown"
                  id="sidebarTwoStep"
                >
                  <ul class="nav nav-sm flex-column">
                    <li class="nav-item">
                      <router-link
                        to="/auth/twostep-basic"
                        class="nav-link"
                        data-key="t-basic"
                      >
                        {{ $t("t-basic") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        to="/auth/twostep-cover"
                        class="nav-link"
                        data-key="t-cover"
                      >
                        {{ $t("t-cover") }}
                      </router-link>
                    </li>
                  </ul>
                </div>
              </li>
              <li class="nav-item">
                <a
                  href="#sidebarErrors"
                  class="nav-link"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarErrors"
                  data-key="t-errors"
                >
                  {{ $t("t-errors") }}
                </a>
                <div
                  class="collapse menu-dropdown"
                  id="sidebarErrors"
                >
                  <ul class="nav nav-sm flex-column">
                    <li class="nav-item">
                      <router-link
                        to="/auth/404-basic"
                        class="nav-link"
                        data-key="t-404-basic"
                      >
                        {{ $t("t-404-basic") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        to="/auth/404-cover"
                        class="nav-link"
                        data-key="t-404-cover"
                      >
                        {{ $t("t-404-cover") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        to="/auth/404"
                        class="nav-link"
                        data-key="t-404-alt"
                      >
                        {{ $t("t-404-alt") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        to="/auth/500"
                        class="nav-link"
                        data-key="t-500"
                      >
                        {{ $t("t-500") }}
                      </router-link>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </li>

        <li class="nav-item">
          <a
            class="nav-link menu-link"
            href="#sidebarPages"
            data-bs-toggle="collapse"
            role="button"
            aria-expanded="false"
            aria-controls="sidebarPages"
          >
            <i class="ri-pages-line" />
            <span data-key="t-pages">{{ $t("t-pages") }}</span>
          </a>
          <div
            class="collapse menu-dropdown"
            id="sidebarPages"
          >
            <ul class="nav nav-sm flex-column">
              <li class="nav-item">
                <router-link
                  to="/pages/starter"
                  class="nav-link"
                  data-key="t-starter"
                >
                  {{ $t("t-starter") }}
                </router-link>
              </li>
              <li class="nav-item">
                <a
                  href="#sidebarProfile"
                  class="nav-link"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarProfile"
                  data-key="t-profile"
                >{{ $t("t-profile") }}
                </a>
                <div
                  class="collapse menu-dropdown"
                  id="sidebarProfile"
                >
                  <ul class="nav nav-sm flex-column">
                    <li class="nav-item">
                      <router-link
                        to="/pages/profile"
                        class="nav-link"
                        data-key="t-simple-page"
                      >
                        {{ $t("t-simple-page") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        to="/pages/profile-setting"
                        class="nav-link"
                        data-key="t-settings"
                      >
                        {{ $t("t-settings") }}
                      </router-link>
                    </li>
                  </ul>
                </div>
              </li>
              <li class="nav-item">
                <router-link
                  to="/pages/team"
                  class="nav-link"
                  data-key="t-team"
                >
                  {{ $t("t-team") }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="/pages/timeline"
                  class="nav-link"
                  data-key="t-timeline"
                >
                  {{ $t("t-timeline") }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="/pages/faqs"
                  class="nav-link"
                  data-key="t-faqs"
                >
                  {{ $t("t-faqs") }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="/pages/pricing"
                  class="nav-link"
                  data-key="t-pricing"
                >
                  {{ $t("t-pricing") }}
                </router-link>
              </li>

              <li class="nav-item">
                <router-link
                  to="/pages/maintenance"
                  class="nav-link"
                  data-key="t-maintenance"
                >
                  {{ $t("t-maintenance") }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="/pages/coming-soon"
                  class="nav-link"
                  data-key="t-coming-soon"
                >
                  {{ $t("t-coming-soon") }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="/pages/sitemap"
                  class="nav-link"
                  data-key="t-sitemap"
                >
                  {{ $t("t-sitemap") }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="/pages/search-results"
                  class="nav-link"
                  data-key="t-search-results"
                >
                  {{ $t("t-search-results") }}
                </router-link>
              </li>
            </ul>
          </div>
        </li>

        <li class="menu-title">
          <i class="ri-more-fill" />
          <span data-key="t-components">{{ $t("t-components") }}</span>
        </li>

        <li class="nav-item">
          <a
            class="nav-link menu-link"
            href="#sidebarUI"
            data-bs-toggle="collapse"
            role="button"
            aria-expanded="false"
            aria-controls="sidebarUI"
          >
            <i class="ri-pencil-ruler-2-line" />
            <span data-key="t-base-ui">{{ $t("t-base-ui") }}</span>
          </a>
          <div
            class="collapse menu-dropdown mega-dropdown-menu"
            id="sidebarUI"
          >
            <div class="row">
              <div class="col-lg-4">
                <ul class="nav nav-sm flex-column">
                  <li class="nav-item">
                    <router-link
                      to="/ui/alerts"
                      class="nav-link"
                      data-key="t-alerts"
                    >
                      {{ $t("t-alerts") }}
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link
                      to="/ui/badges"
                      class="nav-link"
                      data-key="t-badges"
                    >
                      {{ $t("t-badges") }}
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link
                      to="/ui/buttons"
                      class="nav-link"
                      data-key="t-buttons"
                    >
                      {{ $t("t-buttons") }}
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link
                      to="/ui/colors"
                      class="nav-link"
                      data-key="t-colors"
                    >
                      {{ $t("t-colors") }}
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link
                      to="/ui/cards"
                      class="nav-link"
                      data-key="t-cards"
                    >
                      {{ $t("t-cards") }}
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link
                      to="/ui/carousel"
                      class="nav-link"
                      data-key="t-carousel"
                    >
                      {{ $t("t-carousel") }}
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link
                      to="/ui/dropdowns"
                      class="nav-link"
                      data-key="t-dropdowns"
                    >
                      {{ $t("t-dropdowns") }}
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link
                      to="/ui/grid"
                      class="nav-link"
                      data-key="t-grid"
                    >
                      {{ $t("t-grid") }}
                    </router-link>
                  </li>
                </ul>
              </div>
              <div class="col-lg-4">
                <ul class="nav nav-sm flex-column">
                  <li class="nav-item">
                    <router-link
                      to="/ui/images"
                      class="nav-link"
                      data-key="t-images"
                    >
                      {{ $t("t-images") }}
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link
                      to="/ui/tabs"
                      class="nav-link"
                      data-key="t-tabs"
                    >
                      {{ $t("t-tabs") }}
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link
                      to="/ui/accordions"
                      class="nav-link"
                      data-key="t-accordion-collapse"
                    >
                      {{ $t("t-accordion-collapse") }}
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link
                      to="/ui/modals"
                      class="nav-link"
                      data-key="t-modals"
                    >
                      {{ $t("t-modals") }}
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link
                      to="/ui/offcanvas"
                      class="nav-link"
                      data-key="t-offcanvas"
                    >
                      {{ $t("t-offcanvas") }}
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link
                      to="/ui/placeholders"
                      class="nav-link"
                      data-key="t-placeholders"
                    >
                      {{ $t("t-placeholders") }}
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link
                      to="/ui/progress"
                      class="nav-link"
                      data-key="t-progress"
                    >
                      {{ $t("t-progress") }}
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link
                      to="/ui/notifications"
                      class="nav-link"
                      data-key="t-notifications"
                    >
                      {{ $t("t-notifications") }}
                    </router-link>
                  </li>
                </ul>
              </div>
              <div class="col-lg-4">
                <ul class="nav nav-sm flex-column">
                  <li class="nav-item">
                    <router-link
                      to="/ui/media"
                      class="nav-link"
                      data-key="t-media-object"
                    >
                      {{ $t("t-media-object") }}
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link
                      to="/ui/embed-video"
                      class="nav-link"
                      data-key="t-embed-video"
                    >
                      {{ $t("t-embed-video") }}
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link
                      to="/ui/typography"
                      class="nav-link"
                      data-key="t-typography"
                    >
                      {{ $t("t-typography") }}
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link
                      to="/ui/lists"
                      class="nav-link"
                      data-key="t-lists"
                    >
                      {{ $t("t-lists") }}
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link
                      to="/ui/general"
                      class="nav-link"
                      data-key="t-general"
                    >
                      {{ $t("t-general") }}
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link
                      to="/ui/ribbons"
                      class="nav-link"
                      data-key="t-ribbons"
                    >
                      {{ $t("t-ribbons") }}
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link
                      to="/ui/utilities"
                      class="nav-link"
                      data-key="t-utilities"
                    >
                      {{ $t("t-utilities") }}
                    </router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </li>

        <li class="nav-item">
          <a
            class="nav-link menu-link"
            href="#sidebarAdvanceUI"
            data-bs-toggle="collapse"
            role="button"
            aria-expanded="false"
            aria-controls="sidebarAdvanceUI"
          >
            <i class="ri-stack-line" />
            <span data-key="t-advance-ui">{{ $t("t-advance-ui") }}</span>
            <span
              class="badge badge-pill bg-success"
              data-key="t-new"
            >{{
              $t("t-new")
            }}</span>
          </a>
          <div
            class="collapse menu-dropdown"
            id="sidebarAdvanceUI"
          >
            <ul class="nav nav-sm flex-column">
              <li class="nav-item">
                <router-link
                  to="/advance-ui/sweetalerts"
                  class="nav-link"
                  data-key="t-sweet-alerts"
                >
                  {{ $t("t-sweet-alerts") }}
                </router-link>
              </li>

              <li class="nav-item">
                <router-link
                  to="/advance-ui/scrollbar"
                  class="nav-link"
                  data-key="t-scrollbar"
                >
                  {{ $t("t-scrollbar") }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="/advance-ui/animation"
                  class="nav-link"
                  data-key="t-animation"
                >
                  {{ $t("t-animation") }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="/advance-ui/swiper"
                  class="nav-link"
                  data-key="t-swiper-slider"
                >
                  {{ $t("t-swiper-slider") }}
                </router-link>
              </li>

              <li class="nav-item">
                <router-link
                  to="/advance-ui/highlight"
                  class="nav-link"
                  data-key="t-highlight"
                >
                  {{ $t("t-highlight") }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="/advance-ui/scrollspy"
                  class="nav-link"
                  data-key="t-scrollSpy"
                >
                  {{ $t("t-scrollSpy") }}
                </router-link>
              </li>
            </ul>
          </div>
        </li>

        <li class="nav-item">
          <router-link
            class="nav-link menu-link"
            to="/widgets"
          >
            <i class="ri-honour-line" />
            <span data-key="t-widgets">{{ $t("t-widgets") }}</span>
          </router-link>
        </li>

        <li class="nav-item">
          <a
            class="nav-link menu-link"
            href="#sidebarForms"
            data-bs-toggle="collapse"
            role="button"
            aria-expanded="false"
            aria-controls="sidebarForms"
          >
            <i class="ri-file-list-3-line" />
            <span data-key="t-forms">{{ $t("t-forms") }}</span>
          </a>
          <div
            class="collapse menu-dropdown"
            id="sidebarForms"
          >
            <ul class="nav nav-sm flex-column">
              <li class="nav-item">
                <router-link
                  to="/form/elements"
                  class="nav-link"
                  data-key="t-basic-elements"
                >
                  {{ $t("t-basic-elements") }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="/form/select"
                  class="nav-link"
                  data-key="t-form-select"
                >
                  {{ $t("t-form-select") }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="/form/checkboxs-radios"
                  class="nav-link"
                  data-key="t-checkboxs-radios"
                >
                  {{ $t("t-checkboxs-radios") }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="/form/pickers"
                  class="nav-link"
                  data-key="t-pickers"
                >
                  {{ $t("t-pickers") }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="/form/masks"
                  class="nav-link"
                  data-key="t-input-masks"
                >
                  {{ $t("t-input-masks") }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="/form/advanced"
                  class="nav-link"
                  data-key="t-advanced"
                >
                  {{ $t("t-advanced") }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="/form/range-sliders"
                  class="nav-link"
                  data-key="t-range-slider"
                >
                  {{ $t("t-range-slider") }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="/form/validation"
                  class="nav-link"
                  data-key="t-validation"
                >
                  {{ $t("t-validation") }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="/form/wizard"
                  class="nav-link"
                  data-key="t-wizard"
                >
                  {{ $t("t-wizard") }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="/form/editors"
                  class="nav-link"
                  data-key="t-editors"
                >
                  {{ $t("t-editors") }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="/form/file-uploads"
                  class="nav-link"
                  data-key="t-file-uploads"
                >
                  {{ $t("t-file-uploads") }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="/form/layouts"
                  class="nav-link"
                  data-key="t-form-layouts"
                >
                  {{ $t("t-form-layouts") }}
                </router-link>
              </li>
            </ul>
          </div>
        </li>

        <li class="nav-item">
          <a
            class="nav-link menu-link"
            href="#sidebarTables"
            data-bs-toggle="collapse"
            role="button"
            aria-expanded="false"
            aria-controls="sidebarTables"
          >
            <i class="ri-layout-grid-line" />
            <span data-key="t-tables">{{ $t("t-tables") }}</span>
          </a>
          <div
            class="collapse menu-dropdown"
            id="sidebarTables"
          >
            <ul class="nav nav-sm flex-column">
              <li class="nav-item">
                <router-link
                  to="/tables/basic"
                  class="nav-link"
                  data-key="t-basic-tables"
                >
                  {{ $t("t-basic-tables") }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="/tables/gridjs"
                  class="nav-link"
                  data-key="t-grid-js"
                >
                  {{ $t("t-grid-js") }}
                </router-link>
              </li>
            </ul>
          </div>
        </li>

        <li class="nav-item">
          <a
            class="nav-link menu-link"
            href="#sidebarCharts"
            data-bs-toggle="collapse"
            role="button"
            aria-expanded="false"
            aria-controls="sidebarCharts"
          >
            <i class="ri-pie-chart-line" />
            <span data-key="t-charts">{{ $t("t-charts") }}</span>
          </a>
          <div
            class="collapse menu-dropdown"
            id="sidebarCharts"
          >
            <ul class="nav nav-sm flex-column">
              <li class="nav-item">
                <a
                  href="#sidebarApexcharts"
                  class="nav-link"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarApexcharts"
                  data-key="t-apexcharts"
                >
                  {{ $t("t-apexcharts") }}
                </a>
                <div
                  class="collapse menu-dropdown"
                  id="sidebarApexcharts"
                >
                  <ul class="nav nav-sm flex-column">
                    <li class="nav-item">
                      <router-link
                        to="/charts/apex-line"
                        class="nav-link"
                        data-key="t-line"
                      >
                        {{ $t("t-line") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        to="/charts/apex-area"
                        class="nav-link"
                        data-key="t-area"
                      >
                        {{ $t("t-area") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        to="/charts/apex-column"
                        class="nav-link"
                        data-key="t-column"
                      >
                        {{ $t("t-column") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        to="/charts/apex-bar"
                        class="nav-link"
                        data-key="t-bar"
                      >
                        {{ $t("t-bar") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        to="/charts/apex-mixed"
                        class="nav-link"
                        data-key="t-mixed"
                      >
                        {{ $t("t-mixed") }}
                      </router-link>
                    </li>

                    <li class="nav-item">
                      <router-link
                        to="/charts/apex-candlestick"
                        class="nav-link"
                        data-key="t-candlstick"
                      >
                        {{ $t("t-candlstick") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        to="/charts/apex-boxplot"
                        class="nav-link"
                        data-key="t-boxplot"
                      >
                        {{ $t("t-boxplot") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        to="/charts/apex-bubble"
                        class="nav-link"
                        data-key="t-bubble"
                      >
                        {{ $t("t-bubble") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        to="/charts/apex-scatter"
                        class="nav-link"
                        data-key="t-scatter"
                      >
                        {{ $t("t-scatter") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        to="/charts/apex-heatmap"
                        class="nav-link"
                        data-key="t-heatmap"
                      >
                        {{ $t("t-heatmap") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        to="/charts/apex-treemap"
                        class="nav-link"
                        data-key="t-treemap"
                      >
                        {{ $t("t-treemap") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        to="/charts/apex-pie"
                        class="nav-link"
                        data-key="t-pie"
                      >
                        {{ $t("t-pie") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        to="/charts/apex-radialbar"
                        class="nav-link"
                        data-key="t-radialbar"
                      >
                        {{ $t("t-radialbar") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        to="/charts/apex-radar"
                        class="nav-link"
                        data-key="t-radar"
                      >
                        {{ $t("t-radar") }}
                      </router-link>
                    </li>
                    <li class="nav-item">
                      <router-link
                        to="/charts/apex-polararea"
                        class="nav-link"
                        data-key="t-polar-area"
                      >
                        {{ $t("t-polar-area") }}
                      </router-link>
                    </li>
                  </ul>
                </div>
              </li>
              <li class="nav-item">
                <router-link
                  to="/charts/chartjs"
                  class="nav-link"
                  data-key="t-chartjs"
                >
                  {{ $t("t-chartjs") }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="/charts/echart"
                  class="nav-link"
                  data-key="t-echarts"
                >
                  {{ $t("t-echarts") }}
                </router-link>
              </li>
            </ul>
          </div>
        </li>

        <li class="nav-item">
          <a
            class="nav-link menu-link"
            href="#sidebarIcons"
            data-bs-toggle="collapse"
            role="button"
            aria-expanded="false"
            aria-controls="sidebarIcons"
          >
            <i class="ri-compasses-2-line" />
            <span data-key="t-icons">{{ $t("t-icons") }}</span>
          </a>
          <div
            class="collapse menu-dropdown"
            id="sidebarIcons"
          >
            <ul class="nav nav-sm flex-column">
              <li class="nav-item">
                <router-link
                  to="/icons/remix"
                  class="nav-link"
                  data-key="t-remix"
                >
                  {{ $t("t-remix") }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="/icons/boxicons"
                  class="nav-link"
                  data-key="t-boxicons"
                >
                  {{ $t("t-boxicons") }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="/icons/materialdesign"
                  class="nav-link"
                  data-key="t-material-design"
                >
                  {{ $t("t-material-design") }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="/icons/lineawesome"
                  class="nav-link"
                  data-key="t-line-awesome"
                >
                  {{ $t("t-line-awesome") }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="/icons/feather"
                  class="nav-link"
                  data-key="t-feather"
                >
                  {{ $t("t-feather") }}
                </router-link>
              </li>
            </ul>
          </div>
        </li>

        <li class="nav-item">
          <a
            class="nav-link menu-link"
            href="#sidebarMaps"
            data-bs-toggle="collapse"
            role="button"
            aria-expanded="false"
            aria-controls="sidebarMaps"
          >
            <i class="ri-map-pin-line" />
            <span data-key="t-maps">{{ $t("t-maps") }}</span>
          </a>
          <div
            class="collapse menu-dropdown"
            id="sidebarMaps"
          >
            <ul class="nav nav-sm flex-column">
              <li class="nav-item">
                <router-link
                  to="/maps/google"
                  class="nav-link"
                  data-key="t-google"
                >
                  {{ $t("t-google") }}
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="/maps/leaflet"
                  class="nav-link"
                  data-key="t-leaflet"
                >
                  {{ $t("t-leaflet") }}
                </router-link>
              </li>
            </ul>
          </div>
        </li>

        <li class="nav-item">
          <a
            class="nav-link menu-link"
            href="#sidebarMultilevel"
            data-bs-toggle="collapse"
            role="button"
            aria-expanded="false"
            aria-controls="sidebarMultilevel"
          >
            <i class="ri-share-line" />
            <span data-key="t-multi-level">{{ $t("t-multi-level") }}</span>
          </a>
          <div
            class="collapse menu-dropdown"
            id="sidebarMultilevel"
          >
            <ul class="nav nav-sm flex-column">
              <li class="nav-item">
                <a
                  href="#"
                  class="nav-link"
                  data-key="t-level-1.1"
                >
                  {{ $t("t-level-1.1") }}
                </a>
              </li>
              <li class="nav-item">
                <a
                  href="#sidebarAccount"
                  class="nav-link"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarAccount"
                  data-key="t-level-1.2"
                >
                  {{ $t("t-level-1.2") }}
                </a>
                <div
                  class="collapse menu-dropdown"
                  id="sidebarAccount"
                >
                  <ul class="nav nav-sm flex-column">
                    <li class="nav-item">
                      <a
                        href="#"
                        class="nav-link"
                        data-key="t-level-2.1"
                      >
                        {{ $t("t-level-2.1") }}
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        href="#sidebarCrm"
                        class="nav-link"
                        data-bs-toggle="collapse"
                        role="button"
                        aria-expanded="false"
                        aria-controls="sidebarCrm"
                        data-key="t-level-2.2"
                      >
                        {{ $t("t-level-2.2") }}
                      </a>
                      <div
                        class="collapse menu-dropdown"
                        id="sidebarCrm"
                      >
                        <ul class="nav nav-sm flex-column">
                          <li class="nav-item">
                            <a
                              href="#"
                              class="nav-link"
                              data-key="t-level-3.1"
                            >
                              {{ $t("t-level-3.1") }}
                            </a>
                          </li>
                          <li class="nav-item">
                            <a
                              href="#"
                              class="nav-link"
                              data-key="t-level-3.2"
                            >
                              {{ $t("t-level-3.2") }}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </li>
      </SimpleBar>
    </template>

    <template v-else>
      <ul
        class="navbar-nav h-100"
        id="navbar-nav"
      >
        <div v-for="(item, index) in state.menu" :key="index">
          <div v-if="item.type == 'part'">
            <li class="menu-title">
              <span data-key="t-menu"> {{ $t(item.label) }}</span>
            </li>
          </div>
          <div v-else-if="item.children && item.children.length > 0">
            <li class="nav-item">
              <a
                class="nav-link menu-link"
                :href="'#' + item.label"
                data-bs-toggle="collapse"
                role="button"
                aria-expanded="false"
                :aria-controls="item.label"
              >
                <img
                  class="menu-iconpark"
                  :src="item.icon"
                  alt=""
                  srcset=""
                >
                <span data-key="t-dashboards"> {{ $t(item.label) }}</span>
              </a>
              <div
                class="collapse menu-dropdown"
                :id="item.label"
              >
                <ul class="nav nav-sm flex-column">
                  <div v-for="(data, index) in item.children" :key="index">
                    <div v-if="data.children && data.children.length > 0">
                      <li class="nav-item">
                        <a
                          :href="'#' + data.label"
                          class="nav-link"
                          data-bs-toggle="collapse"
                          role="button"
                          aria-expanded="false"
                          :aria-controls="data.label"
                          data-key="t-projects"
                        >
                          {{ $t(data.label) }}
                        </a>
                        <div
                          class="collapse menu-dropdown"
                          :id="data.label"
                        >
                          <ul class="nav nav-sm flex-column">
                            <div v-for="(node, index) in data.children" :key="index">
                              <li class="nav-item">
                                <router-link
                                  :to="node.to"
                                  class="nav-link custom-abc"
                                  data-key="t-analytics"
                                >
                                  {{ $t(node.label) }}
                                </router-link>
                              </li>
                            </div>
                          </ul>
                        </div>
                      </li>
                    </div>
                    <div v-else>
                      <li class="nav-item">
                        <router-link
                          :to="data.to"
                          class="nav-link custom-abc"
                          data-key="t-analytics"
                        >
                          {{ $t(data.label) }}
                        </router-link>
                      </li>
                    </div>
                  </div>
                </ul>
              </div>
            </li>
          </div>
          <div v-else>
            <li class="nav-item">
              <router-link
                class="nav-link menu-link"
                :to="item.to"
              >
                <img
                  class="menu-iconpark"
                  :src="item.icon"
                  alt=""
                  srcset=""
                >
                <span data-key="t-widgets">{{ $t(item.label) }}</span>
                <div
                  v-show="false"
                  class="collapse-btn"
                  @click="toggleHamburgerMenu"
                >
                  <button
                    type="button"
                    class="
                    btn btn-sm
                    px-3
                    fs-16
                    header-item
                    vertical-menu-btn
                    "
                    id="topnav-hamburger-icon"
                  >
                    <span class="hamburger-icon">
                      <span />
                      <span />
                      <span />
                    </span>
                  </button>
                </div>
              </router-link>
            </li>
          </div>
        </div>
      </ul>
    </template>
  </div>
  <!-- Sidebar -->
</template>
<script>
// import { layoutComputed } from "@/state/helpers";
import { SimpleBar } from 'simplebar-vue3'
import icon1 from '@/assets/svg/shouye-1.svg'
import icon2 from '@/assets/svg/yongyin-guanli-1.svg'
import icon3 from '@/assets/svg/yinzhang-guanli-1.svg'
import icon4 from '@/assets/svg/yinzhang-guanli-2.svg'
import icon5 from '@/assets/svg/dianzi-qianzhang.svg'
import icon6 from '@/assets/svg/shebei-guanli.svg'
import icon7 from '@/assets/svg/wenjianku-1.svg'
import icon8 from '@/assets/svg/wenjian-leixing-1.svg'
import icon9 from '@/assets/svg/liuchengshenpi-ssqr.svg'
import icon10 from '@/assets/svg/dai-shenpi-liucheng.svg'
import icon11 from '@/assets/svg/dai-chuli-renwu.svg'
import icon12 from '@/assets/svg/chaosong-geiwode-liucheng.svg'
import icon13 from '@/assets/svg/fengxian-tixing-jilu-1.svg'
import icon14 from '@/assets/svg/fengxian-tixing-jilu-2.svg'
import icon15 from '@/assets/svg/shuju-kanban-1.svg'
import icon16 from '@/assets/svg/yongyin-shuju-fenxi-1.svg'
import icon17 from '@/assets/svg/yinzhang-shuju-fenxi-1.svg'
import icon18 from '@/assets/svg/yujing-guanli.svg'
import icon19 from '@/assets/svg/qiye-xinxi.svg'
import icon20 from '@/assets/svg/wanglai-qiye.svg'
import icon21 from '@/assets/svg/bumen-yu-yuangong.svg'
import icon22 from '@/assets/svg/qxgl-icon.svg'
import icon23 from '@/assets/svg/quanju-canshu-peizhi.svg'
import icon24 from '@/assets/svg/gujian-shengji-rizhi.svg'
import icon25 from '@/assets/svg/zongduan-banben-guanli.svg'
import icon26 from '@/assets/svg/biaodan-guanli.svg'
import icon27 from '@/assets/svg/liucheng-guanli.svg'
import icon28 from '@/assets/svg/yewu-guizhe-peizhi.svg'
import icon29 from '@/assets/svg/xiaoxi-shijian.svg'
import icon34 from '@/assets/svg/xiaoxi-muban.svg'
import icon35 from '@/assets/svg/xiaoxi-qdpz.svg'
import icon36 from '@/assets/svg/xiaoxi-xxrz.svg'
import icon30 from '@/assets/svg/denglu-rizi.svg'
import icon31 from '@/assets/svg/xitong-caozuo-rizhi.svg'
import icon32 from '@/assets/svg/zongduan-caozuo-rizhi.svg'
import icon33 from '@/assets/svg/gujian-shengji-rizhi.svg'
import icon37 from '@/assets/svg/xitong-yunxing-rizhi.svg'
import { useLayoutStore } from '@/store/layout'
// import "../unit/SvgIconPack"
import {
  HomeIcon,
  GridIcon,
  UsersIcon,
  CommandIcon,
  PackageIcon,
  LayersIcon,
  CopyIcon,
  FileTextIcon,
  DatabaseIcon,
  PieChartIcon,
  ArchiveIcon,
  MapPinIcon,
  Share2Icon
} from '@zhuowenli/vue-feather-icons'
const layoutStore = useLayoutStore()

export default {
  components: {
    SimpleBar,
    HomeIcon,
    GridIcon,
    UsersIcon,
    CommandIcon,
    PackageIcon,
    LayersIcon,
    CopyIcon,
    FileTextIcon,
    DatabaseIcon,
    PieChartIcon,
    ArchiveIcon,
    MapPinIcon,
    Share2Icon
  },
  data () {
    return {
      settings: {
        minScrollbarLength: 60
      },
      state: {
        menu: [],
        business: [
          {
            name: '首页',
            label: 't-zgj-cg-menu-shouye',
            to: '/frontDesk/home',
            icon: icon1
          },
          {
            name: '印控管理',
            type: 'part',
            label: 't-zgj-cg-menu-yinkong-guanli'
          },
          {
            name: '用印管理',
            label: 't-zgj-cg-menu-yongyin-guanli',
            to: '/frontDesk/home',
            icon: icon2,
            children: [{
              name: '用印申请',
              to: '/frontDesk/PrintControlManagement/SealApplication',
              label: 't-zgj-cg-menu-yongyin-shenqing'
            }, {
              name: '用印申请',
              to: '/frontDesk/PrintControlManagement/Seal-application/Selection-form',
              label: 't-zgj-cg-menu-yongyin-shenqing'
            }, {
              name: '智能用印',
              to: '/frontDesk/PrintControlManagement/IntelligentPrinting',
              label: 't-zgj-cg-menu-zhineng-yongyin'
            }, {
              name: '文件归档',
              to: '/frontDesk/PrintControlManagement/Archive',
              label: 't-zgj-cg-menu-wenjian-guidang'
            }, {
              name: '用印记录',
              to: '/frontDesk/PrintControlManagement/recordWithSeal',
              label: 't-zgj-cg-menu-yongyin-jilu'
            }, {
              name: '用印轨迹',
              to: '/frontDesk/PrintControlManagement/Printed-track',
              label: 't-zgj-cg-menu-yongyin-guiji'
            }]
          },
          {
            name: '印章管理',
            label: 't-zgj-cg-menu-yinzhang-guanli',
            to: '/frontDesk/home',
            icon: icon3,
            children: [{
              name: '印章库',
              to: '/frontDesk/PrintControlManagement/LibraryOfSeals',
              label: 't-zgj-cg-menu-yinzhang-ku'
            }, {
              name: '印章申请',
              to: '/frontDesk/PrintControlManagement/ApplicationForSeal',
              label: 't-zgj-cg-menu-yinzhang-shenqing'
            }, {
              name: '印章类型',
              to: '/frontDesk/PrintControlManagement/TypeOfSeal',
              label: 't-zgj-cg-menu-yinzhang-leixing'
            }, {
              name: '印章外借信息',
              to: '/frontDesk/PrintControlManagement/SealloanInformation',
              label: 't-zgj-cg-menu-yinzhang-waijie-xinxi'
            }]
          },
          {
            name: '文件防篡改',
            label: 't-zgj-cg-menu-wenjian-fangchuangai',
            to: '/frontDesk/home',
            icon: icon4,
            children: [
              {
                name: '防伪水印验证',
                to: '/frontDesk/PrintControlManagement/SecurityWatermark',
                label: 't-zgj-cg-menu-fangwei-shuiyin-yanzheng'
              }, {
                name: '文件内容核验',
                label: 't-zgj-cg-menu-wenjian-neirong-heyan',
                to: '/frontDesk/home',
                children: [
                  {
                    name: '用印前核验',
                    to: '/frontDesk/PrintControlManagement/UsePrepressVerification',
                    label: 't-zgj-cg-menu-yongyin-qian-heyan'
                  },
                  {
                    name: '用印后核验',
                    to: '/frontDesk/PrintControlManagement/UsePostPressVerification',
                    label: 't-zgj-cg-menu-yongyin-hou-heyan'
                  }
                ]
              }
            ]
          },
          {
            name: '电子签章',
            label: 't-zgj-cg-menu-dianzi-qianzhang',
            to: '/frontDesk/home',
            icon: icon5,
            children: [{
              name: '电子签章申请',
              to: '/frontDesk/PrintControlManagement/electronic-seal-apply/Selection-form',
              label: 't-zgj-cg-menu-dianzi-qianzhang-shenqing'
            }, {
              name: '待电子签章',
              to: '/frontDesk/PrintControlManagement/ElectronicSignatureRequired',
              label: 't-zgj-cg-menu-dai-dianzi-qianzhang'
            }, {
              name: '电子签章记录',
              to: '/frontDesk/PrintControlManagement/electronicSignatureRecord',
              label: 't-zgj-cg-menu-dianzi-qianzhang-jilu'
            }, {
              name: '电子印章库',
              to: '/frontDesk/PrintControlManagement/ElectronicSealLibrary',
              label: 't-zgj-cg-menu-dianzi-yinzhang-ku'
            }, {
              name: '用户认证',
              to: '/frontDesk/home',
              label: 't-zgj-cg-menu-yonghu-renzheng'
            }]
          },
          {
            name: '设备管理',
            label: 't-zgj-cg-menu-shebei-guanli',
            to: '/frontDesk/home',
            icon: icon6,
            children: [
              {
                name: '工作台管理',
                label: 't-zgj-cg-menu-gongzuotai-guanli',
                to: '/frontDesk/PrintControlManagement/WorkbenchManagement'
              },
              {
                name: '智能印章盒管理',
                label: 't-zgj-cg-menu-zhineng-yinzhang-he-guanli',
                to: '/frontDesk/home',
                children: [{
                  name: '智能印章盒管理',
                  to: '/frontDesk/PrintControlManagement/IntelligentSealBoxManagement',
                  label: 't-zgj-cg-menu-zhineng-yinzhang-he-guanli'
                }, {
                  name: '智能印章盒格口管理',
                  to: '/frontDesk/PrintControlManagement/Grid-management/SealBoxGrid',
                  label: 't-zgj-cg-menu-zhineng-yinzhang-he-gekou-guanli'
                }]
              },
              {
                name: '智能印章柜管理',
                to: '/frontDesk/home',
                label: 't-zgj-cg-menu-zhineng-yinzhang-gui-guanli',
                children: [{
                  name: '智能印章柜管理',
                  to: '/frontDesk/PrintControlManagement/IntelligentSealCabinetManagement',
                  label: 't-zgj-cg-menu-zhineng-yinzhang-gui-guanli'
                }, {
                  name: '智能印章柜格口管理',
                  to: '/frontDesk/PrintControlManagement/Grid-management/CabinetGrid',
                  label: 't-zgj-cg-menu-zhineng-yinzhang-gui-gekou-guanli'
                }]
              }
            ]
          },

          {
            name: '文件管理',
            type: 'part',
            label: 't-zgj-cg-menu-wenjian-guanli'
          },
          {
            name: '文件库',
            label: 't-zgj-cg-menu-wenjian-ku',
            to: '/frontDesk/fileManagement/documentLibrary',
            icon: icon7
          },
          {
            name: '文件类型',
            label: 't-zgj-cg-menu-wenjian-leixing',
            to: '/frontDesk/fileManagement/documentType',
            icon: icon8
          },

          {
            name: '流程审批',
            label: 't-zgj-cg-menu-liucheng-shenpi',
            type: 'part'
          },

          {
            name: '实时确认',
            label: 't-zgj-cg-menu-shishi-queren',
            to: '/frontDesk/approvalFlow/RealTimeConfirmation',
            icon: icon9
          },
          {
            name: '审批流程',
            label: 't-zgj-cg-menu-shenpi-liucheng',
            to: '/frontDesk/approvalFlow/approvalFlow',
            icon: icon10
          },
          {
            name: '处理任务',
            label: 't-zgj-cg-menu-chuli-renwu',
            to: '/frontDesk/approvalFlow/handleTask',
            icon: icon11
          },
          {
            name: '抄送给我',
            label: 't-zgj-cg-menu-caoshong-geiwo',
            to: '/frontDesk/approvalFlow/carbonCopyToMe',
            icon: icon12
          },
          {
            name: '风控预警',
            label: 't-zgj-cg-menu-fengkong-yujing',
            type: 'part'
          },
          {
            name: '风控提醒设置',
            label: 't-zgj-cg-menu-fengkong-tixing-shezhi',
            to: '/frontDesk/riskControlWarning/RiskAlertSetting',
            icon: icon14
          },
          {
            name: '风险提醒记录',
            label: 't-zgj-cg-menu-fengxian-tixing-jilu',
            to: '/frontDesk/home',
            icon: icon13,
            children: [
              {
                name: '用印告警提醒',
                to: '/frontDesk/riskControlWarning/UseAPrintedAlarmReminder',
                label: 't-zgj-cg-menu-yongyin-gaojing-tixing'
              },
              {
                name: '领用印章告警提醒',
                to: '/frontDesk/riskControlWarning/ReceiveSealAlarmReminder',
                label: 't-zgj-cg-menu-lingyong-yinzhang-gaojing-tixing'
              },
              {
                name: '流程规范告警提醒',
                to: '/frontDesk/riskControlWarning/ProcessSpecificationAlarmNotification',
                label: 't-zgj-cg-menu-liucheng-guifan-gaojing-tixing'
              }
            ]
          }
          // {
          //   name: "数据报表",
          //   label: "t-zgj-cg-menu-shuju-baobiao",
          //   type: "part",
          // },
          // {
          //   name: "数据看板",
          //   label: "t-zgj-cg-menu-shuju-kanban",
          //   to: "/frontDesk/home",
          //   icon: icon15,
          // },
          // {
          //   name: "用印数据分析",
          //   label: "t-zgj-cg-menu-yongyin-shuju-fenxi",
          //   to: "/frontDesk/home",
          //   icon: icon16,
          // },
          // {
          //   name: "印章数据分析",
          //   label: "t-zgj-cg-menu-yinzhang-shuju-fenxi",
          //   to: "/frontDesk/home",
          //   icon: icon17,
          // },
          // {
          //   name: "预警数据分析",
          //   label: "t-zgj-cg-menu-yujing-shuju-fenxi",
          //   to: "/frontDesk/home",
          //   icon: icon18,
          // },
        ],
        system: [
          {
            name: '企业管理',
            type: 'part',
            label: 't-zgj-cg-menu-qiye-guanli'
          },
          {
            name: '企业信息',
            label: 't-zgj-cg-menu-qiye-xinxi',
            to: '/system/company/info',
            icon: icon19
          },
          {
            name: '往来企业',
            label: 't-zgj-cg-menu-wanglai-qiye',
            to: '/system/company/company_dealing',
            icon: icon20
          },
          {
            name: '部门与员工',
            label: 't-zgj-cg-menu-bumen-yu-yuangong',
            to: '/system/company/department_staff/',
            icon: icon21,
            children: [
              {
                name: '单位与部门管理',
                to: '/system/company/department_staff/department',
                label: 't-zgj-cg-menu-danwei-yu-bumen-guanli'
              },
              {
                name: '员工管理',
                to: '/system/company/department_staff/staff',
                label: 't-zgj-cg-menu-yuangong-guanli'
              },
              {
                name: '邀请审核',
                to: '/system/company/department_staff/audit',
                label: 't-zgj-cg-menu-yaoqing-shenhe'
              }
            ]
          },
          {
            name: '权限管理',
            label: 't-zgj-cg-menu-quanxian-guanli',
            to: '/system/company',
            icon: icon22,
            children: [
              {
                name: '角色权限配置',
                to: '/system/company/permission/role',
                label: 't-zgj-cg-menu-jueshe-quanxian-peizhi'
              },
              {
                name: '基础权限配置',
                to: '/system/company/permission/rule',
                label: 't-zgj-cg-menu-jichu-quanxian-peizhi'
              }
            ]
          },
          {
            name: '基础设置',
            type: 'part',
            label: 't-zgj-cg-menu-jichu-shezhi'
          },
          {
            name: '全局参数设置',
            label: 't-zgj-cg-menu-quanju-canshu-shezhi',
            to: '/system/base_setting/global_parameter',
            icon: icon23
          },
          {
            name: '固件版本管理',
            label: 't-zgj-cg-menu-gujian-banben-guanli',
            to: '/system/base_setting/firmware_version',
            icon: icon24
          },
          {
            name: '终端版本管理',
            label: 't-zgj-cg-menu-zongduan-banben-guanli',
            to: '/system/base_setting/terminal_version',
            icon: icon25
          },
          {
            name: '业务管理',
            type: 'part',
            label: 't-zgj-cg-menu-yewu-guanli'
          },
          {
            name: '表单管理',
            label: 't-zgj-cg-menu-biaodan-guanli',
            to: '/system/business_manage/form_manage',
            icon: icon26
          },
          {
            name: '流程管理',
            label: 't-zgj-cg-menu-liucheng-guanli',
            to: '/system/business_manage/flow_manage',
            icon: icon27
          },
          {
            name: '业务规则配置',
            label: 't-zgj-cg-menu-yewu-guizhe-peizhi',
            to: '/system/business_manage/business_rule',
            icon: icon28
          },
          {
            name: '消息中心',
            type: 'part',
            label: 't-zgj-cg-menu-xiaoxi-zhongxin'
          },
          {
            name: '消息事件',
            label: 't-zgj-cg-menu-xiaoxi-shijan',
            to: '/system/message_center/event',
            icon: icon29
          },
          {
            name: '消息模板',
            label: 't-zgj-cg-menu-xiaoxi-muban',
            to: '/system/message_center/template',
            icon: icon34
          },
          {
            name: '渠道配置',
            label: 't-zgj-cg-menu-qudao-peizhi',
            to: '/system/message_center/channel',
            icon: icon35
          },
          {
            name: '消息日志',
            label: 't-zgj-cg-menu-xiaoxi-rizhi',
            to: '/system/message_center/log',
            icon: icon36
          },
          {
            name: '日志管理',
            type: 'part',
            label: 't-zgj-cg-menu-rizhi-guanli'
          },
          {
            name: '登录日志',
            label: 't-zgj-cg-menu-denglu-rizhi',
            to: '/system/log_mamage/login',
            icon: icon30
          },
          {
            name: '系统操作日志',
            label: 't-zgj-cg-menu-xitong-caozuo-rizhi',
            to: '/system/log_mamage/system_operation',
            icon: icon31
          },
          {
            name: '系统运行日志',
            label: 't-zgj-cg-menu-xitong-yunxing-rizhi',
            to: '/system/log_mamage/system_running',
            icon: icon37
          },
          {
            name: '终端操作日志',
            label: 't-zgj-cg-menu-zongduan-caozuorizhi',
            to: '/system/log_mamage/terminal_operation',
            icon: icon32
          },
          {
            name: '固件升级日志',
            label: 't-zgj-cg-menu-gujian-shengji-rizhi',
            to: '/system/log_mamage/firmware_upgrade',
            icon: icon33
          }
        ],
        CurrentSystemType: 'business' // business / system
      }
    }
  },

  created () {
    const CurrentSystemType = sessionStorage.getItem('CurrentSystemType')
    if (CurrentSystemType) {
      this.state.CurrentSystemType = CurrentSystemType
    }
    if (CurrentSystemType === 'business') {
      this.state.menu = this.state.business
    } else if (CurrentSystemType === 'system') {
      this.state.menu = this.state.system
    }
  },
  computed: {
    // ...layoutComputed,
    layoutType: {
      get () {
        // return this.$store ? this.$store.state.layout.layoutType : {} || {};
        return layoutStore.layoutType
      }
    }
  },

  watch: {
    $route: {
      handler: 'onRoutechange',
      immediate: true,
      deep: true
    }
  },

  mounted () {

  },

  methods: {
    onRoutechange (ele) {
      this.initActiveMenu(ele.path)
      if (document.getElementsByClassName('mm-active').length > 0) {
        const currentPosition =
          document.getElementsByClassName('mm-active')[0].offsetTop
        if (currentPosition > 500) {
          if (this.$refs.isSimplebar) {
            this.$refs.isSimplebar.value.getScrollElement().scrollTop =
              currentPosition + 300
          }
        }
      }
    },

    initActiveMenu (ele) {
      setTimeout(() => {
        if (document.querySelector('#navbar-nav')) {
          const a = document
            .querySelector('#navbar-nav')
            .querySelector('[href="' + ele + '"]')
          if (a) {
            a.classList.add('active')
            const parentCollapseDiv = a.closest('.collapse.menu-dropdown')
            if (parentCollapseDiv) {
              parentCollapseDiv.classList.add('show')
              parentCollapseDiv.parentElement.children[0].classList.add(
                'active'
              )
              parentCollapseDiv.parentElement.children[0].setAttribute(
                'aria-expanded',
                'true'
              )
              if (
                parentCollapseDiv.parentElement.closest(
                  '.collapse.menu-dropdown'
                )
              ) {
                parentCollapseDiv.parentElement
                  .closest('.collapse')
                  .classList.add('show')
                if (
                  parentCollapseDiv.parentElement.closest('.collapse')
                    .previousElementSibling
                ) {
                  parentCollapseDiv.parentElement
                    .closest('.collapse')
                    .previousElementSibling.classList.add('active')
                }
                const grandparent = parentCollapseDiv.parentElement
                  .closest('.collapse')
                  .previousElementSibling.parentElement.closest('.collapse')
                if (grandparent && grandparent.previousElementSibling) {
                  grandparent.previousElementSibling.classList.add('active')
                  grandparent.classList.add('show')
                }
              }
            }
          }
        }
      }, 0)
    },

    // 监听 菜单开关
    toggleHamburgerMenu () {
      const windowSize = document.documentElement.clientWidth

      if (windowSize > 767) { document.querySelector('.hamburger-icon').classList.toggle('open') }

      // For collapse horizontal menu
      if (
        document.documentElement.getAttribute('data-layout') === 'horizontal'
      ) {
        document.body.classList.contains('menu')
          ? document.body.classList.remove('menu')
          : document.body.classList.add('menu')
      }

      // For collapse vertical menu
      if (document.documentElement.getAttribute('data-layout') === 'vertical') {
        if (windowSize < 1025 && windowSize > 767) {
          document.body.classList.remove('vertical-sidebar-enable')
          document.documentElement.getAttribute('data-sidebar-size') == 'sm'
            ? document.documentElement.setAttribute('data-sidebar-size', '')
            : document.documentElement.setAttribute('data-sidebar-size', 'sm')
        } else if (windowSize > 1025) {
          document.body.classList.remove('vertical-sidebar-enable')
          document.documentElement.getAttribute('data-sidebar-size') == 'lg'
            ? document.documentElement.setAttribute('data-sidebar-size', 'sm')
            : document.documentElement.setAttribute('data-sidebar-size', 'lg')
        } else if (windowSize <= 767) {
          document.body.classList.add('vertical-sidebar-enable')
          document.documentElement.setAttribute('data-sidebar-size', 'lg')
        }
      }

      // Two column menu
      if (document.documentElement.getAttribute('data-layout') == 'twocolumn') {
        document.body.classList.contains('twocolumn-panel')
          ? document.body.classList.remove('twocolumn-panel')
          : document.body.classList.add('twocolumn-panel')
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.components-menu {
  .menu-iconpark {
    @include mixin-width(26);
    margin-right: 10px;
  }
}

.navbar-menu .navbar-nav .nav-sm .nav-link:before {
  content: '';
  width: 6px;
  height: 1.5px;
  background-color: var(--vz-vertical-menu-sub-item-color);
  position: absolute;
  left: 2px;
  top: 16.5px;
  transition: all .4s ease-in-out;
  opacity: 0.5;
}
.collapse-btn {
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
}
</style>