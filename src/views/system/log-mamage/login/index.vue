<template>
  <div>
    <componentsLayout Layout="title,searchForm,table,pagination,tabs">
      <template #title>
        <div class="title">登录日志</div>
      </template>

      <template #tabs>
        <div>
          <componentsTabs activeName="1" :data="state.componentsTabs.data">
          </componentsTabs>
        </div>
      </template>

      <template #searchForm>
        <div>
          <componentsSearchForm :data="state.componentsSearchForm.data" :butData="state.componentsSearchForm.butData"
            :style="state.componentsSearchForm.style">
          </componentsSearchForm>
        </div>
      </template>

      <template #table>
        <div>
          <componentsTable :defaultAttribute="state.componentsTable.defaultAttribute" :data="state.componentsTable.data"
            :header="state.componentsTable.header" :isSelection="true">
          </componentsTable>
        </div>
      </template>

      <template #pagination>
        <componentsPagination :data="state.componentsPagination.data"
          :defaultAttribute="state.componentsPagination.defaultAttribute">
        </componentsPagination>
      </template>
    </componentsLayout>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import componentsTable from "@/views/components/table";
import componentsSearchForm from "@/views/components/searchForm";
import componentsPagination from "@/views/components/pagination.vue";
import componentsLayout from "@/views/components/Layout.vue";
import componentsTabs from "@/views/components/tabs.vue"

const state = reactive({

  componentsTabs: {
    data: [
      {
        label: '正常登录日志',
        name: "1",
      }, {
        label: '异常登录日志',
        name: "2",
      }
    ]
  },

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
        label: "关键词",
        type: "input",
        inCommonUse: true,
        // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
        defaultAttribute: {
          placeholder: "请输入",
        },
      },
      {
        id: 'picker',
        label: "选择时间",
        type: "picker",
        inCommonUse: true,
        // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
        defaultAttribute: {
          type: "daterange",
          "start-placeholder": "Start date",
          "end-placeholder": "End date"
        },
        style: {

        }
      },
      {
        id: "name",
        label: "xx",
        type: "select",
        inCommonUse: true,
        // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
        defaultAttribute: {
          placeholder: "请选择",
        },
        options: [
          {
            value: "Option1",
            label: "Option1",
          },
          {
            value: "Option2",
            label: "Option2",
          },
        ],
      },
    ],
    butData: [
      {
        id: "more",
        name: "展开",
        type: "unfold",
        // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
        defaultAttribute: {
          type: "primary",
        },
        style: {},
      },
      {
        id: "inquire",
        name: "查询",
        type: "click",
        // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
        defaultAttribute: {
          type: "primary",
        },
        style: {},
      },
      {
        id: "reset",
        name: "重置",
        type: "click",
        // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
        defaultAttribute: {},
        style: {},
      },
    ],
  },

  componentsTable: {
    header: [
      {
        width: 50,
        type: "selection",
      },
      {
        prop: "0",
        label: "序号",
        width: 100,
        sortable: true,
      },
      {
        prop: "1",
        label: "xxx",
      },
    ],
    data: [
      {
        1: "TradeCode21",
        2: "",
        3: "往往",
        4: "",
        5: "2022/10/30",
        6: "",
      },
      {
        1: "TradeCode21",
        2: "",
        3: "往往",
        4: "",
        5: "2022/10/30",
        6: "",
      },
      {
        1: "TradeCode21",
        2: "",
        3: "往往",
        4: "",
        5: "2022/10/30",
        6: "",
      },
      {
        1: "TradeCode21",
        2: "",
        3: "往往",
        4: "",
        5: "2022/10/30",
        6: "",
      },
      {
        1: "TradeCode21",
        2: "",
        3: "往往",
        4: "",
        5: "2022/10/30",
        6: "",
      },
      {
        1: "TradeCode21",
        2: "",
        3: "往往",
        4: "",
        5: "2022/10/30",
        6: "",
      },
      {
        1: "TradeCode21",
        2: "",
        3: "往往",
        4: "",
        5: "2022/10/30",
        6: "",
      },
      {
        1: "TradeCode21",
        2: "",
        3: "往往",
        4: "",
        5: "2022/10/30",
        6: "",
      },
    ],
    // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
    defaultAttribute: {
      stripe: true,
      "header-cell-style": {
        background: "var(--color-fill--1)",
      },
    },
  },

  componentsPagination: {
    data: {
      amount: 400,
      index: 1,
      pageNumber: 80,
    },
    // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
    defaultAttribute: {
      layout: "sizes, prev, pager, next, jumper",
      total: 500,
      "page-sizes": [10, 100, 200, 300, 400],
      background: true,
    },
  }
});

</script>

<style lang="scss" scoped>

</style>
