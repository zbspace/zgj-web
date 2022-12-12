<template>
  <div>
    <componentsLayout Layout="title,searchForm,table,pagination,tabs,tree">
      <template #title>
        <div class="title">渠道管理</div>
      </template>

      <template #searchForm>
        <div>
          <componentsSearchForm :data="state.componentsSearchForm.data" :butData="state.componentsSearchForm.butData"
            :style="state.componentsSearchForm.style">
          </componentsSearchForm>
        </div>
      </template>

      <template #tree>
        <div>
          <componentsTree :data="state.componentsTree.data" :defaultAttribute="state.componentsTree.defaultAttribute">
          </componentsTree>
        </div>
      </template>

    </componentsLayout>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import componentsSearchForm from "@/views/components/searchForm";
import componentsLayout from "@/views/components/Layout.vue";
import componentsTree from "@/views/components/tree"

const state = reactive({

  componentsSearchForm: {
    style: {
      lineStyle: {
        width: "30%",
      },
      labelStyle: {
        width: "100px",
      },
    },

    data: [
      {
        id: "name",
        label: "是否开启",
        type: "switch",
        inCommonUse: true,
        // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
        defaultAttribute: {
          placeholder: "请输入",
        },
      },
      {
        id: "name",
        label: "推送事件",
        type: "button",
        inCommonUse: true,
        // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
        data: [{
          name: "编辑",
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            type: "primary",
            style: {
            }
          },
        }]
      },
    ],
  },

  componentsTree: {
    data: [
      {
        label: '钉钉',
      },
      {
        label: '企业微信',
      },
      {
        label: '短信',
      },
    ],
    // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
    defaultAttribute: {
      "check-on-click-node": true,
      "show-checkbox": false,
      "default-expand-all": true,
      "expand-on-click-node": false,
      "check-strictly": true,
    }
  },
});

</script>

<style lang="scss" scoped>

</style>
