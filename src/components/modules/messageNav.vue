<template>
  <!-- 消息 -->
  <div class="dropdown topbar-head-dropdown ms-1 header-item" ref="dropdownNotifyRef">
    <button type="button" class="btn btn-icon btn-topbar btn-ghost-secondary" id="page-header-cart-dropdown"
      data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-haspopup="true" aria-expanded="false"
      @click="showNotifyPop = !showNotifyPop" style="transform: rotateY(180deg);">
      <img v-show="!showNotifyPop" src="../../assets/images/navbar/notify_icon.svg" />
      <img v-show="showNotifyPop" src="../../assets/images/navbar/notify_select_icon.svg" />
      <span class="position-absolute translate-middle p-1 bg-danger border border-light rounded-circle"></span>
    </button>
    <div class="dropdown-menu dropdown-menu-xl dropdown-menu-end p-0 dropdown-menu-cart"
      aria-labelledby="page-header-cart-dropdown">
  
      <!-- tabs -->
      <div class="nav-natify-tab">
        <VTabs :active="active" :label="tabsLabel" @update:active="active = $event"></VTabs>
  
        <div class="natify-content">
          <div v-if="active === tabsLabel[ 0 ].value" class="column">
            <!-- content -->
            <div class="item" :class="item.isRead ? '' : 'diot'" v-for="( item, index ) in listMsg" :key="index">
              <div class="item-msg">{{ item.content }}</div>
              <div class="item-time">{{ item.date }}</div>
            </div>
  
          </div>
          <div v-if="active === tabsLabel[ 1 ].value" class="column">
  
            <!-- content -->
            <div class="item" :class="item.isRead ? '' : 'diot'" v-for="( item, index ) in listNoticeMsg" :key="index">
              <div class="item-msg">{{ item.content }}</div>
              <div class="item-time">{{ item.date }}</div>
            </div>
          </div>
        </div>
  
        <div class="natify-footer">
          <div>{{ $t('t-zgj-index.tab.Markread') }}</div>
          <div>{{ $t('t-view-all-notify') }}</div>
        </div>
      </div>
  
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import useClickQutside from "../../hooks/useClickQutside.js"
import VTabs from "./tabs.vue"
const dropdownNotifyRef = ref(null)
const showNotifyPop = ref(false)
const isClickOutsideNotify = useClickQutside(dropdownNotifyRef)
watch(isClickOutsideNotify, () => {
  // 消息弹框
  if (isClickOutsideNotify.value && showNotifyPop.value) {
    showNotifyPop.value = false
  }
})

// 消息 tabs
const active = ref('first')
const tabsLabel = ref([
  {
    name: 't-zgj-F_WARNING',
    value: 'first'
  },
  {
    name: 't-zgj-F_NOTICE',
    value: 'second'
  }
])

// 预警消息列表
const listMsg = ref([
  {
    content: '消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容',
    date: '2022-09-11 10:21:55',
    isRead: false
  },
  {
    content: '消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容',
    date: '2022-09-11 10:21:55',
    isRead: true
  },
  {
    content: '消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容',
    date: '2022-09-11 10:21:55',
    isRead: false
  },
  {
    content: '消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容',
    date: '2022-09-11 10:21:55',
    isRead: false
  }
])

const listNoticeMsg = ref([
  {
    content: '消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容',
    date: '2022-09-11 10:21:55',
    isRead: true
  },
  {
    content: '消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容',
    date: '2022-09-11 10:21:55',
    isRead: true
  },
  {
    content: '消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容',
    date: '2022-09-11 10:21:55',
    isRead: false
  }
])
</script>

<style lang="scss">
.nav-natify-tab {
  padding-top: 26px;

  .natify-content {
    height: 294px;

    .column {
      padding: 5px 4px 5px 32px;
      height: 64px;

      .item {
        position: relative;
        padding: 10px 0;

        .item-msg {
          font-family: 'PingFang SC';
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 22px;
          color: #303133;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        .item-time {
          font-family: 'PingFang SC';
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 20px;
          color: #909399;
        }
      }

      .diot::before {
        content: "";
        position: absolute;
        width: 8px;
        height: 8px;
        left: -16px;
        top: 14px;
        border-radius: 50%;
        background: #D04D3E;
      }
    }
  }

  .natify-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    height: 50px;
    color: rgba($color: #000000, $alpha: 0.45);
    border-top: 1px solid rgba($color: #000000, $alpha: 0.06);

    div {
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 24px;
      cursor: pointer;
    }
  }
}
</style>