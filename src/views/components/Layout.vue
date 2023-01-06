<template>
  <div class="components-Layout Custom-button">
    <div class="ap-box-breadcrumb" v-if="state.Layout.breadcrumb">
      <slot name="breadcrumb"></slot>
    </div>
    <div class="ap-box-title" v-if="state.Layout.title">
      <slot name="title"></slot>
    </div>
    <div class="ap-box-tabs" v-if="state.Layout.tabs">
      <slot name="tabs"></slot>
    </div>
    <div class="ap-box-cont">
      <div class="ap-box-tree" v-if="state.Layout.tree">
        <el-scrollbar
          type="track"
          style="height: 100%; overflow: auto"
          class="ap-box-tree-scrollbar"
        >
          <div>
            <slot name="tree"></slot>
          </div>
        </el-scrollbar>
      </div>
      <div
        class="ap-box-cutOffRule"
        v-if="
          state.Layout.tree && (state.Layout.searchForm || state.Layout.table)
        "
      >
      </div>
      <div class="ap-box-cent" :style="state.centStyle">
        <el-scrollbar
          style="height: 100%; overflow: auto"
          class="ap-box-cent-scrollbar"
        >
          <div class="ap-box-cent-scrollbar-box">
            <div class="ap-box-searchForm" v-if="state.Layout.searchForm">
              <slot name="searchForm"></slot>
            </div>
            <div class="ap-box-batch" v-if="state.Layout.batch">
              <slot name="batch"></slot>
            </div>
            <div class="ap-box-table" v-if="state.Layout.table">
              <slot name="table"></slot>
            </div>
            <div class="ap-box-pagination" v-if="state.Layout.pagination">
              <slot name="pagination"></slot>
            </div>
            <div class="ap-box-custom" v-if="state.Layout.custom">
              <slot name="custom"></slot>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </div>
    <div class="ap-box-fixed" v-if="state.Layout.fixed">
      <slot name="fixed"></slot>
    </div>
  </div>
</template>
<script setup>
  import { reactive, defineProps, onBeforeMount, onMounted } from 'vue'
  const props = defineProps({
    // 标识
    refs: {
      type: String,
      default: ''
    },
    // 处理类型
    type: {
      type: String,
      default: '0'
    },
    // 布局
    Layout: {
      type: String,
      default: ''
    }
  })
  const state = reactive({
    Layout: {},
    centStyle: {}
  })
  // 初始化布局
  function initLayout() {
    if (props.Layout) {
      props.Layout.split(',').map(item => (state.Layout[item] = true))
    }
    if (state.Layout.tree) {
      state.centStyle['padding-left'] = '1rem'
    } else {
      state.centStyle.width = '100%'
    }
    // console.log(state.Layout);
  }
  onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
    // 初始化布局
    initLayout()
  })
  onMounted(() => {
    // console.log(`the component is now mounted.`)
  })
</script>
<style lang="scss" scoped>
  .components-Layout {
    margin: 0%;
    width: 100%;
    height: calc(100vh - 100px);

    display: flex;
    // flex-flow: wrap;
    align-content: flex-start;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    @include mixin-padding-top(10);
    @include mixin-padding-bottom(10);
    @include mixin-padding-left(20);
    @include mixin-padding-right(20);
    box-sizing: border-box;
    border-radius: var(--border-radius-4);
    background-color: var(--in-common-use-1);
    margin-top: 18px;
    position: relative;

    .ap-box-title {
      width: 100%;
      padding: 0rem 0 0.5rem 0;
      box-sizing: border-box;
      font-size: var(--font-size-title-2);
      @include mixin-padding-right(0);
      box-sizing: border-box;
    }

    .ap-box-breadcrumb {
      width: 100%;
      @include mixin-padding-right(0);
      box-sizing: border-box;
      padding-top: 1rem;
    }

    .ap-box-tabs {
      width: 100%;
      @include mixin-padding-right(0);
      box-sizing: border-box;
    }

    .ap-box-cont {
      display: flex;
      width: 100%;
      flex-grow: 1;
      overflow: auto;
    }

    .ap-box-searchForm {
      width: 100%;
      @include mixin-padding-right(0);
      box-sizing: border-box;
    }

    .ap-box-batch {
      width: 100%;
      padding: 0.5rem 0 0.5rem 0;
      box-sizing: border-box;
      @include mixin-padding-right(0);
      box-sizing: border-box;
    }

    .ap-box-tree {
      width: 15%;
      height: 100%;
      overflow: auto;
      padding-right: 0rem;
      box-sizing: border-box;

      .arco-scrollbar {
        height: 100%;
      }

      border-right: 1px solid var(--color-border-2);
    }

    .ap-box-cutOffRule {
      display: none;
    }

    .ap-box-cent {
      width: 85%;
      height: 100%;
      overflow: auto;
      box-sizing: border-box;

      .arco-scrollbar {
        height: 100%;
      }
    }

    .ap-box-table {
      @include mixin-padding-right(0);
      box-sizing: border-box;
    }

    .ap-box-pagination {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      padding: 1.5rem 0;
      box-sizing: border-box;
      @include mixin-padding-right(0);
      box-sizing: border-box;
    }

    .ap-box-fixed {
      width: 100%;
      margin-left: -1.25rem;
    }
  }
</style>
