<template>
  <FlowDrawerContent name="审批限时处理">
    <div class="flow-drawer-option">
      <div class="flow-drawer-option-item">
        <div class="flow-drawer-option-item-left">
          <img :src="optionIcon" />
          <div class="flow-drawer-option-desc">
            <p class="drawer-option-title">限时审批</p>
            <p class="drawer-option-desc"
              >限时审批支持自动提醒、转交等，为每条审批流设一个智能闹钟</p
            >
          </div>
        </div>
        <div class="flow-drawer-option-item-switch">
          <!-- <a-switch v-model:checked="props.node.timeLimit.enable" checked-children="开" un-checked-children="关" />  -->
          <a-switch checked-children="开" un-checked-children="关" />
        </div>
      </div>
    </div>
    <div class="action-type-container">
      <div class="approval-limit-guide-1">
        <div class="action-type">
          <div class="action-type-icon">
            <img
              src="https://img.alicdn.com/imgextra/i1/O1CN01Ox7p6Q1vkEGCmGH53_!!6000000006210-2-tps-164-44.png"
              alt=""
            />
          </div>
          <div class="action-type-content">
            <div class="action-type-content-title">
              流程到达当前审批人处<span
                >&nbsp;超过&nbsp;<span class="action-type-content-hightlight"
                  >10分钟</span
                >&nbsp;</span
              >未处理时自动提醒
            </div>
            <div>被提醒人：当前审批人，审批发起人</div>
            <div>提醒方式：Ding消息</div>
          </div>
          <div class="action-type-operate">
            <div class="action-type-operate-flex approval-limit-guide-3">
              <div class="action-type-edit"></div>
              <div class="action-type-delete"></div>
            </div>
          </div>
        </div>
        <div class="action-type">
          <div class="action-type-icon">
            <img
              src="https://img.alicdn.com/imgextra/i1/O1CN01Ox7p6Q1vkEGCmGH53_!!6000000006210-2-tps-164-44.png"
              alt=""
            />
          </div>
          <div class="action-type-content">
            <div class="action-type-content-title">
              流程到达当前审批人处<span
                >&nbsp;超过&nbsp;<span class="action-type-content-hightlight"
                  >3小时</span
                >&nbsp;</span
              >未处理时自动提醒
            </div>
            <div>被提醒人：当前审批人，审批发起人</div>
            <div>提醒方式：Ding消息</div>
          </div>
          <div class="action-type-operate">
            <div class="action-type-operate-flex">
              <div class="action-type-edit"></div>
              <div class="action-type-delete"></div>
            </div>
          </div>
        </div>
        <div class="action-type">
          <div class="action-type-icon">
            <img
              src="https://img.alicdn.com/imgextra/i1/O1CN01Ox7p6Q1vkEGCmGH53_!!6000000006210-2-tps-164-44.png"
              alt=""
            />
          </div>
          <div class="action-type-content">
            <div class="action-type-content-title">
              流程到达当前审批人处<span
                >&nbsp;超过&nbsp;<span class="action-type-content-hightlight"
                  >1天</span
                >&nbsp;</span
              >未处理时自动提醒
            </div>
            <div>被提醒人：当前审批人，审批发起人</div>
            <div>提醒方式：Ding消息</div>
          </div>
          <div class="action-type-operate">
            <div class="action-type-operate-flex">
              <div class="action-type-edit"></div>
              <div class="action-type-delete"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <a-modal v-model:visible="visible" title="处理方式" :width="650">
      <a-row :gutter="16">
        <a-col :span="6" v-for="(item, index) in items" :key="index">
          <div
            class="action-type-modeal-item"
            :class="{ 'action-type-modeal-item-check': item.check }"
            @click="itemCheck(item)"
          >
            <img :src="item.img" alt="" />
            <span>{{ item.name }}</span>
            <img
              v-if="item.check"
              class="action-type-modeal-item-wrap-active-img"
              src="https://foruda.gitee.com/images/1675700393520586389/bb92d805_9837676.png"
            />
          </div>
        </a-col>
      </a-row>
      <div class="time-rule-content">
        <a-space>
          <span
            style="padding-right: 8px; font-size: 14px; color: rgb(25, 31, 37)"
            >流程到达该审批节点超过</span
          >
          <a-input-number
            v-model:value="data.timeValue"
            :min="1"
            :max="10"
            style="width: 128px"
          />
          <a-select v-model:value="data.unit" style="width: 128px">
            <a-select-option :value="1">天(24小时)</a-select-option>
            <a-select-option :value="2">小时</a-select-option>
            <a-select-option :value="3">分</a-select-option>
          </a-select>
          <span style="font-size: 14px; color: rgb(25, 31, 37)"
            >未处理时{{ currItem.name }}</span
          >
        </a-space>
      </div>
      <FlowDrawerContent v-if="currItem.index == 2" name="转交给谁">
        <GUser
          type="button"
          :max="1"
          v-model="data.approverIds"
          v-model:label="data.approverNames"
          :dataSource="userSource"
          showButton
        />
      </FlowDrawerContent>
      <FlowDrawerContent name="被提醒人" text="(不能超过 25 人)">
        <GUser
          type="button"
          :max="25"
          v-model="data.approverIds"
          v-model:label="data.approverNames"
          :dataSource="userSource"
          showButton
        />
      </FlowDrawerContent>
      <FlowDrawerContent v-if="currItem.index != 1" name="审批意见">
        <a-checkbox v-model:checked="data.suggestion"
          >审批流中添加超时审批意见</a-checkbox
        >
      </FlowDrawerContent>
      <FlowDrawerContent name="提醒方式">
        <FlowNoticeSelect v-model="data.noticeType" />
      </FlowDrawerContent>
    </a-modal>
    <a-button type="dashed" size="large" block @click="() => (visible = true)"
      ><plus-circle-outlined />处理方式</a-button
    >
  </FlowDrawerContent>
