<template>
  <componentsLayout
    :style="{
      padding: '16px 24px'
    }"
    :free="true"
  >
    <div class="components-Layout1">
      <!-- title -->
      <div class="card-title">渠道管理</div>

      <div class="card-content">
        <!-- left -->
        <div class="card-l">
          <div
            class="l-column"
            :class="state.activedVlaue === 1 ? 'l-actived' : ''"
            @click="changeColumn(1)"
          >
            <div class="column-diot diot1"></div>
            <div class="column-t">钉钉</div>
          </div>
          <div
            class="l-column"
            :class="state.activedVlaue === 2 ? 'l-actived' : ''"
            @click="changeColumn(2)"
          >
            <div class="column-diot diot2"></div>
            <div class="column-t">企业微信</div>
          </div>
          <div
            class="l-column"
            :class="state.activedVlaue === 3 ? 'l-actived' : ''"
            @click="changeColumn(3)"
          >
            <div class="column-diot diot3"></div>
            <div class="column-t">短信</div>
          </div>
          <div
            class="l-column"
            :class="state.activedVlaue === 4 ? 'l-actived' : ''"
            @click="changeColumn(4)"
          >
            <div class="column-diot diot4"></div>
            <div class="column-t">更多</div>
          </div>
        </div>

        <!-- right -->
        <div class="card-r">
          <el-form :model="form" label-width="100px">
            <el-form-item>
              <template #label>
                <div style="line-height: 40px">是否开启</div>
              </template>
              <el-switch v-model="form.delivery" />
            </el-form-item>

            <el-form-item>
              <template #label>
                <div>推送事件</div>
              </template>
              <el-button type="primary" :icon="Plus">添加</el-button>
            </el-form-item>
          </el-form>

          <!-- box -->
          <div class="r-box"></div>
        </div>
      </div>
    </div>
  </componentsLayout>
</template>

<script setup>
  import { reactive } from 'vue'
  import { Plus } from '@element-plus/icons-vue'
  import componentsLayout from '@/views/components/Layout.vue'
  const state = reactive({
    activedVlaue: 1
  })

  const changeColumn = val => {
    state.activedVlaue = val
  }

  const form = reactive({
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: ''
  })
</script>

<style lang="scss" scoped>
  .components-Layout1 {
    margin: 0%;
    width: 100%;
    height: 100%;

    display: flex;
    // flex-flow: wrap;
    align-content: flex-start;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    @include mixin-padding-top(10);
    @include mixin-padding-bottom(10);
    @include mixin-padding-left(20);
    @include mixin-padding-right(0);
    // margin-top: 24px;
    position: relative;
    background: #fff;
    .card-title {
      color: rgba(0, 0, 0, 0.85);
      font-size: 22px;
      line-height: 40px;
      height: 40px;
    }

    .card-content {
      display: flex;
      justify-content: space-between;
      padding: 20px 0 50px 0;
      flex: 1;
      width: 100%;
      .card-l {
        width: 240px;
        padding: 0 20px 0 0;
        position: relative;
        display: flex;
        flex-direction: column;

        &::after {
          content: '';
          position: absolute;
          top: 20px;
          right: 0;
          height: 100%;
          width: 1px;
          background: rgba(0, 0, 0, 0.06);
        }

        .l-column {
          display: flex;
          align-items: center;
          height: 36px;
          line-height: 36px;
          margin-top: 12px;
          color: rgba(0, 0, 0, 0.85);
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);

          .column-diot {
            width: 10px;
            height: 10px;
            margin: 0 10px;
            border-radius: 50%;
          }

          .diot1 {
            background: #f9b86a;
          }

          .diot2 {
            background: #5b92d9;
          }

          .diot3 {
            background: #5bd9a3;
          }

          .diot4 {
            background: rgba(0, 0, 0, 0.15);
          }
        }

        .l-column:hover {
          background: var(--jy-primary-6);
          border-radius: 2px;
          cursor: pointer;
          color: #ffffff;
        }

        .l-actived {
          background: var(--jy-primary-6);
          border-radius: 2px;
          color: #ffffff;
        }
      }

      .card-r {
        flex: 1;
        padding: 0 24px;
        width: 100%;
        .r-box {
          width: 100%;
          height: 320px;
          border: 2px dashed rgba(0, 0, 0, 0.15);
          border-radius: 4px;
        }
      }
    }
  }
</style>
