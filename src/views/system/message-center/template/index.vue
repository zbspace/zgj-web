<template>
  <div>
    <componentsLayout Layout="title,searchForm,table,pagination,tabs,tree">
      <template #title>
        <div class="title">消息模板</div>
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

      <template #tree>
        <div>
          <componentsTree :data="state.componentsTree.data" :defaultAttribute="state.componentsTree.defaultAttribute">
          </componentsTree>
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
import componentsTree from "@/views/components/tree"

const state = reactive({

  componentsTabs: {
    data: [
      {
        label: '通知事件',
        name: "1",
      }, {
        label: '预警事件',
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
        label: "xx",
        type: "input",
        inCommonUse: true,
        // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
        defaultAttribute: {
          placeholder: "请输入",
        },
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
  },

  componentsTree: {
    data: [
      {
        label: 'A层级菜单1',
        children: [
          {
            label: 'B层级菜单1',
            children: [
              {
                label: 'C层级菜单1',
              },
            ],
          },
        ],
      },
      {
        label: 'A层级菜单2',
        children: [
          {
            label: 'B层级菜单1',
            children: [
              {
                label: 'C层级菜单1',
              },
            ],
          },
          {
            label: 'B层级菜单2',
            children: [
              {
                label: 'C层级菜单1',
              },
            ],
          },
        ],
      },
      {
        label: 'A层级菜单3',
        children: [
          {
            label: 'B层级菜单1',
            children: [
              {
                label: 'C层级菜单1',
              },
            ],
          },
          {
            label: 'B层级菜单2',
            children: [
              {
                label: 'C层级菜单1',
              },
            ],
          },
        ],
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
