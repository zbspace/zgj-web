<template>
  <!-- 信息 -->
  <div class="dropdown topbar-head-dropdown ms-1 header-item" ref="dropdownMailRef">
    <button type="button" class="btn btn-icon btn-topbar btn-ghost-secondary" id="page-header-cart-dropdown"
      data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-haspopup="true" aria-expanded="false"
      @click="showMailPop = !showMailPop">
      <img v-show="!showMailPop" src="../../assets/images/navbar/mail_icon.svg" />
      <img v-show="showMailPop" src="../../assets/images/navbar/mail_select_icon.svg" />
      <span
        class="position-absolute topbar-badge cartitem-badge fs-10 translate-middle badge rounded-pill bg-danger">5</span>
    </button>
    <div class="dropdown-menu dropdown-menu-xl dropdown-menu-end p-0 dropdown-menu-cart"
      aria-labelledby="page-header-cart-dropdown" style="width: 560px;" id="close-pop">
  
      <div class="nav-msg">
        <div class="msg-title">
          <div>{{ $t('t-zgj-message.Title') }}</div>
          <div @click="closeMailPop">
            <img src="../../assets/images/navbar/Closeclose.svg" />
          </div>
        </div>
  
        <div class="msg-content" :style="{ 'max-height': maxHeight + 'px' }">
          <!-- 待我确认 -->
          <div>
            <div class="content-title">
              <div class="title">{{ $t('t-to-be-confirm') }}</div>
              <div class="view-more">{{ $t('t-view-more') }}<img src="../../assets/images/navbar/nav_msg_more.svg" /></div>
            </div>
  
            <div class="content-list user-select">
              <div class="column" v-for="(  item, index  ) in toBeConfirmedList" :key="index">
                <div class="msg">{{ item.content }}</div>
                <div class="tag">
                  <el-tag type="warning" size="small">{{ item.label }}</el-tag>
                  <el-tag type="info" size="small" class="t">{{ item.depart }}</el-tag>
                  <el-tag type="info" size="small">{{ item.person }}</el-tag>
                </div>
                <div class="date">
                  <div class="left">{{ item.dateTime }}</div>
                  <div class="custom-button user-select">{{ $t('t-zgj-confirm') }}</div>
                </div>
              </div>
            </div>
          </div>
  
          <!-- 待我审批 -->
          <div>
            <div class="content-title">
              <div class="title">{{ $t('t-to-be-approval') }}</div>
              <div class="view-more">{{ $t('t-view-more') }}<img src="../../assets/images/navbar/nav_msg_more.svg" /></div>
            </div>
  
            <div class="content-list user-select">
              <div class="column" v-for="(  item, index  ) in toBeConfirmedList" :key="index">
                <div class="msg">{{ item.content }}</div>
                <div class="tag">
                  <el-tag size="small">{{ item.label }}</el-tag>
                  <el-tag type="info" size="small" class="t">{{ item.depart }}</el-tag>
                  <el-tag type="info" size="small">{{ item.person }}</el-tag>
                </div>
                <div class="date">
                  <div class="left">{{ item.dateTime }}</div>
                  <div class="custom-button user-select">{{ $t('t-zgj-Approval') }}</div>
                </div>
              </div>
            </div>
          </div>
  
          <!-- 待我处理 -->
          <div>
            <div class="content-title">
              <div class="title">{{ $t('t-to-be-handle') }}</div>
              <div class="view-more">{{ $t('t-view-more') }}<img src="../../assets/images/navbar/nav_msg_more.svg" /></div>
            </div>
  
            <div class="content-list user-select">
              <div class="column" v-for="(  item, index  ) in toBeConfirmedList" :key="index">
                <div class="msg">{{ item.content }}</div>
                <div class="tag">
                  <el-tag type="warning" size="small">{{ item.label }}</el-tag>
                  <el-tag type="info" size="small" class="t">{{ item.depart }}</el-tag>
                  <el-tag type="info" size="small">{{ item.person }}</el-tag>
                </div>
                <div class="date">
                  <div class="left">{{ item.dateTime }}</div>
                  <div class="custom-button user-select">{{ $t('t-zgj-Handle') }}</div>
                </div>
              </div>
            </div>
          </div>
  
        </div>
  
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import useClickQutside from "../../hooks/useClickQutside.js"

const dropdownMailRef = ref(null)
const showMailPop = ref(false)
const isClickOutsideMail = useClickQutside(dropdownMailRef)
watch(isClickOutsideMail, () => {
  // 邮件弹框
  if (isClickOutsideMail.value && showMailPop.value) {
    showMailPop.value = false
  }
})

const closeMailPop = () => {
  showMailPop.value = false
  document.getElementById('close-pop').classList.remove("show");
}

let maxHeight = ref(null)
onMounted(() => {

  maxHeight.value = window.innerHeight - 150
  window.addEventListener("resize", function () {
    maxHeight.value = window.innerHeight - 150
  })
})

// 消息列表 - 待我确认
const toBeConfirmedList = ref([
  {
    content: '消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内内容消息内内容消息内',
    label: '远程盖章',
    depart: '产品部',
    person: '马丽丽',
    dateTime: '2022-09-21 10:01:00'
  },
  {
    content: '消息内容消息内容消息内容消息息内内容消息内内容消息内',
    label: '实时视频盖章',
    depart: '产品部',
    person: '马丽丽',
    dateTime: '2022-09-21 10:01:00'
  },
  {
    content: '消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内内容消息内内容消息内',
    label: '远程盖章',
    depart: '产品部',
    person: '马丽丽',
    dateTime: '2022-09-21 10:01:00'
  },
  {
    content: '消息内容消息内容消息内容消息息内内容消息内内容消息内',
    label: '实时视频盖章',
    depart: '产品部',
    person: '马丽丽',
    dateTime: '2022-09-21 10:01:00'
  }
])
</script>

<style lang="scss">
.nav-msg {

  .msg-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    height: 55px;
    padding: 0 24px;
    border-bottom: 1px solid rgba($color: #000000, $alpha: 0.06);
  }

  .msg-content {
    padding: 10px 24px 30px 24px;
    overflow-y: scroll;

    .content-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 44px;
      padding-left: 10px;

      .title {
        position: relative;
        color: rgba(0, 0, 0, 0.85);
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
      }

      .title::before {
        content: "";
        position: absolute;
        top: 2px;
        left: -10px;
        height: 16px;
        width: 2px;
        background: #D0963E;
      }

      .view-more {
        color: rgba(0, 0, 0, 0.45);
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        cursor: pointer;
      }
    }

    .content-list {
      max-height: 240px;
      overflow: hidden;

      .msg {
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 30px;
        color: rgba(0, 0, 0, 0.85);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .tag {
        .t {
          margin: 0 6px;
        }
      }

      .date {
        display: flex;
        justify-content: space-between;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 20px;
        color: #909399;

        .left {
          line-height: 29px;
        }
      }

    }
  }
}
.custom-button {
  padding: 0 16px;
  height: 26px;
  background: #FFFFFF;
  mix-blend-mode: normal;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  color: #3E78D0;
  font-size: 12px;
  line-height: 24px;

  &:hover {
    border: 1px solid #3E78D0;
  }
}
</style>