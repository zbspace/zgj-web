<template>
  <div class="home-center-left">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="待我审批" name="first">
        <div class="item" v-for="(item, index) in data" :key="index">
          <div class="top">
            <p>10月智能印章采购合同盖章</p>
            <span>审批</span>
          </div>
          <div class="bottom">
            <span>用印申请</span>
            <p>王丹阳</p>
            <p>2022-10-25 10:21</p>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="待我处理" name="second">Config</el-tab-pane>
      <el-tab-pane label="已审批" name="third">Role</el-tab-pane>
      <el-tab-pane label="已处理" name="fourth">Task</el-tab-pane>
      <el-tab-pane label="抄送给我" name="fifth">Task</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  const activeName = ref('first')
  const data = ref([{}, {}, {}])
  const handleClick = (tab, event) => {
    console.log(tab, event)
  }
</script>

<style lang="scss" scoped>
  .home-center-left {
    padding: 24px;
    flex: 1;
    border-right: 1px solid #e9ebec;

    p {
      margin-bottom: 0;
    }

    .item {
      border-bottom: 1px solid #e9ebec;
      padding: 16px;

      &:hover {
        background-color: #f3f6f9;
      }

      .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 5px;

        p {
          font-weight: bold;
          margin-bottom: 0;
        }

        span {
          padding: 0 5px;
          border: 1px solid var(--jy-primary-6);
          border-radius: 4px;
          color: var(--jy-primary-6);
          display: flex;
          align-items: center;
          cursor: pointer;
        }
      }

      .bottom {
        display: flex;
        justify-content: space-between;
      }
    }

    :deep(.el-tabs) {
      .el-tabs__nav-scroll {
        .el-tabs__nav {
          .el-tabs__item {
            &:hover {
              color: var(--jy-primary-6);
            }
          }

          .is-active {
            color: var(--jy-primary-6);
          }

          .el-tabs__active-bar {
            background-color: var(--jy-primary-6);
          }
        }
      }
    }
  }
</style>
