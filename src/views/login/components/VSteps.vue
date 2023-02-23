<template>
  <div class="steps-line" style="display: flex">
    <div v-for="(item, index) in lists" :key="item.value">
      <!-- 步骤条 -->
      <div class="steps">
        <div
          class="circle"
          :class="index + 1 <= active ? 'shadow-c' : 'no-shadow'"
        >
          <div
            class="msg"
            :class="index + 1 <= active ? 'l-s-color' : 'l-n-s-color'"
            >{{ item.label }}</div
          >
        </div>

        <div
          class="line"
          :class="index + 2 <= active ? 'line-select' : 'line-n-select'"
          v-if="index !== lists.length - 1"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
  /**
   * active String 当前状态 one 、 two、 three
   * lists Array 文本展示
   */

  import { reactive } from 'vue'

  const obj = defineProps(['active', 'lists'])

  const state = reactive({})

  console.log(obj.active, state)
</script>

<style scoped lang="scss">
  .steps-line {
    padding: 0 30px;
    display: flex;
    justify-content: center;
    .steps {
      display: flex;
      justify-content: center;
      align-items: center;

      .shadow-c {
        box-shadow: 0 0 0 8px rgba($color: #e2b062, $alpha: 0.3);
        background: #d0963e;
      }
      .no-shadow {
        background: #c0c4cc;
      }
      .circle {
        position: relative;
        width: 15px;
        height: 15px;
        border-radius: 50%;

        .msg {
          position: absolute;
          bottom: -30px;
          left: -40px;
          text-align: center;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 14px;
          line-height: 22px;
          min-width: 100px;
        }

        .l-s-color {
          color: #d0963e;
        }

        .l-n-s-color {
          color: #909399;
        }
      }

      .line {
        width: 113px;
        height: 5px;
        border-radius: 1.67px;
        margin: 0 28px;
      }

      .line-select {
        background: #d0963e;
      }

      .line-n-select {
        background: #c0c4cc;
      }
    }
  }
</style>
