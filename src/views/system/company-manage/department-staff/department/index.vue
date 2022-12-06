<template>
  <div>
    <componentsLayout Layout="title,searchForm,table,pagination,tree,batch">
      <template #title>
        <div class="title">部门管理</div>
      </template>

      <template #searchForm>
        <div>
          <componentsSearchForm :data="state.componentsSearchForm.data" :butData="state.componentsSearchForm.butData"
            :style="state.componentsSearchForm.style">
          </componentsSearchForm>
        </div>
      </template>

      <template #batch>
        <div class="batch">
          <el-button type="primary">+ 新建</el-button>
          <el-button>批量操作</el-button>
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
        label: "部门名称",
        type: "input",
        inCommonUse: true,
        // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
        defaultAttribute: {
          placeholder: "请输入",
        },
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
        label: "部门编码",
      },
      {
        prop: "2",
        label: "部门名称",
      },
      {
        prop: "3",
        label: "组织类型",
      },
      {
        prop: "4",
        label: "部门人数",
      },
      {
        prop: "5",
        label: "部门主管",
      },
      {
        prop: "6",
        label: "上级组织",
      },
      {
        prop: "7",
        label: "操作",
        rankDisplayData: [
          {
            name: "修改"
          },
          {
            name: "删除"
          },
          {
            name: "停用"
          },
        ],
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
        label: '企业名称',
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
