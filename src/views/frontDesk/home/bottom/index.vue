<template>
  <div class="home-bottom">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="预警提醒" name="first">
        <div class="item" v-for="(item, index) in data" :key="index">
          <div class="top">
            <p>盖前文件OCR核验异常</p>
          </div>
          <div class="bottom">
            <span> 系统监测到【文件核验-验证】在进行盖前强制OCR核验，检测到文件有差异，请即时确认。操作人:【刘娟】，操作时间:【2022-10-27</span>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="通知提醒" name="second">
        <div class="item" v-for="(item, index) in data" :key="index">
          <div class="top">
            <p>盖前文件OCR核验异常</p>
          </div>
          <div class="bottom">
            <span> 系统监测到【文件核验-验证】在进行盖前强制OCR核验，检测到文件有差异，请即时确认。操作人:【刘娟】，操作时间:【2022-10-27</span>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const activeName = ref('first')
const data = ref([
  {},
  {},
  {},
])
const handleClick = (tab, event) => {
  console.log(tab, event)
}

</script>

<style lang="scss" scoped>
.home-bottom {
  padding: 24px;
  flex: 1;
  border-right: 1px solid #e9ebec;
  background: #fff;

  p {
    margin-bottom: 0;
  }

  .item {
    border-bottom: 1px solid #e9ebec;
    padding: 16px;

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
        border: 1px solid #D0963E;
        border-radius: 4px;
        color: #D0963E;
        display: flex;
        align-items: center;
      }
    }

    .bottom {
      display: flex;
      justify-content: space-between;
    }
  }

  :deep {
    .el-tabs {
      .el-tabs__nav-scroll {
        .el-tabs__nav {
          .el-tabs__item {
            &:hover {
              color: var(--primary-6);
            }
          }

          .is-active {
            color: var(--primary-6);
          }

          .el-tabs__active-bar {
            background-color: var(--primary-6);
          }
        }
      }
    }
  }
}
</style>