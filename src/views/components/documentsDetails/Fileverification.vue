<template>
  <div class="verification-details">
    <div class="verification-wrap" v-for="(it, id) in data">
      <div class="verification-title" v-if="it.length > 0">
        <div
          class="verification-title-item verification-title-item-success"
          v-if="id === 'successResult'"
        >
          <span></span>核验通过</div
        >
        <div
          class="verification-title-item verification-title-item-error"
          v-if="id === 'errorResult'"
          ><span class="error-icon"></span>核验异常</div
        >
        <div
          class="verification-title-item verification-title-item-normal"
          v-if="id === 'normalResult'"
          ><span class="normal-icon"></span>未核验</div
        >
        <div
          class="verification-title-item verification-title-item-history"
          v-if="id === 'historyResult'"
          @click.stop="historyHide"
          ><span class="history-icon"></span>历史盖前文件核验<div
            class="hide-icon"
            :class="{ 'show-icon': state.historyShow }"
          ></div
        ></div>
        <button v-if="id === 'errorResult'">人工核验</button>
      </div>
      <div
        class="verification-list"
        :class="{
          'verification-list-hide': id === 'historyResult' && !state.historyShow
        }"
      >
        <div class="verification-list-item" v-for="(item, index) in it">
          <div class="file-name-result">
            <div class="name"
              ><span v-if="id != 'historyResult'" :class="id + '-span'"></span
              >{{ item[1] }}</div
            >
            <div
              class="result"
              :class="{ 'result-history': id == 'historyResult' }"
              >{{ item[2] }}<i v-if="item[3] > 0">（{{ item[3] }}）</i></div
            >
          </div>
          <div class="file-basic">
            <div class="person">核验人：{{ item[4] }}</div>
            <div class="time">核验时间：{{ item[5] }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { reactive, onBeforeMount, onMounted } from 'vue'
  const props = defineProps({
    // 归档列表
    data: {
      type: Object,
      default: {
        successResult: [
          // 核验通过
        ],
        errorResult: [
          // 核验异常
        ],
        normalResult: [
          // 未核验
        ],
        historyResult: [
          // 历史文件核验列表
        ]
      }
    }
  })
  const state = reactive({
    historyShow: true
  })
  function historyHide() {
    state.historyShow = !state.historyShow
  }
  onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
  })
  onMounted(() => {
    // console.log(`the component is now mounted.`)
  })
</script>
<style lang="scss" scoped>
  .verification-details {
    .verification-wrap {
      border-bottom: 1px solid rgba(0, 0, 0, 0.06);
      margin-bottom: 16px;
      // padding-bottom:16px;
    }

    .verification-title {
      margin-bottom: 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      > button {
        width: 80px;
        height: 28px;
        background: #d0963e;
        border-radius: 2px;
        font-size: 12px;
        color: #fff;
        border: none;
      }
      .verification-title-item {
        display: flex;
        align-items: center;

        > span {
          width: 24px;
          height: 24px;
          margin-right: 12px;
          background-image: url('../../../assets/svg/verification/verification-success.svg');
          background-size: 100% auto;
          background-repeat: no-repeat;
        }

        > .error-icon {
          background-image: url('../../../assets/svg/verification/verification-error.svg');
        }

        > .normal-icon {
          background-image: url('../../../assets/svg/verification/verification-normal.svg');
        }

        > .history-icon {
          background-image: url('../../../assets/svg/verification/verification-history.svg');
        }
        .hide-icon {
          width: 12px;
          height: 8px;
          background-image: url('../../../assets/svg/xiangxia-hui.svg');
          background-size: 100% auto;
          background-repeat: no-repeat;
          transform: rotate(-90deg);
          margin-left: 12px;
        }
        .show-icon {
          transform: rotate(0);
        }
      }
    }

    .verification-list {
      padding-left: 37px;
      box-sizing: border-box;

      .verification-list-item {
        margin-bottom: 24px;

        > div {
          display: flex;
        }

        .file-name-result {
          justify-content: space-between;
          margin-bottom: 12px;

          .name {
            display: flex;
            align-items: center;

            > span {
              width: 6px;
              height: 6px;
              background: #3ed096;
              border-radius: 50%;
              margin-right: 7px;
            }
            .errorResult-span {
              background: #d04d3e;
            }
            .normalResult-span {
              background: rgba(0, 0, 0, 0.25);
            }
          }

          > .result {
            color: #3e78d0;

            > i {
              font-style: normal;
            }
          }
          > .result-history {
            color: rgba(0, 0, 0, 0.45);
          }
        }

        .file-basic {
          color: rgba(0, 0, 0, 0.45);
        }
      }
    }
    .verification-list-hide {
      height: 0;
      overflow: hidden;
    }
  }
</style>
