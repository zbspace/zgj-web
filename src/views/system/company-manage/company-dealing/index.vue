<template>
  <div>
    <componentsLayout Layout="title,searchForm,table,pagination,batch">
      <template #title>
        <div class="title">
          <div>往来企业</div>
          <div>
            <el-button>
              <img class="button-icon" src="@/assets/svg/gengduo-caozuo.svg" alt="" srcset="">
              <span>更多操作</span>
            </el-button>
          </div>
        </div>
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

      <template #table>
        <div>
          <componentsTable :defaultAttribute="state.componentsTable.defaultAttribute" :data="state.componentsTable.data"
            :header="state.componentsTable.header" :isSelection="true" @cellClick="cellClick">
          </componentsTable>
        </div>
      </template>

      <template #pagination>
        <componentsPagination :data="state.componentsPagination.data"
          :defaultAttribute="state.componentsPagination.defaultAttribute">
        </componentsPagination>
      </template>
    </componentsLayout>
    <!-- 往来详情 -->
    <div class="ap-box">
      <componentsDocumentsDetails :show="state.componentsDocumentsDetails.show"
        :visible="state.componentsDocumentsDetails.visible" @clickClose="clickClose">
      </componentsDocumentsDetails>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import componentsTable from "@/views/components/table";
import componentsSearchForm from "@/views/components/searchForm";
import componentsPagination from "@/views/components/pagination";
import componentsLayout from "@/views/components/Layout";
import componentsTree from "@/views/components/tree"
import componentsDocumentsDetails from "@/views/components/documentsDetails.vue"

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
        label: "单位名称",
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
        label: "企业编码",
        width: 120,
      },
      {
        prop: "2",
        label: "企业名称",
        width: 120,
      },
      {
        prop: "3",
        label: "所属部门",
        width: 120,
      },
      {
        prop: "4",
        label: "联系人",
        width: 100,
      },
      {
        prop: "5",
        label: "联系方式",
        width: 160,
      },
      {
        prop: "6",
        label: "备注",
      },
      {
        prop: "7",
        label: "操作",
        width: 100,
        rankDisplayData: [
          {
            name: "删除"
          },
        ],
      },
    ],
    data: [
      {
        1: "TradeCode21",
        2: "222",
        3: "往往",
        4: "333",
        5: "2022/10/30",
        6: "444",
      },
    ],
    // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
    defaultAttribute: {
      stripe: true,
      "header-cell-style": {
        background: "var(--color-fill--1)",
      },
      "cell-style": ({ row, column, rowIndex, columnIndex }) => {
        // console.log({ row, column, rowIndex, columnIndex });
        if (column.property == "2") {
          return {
            "color": "var(--Info-6)",
            "cursor": "pointer",
          }
        }
      }
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
  componentsDocumentsDetails: {
    show: false,
    visible: [
      {
        label: '往来企业详情',
        name: "Current-Business-Details",
      },
      {
        label: '流程记录',
        name: "operating-record",
      },
    ],
  }
});
// 点击表格单元格
function cellClick(row, column, cell, event) {
  console.log(row, column, cell, event);
  if (column.property == "2") {
    state.componentsDocumentsDetails.show = true;
  }
}
//点击关闭
function clickClose() {
  state.componentsDocumentsDetails.show = false;
}
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
