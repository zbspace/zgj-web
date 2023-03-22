<template>
  <!-- 批量操作弹框提示 -->
  <JyElMessageBox
    :modelValue="props.show"
    :mode="1"
    :showClose="false"
    :defaultAttribute="{}"
    @update:modelValue="closeCallBack"
    @confirmClick="confirmClick"
  >
    <template #header>
      <div class="header-div">
        <img src="@/assets/svg/common/warning.svg" />
        <span>{{ props.showToastDialogContent.header.data }}</span>
      </div>
    </template>
    <template #content>
      <div class="content-div">{{
        props.showToastDialogContent.content.data
      }}</div>
      <el-scrollbar class="scrollbar" max-height="200px">
        <p
          v-for="item in props.selectionData"
          :key="item"
          class="scrollbar-demo-item"
          >{{ item[props.label] }}</p
        >
      </el-scrollbar>
    </template>
  </JyElMessageBox>
</template>
<script setup>
  import { onBeforeMount, onMounted } from 'vue'
  const props = defineProps({
    // 标识
    show: {
      type: Boolean,
      default: false
    },
    selectionData: {
      type: Array
    },
    label: {
      type: String
    },
    showToastDialogContent: {
      type: Object
    }
  })
  const emit = defineEmits(['sureAction', 'update:modelValue'])

  const confirmClick = () => {
    emit('sureAction')
  }

  const closeCallBack = () => {
    emit('update:modelValue')
  }

  onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
    // console.log(props.data);
  })
  onMounted(() => {
    // console.log(`the component is now mounted.`)
  })
</script>
<style lang="scss" scoped>
  .components-approvalSteps {
    margin: 0%;

    .ap-box {
      .ap-box-list {
        min-height: 10rem;
        display: flex;
        padding: 1rem 0rem;
        box-sizing: border-box;

        .ap-box-list-yindao {
          width: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;

          .ap-box-list-yindao-img {
            width: 2rem;
            height: 2rem;
          }

          .ap-box-list-yindao-line {
            border-left: 1px solid var(--jy-color-Add-1);
            height: calc(100% - 3rem);
          }
        }

        .ap-box-list-cont {
          width: 100%;
          padding-left: 1rem;
          box-sizing: border-box;

          .ap-box-list-cont-title {
            display: flex;
            align-items: center;
            padding-top: 0.3rem;
            box-sizing: border-box;

            .ap-box-list-cont-title-text {
              font-size: var(--jy-font-size-title-1);
            }

            .ap-box-list-cont-title-subText {
              font-size: var(--jy-font-size-body-1);
            }
          }

          .ap-box-list-cont-person {
            padding: 1rem 0;
            box-sizing: border-box;
          }
        }
      }

      .after {
        display: flex;
        justify-content: space-between;

        .after-cont {
          flex-grow: 1;
          display: flex;
          justify-content: flex-start;
          flex-flow: wrap;
          width: calc(100% - 10rem);
        }

        .after-time {
          width: 10rem;
          display: flex;
          justify-content: flex-end;
          color: var(--jy-color-text-3);
        }
      }

      .flowing {
        .flowing-cont-person {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;

          .flowing-cont-person-cont {
            flex-grow: 1;
            display: flex;
            justify-content: flex-start;
            flex-flow: wrap;
            width: calc(100% - 10rem);
          }

          .flowing-cont-person-time {
            width: 10rem;
            display: flex;
            justify-content: flex-end;
            color: var(--jy-color-text-3);
          }
        }

        .flowing-cont-desc {
          padding: 1rem 1rem;
          box-sizing: border-box;
          background-color: var(--jy-color-fill--2);
          border-radius: var(--jy-border-radius-4);
          color: var(--jy-color-text-3);
          line-height: 150%;
          margin-bottom: 1rem;
        }

        .flowing-cont-image {
          padding: 0rem 1rem;
          box-sizing: border-box;
          margin-bottom: 1rem;
        }
      }

      .person-cell {
        width: auto;
        display: flex;
        align-items: center;
        padding: 0.5rem 0.5rem;
        box-sizing: border-box;
        background-color: var(--jy-color-fill--2);
        border-radius: var(--jy-border-radius-4);
        margin-right: 0.5rem;
        margin-bottom: 0.5rem;

        .person-cell-jian {
          width: 2rem;
          height: 2rem;
          background-color: var(--jy-primary-6);
          border-radius: var(--jy-border-radius-4);
          color: var(--jy-in-common-use-1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: var(--jy-font-size-body-1);
          position: relative;
          margin-right: 0.5rem;

          .person-cell-jian-icon {
            width: 1rem;
            height: 1rem;
            position: absolute;
            bottom: -0.5rem;
            right: -0.5rem;
          }
        }

        .person-cell-name {
          min-width: 3rem;
          color: var(--jy-color-text-2);
        }
      }

      .statusIcon {
        position: absolute;
        top: 0%;
        right: 0%;
        padding-right: 0.5rem;
        box-sizing: border-box;

        .statusIcon-img {
          width: 9rem;
        }
      }

      .dengdai {
        background-color: var(--jy-color-fill-25) !important;
      }
    }
  }
</style>
