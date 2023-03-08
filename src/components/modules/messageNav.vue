<template>
  <div class="message-container">
    <el-popover
      placement="bottom"
      :width="442"
      trigger="click"
      :show-arrow="false"
      @before-enter="showPop"
      @after-leave="hidePop"
    >
      <template #reference>
        <el-badge is-dot class="badge-item" :hidden="hiddenBadge">
          <el-button
            class="btn-drown"
            text
            @click="showNotifyPop = !showNotifyPop"
            style="width: 28px; height: 28px"
          >
            <img
              v-show="!showNotifyPop"
              src="../../assets/images/navbar/notify_icon.svg"
            />
            <img
              v-show="showNotifyPop"
              src="../../assets/images/navbar/notify_select_icon.svg"
            />
            <span
              class="position-absolute translate-middle p-1 bg-danger border border-light rounded-circle"
            ></span>
          </el-button>
        </el-badge>
      </template>

      <!-- tabs -->
      <div class="nav-natify-tab">
        <VTabs
          :active="active"
          :label="tabsLabel"
          @update:active="active = $event"
          style="padding-left: 24px"
          :hiddenBadge="false"
        ></VTabs>

        <div class="natify-content">
          <div v-if="active === tabsLabel[0].value" class="column">
            <!-- content -->
            <div
              class="item"
              :class="item.isRead ? '' : 'diot'"
              v-for="(item, index) in listMsg"
              :key="index"
            >
              <div class="item-msg">{{ item.content }}</div>
              <div class="item-time">{{ item.date }}</div>
            </div>
          </div>
          <div v-if="active === tabsLabel[1].value" class="column">
            <!-- content -->
            <div
              class="item"
              :class="item.isRead ? '' : 'diot'"
              v-for="(item, index) in listNoticeMsg"
              :key="index"
            >
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
    </el-popover>
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue'
  import useClickQutside from '@/utils/useClickQutside.js'
  import VTabs from './tabs.vue'
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
      content:
        '消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容',
      date: '2022-09-11 10:21:55',
      isRead: false
    },
    {
      content:
        '消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容',
      date: '2022-09-11 10:21:55',
      isRead: true
    },
    {
      content:
        '消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容',
      date: '2022-09-11 10:21:55',
      isRead: false
    },
    {
      content:
        '消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容',
      date: '2022-09-11 10:21:55',
      isRead: false
    }
  ])

  const listNoticeMsg = ref([
    {
      content:
        '消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容',
      date: '2022-09-11 10:21:55',
      isRead: true
    },
    {
      content:
        '消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容',
      date: '2022-09-11 10:21:55',
      isRead: true
    },
    {
      content:
        '消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容',
      date: '2022-09-11 10:21:55',
      isRead: false
    }
  ])

  const showPop = () => {
    showNotifyPop.value = true
  }
  const hidePop = () => {
    showNotifyPop.value = false
  }

  const hiddenBadge = ref(false)
</script>

<style lang="scss" scoped>
  .message-container {
    margin: 0 10px;

    .badge-item {
      :deep(.is-dot) {
        margin-right: 6px;
        margin-top: 4px;
      }
    }
  }
  .nav-natify-tab {
    padding-top: 10px;

    .natify-content {
      height: 294px;

      .column {
        padding: 5px 0px 5px 22px;
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
          content: '';
          position: absolute;
          width: 8px;
          height: 8px;
          left: -16px;
          top: 14px;
          border-radius: 50%;
          background: #d04d3e;
        }
      }
    }

    .natify-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 12px;
      height: 40px;
      color: rgba($color: #000000, $alpha: 0.45);
      border-top: 1px solid rgba($color: #000000, $alpha: 0.06);

      div {
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 24px;
        cursor: pointer;
        margin-top: 12px;
        &:hover {
          color: #3e78d0;
        }
      }
    }
  }
</style>