</template>

<script setup>
  import { ref, reactive } from 'vue'
  import useIcon from '../../hooks/useIcon'
  import GDept from '@/components/GDept/index.vue'
  import FlowNoticeSelect from '../../common/FlowNoticeSelect.vue'
  // import { UserApi } from '@/api/system/user/UserApi';
  // 图标
  const { optionIcon } = useIcon()

  // 接收属性
  const props = defineProps({
    node: {
      type: Object,
      default: function () {
        return {}
      }
    }
  })

  const items = reactive([
    {
      index: 1,
      name: '自动提醒',
      img: 'https://foruda.gitee.com/images/1675334346580235213/393297fa_9837676.png',
      check: true,
      text: '(不能超过 25 人)'
    },
    {
      index: 2,
      name: '自动转交',
      img: 'https://foruda.gitee.com/images/1675695976376904328/b5ed5ac3_9837676.png',
      check: false,
      text: '(不能超过 25 人)'
    },
    {
      index: 3,
      name: '自动同意',
      img: 'https://foruda.gitee.com/images/1675695996320254413/a3cb51cc_9837676.png',
      check: false,
      text: '(不能超过 25 人)'
    },
    {
      index: 4,
      name: '自动拒绝',
      img: 'https://foruda.gitee.com/images/1675696023756765682/9d45cf71_9837676.png',
      check: false,
      text: '(不能超过 25 人)'
    }
  ])

  const visible = ref(false)

  const currItem = ref(items[0])

  // 数据
  const data = reactive({
    timeValue: 3,
    unit: 3,
    approverIds: [],
    approverNames: [],
    suggestion: false,
    noticeType: 1
  })

  const itemCheck = item => {
    for (let index = 0; index < items.length; index++) {
      items[index].check = false
    }
    item.check = true
    currItem.value = item
  }

  /**
   * 用户数据
   */
  const userSource = ({ page, limit, where, orders }) => {
    // return UserApi.getUserPages({ ...where, ...orders, pageNo: page, pageSize: limit });
  }
</script>
<style lang="less" scoped>
  .action-type-container {
    /*  padding-left: 24px;
  padding-right: 24px; */
    margin-top: 20px;

    .action-type {
      position: relative;
      background: #f6fbff;
      margin-bottom: 8px;
      padding: 16px;
      display: flex;
      border-radius: 4px;

      .action-type-icon {
        position: absolute;
        top: 18px;
        right: 16px;

        img {
          width: 82px;
          height: 22px;
        }
      }

      .action-type-content {
        flex: 1;
        color: rgba(25, 31, 37, 0.56);
        font-size: 12px;
        line-height: 2;

        .action-type-content-title {
          color: #191f25;
          font-size: 14px;
          width: 380px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-break: break-all;
        }

        .action-type-content-hightlight {
          color: #1890ff;
          font-weight: 500;
        }
      }

      .action-type-operate {
        width: 60px;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
      }

      .action-type-operate-flex {
        display: flex;
        width: 100%;
        justify-content: space-between;
      }

      .action-type-edit,
      .action-type-edit-disabled {
        cursor: pointer;
        height: 20px;
        width: 20px;
        background-size: 20px 20px;
        background-position: center;
        background-repeat: no-repeat;
        background-image: url(https://img.alicdn.com/tfs/TB1tJgdorH1gK0jSZFwXXc7aXXa-32-30.png);
      }

      .action-type-delete,
      .action-type-delete-disabled {
        cursor: pointer;
        height: 20px;
        width: 20px;
        background-size: 20px 20px;
        background-position: center;
        background-repeat: no-repeat;
        background-image: url(https://img.alicdn.com/tfs/TB1NecaoCf2gK0jSZFPXXXsopXa-34-36.png);
      }
    }
  }

  .action-type-modeal-item {
    position: relative;
    padding: 15px 26px;
    background: #ffffff;
    border: 1px solid rgba(17, 31, 44, 0.08);
    border-radius: 6px;
    cursor: pointer;
    line-height: 26px;
    white-space: nowrap;

    img {
      width: 26px;
      height: 26px;
      margin-right: 6px;
    }

    span {
      font-size: 14px;
      font-weight: 500;
      color: #111f2c;
    }
  }

  .action-type-modeal-item-check {
    background: #eaf4fe;
    border-color: #3296fa;
    .action-type-modeal-item-wrap-active-img {
      position: absolute;
      right: 0;
      top: 0;
      width: 20px;
      height: 20px;
      margin-right: 0;
    }
  }

  .time-rule-content {
    background: rgba(0, 137, 255, 0.04);
    padding: 20px 12px;
    margin: 10px 0;
  }
</style>
